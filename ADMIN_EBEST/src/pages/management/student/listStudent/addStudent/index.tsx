import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Input, DatePicker, Select, Row, Col, message } from 'antd';
import { useStudentContext } from '@/context/StudentContext';
import moment from 'moment';

type Student = {
  id: string;
  name: string;
  userName: string;
  password: string;
  phone: string;
  job: string;
  email: string;
  sex: string;
  objectivesLearn: string;
  course: string;
  statusSalary: string;
  statusLearn: string;
  birthdate: string;
};

type StudentModalProps = {
  formValue: Student;
  title: string;
  show: boolean;
  onOk: (values: Student) => void;
  onCancel: VoidFunction;
};

const StudentModal: React.FC<StudentModalProps> = ({ title, show, formValue, onOk, onCancel }) => {
  const { addStudent, updateStudent } = useStudentContext();
  const [formData, setFormData] = useState<Student>(formValue);  // Store form data in state
  const [form] = Form.useForm();

  // Set form data when formValue changes
  useEffect(() => {
    form.setFieldsValue({
      ...formValue,
      birthdate: formValue.birthdate ? moment(formValue.birthdate) : '',
    });
    setFormData(formValue);  // Sync formData with the initial formValue
    console.log('Initial form value:', formValue);  // Ghi log giá trị form ban đầu
  }, [formValue, form]);

  const generateRandomId = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };
// Handle "Lưu" button click
const handleOk = async () => {
  try {
    // Validate form fields
    const values = await form.validateFields();

    // Check if it's an update or a new record
    const isEditing = !!formData.id; // Kiểm tra nếu có ID thì đang chỉnh sửa

    // Prepare updated form data
    const updatedFormData: Student = {
      ...formData,
      ...values,
      id: isEditing ? formData.id : generateRandomId(), // Nếu đang chỉnh sửa, giữ nguyên ID
      birthdate: values.birthdate ? values.birthdate.format('YYYY-MM-DD') : formData.birthdate || '',
      sex: values.sex || formData.sex || '',
      job: values.job || formData.job || '',
      mucdichHoc: values.objectivesLearn || formData.objectivesLearn || '',
      statusSalary: isEditing ? formData.statusSalary : 'Chưa thanh toán', // Trạng thái học phí mặc định
    };

    // const response = await fetch('http://localhost:5000/api/users', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(updatedFormData),
    // });

    // if (!response.ok) {
    //   throw new Error('Có lỗi xảy ra khi gửi dữ liệu tới API');
    // }
    // message.success(isEditing ? 'Cập nhật thành công!' : 'Thêm học viên thành công!'); 

    console.log('Form values:', values);
    console.log('Updated form data:', updatedFormData);

    // Save or update student data in context
    if (isEditing) {
      updateStudent(updatedFormData); // Gọi hàm cập nhật từ context
      message.success(`Cập nhật thông tin học viên thành công!`);
    } else {
      addStudent(updatedFormData); // Gọi hàm thêm mới từ context
      message.success(
        <div>
          <p>Thêm thành công học viên mới!</p>
          <ul>
            <li><b>ID:</b> {updatedFormData.id}</li>
            <li><b>Họ và tên:</b> {updatedFormData.name}</li>
            <li><b>Tài khoản:</b> {updatedFormData.userName}</li>
            <li><b>Email:</b> {updatedFormData.email}</li>
            <li><b>Số điện thoại:</b> {updatedFormData.phone}</li>
          </ul>
        </div>
      );
    }

    // Log the student information to the console
    const formsentData = updatedFormData;
    const dataSent = {
      id: formsentData.id,
      name: formsentData.name,
      password : formsentData.password,
      sex: formsentData.sex,
      birthdate: formsentData.birthdate,
      userName: formsentData.userName,
      phone: formsentData.phone,
      job: formsentData.job,
      email: formsentData.email,
      mucdichHoc: formsentData.mucdichHoc,
      statusSalary: formsentData.statusSalary,
    }
    console.log('Student information:', dataSent);

    const response = await fetch('http://localhost:5000/api/addStudent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataSent),
    });

    if (!response.ok) {
      throw new Error('Có lỗi xảy ra khi gửi dữ liệu tới API');
    }
    message.success('Success')

    // Reset form fields
    
    // Close modal
    onCancel();
    // Callback to notify parent component and close modal
    onOk(updatedFormData);
  } catch (errorInfo) {
    // Display error message
    message.error('Không thể lưu thông tin. Vui lòng kiểm tra lại!');
    console.error('Validation Failed:', errorInfo);
  }
};

  
  // Handle individual field changes
  const handleSelectChange = (field: keyof Student) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBirthdateChange = (date: moment.Moment | null) => {
    setFormData((prev) => ({
      ...prev,
      birthdate: date ? date.format('YYYY-MM-DD') : '',
    }));
  };

  return (
    <Modal
      footer={[
        <Button key="back" onClick={onCancel}>
          Huỷ
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Lưu
        </Button>,
      ]}
      title={title}
      visible={show}
      onCancel={onCancel}
      className="custom-modal"
    >
      <Form
        initialValues={formValue}
        form={form}
        labelCol={{ span: 9 }}
        wrapperCol={{ span: 32 }}
        layout="horizontal"
        className="space-y-4"
      >
        <hr />
        <p className="text-blue-200">Thông tin tài khoản</p>
        <div className="flex gap-8">
          <Form.Item
            name="userName"
            rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }]}
          >
            <Input placeholder="Tài khoản" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>
        </div>
        <p>Thông tin cá nhân</p>
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
        >
          <Input placeholder="Nhập họ và tên" />
        </Form.Item>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="birthdate">
              <p>Ngày sinh</p>
              <DatePicker className="w-full" onChange={handleBirthdateChange} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="sex">
              <p>Giới tính</p>
              <Select className="w-full" onChange={handleSelectChange('sex')}>
                <Select.Option value="male">Nam</Select.Option>
                <Select.Option value="female">Nữ</Select.Option>
                <Select.Option value="other">Khác</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="job">
              <p>Công việc</p>
              <Select className="w-full" onChange={handleSelectChange('job')}>
                <Select.Option value="student">Học sinh/Sinh viên</Select.Option>
                <Select.Option value="employee">Nhân viên</Select.Option>
                <Select.Option value="freelancer">Freelancer</Select.Option>
                <Select.Option value="other">Khác</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="phone"
              rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
            >
              <Input placeholder="Số điện thoại" className="w-full" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              rules={[
                { type: 'email', message: 'Email không hợp lệ!' },
                { required: true, message: 'Vui lòng nhập email!' },
              ]}
            >
              <Input placeholder="Email" className="w-full" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="objectivesLearn">
              <p>Mục đích học</p>
              <Select className="w-full" onChange={handleSelectChange('objectivesLearn')}>
                <Select.Option value="Chứng chỉ quốc tế">Chứng chỉ quốc tế</Select.Option>
                <Select.Option value="Công việc">Công việc</Select.Option>
                <Select.Option value="Định cư">Định cư</Select.Option>
                <Select.Option value="Du học">Du học</Select.Option>
                <Select.Option value="Khác">Khác</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default StudentModal;

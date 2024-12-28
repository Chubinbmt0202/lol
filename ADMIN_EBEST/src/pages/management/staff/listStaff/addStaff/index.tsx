import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Input, DatePicker, Select, Row, Col, message } from 'antd';
import moment from 'moment';
import { useStaffContext } from '@/context/StaffContext';

type Staff = {
  id: string;
  name: string;
  userName: string;
  password: string;
  phone: string;
  jobTitle: string;
  email: string;
  department: string;
  birthday: string;
  status: string;
  position: string;
  sex: string;
};

type StaffModalProps = {
  formValue: Staff;
  title: string;
  show: boolean;
  onOk: (values: Staff) => void;
  onCancel: VoidFunction;
};

const StaffModal: React.FC<StaffModalProps> = ({ title, show, formValue, onOk, onCancel }) => {
  const [form] = Form.useForm();
  const { addStaff } = useStaffContext();
  const [formData, setFormData] = useState<Staff>(formValue);

  useEffect(() => {
    form.setFieldsValue({
      ...formValue,
      birthday: formValue.birthday ? moment(formValue.birthday) : '',
    });
    setFormData(formValue);
  }, [formValue, form]);

  const handleBirthdateChange = (date: moment.Moment | null) => {
    setFormData((prev) => ({
      ...prev,
      birthday: date ? date.format('YYYY-MM-DD') : '',
    }));
  };

  const handleSelectChange = (field: keyof Staff) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log('Selected:', field, value);
  };

  console.log('Form data:', formData);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
console.log('Form values staff:', values);


      const isEditing = !!formData.id;

      const updatedFormData: Staff = {
        ...formData,
        ...values,
        id: isEditing ? formData.id : `staff_${Date.now()}`,
        birthday: values.birthday ? values.birthday.format('YYYY-MM-DD') : formData.birthday || '',
        position: values.position || formData.position || '',
        status: values.status || formData.status || 'Đang hoạt động',
        jobTitle: values.jobTitle || formData.jobTitle || '',
        sex: values.sex || formData.sex || '',
        phone: values.phone || formData.phone || '',
        email: values.email || formData.email || '',
      };

      if (isEditing) {
        message.success('Cập nhật nhân viên thành công!');
      } else {
        addStaff(updatedFormData);
        message.success(
          <div>
            <p>Thêm thành công nhân viên</p>
            <ul>
              <li><b>ID:</b> {updatedFormData.id}</li>
              <li><b>Họ và tên:</b> {updatedFormData.name}</li>
              <li><b>Tài khoản:</b> {updatedFormData.userName}</li>
              <li><b>Email:</b> {updatedFormData.email}</li>
              <li><b>Số điện thoại:</b> {updatedFormData.phone}</li>
              <li><b>Ngày sinh:</b> {updatedFormData.birthday}</li>
              <li><b>Giới tính:</b> {updatedFormData.sex}</li>
              <li><b>Chức vụ:</b> {updatedFormData.jobTitle}</li>
            </ul>
          </div>
        );
      }
    } catch (errorInfo) {
      console.error('Error submitting form:', errorInfo);
    }
  };


  return (
    <Modal
      footer={[
        <Button key="back" onClick={onCancel}>
          Huỷ
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Tạo mới nhân viên
        </Button>,
      ]}
      title={title}
      visible={show}
      onCancel={onCancel}
      className="custom-modal"
    >
      <hr />
      <p className="text-blue-200 my-3">Thông tin tài khoản</p>
      <Form
        initialValues={formValue}
        form={form}
        labelCol={{ span: 9 }}
        wrapperCol={{ span: 32 }}
        layout="horizontal"
        className="space-y-4"
        onValuesChange={(changedValues, allValues) => {
          setFormData((prevData) => ({
            ...prevData,
            ...allValues,
          }));
        }}
      >
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
            <Form.Item name="birthday">
              <p>Ngày sinh</p>
              <DatePicker className="w-full" onChange={handleBirthdateChange} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="sex">
              <p>Giới tính</p>
              <Select className="w-full" onChange={handleSelectChange('sex')}>
                <Select.Option value="Nam">Nam</Select.Option>
                <Select.Option value="Nữ">Nữ</Select.Option>
                <Select.Option value="other">Khác</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="jobTitle">
              <p>Chức vụ</p>
              <Select className="w-full" onChange={handleSelectChange('jobTitle')}>
                <Select.Option value="Admin">Admin</Select.Option>
                <Select.Option value="Giáo viên">Giáo viên</Select.Option>
                <Select.Option value="Giáo vụ">Giáo vụ</Select.Option>
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
      </Form>
    </Modal>
  );
};

export default StaffModal;

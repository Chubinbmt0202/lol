import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Input, DatePicker, Select, Row, Col, message } from 'antd';
import moment from 'moment';

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
  fetchStaff: () => Promise<void>; // Thêm prop fetchStaff
};

const StaffModal: React.FC<StaffModalProps> = ({ title, show, formValue, onOk, onCancel, fetchStaff }) => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<Staff>(formValue);

  useEffect(() => {
    form.setFieldsValue({
      ...formValue,
      birthday: formValue.birthday ? moment(formValue.birthday) : undefined,
    });
    setFormData(formValue);
  }, [formValue]);

  const handleBirthdateChange = (date: moment.Moment | null) => {
    setFormData((prev) => ({
      ...prev,
      birthday: date ? date.format('YYYY-MM-DD') : '',
    }));
    form.setFieldsValue({ birthday: date }); // Cập nhật giá trị trong form
  };

  const handleSelectChange = (field: keyof Staff) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    form.setFieldsValue({ [field]: value }); // Cập nhật giá trị trong form
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log('Form values:', values);

      const response = await fetch('http://localhost:5000/api/addTeacher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.status === 200) {
        message.success("Thêm nhân viên thành công");
        // đóng modal
        onCancel();
        // gọi lại fetchStaff để load lại danh sách nhân viên
        fetchStaff();
      } else {
        message.error("Thêm nhân viên thất bại");
      }

      const isEditing = !!formData.id;

      if (isEditing) {
        message.success('Cập nhật nhân viên thành công!');
      } else {
        message.success('Tạo mới nhân viên thành công!');
        console.log('Câsldkj:');
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
          {formData.id ? 'Cập nhật nhân viên' : 'Tạo mới nhân viên'}
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
                <Select.Option value="giaovien">Giáo viên</Select.Option>
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
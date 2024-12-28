// src/components/EditCourseModal.tsx
import React, { useEffect } from 'react';

interface ClassModalProps {
  title: string;
  show: boolean;
  formValue: any;
  onOk: () => void;
  onCancel: () => void;
}
import { Modal, Form, Input, Button, Row, Col, Select, DatePicker, TimePicker } from 'antd';
import dayjs from 'dayjs';

const EditCourseModal = ({ title, show, formValue, onOk, onCancel }: ClassModalProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ ...formValue });
  }, [formValue, form]);

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    alert('Form values: ' + JSON.stringify(values, null, 2));
    console.log('Form values:', values);
  };

  return (
    <Modal
      footer={[<Button key="back" onClick={onCancel}>Huỷ</Button>, <Button type="primary" onClick={handleSubmit}>Cập nhật</Button>]}
      title={title}
      open={show}
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
        <p>Thông tin lớp học</p>
        <Form.Item
          name="fullName"
          className="mt-[-10px]"
          rules={[{ required: true, message: 'Vui lòng nhập tên lớp!' }]}
        >
          Nhập tên lớp
          <Input />
        </Form.Item>
        {/* Các trường khác cho cập nhật khóa học */}
      </Form>
    </Modal>
  );
};

export default EditCourseModal;

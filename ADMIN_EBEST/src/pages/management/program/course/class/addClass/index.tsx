import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Select, DatePicker, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { useParams, useLocation } from 'react-router-dom';

interface ClassModalProps {
  title: string;
  show: boolean;
  formValue: any;
  onOk: (values: any) => void;
  onCancel: () => void;
  idKhoaHoc: number; // Nhận idKhoaHoc từ props
}

const { Option } = Select;

const CreateCourseModal = ({ title, show, formValue, onOk, onCancel, idKhoaHoc }: ClassModalProps) => {
  const [form] = Form.useForm();
  const location = useLocation(); // Lấy thông tin về location (URL hiện tại)
  const [teachers, setTeachers] = useState<any[]>([]); // State để lưu danh sách giáo viên

  // Tách URL thành từng phần
  const pathParts = location.pathname.split('/'); // Split theo dấu "/"
  const idCourse = pathParts[4]; // '1'

  // Lấy danh sách giáo viên từ API
  useEffect(() => {
    fetch('http://localhost:5000/api/teachers')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.data.data)) {
          console.log('Teachers data:', data.data.data);
          setTeachers(data.data.data); // Giả sử API trả về trường `data` chứa danh sách giáo viên
        } else {
          console.error('Teachers data is not an array:', data.data.data);
          setTeachers([]); // Nếu không phải mảng, đặt teachers thành mảng rỗng
        }
      })
      .catch((error) => {
        console.error('Error fetching teachers:', error);
        setTeachers([]); // Nếu có lỗi khi gọi API, đặt teachers thành mảng rỗng
      });
  
    form.setFieldsValue({
      ...formValue,
      ngayMoLop: formValue.ngayMoLop ? dayjs(formValue.ngayMoLop) : null,
      ngayKetThuc: formValue.ngayKetThuc ? dayjs(formValue.ngayKetThuc) : null,
      phongHoc: formValue.phongHoc || null,
    });
  }, [formValue, form]);
  

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const formattedValues = {
        ...values,
        ngayMoLop: values.ngayMoLop ? dayjs(values.ngayMoLop).format('YYYY-MM-DD') : null,
        ngayKetThuc: values.ngayKetThuc ? dayjs(values.ngayKetThuc).format('YYYY-MM-DD') : null,
        gioHocTheoNgay: values.gioHocTheoNgay.map((item) => ({
          ngay: item.ngay,
          gioBatDau: dayjs(item.gioBatDau).format('HH:mm'),
          gioKetThuc: dayjs(item.gioKetThuc).format('HH:mm'),
        })),
        idKhoaHoc: idCourse, // Thêm idKhoaHoc vào dữ liệu gửi lên API
      };

      console.log('Form values:', formattedValues);

      // Gửi dữ liệu tới API bằng fetch
      fetch('http://localhost:5000/api/createClass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedValues),
      })
        .then((response) => response.json())
        .then((data) => {
          alert('Class created successfully: ' + JSON.stringify(data, null, 2));
          console.log('Class created successfully:', data);
        })
        .catch((error) => {
          alert('Error creating class: ' + error.message);
          console.error('Error creating class:', error);
        });
    });
  };

  return (
    <Modal
      footer={[
        <Button key="back" onClick={onCancel}>Huỷ</Button>,
        <Button type="primary" onClick={handleSubmit}>Tạo mới</Button>,
      ]}
      title="Tạo mới lớp học"
      open={show}
      onCancel={onCancel}
      className="custom-modal"
    >
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
      >
        <Form.Item
          name="tenLop"
          label="Tên lớp"
          rules={[{ required: true, message: 'Vui lòng nhập tên lớp!' }]}
        >
          <Input placeholder="Nhập tên lớp" />
        </Form.Item>

        <Form.Item
          name="idGiaoVien"
          label="Giáo viên"
          rules={[{ required: true, message: 'Chọn giáo viên' }]}
        >
          <Select placeholder="Chọn giáo viên">
            {teachers.map((teacher) => (
              <Option key={teacher.idnguoidung} value={teacher.idnguoidung}>
                {teacher.hoTen}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="phongHoc"
          label="Chọn phòng học"
          rules={[{ required: true, message: 'Chọn phòng học' }]}
        >
          <Select placeholder="Chọn phòng">
            <Option value="Phòng 1">Lớp A</Option>
            <Option value="Phòng 1">Lớp B</Option>
            <Option value="Phòng 1">Lớp C</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="soLuongHocVien"
          label="Số lượng học viên"
          rules={[{ required: true, message: 'Vui lòng nhập số lượng học viên!' }]}
        >
          <Input type="number" placeholder="Nhập số lượng học viên" />
        </Form.Item>

        <Form.Item
          name="ngayMoLop"
          label="Ngày mở lớp"
          rules={[{ required: true, message: 'Chọn ngày mở lớp' }]}
        >
          <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="ngayKetThuc"
          label="Ngày kết thúc"
        >
          <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
        </Form.Item>

        <Form.List name="gioHocTheoNgay">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} style={{ display: 'flex', marginBottom: 8 }}>
                  <Form.Item
                    {...restField}
                    name={[name, 'ngay']}
                    label="Ngày học"
                    rules={[{ required: true, message: 'Chọn ngày học' }]}
                    style={{ flex: 1 }}
                  >
                    <Select placeholder="Chọn ngày học">
                      <Option value="Thứ 2">Thứ 2</Option>
                      <Option value="Thứ 3">Thứ 3</Option>
                      <Option value="Thứ 4">Thứ 4</Option>
                      <Option value="Thứ 5">Thứ 5</Option>
                      <Option value="Thứ 6">Thứ 6</Option>
                      <Option value="Thứ 7">Thứ 7</Option>
                      <Option value="Chủ nhật">Chủ nhật</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'gioBatDau']}
                    rules={[{ required: true, message: 'Chọn giờ bắt đầu' }]}
                    style={{ flex: 1 }}
                  >
                    <TimePicker format="HH:mm" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'gioKetThuc']}
                    rules={[{ required: true, message: 'Chọn giờ kết thúc' }]}
                    style={{ flex: 1 }}
                  >
                    <TimePicker format="HH:mm" />
                  </Form.Item>
                  <Button onClick={() => remove(name)}>-</Button>
                </div>
              ))}
              <Button type="dashed" onClick={() => add()}>+ Thêm lịch học</Button>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default CreateCourseModal;

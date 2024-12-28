// import { useQuery } from '@tanstack/react-query';
import { EditOutlined, EllipsisOutlined, ExpandOutlined } from '@ant-design/icons';
import {
  Card,
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  InputNumber,
  Space,
  Avatar,
} from 'antd';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from '@/router/hooks';

import '../../student/listStudent/modal.css';

import { Course } from '#/entity';

export default function OrganizationPage() {
  const [searchForm] = Form.useForm();
  const { push } = useRouter();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [courseDataFetch, setCourseDataFetch] = useState<Array<{
    idKhoaHoc: number;
    tenKhoaHoc: string;
    mota: string;
    soLuongLop: string;
    hocPhi: number;
  }> | null>(null);

  const [courseModalPros, setCourseModalProps] = useState<CourseModalProps>({
    formValue: {
      id: '',
      name: '',
      desc: '',
      numberClass: 0,
      fee: 0,
    },
    title: 'New',
    show: false,
    onOk: () => {
      setCourseModalProps((prev) => ({ ...prev, show: false }));
    },
    onCancel: () => {
      setCourseModalProps((prev) => ({ ...prev, show: false }));
    },
  });

  const onCreate = () => {
    setVisible(true);
  };

  function handleDetail(course: {
    idKhoaHoc: number;
    tenKhoaHoc: string;
    moTa: string;
    numberClass: string;
    hocPhi: number;
  }): void {
    console.log('Course Details:', course);
    // Navigate to the course detail page
    console.log('Navigate to the course detail page', `${pathname}/${course.idKhoaHoc}`);
    localStorage.setItem('courseSelect', JSON.stringify(course));
    push(`${pathname}/${course.idKhoaHoc}`);
  }

  const handleDelete = (course: {
    idKhoaHoc: number;
    tenKhoaHoc: string;
    moTa: string;
    numberClass: string;
    hocPhi: number;
  }): void => {
    // Delete course from API or database
    alert("Delete course")
  };

  const handleUpdate = (course: {
    idKhoaHoc: number;
    tenKhoaHoc: string;
    moTa: string;
    numberClass: string;
    hocPhi: number;
  }): void => {
    // Set course data to state and show modal
    setCourseData(course);
    form.setFieldsValue(course);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setVisible(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log('Validation failed:', info);
      });
  };


  const fetchCourse = async () => {
    // Fetch course data from API or database
    try {
      const response = await fetch('http://localhost:5000/api/getAllCourse');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      } else {
        const data = await response.json();
        console.log('Fetch data successfully', data.data.data);
        setCourseDataFetch(data.data.data);
      }
    } catch (error) {
      alert(error);
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    // fetch data course
    fetchCourse();
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [courseData, setCourseData] = useState<{
    idKhoaHoc: number;
    tenKhoaHoc: string;
    moTa: string;
    numberClass: string;
    hocPhi: number;
  } | null>(null);

  const handleSubmit = async () => {
    const formValues = form.getFieldsValue();
    
    if (formValues) {
      console.log('Form values:', formValues);
      
      // Bật loading state
      setIsLoading(true);
      
      try {
        // Gọi API với phương thức POST
        const response = await fetch('http://localhost:5000/api/createCourse', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Đảm bảo gửi dữ liệu ở dạng JSON
          },
          body: JSON.stringify(formValues), // Chuyển formValues thành chuỗi JSON
        });
        
        // Kiểm tra xem API có trả về thành công không
        if (response.ok) {
          const data = await response.json();
          console.log('API response:', data);
          alert('Thêm khoá học thành công');
          fetchCourse();
          // Xử lý dữ liệu trả về nếu cần
          setVisible(false); // Đóng modal
        } else {
          console.error('API Error:', response.statusText);
        }
      } catch (error) {
        console.error('Fetch Error:', error);
      } finally {
        // Tắt loading sau khi xong
        setIsLoading(false);
      }
    } else {
      console.log('Form values:', formValues);
    }
  };
  

  const [form] = Form.useForm();
  return (
    <Space direction="vertical" size="large" className="w-full">
      <Card>
        <Form form={searchForm}>
          <Row justify="space-between" align="middle" gutter={[16, 16]}>
            <Col span={6}>
              <Form.Item label="Tên khoá học" name="name" className="!mb-0">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <div className="flex justify-end">
                {/* <Button onClick={onSearchFormReset}>Reset</Button> */}
                <Button type="primary" className="ml-4">
                  Tìm khoá học
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card
        title="Danh sách khoá học"
        
        extra={
          <div>
            <Button type="primary" onClick={onCreate}>
              Thêm khoá học mới
            </Button>
          </div>
        }
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
          {courseDataFetch && courseDataFetch.map((course, index) => (
            <Card
              key={index}
              style={{ width: '47%', marginBottom: '2%' }}
              actions={[
                <ExpandOutlined onClick={() => handleDetail(course)} />,
                // <ExpandOutlined onClick={() => push(`${pathname}/${course.idKhoaHoc}`)} />,
                <EditOutlined key="edit" onClick={() => handleUpdate(course)} />,
                <EllipsisOutlined key="ellipsis" onClick={() => handleDelete(course)} />,
              ]}
            >
              <Card.Meta
                avatar={<Avatar src="../../../../assets/icons/ic-logo.svg" />}
                title={course.tenKhoaHoc}
                description={
                  <>
                    <p>{course.mota}</p>
                    <p className="font-bold">Số lượng lớp học: {course.soLuongLop}</p>
                    <p className="font-bold">
                      Học phí:
                      {course.hocPhi.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </p>
                  </>
                }
              />
            </Card>
          ))}
        </div>
      </Card>

      <Modal
        title="Cập nhật thông tin khoá học"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Lưu cập nhật
          </Button>,
        ]}
      >
        <hr className="mb-3" />
        {courseData && (
          <Form form={form} layout="vertical" initialValues={courseData}>
            <Form.Item
              name="tenKhoaHoc"
              label="Tên khóa học"
              rules={[{ required: true, message: 'Please input the course name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="moTa"
              label="Mô tả"
              rules={[{ required: true, message: 'Please input the course description!' }]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              name="numberClass"
              label="Số lượng lớp học"
              rules={[{ required: true, message: 'Please input the number of classes!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="hocPhi"
              label="Học phí"
              rules={[{ required: true, message: 'Please input the price!' }]}
            >
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
          </Form>
        )}
      </Modal>

      <Modal
        visible={visible}
        onCancel={handleCancel}
        title="Thêm khoá học mới "
        footer={[
          <Button key="back" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Thêm khóa học
          </Button>,
        ]}
      >
        <hr className="mb-3" />
          <Form form={form} layout="vertical">
            <Form.Item
              name="tenKhoaHoc"
              label="Tên khóa học"
              rules={[{ required: true, message: 'Please input the course name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="mota"
              label="Mô tả"
              rules={[{ required: true, message: 'Please input the course description!' }]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              name="soLuongLop"
              label="Số lượng lớp học"
              rules={[{ required: true, message: 'Please input the number of classes!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="hocPhi"
              label="Học phí"
              rules={[{ required: true, message: 'Please input the price!' }]}
            >
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
          </Form>
      </Modal>
    </Space>
  );
}

type CourseModalProps = {
  formValue: Course;
  title: string;
  show: boolean;
  onOk: VoidFunction;
  onCancel: VoidFunction;
};


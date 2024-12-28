// src/pages/OrganizationPage.tsx
import React, { useState, useEffect } from 'react';
import { Button, Card, Form, Input, Row, Col, Select, Space, Table, Popconfirm, Dropdown, Menu } from 'antd';
import { useRouter, usePathname } from '@/router/hooks';
import CreateCourseModal from './addClass/index';
import { MoreOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

interface ClassModalProps {
  formValue: {
    id: string;
    name: string;
    numberStudent: number;
    createDate: string;
    endDate: string;
    status: string;
  };
  title: string;
  show: boolean;
  onOk: () => void;
  onCancel: () => void;
}

export default function OrganizationPage() {
  const [searchForm] = Form.useForm();
  const { id } = useParams();
  const [classes, setClasses] = useState<any[]>([]);
  const { push } = useRouter();
  const pathname = usePathname();

  const fetchDataClass = async (): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:5000/api/getClassByCourses/${id}`);
      const data = await response.json();  // Chuyển dữ liệu thành JSON
      console.log('Dữ liệu từ API Admin:', data.data.data);  // Log dữ liệu
      const dataClasses = data.data.data;
      setClasses(dataClasses);  // Lưu dữ liệu vào state
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);  // Log lỗi nếu có
    }
  };
  
  useEffect(() => {
    fetchDataClass();
  }, [id]);

    // Hàm để định dạng ngày
    const formatDate = (dateString: string) => {
      return format(new Date(dateString), 'dd-MM-yyyy'); // Định dạng ngày kiểu DD-MM-YYYY
    };

  const [studentModalPros, setStudentModalProps] = useState<ClassModalProps>({
    formValue: {
      id: '',
      name: '',
      numberStudent: 1,
      createDate: 'Đã thanh toán',
      endDate: '30-06-2024',
      status: 'Đang mở',
    },
    title: 'New',
    show: false,
    onOk: () => {
      setStudentModalProps((prev) => ({ ...prev, show: false }));
    },
    onCancel: () => {
      setStudentModalProps((prev) => ({ ...prev, show: false }));
    },
  });

  const onCreate = () => {
    setStudentModalProps((prev) => ({ ...prev, show: true })); //
  };

  interface DataType {
    id: string;
    name: string;
    numberStudent: number;
    createDate: string;
    endDate: string;
    price: string;
    status?: string;
  }

  interface ColumnType {
    title: string;
    dataIndex?: string;
    key?: string;
    align?: 'center';
    width?: number;
    render?: (_: any, record: DataType) => JSX.Element;
  }

  const handleDetail = (record: DataType) => {
    const idLop = record.idLop;
    // navigate(`/course/${id}/${idLop}`);
    push(`${pathname}/${idLop}`);
  };

  const columns: ColumnType[] = [
    { title: 'Tên lớp học', dataIndex: 'tenLop', width: 200 },
    { title: 'Số lượng học viên', dataIndex: 'soLuongHocVien', align: 'center', width: 100 },
    { title: 'Ngày mở lớp', dataIndex: 'ngayMoLop', align: 'center', width: 120, render: (text: string) => <span>{formatDate(text)}</span> },
    { title: 'Ngày kết thúc', dataIndex: 'ngayKetThuc', align: 'center', width: 120, render: (text: string) => <span>{formatDate(text)}</span> },
    { title: 'Giáo viên phụ trách', dataIndex: 'tenGiaoVien', align: 'center', width: 120 },
    {
      title: 'Hành động',
      key: 'operation',
      align: 'center',
      width: 80,
      render: (_, record) => {
        const menu = (
          <Menu>
            <Menu.Item key="edit">
              Sửa
            </Menu.Item>
            <Menu.Item key="view" onClick={() => handleDetail(record)}>
              Xem
            </Menu.Item>
            <Menu.Item key="delete">
              <Popconfirm title="Bạn muốn xoá lớp học này?" okText="Yes" cancelText="No">
                Xoá
              </Popconfirm>
            </Menu.Item>
          </Menu>
        );

        return (
          <Dropdown overlay={menu} trigger={['click']}>
            <Button icon={<MoreOutlined />} />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <Space direction="vertical" size="large" className="w-full">
      <Card>
        <Form form={searchForm}>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Form.Item label="Tên lớp" name="name">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Trạng thái" name="statusSalary">
                <Select>
                  <Select.Option value="enable">Đang học</Select.Option>
                  <Select.Option value="disable">Đã khoá</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6} offset={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type="primary">Tìm lớp học</Button>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card
        title={`Danh sách lớp học trong khoá : Tiếng Anh Giao tiếp C201`}
        extra={
          <Button type="primary" onClick={onCreate}>
            Thêm mới lớp học
          </Button>
        }
      >
        <Table
          rowKey="idLop"
          size="small"
          pagination={false}
          dataSource={classes}
          columns={columns}
        />
      </Card>

      <CreateCourseModal {...studentModalPros} />
      {/* <EditCourseModal {...studentModalPros} /> */}
    </Space>
  );
}

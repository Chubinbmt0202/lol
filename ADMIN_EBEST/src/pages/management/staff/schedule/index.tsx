// import { useQuery } from '@tanstack/react-query';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  DatePicker,
} from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import { useEffect, useState } from 'react';

import { IconButton, Iconify } from '@/components/icon';
import ProTag from '@/theme/antd/components/tag';

import { Organization, Teacher as OriginalTeacher } from '#/entity';

interface Teacher extends OriginalTeacher {
  status: 'Đang hoạt động' | 'Đã khoá';
}

type SearchFormFieldType = Pick<Organization, 'name' | 'status'>;

export default function OrganizationPage() {
  const [searchForm] = Form.useForm();
  const [teacherModalPros, setTeacherModalProps] = useState<TeacherModalProps>({
    formValue: {
      id: '',
      name: '',
      email: '',
      phone: '',
      position: 'Admin',
      status: 'Đang hoạt động',
    },
    title: 'New',
    show: false,
    onOk: () => {
      setTeacherModalProps((prev) => ({ ...prev, show: false }));
    },
    onCancel: () => {
      setTeacherModalProps((prev) => ({ ...prev, show: false }));
    },
  });

  const data: Teacher[] = [
    {
      id: '1',
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      phone: '0123456789',
      position: 'Giáo viên',
      status: 'Đang hoạt động',
    },
    {
      id: '2',
      name: 'Trần Thị B',
      email: 'tranthib@example.com',
      phone: '0987654321',
      position: 'Giáo vụ',
      status: 'Đã khoá',
    },
    {
      id: '3',
      name: 'Lê Văn C',
      email: 'levanc@example.com',
      phone: '0912345678',
      position: 'Giáo viên',
      status: 'Đã khoá',
    },
    {
      id: '4',
      name: 'Phạm Thị D',
      email: 'phamthid@example.com',
      phone: '0943218765',
      position: 'Admin',
      status: 'Đang hoạt động',
    },
  ];

  const columns: ColumnsType<Teacher> = [
    { title: 'Họ tên nhân viên', dataIndex: 'name', width: 150 },
    { title: 'Email', dataIndex: 'email', align: 'center', width: 150 },
    { title: 'Số điện thoại', dataIndex: 'phone', align: 'center', width: 150 },
    { title: 'Chức vụ', dataIndex: 'position', align: 'center', width: 150 },

    {
      title: 'Trạng thái',
      dataIndex: 'status',
      align: 'center',
      width: 120,
      render: (status) => (
        <ProTag color={status === 'enable' ? 'success' : 'error'}>{status}</ProTag>
      ),
    },
    {
      title: 'Hành động',
      key: 'operation',
      align: 'center',
      width: 100,
      render: (_, record) => (
        <div className="flex w-full justify-center text-gray">
          <IconButton onClick={() => onEdit(record)}>
            <Iconify icon="solar:pen-bold-duotone" size={18} />
          </IconButton>
          <Popconfirm title="Delete the Organization" okText="Yes" cancelText="No" placement="left">
            <IconButton>
              <Iconify icon="mingcute:delete-2-fill" size={18} className="text-error" />
            </IconButton>
          </Popconfirm>
        </div>
      ),
    },
  ];

  // rowSelection objects indicates the need for row selection
  const rowSelection: TableRowSelection<Teacher> = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  const onSearchFormReset = () => {
    searchForm.resetFields();
  };

  const onCreate = () => {
    setTeacherModalProps((prev) => ({
      ...prev,
      show: true,
      title: 'Hồ sơ nhân viên',
      formValue: {
        ...prev.formValue,
        id: '',
        name: '',
        order: 1,
        desc: '',
        status: 'Đang hoạt động',
      },
    }));
  };

  const onEdit = (formValue: Teacher) => {
    setTeacherModalProps((prev) => ({
      ...prev,
      show: true,
      title: 'Edit',
      formValue,
    }));
  };

  return (
    <Space direction="vertical" size="large" className="w-full">
      <Card>
        <Form form={searchForm}>
          <Row gutter={[16, 16]}>
            <Col span={24} lg={6}>
              <Form.Item<SearchFormFieldType> label="Tên nhân viên" name="name" className="!mb-0">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24} lg={6}>
              <Form.Item<SearchFormFieldType> label="Chức vụ" name="status" className="!mb-0">
                <Select>
                  <Select.Option value="4">
                    <ProTag>Giáo viên</ProTag>
                  </Select.Option>
                  <Select.Option value="5">
                    <ProTag>Giáo vụ</ProTag>
                  </Select.Option>
                  <Select.Option value="6">
                    <ProTag>Admin</ProTag>
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24} lg={12}>
              <div className="flex justify-end">
                <Button type="primary" className="ml-4">
                  Tìm kiếm nhân viên
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card
        title="Danh sách nhân viên"
        extra={
          <div>
            <Button className="mr-2">Xuất file excel</Button>
            <Button type="primary" onClick={onCreate}>
              Thêm nhân viên
            </Button>
          </div>
        }
      >
        <Table
          rowKey="id"
          size="small"
          scroll={{ x: 'max-content' }}
          pagination={false}
          columns={columns}
          dataSource={data}
          // rowSelection={{ ...rowSelection }}
        />
      </Card>

      <OrganizationModal {...teacherModalPros} />
    </Space>
  );
}

type TeacherModalProps = {
  formValue: Teacher;
  title: string;
  show: boolean;
  onOk: VoidFunction;
  onCancel: VoidFunction;
};

type OrganizationModalProps = {
  formValue: Organization;
  title: string;
  show: boolean;
  onOk: VoidFunction;
  onCancel: VoidFunction;
};

function OrganizationModal({ title, show, formValue, onOk, onCancel }: TeacherModalProps) {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ ...formValue });
  }, [formValue, form]);
  return (
    <Modal
      footer={[
        <Button key="back">Huỷ</Button>,
        <Button key="submit" type="primary">
          Lưu
        </Button>,
      ]}
      title={title}
      open={show}
      onOk={onOk}
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
        <div className=" flex gap-8">
          <Form.Item
            name="account"
            rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }]}
          >
            Tài khoản
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            Mật khẩu
            <Input.Password />
          </Form.Item>
        </div>
        <p>Thông tin cá nhân</p>
        <Form.Item
          name="fullName"
          className="mt-[-10px]"
          rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
        >
          Nhập họ và tên
          <Input />
        </Form.Item>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="birthdate" className="!mb-0">
              <p>Ngày sinh</p>
              <DatePicker className="w-full" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="sex" className="!mb-0">
              <p>Giới tính</p>
              <Select className="w-full">
                <Select.Option value="male">Nam</Select.Option>
                <Select.Option value="female">Nữ</Select.Option>
                <Select.Option value="other">Khác</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="job" className="!mb-0">
              <p>Chức vụ</p>
              <Select className="w-full">
                <Select.Option value="student">Admin</Select.Option>
                <Select.Option value="employee">Giáo viên</Select.Option>
                <Select.Option value="freelancer">Giáo vụ</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <p>Số điện thoại</p>
            <Form.Item
              name="phone"
              rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
            >
              <Input className="w-full" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <p>Email</p>
            <Form.Item name="email">
              <Input className="w-full" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

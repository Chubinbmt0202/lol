// import { useQuery } from '@tanstack/react-query';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  message
} from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import { useEffect, useState } from 'react';

import { IconButton, Iconify } from '@/components/icon';
import StaffModal from '../listStaff/addStaff/index';
import { useRouter, usePathname } from '@/router/hooks';
import ProTag from '@/theme/antd/components/tag';

import './modal.css';

import { Organization, Student, Teacher } from '#/entity';
import type { DatePickerProps } from 'antd';
import { useStudentContext } from '@/context/StudentContext';
import { useStaffContext } from '@/context/StaffContext';

type SearchFormFieldType = Pick<Organization, 'name' | 'status'>;
type SearchFormType = Pick<Student, 'name' | 'statusSalary' | 'statusLearn'>;

export default function OrganizationPage() {
  const [searchForm] = Form.useForm();
  const { deleteStudent } = useStudentContext();
  const { push } = useRouter();
  const {staffData} = useStaffContext();
  const [staffDataApi, setStaffDataApi] = useState([]);
  console.log('Staff data in list:', staffData);
  const pathname = usePathname();
  const [selectedRowKeys, setselectedRowKeys] = useState<React.Key[]>([]);
  const [studentSelected, setStudentSelected] = useState<Student[]>([]);

  const [deleteStaffModalProps, setDeleteStaffModalProps] = useState<{
    show: boolean;
    title: string;
    onOk: VoidFunction;
  } | null>(null);

  const [StaffModalPros, setStaffModalProps] = useState<StaffModalProps>({
    formValue: {
      id: '',
      name: '',
      userName: '',
      password: '',
      phone: '',
      email: '',
      birthdate: '',
      sex: '',
      position: '',
      status: '',
    },
    title: 'New',
    show: false,
    onOk: () => {
      setStaffModalProps((prev) => ({ ...prev, show: false }));
    },
    onCancel: () => {
      setStaffModalProps((prev) => ({ ...prev, show: false }));
    },
  });

  const columns: ColumnsType<Teacher> = [  
    { title: 'Họ tên nhân viên', dataIndex: 'hoTen', width: 200 },
    { title: 'Ngày sinh', dataIndex: 'ngaydangki', align: 'center', width: 100 },
    { title: 'Số điện thoại', dataIndex: 'sdt', align: 'center', width: 100 },
    { title: 'Chức vụ', dataIndex: 'vaitro', align: 'center', width: 100 },
    { title: 'Giới tính', dataIndex: 'sex', align: 'center', width: 100 },
    {
      title: 'Trạng thái',
      dataIndex: 'trangthai',
      align: 'center',
      width: 120,
      render: (statusLearn) => (
        <ProTag color={statusLearn === 'Đang học' ? 'success' : 'warning'}>{statusLearn}</ProTag>
      ),
    },
    {
      title: 'Hành động     ',
      key: 'operation',
      align: 'center',
      width: 100,
      render: (_, record) => (
        <div className="flex w-full justify-center text-gray">
          <IconButton>
            <Iconify
              icon="mdi:card-account-details"
              onClick={() => handleDetailStudent(record.id)}
              size={18}
            />
          </IconButton>
          <IconButton>
            <Iconify icon="solar:pen-bold-duotone" size={18} />
          </IconButton>
          <Popconfirm
            title="Bạn muốn xoá nhân viên này"
            okText="Đồng ý"
            cancelText="Hủy"
            placement="left"
            onConfirm={() => handleDelete(record.id)}
          >
            <IconButton>
              <Iconify icon="mingcute:delete-2-fill" size={18} className="text-error" />
            </IconButton>
          </Popconfirm>
        </div>
      ),
    },
  ];

  interface OnSelectionChangeProps {
    newSelectedRowKeys: React.Key[];
  }

  const onSelectionChange = ({ newSelectedRowKeys }: OnSelectionChangeProps) => {
    setselectedRowKeys(newSelectedRowKeys);
  };

  // rowSelection objects indicates the need for row selection
  const rowSelection: TableRowSelection<Teacher> = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setselectedRowKeys(newSelectedRowKeys);
      // console.log('rowSelection.onChange', newSelectedRowKeys);
      onSelectionChange({ newSelectedRowKeys });
    },
    onSelect: (record, selected, newSelectRow) => {
      console.log(record, selected, newSelectRow);
      setStudentSelected(newSelectRow);
      console.log('onSelect', studentSelected);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  const onSearchFormReset = () => {
    searchForm.resetFields();
  };

  const handleDelete = (id: string) => {
    deleteStudent(id); // Gọi deleteStudent để xóa học viên từ context
  };
  
  const onDelete = () => {
    setDeleteStaffModalProps({
      show: true,
      title: 'Xác nhận xoá',
      onOk: () => {
        if (selectedRowKeys.length > 0) {
          selectedRowKeys.forEach((id) => {
            deleteStudent(id as string); // Xóa tất cả học viên được chọn
          });
        }
        setDeleteStaffModalProps(null); // Đóng modal sau khi xóa
      },
    });
  };

  const fetchStaff = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users');
      
      if(response.status !== 200) {
        throw new Error('Failed to fetch data');
      } else {
        console.log('Fetch data successfully');
        const data = await response.json();
        console.log('Dữ liệu khi lấy api:', data.data);
        setStaffDataApi(data.data);
        console.log('Dữ liệu sau khi set:', staffDataApi);
      }
    } catch (error) {
      console.log("error", error);
      message.error('Lỗi khi lấy dữ liệu');
    }
  }

  useEffect(() => {
    fetchStaff();
  }, []);

  const onCreate = () => {
    setStaffModalProps((prev) => ({
      ...prev,
      show: true,
      title: 'Tạo hồ sơ nhân viên',
      formValue: {
        ...prev.formValue,
        id: '',
        name: '',
        order: '',
        desc: '',
        status: 'Đang hoạt động',
      },
    }));
  };


  const handleDetailStudent = () => {
    console.log('handleDetailStudent');

    if (selectedRowKeys.length === 0) {
      alert('Please select a row');
    } else {
      alert(`Detail student: ${selectedRowKeys[0]}`);
      push(`${pathname}/${selectedRowKeys[0]}`);
    }
  };

  return (
    <Space direction="vertical" size="large" className="w-full">
      <Card>
        <Form form={searchForm}>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Form.Item<SearchFormType> label="Tên nhân viên" name="name" className="!mb-0">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item<SearchFormType> label="Chức vụ" name="statusSalary" className="!mb-0">
                <Select>
                  <Select.Option value="enable">
                    <ProTag>Giáo viên</ProTag>
                  </Select.Option>
                  <Select.Option value="disable">
                    <ProTag>Giáo vụ</ProTag>
                  </Select.Option>
                                    <Select.Option value="disable">
                    <ProTag>Giáo vụ</ProTag>
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item<SearchFormType>
                label="Trạng thái"
                name="statusLearn"
                className="!mb-0"
              >
                <Select>
                  <Select.Option value="1">
                    <ProTag color="success">Đang hoạt động</ProTag>
                  </Select.Option>
                  <Select.Option value="2">
                    <ProTag color="error">Đã khóa</ProTag>
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <div className="flex justify-end">
                {/* <Button onClick={onSearchFormReset}>Reset</Button> */}
                <Button type="primary" className="ml-4">
                  Tìm nhân viên
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
            <Button className="mr-3">
              Xuất file excel
            </Button>
            <Button type="primary" onClick={onCreate}>
              Thêm mới nhân viên
            </Button>
          </div>
        }
      >
        <Table
          rowKey="idnguoidung"
          size="small"
          scroll={{ x: 'max-content' }}
          pagination={false}
          dataSource={staffDataApi}
          columns={columns}
          rowSelection={{ ...rowSelection }}
        />
      </Card>

      <StaffModal
        formValue={StaffModalPros.formValue}
        title={StaffModalPros.title}
        show={StaffModalPros.show}
        onOk={StaffModalPros.onOk}
        onCancel={StaffModalPros.onCancel}
      />
      {deleteStaffModalProps && (
        <Modal
          title={deleteStaffModalProps.title}
          visible={deleteStaffModalProps.show}
          onOk={deleteStaffModalProps.onOk}
          onCancel={() => setDeleteStaffModalProps(null)}
        >
          <p>Bạn có muốn xoá học viên này?</p>
        </Modal>
      )}
    </Space>
  );
}

type StaffModalProps = {
  formValue: {
    id: string;
    name: string;
    userName: string;
    password: string;
    phone: string;
    email: string;
    birthdate: string;
    sex: string;
    position: string;
    status: string;
  };
  title: string;
  show: boolean;
  onOk: VoidFunction;
  onCancel: VoidFunction;
};

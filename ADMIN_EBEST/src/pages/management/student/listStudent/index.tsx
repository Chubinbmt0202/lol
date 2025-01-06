// import { useQuery } from '@tanstack/react-query';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
} from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import { useEffect, useState } from 'react';

import { IconButton, Iconify } from '@/components/icon';
import StudentModal from '../listStudent/addStudent';
import { useRouter, usePathname } from '@/router/hooks';
import ProTag from '@/theme/antd/components/tag';

import './modal.css';

import { Organization, Student } from '#/entity';
import type { DatePickerProps } from 'antd';
import { useStudentContext } from '@/context/StudentContext';

type SearchFormFieldType = Pick<Organization, 'name' | 'status'>;
type SearchFormType = Pick<Student, 'name' | 'statusSalary' | 'statusLearn'>;

export default function OrganizationPage() {
  const [searchForm] = Form.useForm();
  const {studentData} = useStudentContext();
  const [studentDataApi, setStudentDataApi] = useState([]);
  // const { deleteStudent } = useStudentContext();
  const { push } = useRouter();
  const pathname = usePathname();
  const [selectedRowKeys, setselectedRowKeys] = useState<React.Key[]>([]);
  const [studentSelected, setStudentSelected] = useState<Student[]>([]);

  const [deleteStudentModalProps, setDeleteStudentModalProps] = useState<{
    show: boolean;
    title: string;
    onOk: VoidFunction;
  } | null>(null);

  const [studentModalPros, setStudentModalProps] = useState<StudentModalProps>({
    formValue: {
      id: '',
      name: '',
      statusSalary: '',
      statusLearn: '',
      userName: '',
      password: '',
      phone: '',
      job: '',
      email: '',
      birthdate: '',
      sex: '',
      objectivesLearn: '',
      course: '',
    },
    title: 'New',
    show: false,
    onOk: () => {
      setStudentModalProps((prev) => ({ ...prev, show: false }));
      fetchDataStudent();
    },
    onCancel: () => {
      setStudentModalProps((prev) => ({ ...prev, show: false }));
    },
  });

  const columns: ColumnsType<Student> = [
    { title: 'Họ và tên học viên', dataIndex: 'ho_va_ten', width: 200 },
    { title: 'Lớp', dataIndex: 'lop_hoc_dang_ky', align: 'center', width: 100 },
    {
      title: 'Tình trạng học phí',
      dataIndex: 'trang_thai_hoc_vien',
      align: 'center',
      width: 120,
      render: (statusSalary) => (
        <ProTag color={statusSalary === 'Đã thanh toán' ? 'success' : 'error'}>
          {statusSalary}
        </ProTag>
      ),
    },
    {
      title: 'Tình trạng học',
      dataIndex: 'statusLearn',
      align: 'center',
      width: 120,
      render: (statusLearn) => (
        <ProTag color={statusLearn === 'Đang học' ? 'success' : 'warning'}>{statusLearn}</ProTag>
      ),
    },
    { title: 'Số điện thoại', dataIndex: 'so_dien_thoai', align: 'center', width: 120 },
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
              onClick={() => handleDetailStudent(record.idnguoidung)}
              size={18}
            />
          </IconButton>
          <IconButton onClick={() => onEdit(record)}>
            <Iconify icon="solar:pen-bold-duotone" size={18} />
          </IconButton>
          <Popconfirm
            title="Bạn muốn xoá học viên này"
            okText="Yes"
            cancelText="No"
            placement="left"
            onConfirm={() => handleDelete(record.idnguoidung)}
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
  const rowSelection: TableRowSelection<Student> = {
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
    console.log('handleDelete', id);
    deleteStudent(id);
  };

  const deleteStudent = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/deleteStudent/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        message.success('Xoá học viên thành công');
        fetchDataStudent();
      } else {  
        throw new Error('Failed to delete student');
      }
    } catch (error) {
      message.error('Xoá học viên thất bại');
      console.error('Delete student error:', error);
    }
  }
  
  const onDelete = () => {
    setDeleteStudentModalProps({
      show: true,
      title: 'Xác nhận xoá',
      onOk: () => {
        if (selectedRowKeys.length > 0) {
          selectedRowKeys.forEach((id) => {
            deleteStudent(id as string); // Xóa tất cả học viên được chọn
          });
        }
        setDeleteStudentModalProps(null); // Đóng modal sau khi xóa
      },
    });
  };

  const onCreate = () => {
    setStudentModalProps((prev) => ({
      ...prev,
      show: true,
      title: 'Tạo hồ sơ học viên',
      formValue: {
        ...prev.formValue,
        id: '',
        name: '',
        order: '',
        desc: '',
        status: 'enable',
      },
    }));
  };

  const onEdit = (formValue: Student) => {
    setStudentModalProps((prev) => ({
      ...prev,
      show: true,
      title: 'Chỉnh sửa học viên',
      formValue,
    }));
  };

  const handleDetailStudent = () => {
    console.log('handleDetailStudent');

    if (selectedRowKeys.length === 0) {
      alert('Please select a row');
    } else {
      push(`${pathname}/${selectedRowKeys[0]}`);
    }
  };

  const fetchDataStudent = async () => {
    const response = await fetch('http://localhost:5000/api/getAllStudent');
    const data = await response.json();
    console.log("dữ liệu toàn bộ học viên", data.data);
    setStudentDataApi(data.data);
    if (response.ok) {
      message.success('Lấy dữ liệu học viên thành công');
    } else {
      throw new Error('Failed to fetch data');
    }
  };

  useEffect(() => {
    fetchDataStudent();
  }, []);

  return (
    <Space direction="vertical" size="large" className="w-full">
      <Card>
        <Form form={searchForm}>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Form.Item<SearchFormType> label="Tên học viên" name="name" className="!mb-0">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item<SearchFormType> label="Học phí" name="statusSalary" className="!mb-0">
                <Select>
                  <Select.Option value="enable">
                    <ProTag color="success">Đã thanh toán</ProTag>
                  </Select.Option>
                  <Select.Option value="disable">
                    <ProTag color="error">Chưa thanh toán</ProTag>
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item<SearchFormType>
                label="Tình trạng học"
                name="statusLearn"
                className="!mb-0"
              >
                <Select>
                  <Select.Option value="1">
                    <ProTag color="success">Chờ xếp lớp</ProTag>
                  </Select.Option>
                  <Select.Option value="2">
                    <ProTag color="error">Đang học</ProTag>
                  </Select.Option>
                  <Select.Option value="3">
                    <ProTag color="error">Đã học xong</ProTag>
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <div className="flex justify-end">
                {/* <Button onClick={onSearchFormReset}>Reset</Button> */}
                <Button type="primary" className="ml-4">
                  Tìm học viên
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card
        title="Danh sách học viên"
        extra={
          <div>
            <Button className="mr-3" disabled={selectedRowKeys.length === 0} onClick={onDelete}>
              Xoá tài khoản
            </Button>
            <Button type="primary" onClick={onCreate}>
              Thêm mới học viên
            </Button>
          </div>
        }
      >
        <Table
          rowKey="idnguoidung"
          size="small"
          scroll={{ x: 'max-content' }}
          pagination={false}
          dataSource={studentDataApi}
          columns={columns}
          rowSelection={{ ...rowSelection }}
        />
      </Card>

      <StudentModal
        formValue={studentModalPros.formValue}
        title={studentModalPros.title}
        show={studentModalPros.show}
        onOk={studentModalPros.onOk}
        onCancel={studentModalPros.onCancel}
      />
      {deleteStudentModalProps && (
        <Modal
          title={deleteStudentModalProps.title}
          visible={deleteStudentModalProps.show}
          onOk={deleteStudentModalProps.onOk}
          onCancel={() => setDeleteStudentModalProps(null)}
        >
          <p>Bạn có muốn xoá học viên này?</p>
        </Modal>
      )}
    </Space>
  );
}

type StudentModalProps = {
  formValue: Student;
  title: string;
  show: boolean;
  onOk: VoidFunction;
  onCancel: VoidFunction;
};

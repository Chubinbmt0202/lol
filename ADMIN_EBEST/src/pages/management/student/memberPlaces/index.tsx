import {
  Button,
  Card,
  Col,
  Form,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  Row,
  Input,
  List,
  Radio,
} from 'antd';
import { TableRowSelection } from 'antd/es/table/interface';
import { useEffect, useState } from 'react';

import { IconButton, Iconify } from '@/components/icon';
import ProTag from '@/theme/antd/components/tag';

import { Organization, Student } from '#/entity';

type SearchFormFieldType = Pick<Organization, 'name' | 'status'>;

export default function OrganizationPage() {
  const [searchForm] = Form.useForm();
  const [enaleRowSelection, setEnableRowSelection] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]); // Trạng thái lưu trữ các key của hàng đã chọn

  const [organizationModalPros, setOrganizationModalProps] = useState<OrganizationModalProps>({
    formValue: {
      id: '',
      name: '',
      status: 'enable',
      statusLearn: 'enable',
    },
    title: 'New',
    show: false,
    onOk: () => {
      setOrganizationModalProps((prev) => ({ ...prev, show: false }));
    },
    onCancel: () => {
      setOrganizationModalProps((prev) => ({ ...prev, show: false }));
    },
    onContinue: () => {
      setOrganizationModalProps((prev) => ({ ...prev, show: false }));
    },
  });

  const [showModalMove, setShowModalMove] = useState(false); // For the second modal

  interface ColumnType {
    title: string;
    dataIndex?: string;
    key?: string;
    align?: 'left' | 'center' | 'right';
    width?: number;
    render?: (text: any, record: any) => JSX.Element;
  }

  const columns: ColumnType[] = [
    { title: 'Họ tên học viên', dataIndex: 'name', width: 150 },
    { title: 'Khoá học', dataIndex: 'order', align: 'center', width: 150 },
    { title: 'Số tiền', dataIndex: 'amount', align: 'center', width: 150 },
    { title: 'Trạng thái nộp tiền', dataIndex: 'statusPayment', align: 'center', width: 150 },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      align: 'center',
      width: 120,
      render: (status) => (
        <ProTag color={status === 'enable' ? 'success' : 'error'}>{status}</ProTag>
      ),
    },
    { title: 'Ngày đăng ký', dataIndex: 'date', align: 'center', width: 150 },
    {
      title: 'Hành động',
      key: 'operation',
      align: 'center',
      width: 100,
      render: (_, record) => (
        <div className="flex w-full justify-center text-gray">
          <IconButton>
            <Iconify icon="mdi:card-account-details" size={18} />
          </IconButton>
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

  const data = [
    {
      id: '1',
      name: 'Nguyễn Văn A',
      order: 'Tiếng anh nền tảng',
      amount: '1,000,000 VND',
      statusPayment: 'Đã thanh toán',
      status: 'enable',
      date: '01/01/2023',
    },
    {
      id: '2',
      name: 'Trần Thị B',
      order: 'Tiếng anh nền tảng',
      amount: '2,000,000 VND',
      statusPayment: 'Chưa thanh toán',
      status: 'disable',
      date: '05/01/2023',
    },
    {
      id: '3',
      name: 'Lê Văn C',
      order: 'Tiếng anh nâng cao',
      amount: '3,000,000 VND',
      statusPayment: 'Đã thanh toán',
      status: 'enable',
      date: '10/01/2023',
    },
    {
      id: '4',
      name: 'Hoàng Thị D',
      order: 'Khoá học ReactJS',
      amount: '1,500,000 VND',
      statusPayment: 'Chưa thanh toán',
      status: 'disable',
      date: '15/01/2023',
    },
    {
      id: '5',
      name: 'Phạm Văn E',
      order: 'Khoá học NodeJS',
      amount: '2,500,000 VND',
      statusPayment: 'Đã thanh toán',
      status: 'enable',
      date: '20/01/2023',
    },
    {
      id: '6',
      name: 'Vũ Thị F',
      order: 'Khoá học Machine Learning',
      amount: '3,500,000 VND',
      statusPayment: 'Chưa thanh toán',
      status: 'disable',
      date: '25/01/2023',
    },
  ];

  const onCreate = () => {
    setOrganizationModalProps((prev) => ({
      ...prev,
      show: true,
      title: 'Chọn khoá học',
      formValue: {
        ...prev.formValue,
        id: '',
        name: '',
        order: 1,
        desc: '',
        status: 'enable',
      },
    }));
  };

  const onEdit = (formValue: Organization) => {
    setOrganizationModalProps((prev) => ({
      ...prev,
      show: true,
      title: 'Edit',
      formValue,
    }));
  };

  const onContinue = () => {
    setOrganizationModalProps((prev) => ({
      ...prev,
      show: false, // Close the current modal
    }));
    // setShowModalMove(true); // Show the next modal
    setEnableRowSelection(true);
  };

  const rowSelection: TableRowSelection<Student> = {
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectedRowKeys(selectedRowKeys);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
      if (selected) {
        setSelectedRowKeys([record.id]);
      } else {
        setSelectedRowKeys([]);
      }
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  const classes = [
    { id: 1, name: 'Lớp A', currentStudents: 15, totalStudents: 30 },
    { id: 2, name: 'Lớp B', currentStudents: 20, totalStudents: 25 },
    { id: 3, name: 'Lớp C', currentStudents: 10, totalStudents: 20 },
  ];

  return (
    <Space direction="vertical" size="large" className="w-full">
      <Card>
        <Form form={searchForm}>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Form.Item label="Tên học viên" name="name" className="!mb-0">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Học phí" name="statusSalary" className="!mb-0">
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
              <Form.Item label="Tình trạng học" name="statusLearn" className="!mb-0">
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
        title="Đã chọn: "
        extra={
          <div>
            <Button
              className="mr-3"
              onClick={() => setShowModalMove(true)}
              disabled={selectedRowKeys.length === 0}
            >
              Chọn lớp
            </Button>
            <Button type="primary" onClick={onCreate}>
              Xếp lớp
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
          // rowSelection={{ ...rowSelection }}
          rowSelection={enaleRowSelection ? rowSelection : undefined}
          dataSource={data}
        />
      </Card>

      <OrganizationModal {...organizationModalPros} onContinue={onContinue} />
      <MoveOrganizationModal
        show={showModalMove}
        onCancel={() => setShowModalMove(false)}
        classes={classes}
      />
    </Space>
  );
}

type OrganizationModalProps = {
  formValue: Organization;
  title: string;
  show: boolean;
  onOk: VoidFunction;
  onCancel: VoidFunction;
  onContinue: VoidFunction; // Callback for continue button
};

function OrganizationModal({
  title,
  show,
  formValue,
  onOk,
  onCancel,
  onContinue,
}: OrganizationModalProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ ...formValue });
  }, [formValue, form]);

  return (
    <Modal
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={onContinue}>
          Tiếp tục
        </Button>,
      ]}
      title={title}
      open={show}
      onCancel={onCancel}
    >
      <Form
        initialValues={formValue}
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
      >
        <hr className="mb-7" />
        <Col>
          <Form.Item name="job" className="!mb-0" label="Khoá học">
            <Select className="w-full">
              <Select.Option value="student">Tiếng anh giao tiếp</Select.Option>
              <Select.Option value="employee">Tiếng anh trung cấp</Select.Option>
              <Select.Option value="freelancer">Tiếng anh nền tảng</Select.Option>
              <Select.Option value="other">Tiếng anh cấp tốc</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col className="mt-3">
          <Form.Item className="!mb-0 mt-7" label="Chọn lớp">
            <Select className="w-full">
              <Select.Option value="student">A201</Select.Option>
              <Select.Option value="employee">A202</Select.Option>
              <Select.Option value="freelancer">A203</Select.Option>
              <Select.Option value="other">A204</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Form>
    </Modal>
  );
}
interface Class {
  id: number;
  name: string;
  currentStudents: number;
  totalStudents: number;
}

type MoveOrganizationModalProps = {
  show: boolean;
  onCancel: VoidFunction;
  classes: Class[];
};

function MoveOrganizationModal({ show, onCancel, classes }: MoveOrganizationModalProps) {
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);

  const handleRadioChange = (e: any) => {
    setSelectedClassId(e.target.value); // Lưu ID lớp được chọn
    console.log(`radio checked: ${e.target.value}`);
  };

  const handleSelectData = () => {
    console.log('Chọn lớp có id là:', selectedClassId);
    onCancel(); // Close the modal
  };
  return (
    <Modal
      title="Xếp lớp cho học viên"
      open={show}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Hủy
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => handleSelectData()}
          disabled={!selectedClassId} // Disable button if no class selected
        >
          Duyệt
        </Button>,
      ]}
    >
      <List
        bordered
        dataSource={classes}
        renderItem={(item) => (
          <List.Item>
            <Radio
              value={item.id}
              checked={selectedClassId === item.id}
              onChange={handleRadioChange}
            >
              <strong className="ml-3">{item.name}</strong> - {item.currentStudents}/
              {item.totalStudents} học viên
            </Radio>
          </List.Item>
        )}
      />
    </Modal>
  );
}

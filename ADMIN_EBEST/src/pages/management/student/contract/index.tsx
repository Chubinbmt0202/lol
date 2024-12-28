// import { useQuery } from '@tanstack/react-query';
import { Button, Card, Form, Input, InputNumber, Modal, Popconfirm, Radio, Space } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import { useEffect, useState } from 'react';

import { IconButton, Iconify } from '@/components/icon';
import ProTag from '@/theme/antd/components/tag';

import { Organization } from '#/entity';

type SearchFormFieldType = Pick<Organization, 'name' | 'status'>;

export default function OrganizationPage() {
  const [searchForm] = Form.useForm();
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
  });

  const columns: ColumnsType<Organization> = [
    { title: 'Name', dataIndex: 'name', width: 300 },
    { title: 'Order', dataIndex: 'order', align: 'center', width: 60 },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      width: 120,
      render: (status) => (
        <ProTag color={status === 'enable' ? 'success' : 'error'}>{status}</ProTag>
      ),
    },
    { title: 'Desc', dataIndex: 'desc', align: 'center', width: 300 },
    {
      title: 'Action',
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
  const rowSelection: TableRowSelection<Organization> = {
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

  // const { data } = useQuery({
  //   queryKey: ['orgs'],
  //   queryFn: orgService.getOrgList,
  // });

  const onSearchFormReset = () => {
    searchForm.resetFields();
  };

  const onCreate = () => {
    setOrganizationModalProps((prev) => ({
      ...prev,
      show: true,
      title: 'Create New',
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

  return (
    <Space direction="vertical" size="large" className="w-full">
      <Card
        title="Quản lý hợp đồng"
        extra={
          <Button type="primary" onClick={onCreate}>
            Tạo mới hợp đồng
          </Button>
        }
      >
        <Table
          rowKey="id"
          size="small"
          scroll={{ x: 'max-content' }}
          pagination={false}
          columns={columns}
          // dataSource={data}
          rowSelection={{ ...rowSelection }}
        />
      </Card>

      <OrganizationModal {...organizationModalPros} />
    </Space>
  );
}

type OrganizationModalProps = {
  formValue: Organization;
  title: string;
  show: boolean;
  onOk: VoidFunction;
  onCancel: VoidFunction;
};

function OrganizationModal({ title, show, formValue, onOk, onCancel }: OrganizationModalProps) {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ ...formValue });
  }, [formValue, form]);
  return (
    <Modal title={title} open={show} onOk={onOk} onCancel={onCancel} width={1000}>
      <Form
        initialValues={formValue}
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
      >
        <Form.Item<Organization> label="Name" name="name" required>
          <Input />
        </Form.Item>
        <Form.Item<Organization> label="Order" name="order" required>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item<Organization> label="Status" name="status" required>
          <Radio.Group optionType="button" buttonStyle="solid">
            <Radio value="enable"> Enable </Radio>
            <Radio value="disable"> Disable </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item<Organization> label="Desc" name="desc">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}

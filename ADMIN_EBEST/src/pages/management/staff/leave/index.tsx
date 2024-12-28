import { Button, Card, Form, Input, Modal, Popconfirm, Select, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Table, { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';

import { IconButton, Iconify } from '@/components/icon';
import ProTag from '@/theme/antd/components/tag';

import { Organization, Teacher as OriginalTeacher } from '#/entity';

interface Teacher extends OriginalTeacher {
  status: 'Chờ duyệt' | 'Đã duyệt' | 'Không duyệt';
}

type SearchFormFieldType = Pick<Organization, 'name' | 'status'>;

type TeacherModalProps = {
  formValue: Teacher;
  title: string;
  show: boolean;
  onOk: (values: Partial<Teacher>) => void;
  onCancel: VoidFunction;
};

export default function OrganizationPage() {
  const [searchForm] = Form.useForm();
  const [data, setData] = useState<Teacher[]>([
    {
      id: '1',
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      dateStart: '20/12/2024',
      dateEnd: '20/12/2024',
      position: 'Giáo viên',
      status: 'Chờ duyệt',
    },
  ]);

  const [teacherModalProps, setTeacherModalProps] = useState<TeacherModalProps>({
    formValue: {
      id: '',
      name: '',
      email: '',
      dateStart: '',
      dateEnd: '',
      position: 'Giáo viên',
      status: 'Chờ duyệt',
    },
    title: '',
    show: false,
    onOk: () => { },
    onCancel: () => setTeacherModalProps((prev) => ({ ...prev, show: false })),
  });

  const getColor = (status: string) => {
    if (status === 'Đã duyệt') return 'success';
    if (status === 'Chờ duyệt') return 'warning';
    return 'error';
  };

  const columns: ColumnsType<Teacher> = [
    { title: 'Họ tên nhân viên', dataIndex: 'name', width: 150 },
    { title: 'Từ ngày', dataIndex: 'dateStart', align: 'center', width: 150 },
    { title: 'Đến ngày', dataIndex: 'dateEnd', align: 'center', width: 150 },
    { title: 'Chức vụ', dataIndex: 'position', align: 'center', width: 150 },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      align: 'center',
      width: 120,
      render: (status) => (
        <ProTag color={getColor(status)}>
          {status}
        </ProTag>
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
          <Popconfirm
            title="Xoá lịch nghỉ"
            okText="Yes"
            cancelText="No"
            placement="left"
            onConfirm={() => onDelete(record.id)}
          >
            <IconButton>
              <Iconify icon="mingcute:delete-2-fill" size={18} className="text-error" />
            </IconButton>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const onEdit = (formValue: Teacher) => {
    setTeacherModalProps({
      formValue,
      title: 'Duyệt lịch nghỉ nhân viên',
      show: true,
      onOk: (values) => {
        setData((prevData) =>
          prevData.map((item) => (item.id === formValue.id ? { ...item, ...values } : item)),
        );
        setTeacherModalProps((prev) => ({ ...prev, show: false }));
      },
      onCancel: () => setTeacherModalProps((prev) => ({ ...prev, show: false })),
    });
  };

  const onDelete = (id: string) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Space direction="vertical" size="large" className="w-full">
      <Card>
        <Form form={searchForm} layout="inline">
          <Form.Item<SearchFormFieldType> label="Tên nhân viên" name="name">
            <Input placeholder="Nhập tên nhân viên" />
          </Form.Item>
          <Form.Item<SearchFormFieldType> label="Trạng thái" name="status">
            <Select placeholder="Chọn trạng thái">
              <Select.Option value="Chờ duyệt">Chờ duyệt</Select.Option>
              <Select.Option value="Đã duyệt">Đã duyệt</Select.Option>
              <Select.Option value="Không duyệt">Không duyệt</Select.Option>
            </Select>
          </Form.Item>
          <Button type="primary">Tìm kiếm</Button>
        </Form>
      </Card>

      <Card title="Danh sách lịch nghỉ nhân viên">
        <Table
          rowKey="id"
          size="small"
          scroll={{ x: 'max-content' }}
          pagination={false}
          columns={columns}
          dataSource={data}
        />
      </Card>

      <TeacherModal {...teacherModalProps} />
    </Space>
  );
}

function TeacherModal({ title, show, formValue, onOk, onCancel }: TeacherModalProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(formValue);
  }, [formValue, form]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => onOk(values))
      .catch(() => { });
  };

  return (
    <Modal
      title={title}
      open={show}
      onCancel={onCancel}
      onOk={handleSubmit}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Huỷ
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Lưu
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="status"
          label="Trạng thái"
          rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
        >
          <Select>
            <Select.Option value="Đã duyệt">Đã duyệt</Select.Option>
            <Select.Option value="Chờ duyệt">Chờ duyệt</Select.Option>
            <Select.Option value="Không duyệt">Không duyệt</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="note" label="Ghi chú">
          <TextArea rows={4} placeholder="Nhập ghi chú" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

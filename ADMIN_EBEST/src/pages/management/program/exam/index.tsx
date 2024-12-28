import { ExpandOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Avatar,
  Drawer,
  Tabs,
  Table,
  message,
} from 'antd';
import { useState } from 'react';

import ProTag from '@/theme/antd/components/tag';

import { DetaiLQuestion } from '../../../../_mock/assets';

import { Organization } from '#/entity';

const { TabPane } = Tabs;
const { Option } = Select;

type SearchFormFieldType = Pick<Organization, 'name' | 'status'>;

export default function ExamPage() {
  const [searchForm] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newExam, setNewExam] = useState({
    tenBoDe: '',
    numberClass: '200',
    date: '',
  });

  const [cardData, setCardData] = useState([
    {
      idKhoaHoc: 1,
      tenBoDe: 'Bộ đề toeic 2021 - 1',
      numberClass: '200',
      date: '',
    },
    {
      idKhoaHoc: 2,
      tenBoDe: 'Bộ đề toeic 2021 - 2',
      numberClass: '200',
      date: '',
    },
    {
      idKhoaHoc: 3,
      tenBoDe: 'Bộ đề toeic 2021 - 3',
      numberClass: '200',
      date: '',
    },
  ]);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleCreateRandomExam = () => {
    if (!newExam.tenBoDe) {
      message.error('Vui lòng nhập tên bộ đề!');
      return;
    }
    setLoading(true);

    // Giả lập tạo bộ đề ngẫu nhiên
    setTimeout(() => {
      setLoading(false);
      message.success('Bộ đề ngẫu nhiên mới đã được tạo thành công!');

      // Thêm bộ đề mới vào cardData
      setCardData((prevData) => [
        ...prevData,
        {
          idKhoaHoc: prevData.length + 1,
          tenBoDe: newExam.tenBoDe,
          numberClass: newExam.numberClass,
          date: new Date().toLocaleDateString(),
        },
      ]);

      // Đóng Drawer
      setOpen(false);
    }, 2000); // Giả lập hành động mất 2 giây
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewExam((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Cấu hình cột cho bảng
  const columnsQuestion = [
    {
      title: 'Part',
      dataIndex: 'part',
      key: 'part',
    },
    {
      title: 'Loại câu hỏi/Chủ đề',
      dataIndex: 'questionType',
      key: 'questionType',
    },
    {
      title: 'Số câu',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: 'Trong kho',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: 'Tỷ lệ (%)',
      dataIndex: 'percentage',
      key: 'percentage',
    },
  ];

  interface Question {
    part: string;
    questionType: string;
    count: number;
    percentage: string;
  }

  const filterDataByPart = (part: string): Question[] => {
    return DetaiLQuestion.filter((item: Question) => item.part === part);
  };

  return (
    <Space direction="vertical" size="large" className="w-full">
      <Card>
        <Form form={searchForm}>
          <Row gutter={[16, 16]}>
            <Col span={24} lg={6}>
              <Form.Item<SearchFormFieldType> label="Tên bộ đề" name="name" className="!mb-0">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24} lg={6}>
              <Form.Item<SearchFormFieldType> label="Theo năm" name="status" className="!mb-0">
                <Select>
                  <Select.Option value="enable">
                    <ProTag color="success">2021</ProTag>
                  </Select.Option>
                  <Select.Option value="disable">
                    <ProTag color="success">2022</ProTag>
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24} lg={12}>
              <div className="flex justify-end">
                <Button type="primary" className="ml-4">
                  Tìm bộ đề
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card
        title="Danh sách bộ đề"
        extra={
          <div>
            <Button onClick={showDrawer} type="primary">
              Thêm bộ đề mới
            </Button>
          </div>
        }
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
          {cardData.map((course, index) => (
            <Card
              key={index}
              style={{ width: '30%', marginBottom: '2%' }}
              actions={[
                <ExpandOutlined />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Card.Meta
                avatar={<Avatar src="../../../../assets/icons/ic-logo.svg" />}
                title={course.tenBoDe}
                description={
                  <>
                    <p className="font-bold">Số lượng câu hỏi: {course.numberClass}</p>
                    <p className="font-bold">Ngày cập nhật: {course.date}</p>
                    <p className="font-bold">Được tạo bởi: Admin</p>
                  </>
                }
              />
            </Card>
          ))}
        </div>
      </Card>

      <Drawer
        title="Tạo bộ đề mới"
        width={720}
        closable={false}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Huỷ</Button>
            <Button type="primary" onClick={handleCreateRandomExam} loading={loading}>
              Tạo bộ đề
            </Button>
          </Space>
        }
      >
        <Form>
          <Form.Item label="Tên bộ đề" name="tenBoDe">
            <Input name="tenBoDe" value={newExam.tenBoDe} onChange={handleInputChange} />
          </Form.Item>
        </Form>

        <h1 className="my-3 font-bold">Tỷ lệ câu hỏi xuất hiện trong từng part</h1>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Part 1" key="1">
            <Table
              dataSource={filterDataByPart('Part 1')}
              columns={columnsQuestion}
              pagination={false}
              rowKey="key"
            />
          </TabPane>
          <TabPane tab="Part 2" key="2">
            <Table
              dataSource={filterDataByPart('Part 2')}
              columns={columnsQuestion}
              pagination={false}
              rowKey="key"
            />
          </TabPane>
          <TabPane tab="Part 3" key="3">
            <Table
              dataSource={filterDataByPart('Part 3')}
              columns={columnsQuestion}
              pagination={false}
              rowKey="key"
            />
          </TabPane>
          <TabPane tab="Part 4" key="4">
            <Table
              dataSource={filterDataByPart('Part 4')}
              columns={columnsQuestion}
              pagination={false}
              rowKey="key"
            />
          </TabPane>
          <TabPane tab="Part 5" key="5">
            <Table
              dataSource={filterDataByPart('Part 5')}
              columns={columnsQuestion}
              pagination={false}
              rowKey="key"
            />
          </TabPane>
          <TabPane tab="Part 6" key="6">
            <Table
              dataSource={filterDataByPart('Part 6')}
              columns={columnsQuestion}
              pagination={false}
              rowKey="key"
            />
          </TabPane>
          <TabPane tab="Part 7" key="7">
            <Table
              dataSource={filterDataByPart('Part 7')}
              columns={columnsQuestion}
              pagination={false}
              rowKey="key"
            />
          </TabPane>
        </Tabs>
      </Drawer>
    </Space>
  );
}

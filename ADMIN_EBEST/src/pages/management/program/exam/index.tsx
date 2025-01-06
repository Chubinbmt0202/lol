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
import { useState, useEffect } from 'react';
import ProTag from '@/theme/antd/components/tag';

import { DetaiLQuestion } from '../../../../_mock/assets';

import { Organization } from '#/entity';
import AddCourseModal from './createExamCourse';
import AddCourseModalToeic from './createExamToeic';

const { TabPane } = Tabs;
const { Option } = Select;

type SearchFormFieldType = Pick<Organization, 'name' | 'status'>;

export default function ExamPage() {
  const [searchForm] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bodeData, setBodeData] = useState<any>([]);

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
      date: '2021-01-01',
    },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchAllQuestions = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/getAllQuestion`);
      const fetchBode = await fetch('http://localhost:5000/api/getAllBode');
      if (!fetchBode.ok) {
        throw new Error('Failed to fetch data');
      } else {
        const data = await fetchBode.json();
        console.log('Fetch data successfully bode', data);
        setBodeData(data);
      }
      if (response.status === 200) {
        const data = await response.json();
        console.log("Dữ liệu các câu hỏi", data.data);
        // setExamQuestions(data);
      }
    } catch (error) {
      message.error('Có lỗi xảy ra, vui lòng thử lại sau');
    }
  };

  useEffect(() => {
    fetchAllQuestions();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [isModalToeicVisible, setIsModalToeicVisible] = useState(false);
  const showModalToeic = () => {
    setIsModalToeicVisible(true);
  };

  const handleOkToeic = (data) => {
    setCardData((prevState) => [...prevState, data]);
    setIsModalToeicVisible(false);
  };

  const handleCancelToeic = () => {
    setIsModalToeicVisible(false);
  };

  const [selectedExam, setSelectedExam] = useState(null);
  const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
  const [examQuestions, setExamQuestions] = useState([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewExam((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const closeDetailDrawer = () => {
    setDetailDrawerOpen(false);
    setSelectedExam(null);
    setExamQuestions([]);
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
            <Button type="primary" onClick={showModalToeic}>
              Tạo bộ đề
            </Button>
            <Button className='ml-3' onClick={showModal} type="primary">
              Thêm bộ đề khóa học
            </Button>
          </div>
        }
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
          {bodeData.map((course, index) => (
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
                    <p className="font-bold">Ngày tạo: {course.date}</p>
                    <p className="font-bold">Được tạo bởi: Admin</p>
                  </>
                }
              />
            </Card>
          ))}
        </div>
      </Card>

      <AddCourseModal isVisible={isModalVisible} onOk={handleOk} onCancel={handleCancel} />

      <Drawer
        title="Chi tiết bộ đề"
        width={1320}
        closable={false}
        onClose={closeDetailDrawer}
        open={detailDrawerOpen}
        extra={
          <Space>
            <Button onClick={closeDetailDrawer}>Huỷ</Button>
          </Space>
        }
      >
        {selectedExam && (
          <div>
            <p><strong>Tên bộ đề:</strong> {selectedExam.tenBoDe}</p>
            <p><strong>Số lượng câu hỏi:</strong> {selectedExam.numberClass}</p>
            <p><strong>Ngày cập nhật:</strong> {selectedExam.date}</p>
            <p><strong>Được tạo bởi:</strong> Admin</p>
          </div>
        )}
        <hr />
        <h1 className="my-3 font-bold">Các câu hỏi có trong bộ đề</h1>
        <Table
          dataSource={examQuestions}
          rowKey="idCauHoi"
        />
      </Drawer>

      <AddCourseModalToeic isVisible={isModalToeicVisible} onOk={handleOkToeic} onCancel={handleCancelToeic} />
    </Space>
  );
}
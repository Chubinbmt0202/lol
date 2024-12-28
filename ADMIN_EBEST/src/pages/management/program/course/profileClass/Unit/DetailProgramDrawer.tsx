import React, { useState } from 'react';
import { Drawer, Tabs, Button, List, Card, Typography, Upload, Modal, Radio, Popconfirm } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

// Dữ liệu mẫu cho tài liệu
const materials = [
  { name: 'Tài liệu hướng dẫn học', url: 'https://example.com/guide.pdf' },
  { name: 'Bài giảng tiếng Anh cơ bản', url: 'https://example.com/basic_english.pdf' },
  { name: 'Tài liệu luyện thi IELTS', url: 'https://example.com/ielts_guide.pdf' },
];

// Dữ liệu mẫu cho bài tập
const exercises = [
  {
    id: 1,
    title: 'Bài tập 1: Grammar',
    createdBy: 'Admin',
    createdAt: '2024-12-25 10:00',
    questions: [
      {
        id: 1,
        question: 'What is the capital of France?',
        options: ['Paris', 'London', 'Berlin', 'Rome'],
        correctAnswer: 'Paris',
      },
      {
        id: 2,
        question: 'What is 2 + 2?',
        options: ['3', '4', '5', '6'],
        correctAnswer: '4',
      },
    ],
  },
  {
    id: 2,
    title: 'Bài tập 2: Listening',
    createdBy: 'Admin',
    createdAt: '2024-12-24 15:30',
    questions: [
      {
        id: 1,
        question: 'Which animal is known as the king of the jungle?',
        options: ['Lion', 'Tiger', 'Elephant', 'Bear'],
        correctAnswer: 'Lion',
      },
    ],
  },
  {
    id: 3,
    title: 'Bài tập 3: Speaking',
    createdBy: 'Admin',
    createdAt: '2024-12-20 09:00',
    questions: [
      {
        id: 1,
        question: 'Which country has the most population?',
        options: ['China', 'India', 'USA', 'Indonesia'],
        correctAnswer: 'China',
      },
    ],
  },
];

interface DetailProgramDrawerProps {
  visible: boolean;
  onClose: () => void;
  handleUpload: (file: any) => void;
}

const DetailProgramDrawer: React.FC<DetailProgramDrawerProps> = ({
  visible,
  onClose,
  handleUpload,
}) => {
  const [selectedExercise, setSelectedExercise] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleViewDetails = (exercise: any) => {
    setSelectedExercise(exercise);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedExercise(null);
  };

  const handleReportQuestion = (exerciseId: number, questionId: number) => {
    // Logic to report the question (could be an API call or internal handling)
    console.log(`Báo cáo câu hỏi ${questionId} trong bài tập ${exerciseId}`);
  };

  return (
    <Drawer title="Chi tiết bài học" visible={visible} onClose={onClose} width={1000}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Tài liệu" key="1">
          <div className="mb-4">
            {/* Tải tài liệu lên */}
            <Upload beforeUpload={handleUpload} showUploadList={false}>
              <Button icon={<UploadOutlined />}>Tải tài liệu lên</Button>
            </Upload>
          </div>
          {/* Danh sách tài liệu */}
          <List
            dataSource={materials}
            renderItem={(item) => (
              <List.Item style={{ cursor: 'pointer', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
                <div>{item.name}</div>
              </List.Item>
            )}
          />
        </TabPane>

        <TabPane tab="Bài tập" key="2">
          <Card style={{ marginTop: '10px', padding: '20px' }}>
            <h3>Danh sách bài tập</h3>
            <List
              style={{ marginTop: '20px' }}
              dataSource={exercises}
              renderItem={(exercise) => (
                <List.Item
                  style={{
                    cursor: 'pointer',
                    padding: '15px',
                    backgroundColor: '#fff',
                    borderRadius: '10px',
                    marginBottom: '15px',
                    border: '1px solid #f0f0f0',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onClick={() => handleViewDetails(exercise)}
                >
                  <div style={{ flex: 1 }}>
                    <Typography.Title level={5} style={{ color: '#333' }}>
                      {exercise.title}
                    </Typography.Title>
                    <Typography.Text type="secondary" style={{ fontSize: '14px' }}>
                      <strong>Người tạo:</strong> {exercise.createdBy}
                    </Typography.Text>
                    <br />
                    <Typography.Text type="secondary" style={{ fontSize: '14px' }}>
                      <strong>Thời gian tạo:</strong> {exercise.createdAt}
                    </Typography.Text>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </TabPane>
      </Tabs>

      {/* Modal hiển thị câu hỏi trắc nghiệm */}
      <Modal
        title={`Chi tiết bài tập: ${selectedExercise?.title}`}
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="back" onClick={handleCloseModal} style={{ marginRight: '10px' }}>
            Đóng
          </Button>,
        ]}
        width={700}
        bodyStyle={{
          padding: '20px',
          backgroundColor: '#f9f9f9',
        }}
      >
        <List
          dataSource={selectedExercise?.questions}
          renderItem={(question) => (
            <List.Item key={question.id} style={{ marginBottom: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <Typography.Text
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#333',
                  display: 'block',
                  marginBottom: '10px',
                }}
              >
                {question.question}
              </Typography.Text>

              <div>
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '8px 12px',
                      backgroundColor: option === question.correctAnswer ? '#dff0d8' : '#f7f7f7',
                      borderRadius: '5px',
                      marginBottom: '8px',
                      transition: 'background-color 0.3s',
                    }}
                  >
                    <Typography.Text
                      style={{
                        fontSize: '14px',
                        fontWeight: option === question.correctAnswer ? '600' : '400',
                        color: option === question.correctAnswer ? '#2d6a4f' : '#333',
                      }}
                    >
                      {option}
                    </Typography.Text>
                  </div>
                ))}
              </div>

              <Popconfirm
                title="Bạn chắc chắn muốn báo cáo câu hỏi này không?"
                onConfirm={() => handleReportQuestion(selectedExercise.id, question.id)}
                okText="Có"
                cancelText="Không"
                placement="topRight"
              >
                <Button
                  type="danger"
                  size="small"
                  style={{
                    marginTop: '10px',
                    backgroundColor: '#ff4d4f',
                    borderColor: '#ff4d4f',
                    borderRadius: '5px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    fontWeight: '600',
                  }}
                >
                  Báo cáo câu hỏi
                </Button>
              </Popconfirm>
            </List.Item>
          )}
        />
      </Modal>

    </Drawer>
  );
};

export default DetailProgramDrawer;

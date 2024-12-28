import { PlusOutlined } from '@ant-design/icons';
import {
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  message,
  Input,
  Drawer,
  Space,
  Upload,
  Select,
  Tag,
  Radio,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';

import type { GetProp, UploadFile, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const { Dragger } = Upload;

export default function Comprehension() {
  const items = [
    { id_ID: '41', content: 'Câu hỏi 41', tag: ' Câu hỏi tìm thông tin' },
    { id_ID: '42', content: 'Câu hỏi 42', tag: ' Câu hỏi tìm chi tiết sai' },
    { id_ID: '43', content: 'Câu hỏi 43', tag: ' Câu hỏi về chủ đề, mục đích' },
    { id_ID: '44', content: 'Câu hỏi 44', tag: ' Câu hỏi suy luận' },
    { id_ID: '45', content: 'Câu hỏi 45', tag: ' Câu hỏi điền câu' },
    { id_ID: '46', content: 'Câu hỏi 46', tag: ' Cấu trúc: một đoạn' },
    { id_ID: '47', content: 'Câu hỏi 47', tag: ' Cấu trúc: nhiều đoạn' },
    { id_ID: '48', content: 'Câu hỏi 48', tag: ' Dạng bài: Thư điện tử/ Thư tay' },
    { id_ID: '49', content: 'Câu hỏi 49', tag: ' Dạng bài: Bài báo/ Bài đánh giá' },
    { id_ID: '50', content: 'Câu hỏi 50', tag: ' Dạng bài: Advertisement - Quảng cáo' },
    { id_ID: '51', content: 'Câu hỏi 51', tag: ' Dạng bài: Thông báo' },
    { id_ID: '52', content: 'Câu hỏi 52', tag: ' Dạng bài: Text message chain - Chuỗi tin nhắn' },
    { id_ID: '53', content: 'Câu hỏi 53', tag: ' Câu hỏi tìm từ đồng nghĩa' },
    { id_ID: '54', content: 'Câu hỏi 54', tag: ' Câu hỏi về hàm ý câu nói' },
    { id_ID: '55', content: 'Câu hỏi 55', tag: ' Dạng bài: Schedule - Lịch trình, thời gian biểu' },
    { id_ID: '56', content: 'Câu hỏi 56', tag: ' Dạng bài: Văn bản hướng dẫn' },
    { id_ID: '57', content: 'Câu hỏi 57', tag: ' Dạng bài: Danh sách/ Thực đơn' },
  ];

  const options = items.map((item) => ({ label: item.tag, value: item.tag }));

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleOk = () => setIsModalVisible(false);
  const handleCancel = () => setIsModalVisible(false);
  const showDrawer = () => setOpen(true);
  const onClose = () => {
    setOpen(false);
    // Reset questions state when closing the drawer
    setQuestions([]);
  };

  type Question = {
    id: string;
    content: string;
    answers: string[];
    correctAnswer: string;
  };

  const [questions, setQuestions] = useState<Question[]>([]);

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [audioFileList, setAudioFileList] = useState<UploadFile[]>([]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  const handleAudioChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setAudioFileList(newFileList);
  const addQuestion = () => {
    if (questions.length >= 6) {
      message.warning('Bạn chỉ được thêm tối đa 6 câu hỏi.');
      return;
    }
    const newQuestion = {
      id: Date.now().toString(),
      content: '',
      answers: ['', '', '', ''],
      correctAnswer: '',
    };
    setQuestions([...questions, newQuestion]);
  };

  interface UpdateQuestionContentParams {
    id: string;
    value: string;
  }

  const updateQuestionContent = ({ id, value }: UpdateQuestionContentParams) => {
    const updatedQuestions = questions.map((q) => {
      if (q.id === id) {
        q.content = value;
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  interface UpdateAnswerParams {
    id: string;
    index: number;
    value: string;
  }

  const updateAnswer = ({ id, index, value }: UpdateAnswerParams) => {
    const updatedQuestions = questions.map((q) => {
      if (q.id === id) {
        q.answers[index] = value;
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  interface SelectCorrectAnswerParams {
    id: string;
    value: string;
  }

  const selectCorrectAnswer = ({ id, value }: SelectCorrectAnswerParams) => {
    const updatedQuestions = questions.map((q) => {
      if (q.id === id) {
        q.correctAnswer = value;
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className="h-[500px] overflow-y-auto pt-4">
      <Card
        extra={
          <div>
            <Button className="mr-2" onClick={showModal}>
              Upload bằng excel
            </Button>
            <Button type="primary" onClick={showDrawer}>
              Thêm câu hỏi mới
            </Button>
          </div>
        }
      >
        <Row gutter={[5, 8]}>
          {items.map((item) => (
            <Col span={6} key={item.id_ID}>
              <Card className="mb-2" bordered={false} hoverable>
                <Tag color="blue" className="mb-2">
                  #{item.tag}
                </Tag>
                <p>{item.content}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      <Modal
        title="Thêm câu hỏi mới"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item label="Câu hỏi">
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Drawer
        title="Tạo câu hỏi cho phần đọc hiểu"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Huỷ</Button>
            <Button onClick={onClose} type="primary">
              Lưu
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          {/* Phần chọn Tag với chế độ chọn một */}
          <Row gutter={[16, 16]} className="ml-2 mt-8">
            <Col span={24}>
              <Form.Item label="Chọn Tag">
                <Select placeholder="Chọn một tag" options={options} />
              </Form.Item>
            </Col>
          </Row>
          <TextArea placeholder="Nhập đề bài" rows={4} />
          <Row gutter={[16, 16]} className=" mt-4">
            <Button className="ml-2" type="primary" onClick={addQuestion}>
              + Thêm câu hỏi
            </Button>
          </Row>

          <Row gutter={[5, 8]} className="mt-4">
            {questions.map((question) => (
              <Col span={24} key={question.id}>
                <Card className="mb-2" bordered={false} hoverable>
                  <Form layout="vertical" hideRequiredMark>
                    <Form.Item label="Tên câu hỏi">
                      <TextArea
                        placeholder="Nhập tên câu hỏi"
                        value={question.content}
                        onChange={(e) =>
                          updateQuestionContent({ id: question.id, value: e.target.value })
                        }
                      />
                    </Form.Item>
                    <Radio.Group
                      onChange={(e) =>
                        selectCorrectAnswer({ id: question.id, value: e.target.value })
                      }
                      value={question.correctAnswer}
                    >
                      <Row gutter={[16, 16]}>
                        {question.answers.map((answer, index) => (
                          <Col span={12} key={index}>
                            <Radio value={`answer${index + 1}`}>
                              <Form.Item label={`Đáp án ${index + 1}`}>
                                <Input
                                  placeholder={`Nhập đáp án ${index + 1}`}
                                  value={answer}
                                  onChange={(e) =>
                                    updateAnswer({ id: question.id, index, value: e.target.value })
                                  }
                                />
                              </Form.Item>
                            </Radio>
                          </Col>
                        ))}
                      </Row>
                    </Radio.Group>
                  </Form>
                </Card>
              </Col>
            ))}
          </Row>
        </Form>
      </Drawer>
    </div>
  );
}

import { PlusOutlined } from '@ant-design/icons';
import {
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Select,
  Tag,
  Input,
  Drawer,
  Space,
  Upload,
  Radio,
  message,
} from 'antd';
import { useState } from 'react';

import type { GetProp, UploadFile, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const { Dragger } = Upload;

export default function Sentence() {
  const items = [
    { id_ID: '11', content: 'Câu hỏi 11', tag: ' Câu hỏi từ loại' },
    { id_ID: '12', content: 'Câu hỏi 12', tag: ' Câu hỏi ngữ pháp' },
    { id_ID: '13', content: 'Câu hỏi 13', tag: ' Câu hỏi từ vựng' },
    { id_ID: '14', content: 'Câu hỏi 14', tag: ' Danh từ' },
    { id_ID: '15', content: 'Câu hỏi 15', tag: ' Đại từ' },
    { id_ID: '16', content: 'Câu hỏi 16', tag: ' Tính từ' },
    { id_ID: '17', content: 'Câu hỏi 17', tag: ' Thì' },
    { id_ID: '18', content: 'Câu hỏi 18', tag: ' Thể' },
    { id_ID: '19', content: 'Câu hỏi 19', tag: ' Trạng từ' },
    { id_ID: '20', content: 'Câu hỏi 20', tag: ' Động từ nguyên mẫu' },
    { id_ID: '21', content: 'Câu hỏi 21', tag: ' Phân từ và Cấu trúc phân từ' },
    { id_ID: '22', content: 'Câu hỏi 22', tag: ' Giới từ' },
    { id_ID: '23', content: 'Câu hỏi 23', tag: ' Liên từ' },
    { id_ID: '24', content: 'Câu hỏi 24', tag: ' Mệnh đề quan hệ' },
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
    if (questions.length >= 1) {
      message.warning('Bạn chỉ được thêm tối đa 1 câu hỏi.');
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
        title="Tạo câu hỏi mới phần điền vào câu"
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
          <Row gutter={[16, 16]} className="ml-2 mt-8">
            <Col span={24}>
              <Form.Item label="Chọn Tag">
                <Select placeholder="Chọn một tag" options={options} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className=" mt-2">
            <Button className="ml-4" type="primary" onClick={addQuestion}>
              + Thêm câu hỏi
            </Button>
          </Row>
          <Row gutter={[5, 8]} className="mt-4">
            {questions.map((question) => (
              <Col span={24} key={question.id}>
                <Card className="mb-2" bordered={false} hoverable>
                  <Form layout="vertical" hideRequiredMark>
                    <Form.Item label="Tên câu hỏi">
                      <Input
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

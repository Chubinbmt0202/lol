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
import { useState, useEffect } from 'react';
import type { GetProp, UploadFile, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const { Dragger } = Upload;

export default function Sentence() {
  const [items, setItems] = useState<any[]>([]);
  
  const options = [
    { value: '1', label: 'Reading' },
    { value: '2', label: 'Listening' },
    { value: '3', label: 'Writing' },
    { value: '4', label: 'Speaking' },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [tag, setTag] = useState('');
  const [questionCount, setQuestionCount] = useState(0);

  const showModal = () => setIsModalVisible(true);
  const handleOk = () => setIsModalVisible(false);
  const handleCancel = () => setIsModalVisible(false);
  const showDrawer = () => setOpen(true);
  const onClose = () => {
    setOpen(false);
    setQuestions([]);
  };

  type Question = {
    id: string;
    parentName: string;
    content: string;
    answers: string[];
    correctAnswer: string;
    tag: string;
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

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/getAllQuestionReadingDienCau');
      const data = await response.json();
      console.log('Data:', data);
      setItems(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const postQuestions = async (questions: Question[]) => {
    console.log('Posting questions:', questions[0]);
    try {
      const response = await fetch(`http://localhost:5000/api/addQuestionReadingDienCau`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(questions[0]),
      });
      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error(error);
    }
  };

  const addQuestion = () => {
    if (questions.length >= 1) {
      message.warning('Bạn chỉ được thêm tối đa 1 câu hỏi.');
      return;
    }
    const newQuestion = {
      id: Date.now().toString(),
      parentName: `Câu hỏi ${questionCount + 1}`,
      content: '',
      answers: ['', '', '', ''],
      correctAnswer: '',
      tag,
      phan: 'Điền vào câu',
      loai: "Reading"
    };
    setQuestions([...questions, newQuestion]);
    setQuestionCount(questionCount + 1);
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
    console.log('Đáp án đúng:', value);  // Kiểm tra giá trị
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

  const handleSave = () => {
    // Kiểm tra xem người dùng đã nhập đầy đủ thông tin chưa
    for (const question of questions) {
      if (!question.content) {
        message.warning('Vui lòng nhập tên câu hỏi.');
        return;
      }
      for (const answer of question.answers) {
        if (!answer) {
          message.warning('Vui lòng nhập đầy đủ các đáp án.');
          return;
        }
      }
      if (!question.correctAnswer) {
        message.warning('Vui lòng chọn đáp án đúng.');
        return;
      }
    }

    console.log('Danh sách câu hỏi:', questions);  // Log ra câu hỏi
    postQuestions(questions);  // Gửi dữ liệu nếu cần
    onClose();  // Đóng drawer sau khi lưu
  };

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
            <Col span={6} key={item.idCauHoi}>
              <Card className="mb-2" bordered={false} hoverable>
                <Tag color="blue" className="mb-2">
                  #{item.tagCauHoi}
                </Tag>
                <p>{item.tenCauHoi}</p>
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
            <Button onClick={handleSave} type="primary">
              Lưu
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={[16, 16]} className="ml-2 mt-8">
            <Col span={24}>
              <Form.Item label="Chọn Tag">
                <Select placeholder="Chọn một tag" options={options} onChange={setTag} />
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
                            <Radio value={answer}>
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
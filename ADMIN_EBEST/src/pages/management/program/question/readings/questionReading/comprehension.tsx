import { PlusOutlined } from '@ant-design/icons';
import {
  Row,
  Col,
  Card,
  Button,
  Tag,
  notification,
  Modal,
  Form,
  Select,
  message,
  Input,
  Drawer,
  Space,
  Upload,
  Radio,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState, useEffect } from 'react';

import type { GetProp, UploadFile, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const { Dragger } = Upload;

export default function Paragraph() {
  const [items, setItems] = useState<any[]>([]);

  const options = [
    { value: '1', label: 'Reading' },
    { value: '2', label: 'Listening' },
    { value: '3', label: 'Writing' },
    { value: '4', label: 'Speaking' },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleOk = () => {
    console.log("Modal form submitted");
    setIsModalVisible(false);
  };
  const handleCancel = () => setIsModalVisible(false);
  const showDrawer = () => setOpen(true);
  const onClose = () => {
    setOpen(false);
    setQuestions([]);
  };

  type Question = {
    id: string;
    content: string;
    answers: string[];
    correctAnswer: string;
  };

  const [questions, setQuestions] = useState<Question[]>([]);
  const [logData, setLogData] = useState(null);

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

  const deleteQuestion = (id: string) => {
    const updatedQuestions = questions.filter((q) => q.id !== id);
    setQuestions(updatedQuestions);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const logDetails = () => {
    const sortedQuestions = [...questions].sort((a, b) => a.content.localeCompare(b.content));
    
    const logData = {
      CauHoi: "Câu hỏi 1",
      Tag: options[0].label,
      DeBai: document.querySelector('textarea')?.value,
      CauHoiCon: sortedQuestions.map((q, index) => ({
        TenCauHoiCon: q.content,
        LuaChon: q.answers,
        DapAnDung: q.correctAnswer
      })),
      phan: 'Đọc hiểu',
      loai: "Reading"
    };
    // console.log("dữ liệu log", logData);

    return logData;

    // setLogData(logData); // Nếu muốn lưu vào state
  };

  const fetchData = async () => {
    // Fetch data from server
    // Fetch API, axios, etc.
    try {
      const response = await fetch('http://localhost:5000/api/getAllQuestionsReadingDocHieu');
      const data = await response.json();
      console.log("Data received phần đọc hiểu from server", data)
      setItems(data.data);
    } catch (error) {
      console.error("Error fetching data from server", error)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDrawerSave = async () => {
    const dataSent = logDetails();

    console.log("Data sent to server", dataSent)

    try {
      // Send data to server
      // Fetch API, axios, etc.
      const response = await fetch('http://localhost:5000/api/addQuestionReadingDocHieu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataSent),
      });

      console.log("Response from server", response)

      if (response.status === 200) {
        notification.success(
          {
            message: 'Thêm câu hỏi thành công',
            description: 'Đã thêm câu hỏi thành công',
          }
        )
      } else {
        notification.error(
          {
            message: 'Thêm câu hỏi thất bại',
            description: 'Đã có lỗi xảy ra khi thêm câu hỏi',
          }
        )
      }
    } catch ( error ) {
      console.error("Error sending data to server", error)
    }
    onClose();
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
        title="Tạo câu hỏi cho phần điền đọc hiểu"
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
            <Button onClick={handleDrawerSave} type="primary">
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
          <TextArea placeholder="Nhập đề bài" rows={4} />
          <Row gutter={[16, 16]} className=" mt-4">
            <Button className="ml-2" type="primary" onClick={addQuestion}>
              + Thêm câu hỏi
            </Button>
          </Row>

          <Row gutter={[5, 8]} className="mt-4">
            {questions.map((question) => (
              <Col span={24} key={question.id}>
                <Card
                  className="mb-2"
                  bordered={false}
                  hoverable
                  extra={
                    <Button
                      type="link"
                      danger
                      onClick={() => deleteQuestion(question.id)}
                    >
                      Xóa
                    </Button>
                  }
                >
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
                            <Radio value={answer}>
                              <Form.Item label={`Đáp án ${index + 1}`}>
                                <Input
                                  placeholder={`Nhập đáp án ${index + 1}`}
                                  value={answer}
                                  onChange={(e) =>
                                    updateAnswer({
                                      id: question.id,
                                      index,
                                      value: e.target.value,
                                    })
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
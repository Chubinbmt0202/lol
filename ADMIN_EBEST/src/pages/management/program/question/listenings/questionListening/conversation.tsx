import { PlusOutlined } from '@ant-design/icons';
import {
  Row,
  Col,
  Card,
  Button,
  Form,
  Input,
  Drawer,
  Space,
  Upload,
  Radio,
  message,
  Tag,
  Select,
} from 'antd';
import { useState } from 'react';

import type { GetProp, UploadFile, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const { Dragger } = Upload;

export default function Conversation() {
  const [items, setItems] = useState([
    { id_ID: '1', content: 'Câu hỏi 1', tag: ' Câu hỏi về chủ đề, mục đích' },
    { id_ID: '2', content: 'Câu hỏi 2', tag: ' Câu hỏi về danh tính người nói' },
    { id_ID: '3', content: 'Câu hỏi 3', tag: ' Câu hỏi về chi tiết cuộc hội thoại' },
    { id_ID: '4', content: 'Câu hỏi 4', tag: ' Câu hỏi về hành động tương lai' },
    { id_ID: '5', content: 'Câu hỏi 5', tag: ' Câu hỏi kết hợp bảng biểu' },
    { id_ID: '6', content: 'Câu hỏi 6', tag: ' Câu hỏi về hàm ý câu nói' },
    { id_ID: '7', content: 'Câu hỏi 7', tag: ' Chủ đề: Company - General Office Work' },
    { id_ID: '8', content: 'Câu hỏi 8', tag: ' Chủ đề: Company - Business, Marketing' },
    { id_ID: '9', content: 'Câu hỏi 9', tag: ' Chủ đề: Company - Event, Project' },
    { id_ID: '10', content: 'Câu hỏi 10', tag: ' Chủ đề: Company - Facility' },
  ]);

  const options = items.map((item) => ({ label: item.tag, value: item.tag }));

  type Question = {
    id: string;
    content: string;
    answers: string[];
    correctAnswer: string;
  };

  const [questions, setQuestions] = useState<Question[]>([]);
  const [open, setOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [audioFileList, setAudioFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [imageFileList, setImageFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState('');

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

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
  const handleImageChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setImageFileList;
  const addQuestion = () => {
    if (questions.length >= 4) {
      message.warning('Bạn chỉ được thêm tối đa 4 câu hỏi.');
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
            <Button className="mr-2" type="primary" onClick={showDrawer}>
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

      <Drawer
        title="Tạo câu hỏi mới phần hội thoại ngắn"
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
          <Col span={24}>
            <p className="mb-2">Thêm audio</p>
            <Dragger
              accept="audio/*"
              fileList={audioFileList}
              onChange={handleAudioChange}
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            >
              <p className="ant-upload-drag-icon">
                <PlusOutlined />
              </p>
              <p className="ant-upload-text">Click hoặc kéo tệp vào khu vực này để tải lên</p>
              <p className="ant-upload-hint">Hỗ trợ tải lên các tệp âm thanh.</p>
            </Dragger>
            <Col span={24} className="mt-4">
              {' '}
              <p className="mb-2">Thêm hình ảnh</p>{' '}
              <Upload
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture-card"
                fileList={imageFileList}
                onPreview={handlePreview}
                onChange={handleImageChange}
              >
                {' '}
                {imageFileList.length >= 8 ? null : uploadButton}{' '}
              </Upload>{' '}
              {previewImage && (
                <img alt="preview" style={{ width: '100%', marginTop: 16 }} src={previewImage} />
              )}{' '}
            </Col>
          </Col>
          {/* Phần chọn Tag với chế độ chọn một */}
          <Row gutter={[16, 16]} className="ml-2 mt-8">
            <Col span={24}>
              <Form.Item label="Chọn Tag">
                <Select placeholder="Chọn một tag" options={options} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]} className=" mt-6">
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

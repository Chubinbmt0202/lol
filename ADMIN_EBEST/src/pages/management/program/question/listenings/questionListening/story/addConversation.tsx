import { PlusOutlined } from '@ant-design/icons';
import { Col, Form, Input, Upload, Radio, message, Row, Button, Select, Card, Modal } from 'antd';
import { useState, useEffect } from 'react';
import type { UploadFile, UploadProps } from 'antd';

const { Dragger } = Upload;
const { confirm } = Modal;

type FileType = UploadFile;

type Question = {
  id: string;
  content: string;
  answers: string[];
  correctAnswer: string;
};

type AddQuestionProps = {
  onSave: (data: any) => void; // Function prop to pass back the data
  onClose: () => void; // Function prop to close the drawer
};

const AddQuestion = ({ onSave, onClose }: AddQuestionProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [audioFileList, setAudioFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [imageFileList, setImageFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Call onSave every time the relevant state changes to update formData in the parent component
    onSave({
      audioFiles: audioFileList,
      imageFiles: imageFileList,
      tag: selectedTag,
      questions: questions,
    });
  }, [audioFileList, imageFileList, selectedTag, questions]);

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

  const handleAudioChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setAudioFileList(newFileList);
  const handleImageChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setImageFileList(newFileList);

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

  const handleSave = () => {
    // Check if exactly 4 questions are added
    if (questions.length !== 4) {
      message.warning('Bạn cần thêm chính xác 4 câu hỏi.');
      return;
    }

    // Prepare the data to be sent to the parent component
    const formData = {
      audioFiles: audioFileList,
      imageFiles: imageFileList,
      tag: selectedTag,
      questions: questions,
    };
    onSave(formData);
  };

  const handleDrawerClose = () => {
    if (questions.length > 0 || audioFileList.length > 0 || imageFileList.length > 0 || selectedTag) {
      confirm({
        title: 'Bạn có chắc chắn muốn thoát không?',
        content: 'Nếu thoát, tất cả dữ liệu đã nhập sẽ bị xóa.',
        onOk() {
          // Clear all state
          setQuestions([]);
          setAudioFileList([]);
          setImageFileList([]);
          setSelectedTag(undefined);
          onClose();
        },
      });
    } else {
      onClose();
    }
  };

  return (
    <>
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
            <p className="mb-2">Thêm hình ảnh</p>
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={imageFileList}
              onPreview={handlePreview}
              onChange={handleImageChange}
            >
              {imageFileList.length >= 8 ? null : uploadButton}
            </Upload>
            {previewImage && (
              <img alt="preview" style={{ width: '100%', marginTop: 16 }} src={previewImage} />
            )}
          </Col>
        </Col>
        {/* Phần chọn Tag với chế độ chọn một */}
        <Row gutter={[16, 16]} className="ml-2 mt-8">
          <Col span={24}>
            <Form.Item label="Chọn Tag">
              <Select
                placeholder="Chọn một tag"
                onChange={(value) => setSelectedTag(value as string)}
              >
                <Select.Option value="[Part 4] Câu hỏi về chủ đề, mục đích">[Part 4] Câu hỏi về chủ đề, mục đích</Select.Option>
                <Select.Option value="[Part 4] Câu hỏi về danh tính, địa điểm">[Part 4] Câu hỏi về danh tính, địa điểm</Select.Option>
                <Select.Option value="[Part 4] Câu hỏi về chi tiết">[Part 4] Câu hỏi về chi tiết</Select.Option>
                <Select.Option value="[Part 4] Câu hỏi về hành động tương lai">[Part 4] Câu hỏi về hành động tương lai</Select.Option>
                <Select.Option value="[Part 4] Câu hỏi kết hợp bảng biểu">[Part 4] Câu hỏi kết hợp bảng biểu</Select.Option>
                <Select.Option value="[Part 4] Câu hỏi về hàm ý câu nói">[Part 4] Câu hỏi về hàm ý câu nói</Select.Option>
                <Select.Option value="[Part 4] Dạng bài: Telephone message - Tin nhắn thoại">[Part 4] Dạng bài: Telephone message - Tin nhắn thoại</Select.Option>
                <Select.Option value="[Part 4] Dạng bài: Announcement - Thông báo">[Part 4] Dạng bài: Announcement - Thông báo</Select.Option>
                <Select.Option value="[Part 4] Dạng bài: News report, Broadcast - Bản tin">[Part 4] Dạng bài: News report, Broadcast - Bản tin</Select.Option>
                <Select.Option value="[Part 4] Dạng bài: Talk - Bài phát biểu, diễn văn">[Part 4] Dạng bài: Talk - Bài phát biểu, diễn văn</Select.Option>
                <Select.Option value="[Part 4] Dạng bài: Excerpt from a meeting - Trích dẫn từ buổi họp">[Part 4] Dạng bài: Excerpt from a meeting - Trích dẫn từ buổi họp</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]} className="mt-6">
          <Button className="ml-4" type="primary" onClick={addQuestion} disabled={questions.length >= 4}>
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
    </>
  );
};

export default AddQuestion;
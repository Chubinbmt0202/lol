import { PlusOutlined } from '@ant-design/icons';
import {
  Drawer,
  Button,
  Space,
  Form,
  Row,
  Col,
  Upload,
  Input,
  Select,
  Radio,
  Progress,
} from 'antd';
import { useState, useEffect } from 'react';

interface Question {
  tag: string;
  answers: string[];
  selectedAnswer: string;
  imageFiles?: any[];
  audioFiles?: any[];
}

const { Dragger } = Upload;

interface QuestionDrawerProps {
  visible: boolean;
  onClose: () => void;
  onSave: (question: Question) => void;  // Updated to pass question data
  progress: number;
  fileList: any[];
  setFileList: (fileList: any[]) => void;
  audioFileList: any[];
  setAudioFileList: (fileList: any[]) => void;
  isEditing: boolean;
  currentQuestion?: Question;
}

const QuestionDrawer: React.FC<QuestionDrawerProps> = ({
  visible,
  onClose,
  onSave,
  progress,
  fileList,
  setFileList,
  audioFileList,
  setAudioFileList,
  isEditing,
  currentQuestion,
}) => {
  const [form] = Form.useForm();

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as File);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }: { fileList: any[] }) => setFileList(newFileList);
  const handleAudioChange = ({ fileList: newFileList }: { fileList: any[] }) => setAudioFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleSave = () => {
    form.validateFields().then((values) => {
      const question: Question = {
        tag: values.tag,
        answers: ['A', 'B', 'C'],
        selectedAnswer: values.selectedAnswer,
        ...values,
        audioFiles: audioFileList,
      };
      console.log('Question data:', question);
      onSave(question);
      form.resetFields();
      onClose();
    }).catch((info) => {
      console.log('Validate Failed:', info);
    });
  };

  useEffect(() => {
    if (isEditing && currentQuestion) {
      form.setFieldsValue(currentQuestion);
    } else {
      form.resetFields();
    }
  }, [isEditing, currentQuestion, form]);

  return (
    <Drawer
      title={isEditing ? "Chỉnh sửa câu hỏi" : "Tạo câu hỏi mới phần hỏi đáp"}
      width={720}
      onClose={onClose}
      visible={visible}
      extra={
        <Space>
          <Button onClick={onClose}>Huỷ</Button>
          <Button onClick={handleSave} type="primary">
            Lưu
          </Button>
        </Space>
      }
    >
      {progress < 100 && <Progress percent={progress} status="active" />}
      <Form form={form} layout="vertical" hideRequiredMark>
        <Row gutter={[32, 16]}>
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
          </Col>
        </Row>

        <Row gutter={[16, 16]} className="mt-16">
          <Col span={24}>
            <Form.Item label="Chọn Tag" name="tag">
              <Select
                placeholder="Chọn một tag"
                options={[
                  { label: 'Câu hỏi WHAT', value: 'Câu hỏi WHAT' },
                  { label: 'Câu hỏi WHO', value: 'Câu hỏi WHO' },
                  { label: 'Câu hỏi WHERE', value: 'Câu hỏi WHERE' },
                  { label: 'Câu hỏi WHEN', value: 'Câu hỏi WHEN' },
                  { label: 'Câu hỏi HOW', value: 'Câu hỏi HOW' },
                  { label: 'Câu hỏi WHY', value: 'Câu hỏi WHY' },
                  { label: 'Câu hỏi YES/NO', value: 'Câu hỏi YES/NO' },
                  { label: 'Câu hỏi đuôi', value: 'Câu hỏi đuôi' },
                  { label: 'Câu hỏi lựa chọn', value: 'Câu hỏi lựa chọn' },
                  { label: 'Câu yêu cầu, đề nghị', value: 'Câu yêu cầu, đề nghị' },
                  { label: 'Câu trần thuật', value: 'Câu trần thuật' },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]} className="mt-8">
          <Col span={24}>
            <Form.Item name="selectedAnswer" label="Chọn đáp án đúng">
              <Radio.Group>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Radio value="A">Đáp án A</Radio>
                  </Col>
                  <Col span={12}>
                    <Radio value="B">Đáp án B</Radio>
                  </Col>
                  <Col span={12}>
                    <Radio value="C">Đáp án C</Radio>
                  </Col>
                </Row>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default QuestionDrawer;
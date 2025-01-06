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
  onSave: () => void;
  progress: number;
  fileList: any[];
  setFileList: (fileList: any[]) => void;
  audioFileList: any[];
  setAudioFileList: (fileList: any[]) => void;
  isEditing: boolean;
  currentQuestion?: Question; // Thêm prop này
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
  currentQuestion, // Nhận prop này
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isEditing && currentQuestion) {
      form.setFieldsValue({
        tag: currentQuestion.tag,
        answer1: currentQuestion.answers?.[0],
        answer2: currentQuestion.answers?.[1],
        answer3: currentQuestion.answers?.[2],
        answer4: currentQuestion.answers?.[3],
        selectedAnswer: currentQuestion.selectedAnswer,
      });
      setFileList(currentQuestion.imageFiles || []);
      setAudioFileList(currentQuestion.audioFiles || []);
    } else {
      // Reset form khi tạo câu hỏi mới
      form.resetFields();
      setFileList([]);
      setAudioFileList([]);
    }
  }, [isEditing, currentQuestion, form, setFileList, setAudioFileList]);

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

  return (
    <Drawer
      title={"Tạo câu hỏi mới phần mô tả tranh"} // Thay đổi tiêu đề dựa trên isEditing
      width={720}
      onClose={onClose}
      visible={visible}
      extra={
        <Space>
          <Button onClick={onClose}>Huỷ</Button>
          <Button onClick={onSave} type="primary">
            Lưu
          </Button>
        </Space>
      }
    >
      {progress < 100 && <Progress percent={progress} status="active" />}
      <Form form={form} layout="vertical" hideRequiredMark>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <p className="mb-2">Thêm hình ảnh</p>
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </Col>
          <Col span={12}>
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
                  { label: 'Tranh tả người', value: 'Tranh tả người' },
                  { label: 'Tranh tả vật', value: 'Tranh tả vật' },
                  { label: 'Tranh tả người & vật', value: 'Tranh tả người & vật' },
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
                    <Radio value="1">A</Radio>
                    <Form.Item name="answer1">
                      <Input placeholder="Nhập đáp án 1" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Radio value="B">B</Radio>
                    <Form.Item name="answer2">
                      <Input placeholder="Nhập đáp án 2" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Radio value="C">C</Radio>
                    <Form.Item name="answer3">
                      <Input placeholder="Nhập đáp án 3" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Radio value="D">D</Radio>
                    <Form.Item name="answer4">
                      <Input placeholder="Nhập đáp án 4" />
                    </Form.Item>
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
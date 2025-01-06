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
  notification,
} from 'antd';
import { useState, useEffect } from 'react';

interface Question {
  tagCauHoi: string;
  luaChon: string;
  dapAnDung: string;
  imageCauHoi?: string;
  audio?: string;
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
  currentQuestion?: Question;
}

const QuestionDrawerUpdate: React.FC<QuestionDrawerProps> = ({
  visible,
  onClose,
  onSave,
  progress,
  fileList,
  setFileList,
  audioFileList,
  setAudioFileList,
  currentQuestion,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (currentQuestion) {
      const parsedChoices = JSON.parse(currentQuestion.luaChon);
      form.setFieldsValue({
        tag: currentQuestion.tagCauHoi,
        answer1: parsedChoices[0],
        answer2: parsedChoices[1],
        answer3: parsedChoices[2],
        answer4: parsedChoices[3],
        selectedAnswer: currentQuestion.dapAnDung,
      });
      setFileList(currentQuestion.imageCauHoi ? [{ url: currentQuestion.imageCauHoi }] : []);
      setAudioFileList(currentQuestion.audio ? [{ url: currentQuestion.audio }] : []);
    } else {
      form.resetFields();
      setFileList([]);
      setAudioFileList([]);
    }
  }, [currentQuestion, form, setFileList, setAudioFileList]);

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

  const validateChanges = (formValues: any, originalQuestion: Question) => {
    const parsedChoices = JSON.parse(originalQuestion.luaChon);
    return (
      formValues.tag !== originalQuestion.tagCauHoi ||
      formValues.answer1 !== parsedChoices[0] ||
      formValues.answer2 !== parsedChoices[1] ||
      formValues.answer3 !== parsedChoices[2] ||
      formValues.answer4 !== parsedChoices[3] ||
      formValues.selectedAnswer !== originalQuestion.dapAnDung ||
      (fileList.length > 0 && fileList[0].url !== originalQuestion.imageCauHoi) ||
      (audioFileList.length > 0 && audioFileList[0].url !== originalQuestion.audio)
    );
  };

  const handleSave = async () => {
    const formValues = form.getFieldsValue();
    if (currentQuestion && !validateChanges(formValues, currentQuestion)) {
      notification.error({
        message: 'Error',
        description: 'Bạn phải cập nhật lại hình ảnh và audio của câu hỏi trước khi lưu.',
      });
      return;
    }
    onSave();
  };

  return (
    <Drawer
      title={"Chỉnh sửa câu hỏi phần mô tả tranh"}
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
                    <Radio value="answer1">Đáp án 1</Radio>
                    <Form.Item name="answer1">
                      <Input placeholder="Nhập đáp án 1" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Radio value="answer2">Đáp án 2</Radio>
                    <Form.Item name="answer2">
                      <Input placeholder="Nhập đáp án 2" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Radio value="answer3">Đáp án 3</Radio>
                    <Form.Item name="answer3">
                      <Input placeholder="Nhập đáp án 3" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Radio value="answer4">Đáp án 4</Radio>
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

export default QuestionDrawerUpdate;

// Helper functions
const getBase64 = (file: any): Promise<string> => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result as string);
  reader.onerror = (error) => reject(error);
});
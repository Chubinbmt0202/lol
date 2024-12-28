import { PlusOutlined } from '@ant-design/icons';
import {
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Tag,
  Input,
  Drawer,
  Space,
  Select,
  Image,
  Upload,
  Radio,
  notification,
  Progress,
} from 'antd';
import { useState } from 'react';

import type { GetProp, UploadFile, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const { Dragger } = Upload;

export default function Picture() {
  const [items, setItems] = useState<Question[]>([
    { id_ID: '1', content: 'Câu hỏi 1', tag: 'Tranh tả người', imageFiles: [], audioFiles: [] },
    { id_ID: '2', content: 'Câu hỏi 2', tag: 'Tranh tả người', imageFiles: [], audioFiles: [] },
    // ...
  ]);

  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [isModalQuestonVisible, setIsQuestionVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleOk = () => setIsModalVisible(false);
  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);
  const onSave = async () => {
    try {
      // Upload hình ảnh
      const imageFiles = await uploadFiles(fileList);

      // Upload âm thanh
      const audioFiles = await uploadFiles(audioFileList);

      // Lấy các thông tin khác từ form
      const selectedAnswer =
        document.querySelector<HTMLInputElement>('input[type="radio"]:checked')?.value || null;
      const questionContent =
        document.querySelector<HTMLInputElement>('input[placeholder="Nhập câu hỏi mới"]')?.value ||
        '';
      const newQuestion: Question = {
        id_ID: `${items.length + 1}`, // Tạo ID mới
        content: questionContent || `Câu hỏi ${items.length + 1}`,
        tag:
          document.querySelector<HTMLSelectElement>('.ant-select-selection-item')?.textContent ||
          '',
        answers: [
          document.querySelector<HTMLInputElement>('input[placeholder="Nhập đáp án 1"]')?.value ||
            '',
          document.querySelector<HTMLInputElement>('input[placeholder="Nhập đáp án 2"]')?.value ||
            '',
          document.querySelector<HTMLInputElement>('input[placeholder="Nhập đáp án 3"]')?.value ||
            '',
          document.querySelector<HTMLInputElement>('input[placeholder="Nhập đáp án 4"]')?.value ||
            '',
        ],
        selectedAnswer, // Đáp án được tick
        imageFiles,
        audioFiles,
      };

      // Cập nhật danh sách câu hỏi
      setItems((prevItems) => [...prevItems, newQuestion]);

      // Log thành công
      console.log('Lưu câu hỏi thành công!', newQuestion);

      // Đóng Drawer
      setOpen(false);
    } catch (error) {
      // Log lỗi nếu có
      console.error('Lưu câu hỏi thất bại:', error);
    }
  };

  const uploadFiles = async (files: UploadFile[]) => {
    try {
      const totalFiles = files.length;
      let uploadedFiles = 0;

      // Dùng Promise.all để tải lên nhiều tệp
      const uploadedFilesData = await Promise.all(
        files.map(async (file, index) => {
          const formData = new FormData();
          formData.append('file', (file.originFileObj as Blob) || file);
          formData.append('upload_preset', 'question'); // Thay 'question' bằng upload_preset của bạn

          // Tạo đối tượng để theo dõi tiến trình tải lên
          const response = await fetch('https://api.cloudinary.com/v1_1/dx3snw69p/upload', {
            method: 'POST',
            body: formData,
          });

          // Kiểm tra nếu có lỗi trả về từ Cloudinary
          if (!response.ok) {
            const errorData = await response.json();
            console.error('Error from Cloudinary:', errorData); // Log lỗi chi tiết từ Cloudinary
            throw new Error(`Error uploading file: ${file.name}`);
          }

          const data = await response.json();
          uploadedFiles += 1;

          // Cập nhật tiến trình tải lên
          updateProgress(uploadedFiles, totalFiles);

          return {
            name: file.name,
            url: data.secure_url, // Lấy URL của tệp đã tải lên
          };
        }),
      );

      notification.success({
        message: 'Upload successful',
        description: `Đã tải lên ${uploadedFiles} tệp thành công.`,
      });

      return uploadedFilesData; // Trả về mảng các tệp đã tải lên thành công
    } catch (error) {
      console.error('Error during file upload:', error);
      notification.error({
        message: 'Upload failed',
        description: 'Đã xảy ra lỗi khi tải lên tệp.',
      });
      throw new Error('Upload failed'); // Ném lại lỗi nếu cần thiết
    }
  };

  // Hàm để cập nhật tiến trình
  const [progress, setProgress] = useState(0); // Khởi tạo trạng thái tiến trình

  const updateProgress = (uploadedFiles: number, totalFiles: number) => {
    const newProgress = Math.round((uploadedFiles / totalFiles) * 100);
    setProgress(newProgress); // Cập nhật trạng thái tiến trình
  };

  interface Question {
    id_ID: string;
    selectedAnswer?: string | null;
    imageFiles: { name: string; url: string }[];
    audioFiles: { name: string; url: string }[];
    content: string;
    tag: string;
    answers?: string[];
  }

  const showQuestionDetail = (question: Question) => {
    setSelectedQuestion(question);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedQuestion(null);
  };

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
              <Card
                className="mb-2"
                bordered={false}
                hoverable
                onClick={() => showQuestionDetail(item)}
              >
                {/* Tag added here */}
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
        title="Tạo câu hỏi mới phần mô tả tranh"
        width={720}
        onClose={onClose}
        open={open}
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
        <Form layout="vertical" hideRequiredMark>
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
                {fileList.length >= 8 ? null : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
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

          {/* Phần chọn Tag với chế độ chọn một */}
          <Row gutter={[16, 16]} className="mt-16">
            <Col span={24}>
              <Form.Item label="Chọn Tag">
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

          {/* Các đáp án */}
          <Row gutter={[16, 16]} className="mt-8">
            <Col span={24}>
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
            </Col>
          </Row>
        </Form>
      </Drawer>

      <Modal
        title="Chi tiết câu hỏi"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={
          <Button onClick={handleCancel} type="primary">
            Đóng
          </Button>
        }
      >
        {selectedQuestion && (
          <div>
            <p>
              <strong>ID:</strong> {selectedQuestion.id_ID}
            </p>
            <p>
              <strong>Nội dung:</strong> {selectedQuestion.content}
            </p>
            <p>
              <strong>Tag:</strong> {selectedQuestion.tag}
            </p>
            <p>
              <strong>Đáp án được chọn:</strong> {selectedQuestion.selectedAnswer || 'Chưa chọn'}
            </p>

            {/* Hiển thị các đáp án của câu hỏi đã chọn */}
            <p>
              <strong>Đáp án:</strong>
            </p>
            {selectedQuestion.answers && selectedQuestion.answers.length > 0 ? (
              <ul>
                {selectedQuestion.answers.map((answer, idx) => (
                  <li key={idx}>{answer}</li>
                ))}
              </ul>
            ) : (
              <p>Không có đáp án</p>
            )}

            <p>
              <strong>Hình ảnh:</strong>
            </p>
            {selectedQuestion.imageFiles && selectedQuestion.imageFiles.length > 0 ? (
              <div>
                {selectedQuestion.imageFiles.map((file, idx) => (
                  <Image key={idx} src={file.url} alt={file.name} width={100} className="mr-2" />
                ))}
              </div>
            ) : (
              <p>Không có hình ảnh</p>
            )}

            <p>
              <strong>Âm thanh:</strong>
            </p>
            {selectedQuestion.audioFiles && selectedQuestion.audioFiles.length > 0 ? (
              <div>
                {selectedQuestion.audioFiles.map((file, idx) => (
                  <audio key={idx} controls className="mb-2">
                    <source src={file.url} type="audio/mpeg" />
                    <track kind="captions" />
                    Trình duyệt không hỗ trợ phát âm thanh.
                  </audio>
                ))}
              </div>
            ) : (
              <p>Không có âm thanh</p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}

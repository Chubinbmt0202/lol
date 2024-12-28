import { PlusOutlined } from '@ant-design/icons';
import {
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Input,
  Drawer,
  Space,
  Upload,
  Tag,
  Select,
  message,
} from 'antd';
import { useState } from 'react';
import * as XLSX from 'xlsx';

const { Dragger } = Upload;

export default function Talk() {
  const [items, setItems] = useState([
    { id_ID: '1', content: 'Câu hỏi 1', tag: 'Câu hỏi WHAT' },
    { id_ID: '2', content: 'Câu hỏi 2', tag: 'Câu hỏi WHO' },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);
  const showDrawer = () => setOpen(true);
  const onClose = () => {
    setOpen(false);
    form.resetFields(); // Reset form sau khi đóng Drawer
  };

  // Hàm xử lý upload file Excel
  const handleExcelUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Lọc dữ liệu theo điều kiện (Part 2)
      const filteredItems = (jsonData as any[]).filter((row) => row.part === 'Part 2');

      // Cập nhật danh sách câu hỏi
      setItems((prevItems) => [
        ...prevItems,
        ...filteredItems.map((item, index) => ({
          id_ID: `${prevItems.length + index + 1}`,
          content: item.title,
          tag: item.tag,
        })),
      ]);

      setIsModalVisible(false);
      message.success('Tải lên thành công!');
    };

    reader.readAsArrayBuffer(file);
  };

  const uploadProps = {
    beforeUpload: (file: File) => {
      handleExcelUpload(file);
      return false; // Ngăn không tải file lên server mặc định
    },
  };

  // Hàm lưu câu hỏi mới
  const handleSaveQuestion = () => {
    form.validateFields().then((values) => {
      const newQuestion = {
        id_ID: `${items.length + 1}`,
        content: values.content,
        tag: values.tag,
      };

      setItems((prevItems) => [...prevItems, newQuestion]);
      message.success('Thêm câu hỏi thành công!');
      onClose();
    });
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

      {/* Modal upload Excel */}
      <Modal
        title="Thêm câu hỏi từ file Excel"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <PlusOutlined />
          </p>
          <p className="ant-upload-text">Click hoặc kéo file vào đây để tải lên</p>
          <p className="ant-upload-hint">Chỉ hỗ trợ file Excel (.xlsx, .xls).</p>
        </Dragger>
      </Modal>

      {/* Drawer thêm câu hỏi mới */}
      <Drawer
        title="Tạo câu hỏi mới phần hỏi đáp"
        width={720}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Huỷ</Button>
            <Button onClick={handleSaveQuestion} type="primary">
              Lưu
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" form={form} hideRequiredMark>
          <Form.Item
            name="content"
            label="Nội dung câu hỏi"
            rules={[{ required: true, message: 'Vui lòng nhập câu hỏi!' }]}
          >
            <Input placeholder="Nhập nội dung câu hỏi" />
          </Form.Item>
          <Form.Item
            name="tag"
            label="Chọn Tag"
            rules={[{ required: true, message: 'Vui lòng chọn tag!' }]}
          >
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
                { label: 'Câu hỏi trần thuật', value: 'Câu hỏi trần thuật' },
              ]}
            />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}

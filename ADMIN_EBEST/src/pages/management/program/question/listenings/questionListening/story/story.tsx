import { PlusOutlined } from '@ant-design/icons';
import { Row, Col, Card, Button, Drawer, Space, Menu, notification } from 'antd';
import { useState, useEffect } from 'react';
import AddQuestion from './addConversation'; // Import the AddQuestion component
import QuestionCard from './QuestionCard'; // Import the QuestionCard component
import { UploadFile } from 'antd/lib';

export default function Conversation() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [audioFileList, setAudioFileList] = useState<UploadFile[]>([]);
  const [items, setItems] = useState([
    { id_ID: '1', content: 'Câu hỏi 1', tag: 'Câu hỏi về chủ đề, mục đích', loaiL: 'Listening', phan: 'Hội thoại ngắn' },
  ]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  const fetchAllquesstion = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/getAllQuestionChuyenNgan');
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched questions short talk:', data);
        setItems(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  useEffect(() => {
    fetchAllquesstion();
  }, []);

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  const handleMenuClick = (e, item) => {
    if (e.key === 'view') {
      // Handle view details
      console.log('View details of', item);
    } else if (e.key === 'edit') {
      // Handle edit
      console.log('Edit', item);
    } else if (e.key === 'delete') {
      // Handle delete
      console.log('Delete', item);
      setItems(items.filter(i => i.id_ID !== item.id_ID));
    }
  };

  const handleSave = async (data: any) => {
    try {
        console.log('Data:', data);

        const newQuestionName = `Câu hỏi ${items.length + 1}`;
        const newData = {
            ...data,
            content: newQuestionName,
            id_ID: Date.now().toString(),
            loai: 'Listening',
            phan: 'Chuyện ngắn',
        };

        const uploadFileToCloudinary = async (file: any) => {
            const formData = new FormData();
            formData.append('file', (file.originFileObj as Blob) || file);
            formData.append('upload_preset', 'question');

            const response = await fetch('https://api.cloudinary.com/v1_1/dx3snw69p/upload', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            return result;
        };

        const audioUploadPromises = data.audioFiles.map((file: any) => uploadFileToCloudinary(file));
        const imageUploadPromises = data.imageFiles.map((file: any) => uploadFileToCloudinary(file));

        const audioUploadResults = await Promise.all(audioUploadPromises);
        const imageUploadResults = await Promise.all(imageUploadPromises);

        // Update newData with Cloudinary URLs
        newData.audioFiles = audioUploadResults.map((result: any) => ({
            url: result.secure_url,
            ...result,
        }));
        newData.imageFiles = imageUploadResults.map((result: any) => ({
            url: result.secure_url,
            ...result,
        }));

        setItems([...items, newData]);
        console.log('Saved Data:', newData);
        notification.success({
          message: 'Success',
          description: 'Data saved successfully',
      });

      try {
        const response = await fetch('http://localhost:5000/api/addQuestionChuyenNgan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'secret-key': '$2b$10$wH2tP7qD2i1p1TQ8Z7n0fO8m3Rj8c8Yt9l0tJqQ8B8Z2U4m8JrU9S',
            },
            body: JSON.stringify(newData),
        });

        if (response.ok) {
            console.log('Data saved successfully');
            notification.success({
                message: 'Success',
                description: 'Câu hỏi được tạo thành công',
            });
        } else {
            console.error('Failed to save data:', response);
            notification.error({
                message: 'Failed to save data',
                description: 'Failed to save data',
            });
        }
      } catch (error) {
          console.error('Error saving data:', error);
          notification.error({
              message: 'Failed to save data',
              description: 'Failed to save data',
          });
      }
        onClose();
    } catch (error) {
        console.error('Error saving data:', error);
        notification.error({
            message: 'Failed to save data',
            description: 'Failed to save data',
        });
    }
};

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
          {items?.length > 0 ? (
            items.map((item) => (
              <QuestionCard key={item.id_ID} item={item} handleMenuClick={handleMenuClick} />
            ))
          ) : (
            <p>No questions available</p>
          )}
        </Row>
      </Card>

      <Drawer
        title="Tạo câu hỏi mới phần chuyện ngắn"
        width={720}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Huỷ</Button>
            <Button onClick={() => handleSave(formData)} type="primary">
              Lưu
            </Button>
          </Space>
        }
      >
        <AddQuestion onSave={setFormData} onClose={onClose} />
      </Drawer>
    </div>
  );
}
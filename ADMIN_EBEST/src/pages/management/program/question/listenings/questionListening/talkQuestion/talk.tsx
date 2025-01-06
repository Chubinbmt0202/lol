import { PlusOutlined } from '@ant-design/icons';
import {
  Row,
  Col,
  Card,
  Button,
  notification,
} from 'antd';
import { useState, useEffect } from 'react';
import { Dropdown, Menu } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import QuestionCard from './QuestionCard';
import QuestionDrawer from './addQuesitonTalk';
import QuestionModal from './detailQuestion';
import QuestionModalTalk from './detailQuestion';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export default function Picture() {
  const [items, setItems] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [openEditor, setOpenEditor] = useState(false);
  const [questionsChanged, setQuestionsChanged] = useState(false);
  const [latestTitleNumber, setLatestTitleNumber] = useState(1); // State to keep track of the latest title number
  const showModal = () => setIsModalVisible(true);
  const handleOk = () => setIsModalVisible(false);
  const showDrawer = () => setOpen(true);
  const onClose = () => {
    setOpen(false);
    setOpenEditor(false);
    setSelectedQuestion(null);
  };

  const handleView = (item: Question) => {
    console.log('View:', item);
    showQuestionDetail(item);
  };

  const handleEdit = (item: Question) => {
    console.log('Edit:', item);
  };

  const handleDelete = async (id: string) => {
    console.log('Delete:', id);
    try {
      await fetch(`http://localhost:5000/api/deleteListeningQuestion/${id}`, {
        method: 'DELETE',
      });
      notification.success({
        message: 'Xóa thành công câu hỏi phần hỏi đáp',
      });
    } catch (error) {
      console.error('Failed to delete question:', error);
  
      notification.error({
        message: 'Xóa câu hỏi phần hỏi đáp thất bại',
      });
    }
    setItems((prevItems) => prevItems.filter((item) => item.idCauHoi !== id));
    setQuestionsChanged(!questionsChanged);
  };

  interface MenuClickEvent {
    key: string;
  }

  const handleMenuClick = (e: MenuClickEvent, item: Question) => {
    switch (e.key) {
      case 'view':
        handleView(item);
        break;
      case 'edit':
        handleEdit(item);
        break;
      case 'delete':
        handleDelete(item.idCauHoi);
        break;
      default:
        break;
    }
  };

  const onSave = async (question: Question) => {
    const audioLinks = await uploadAudioFiles(audioFileList);  // Chờ upload hoàn tất
    const audioLinkUrls = audioLinks.map(file => file.url);   // Chỉ lấy link URL
  
    console.log('Link file', audioLinkUrls);

    console.log('Save question talk', question);
    try {
      const response = await fetch('http://localhost:5000/api/addQuestionTalk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          audioLinkUrls,
          ...question,
          content: `Câu hỏi ${latestTitleNumber}`, // Add title with incremented number
          phan: 'Hỏi đáp',
          typeQuestion: 'Listening'
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Save question response:', data);
    } catch (error) {
      console.error('Error saving question:', error);
      notification.error({
        message: 'Error',
        description: 'Đã xảy ra lỗi khi lưu câu hỏi vào database.',
      });
    }
    if (selectedQuestion) {
      // Update existing question
      setItems(prevItems =>
        prevItems.map(item =>
          item.id_ID === selectedQuestion.id_ID ? { ...question, id_ID: selectedQuestion.id_ID } : item
        )
      );
      notification.success({
        message: 'Success',
        description: 'Câu hỏi đã được cập nhật thành công!',
      });
    } else {
      // Add new question
      const newQuestion = {
        ...question,
        id_ID: String(Date.now()),
        title: `Câu hỏi ${latestTitleNumber}`, // Add title with incremented number
      };
      setItems(prevItems => [...prevItems, newQuestion]);
      notification.success({
        message: 'Success',
        description: 'Câu hỏi đã được thêm thành công!',
      });
      setLatestTitleNumber(latestTitleNumber + 1); // Increment title number for the next question
    }
    setQuestionsChanged(!questionsChanged); 
    onClose();
  };

  const uploadAudioFiles = async (files: UploadFile[]): Promise<{ name: string; url: string }[]> => {
    try {
      const totalFiles = files.length;
      let uploadedFiles = 0;
  
      const uploadedFilesData = await Promise.all(
        files.map(async (file, index) => {
          const formData = new FormData();
          formData.append('file', (file.originFileObj as Blob) || file);
          formData.append('upload_preset', 'question');
  
          const response = await fetch('https://api.cloudinary.com/v1_1/dx3snw69p/upload', {
            method: 'POST',
            body: formData,
          });
  
          if (!response.ok) {
            const errorData = await response.json();
            console.error('Error from Cloudinary:', errorData);
            throw new Error(`Error uploading file: ${file.name}`);
          }
  
          const data = await response.json();
          uploadedFiles += 1;
          updateProgress(uploadedFiles, totalFiles);
  
          return {
            name: file.name,
            url: data.secure_url,
          };
        }),
      );
  
      notification.success({
        message: 'Upload successful',
        description: `Đã tải lên ${uploadedFiles} tệp thành công.`,
      });
  
      // Cập nhật danh sách file sau khi upload thành công
      setAudioFileList(uploadedFilesData);
  
      return uploadedFilesData;  // Trả về link file
    } catch (error) {
      console.error('Error during file upload:', error);
      notification.error({
        message: 'Upload failed',
        description: 'Đã xảy ra lỗi khi tải lên cloud.',
      });
      throw new Error('Upload failed');
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/getAllQuestionTalk');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Questions talk data:', data.data);
      setItems(data.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);
   
  const [progress, setProgress] = useState(0);

  const updateProgress = (uploadedFiles: number, totalFiles: number) => {
    const newProgress = Math.round((uploadedFiles / totalFiles) * 100);
    setProgress(newProgress);
  };

  interface Question {
    id_ID: string;
    selectedAnswer: string;
    imageFiles: { name: string; url: string }[];
    audioFiles: { name: string; url: string }[];
    content: string;
    tag: string;
    answers: string[];
    typeQuestion: string;
    phan: string;
  }

  const showQuestionDetail = (question: Question) => {
    console.log('Selected question:', question);
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
          {items?.length > 0 ? (
            items.map((item) => (
              <QuestionCard key={item.idCauHoi} item={item} handleMenuClick={handleMenuClick} />
            ))
          ) : (
            <p>No questions available</p>
          )}
        </Row>
      </Card>

      <QuestionModalTalk visible={isModalVisible}  question={selectedQuestion} onClose={handleCancel} />

      <QuestionDrawer
        visible={open}
        onClose={onClose}
        onSave={onSave}
        progress={progress}
        fileList={fileList}
        setFileList={setFileList}
        audioFileList={audioFileList}
        setAudioFileList={setAudioFileList}
        currentQuestion={selectedQuestion ?? undefined}
        isEditing={!!selectedQuestion}
      />

    </div>
  );
}
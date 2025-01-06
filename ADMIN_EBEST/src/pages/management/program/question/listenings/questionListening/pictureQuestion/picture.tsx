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
import QuestionModal from './detailQuestion';
import QuestionDrawer from './addQuestion';
import QuestionDrawerUpdate from './updateQuestion';
import { id_ID } from '@faker-js/faker';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export default function Picture() {
  const [items, setItems] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [openEditor, setOpenEditor] = useState(false);
  const [questionsChanged, setQuestionsChanged] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleOk = () => setIsModalVisible(false);
  const showDrawer = () => setOpen(true);
  const onClose = () => {
    setOpen(false);
    setOpenEditor(false);
  };

  const fetchAllquesstion = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/getAllListeningQuestions');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log('Fetched questions:', data.data);
      setItems(data.data);
    } catch (error) {
      console.error('Failed to fetch questions:', error);
      notification.error({
        message: 'Error',
        description: 'Đã xảy ra lỗi khi tải danh sách câu hỏi.',
      });
    }
  };

  useEffect(() => {
    fetchAllquesstion();
  }, [questionsChanged]);

  const handleView = (item: Question) => {
    console.log('View:', item);
    showQuestionDetail(item);
  };

  const handleEdit = (item: Question) => {
    console.log('Edit:', item);
    setSelectedQuestion(item);
    setOpenEditor(true);
  };

  const handleDelete = async (id: string) => {
    console.log('Delete:', id);
    try {
      await fetch(`http://localhost:5000/api/deleteListeningQuestion/${id}`, {
        method: 'DELETE',
      });

      notification.success({
        message: 'Success',
        description: 'Câu hỏi đã được xóa thành công!',
      });
    } catch (error) {
      console.error('Failed to delete question:', error);
      notification.error({
        message: 'Error',
        description: 'Đã xảy ra lỗi khi xóa câu hỏi.',
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

  const onSave = async () => {
    try {
      const imageFiles = await uploadFiles(fileList);
      const audioFiles = await uploadFiles(audioFileList);
      const selectedAnswer = document.querySelector<HTMLInputElement>('input[type="radio"]:checked')?.value || null;
      const questionContent = document.querySelector<HTMLInputElement>('input[placeholder="Nhập câu hỏi mới"]')?.value || '';
      const newQuestion: Question = {
        id_ID: selectedQuestion ? selectedQuestion.id_ID : `${items.length + 1}`,
        content: questionContent || `Câu hỏi ${items.length + 1}`,
        tag: document.querySelector<HTMLSelectElement>('.ant-select-selection-item')?.textContent || '',
        answers: [
          document.querySelector<HTMLInputElement>('input[placeholder="Nhập đáp án 1"]')?.value || '',
          document.querySelector<HTMLInputElement>('input[placeholder="Nhập đáp án 2"]')?.value || '',
          document.querySelector<HTMLInputElement>('input[placeholder="Nhập đáp án 3"]')?.value || '',
          document.querySelector<HTMLInputElement>('input[placeholder="Nhập đáp án 4"]')?.value || '',
        ],
        selectedAnswer,
        imageFiles,
        audioFiles,
        typeQuestion: 'Listening',
        phan: 'Mô tả tranh'
      };

      console.log('Update question with id:', selectedQuestion || 'No question data');
  
      const url = selectedQuestion ? `http://localhost:5000/api/updateListeningQuestion/${selectedQuestion.idCauHoi}` : 'http://localhost:5000/api/addListeningQuestion';
      const method = selectedQuestion ? 'PUT' : 'POST';
      
      try {
        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newQuestion),
        });
  
        if (!response.ok) {
          throw new Error('Failed to send question to API');
        }
  
        if (selectedQuestion) {
          setItems((prevItems) => prevItems.map(item => item.id_ID === newQuestion.id_ID ? newQuestion : item));
        } else {
          setItems((prevItems) => [...prevItems, newQuestion]);
        }
  
        setQuestionsChanged(!questionsChanged);
  
        console.log('Lưu câu hỏi thành công!', newQuestion);
        notification.success({
          message: 'Success',
          description: 'Câu hỏi đã được lưu và gửi đi thành công!',
        });
        fetchAllquesstion();
        setOpen(false);
      } catch (error) {
        console.error('Thêm câu hỏi thất bại:', error);
        notification.error({
          message: 'Error',
          description: 'Đã xảy ra lỗi khi thêm câu hỏi hoặc gửi câu hỏi đi.',
        });
      }
    } catch (error) {
      console.error('Lưu câu hỏi thất bại:', error);
      notification.error({
        message: 'Error',
        description: 'Đã xảy ra lỗi khi lưu câu hỏi hoặc gửi câu hỏi đi.',
      });
    }
  };

  const uploadFiles = async (files: UploadFile[]) => {
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

      return uploadedFilesData;
    } catch (error) {
      console.error('Error during file upload:', error);
      notification.error({
        message: 'Upload failed',
        description: 'Đã xảy ra lỗi khi tải lên tệp.',
      });
      throw new Error('Upload failed');
    }
  };

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
              <QuestionCard key={item.id_ID} item={item} handleMenuClick={handleMenuClick} />
            ))
          ) : (
            <p>No questions available</p>
          )}
        </Row>
      </Card>

      <QuestionModal visible={isModalVisible} question={selectedQuestion} onClose={handleCancel} />

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

      <QuestionDrawerUpdate
        visible={openEditor}
        onClose={onClose}
        onSave={onSave}
        progress={progress}
        fileList={fileList}
        setFileList={setFileList}
        audioFileList={audioFileList}
        setAudioFileList={setAudioFileList}
        currentQuestion={selectedQuestion ?? undefined}
      />
    </div>
  );
}
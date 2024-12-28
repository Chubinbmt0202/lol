import { Drawer, Button, Input, Space, Radio, Checkbox, Modal, message } from 'antd';
import { useState } from 'react';

import { useExercises } from './provider/questionClass';

interface MultipleChoiceQuestionData {
  id: string;
  text: string;
  options: string[];
  correct: number;
}

interface EssayQuestionData {
  text: string;
  type: 'essay';
}

interface ExerciseDrawerProps {
  visible: boolean;
  onClose: () => void;
}

export default function ExerciseDrawer({ visible, onClose }: ExerciseDrawerProps) {
  const { addExercise } = useExercises();
  const [questionType, setQuestionType] = useState<'multiple' | 'essay' | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false); // Trạng thái đang tạo câu hỏi
  const [showExitModal, setShowExitModal] = useState(false); // Hiển thị modal xác nhận thoát
  const { exercises } = useExercises();

  const resetState = () => {
    setQuestionType(null);
    setQuestions([]);
    setIsCreating(false);
  };

  const handleCloseDrawer = () => {
    if (isCreating) {
      setShowExitModal(true);
    } else {
      resetState();
      onClose();
    }
  };

  const handleExitConfirm = () => {
    setShowExitModal(false);
    resetState();
    onClose();
  };

  const addNewQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        type: 'multiple',
        text: '',
        options: ['', '', '', ''],
        correct: -1,
      },
    ]);
    setIsCreating(true);
  };

  const handleSaveQuestion = (id: string, data: any) => {
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, ...data } : q)));
    setIsCreating(false); // Đặt lại trạng thái sau khi lưu
    message.success('Câu hỏi đã được lưu!');
  };

  const handleDeleteQuestion = (id: string) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa câu hỏi này không?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk: () => {
        setQuestions((prev) => prev.filter((q) => q.id !== id));
        message.success('Câu hỏi đã được xóa!');
      },
    });
  };

  const handleSaveExercises = () => {
    // Tạo một bài tập mới chứa các câu hỏi từ questions
    const newExercise = {
      id: generateIds(), // Generate ID cho bài tập mới
      questions, // Các câu hỏi đã được tạo
      type: questionType, // 'multiple' or 'essay' based on selected question type
    };

    // Thêm bài tập vào danh sách bài tập
    addExercise(newExercise);

    console.log('exercises', exercises); // Kiểm tra bài tập đã lưu

    message.success('Bài tập đã được lưu vào hệ thống!');

    onClose(); // Đóng Drawer
    setQuestions([]); // Reset câu hỏi sau khi lưu
  };

  return (
    <>
      <Drawer
        title="Tạo bài tập"
        visible={visible}
        onClose={handleCloseDrawer}
        width={700}
        extra={
          <Space>
            <Button onClick={handleCloseDrawer}>Đóng</Button>
            <Button type="primary" onClick={handleSaveExercises}>
              Lưu bài tập
            </Button>
          </Space>
        }
      >
        {/* Chọn loại câu hỏi */}
        {!questionType && (
          <div>
            <h3>Chọn loại câu hỏi</h3>
            <Radio.Group onChange={(e) => setQuestionType(e.target.value)} value={questionType}>
              <Radio value="multiple">Trắc nghiệm</Radio>
              <Radio value="essay">Tự luận</Radio>
            </Radio.Group>
          </div>
        )}

        {/* Loại câu hỏi: Trắc nghiệm */}
        {questionType === 'multiple' && (
          <div>
            <Button type="primary" onClick={addNewQuestion} className="mb-4">
              Thêm câu hỏi
            </Button>
            {questions.map((question: MultipleChoiceQuestionData) => (
              <MultipleChoiceQuestion
                key={question.id}
                question={question}
                onSave={(data: MultipleChoiceQuestionData) => handleSaveQuestion(question.id, data)}
                onDelete={(id: string) => handleDeleteQuestion(id)}
              />
            ))}
          </div>
        )}

        {/* Loại câu hỏi: Tự luận */}
        {questionType === 'essay' && (
          <div>
            <EssayQuestion
              onSave={(data: EssayQuestionData) => {
                handleSaveQuestion('essay', data);
              }}
            />
          </div>
        )}
      </Drawer>

      {/* Modal xác nhận thoát */}
      <Modal
        title="Xác nhận thoát"
        visible={showExitModal}
        onOk={handleExitConfirm}
        onCancel={() => setShowExitModal(false)}
        okText="Thoát"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn thoát không? Tất cả câu hỏi chưa lưu sẽ bị mất.</p>
      </Modal>
    </>
  );
}

// Component cho câu hỏi trắc nghiệm
interface MultipleChoiceQuestionProps {
  question: MultipleChoiceQuestionData;
  onSave: (data: MultipleChoiceQuestionData) => void;
  onDelete: (id: string) => void;
}

function MultipleChoiceQuestion({ question, onSave, onDelete }: MultipleChoiceQuestionProps) {
  const [isEditing, setIsEditing] = useState(true);
  const [text, setText] = useState(question.text);
  const [options, setOptions] = useState(question.options);
  const [correct, setCorrect] = useState(question.correct);

  const saveQuestion = () => {
    if (!text.trim()) {
      message.error('Câu hỏi không được để trống!');
      return;
    }
    if (correct === -1) {
      message.error('Bạn phải chọn một đáp án đúng!');
      return;
    }
    onSave({ id: question.id, text, options, correct });
    setIsEditing(false);
  };

  const updateOption = (index: number, value: string) => {
    setOptions((prev) => prev.map((opt, i) => (i === index ? value : opt)));
  };

  return (
    <div className="mb-6 rounded border p-4">
      {isEditing ? (
        <>
          <Input
            placeholder="Nhập nội dung câu hỏi"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mb-4"
          />
          {options.map((option, index) => (
            <div key={index} className="mb-2 mt-2 flex items-center">
              <Checkbox
                checked={correct === index}
                onChange={() => setCorrect(index)}
                className="mr-2"
              />
              <Input
                placeholder={`Đáp án ${index + 1}`}
                value={option}
                className="ml-2"
                onChange={(e) => updateOption(index, e.target.value)}
              />
            </div>
          ))}
          <Space>
            <Button type="primary" onClick={saveQuestion}>
              Lưu câu hỏi
            </Button>
            <Button onClick={() => onDelete(question.id)}>Hủy</Button>
          </Space>
        </>
      ) : (
        <>
          <h4>Tên câu hỏi: {question.text}</h4>
          <ul>
            {question.options.map((option, index) => (
              <li key={index} style={{ color: correct === index ? 'green' : 'black' }}>
                {option}
              </li>
            ))}
          </ul>
          <Space>
            <Button type="default" onClick={() => setIsEditing(true)}>
              Chỉnh sửa
            </Button>
            <Button danger onClick={() => onDelete(question.id)}>
              Xóa
            </Button>
          </Space>
        </>
      )}
    </div>
  );
}

// Component cho câu hỏi tự luận
interface EssayQuestionProps {
  onSave: (data: EssayQuestionData) => void;
}

function EssayQuestion({ onSave }: EssayQuestionProps) {
  const [text, setText] = useState('');

  const saveQuestion = () => {
    if (!text.trim()) {
      message.error('Câu hỏi không được để trống!');
      return;
    }
    onSave({ text, type: 'essay' });
  };

  return (
    <div>
      <Input.TextArea
        rows={4}
        placeholder="Nhập nội dung câu hỏi tự luận"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Space className="mt-4">
        <Button type="primary" onClick={saveQuestion}>
          Lưu câu hỏi
        </Button>
      </Space>
    </div>
  );
}
function generateIds() {
  return Math.random().toString(36).substring(2, 9);
}
function generateId() {
  throw new Error('Function not implemented.');
}

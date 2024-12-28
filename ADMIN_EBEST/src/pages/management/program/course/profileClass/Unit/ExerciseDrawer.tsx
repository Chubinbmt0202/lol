import { Modal, List, Button } from 'antd';

interface Exercise {
  id: number;
  questions: {
    text: string;
    type: string;
    options?: string[];
    correct?: number;
  }[];
}

const ExerciseModal = ({ visible, exercise, onClose }: { visible: boolean; exercise: Exercise | null; onClose: () => void }) => {
  return (
    <Modal
      title={`Chi tiết bài tập ${exercise ? exercise.id : ''}`}
      visible={visible}
      onCancel={onClose}
      footer={[<Button key="back" onClick={onClose}>Đóng</Button>]}
      width={800}
    >
      {exercise && (
        <div>
          <h2>Câu hỏi:</h2>
          <List
            dataSource={exercise.questions}
            renderItem={(question, index) => (
              <List.Item key={index}>
                <div>
                  <p>{question.text}</p>
                  {question.type === 'multiple' && question.options && (
                    <ul>
                      {question.options.map((option, i) => (
                        <li key={i}>
                          {i === question.correct ? <strong>{option}</strong> : option}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </List.Item>
            )}
          />
        </div>
      )}
    </Modal>
  );
};

export default ExerciseModal;

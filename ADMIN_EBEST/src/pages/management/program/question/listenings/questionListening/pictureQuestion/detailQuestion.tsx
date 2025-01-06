import { Modal, Image } from 'antd';
import { FC } from 'react';

interface Question {
  idCauHoi: number;
  imageCauHoi: string;
  tenCauHoi: string;
  deBai: string | null;
  audio: string;
  tagCauHoi: string;
  luaChon: string;
  dapAnDung: string;
  diem: string;
  loaiCauHoi: string;
  phan: string;
}

interface QuestionModalProps {
  visible: boolean;
  question: Question | null;
  onClose: () => void;
}

const QuestionModal: FC<QuestionModalProps> = ({ visible, question, onClose }) => {
  if (question) {
    // Parse luaChon from JSON string to array
    let luaChonArray = [];
    try {
      luaChonArray = JSON.parse(question.luaChon);
    } catch (error) {
      console.error('Failed to parse luaChon:', error);
    }

    console.log('Selected question:', question); // Debugging log
    return (
      <Modal title="Xem chi tiết câu hỏi" visible={visible} onOk={onClose} onCancel={onClose}>
        <div>
          <p>
            <strong>ID:</strong> {question.idCauHoi}
          </p>
          <p>
            <strong>Nội dung:</strong> {question.tenCauHoi}
          </p>
          <p>
            <strong>Tag:</strong> {question.tagCauHoi}
          </p>
          <p>
            <strong>Đáp án được chọn:</strong> {question.dapAnDung || 'Chưa chọn'}
          </p>
          <p>
            <strong>Đáp án:</strong>
          </p>
          {luaChonArray.length > 0 && (
            <ul>
              {luaChonArray.map((answer: string, idx: number) => (
                <li key={idx}>{answer}</li>
              ))}
            </ul>
          )}
          <p>
            <strong>Hình ảnh:</strong>
          </p>
          <Image src={question.imageCauHoi} alt="Hình ảnh câu hỏi" width={100} className="mr-2" />
          <p>
            <strong>Âm thanh:</strong>
          </p>
          <audio controls className="mb-2">
            <source src={question.audio} type="audio/mpeg" />
            <track kind="captions" />
            Trình duyệt không hỗ trợ phát âm thanh.
          </audio>
        </div>
      </Modal>
    );
  }

  return null;
};

export default QuestionModal; 
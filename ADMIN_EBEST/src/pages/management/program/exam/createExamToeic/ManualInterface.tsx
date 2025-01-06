import React, { useEffect, useState } from 'react';
import { Select, Card, Button, Row, Col, Tooltip, message } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

const ManualInterface: React.FC<{
  setSelectedQuestions: (questions: { id: number, tenCauHoi: string }[]) => void;
  selectedQuestions: { id: number, tenCauHoi: string }[];
}> = ({ setSelectedQuestions, selectedQuestions }) => {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any>({});
  const [bodeData, setBodeData] = useState<any>([]);

  const handlePartChange = (value: string) => {
    setSelectedPart(value);
  };

  const handleQuestionSelect = (part: string, question: any) => {
    const key = question.idCauHoi;
    if (!selectedQuestions.find(q => q.id === key)) {
      setSelectedQuestions([  
        ...selectedQuestions,
        { id: key, tenCauHoi: question.tenCauHoi},
      ]);
    }
  };

  const handleQuestionRemove = (key: number) => {
    const updatedQuestions = selectedQuestions.filter(q => q.id !== key);
    setSelectedQuestions(updatedQuestions);
  };

  const fetchAllQuestions = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/getAllQuestion`);
      const fetchBode = await fetch('http://localhost:5000/api/getAllBode');
      if (!fetchBode.ok) {
        throw new Error('Failed to fetch data');
      } else {
        const data = await fetchBode.json();
        console.log('Fetch data successfully bode', data);
        setBodeData(data);
      }
      if (response.status === 200) {
        const data = await response.json();
        const categorizedQuestions = categorizeQuestions(data.data);
        setQuestions(categorizedQuestions);
      }
    } catch (error) {
      message.error('Có lỗi xảy ra, vui lòng thử lại sau');
    }
  };

  const categorizeQuestions = (data) => {
    return data.reduce((acc, question) => {
      const { phan } = question;
      if (!acc[phan]) {
        acc[phan] = [];
      }
      acc[phan].push(question);
      return acc;
    }, {});
  };

  useEffect(() => {
    fetchAllQuestions();
  }, []);

  useEffect(() => {
    if (selectedPart) {
      console.log('Loại đề:', selectedPart);
      console.log('Tên bộ đề:', selectedPart); // Assuming the part name and set name are the same
      console.log('Các câu hỏi đã chọn:', selectedQuestions);
    }
  }, [selectedQuestions, selectedPart]);

  return (
    <div>
      <p className='mb-4'>Đây là giao diện thủ công. Quản trị viên có thể chọn từng câu hỏi thuộc bất kỳ Part nào.</p>
      <Select
        placeholder="Chọn phần"
        style={{ width: 200, marginBottom: 20 }}
        onChange={handlePartChange}
      >
        {Object.keys(questions).map(part => (
          <Option key={part} value={part}>
            {part}
          </Option>
        ))}
      </Select>

      {selectedPart && (
        <Card title={`Chọn câu hỏi cho ${selectedPart}`}>
          <Row gutter={[16, 16]}>
            {questions[selectedPart].map((item: any) => (
              <Col key={item.idCauHoi} span={6}>
                <Tooltip
                  title={
                    <div>
                      <p><strong>Tên câu hỏi:</strong> {item.tenCauHoi}</p>
                    </div>
                  }
                >
                  <Button
                    block
                    onClick={() => handleQuestionSelect(selectedPart, item)}
                    disabled={!!selectedQuestions.find(q => q.id === item.idCauHoi)}
                  >
                    {item.tenCauHoi}
                  </Button>
                </Tooltip>
              </Col>
            ))}
          </Row>
        </Card>
      )}

      <Card title="Các câu hỏi đã chọn" style={{ marginTop: 20 }}>
        <Row gutter={[16, 16]}>
          {selectedQuestions.map((item) => (
            <Col key={item.id} span={6}>
              <Tooltip
                title={
                  <div>
                    <p><strong>Tên câu hỏi:</strong> {item.tenCauHoi}</p>
                  </div>
                }
              >
                <Card style={{ border: '1px solid #d9d9d9' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span>{item.tenCauHoi}</span>
                    <CloseCircleOutlined
                      onClick={() => handleQuestionRemove(item.id)}
                      style={{ color: 'red', cursor: 'pointer' }}
                    />
                  </div>
                </Card>
              </Tooltip>
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
};

export default ManualInterface;
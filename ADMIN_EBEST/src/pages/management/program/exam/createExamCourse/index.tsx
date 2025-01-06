import React, { useState, useEffect } from 'react';
import { Drawer, Button, List, Input, Space, Radio, Checkbox, Popconfirm, Card, Tag, Row, Col, message, Select, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
const { TextArea } = Input;
const { Option } = Select;
const { confirm } = Modal;

interface AddCourseModalProps {
  isVisible: boolean;
  onOk: (data: object) => void;
  onCancel: () => void;
}

interface AnswerOption {
  text: string;
  isCorrect: boolean;
}

interface Question {
  type: string;
  title: string;
  points: number;
  answers: AnswerOption[];
}

interface Course {
  idKhoaHoc: string;
  tenKhoaHoc: string;
}

const AddCourseModal: React.FC<AddCourseModalProps> = ({ isVisible, onOk, onCancel }) => {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const [questionType, setQuestionType] = useState<string | null>(null);
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionPoints, setQuestionPoints] = useState<number>(1); // Default points set to 1
  const [answers, setAnswers] = useState<AnswerOption[]>([
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
  ]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(null);
  const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null);
  const [setName, setSetName] = useState<string>(''); // New state for the set name
  const [isSummaryModalVisible, setIsSummaryModalVisible] = useState(false); // State to control the summary modal
  const [courses, setCourses] = useState<Course[]>([]); // State to store courses

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/getAllCourse');
      const data = await response.json();
      const dataCourse = data.data.data;

      if (Array.isArray(dataCourse)) {
        localStorage.setItem('courses', JSON.stringify(dataCourse));
        console.log('Dữ liệu khóa học:', dataCourse);
        setCourses(dataCourse); // Cập nhật state với dữ liệu từ API
      } else {
        console.error('Dữ liệu từ API không phải là một mảng:', dataCourse);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };

  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };

  const handleCourseSelect = (course: string) => {
    setSelectedCourse(course);
  };

  const handleQuestionTypeSelect = (type: string) => {
    setQuestionType(type);
    setChildrenDrawer(false);
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index].text = value;
    setAnswers(newAnswers);
  };

  const handleCorrectAnswerChange = (index: number) => {
    setCorrectAnswerIndex(index);
    const newAnswers = answers.map((answer, idx) => ({
      ...answer,
      isCorrect: idx === index,
    }));
    setAnswers(newAnswers);
  };

  const handleCheckboxChange = (index: number, isChecked: boolean) => {
    const newAnswers = [...answers];
    newAnswers[index].isCorrect = isChecked;
    setAnswers(newAnswers);
  };

  const handleAddAnswer = () => {
    setAnswers([...answers, { text: '', isCorrect: false }]);
  };

  const handleRemoveAnswer = (index: number) => {
    const newAnswers = answers.filter((_, idx) => idx !== index);
    setAnswers(newAnswers);
    if (correctAnswerIndex === index) {
      setCorrectAnswerIndex(null);
    } else if (correctAnswerIndex !== null && correctAnswerIndex > index) {
      setCorrectAnswerIndex(correctAnswerIndex - 1);
    }
  };

  const handleSaveQuestion = () => {
    if (!questionType) {
      message.error('Vui lòng chọn loại câu hỏi.');
      return;
    }

    if (!questionTitle.trim()) {
      message.error('Vui lòng nhập tên câu hỏi.');
      return;
    }

    if (questionPoints <= 0) {
      message.error('Điểm phải lớn hơn 0.');
      return;
    }

    if (answers.some(answer => !answer.text.trim())) {
      message.error('Vui lòng nhập đầy đủ đáp án.');
      return;
    }

    if (questionType === 'Trắc nghiệm' && correctAnswerIndex === null) {
      message.error('Vui lòng chọn đáp án đúng.');
      return;
    }

    const newQuestion: Question = {
      type: questionType,
      title: questionTitle,
      points: questionPoints,
      answers,
    };

    if (editingQuestionIndex !== null) {
      const updatedQuestions = [...questions];
      updatedQuestions[editingQuestionIndex] = newQuestion;
      setQuestions(updatedQuestions);
      setEditingQuestionIndex(null);
    } else {
      setQuestions([...questions, newQuestion]);
    }

    // Reset form
    setQuestionType(null);
    setQuestionTitle('');
    setQuestionPoints(1); // Reset points to 1
    setAnswers([
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
    ]);
    setCorrectAnswerIndex(null);
  };

  const handleEditQuestion = (index: number) => {
    const question = questions[index];
    setQuestionType(question.type);
    setQuestionTitle(question.title);
    setQuestionPoints(question.points);
    setAnswers(question.answers);
    setCorrectAnswerIndex(question.answers.findIndex(answer => answer.isCorrect));
    setEditingQuestionIndex(index);
  };

  const handleDeleteQuestion = (index: number) => {
    setQuestions(questions.filter((_, idx) => idx !== index));
  };

  const renderQuestionTypeTag = (type: string) => {
    switch (type) {
      case 'Trắc nghiệm':
        return <Tag color="blue">Trắc nghiệm</Tag>;
      case 'Nhiều đáp án':
        return <Tag color="purple">Nhiều đáp án</Tag>;
      default:
        return <Tag>{type}</Tag>;
    }
  };

  const resetForm = () => {
    setSelectedCourse(null);
    setChildrenDrawer(false);
    setQuestionType(null);
    setQuestionTitle('');
    setQuestionPoints(1);
    setAnswers([
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
    ]);
    setQuestions([]);
    setCorrectAnswerIndex(null);
    setEditingQuestionIndex(null);
    setSetName('');
    setIsSummaryModalVisible(false);
  };

  const showConfirmCloseDrawer = () => {
    confirm({
      title: 'Xác nhận',
      content: 'Bạn có chắc chắn muốn thoát và mất mọi thay đổi chưa lưu?',
      okText: 'Có',
      cancelText: 'Không',
      onOk() {
        resetForm();
        onCancel();
      },
    });
  };

  const handleCreateSet = () => {
    if (!selectedCourse) {
      message.error('Vui lòng chọn khóa học.');
      return;
    }

    if (!setName.trim()) {
      message.error('Vui lòng nhập tên bộ đề.');
      return;
    }

    // Show summary modal
    setIsSummaryModalVisible(true);
  };

  const handleSummaryModalOk = async () => {
    const selectedCourseObj = courses.find(course => course.idKhoaHoc === selectedCourse);
    const data = {
      course: selectedCourse,
      courseName: selectedCourseObj ? selectedCourseObj.tenKhoaHoc : '',
      setName,
      questions,
    };
  
    console.log("Thông tin bộ đề:", data);
    onOk(data);
  
    try {
      const response = await fetch('http://localhost:5000/api/addCourseTest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Success:', result);
      message.success('Tạo bộ đề thành công.');
    } catch (error) {
      console.error('Error:', error);
      message.error('Có lỗi xảy ra khi tạo bộ đề.');
    } finally {
      setIsSummaryModalVisible(false);
      resetForm();
    }
  };

  const handleSummaryModalCancel = () => {
    setIsSummaryModalVisible(false);
  };

  const totalPoints = questions.reduce((sum, question) => sum + question.points, 0);

  return (
    <Drawer
      title="Thêm bộ đề khóa học"
      width={800}
      onClose={showConfirmCloseDrawer}
      visible={isVisible}
      extra={
        <Space>
          <Button onClick={showConfirmCloseDrawer}>Huỷ</Button>
          <Button type="primary" onClick={handleCreateSet}>Tạo bộ đề</Button>
        </Space>
      }
    >
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="courseSelect">Chọn khóa học:</label>
        <Select
          id="courseSelect"
          style={{ width: '100%' }}
          placeholder="Chọn khóa học"
          value={selectedCourse}
          onChange={handleCourseSelect}
        >
          {Array.isArray(courses) ? courses.map(course => (
            <Option key={course.idKhoaHoc} value={course.idKhoaHoc}>
              {course.tenKhoaHoc}
            </Option>
          )) : null}
        </Select>
      </div>

      {selectedCourse && (
        <>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="setName">Tên bộ đề:</label>
            <Input
              id="setName"
              placeholder="Nhập tên bộ đề"
              value={setName}
              onChange={(e) => setSetName(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          {questionType ? (
            <div>
              <h3 style={{ marginBottom: '5px' }}>Loại câu hỏi: {questionType}</h3>
              {(questionType === 'Trắc nghiệm' || questionType === 'Nhiều đáp án') && (
                <div style={{ width: '100%', padding: '20px', borderRadius: '5px', border: '1px solid #f0f0f0' }}>
                  <Row gutter={16} style={{ marginBottom: '10px' }}>
                    <Col span={18}>
                      <TextArea
                        placeholder="Tên câu hỏi"
                        value={questionTitle}
                        onChange={(e) => setQuestionTitle(e.target.value)}
                        autoSize={{ minRows: 2, maxRows: 4 }}
                        style={{ resize: 'none' }}
                      />
                    </Col>
                    <Col span={6}>
                      <label htmlFor="questionPoints" style={{ display: 'block' }}>Nhập điểm:</label>
                      <Input
                        id="questionPoints"
                        type="number"
                        min={1}
                        placeholder="Điểm"
                        value={questionPoints}
                        onChange={(e) => setQuestionPoints(Number(e.target.value))}
                        style={{ width: '100%' }}
                      />
                    </Col>
                  </Row>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    {questionType === 'Trắc nghiệm' ? (
                      <Radio.Group onChange={(e) => handleCorrectAnswerChange(e.target.value)} value={correctAnswerIndex}>
                        {answers.map((answer, index) => (
                          <Space key={index} direction="horizontal" style={{ width: '100%' }}>
                            <Input
                              placeholder={`Đáp án ${index + 1}`}
                              value={answer.text}
                              onChange={(e) => handleAnswerChange(index, e.target.value)}
                              style={{ flex: 1, marginTop: "3px" }}
                            />
                            <Radio value={index}>Đáp án đúng</Radio>
                            <Button type="link" danger onClick={() => handleRemoveAnswer(index)}>
                              Xóa
                            </Button>
                          </Space>
                        ))}
                      </Radio.Group>
                    ) : (
                      answers.map((answer, index) => (
                        <Space key={index} direction="horizontal" style={{ width: '100%' }}>
                          <Input
                            placeholder={`Đáp án ${index + 1}`}
                            value={answer.text}
                            onChange={(e) => handleAnswerChange(index, e.target.value)}
                            style={{ flex: 1 }}
                          />
                          <Checkbox
                            checked={answer.isCorrect}
                            onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                          >
                            Đáp án đúng
                          </Checkbox>
                          <Button type="link" danger onClick={() => handleRemoveAnswer(index)}>
                            Xóa
                          </Button>
                        </Space>
                      ))
                    )}
                  </Space>
                  <Button type="dashed" onClick={handleAddAnswer} style={{ marginTop: '10px' }}>
                    Thêm đáp án
                  </Button>
                </div>
              )}
              {questionType === 'Tự luận' && <p>Form tạo câu hỏi tự luận</p>}
              <Button type="default" onClick={() => setQuestionType(null)} style={{ marginTop: '10px' }}>
                Quay lại
              </Button>
              <Button type="primary" onClick={handleSaveQuestion} style={{ marginTop: '10px', marginLeft: '10px' }}>
                Lưu
              </Button>
            </div>
          ) : (
            <Button type="primary" onClick={showChildrenDrawer}>
              Tạo câu hỏi
            </Button>
          )}
          <Drawer
            title="Chọn loại câu hỏi"
            width={320}
            closable={false}
            onClose={onChildrenDrawerClose}
            visible={childrenDrawer}
          >
            <List
              dataSource={['Trắc nghiệm', 'Nhiều đáp án']}
              renderItem={(item) => (
                <List.Item>
                  <Button type="link" onClick={() => handleQuestionTypeSelect(item)}>
                    {item}
                  </Button>
                </List.Item>
              )}
            />
          </Drawer>
          <div style={{ marginTop: '20px' }}>
            <h3>Các câu hỏi đã tạo:</h3>
            <div>
              {questions.map((item, index) => (
                <Card
                  key={index}
                  title={
                    <div>
                      {`Câu hỏi ${index + 1}: ${item.title} `}
                      {renderQuestionTypeTag(item.type)}
                      {` - Điểm: ${item.points}`}
                    </div>
                  }
                  extra={
                    <Space>
                      <Button type="link" icon={<EditOutlined />} onClick={() => handleEditQuestion(index)} />
                      <Popconfirm
                        title="Bạn có chắc chắn muốn xóa câu hỏi này không?"
                        onConfirm={() => handleDeleteQuestion(index)}
                        okText="Có"
                        cancelText="Không"
                      >
                        <Button type="link" icon={<DeleteOutlined />} danger />
                      </Popconfirm>
                    </Space>
                  }
                  style={{ marginBottom: '20px' }}
                >
                  {item.type === 'Trắc nghiệm' || item.type === 'Nhiều đáp án' ? (
                    <List
                      dataSource={item.answers}
                      renderItem={(answer, idx) => (
                        <List.Item key={idx}>
                          {`Đáp án ${idx + 1}: ${answer.text} ${answer.isCorrect ? '(Đúng)' : ''}`}
                        </List.Item>
                      )}
                    />
                  ) : null}
                </Card>
              ))}
            </div>
          </div>
        </>
      )}
      <Modal
        title="Tóm tắt bộ đề"
        visible={isSummaryModalVisible}
        onOk={handleSummaryModalOk}
        onCancel={handleSummaryModalCancel}
        okText="Xác nhận"
        cancelText="Huỷ"
      >
        <p>Tên bộ đề: {setName}</p>
        <p>Số câu hỏi: {questions.length}</p>
        <p>Tổng điểm: {totalPoints}</p>
        <List
          dataSource={questions}
          renderItem={(item, index) => (
            <List.Item key={index}>
              <div>
                {`Câu hỏi ${index + 1}: ${item.title} `}
                {renderQuestionTypeTag(item.type)}
                {` - Điểm: ${item.points}`}
              </div>
            </List.Item>
          )}
        />
      </Modal>
    </Drawer>
  );
};

export default AddCourseModal;
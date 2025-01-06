import React, { useState, useEffect } from 'react';
import { Drawer, Button, Input, Space, Spin, Select } from 'antd';
import SimplifiedInterface from './SimplifiedInterface';
import FullInterface from './FullInterface';
import ManualInterface from './ManualInterface';

const { TextArea } = Input;
const { Option } = Select;

interface AddCourseModalProps {
  isVisible: boolean;
  onOk: (data: object) => void;
  onCancel: () => void;
}

const AddCourseModalToeic: React.FC<AddCourseModalProps> = ({ isVisible, onOk, onCancel }) => {
  const [courseName, setCourseName] = useState('');
  const [typeDrawerVisible, setTypeDrawerVisible] = useState(false);
  const [courseType, setCourseType] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<{ id: number, tenCauHoi: string }[]>([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [courseDataFetch, setCourseDataFetch] = useState<Array<{
    idKhoaHoc: number;
    tenKhoaHoc: string;
    mota: string;
    soLuongLop: string;
    hocPhi: number;
  }> | null>(null);

  const handleTypeSelect = (type: string) => {
    setCourseType(type);
    setTypeDrawerVisible(false);
  };

  const handleCourseSelect = (value: string) => {
    setSelectedCourse(value);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const data = {
        tenBoDe: courseName,
        numberClass: selectedQuestions.length,
        date: new Date().toLocaleDateString(),
        loai: courseType,
        cacCauHoi: selectedQuestions.map((q) => {
          return { idCauHoi: q.id, tenCauHoi: q.tenCauHoi };
        }),
        khoaHoc: selectedCourse,
      };
      console.log("Dữ liệu tạo bộ đề:", data);
      try {
        const result = fetch('http://localhost:5000/api/addBodeThuCong', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (!result) {
          throw new Error('Failed to fetch data');
        }
        console.log('Data sent successfully:', result);
      } catch (error) {
        console.log('Error:', error);
      }
      onOk(data);
    }, 2000); // Simulating a network request delay
  };

  const fetchCourse = async () => {
    // Fetch course data from API or database
    try {
      const response = await fetch('http://localhost:5000/api/getAllCourse');
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      } else {
        const data = await response.json();
        console.log('Fetch data successfully', data.data.data);
        setCourseDataFetch(data.data.data);
      }
    } catch (error) {
      alert(error);
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    // fetch data course
    fetchCourse();
  }, []);

  const renderCourseTypeContent = () => {
    switch (courseType) {
      case 'Tinh giản':
        return <SimplifiedInterface />;
      case 'Đầy đủ':
        return <FullInterface />;
      case 'Thủ công':
        return (
          <ManualInterface
            setSelectedQuestions={setSelectedQuestions}
            selectedQuestions={selectedQuestions}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Drawer
        title="Tạo bộ đề mới"
        width={1020}
        visible={isVisible}
        onClose={onCancel}
        extra={
          <Space>
            <Button onClick={onCancel}>Huỷ</Button>
            <Button type="primary" onClick={handleOk} loading={loading}>
              {loading ? <Spin /> : 'Tạo bộ đề'}
            </Button>
          </Space>
        }
      >
        <Input
          placeholder="Nhập tên bộ đề"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
        <Select
          placeholder="Chọn khóa học"
          style={{ width: '100%', marginBottom: '10px', marginTop: "10px" }}
          onChange={handleCourseSelect}
        >
          <Option value="">Không chọn</Option>
          {courseDataFetch?.map((course) => (
            <Option key={course.idKhoaHoc} value={course.idKhoaHoc.toString()}>
              {course.tenKhoaHoc}
            </Option>
          ))}
        </Select>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginBottom: '10px' }}>
          <Button type="dashed" onClick={() => setTypeDrawerVisible(true)}>
            Chọn loại đề
          </Button>
          <span style={{ marginLeft: '10px', color: 'rgba(255, 8, 8)' }}>
            {courseType ? ` - Loại đề: ${courseType}` : ' - Chưa chọn loại đề'}
          </span>
        </div>
        {renderCourseTypeContent()}
      </Drawer>

      <Drawer
        title="Chọn loại đề"
        width={360}
        visible={typeDrawerVisible}
        onClose={() => setTypeDrawerVisible(false)}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button type="dashed" block onClick={() => handleTypeSelect('Tinh giản')}>
            Tinh giản
          </Button>
          <Button type="dashed" block onClick={() => handleTypeSelect('Đầy đủ')}>
            Đầy đủ
          </Button>
          <Button type="dashed" block onClick={() => handleTypeSelect('Thủ công')}>
            Thủ công
          </Button>
        </Space>
      </Drawer>
    </>
  );
};

export default AddCourseModalToeic;
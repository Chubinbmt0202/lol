import { Row, Col, Tabs } from 'antd';

import { useState, useEffect } from 'react';
import Card from '../profileClass/Unit/Card';
import AddProgramDrawer from '../profileClass/Unit/AddProgramDrawer';
import EditProgramDrawer from '../profileClass/Unit/EditProgramDrawer';
import DetailProgramDrawer from '../profileClass/Unit/DetailProgramDrawer';
import useCourseData from '../../../../../api/utils/useCourseData';

const { TabPane } = Tabs;

interface TeamsTabProps {
  idCourse: string;
  idLop: string;
}

const TeamsTab = ({ idCourse, idLop }: TeamsTabProps) => {
  const { program, fetchCourse } = useCourseData(idCourse, idLop); // Giả sử useCourseData trả về hàm fetchPrograms để lấy lại dữ liệu
  console.log('Dữ liệu khóa học ở teamYab:', program);
  console.log('ID Course:', idCourse);
  console.log('ID Lop:', idLop);

  const [addDrawerVisible, setAddDrawerVisible] = useState(false);
  const [editDrawerVisible, setEditDrawerVisible] = useState(false);
  const [detailDrawerVisible, setDetailDrawerVisible] = useState(false);

  const [newProgram, setNewProgram] = useState({ name: '', desc: '', icon: '' });
  const [editProgram, setEditProgram] = useState(null);

  const [materials, setMaterials] = useState([]);
  const [previewFile, setPreviewFile] = useState(null);

  // Hàm xử lý khi thêm chương
  const handleAddProgram = async () => {
    try {
      // Call the API to fetch all chapters
      const response = await fetch(`http://localhost:5000/api/unit/${idCourse}/${idLop}`, {
        method: 'GET', // Use GET method to fetch data
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // If the fetch is successful, reload the program data
        const data = await response.json(); // Assuming the server returns a JSON array of chapters
        console.log('Fetched chapters:', data);
        await fetchCourse(); // This should reload the course data
        setAddDrawerVisible(false); // Close the drawer (if relevant)
      } else {
        alert('Lỗi khi lấy dữ liệu chương!');
        console.error('Lỗi khi lấy dữ liệu chương:', response);
      }
    } catch (error) {
      console.error('Lỗi khi lấy chương:', error);
      alert('Có lỗi xảy ra khi lấy dữ liệu chương!');
    }
  };
  

  return (
    <div>
      <Row gutter={[16, 16]}>
        {/* Default Card for Adding a New Program */}
        <Col span={24} md={12}>
          <Card
            title="Thêm bài học"
            description="Click để thêm một bài học mới"
            icon={null}
            onClick={() => setAddDrawerVisible(true)}
            onEdit={() => setEditDrawerVisible(true)}
          />
        </Col>

        {program.map((item, index) => (
          <Col span={24} md={12} key={index}>
            <Card
              title={item.tenChuong}
              description={item.moTa}
              icon={item.icon}
              onClick={() => setDetailDrawerVisible(true)}
              onEdit={() => {
                setEditDrawerVisible(true);
                setEditProgram(item);
              }}
            />
          </Col>
        ))}
      </Row>

      <AddProgramDrawer
        visible={addDrawerVisible}
        onClose={() => setAddDrawerVisible(false)}
        onAdd={handleAddProgram} // Truyền callback vào prop onAdd
        newProgram={newProgram}
        setNewProgram={setNewProgram}
      />
      <EditProgramDrawer
        visible={editDrawerVisible}
        onClose={() => setEditDrawerVisible(false)}
        onUpdate={() => {}}
        editProgram={editProgram}
        setEditProgram={setEditProgram}
      />
      <DetailProgramDrawer
        visible={detailDrawerVisible}
        onClose={() => setDetailDrawerVisible(false)}
        program={editProgram}
        previewFile={previewFile}
        materials={materials}
        setMaterials={setMaterials}
        handleUpload={() => {}}
        exercises={[]}
        setPreviewFile={setPreviewFile}
        handleViewDetails={() => {}}
      />
    </div>
  );
};

export default TeamsTab;

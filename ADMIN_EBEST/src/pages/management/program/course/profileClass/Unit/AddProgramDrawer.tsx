import { Drawer, Input, Button, Space } from 'antd';
import { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface AddProgramDrawerProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (newChapter: { courseId: string; classId: string; tenChuong: string; moTa: string }) => void;
}

const AddProgramDrawer: FC<AddProgramDrawerProps> = ({ visible, onClose, onAdd }) => {
  const location = useLocation();
  const [tenChuong, setTenChuong] = useState('');
  const [mota, setMota] = useState('');

  // Tách URL thành từng phần
  const pathParts = location.pathname.split('/');
  const courseId = pathParts[4]; // '1'
  const classId = pathParts[5];  // '2'

  // Hàm xử lý khi thêm chương
  const handleAdd = async () => {
    const newChapter = {
      idLop: classId,
      tenChuong,
      moTa: mota,
      idKhoaHoc: courseId
    };

    // Gọi API để thêm chương mới
    try {
      const response = await fetch('http://localhost:5000/api/addUnit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newChapter),
      });

      if (response.ok) {
        // Xử lý thành công
        const data = await response.json();
        console.log('Thêm chương thành công:', data);
        alert('Thêm chương thành công');
        onAdd(newChapter); // Gọi hàm onAdd để thông báo cho component cha
        onClose(); // Đóng Drawer sau khi thêm
      } else {
        console.error('Lỗi khi thêm chương:', response);
        alert('Lỗi khi thêm chương');
      }
    } catch (error) {
      console.error('Lỗi kết nối API:', error);
      alert('Có lỗi xảy ra khi thêm chương');
    }
  };

  return (
    <Drawer
      title="Thêm chương mới"
      visible={visible}
      onClose={onClose}
      width={500}
      extra={
        <Space>
          <Button onClick={onClose}>Hủy</Button>
          <Button type="primary" onClick={handleAdd}>
            Thêm chương
          </Button>
        </Space>
      }
    >
      <div className="mb-4">
        <Input
          value={tenChuong}
          onChange={(e) => setTenChuong(e.target.value)}
          placeholder="Nhập tên chương"
        />
      </div>
      <div className="mb-4">
        <Input.TextArea
          value={mota}
          onChange={(e) => setMota(e.target.value)}
          placeholder="Nhập mô tả"
          rows={4}
        />
      </div>
    </Drawer>
  );
};

export default AddProgramDrawer;

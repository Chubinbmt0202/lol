import { Drawer, Input, Button, Space } from 'antd';

interface EditProgramDrawerProps {
  visible: boolean;
  onClose: () => void;
  onUpdate: () => void;
  editProgram: { name: string; desc: string } | null;
  setEditProgram: React.Dispatch<React.SetStateAction<{ name: string; desc: string } | null>>;
}

const EditProgramDrawer: React.FC<EditProgramDrawerProps> = ({ visible, onClose, onUpdate, editProgram, setEditProgram }) => {
  return (
    <Drawer
      title="Chỉnh sửa bài học"
      visible={visible}
      onClose={onClose}
      width={500}
      extra={
        <Space>
          <Button onClick={onClose}>Hủy</Button>
          <Button type="primary" onClick={onUpdate}>
            Cập nhật
          </Button>
        </Space>
      }
    >
      <div className="mb-4">
        <Input
          value={editProgram?.name || ''}
          onChange={(e) =>
            setEditProgram((prev) => (prev ? { ...prev, name: e.target.value } : null))
          }
          placeholder="Nhập tên bài học"
        />
      </div>
      <div className="mb-4">
        <Input.TextArea
          value={editProgram?.desc || ''}
          onChange={(e) =>
            setEditProgram((prev) => (prev ? { ...prev, desc: e.target.value } : null))
          }
          placeholder="Nhập mô tả"
          rows={4}
        />
      </div>
    </Drawer>
  );
};

export default EditProgramDrawer;

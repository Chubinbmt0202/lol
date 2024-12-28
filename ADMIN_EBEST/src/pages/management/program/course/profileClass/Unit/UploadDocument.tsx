import { UploadOutlined } from '@ant-design/icons';
import { Upload, Button, message, List } from 'antd';

interface UploadDocumentProps {
  materials: { name: string; url: string }[];
  setMaterials: React.Dispatch<React.SetStateAction<{ name: string; url: string }[]>>;
}

const UploadDocument: React.FC<UploadDocumentProps> = ({ materials, setMaterials }) => {
  const handleUpload = async (file: any) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'question');
    formData.append('cloud_name', 'dx3snw69p');

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/dx3snw69p/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      const newMaterial = {
        name: file.name,
        url: data.secure_url,
      };
      setMaterials((prev) => [...prev, newMaterial]);
      message.success('Tải tài liệu thành công!');
    } catch (error) {
      message.error('Tải tài liệu thất bại!');
    }
  };

  return (
    <div>
      <Upload
        beforeUpload={(file) => {
          handleUpload(file);
          return false; // Ngăn Ant Design tự upload file
        }}
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />}>Tải tài liệu lên</Button>
      </Upload>
      <List
        dataSource={materials}
        renderItem={(item) => <List.Item>{item.name}</List.Item>}
      />
    </div>
  );
};

export default UploadDocument;

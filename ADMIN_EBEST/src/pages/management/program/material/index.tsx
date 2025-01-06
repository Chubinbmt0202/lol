import { Card, List, Typography, Button, Modal, Form, Input, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Text } = Typography;
const { Option } = Select;

interface Document {
  name: string;
  uploadDate: string;
  uploader: string;
  file?: File;
}

interface Course {
  id: string;
  name: string;
  documents: Document[];
}

const initialCourses: Course[] = [
  {
    id: '1',
    name: 'Course 1',
    documents: [
      { name: 'Document 1', uploadDate: '2025-01-01', uploader: 'User A' },
      { name: 'Document 2', uploadDate: '2025-01-02', uploader: 'User B' },
      { name: 'Document 3', uploadDate: '2025-01-03', uploader: 'User C' },
      { name: 'Document 4', uploadDate: '2025-01-04', uploader: 'User D' },
    ],
  },
  {
    id: '2',
    name: 'Course 2',
    documents: [
      { name: 'Document 5', uploadDate: '2025-01-05', uploader: 'User E' },
      { name: 'Document 6', uploadDate: '2025-01-06', uploader: 'User F' },
    ],
  },
];

const handleViewDetails = (document: Document) => {
  // Handle viewing document details here
  console.log('Viewing details for document:', document);
};

const handleDelete = (courseId: string, document: Document, setCourses: any, courses: Course[]) => {
  // Handle deleting document here
  console.log('Deleting document:', document);
  const updatedCourses = courses.map(course => {
    if (course.id === courseId) {
      return {
        ...course,
        documents: course.documents.filter(doc => doc.name !== document.name)
      };
    }
    return course;
  });
  setCourses(updatedCourses);
};

export default function DocumentDisplay() {
  const [courses, setCourses] = useState(initialCourses);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | undefined>(undefined);
  const [documentName, setDocumentName] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (selectedCourse && documentName && file) {
      // Add the new document to the selected course
      const newDocument: Document = {
        name: documentName,
        uploadDate: new Date().toISOString().split('T')[0],
        uploader: 'New User',
        file: file,
      };

      const updatedCourses = courses.map(course => {
        if (course.id === selectedCourse) {
          return {
            ...course,
            documents: [...course.documents, newDocument],
          };
        }
        return course;
      });

      setCourses(updatedCourses);
      setIsModalVisible(false);
      setSelectedCourse(undefined);
      setDocumentName('');
      setFile(null);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFileChange = (info: any) => {
    if (info.file.status === 'removed') {
      setFile(null);
    } else {
      setFile(info.file.originFileObj);
    }
  };

  return (
    <div>
      <Button onClick={showModal} style={{ marginBottom: 16 }}>
        Add Document
      </Button>
      <Modal
        title="Add Document"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Select Course">
            <Select
              value={selectedCourse}
              onChange={value => setSelectedCourse(value)}
            >
              {courses.map(course => (
                <Option key={course.id} value={course.id}>
                  {course.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Document Name">
            <Input
              value={documentName}
              onChange={e => setDocumentName(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Upload File">
            <Upload
              beforeUpload={() => false} // Prevent automatic upload
              onChange={handleFileChange}
              fileList={file ? [file] : []}
            >
              <Button type="primary" icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
      {courses.map(course => (
        <Card
          title={course.name}
          key={course.id}
          style={{ marginBottom: 16 }}
        >
          <List
            size="small"
            dataSource={course.documents}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button onClick={() => handleViewDetails(item)} type="link">View Details</Button>,
                  <Button onClick={() => handleDelete(course.id, item, setCourses, courses)} type="link" danger>Delete</Button>,
                ]}
              >
                <div>
                  <Text strong>{item.name}</Text>
                  <br />
                  <Text type="secondary">Uploaded on: {item.uploadDate}</Text>
                  <br />
                  <Text type="secondary">Uploader: {item.uploader}</Text>
                </div>
              </List.Item>
            )}
          />
        </Card>
      ))}
    </div>
  );
}
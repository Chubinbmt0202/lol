import React from 'react';
import { Modal } from 'antd';

interface DocumentPreviewModalProps {
  previewFile: string | null;
  setPreviewFile: React.Dispatch<React.SetStateAction<string | null>>;
}

const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({ previewFile, setPreviewFile }) => (
  <Modal visible={!!previewFile} title="Xem trước tài liệu" footer={null} onCancel={() => setPreviewFile(null)} width={800}>
    <iframe src={previewFile || ''} title="Document Preview" style={{ width: '100%', height: '500px', border: 'none' }} />
  </Modal>
);

export default DocumentPreviewModal;

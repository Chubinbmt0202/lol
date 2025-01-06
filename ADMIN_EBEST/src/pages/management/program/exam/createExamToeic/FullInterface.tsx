import React from 'react';
import { Table, Tag } from 'antd';

const FullInterface: React.FC = () => {
  // Data for the table
  const dataSource = [
    {
      key: '1',
      part: 'Part 1: Photographs',
      questions: 6,
      tags: ['Tranh tả người', 'Tranh tả cả người và vật'],
    },
    {
      key: '2',
      part: 'Part 2: Question-Response',
      questions: 25,
      tags: ['Câu hỏi WHAT', 'Câu hỏi WHO', 'Câu hỏi WHERE', 'Câu hỏi WHEN', 'Câu hỏi HOW', 'Câu hỏi WHY', 'Câu hỏi YES/NO', 'Câu hỏi đuôi', 'Câu hỏi lựa chọn', 'Câu yêu cầu, đề nghị', 'Câu trần thuật'],
    },
    {
      key: '3',
      part: 'Part 3: Conversations',
      questions: 39,
      tags: ['Câu hỏi về chủ đề, mục đích', 'Câu hỏi về danh tính người nói', 'Câu hỏi về chi tiết cuộc hội thoại', 'Câu hỏi về hành động tương lai', 'Câu hỏi kết hợp bảng biểu', 'Câu hỏi về hàm ý câu nói', 'Chủ đề: Company - General Office Work', 'Chủ đề: Company - Business, Marketing', 'Chủ đề: Company - Event, Project', 'Chủ đề: Company - Facility', 'Chủ đề: Shopping, Service', 'Chủ đề: Order, delivery', 'Chủ đề: Housing', 'Câu hỏi về địa điểm hội thoại', 'Câu hỏi về yêu cầu, gợi ý'],
    },
    {
      key: '4',
      part: 'Part 4: Talks',
      questions: 30,
      tags: ['Câu hỏi về chủ đề, mục đích', 'Câu hỏi về danh tính, địa điểm', 'Câu hỏi về chi tiết', 'Câu hỏi về hành động tương lai', 'Câu hỏi kết hợp bảng biểu', 'Câu hỏi về hàm ý câu nói', 'Dạng bài: Telephone message - Tin nhắn thoại', 'Dạng bài: Advertisement - Quảng cáo', 'Dạng bài: Announcement - Thông báo', 'Dạng bài: Talk - Bài phát biểu, diễn văn', 'Dạng bài: Excerpt from a meeting - Trích dẫn từ buổi họp', 'Câu hỏi yêu cầu, gợi ý'],
    },
    {
      key: '5',
      part: 'Part 5: Incomplete Sentences',
      questions: 30,
      tags: ['Câu hỏi từ loại', 'Câu hỏi ngữ pháp', 'Câu hỏi từ vựng', 'Grammar: Danh từ', 'Grammar: Đại từ', 'Grammar: Tính từ', 'Grammar: Thì', 'Grammar: Trạng từ', 'Grammar: Động từ nguyên mẫu có to', 'Grammar: Động từ nguyên mẫu', 'Grammar: Phân từ và Cấu trúc phân từ', 'Grammar: Giới từ', 'Grammar: Liên từ', 'Grammar: Mệnh đề quan hệ'],
    },
    {
      key: '6',
      part: 'Part 6: Text Completion',
      questions: 16,
      tags: ['Câu hỏi từ loại', 'Câu hỏi ngữ pháp', 'Câu hỏi từ vựng', 'Câu hỏi điền câu vào đoạn văn', 'Hình thức: Thư điện tử/ thư tay (Email/ Letter)', 'Hình thức: Quảng cáo (Advertisement)', 'Hình thức: Thông báo/ văn bản hướng dẫn (Notice/ Announcement Information)', 'Hình thức: Thông báo nội bộ (Memo)', 'Grammar: Danh từ', 'Grammar: Tính từ', 'Grammar: Thì', 'Grammar: Thể', 'Grammar: Trạng từ', 'Grammar: Danh động từ', 'Grammar: Động từ nguyên mẫu', 'Grammar: Giới từ', 'Grammar: Liên từ'],
    },
    {
      key: '7',
      part: 'Part 7: Reading Comprehension',
      questions: 54,
      tags: ['Câu hỏi tìm thông tin', 'Câu hỏi tìm chi tiết sai', 'Câu hỏi về chủ đề, mục đích', 'Câu hỏi suy luận', 'Câu hỏi điền câu', 'Cấu trúc: một đoạn', 'Cấu trúc: nhiều đoạn', 'Dạng bài: Email/ Letter: Thư điện tử/ Thư tay', 'Dạng bài: Form - Đơn từ, biểu mẫu', 'Dạng bài: Article/ Review: Bài báo/ Bài đánh giá', 'Dạng bài: Advertisement - Quảng cáo', 'Dạng bài: Announcement/ Notice: Thông báo', 'Dạng bài: Text message chain - Chuỗi tin nhắn', 'Câu hỏi tìm từ đồng nghĩa', 'Câu hỏi về hàm ý câu nói', 'Dạng bài: List/ Menu: Danh sách/ Thực đơn'],
    },
  ];

  // Columns for the table
  const columns = [
    {
      title: 'Part',
      dataIndex: 'part',
      key: 'part',
    },
    {
      title: 'Số lượng câu hỏi đầy đủ',
      dataIndex: 'questions',
      key: 'questions',
    },
    {
      title: 'Số lượng câu hỏi trong kho',
      dataIndex: 'questions',
      key: 'questions',
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: string[]) => (
        <>
          {tags.map(tag => (
            <Tag color="blue" key={tag} style={{ marginBottom: '5px' }}>
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>Giao diện Đầy đủ</h2>
      <p>
        Dạng đề TOEIC đầy đủ là dạng đề với số lượng câu hỏi đầy đủ như đề gốc. Điều này giúp thí sinh có một cái nhìn toàn diện về khả năng của mình.
      </p>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </div>
  );
};

export default FullInterface;
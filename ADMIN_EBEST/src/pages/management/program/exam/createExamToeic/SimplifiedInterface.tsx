import React from 'react';
import { Table, Tag } from 'antd';

const SimplifiedInterface: React.FC = () => {
  // Data for the table
  const dataSource = [
    {
      key: '1',
      part: 'Part 1: Photographs',
      originalQuestions: 6,
      simplifiedQuestions: 3,
      tags: ['Tranh tả người', 'Tranh tả cả người và vật'],
    },
    {
      key: '2',
      part: 'Part 2: Question-Response',
      originalQuestions: 25,
      simplifiedQuestions: 12,
      tags: ['Câu hỏi WHAT', 'Câu hỏi WHO', 'Câu hỏi WHERE', 'Câu hỏi WHEN', 'Câu hỏi HOW', 'Câu hỏi WHY', 'Câu hỏi YES/NO', 'Câu hỏi đuôi', 'Câu hỏi lựa chọn', 'Câu yêu cầu, đề nghị', 'Câu trần thuật'],
    },
    {
      key: '3',
      part: 'Part 3: Conversations',
      originalQuestions: 39,
      simplifiedQuestions: 20,
      tags: ['Câu hỏi về chủ đề, mục đích', 'Câu hỏi về danh tính người nói', 'Câu hỏi về chi tiết cuộc hội thoại', 'Câu hỏi về hành động tương lai', 'Câu hỏi kết hợp bảng biểu', 'Câu hỏi về hàm ý câu nói', 'Chủ đề: Company - General Office Work', 'Chủ đề: Company - Business, Marketing', 'Chủ đề: Company - Event, Project', 'Chủ đề: Company - Facility', 'Chủ đề: Shopping, Service', 'Chủ đề: Order, delivery', 'Chủ đề: Housing', 'Câu hỏi về địa điểm hội thoại', 'Câu hỏi về yêu cầu, gợi ý'],
    },
    {
      key: '4',
      part: 'Part 4: Talks',
      originalQuestions: 30,
      simplifiedQuestions: 15,
      tags: ['Câu hỏi về chủ đề, mục đích', 'Câu hỏi về danh tính, địa điểm', 'Câu hỏi về chi tiết', 'Câu hỏi về hành động tương lai', 'Câu hỏi kết hợp bảng biểu', 'Câu hỏi về hàm ý câu nói', 'Dạng bài: Telephone message - Tin nhắn thoại', 'Dạng bài: Advertisement - Quảng cáo', 'Dạng bài: Announcement - Thông báo', 'Dạng bài: Talk - Bài phát biểu, diễn văn', 'Dạng bài: Excerpt from a meeting - Trích dẫn từ buổi họp', 'Câu hỏi yêu cầu, gợi ý'],
    },
    {
      key: '5',
      part: 'Part 5: Incomplete Sentences',
      originalQuestions: 30,
      simplifiedQuestions: 15,
      tags: ['Câu hỏi từ loại', 'Câu hỏi ngữ pháp', 'Câu hỏi từ vựng', 'Grammar: Danh từ', 'Grammar: Đại từ', 'Grammar: Tính từ', 'Grammar: Thì', 'Grammar: Trạng từ', 'Grammar: Động từ nguyên mẫu có to', 'Grammar: Động từ nguyên mẫu', 'Grammar: Phân từ và Cấu trúc phân từ', 'Grammar: Giới từ', 'Grammar: Liên từ', 'Grammar: Mệnh đề quan hệ'],
    },
    {
      key: '6',
      part: 'Part 6: Text Completion',
      originalQuestions: 16,
      simplifiedQuestions: 8,
      tags: ['Câu hỏi từ loại', 'Câu hỏi ngữ pháp', 'Câu hỏi từ vựng', 'Câu hỏi điền câu vào đoạn văn', 'Hình thức: Thư điện tử/ thư tay (Email/ Letter)', 'Hình thức: Quảng cáo (Advertisement)', 'Hình thức: Thông báo/ văn bản hướng dẫn (Notice/ Announcement Information)', 'Hình thức: Thông báo nội bộ (Memo)', 'Grammar: Danh từ', 'Grammar: Tính từ', 'Grammar: Thì', 'Grammar: Thể', 'Grammar: Trạng từ', 'Grammar: Danh động từ', 'Grammar: Động từ nguyên mẫu', 'Grammar: Giới từ', 'Grammar: Liên từ'],
    },
    {
      key: '7',
      part: 'Part 7: Reading Comprehension',
      originalQuestions: 54,
      simplifiedQuestions: 27,
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
      title: 'Số câu hỏi gốc',
      dataIndex: 'originalQuestions',
      key: 'originalQuestions',
    },
    {
      title: 'Số câu hỏi tinh giản',
      dataIndex: 'simplifiedQuestions',
      key: 'simplifiedQuestions',
    },
    {
      title: 'Số câu hỏi trong kho',
      dataIndex: 'simplifiedQuestions',
      key: 'simplifiedQuestions',
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      width: 200,
      render: (tags: string[]) => (
        <>
          {tags.map(tag => (
            <Tag color="blue" key={tag} style={{ marginBottom: '5px', fontSize: '12px' }}>
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
  ];

  return (
    <div>
      <p>
        Dạng đề TOEIC tinh giản là dạng đề với số lượng câu hỏi giảm đi một nửa so với đề gốc. Điều này giúp thí sinh tiết kiệm thời gian và tập trung vào những câu hỏi chính yếu.
      </p>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </div>
  );
};

export default SimplifiedInterface;
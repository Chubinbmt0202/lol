import { Card, Col, Row, Progress, Statistic, Table, Typography } from 'antd';
import { Line } from "react-chartjs-2";
import { faker } from '@faker-js/faker';

export default function StudentStatistics() {
  const data = [
    { title: 'Bài học đã hoàn thành', value: 12 },
    { title: 'Câu hỏi đã trả lời', value: 220 },
    { title: 'Điểm trung bình', value: '85/100' },
    { title: 'Bài tập đã nộp', value: 10 },
  ];

  const recentActivities = [
    { key: '1', lesson: 'Bài học 1', score: 90, completed: '01/12/2024' },
    { key: '2', lesson: 'Bài học 2', score: 85, completed: '03/12/2024' },
    { key: '3', lesson: 'Bài học 3', score: 70, completed: '07/12/2024' },
  ];

  const progressData = Array.from({ length: 10 }, (_, i) => ({
    date: `2024-12-${10 - i}`,
    progress: faker.number.int({ min: 60, max: 100 }),
  }));

  const progressConfig = {
    data: {
      labels: progressData.map(item => item.date),
      datasets: [
        {
          label: 'Progress',
          data: progressData.map(item => item.progress),
          borderColor: '#1677ff',
          fill: false,
          tension: 0.4,
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: 'timeseries',
          time: {
            unit: 'day',
          },
        },
        y: {
          beginAtZero: true,
        },
      },
    },
    height: 200,
  };

  return (
    <Row gutter={[16, 16]}>
      {/* Tổng quan */}
      {data.map((item) => (
        <Col span={12} md={6} key={item.title}>
          <Card bordered={false}>
            <Statistic title={item.title} value={item.value} />
          </Card>
        </Col>
      ))}

      {/* Hoạt động gần đây */}
      <Col span={24}>
        <Card title="Hoạt động gần đây" bordered={false}>
          <Table
            dataSource={recentActivities}
            columns={[
              { title: 'Bài học', dataIndex: 'lesson', key: 'lesson' },
              { title: 'Điểm số', dataIndex: 'score', key: 'score' },
              { title: 'Ngày hoàn thành', dataIndex: 'completed', key: 'completed' },
            ]}
            pagination={false}
          />
        </Card>
      </Col>

      {/* Tỷ lệ hoàn thành */}
      <Col span={24}>
        <Card title="Tỷ lệ hoàn thành" bordered={false}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Progress type="circle" percent={80} format={() => '80% Đúng'} />
            </Col>
            <Col span={12}>
              <Progress type="circle" percent={90} format={() => '90% Hoàn thành'} />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}

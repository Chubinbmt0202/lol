import { faker } from '@faker-js/faker';
import { Row, Col, Divider, Drawer, Button, List, Space, Typography } from 'antd';
import dayjs from 'dayjs';

import Card from '@/components/card';
import { IconButton, Iconify } from '@/components/icon';
import ProTag from '@/theme/antd/components/tag';
import { useState } from 'react';

export default function ProjectsTab() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const items = [
    {
      icon: <Iconify icon="logos:react" size={40} />,
      name: 'Bài tập 1',
      client: faker.person.fullName(),
      desc: 'Time is our most valuable asset, that is why we want to help you save it by creating…',
      startDate: dayjs(faker.date.past({ years: 1 })),
      deadline: dayjs(faker.date.future({ years: 1 })),
      allHours: '98/135',
      lesson: 'React Lesson',
      questions: [
        {
          title: 'What is JSX?',
          answers: ['JavaScript XML', 'JavaScript Extra', 'JSON XML', 'Java Simple XML'],
          correctAnswer: 'JavaScript XML',
          studentAnswer: 'JSON XML',
        },
        {
          title: 'What are React Hooks?',
          answers: ['Functions', 'Classes', 'Variables', 'Methods'],
          correctAnswer: 'Functions',
          studentAnswer: 'Functions',
        },
      ],
    },
    {
      icon: <Iconify icon="logos:vue" size={40} />,
      name: 'Bài tập 2',
      desc: 'App design combines the user interface (UI) and user experience (UX).',
      client: faker.person.fullName(),
      startDate: dayjs(faker.date.past({ years: 1 })),
      deadline: dayjs(faker.date.future({ years: 1 })),
      allHours: '880/421',
      lesson: 'Vue Lesson',
      questions: [
        {
          title: 'What is Vue.js?',
          answers: ['JavaScript Framework', 'Library', 'Programming Language', 'API'],
          correctAnswer: 'JavaScript Framework',
          studentAnswer: 'Library',
        },
      ],
    },
  ];

  const showDrawer = (item) => {
    setSelectedItem(item);
    setOpenDrawer(true);
  };

  const closeDrawer = () => {
    setOpenDrawer(false);
    setSelectedItem(null);
  };

  const getAnswerColor = (answer, correctAnswer, studentAnswer) => {
    if (answer === correctAnswer) return 'green'; // Đáp án đúng
    if (answer === studentAnswer && answer !== correctAnswer) return 'red'; // Đáp án sai của học viên
    return 'black'; // Các đáp án khác
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        {items.map((item) => (
          <Col span={24} md={12} key={item.name}>
            <Card className="w-full flex-col">
              <header className="flex w-full items-center">
                {item.icon}

                <div className="flex flex-col">
                  <span className="ml-4 text-xl opacity-70">{item.name}</span>
                  <span className="text-md ml-4 opacity-50">Giáo viên giao bài: {item.client}</span>
                </div>

                <div className="ml-auto flex opacity-70">
                  <IconButton onClick={() => showDrawer(item)}>
                    <Iconify icon="fontisto:more-v-a" size={18} />
                  </IconButton>
                </div>
              </header>

              <main className="mt-4 w-full">
                <div className="my-2 flex justify-between">
                  <span>
                    Ngày giao bài:
                    <span className="ml-2 opacity-50">{item.startDate.format('DD/MM/YYYY')}</span>
                  </span>

                  <span>
                    Ngày hết hạn:
                    <span className="ml-2 opacity-50">{item.deadline.format('DD/MM/YYYY')}</span>
                  </span>
                </div>
                <span className="opacity-70">{item.desc}</span>
              </main>

              <Divider />

              <footer className="flex w-full flex-col items-center">
                <div className="mb-4 flex w-full justify-between">
                  <span>
                    Điểm số:
                    <span className="ml-2 opacity-50">{item.allHours}</span>
                  </span>

                  <ProTag color="warning"> Đã nộp</ProTag>
                </div>
              </footer>
            </Card>
          </Col>
        ))}
      </Row>

      <Drawer
        title={selectedItem?.name}
        placement="right"
        width={700}
        onClose={closeDrawer}
        open={openDrawer}
      >
        {selectedItem && (
          <>
            <p>
              <strong>Bài học:</strong> {selectedItem.lesson}
            </p>
            <p>
              <strong>Giáo viên:</strong> {selectedItem.client}
            </p>
            <p>
              <strong>Mô tả:</strong> {selectedItem.desc}
            </p>
            <Divider />

            {/* Thông tin điểm số */}
            <div style={{ marginBottom: '16px' }}>
              <p>
                <strong>Điểm số:</strong> {selectedItem.score}/{selectedItem.totalScore}
              </p>
              <p>
                <strong>Số câu đúng:</strong> {selectedItem.correctCount}
              </p>
              <p>
                <strong>Số câu sai:</strong> {selectedItem.incorrectCount}
              </p>
            </div>
            <Divider />

            {/* Danh sách câu hỏi */}
            <List
              header={<strong>Danh sách câu hỏi</strong>}
              dataSource={selectedItem.questions}
              renderItem={(question, index) => (
                <List.Item>
                  <Card style={{ width: '100%' }} bodyStyle={{ padding: '16px' }}>
                    <Space direction="vertical" style={{ width: '100%' }}>
                      {/* Tiêu đề câu hỏi */}
                      <Typography.Title level={5}>
                        Câu hỏi {index + 1}: {question.title}
                      </Typography.Title>

                      {/* Danh sách đáp án */}
                      {question.answers.map((answer, answerIndex) => (
                        <Typography.Text
                          key={answerIndex}
                          style={{
                            display: 'block',
                            color: getAnswerColor(answer, question.correctAnswer, question.studentAnswer),
                            marginLeft: '16px',
                          }}
                        >
                          {String.fromCharCode(65 + answerIndex)}. {answer}
                        </Typography.Text>
                      ))}
                    </Space>
                  </Card>
                </List.Item>
              )}
            />
          </>
        )}
      </Drawer>

    </>
  );
}

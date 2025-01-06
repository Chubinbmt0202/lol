import { Row, Col, Tabs } from 'antd';
import { useState, useEffect } from 'react';

import Card from '@/components/card';

import Conversation from './questionListening/conversation/conversation';
import Picture from './questionListening/pictureQuestion/picture';
import Story from './questionListening/story/story';
import Talk from './questionListening/talkQuestion/talk';

type TabPosition = 'left' | 'right' | 'top' | 'bottom';

const tabs = [
  {
    key: '1',
    title: 'Mô tả tranh',
    content: <Picture />,
  },
  {
    key: '2',
    title: 'Hỏi đáp',
    content: <Talk />,
  },  
  {
    key: '3',
    title: 'Hội thoại ngắn',
    content: <Conversation />,
  },
  {
    key: '4',
    title: 'Chuyện ngắn',
    content: <Story />,
  },
];

export default function TabListening() {
  const [tabPosition, setTabPosition] = useState<TabPosition>('left');


  // const fetchDataQuestion = async () => {
  //   try {
  //     const res = await fetch('http://localhost:5000/api/getAllQuestion');
  //     if (!res.ok) throw new Error('Error fetching data');
  //     const data = await res.json();
  //     console.log("Dữ liệu toàn bộ câu hỏi", data.data);
  
  //     localStorage.setItem('questions', JSON.stringify(data.data));
  
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // }
  
  // useEffect(() => {
  //   fetchDataQuestion();
  // }, []);

  return (
    <Row gutter={[16, 16]}>
      <Col span={24} md={12} lg={24}>
        <Card className="flex-col">
          <div className="flex w-full flex-col">
            <Tabs
              tabPosition={tabPosition}
              destroyInactiveTabPane={true}
              items={tabs.map((tab) => ({
                label: tab.title,
                key: tab.key,
                children: tab.content,
              }))}
            />
          </div>
        </Card>
      </Col>
    </Row>
  );
}

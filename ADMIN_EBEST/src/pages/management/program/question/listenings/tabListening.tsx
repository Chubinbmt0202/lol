import { Row, Col, Tabs } from 'antd';
import { useState } from 'react';

import Card from '@/components/card';

import Conversation from './questionListening/conversation';
import Picture from './questionListening/picture';
import Story from './questionListening/story';
import Talk from './questionListening/talk';

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
  const [currentTabIndex, setcurrentTabIndex] = useState(0);
  return (
    <Row gutter={[16, 16]}>
      <Col span={24} md={12} lg={24}>
        <Card className="flex-col">
          <div className="flex w-full flex-col">
            <Tabs
              tabPosition={tabPosition}
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

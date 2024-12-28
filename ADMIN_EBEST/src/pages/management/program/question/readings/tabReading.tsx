import { Row, Col, Tabs } from 'antd';
import { useState } from 'react';

import Card from '@/components/card';

import Comprehension from './questionReading/comprehension';
import Paragraph from './questionReading/paragraph';
import Sentence from './questionReading/sentence';

type TabPosition = 'left' | 'right' | 'top' | 'bottom';

const tabs = [
  {
    key: '1',
    title: 'Điền vào câu',
    content: <Sentence />,
  },
  {
    key: '2',
    title: 'Điền vào đoạn',
    content: <Paragraph />,
  },
  {
    key: '3',
    title: 'Đọc hiểu',
    content: <Comprehension />,
  },
];

export default function TabReading() {
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

// import { useQuery } from '@tanstack/react-query';
import { Card, Space } from 'antd';

import '../../student/listStudent/modal.css';

import { useState } from 'react';

import { Iconify } from '@/components/icon';

import ProfileTab from './listenings/tabListening';
import TabReading from './readings/tabReading';

const tabs = [
  {
    icon: <Iconify icon="solar:user-id-bold" size={24} className="mr-2" />,
    title: 'Phần listening',
    content: <ProfileTab />,
  },
  {
    icon: <Iconify icon="mingcute:profile-fill" size={24} className="mr-2" />,
    title: 'Phần reading',
    content: <TabReading />,
  },
];
export default function OrganizationPage() {
  const [currentTabIndex, setcurrentTabIndex] = useState(0);

  return (
    <Space direction="vertical" size="large" className="w-full">
      <Card title="Ngân hàng câu hỏi">
        <div className="z-10 min-h-[48px] w-full">
          <div className="mx-6 flex h-full justify-center md:justify-start">
            {tabs.map((tab, index) => (
              <button
                onClick={() => setcurrentTabIndex(index)}
                key={tab.title}
                type="button"
                style={{
                  marginRight: index >= tabs.length - 1 ? '0px' : '40px',
                  opacity: index === currentTabIndex ? 1 : 0.5,
                  borderBottom: index === currentTabIndex ? `2px solid` : '',
                }}
              >
                {tab.icon}
                {tab.title}
              </button>
            ))}
          </div>
        </div>
        <div>{tabs[currentTabIndex].content}</div>
      </Card>
    </Space>
  );
}

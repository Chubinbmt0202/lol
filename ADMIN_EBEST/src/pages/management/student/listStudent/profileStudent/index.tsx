import { CSSProperties, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spin, notification } from 'antd';

import CoverImage from '@/assets/images/cover/cover_4.jpg';
import Card from '@/components/card';
import { Iconify } from '@/components/icon';
import { useUserInfo } from '@/store/userStore';
import { useThemeToken } from '@/theme/hooks';

import ConnectionsTab from './connections-tab';
import ProfileTab from './profile-tab';
import ProjectsTab from './projects-tab';
import Analise from '../profileStudent/workbench';

function UserProfile() {
  const { avatar, username } = useUserInfo();
  const { colorTextBase } = useThemeToken();
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<any>();
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [currentTabIndex, setcurrentTabIndex] = useState(0);

  console.log("student bên tabs:", student);
  console.log("id học viên:", id);

  const fetchDataStudent = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/getStudentByID/${id}`);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        console.log('Success:', data);
        setStudent(data.data);
        notification.success({
          message: 'Thành công',
          description: 'Lấy dữ liệu chi tiết học viên thành công',
        });
      } else {
        console.error('Error:', data);
        notification.error({
          message: 'Lỗi',
          description: 'Có lỗi xảy ra khi lấy dữ liệu',
        });
      }
    } catch (error) {
      console.error('Fetch error:', error);
      notification.error({
        message: 'Lỗi',
        description: 'Không thể kết nối đến server',
      });
    } finally {
      setLoading(false); // Tắt trạng thái loading sau khi dữ liệu đã được tải
    }
  };

  useEffect(() => {
    fetchDataStudent();
  }, []);

  const bgStyle: CSSProperties = {
    background: `linear-gradient(rgba(0, 75, 80, 0.8), rgba(0, 75, 80, 0.8)) center center / cover no-repeat, url(${CoverImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  };

  const tabs = [
    {
      icon: <Iconify icon="solar:user-id-bold" size={24} className="mr-2" />,
      title: 'Thông tin học viên',
      content: <ProfileTab student={student} />,
    },
    {
      icon: <Iconify icon="mingcute:profile-fill" size={24} className="mr-2" />,
      title: 'Bài tập',
      content: <ProjectsTab />,
    },
    {
      icon: <Iconify icon="mingcute:profile-fill" size={24} className="mr-2" />,
      title: 'Thống kê',
      content: <Analise />,
    },
  ];

  return (
    <>
      <Card className="relative mb-6 h-[290px] flex-col rounded-2xl !p-0">
        <div style={bgStyle} className="h-full w-full">
          <div className="flex flex-col items-center justify-center pt-12 md:absolute md:bottom-6 md:left-6 md:flex-row md:pt-0">
            <img src={avatar} className="h-16 w-16 rounded-full md:h-32 md:w-32" alt="" />
            <div
              className="ml-6 mt-6 flex flex-col justify-center md:mt-0"
              style={{ color: '#fff' }}
            >
              <span className="mb-2 text-2xl font-medium">{student?.ho_va_ten}</span>
              <span className="text-center opacity-50 md:text-left">Học viên</span>
            </div>
          </div>
        </div>
        <div className="z-10 min-h-[48px] w-full">
          <div className="mx-6 flex h-full justify-center md:justify-end">
            {tabs.map((tab, index) => (
              <button
                onClick={() => setcurrentTabIndex(index)}
                key={tab.title}
                type="button"
                style={{
                  marginRight: index >= tabs.length - 1 ? '0px' : '40px',
                  opacity: index === currentTabIndex ? 1 : 0.5,
                  borderBottom: index === currentTabIndex ? `2px solid ${colorTextBase}` : '',
                }}
              >
                {tab.icon}
                {tab.title}
              </button>
            ))}
          </div>
        </div>
      </Card>
      <div>
        {loading ? (
          <div className="flex justify-center items-center h-[200px]">
            <Spin size="large" />
          </div>
        ) : (
          tabs[currentTabIndex].content
        )}
      </div>
    </>
  );
}

export default UserProfile;
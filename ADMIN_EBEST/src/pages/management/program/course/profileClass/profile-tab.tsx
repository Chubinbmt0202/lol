import { faker } from '@faker-js/faker';
import { Row, Col, Typography, Timeline, Table, Space, Progress } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { fakeAvatars } from '@/_mock/utils';
import Card from '@/components/card';
import { IconButton, Iconify, SvgIcon } from '@/components/icon';
import Scrollbar from '@/components/scrollbar';
import { useUserInfo } from '@/store/userStore';
import ProTag from '@/theme/antd/components/tag';
import { useThemeToken } from '@/theme/hooks';

interface DataType {
  key: string;
  avatar: string;
  name: string;
  date: string;
  leader: string;
  team: string[];
  status: number;
}

export default function ProfileTab() {
  const { username } = useUserInfo();
  const theme = useThemeToken();
  const AboutItems = [
    { icon: <Iconify icon="fa-solid:user" size={18} />, label: 'Giáo viên phụ trách', val: username },
    { icon: <Iconify icon="eos-icons:role-binding" size={18} />, label: 'Số lượng học viên', val: 'Developer' },
    { icon: <Iconify icon="tabler:location-filled" size={18} />, label: 'Thời gian vào học', val: 'USA' },
    { icon: <Iconify icon="ion:language" size={18} />, label: 'Khóa học', val: 'English' },
    { icon: <Iconify icon="ph:phone-fill" size={18} />, label: 'Phòng học', val: '(123)456-7890' },
    { icon: <Iconify icon="ic:baseline-email" size={18} />, label: 'Thòi gian tốt nghiệp', val: username },
  ];

  const fakeProjectItems = () => {
    const arr: DataType[] = [];
    for (let i = 0; i <= 25; i += 1) {
      arr.push({
        key: faker.string.uuid(),
        avatar: faker.image.urlPicsumPhotos(),
        name: faker.company.buzzPhrase(),
        date: faker.date.past().toDateString(),
        leader: faker.person.fullName(),
        team: fakeAvatars(faker.number.int({ min: 2, max: 5 })),
        status: faker.number.int({ min: 50, max: 99 }),
      });
    }
    return arr;
  };

  const ProjectColumns: ColumnsType<DataType> = [
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      render: (_, record) => (
        <div className="flex items-center">
          <img src={record.avatar} alt="" className="h-9 w-9 rounded-full" />
          <div className="ml-2 flex flex-col">
            <span className="font-semibold">{record.name}</span>
            <span className="text-xs opacity-50">{record.date}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'leader',
      render: (val) => <span className="opacity-50">{val}</span>,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'leader',
      render: (val) => <span className="opacity-50">{val}</span>,
    },
    // {
    //   title: 'TEAM',
    //   dataIndex: 'team',
    //   render: (val: string[]) => (
    //     <Avatar.Group>
    //       {val.map((item, index) => (
    //         <Avatar src={item} key={index} />
    //       ))}
    //     </Avatar.Group>
    //   ),
    // },
    {
      title: 'Điểm trung bình',
      dataIndex: 'status',
      render: (val) => (
        <Progress percent={val} strokeColor={theme.colorPrimary} trailColor="transparent" />
      ),
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      render: () => (
        <Space size="middle">
          <IconButton>
            <Iconify icon="fontisto:more-v-a" />
          </IconButton>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24} md={12} lg={8}>
          <Card className="flex-col">
            <div className="flex w-full flex-col">
              <Typography.Title level={5}>Thông tin lớp học</Typography.Title>
              <Typography.Text>{faker.lorem.paragraph()}</Typography.Text>

              <div className="mt-2 flex flex-col gap-4">
                {AboutItems.map((item, index) => (
                  <div className="flex" key={index}>
                    <div className="mr-2">{item.icon}</div>
                    <div className="mr-2">{item.label}:</div>
                    <div className="opacity-50">{item.val}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Col>

        <Col span={24} md={12} lg={16}>
          <Card className="flex-col !items-start">
            <Typography.Title level={5}>Hoạt động</Typography.Title>
            <Timeline
              className="!mt-4 w-full"
              items={[
                {
                  color: theme.colorError,
                  children: (
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <Typography.Text strong>8 Invoices have been paid</Typography.Text>
                        <div className="opacity-50">Wednesday</div>
                      </div>
                      <Typography.Text type="secondary" className="text-xs">
                        Invoices have been paid to the company.
                      </Typography.Text>

                      <div className="mt-2 flex items-center gap-2">
                        <SvgIcon icon="ic_file_pdf" size={30} />
                        <span className="font-medium opacity-60">invoice.pdf</span>
                      </div>
                    </div>
                  ),
                },
                {
                  color: theme.colorPrimaryActive,
                  children: (
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <Typography.Text strong>Create a new project for client 😎</Typography.Text>
                        <div className="opacity-50">April, 18</div>
                      </div>
                      <Typography.Text type="secondary" className="text-xs">
                        Invoices have been paid to the company.
                      </Typography.Text>
                      <div className="mt-2 flex items-center gap-2">
                        <img
                          alt=""
                          src={faker.image.avatarGitHub()}
                          className="h-8 w-8 rounded-full"
                        />
                        <span className="font-medium opacity-60">
                          {faker.person.fullName()} (client)
                        </span>
                      </div>
                    </div>
                  ),
                },
                {
                  color: theme.colorInfo,
                  children: (
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <Typography.Text strong>Order #37745 from September</Typography.Text>
                        <div className="opacity-50">January, 10</div>
                      </div>
                      <Typography.Text type="secondary" className="text-xs">
                        Invoices have been paid to the company.
                      </Typography.Text>
                    </div>
                  ),
                },
                {
                  color: theme.colorWarning,
                  children: (
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <Typography.Text strong>Public Meeting</Typography.Text>
                        <div className="opacity-50">September, 30</div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className="mt-4">
        <Col span={24}>
          <Card className="flex-col !items-start">
            <Typography.Title level={5}>Học viên trong lớp</Typography.Title>
            <div className="!mt-4 w-full">
              <Scrollbar>
                <Table
                  rowSelection={{ type: 'checkbox' }}
                  columns={ProjectColumns}
                  dataSource={fakeProjectItems()}
                />
              </Scrollbar>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
}

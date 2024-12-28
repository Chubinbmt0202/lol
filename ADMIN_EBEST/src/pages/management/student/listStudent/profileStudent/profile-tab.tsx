import { faker } from '@faker-js/faker';
import { Row, Col, Typography, Progress, Form, Input, DatePicker, Select, Button } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { fakeAvatars } from '@/_mock/utils';
import Card from '@/components/card';
import { Iconify } from '@/components/icon';
import { useUserInfo } from '@/store/userStore';
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
    {
      icon: <Iconify icon="fa-solid:user" size={18} />,
      label: 'Họ và tên',
      val: 'Võ Trần Trung Anh',
    },
    {
      icon: <Iconify icon="bi:pass-fill" size={18} />,
      label: 'Các lớp đang theo học',
      val: 'Võ Trần Trung Anh',
    },
    {
      icon: <Iconify icon="clarity:date-solid" size={18} />,
      label: 'Ngày sinh',
      val: '1999-09-09',
    },
    {
      icon: <Iconify icon="tabler:location-filled" size={18} />,
      label: 'Địa chỉ',
      val: 'Cơ sở 1 - 12 Hoàng Thị Loan',
    },
    {
      icon: <Iconify icon="ion:language" size={18} />,
      label: 'Khoá học đã đăng ký',
      val: 'English',
    },
    { icon: <Iconify icon="ph:phone-fill" size={18} />, label: 'Liên hệ', val: '(123)456-7890' },
    { icon: <Iconify icon="ic:baseline-email" size={18} />, label: 'Email', val: username },
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
      title: 'Tên học viên',
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
      title: 'Ngày tháng năm sinh',
      dataIndex: 'leader',
      render: (val) => <span className="opacity-50">{val}</span>,
    },

    {
      title: 'Số điện thoại',
      dataIndex: 'leader',
      render: (val) => <span className="opacity-50">{val}</span>,
    },
    {
      title: 'Ngày tham gia',
      dataIndex: 'leader',
      render: (val) => <span className="opacity-50">{val}</span>,
    },
    {
      title: 'Điểm số trung bình',
      dataIndex: 'status',
      render: (val) => (
        <Progress percent={val} strokeColor={theme.colorPrimary} trailColor="transparent" />
      ),
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      <Col span={24} md={12} lg={8}>
        <Card className="flex-col">
          <div className="flex w-full flex-col">
            <Typography.Title level={5}>Giới thiệu</Typography.Title>
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
      <Col className="mb-8" span={24} md={12} lg={16}>
        <Card className="flex-col">
          <div className="flex w-full flex-col">
            <Typography.Title level={5}>Hồ sơ cá nhân</Typography.Title>

            <Form
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 32 }}
              layout="horizontal"
              className="space-y-4"
            >
              <hr />
              <p className="text-blue-200">Thông tin tài khoản</p>
              <div className=" flex gap-8">
                <Form.Item
                  name="account"
                  rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }]}
                >
                  Tài khoản
                  <Input />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                >
                  Mật khẩu
                  <Input.Password />
                </Form.Item>
              </div>
              <p>Thông tin cá nhân</p>
              <Form.Item
                name="fullName"
                className="mt-[-10px]"
                rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
              >
                Nhập họ và tên
                <Input />
              </Form.Item>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item name="birthdate" className="!mb-0">
                    <p>Ngày sinh</p>
                    <DatePicker className="w-full" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="sex" className="!mb-0">
                    <p>Giới tính</p>
                    <Select className="w-full">
                      <Select.Option value="male">Nam</Select.Option>
                      <Select.Option value="female">Nữ</Select.Option>
                      <Select.Option value="other">Khác</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="job" className="!mb-0">
                    <p>Công việc</p>
                    <Select className="w-full">
                      <Select.Option value="student">Học sinh/Sinh viên</Select.Option>
                      <Select.Option value="employee">Nhân viên</Select.Option>
                      <Select.Option value="freelancer">Freelancer</Select.Option>
                      <Select.Option value="other">Khác</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <p>Số điện thoại</p>
                  <Form.Item
                    name="phone"
                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                  >
                    <Input className="w-full" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <p>Email</p>
                  <Form.Item name="email">
                    <Input className="w-full" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <p>Địa chỉ</p>
                  <Form.Item
                    name="phone"
                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                  >
                    <Input className="w-full" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="job" className="!mb-0">
                    <p>Mục đích học</p>
                    <Select className="w-full">
                      <Select.Option value="student">Chứng chỉ quốc tế</Select.Option>
                      <Select.Option value="employee">Công việc</Select.Option>
                      <Select.Option value="freelancer">Định cư</Select.Option>
                      <Select.Option value="other">Du học</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="job" className="!mb-0">
                    <p>Khoá học đăng ký</p>
                    <Select className="w-full">
                      <Select.Option value="student">Tiếng anh giao tiếp</Select.Option>
                      <Select.Option value="employee">Tiếng anh trung cấp</Select.Option>
                      <Select.Option value="freelancer">Tiếng anh nền tảng</Select.Option>
                      <Select.Option value="other">Tiếng anh cấp tốc</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Button className="mt-3" type="primary">
                  Cập nhật thông tin
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Card>
      </Col>
    </Row>
  );
}

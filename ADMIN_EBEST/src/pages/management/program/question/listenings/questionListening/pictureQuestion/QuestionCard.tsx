import { Card, Dropdown, Menu, Tag, Button, Col } from 'antd';

import { FC } from 'react';

interface QuestionCardProps {
  item: {
    idCauHoi: string;
    tagCauHoi: string;
    tenCauHoi: string;
  };
  handleMenuClick: (e: any, item: any) => void;
}

const QuestionCard: FC<QuestionCardProps> = ({ item, handleMenuClick }) => {
  const menu = (
    <Menu onClick={(e) => handleMenuClick(e, item)}>
      <Menu.Item key="view">Xem chi tiết</Menu.Item>
      <Menu.Item key="edit">Chỉnh sửa</Menu.Item>
      <Menu.Item key="delete">Xóa</Menu.Item>
    </Menu>
  );

  return (
    <Col span={6} key={item.idCauHoi}>
      <Card className="mb-2" bordered={false} hoverable>
        <Tag color="blue" className="mb-2">
          #{item.tagCauHoi}
        </Tag>
        <p>{item.tenCauHoi}</p>
        <Dropdown overlay={menu} trigger={['click']}>
          <Button type="text">...</Button>
        </Dropdown>
      </Card>
    </Col>
  );
};

export default QuestionCard;
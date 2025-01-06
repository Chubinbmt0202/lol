import { faker } from '@faker-js/faker';
import { Button, Col, Row, Statistic, Card as AntCard, List } from 'antd';
import { UserOutlined, BookOutlined, CheckCircleOutlined, StarOutlined } from '@ant-design/icons';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Tooltip, Legend, CartesianGrid, XAxis, YAxis,
} from 'recharts';
import TotalCard from './analize/total-card';

export default function ClassStatisticsTab() {

  return (
    <Row gutter={[16, 16]}>
      <Col span={24} md={8}>
        <TotalCard
          title="Tổng số học viên"
          increase
          count="18"
          percent="2.6%"
          chartData={[22, 8, 35, 50, 82, 84, 77, 12, 87, 43]}
        />
      </Col>

      <Col span={24} md={8}>
        <TotalCard
          title="Tỷ lệ hoàn thành bài tập"
          increase
          count="89%"
          percent="0.2%"
          chartData={[45, 52, 38, 24, 33, 26, 21, 20, 6]}
        />
      </Col>
      

      <Col span={24} md={8}>
        <TotalCard
          title="Tổng số bài tập"
          increase={false}
          count="12"
          percent="0.1%"
          chartData={[35, 41, 62, 42, 13, 18, 29, 37, 36]}
        />
      </Col>
    </Row>
  );
} 
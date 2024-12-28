import { Col, Row, Space } from 'antd';

import AreaDownload from './area-download';
import BannerCard from './banner-card';
import { Applications, Conversion } from './conversion_applications';
import CurrentDownload from './current-download';
import TotalCard from './total-card';

function Workbench() {
  return (
    <div className="p-2">
      <Row gutter={[16, 16]} justify="center">
        <Col span={24} lg={16}>
          <BannerCard />
        </Col>
        <Col span={24} lg={8}>
          <Space direction="vertical" size="large" className="h-full w-full justify-center">
            <Conversion />
            <Applications />
          </Space>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-4" justify="center">
        <Col span={24} md={8}>
          <TotalCard
            title="Số bài tập đã hoàn thành"
            increase
            count="18,765"
            percent="2.6%"
            chartData={[22, 8, 35, 50, 82, 84, 77, 12, 87, 43]}
          />
        </Col>

        <Col span={24} md={8}>
          <TotalCard
            title="Tỷ lệ trả lời đúng"
            increase
            count="4,876"
            percent="0.2%"
            chartData={[45, 52, 38, 24, 33, 26, 21, 20, 6]}
          />
        </Col>

        <Col span={24} md={8}>
          <TotalCard
            title="Thời gian học tập"
            increase={false}
            count="678"
            percent="0.1%"
            chartData={[35, 41, 62, 42, 13, 18, 29, 37, 36]}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-4" justify="center">
        <Col span={24} md={12} lg={8}>
          <CurrentDownload />
        </Col>
        <Col span={24} md={12} lg={16}>
          <AreaDownload />
        </Col>
      </Row>

    </div>
  );
}

export default Workbench;

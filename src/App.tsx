// asd
import React from 'react';
import styles from './App.module.css'
import {Header, Footer, SideMenu, Carousel, ProductCollection, Cooperation} from "./components"
import { Row, Col, Typography } from "antd"
import { productList1, productList2, productList3 } from './mockups'
import sideimage1 from './assets/images/sider_2019_02-04.png'
import sideimage3 from './assets/images/sider_2019_02-04-2.png'
import sideimage2 from './assets/images/sider_2019_12-09.png'

function App() {
  return (
    <div className={styles.App}>
      <Header />
      {/* 页面内容 */}
      <div className={styles['page-content']}>
        <Row style={{marginTop: 20}}>
          <Col span={6}>
            <SideMenu />
          </Col>
          <Col span={18}>
            <Carousel />
          </Col>
          <ProductCollection
            title={<Typography.Title level={3} type="warning">爆款推荐</Typography.Title>}
            sideImage={sideimage1}
            products={productList1}
          >
          </ProductCollection>
          <ProductCollection
            title={<Typography.Title level={3} type="danger">新品上市</Typography.Title>}
            sideImage={sideimage2}
            products={productList2}
          >
          </ProductCollection>
          <ProductCollection
            title={<Typography.Title level={3} type="success">国内游推荐</Typography.Title>}
            sideImage={sideimage3}
            products={productList3}
          >
          </ProductCollection>
        </Row>
        <Cooperation />
      </div>
      <Footer />
    </div>
  );
}

export default App;

import React from "react"
import styles from './HomePage.module.css'
import {Header, Footer, SideMenu, Carousel, ProductCollection, Cooperation} from "../../components"
import { Row, Col, Typography } from "antd"
import { productList1, productList2, productList3 } from './mockups'
import sideimage1 from '../../assets/images/sider_2019_02-04.png'
import sideimage3 from '../../assets/images/sider_2019_02-04-2.png'
import sideimage2 from '../../assets/images/sider_2019_12-09.png'
import { withTranslation, WithTranslation } from 'react-i18next'

class HomePageComponent extends React.Component<WithTranslation> {
    render() {
      // t 为 translation
      const { t } = this.props;
      console.log(t('header'));
      
        return (
            <>
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
                    title={
                      <Typography.Title level={3} type="warning">
                        {t("home_page.hot_recommended")}
                      </Typography.Title>}
                    sideImage={sideimage1}
                    products={productList1}
                  >
                  </ProductCollection>
                  <ProductCollection
                    title={<Typography.Title level={3} type="danger">
                      {t("home_page.new_arrival")}
                    </Typography.Title>}
                    sideImage={sideimage2}
                    products={productList2}
                  >
                  </ProductCollection>
                  <ProductCollection
                    title={<Typography.Title level={3} type="success">
                      {t("home_page.domestic_travel")}
                    </Typography.Title>}
                    sideImage={sideimage3}
                    products={productList3}
                  >
                  </ProductCollection>
                </Row>
                <Cooperation />
              </div>
              <Footer />
            </>
        )
    }
}

// 括号1: 命名空间，括号2: 组件
export const HomePage = withTranslation()(HomePageComponent)
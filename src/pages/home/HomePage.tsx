import React from "react"
import styles from './HomePage.module.css'
import {Header, Footer, SideMenu, Carousel, ProductCollection, Cooperation} from "../../components"
import { Row, Col, Typography, Spin } from "antd"
import sideimage1 from '../../assets/images/sider_2019_02-04.png'
import sideimage3 from '../../assets/images/sider_2019_02-04-2.png'
import sideimage2 from '../../assets/images/sider_2019_12-09.png'
import { withTranslation, WithTranslation } from 'react-i18next'
import axios from "axios"

interface State {
  loading: Boolean,
  error: string | null,
  productList: any[]
}

class HomePageComponent extends React.Component<WithTranslation, State> {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      productList: [],
    }
  }

  async componentDidMount() {
    try {
      const { data } = await axios.get('http://123.56.149.216:8080/api/productCollections')
      this.setState({
        loading: false,
        error: null,
        productList: data,
      })
    } catch (error:any) {
      this.setState({
        error: error.message,
        loading: false,
      })
    }
  }
  render() {
    // t 为 translation
    const { t } = this.props;
    const { productList, loading, error } = this.state
    if (loading) {
      return <Spin 
        size="large"
        style={{
          marginTop: 200,
          marginBottom: 200,
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
        }}
      />
    }
    if (error) {
      return <div>网站出错：{error}</div>
    }
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
                products={productList[0].touristRoutes}
              >
              </ProductCollection>
              <ProductCollection
                title={<Typography.Title level={3} type="danger">
                  {t("home_page.new_arrival")}
                </Typography.Title>}
                sideImage={sideimage2}
                products={productList[1].touristRoutes}
              >
              </ProductCollection>
              <ProductCollection
                title={<Typography.Title level={3} type="success">
                  {t("home_page.domestic_travel")}
                </Typography.Title>}
                sideImage={sideimage3}
                products={productList[2].touristRoutes}
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
import React from "react"
import styles from './HomePage.module.css'
import {Header, Footer, SideMenu, Carousel, ProductCollection, Cooperation} from "../../components"
import { Row, Col, Typography, Spin } from "antd"
import sideimage1 from '../../assets/images/sider_2019_02-04.png'
import sideimage3 from '../../assets/images/sider_2019_02-04-2.png'
import sideimage2 from '../../assets/images/sider_2019_12-09.png'
import { withTranslation, WithTranslation } from 'react-i18next'
import axios from "axios"
import { connect } from "react-redux"
import { RootState } from "../../redux/store"
import {
  fetchRecommendProductsFailActionCreator,
  fetchRecommendProductsStartActionCreator,
  fetchRecommendProductsSuccessActionCreator
} from "../../redux/recommendProducts/recommendProductsAction"


const mapStateToProps = (state: RootState) => {
  return {
    loading: state.recommendProducts.loading,
    error: state.recommendProducts.error,
    productList: state.recommendProducts.productList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStart: () => {
      // dispatch(一个由creator创建的action)
      dispatch(fetchRecommendProductsStartActionCreator)
    },
    fetchSuccess: (data) => {
      dispatch(fetchRecommendProductsSuccessActionCreator(data))
    },
    fetchFail: (error) => {
      dispatch(fetchRecommendProductsFailActionCreator(error))
    }
  }
}

type PropsType = WithTranslation &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class HomePageComponent extends React.Component<PropsType> {

  async componentDidMount() {
    this.props.fetchStart()
    try {
      const { data } = await axios.get('http://123.56.149.216:8080/api/productCollections')
      this.props.fetchSuccess(data)
    } catch (error:any) {
      this.props.fetchFail(error.message)
    }
  }
  render() {
    // t 为 translation
    const { t, productList, loading, error } = this.props;
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

// withTranslation 括号1: 命名空间，括号2: 组件
// connect 括号1: store的映射数据，括号2: 组件
export const HomePage = connect(
  mapStateToProps, // state 入口
  mapDispatchToProps // state 出口
)(withTranslation()(HomePageComponent))

/*
React-Redux 将所有组件分成两大类：UI 组件和容器组件。
UI 组件：只负责 UI 的呈现，不带有任何业务逻辑，没有状态state值的使用，所有的参数是通过this.props获取。
容器组件：负责管理数据和业务逻辑，不负责 UI 的呈现，有业务逻辑，并且使用Redux提供的API。

在跟组件使用provider包裹，App的所有子组件就默认都可以拿到store中的state了
*/

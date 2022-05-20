import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import axios, { Axios } from "axios";
import {Spin} from "antd"
import styles from "./DetailPage.module.css"
import { Header, Footer } from "../../components"
 
interface MatchParams {
    touristRouteId: string;
}

export const DetailPage: React.FC = () => {
    // 钩子函数 获取路由参数
    const { id } = useParams()  
    console.log(id)
    const [loading, setLoading] = useState<boolean>(true)
    const [product, setProduct] = useState<any>(null);
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async() => {
            setLoading(true)
            try {
                const { data } = await axios.get(
                    `http://123.56.149.216:8080/api/touristRoutes/${id}`
                );
                setProduct(data)
                setLoading(false)
            } catch (error: any) {
                setError(error.message)
                setLoading(false)
            }
        }
        fetchData();
    }, [])

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

    return <>
        <Header />
        <div className={styles["page-content"]}>
            {/* 产品简介与日期选择 */}
            <div className={styles["product-intro-container"]}></div>
            {/* 锚点菜单 */}
            <div className={styles["product-detail-anchor"]}></div>
            {/* 产品特色 */}
            <div id="feature" className={styles["product-detail-container"]}></div>
            {/* 产品费用 */}
            <div id="fees" className={styles["product-detail-container"]}></div>
            {/* 产品须知 */}
            <div id="notes" className={styles["product-detail-container"]}></div>
            {/* 商品评价 */}
            <div id="comments" className={styles["product-detail-container"]}></div>
        </div>
        <Footer />
    </>
}
import styles from "./SearchPage.module.css"
import React, {useEffect} from "react"
import { Header, Footer, FilterArea, ProductList } from "../../components"
import { useParams, useLocation } from "react-router-dom"
import { Spin } from "antd"
import { searchProduct } from "../../redux/search/slice"
import { useSelector, useAppDispatch } from "../../redux/hooks"
import { MainLayout } from "../../layout/mainLayout"


export const SearchPage: React.FC = () => {
    const { keywords } = useParams();
    
    const loading = useSelector(state => state.productSearch.loading)
    const productList = useSelector(state => state.productSearch.data)
    console.log(productList);
    
    const pagination = useSelector(state => state.productSearch.pagination)
    const error = useSelector(state => state.productSearch.error)

    const dispatch = useAppDispatch()
    const location = useLocation()

    useEffect(() => {
        if (keywords) {
            dispatch(searchProduct({nextPage:1, pageSize: 10, keywords}))
        }
        // 监听 url 的变化
    }, [location])

    const onPageChange = (nextPage, pageSize) => {
        if (keywords) {
            dispatch(searchProduct({nextPage:1, pageSize: 10, keywords}))
        }
    }
    if (loading) {
    return (
        <Spin
        size="large"
        style={{
            marginTop: 200,
            marginBottom: 200,
            marginLeft: "auto",
            marginRight: "auto",
            width: "100%",
        }}
        />
    );
    }
    if (error) {
        return <div>网站出错：{error}</div>;
    }
    return (
        <>
            <MainLayout>
                <div className={styles["product-list-container"]}>
                    <FilterArea />
                    </div>
                    <div className={styles["product-list-container"]}>
                        <ProductList 
                            data={productList}
                            paging={pagination}
                            onPageChange={onPageChange}
                        />
                </div>
            </MainLayout>
        </>
    )
}
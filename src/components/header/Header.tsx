import React, { useState } from "react"
import styles from "./Header.module.css"
import logo from '../../assets/logo.svg';
import { Button, Dropdown, Input, Layout, Menu, Typography } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import { useNavigate } from "react-router-dom";
import store from "../../redux/store"
import { useTranslation } from "react-i18next";

// 将组件完全从 store 中剥离，从自定义hook中获取store的数据
import { useSelector } from "../../redux/hooks"; 

export const Header: React.FC = () => {
    const navigate = useNavigate()
    const storeState = store.getState()
    const [lauguageObj, setLauguageObj] = useState(storeState)
    // 使用i18n定义的数据
    const { t } = useTranslation()
    const language = useSelector((state) => state.language)
    const languageList = useSelector((state) => state.languageList)

    // 订阅store数据，当store数据变化则执行，实现store->UI
    store.subscribe(()=> {
        const storetate = store.getState()
        setLauguageObj(storetate)
    })

    const menuClickHandler = (e) => {
        if(e.key === "new") {
            const action = addLanguageActionCreator("新语言", "new_lang")
            store.dispatch(action)
        } else {
            const action = changeLanguageActionCreator(e.key)
            // 派发一个action 用户->store
            store.dispatch(action)
        }
    }
    return (
        <div className={styles['app-header']}>
            {/*top-header*/}
            <div className={styles['top-header']}>
                <div className={styles['inner']}>
                    <Typography.Text>{t("header.slogan")}</Typography.Text>
                    <Dropdown.Button
                    style={{marginLeft: 15}}
                    overlay={
                        <Menu>
                            {lauguageObj.languageList.map(l=>{
                                return <Menu.Item onClick={menuClickHandler} key={l.code}>{l.name}</Menu.Item>
                            })}
                            <Menu.Item onClick={menuClickHandler} key={"new"}>{t("header.add_new_language")}</Menu.Item>
                        </Menu>
                    }
                    icon={<GlobalOutlined />}
                    >
                        {storeState.language === "zh" ? "中文" : "English"}
                    </Dropdown.Button>
                    <Button.Group className={styles["button-gruop"]}>
                    <Button onClick={()=>navigate('/register')}>{t("header.register")}</Button>
                    <Button onClick={()=>navigate('/signIn')}>{t("header.signin")}</Button>
                    </Button.Group>
                </div>  
            </div>
            <Layout.Header className={styles['main-header']}>
                <span onClick={()=>navigate('/')}>
                    <img src={logo} alt='' className={styles['App-logo']}/>
                    <Typography.Title level={3} className={styles['title']}>{t("header.title")}</Typography.Title>
                    <Input.Search 
                        placeholder='请输入旅游目的地、或者其他你想输入的东西'
                        className={styles['search-input']}
                    />
                </span>
            </Layout.Header>
            <Menu mode={"horizontal"} className={styles['main-menu']}>
                <Menu.Item key={1}>{t("header.home_page")}</Menu.Item>
                <Menu.Item key={2}>{t("header.weekend")}</Menu.Item>
                <Menu.Item key={3}>{t("header.group")}</Menu.Item>
                <Menu.Item key="4"> {t("header.backpack")} </Menu.Item>
                <Menu.Item key="5"> {t("header.private")} </Menu.Item>
                <Menu.Item key="6"> {t("header.cruise")} </Menu.Item>
                <Menu.Item key="7"> {t("header.hotel")} </Menu.Item>
                <Menu.Item key="8"> {t("header.local")} </Menu.Item>
                <Menu.Item key="9"> {t("header.theme")} </Menu.Item>
                <Menu.Item key="10"> {t("header.custom")} </Menu.Item>
                <Menu.Item key="11"> {t("header.study")} </Menu.Item>
                <Menu.Item key="12"> {t("header.visa")} </Menu.Item>
                <Menu.Item key="13"> {t("header.enterprise")} </Menu.Item>
                <Menu.Item key="14"> {t("header.outdoor")} </Menu.Item>
                <Menu.Item key="15"> {t("header.insurance")} </Menu.Item>
                <Menu.Item key="16"> {t("header.high_end")} </Menu.Item>
            </Menu>
        </div>
    )
};
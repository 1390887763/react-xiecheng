import React, { useState } from "react"
import styles from "./Header.module.css"
import logo from '../../assets/logo.svg';
import { Button, Dropdown, Input, Layout, Menu, Typography } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import { useNavigate } from "react-router-dom";
import store from "../../redux/store"

export const Header: React.FC = () => {
    const navigate = useNavigate()
    const storeState = store.getState()
    const [lauguageObj, setLauguageObj] = useState(storeState)

    // 订阅store数据，当store数据变化则执行，实现store->UI
    store.subscribe(()=> {
        const storetate = store.getState()
        setLauguageObj(storetate)
    })

    const menuClickHandler = (e) => {
        if(e.key === "new") {
            console.log(123);
            
            const action = {
                type: "add_language",
                payload: {code: "new_lang", name: "新语言"}
            }
            store.dispatch(action)
        } else {
            const action = {
                type: "action_language",
                payload: e.key,
            };
            // 派发一个action 用户->store
            store.dispatch(action)
        }
        
    }
    return (
        <div className={styles['app-header']}>
            {/*top-header*/}
            <div className={styles['top-header']}>
                <div className={styles['inner']}>
                    <Typography.Text>让旅游更幸福</Typography.Text>
                    <Dropdown.Button
                    style={{marginLeft: 15}}
                    overlay={
                        <Menu>
                            {lauguageObj.languageList.map(l=>{
                                return <Menu.Item onClick={menuClickHandler} key={l.code}>{l.name}</Menu.Item>
                            })}
                            <Menu.Item onClick={menuClickHandler} key={"new"}>添加新语言</Menu.Item>
                        </Menu>
                    }
                    icon={<GlobalOutlined />}
                    >
                        {storeState.language === "zh" ? "中文" : "English"}
                    </Dropdown.Button>
                    <Button.Group className={styles["button-gruop"]}>
                    <Button onClick={()=>navigate('/register')}>注册</Button>
                    <Button onClick={()=>navigate('/signIn')}>登录</Button>
                    </Button.Group>
                </div>  
            </div>
            <Layout.Header className={styles['main-header']}>
                <span onClick={()=>navigate('/')}>
                    <img src={logo} alt='' className={styles['App-logo']}/>
                    <Typography.Title level={3} className={styles['title']}>React 旅游网</Typography.Title>
                    <Input.Search 
                        placeholder='请输入旅游目的地、或者其他你想输入的东西'
                        className={styles['search-input']}
                    />
                </span>
            </Layout.Header>
            <Menu mode={"horizontal"} className={styles['main-menu']}>
                <Menu.Item key={1}>旅游首页</Menu.Item>
                <Menu.Item key={2}>周末游</Menu.Item>
                <Menu.Item key={3}>跟团游</Menu.Item>
                <Menu.Item key="4"> 自由行 </Menu.Item>
                <Menu.Item key="5"> 私家团 </Menu.Item>
                <Menu.Item key="6"> 邮轮 </Menu.Item>
                <Menu.Item key="7"> 酒店+景点 </Menu.Item>
                <Menu.Item key="8"> 当地玩乐 </Menu.Item>
                <Menu.Item key="9"> 主题游 </Menu.Item>
                <Menu.Item key="10"> 定制游 </Menu.Item>
                <Menu.Item key="11"> 游学 </Menu.Item>
                <Menu.Item key="12"> 签证 </Menu.Item>
                <Menu.Item key="13"> 企业游 </Menu.Item>
                <Menu.Item key="14"> 高端游 </Menu.Item>
                <Menu.Item key="15"> 爱玩户外 </Menu.Item>
                <Menu.Item key="16"> 保险 </Menu.Item>
            </Menu>
        </div>
    )
};
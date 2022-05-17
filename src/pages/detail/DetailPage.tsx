import React from "react";
import {useParams} from 'react-router-dom'

export const DetailPage: React.FC = () => {
    // 钩子函数 获取路由参数
    const params = useParams() 
    return <h1>旅游路线在这里查看,路线ID: {params.id}</h1>
}
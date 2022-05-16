import React from "react"
import {Typography, Divider} from "antd"
import styles from "./Cooperation.module.css"
import image1 from '../../assets/images/facebook.png'
import image2 from '../../assets/images/follow.png'
import image3 from '../../assets/images/microsoft.png'
import image4 from '../../assets/images/youTube.png'


export const Cooperation: React.FC = () => {
    return (
        <div>
            <Divider orientation="left">
                <Typography.Title level={3}>合作名企</Typography.Title>
            </Divider>
            <div className={styles.images}> 
                <img src={image1} className={styles["cooperation-image"]} alt="" />
                <img src={image2} className={styles["cooperation-image"]} alt="" />
                <img src={image3} className={styles["cooperation-image"]} alt="" />
                <img src={image4} className={styles["cooperation-image"]} alt="" />
            </div>
        </div>
    )
}
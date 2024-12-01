import { Layout } from '@consta/uikit/Layout';
import Menu from './Menu';
import React from 'react';
import style from "./Footer.module.css"

const Footer = () => {
    return (
        <Layout className={style.Footer}>
            <Menu />
            <div>
                <p>© 2024 Моя компания</p>
            </div>
        </Layout>
    )
}

export default Footer;
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import style from './MainLayout.module.css'
import { Layout } from '@consta/uikit/Layout';

const MainLayout = () => {
    return (
        <Layout className={style.MainLayout}>
            <Header />
            <hr className={style.line}/>
            <main className={style.main}>
                <Outlet />
            </main>
            <hr className={style.line}/>
            <Footer />
        </Layout>
    )
}

export default MainLayout
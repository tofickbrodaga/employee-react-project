import { Button } from '@consta/uikit/Button';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Layout } from '@consta/uikit/Layout';
import Menu from './Menu';
import React from 'react';
import style from "./Header.module.css";
import { getToken, dropToken } from "../services/token";


const Header = () => {
    const {pathname} = useLocation()
    const navigate = useNavigate();

    const handleLogout = () => {
        dropToken();
        navigate("/");
    };    
    return (
        <Layout  className={style.Header}>
            <Menu />
            <div className={style.rightBlock}>
            <NavLink to='/profile'>
                <Button view={pathname==="/profile" ? "primary" : "secondary"} label='Ваш Профиль'></Button>
            </NavLink>
            <NavLink to='/login'>
                {getToken() ? <Button view="secondary" onClick={handleLogout} label='Выход'></Button>
                    : <Button view={pathname==="/login" ? "primary" : "secondary"} label='Вход'></Button>}
            </NavLink></div>
        </Layout>
    )
}

export default Header;
import React from 'react';
import { Button } from '@consta/uikit/Button';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Layout } from '@consta/uikit/Layout';
import Menu from './Menu';
import style from "./Header.module.css";
import { getToken, dropToken } from "../../services/token";

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    dropToken();
    navigate("/");
  };

  const getButtonView = (path) => (pathname === path ? "primary" : "secondary");

  return (
    <Layout className={style.Header}>
      <Menu />
      <div className={style.rightBlock}>
        <NavLink to='/profile'>
          <Button view={getButtonView("/profile")} label='ФИО' />
        </NavLink>
        <NavLink to='/login'>
          {getToken() ? (
            <Button view="secondary" onClick={handleLogout} label='Выход' />
          ) : (
            <Button view={getButtonView("/login")} label='Вход' />
          )}
        </NavLink>
      </div>
    </Layout>
  );
};

export default Header;

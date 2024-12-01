import React from 'react';
import { Button } from "@consta/uikit/Button";
import { NavLink, useLocation } from "react-router-dom";
import style from "./Menu.module.css";

const Menu = () => {
  const { pathname } = useLocation();

  const getButtonView = (path) => (pathname === path ? "primary" : "secondary");

  return (
    <div className={style.Menu}>
      <NavLink to='/'>
        <Button view={getButtonView("/")} label='Главная страница' />
      </NavLink>
      <NavLink to='/service'>
        <Button view={getButtonView("/service")} label='Страница услуг' />
      </NavLink>
    </div>
  );
};

export default Menu;

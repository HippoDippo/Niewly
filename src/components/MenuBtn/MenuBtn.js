import React from "react";
import './MenuBtn.css';
import menu from './menu.png';

function MenuBtn(props) {
  return (
    <img src={menu} id="Button"
         onMouseDown={props.handleMouseDown}/>
  );
}

export default MenuBtn;
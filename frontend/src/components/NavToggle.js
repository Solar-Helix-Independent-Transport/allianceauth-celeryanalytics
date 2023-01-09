import React from "react";
import { NavItem } from "react-bootstrap";
const NavToggle = ({ active, setActive, text }) => {
  return (
    <NavItem
      onClick={() => {
        setActive(!active);
      }}
    >
      {active ? (
        <i class="far fa-check-square fa-fw"></i>
      ) : (
        <i class="far fa-square  fa-fw"></i>
      )}
      {' '}{text}
    </NavItem>
  );
};

export default NavToggle;

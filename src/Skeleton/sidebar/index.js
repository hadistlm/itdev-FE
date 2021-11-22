import React, { Component } from "react";

import { Link, NavLink } from "react-router-dom";
import { Data } from "./data";
import { config } from "../../Environment/config";
import { useLocation } from "react-router-dom";
import "../../assets/js/scripts";
import "../../assets/js/stisla";

// import SidebarGlobal from "../../../js/SidebarGlobal";

export class SideBar extends Component {
  componentDidMount() {}
  render() {
    return (
      <div className="main-sidebar">
        <aside id="sidebar-wrapper">
          <div className="sidebar-brand">
            <Link to="/"> {config.appName} </Link>{" "}
          </div>{" "}
          <div className="sidebar-brand sidebar-brand-sm">
            <Link to="/"> {config.appInitial} </Link>{" "}
          </div>{" "}
          <ul className="sidebar-menu mb-5">
            {" "}
            {Data.menus.map((menu, iMenu) => {
              let comp;
              if (menu.header) {
                comp = (
                  <li key={iMenu} className="menu-header">
                    {" "}
                    {menu.name}{" "}
                  </li>
                );
              } else if (menu.dropdown) {
                if (menu.active) {
                  comp = (
                    <li key={iMenu} className="nav-item dropdown active">
                      <a href="#" className="nav-link has-dropdown">
                        <i className={menu.icon} /> <span> {menu.name} </span>
                      </a>{" "}
                      <ul className="dropdown-menu">
                        {" "}
                        {menu.children.map((submenu, iSubmenu) => {
                          let subComp;
                          if (submenu.active) {
                            if (submenu.beep) {
                              subComp = (
                                <li key={iSubmenu} className="active">
                                  <NavLink
                                    activeStyle={{
                                      color: " #dc3545",
                                      fontWeight: "600",
                                    }}
                                    exact
                                    className="beep beep-sidebar"
                                    to={submenu.url}
                                  >
                                    {" "}
                                    {submenu.name}{" "}
                                  </NavLink>{" "}
                                </li>
                              );
                            } else {
                              subComp = (
                                <li key={iSubmenu}>
                                  <NavLink
                                    activeStyle={{
                                      color: " #dc3545",
                                      fontWeight: "600",
                                    }}
                                    exact
                                    to={submenu.url}
                                  >
                                    {" "}
                                    {submenu.name}{" "}
                                  </NavLink>{" "}
                                </li>
                              );
                            }
                          } else if (submenu.beep) {
                            subComp = (
                              <li key={iSubmenu}>
                                <NavLink
                                  activeStyle={{
                                    color: " #dc3545",
                                    fontWeight: "600",
                                  }}
                                  exact
                                  className="beep beep-sidebar"
                                  to={submenu.url}
                                >
                                  {" "}
                                  {submenu.name}{" "}
                                </NavLink>{" "}
                              </li>
                            );
                          } else {
                            subComp = (
                              <li key={iSubmenu}>
                                <NavLink
                                  activeStyle={{
                                    color: " #dc3545",
                                    fontWeight: "600",
                                  }}
                                  exact
                                  to={submenu.url}
                                >
                                  {" "}
                                  {submenu.name}{" "}
                                </NavLink>{" "}
                              </li>
                            );
                          }

                          return subComp;
                        })}{" "}
                      </ul>{" "}
                    </li>
                  );
                } else {
                  comp = (
                    <li key={iMenu} className="nav-item dropdown">
                      <a href="#" className="nav-link has-dropdown">
                        <i className={menu.icon} /> <span> {menu.name} </span>
                      </a>{" "}
                      <ul className="dropdown-menu">
                        {" "}
                        {menu.children.map((submenu, iSubmenu) => {
                          let subComp;
                          if (submenu.active) {
                            if (submenu.beep) {
                              subComp = (
                                <li key={iSubmenu} className="active">
                                  <NavLink
                                    activeStyle={{
                                      color: " #dc3545",
                                      fontWeight: "600",
                                    }}
                                    exact
                                    className="beep beep-sidebar"
                                    to={submenu.url}
                                  >
                                    {" "}
                                    {submenu.name}{" "}
                                  </NavLink>{" "}
                                </li>
                              );
                            } else {
                              subComp = (
                                <li key={iSubmenu} className="active">
                                  <NavLink
                                    activeStyle={{
                                      color: " #dc3545",
                                      fontWeight: "600",
                                    }}
                                    exact
                                    to={submenu.url}
                                  >
                                    {" "}
                                    {submenu.name}{" "}
                                  </NavLink>{" "}
                                </li>
                              );
                            }
                          } else if (submenu.beep) {
                            subComp = (
                              <li key={iSubmenu}>
                                <NavLink
                                  activeStyle={{
                                    color: " #dc3545",
                                    fontWeight: "600",
                                  }}
                                  exact
                                  className="beep beep-sidebar"
                                  to={submenu.url}
                                >
                                  {" "}
                                  {submenu.name}{" "}
                                </NavLink>{" "}
                              </li>
                            );
                          } else {
                            subComp = (
                              <li key={iSubmenu}>
                                <NavLink
                                  activeStyle={{
                                    color: " #dc3545",
                                    fontWeight: "600",
                                  }}
                                  exact
                                  to={submenu.url}
                                >
                                  {" "}
                                  {submenu.name}{" "}
                                </NavLink>{" "}
                              </li>
                            );
                          }

                          return subComp;
                        })}{" "}
                      </ul>{" "}
                    </li>
                  );
                }
              } else if (menu.active) {
                //
                comp = (
                  <li key={iMenu} className="s">
                    <NavLink
                      activeStyle={{
                        color: " #dc3545",
                        fontWeight: "600",
                      }}
                      exact
                      to={menu.url}
                    >
                      <i className={menu.icon} /> <span> {menu.name} </span>
                    </NavLink>{" "}
                  </li>
                );
              } else {
                //Single Component
                comp = (
                  <li key={iMenu}>
                    <NavLink
                      activeStyle={{
                        color: " #dc3545",
                        fontWeight: "600",
                      }}
                      exact
                      to={menu.url}
                    >
                      <i className={menu.icon} /> <span> {menu.name} </span>
                    </NavLink>{" "}
                  </li>
                );
              }

              return comp;
            })}{" "}
          </ul>{" "}
        </aside>{" "}
      </div>
    );
  }
}

export default SideBar;

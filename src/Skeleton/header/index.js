/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import ToggleData from "./ToggleData";
import { searchResultData, EnvelopData, NotifyData, userDetail } from "./Data";
import Search from "./Search";
import UserDropdown from "./UserDropdown";

const Header = () => {
  return (
    <div>
      <div className="navbar-bg" />
      <nav className="navbar navbar-expand-lg main-navbar">
        <div className="container-fluid">
          <form className="form-inline mr-auto">
            <ul className="navbar-nav mr-3">
              <li><a href="#" data-toggle="sidebar" className="nav-link nav-link-lg"><i className="fas fa-bars"></i></a></li>
              <li><a href="#" data-toggle="search" className="nav-link nav-link-lg d-sm-none"><i className="fas fa-search"></i></a></li>
            </ul>
          </form>

          <div class="btn-group">
            <UserDropdown userDetail={userDetail} />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;

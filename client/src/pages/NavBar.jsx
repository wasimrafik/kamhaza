import React, { useRef, useState } from "react";
import '../styles/globals.css';
// import 'font-awesome/css/font-awesome.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import './Navbar.css'
import CustReportCard from "../components/CustReportCard";
import CustCheckboxRadio from "../components/Custom Inputs Types/CustCheckboxRadio";
import CustComingSoon from "../components/CustComingSoon";
import CustBreadCrumb from "../components/BreadCrumb/CustBreadCrumb";
import CustChips from "../components/CustChips";

function NavBar() {
    const menuLeft = useRef(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const selectLocation = [
        { "name": "Riyadh", "code": "RYD" },
        { "name": "Al-Kharj", "code": "AKH" },
        { "name": "Al-Majma'ah", "code": "AMJ" },
        { "name": "Al-Dawadmi", "code": "ADW" },
        { "name": "Al-Diriyah", "code": "ADR" },
        { "name": "Shaqra", "code": "SHA" },
        { "name": "Makkah", "code": "MEK" },
        { "name": "Jeddah", "code": "JED" },
        { "name": "Taif", "code": "TAF" },
        { "name": "Rabigh", "code": "RBG" },
        { "name": "Al-Lith", "code": "ALT" },
        { "name": "Khulais", "code": "KHS" },
        { "name": "Medina", "code": "MED" },
        { "name": "Yanbu", "code": "YAN" },
        { "name": "Badr", "code": "BAD" },
        { "name": "Al-Ula", "code": "ALA" },
        { "name": "Khaibar", "code": "KBR" },
        { "name": "Dammam", "code": "DAM" },
        { "name": "Khobar", "code": "KHB" },
        { "name": "Dhahran", "code": "DHR" },
        { "name": "Al-Ahsa", "code": "AHS" },
        { "name": "Qatif", "code": "QAT" },
        { "name": "Jubail", "code": "JUB" },
        { "name": "Ras Tanura", "code": "RST" },
        { "name": "Abqaiq", "code": "ABQ" },
        { "name": "Al-Khafji", "code": "AKF" },
        { "name": "Hafr Al-Batin", "code": "HAB" },
        { "name": "Abha", "code": "ABH" },
        { "name": "Khamis Mushait", "code": "KMS" },
        { "name": "Bisha", "code": "BIS" },
        { "name": "Mahayel Asir", "code": "MAS" },
        { "name": "Tanomah", "code": "TNM" },
        { "name": "Al-Namas", "code": "NMS" },
        { "name": "Tabuk", "code": "TBU" },
        { "name": "Duba", "code": "DBA" },
        { "name": "Al-Wajh", "code": "AWJ" },
        { "name": "Haql", "code": "HAQ" },
        { "name": "Tayma", "code": "TYM" },
        { "name": "Hail", "code": "HIL" },
        { "name": "Baqa'a", "code": "BAQ" },
        { "name": "Al-Ghazalah", "code": "GHZ" },
        { "name": "Najran", "code": "NAJ" },
        { "name": "Sharurah", "code": "SHR" },
        { "name": "Habouna", "code": "HBN" },
        { "name": "Jazan", "code": "JZN" },
        { "name": "Sabya", "code": "SBY" },
        { "name": "Abu Arish", "code": "ABR" },
        { "name": "Samtah", "code": "SMT" },
        { "name": "Farasan", "code": "FRS" },
        { "name": "Al-Bahah", "code": "BAH" },
        { "name": "Baljurashi", "code": "BLJ" },
        { "name": "Al-Mikhwah", "code": "MIK" },
        { "name": "Sakaka", "code": "SKK" },
        { "name": "Dumat Al-Jandal", "code": "DMJ" },
        { "name": "Qurayyat", "code": "QUR" },
        { "name": "Arar", "code": "ARR" },
        { "name": "Rafha", "code": "RFH" },
        { "name": "Turaif", "code": "TRF" },
        { "name": "Al-Uwayqilah", "code": "AWQ" },
        { "name": "Buraidah", "code": "BRD" },
        { "name": "Unaizah", "code": "UNZ" },
        { "name": "Ar Rass", "code": "ARS" },
        { "name": "Al Mithnab", "code": "MTN" },
        { "name": "Al-Bukayriyah", "code": "BUK" }
    ]

    const language = [
        { "name": "English", "code": "EN" },
        { "name": "Arabic", "code": "AB" },

    ]

    const items = [
        {
            label: 'Personal Info',
        },
        {
            label: 'My Ads',
        },
        {
            label: 'Purchase History',
        },
        {
            label: 'Settings',
        },
        {
            label: 'Help',
        },
        {
            label: 'Logout',
        },
    ];

    return (
        <>
            <nav className="navbar" id="navbar">
                <div className="navbar-container">
                    <div className="navbar-left">
                        <div className="logo">
                            <h2>Kam Haza</h2>
                            <CustChips />
                        </div>
                        {/* <div className="location-selector">
                            <i className="fas fa-map-marker-alt"></i>
                            <select id="locationSelect" className="form-control">
                                <option value="">Select Location</option>
                            </select>
                        </div> */}

                        <Dropdown
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.value)}
                            options={selectLocation}
                            optionLabel="name"
                            editable
                            placeholder="Select Location"
                            className="custom-dropdown"
                        />



                        {/* <div className="search-bar">
                            <input type="text" id="globalSearch" placeholder="Search for anything..." className="form-control" />
                            <button className="btn-primary" id="searchButton">
                                <i className="fas fa-search"></i>
                            </button>
                        </div> */}

                       
            <div className="p-inputgroup flex-1">
                <InputText className='input-height custom-input-product ' placeholder="Search for anything..." />
                <Button icon="pi pi-search" id="ProductsearchButton" className="p-button-primary" />
            </div>

                    </div>

                    <div className="navbar-right">
                        {/* <div className="language-selector">
                            <select className="form-control">
                                <option>EN</option>
                                <option>ES</option>
                                <option>FR</option>
                            </select>
                        </div> */}
                        
                             <Dropdown
                            value={selectedLanguage}    
                            onChange={(e) => setSelectedLanguage(e.value)}
                            options={language}
                            optionLabel="name"
                            editable
                            placeholder="Select Lanuage"
                            className="custom-dropdown"
                        />

                        <div className="nav-icons">
                            <div className="nav-icon" id="messagesIcon" data-count="2">
                                <i className="fas fa-comments"></i>
                                <span className="notification-badge">2</span>
                            </div>
                            <div className="nav-icon" id="wishlistIcon" data-count="5">
                                <i className="fas fa-heart"></i>
                                <span className="notification-badge">5</span>
                            </div>
                            <div className="nav-icon" id="watchlistIcon" data-count="3">
                                <i className="fas fa-eye"></i>
                                <span className="notification-badge">3</span>
                            </div>
                            <div className="nav-icon" id="notificationsIcon" data-count="1">
                                <i className="fas fa-bell"></i>
                                <span className="notification-badge">1</span>
                            </div>
                        </div>

                        {/* <div className="user-menu">
                    <div className="user-avatar" id="userAvatar">
                        <i className="fas fa-user"></i>
                    </div>
                    <div className="dropdown-menu" id="userDropdown">
                        <a href="#" data-page="profile">Personal Info</a>
                        <a href="#" data-page="my-ads">My Ads</a>
                        <a href="#" data-page="purchase-history">Purchase History</a>
                        <a href="#" data-page="settings">Settings</a>
                        <a href="#" data-page="help">Help</a>
                        <div className="dropdown-divider"></div>
                        <a href="#" id="logoutBtn">Logout</a>
                    </div>
                </div> */}

                        <Menu model={items} popup ref={menuLeft} id="popup_menu_left" />
                        <Button icon="fas fa-user" className="user-avatar" appendTo='self' onClick={(event) => menuLeft?.current?.toggle(event)} aria-controls="popup_menu_left" aria-haspopup />
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar


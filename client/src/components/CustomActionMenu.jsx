"use client";
import React, { useEffect, useRef, useState } from "react";

const CustomActionMenu = ({ rowData, menuItems, onMenuAction, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const [menuStyles, setMenuStyles] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.dispatchEvent(new CustomEvent("menu-opened", { detail: { id: menuRef.current?.id } }));
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    const handleOtherMenuOpened = (event) => {
      const openedMenuId = event.detail?.id;
      if (menuRef.current?.id !== openedMenuId) setIsOpen(false);
    };

    window.addEventListener("menu-opened", handleOtherMenuOpened);
    return () => window.removeEventListener("menu-opened", handleOtherMenuOpened);
  }, []);

  useEffect(() => {
    if (menuRef.current) {
      menuRef.current.id = `menu-${Math.random().toString(36).substr(2, 9)}`;
    }
  }, []);

  const handleButtonClick = (e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setMenuStyles({ top: rect.bottom, left: rect.left });
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const preventScroll = (e) => e.preventDefault();
    if (isOpen) {
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
    }
    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [isOpen]);

  return (
    <div className={`relative ${className}`} ref={menuRef}>
      <button
        className="p-button p-button-text p-button-icon-only"
        onClick={handleButtonClick}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={menuRef.current?.id}
      >
        <i className="pi pi-ellipsis-v"></i>
      </button>

      {isOpen && menuStyles && (
        <div
          className="fixed bg-white shadow-md z-[9999] w-48 py-1 rounded-md"
          role="menu"
          style={{ top: menuStyles.top + 20, left: menuStyles.left - 60 }}
        >
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-left"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
                onMenuAction(item.actionType, rowData);
              }}
              role="menuitem"
            >
              {item.icon && <i className={item.icon + " mr-2"}></i>}
              <span className="text-left w-full">{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomActionMenu;

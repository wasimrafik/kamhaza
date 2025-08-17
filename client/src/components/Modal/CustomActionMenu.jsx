import React, { useRef } from "react";
import { Menu } from "primereact/menu";
import CustButtons from "../CustButton";

const CustActionMenu = ({ label = "Actions", icon = "pi pi-ellipsis-v", actions = [] }) => {
  const menuRef = useRef(null);

  const items = actions.map((a) => ({
    label: a.label,
    icon: a.icon,
    command: a.onClick
  }));

  return (
    <div className="inline-flex">
      <CustButtons
        icon={icon}
        className="p-button-text p-button-plain"
        onClick={(e) => menuRef.current.toggle(e)}
      />
      <Menu model={items} popup ref={menuRef} />
    </div>
  );
};

export default CustActionMenu;

import { useContext, useState } from "react";
import { List } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import { LoginContext } from "../../contexts/LoginContext";
import SidebarListItem from "./SidebarListItem";
import SidebarGroupList from "./SidebarGroupList";

export interface SidebarMenu {
  url?: string;
  title: string;
  icon?: any;
  submenu?: any[];
}

const SidebarList = () => {
  const [open, setOpen] = useState<boolean>(false);

  const { getUserData } = useContext(LoginContext);

  const isAdmin = getUserData()?.role === "admin";

  const toggleExpand = () => {
    setOpen(!open);
  };

  let menu: SidebarMenu[] = [];

  if (isAdmin) {
    menu = [
      ...menu,
      ...[
        {
          url: "/dashboard",
          title: "داشبورد",
          icon: DashboardIcon,
        },
        {
          url: "/promoters",
          title: "بازاریاب ها",
          icon: PeopleAltIcon,
        },
        {
          title: "مدیریت کاربران",
          icon: PersonIcon,
          submenu: [
            { url: "/users", title: "لیست کاربران", icon: PersonIcon },
            { url: "/signup", title: "ثبت نام", icon: PersonIcon },
          ],
        },
      ],
    ];
  }

  return (
    <>
      {menu.map((item, index) => {
        return (
          <List
            sx={{ width: "100%" }}
            key={index}
            disablePadding
            subheader={
              item.submenu ? (
                <SidebarListItem
                  item={item}
                  isGroup
                  open={open}
                  toggleExpand={toggleExpand}
                />
              ) : null
            }
          >
            {item.submenu ? (
              <SidebarGroupList menu={item.submenu} open={open} />
            ) : (
              <SidebarListItem item={item} />
            )}
          </List>
        );
      })}
    </>
  );
};

export default SidebarList;

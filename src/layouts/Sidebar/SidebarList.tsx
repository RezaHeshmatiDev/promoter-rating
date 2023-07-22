import { useContext, useRef } from "react";
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
  const sidebarGroupListRefs = useRef<any[]>([]);
  const { getUserData } = useContext(LoginContext);

  const isAdmin = getUserData()?.role === "admin";

  const toggleExpand = (index: number) => {
    sidebarGroupListRefs.current[index].toggle();
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
          title: "گزارشات",
          icon: PeopleAltIcon,
          submenu: [
            {
              url: "/promoters-analysis",
              title: "عملکرد بازاریاب ها",
              icon: PeopleAltIcon,
            },
            {
              url: "/sales",
              title: "فروش",
              icon: PeopleAltIcon,
            },
          ],
        },
        {
          title: "اطلاعات پایه",
          icon: PersonIcon,
          submenu: [
            { url: "/users", title: "کاربران", icon: PersonIcon },
            {
              url: "/promoters",
              title: "بازاریاب ها",
              icon: PeopleAltIcon,
            },
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
            key={index}
            sx={{ width: "100%" }}
            disablePadding
            subheader={
              item.submenu ? (
                <SidebarListItem
                  item={item}
                  isGroup
                  toggle={() => toggleExpand(index)}
                />
              ) : null
            }
          >
            {item.submenu ? (
              <SidebarGroupList
                ref={(ref) => (sidebarGroupListRefs.current[index] = ref)}
                menu={item.submenu}
              />
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

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Drawer,
  useTheme,
  MenuItem,
  Typography,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import { SidebarContext } from "../../contexts/SidebarContext";
import { removeUser } from "../../utils/tokenFuncs";
import { LoginContext } from "../../contexts/LoginContext";

const Sidebar = () => {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const { getUserData } = useContext(LoginContext);
  const closeSidebar = () => toggleSidebar();

  const navigate = useNavigate();

  const theme = useTheme();

  const isAdmin = getUserData()?.role === "admin";

  const SidebarList = isAdmin
    ? [
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
          url: "/users",
          title: "مدیریت کاربران",
          icon: PersonIcon,
        },
        {
          url: "/signup",
          title: "ثبت نام",
          icon: PersonIcon,
        },
        // submenu: [
        //   { url: "/users", title: "کاربران", icon: PersonIcon },
        //   { url: "/signup", title: "ثبت نام", icon: PersonIcon },
        // ],
      ]
    : [];

  const onClickLogout = () => {
    removeUser();
    window.location.replace("/");
  };

  return (
    <Drawer
      anchor={theme.direction === "ltr" ? "right" : "left"}
      open={sidebarToggle}
      onClose={closeSidebar}
      variant="temporary"
      elevation={9}
    >
      <Box width={200}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography my={4} variant="h4">
            {"اپلیکیشن"}
          </Typography>
          {SidebarList.map((item) => {
            const Icon = item.icon;

            const onClickItem = () => {
              if (item.url) {
                closeSidebar();
                navigate(item.url);
              }
            };

            return (
              <MenuItem
                sx={{ width: "100%" }}
                key={item.url}
                onClick={onClickItem}
              >
                <ListItemIcon>
                  <Icon fontSize={"small"} />
                </ListItemIcon>
                <ListItemText>{item.title}</ListItemText>
              </MenuItem>
            );
          })}
          <Box position={"absolute"} bottom={"20px"}>
            <Button
              onClick={onClickLogout}
              variant={"contained"}
              color={"error"}
            >
              {"خروج از حساب کاربری"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;

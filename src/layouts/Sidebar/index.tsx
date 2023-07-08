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
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import { SidebarContext } from "../../contexts/SidebarContext";

const Sidebar = () => {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const closeSidebar = () => toggleSidebar();

  const navigate = useNavigate();

  const theme = useTheme();

  const SidebarList = [
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
      url: "/signup",
      title: "ثبت نام",
      icon: PersonIcon,
    },
  ];

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
              closeSidebar();
              navigate(item.url);
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
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;

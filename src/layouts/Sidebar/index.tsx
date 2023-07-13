import { useContext } from "react";
import { Box, Drawer, useTheme, Typography, Button } from "@mui/material";

import { SidebarContext } from "../../contexts/SidebarContext";
import { removeUser } from "../../utils/tokenFuncs";
import { LoginContext } from "../../contexts/LoginContext";
import SidebarList from "./SidebarList";

const Sidebar = () => {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const { getUserData } = useContext(LoginContext);
  const closeSidebar = () => toggleSidebar();

  const theme = useTheme();

  const isAdmin = getUserData()?.role === "admin";

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
      <Box width={220}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box
            my={4}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Typography textAlign={"center"}>
              {`نام کاربر: `}
              <Typography fontWeight={"bold"} display={"inline-block"}>
                {getUserData()?.fullName}
              </Typography>
            </Typography>
            {!isAdmin && (
              <Typography>
                {`صندوق: `}
                <Typography
                  variant="h6"
                  fontWeight={"bold"}
                  display={"inline-block"}
                >
                  {getUserData()?.cash?.name}
                </Typography>
              </Typography>
            )}
          </Box>
          <SidebarList />
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

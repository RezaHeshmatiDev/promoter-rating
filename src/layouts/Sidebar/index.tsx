import { useContext } from "react";
import { Box, Drawer, useTheme, Typography } from "@mui/material";

import { SidebarContext } from "../../contexts/SidebarContext";

const Sidebar = () => {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const closeSidebar = () => toggleSidebar();

  const theme = useTheme();

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
          height={100}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography variant={"h5"}>{"اپلیکیشن"}</Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;

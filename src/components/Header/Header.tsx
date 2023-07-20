import { ReactNode, useContext } from "react";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuIcon from "@mui/icons-material/Menu";

import { HeaderHeight } from "../../utils/Constants";
import Sidebar from "../../layouts/Sidebar";
import { SidebarContext } from "../../contexts/SidebarContext";
import { HeaderContext } from "../../contexts/HeaderContext";

export interface HeaderProps {
  title?: string | ReactNode;
  hasMenu?: boolean;
  hasPrint?: boolean;
  hasBack?: boolean;
  onClickBack?(): void;
  rightContent?: ReactNode | ReactNode[];
  leftContent?: ReactNode | ReactNode[];
}

const Header = ({
  title,
  hasBack = true,
  onClickBack,
  rightContent,
  leftContent,
}: HeaderProps) => {
  const { toggleSidebar } = useContext(SidebarContext);
  const { getHeaderData } = useContext(HeaderContext);

  const navigate = useNavigate();

  const theme = useTheme();

  const back = () => {
    if (onClickBack) {
      onClickBack();
      return;
    }

    /**
     * Default
     */
    navigate(-1);
  };

  const headerTitle = title || getHeaderData().description;

  return (
    <Grid
      container
      alignItems={"center"}
      display={"flex"}
      paddingX={1}
      position={"fixed"}
      top={0}
      height={HeaderHeight}
      zIndex={3}
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
      }}
    >
      <Box flex={0.5}>
        <MenuIcon onClick={toggleSidebar} />
        {!!rightContent && rightContent}
      </Box>
      <Box flex={1} display={"flex"} justifyContent={"center"}>
        <Typography>{headerTitle}</Typography>
      </Box>
      <Box flex={0.5} display={"flex"} justifyContent={"flex-end"}>
        {hasBack && <ArrowBackIcon onClick={back} />}
        {!!leftContent && leftContent}
      </Box>

      <Sidebar />
    </Grid>
  );
};

export default Header;

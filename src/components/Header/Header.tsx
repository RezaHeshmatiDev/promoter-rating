import { ReactNode } from "react";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { HeaderHeight } from "../../utils/Constants";

export interface HeaderProps {
  title: string;
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
      <Box flex={0.5}>{!!rightContent && rightContent}</Box>
      <Box flex={1} display={"flex"} justifyContent={"center"}>
        <Typography>{title}</Typography>
      </Box>
      <Box flex={0.5} display={"flex"} justifyContent={"flex-end"}>
        {hasBack && <ArrowBackIcon onClick={back} />}
        {!!leftContent && leftContent}
      </Box>
    </Grid>
  );
};

export default Header;

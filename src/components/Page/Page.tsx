import { ReactNode } from "react";
import { Box, SxProps } from "@mui/material";

import Header, { HeaderProps } from "../../components/Header/Header";
import { HeaderHeight } from "../../utils/Constants";

interface Props extends HeaderProps {
  children?: ReactNode | ReactNode[];
  sx?: SxProps;
}

const Page = ({ children, sx, ...props }: Props) => {
  return (
    <>
      <Header {...props} />
      <Box sx={sx} style={{ paddingTop: HeaderHeight }}>
        {children}
      </Box>
    </>
  );
};

export default Page;

import { ReactNode } from "react";
import { Box, SxProps } from "@mui/material";

import Header, { HeaderProps } from "../../components/Header/Header";
import { HeaderProvider } from "../../contexts/HeaderContext";
import { HeaderHeight } from "../../utils/Constants";

interface Props extends HeaderProps {
  children?: ReactNode | ReactNode[];
  sx?: SxProps;
  invisibleHeader?: boolean
}

const Page = ({ children, sx, invisibleHeader, ...props }: Props) => {
  return (
    <HeaderProvider>
      {!invisibleHeader && <Header {...props} />}
      <Box sx={sx} style={{ paddingTop: invisibleHeader ? 0 : HeaderHeight }}>
        {children}
      </Box>
    </HeaderProvider>
  );
};

export default Page;

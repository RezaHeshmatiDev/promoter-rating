import { Collapse } from "@mui/material";

import { SidebarMenu } from "./SidebarList";
import SidebarListItem from "./SidebarListItem";

interface Props {
  menu: SidebarMenu[];
  open: boolean;
}

const SidebarGroupList = ({ menu, open }: Props) => {
  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      {menu.map((element) => {
        return <SidebarListItem item={element} sx={{ pl: 4 }} />;
      })}
    </Collapse>
  );
};

export default SidebarGroupList;

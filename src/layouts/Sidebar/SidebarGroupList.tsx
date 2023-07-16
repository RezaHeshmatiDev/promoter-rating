import { Collapse } from "@mui/material";

import { SidebarMenu } from "./SidebarList";
import SidebarListItem from "./SidebarListItem";
import { forwardRef, useImperativeHandle, useState } from "react";

interface Props {
  menu: SidebarMenu[];
}

const SidebarGroupList = forwardRef(({ menu }: Props, ref) => {
  const [open, setOpen] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    toggle() {
      setOpen(!open);
    },
  }));

  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      {menu.map((element, index) => {
        return <SidebarListItem key={index} item={element} sx={{ pl: 5 }} />;
      })}
    </Collapse>
  );
});

export default SidebarGroupList;

import { useContext } from "react";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SxProps,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { SidebarContext } from "../../contexts/SidebarContext";
import { SidebarMenu } from "./SidebarList";

interface Props {
  item: SidebarMenu;
  isGroup?: boolean;
  toggleExpand?(): void;
  open?: boolean;
  sx?: SxProps;
}

const SidebarListItem = ({
  item,
  isGroup = false,
  toggleExpand,
  open,
  sx,
}: Props) => {
  const { toggleSidebar } = useContext(SidebarContext);
  const closeSidebar = () => toggleSidebar();
  const navigate = useNavigate();

  const Icon = item.icon;

  const onClickItem = () => {
    if (item.url) {
      closeSidebar();
      navigate(item.url);
    } else {
      toggleExpand?.();
    }
  };

  return (
    <ListItemButton sx={sx} onClick={onClickItem}>
      <ListItemIcon sx={{ minWidth: 32 }}>
        <Icon fontSize={"small"} />
      </ListItemIcon>
      <ListItemText>{item.title}</ListItemText>
      {isGroup && (
        <ListItemIcon sx={{ display: "flex", justifyContent: "flex-end" }}>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemIcon>
      )}
    </ListItemButton>
  );
};

export default SidebarListItem;

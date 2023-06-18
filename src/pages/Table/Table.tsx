import { ReactNode } from "react";
import {
  Table as MaterialTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  SxProps,
} from "@mui/material";

interface Props {
  tableColumns: {
    text: string;
    align?: "inherit" | "left" | "center" | "right" | "justify";
  }[];
  sx?: SxProps;
  children: ReactNode | ReactNode[];
}

const Table = ({ tableColumns, sx, children }: Props) => {
  const align = "right";

  return (
    <TableContainer sx={{ maxHeight: 510, ...sx }}>
      <MaterialTable stickyHeader>
        <TableHead>
          <TableRow>
            {tableColumns.map((item, index) => {
              return (
                <TableCell key={index} align={item.align || align}>
                  <Typography fontWeight={"bold"}>{item.text}</Typography>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </MaterialTable>
    </TableContainer>
  );
};

export default Table;

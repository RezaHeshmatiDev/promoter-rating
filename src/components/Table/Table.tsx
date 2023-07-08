import { ReactNode, useEffect, useState } from "react";
import {
  Table as MaterialTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  SxProps,
  Box,
  SelectChangeEvent,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import NormalFilter from "./NormalFilter";
import MultipleFilters from "./MultipleFilters";

interface Props {
  tableColumns: {
    id: string;
    text: string;
    align?: "inherit" | "left" | "center" | "right" | "justify";
  }[];
  sx?: SxProps;
  children: ReactNode | ReactNode[];
  filters?: {
    id: string;
    text: string;
  }[];
  title?: string;
  onChange?(filter?: Filter, sort?: Sort): void;
}

export interface Sort {
  sort: string;
  asc: boolean;
}

export interface Filter {
  filterCol?: string;
  filterValue?: string;
}

const Table = ({
  tableColumns,
  sx,
  children,
  filters = [],
  onChange,
}: Props) => {
  const [selectedFilter, setSelectedFilter] = useState<Filter>();
  const [selectedSort, setSelectedSort] = useState<Sort>();

  useEffect(() => {
    if (selectedFilter || selectedSort)
      onChange?.(selectedFilter, selectedSort);
  }, [selectedSort]);

  useEffect(() => {
    if (selectedFilter || selectedSort)
      onChange?.(selectedFilter, selectedSort);
  }, [selectedFilter?.filterValue]);

  const handleSortChange = (value: string): void => {
    setSelectedSort((previousState) => ({
      sort: value,
      asc: previousState?.sort === value ? !previousState?.asc : true,
    }));
  };

  const handleFilterChange = (e: SelectChangeEvent<string>): void => {
    const value = e.target.value;
    setSelectedFilter({ filterCol: value, filterValue: "" });
  };

  const onSearch = (value: string) => {
    setSelectedFilter((previousFilter) => ({
      ...previousFilter,
      filterValue: value,
    }));
  };

  const align = "right";

  const ableToSearchTwoValues =
    selectedFilter?.filterCol === "rateSum" ||
    selectedFilter?.filterCol === "invoiceCount";

  return (
    <>
      {ableToSearchTwoValues ? (
        <MultipleFilters
          filters={filters}
          onSearch={onSearch}
          selectedFilter={selectedFilter}
          handleFilterChange={handleFilterChange}
        />
      ) : (
        <NormalFilter
          filters={filters}
          onSearch={onSearch}
          selectedFilter={selectedFilter}
          handleFilterChange={handleFilterChange}
        />
      )}

      <TableContainer sx={{ maxHeight: 510, ...sx }}>
        <MaterialTable stickyHeader>
          <TableHead>
            <TableRow>
              {tableColumns.map((item) => {
                const Icon = selectedSort?.asc
                  ? KeyboardArrowUpIcon
                  : KeyboardArrowDownIcon;

                return (
                  <TableCell
                    key={item.id}
                    align={item.align || align}
                    onClick={() => handleSortChange(item.id)}
                  >
                    <Box display={"flex"} alignItems={"center"}>
                      <Typography fontWeight={"bold"} mr={1}>
                        {item.text}
                      </Typography>
                      <Icon
                        fontSize="medium"
                        sx={{
                          opacity: selectedSort?.sort === item.id ? 1 : 0,
                        }}
                      />
                    </Box>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </MaterialTable>
      </TableContainer>
    </>
  );
};

export default Table;

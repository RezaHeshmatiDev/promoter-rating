import { ReactNode, useEffect, useState, useRef } from "react";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  SelectChangeEvent,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import SearchBox from "../../components/SearchBox";

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
  const searchRef = useRef<any>(null);

  useEffect(() => {
    onChange?.(selectedFilter, selectedSort);
  }, [selectedSort]);

  useEffect(() => {
    if (!selectedFilter?.filterValue) return;

    onChange?.(selectedFilter, selectedSort);
  }, [selectedFilter]);

  let selectedFilterText = "";
  if (filters.length > 0) {
    selectedFilterText =
      filters.find((item) => item.id === selectedFilter?.filterCol)?.text || "";
  }

  const handleSortChange = (value: string): void => {
    setSelectedSort((previousState) => ({
      sort: value,
      asc: previousState?.sort === value ? !previousState?.asc : true,
    }));
  };

  const handleFilterChange = (e: SelectChangeEvent<string>): void => {
    const value = e.target.value;
    searchRef.current.setValue("");
    setSelectedFilter({ filterCol: value, filterValue: "" });
  };

  const onSearch = (value: string) => {
    setSelectedFilter((previousFilter) => ({
      ...previousFilter,
      filterValue: value,
    }));
  };

  const align = "right";

  return (
    <>
      <Grid container spacing={2} mb={1}>
        {filters.length > 0 && (
          <>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Box>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>{"فیلتر ها"}</InputLabel>
                  <Select
                    value={selectedFilter?.filterCol}
                    onChange={handleFilterChange}
                    label={"فیلتر ها"}
                    autoWidth
                  >
                    {filters.map((filter) => (
                      <MenuItem key={filter.id} value={filter.id}>
                        {filter.text}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <SearchBox
                ref={searchRef}
                onSearch={onSearch}
                placeholder={
                  selectedFilterText
                    ? `جستجو بر اساس ${selectedFilterText}`
                    : ""
                }
              />
            </Grid>
          </>
        )}
      </Grid>
      <TableContainer sx={{ maxHeight: 510, ...sx }}>
        <MaterialTable stickyHeader>
          <TableHead>
            <TableRow>
              {tableColumns.map((item, index) => {
                const Icon = selectedSort?.asc
                  ? KeyboardArrowUpIcon
                  : KeyboardArrowDownIcon;

                return (
                  <TableCell
                    key={index}
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

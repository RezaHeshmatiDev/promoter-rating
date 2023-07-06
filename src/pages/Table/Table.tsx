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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  SelectChangeEvent,
} from "@mui/material";
import SearchBox from "../../components/SearchBox";

interface Props {
  tableColumns: {
    text: string;
    align?: "inherit" | "left" | "center" | "right" | "justify";
  }[];
  sx?: SxProps;
  children: ReactNode | ReactNode[];
  sorts?: {
    id: string;
    text: string;
  }[];
  filters?: {
    id: string;
    text: string;
  }[];
  title?: string;
  onChange?(filter?: RequestedFilter, sort?: string): void;
}

export interface RequestedFilter {
  filterCol: string;
  filterValue?: string;
}

const Table = ({
  tableColumns,
  sx,
  children,
  sorts = [],
  filters = [],
  onChange,
}: Props) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [selectedSort, setSelectedSort] = useState<string>("");

  useEffect(() => {
    let filter: RequestedFilter | undefined;
    if (selectedFilter) {
      filter = { filterCol: selectedFilter };
    }
    if (!!filter || !!selectedSort) {
      onChange?.(filter, selectedSort);
    }
  }, [selectedSort]);

  let selectedFilterText = "";
  if (filters.length > 0) {
    selectedFilterText =
      filters.find((item) => item.id === selectedFilter)?.text || "";
  }

  const handleSortChange = (
    e: SelectChangeEvent<typeof selectedSort>
  ): void => {
    const value = e.target.value;
    setSelectedSort(value);
  };

  const handleFilterChange = (
    e: SelectChangeEvent<typeof selectedFilter>
  ): void => {
    const value = e.target.value;
    setSelectedFilter(value);
  };

  const onSearch = (value: string) => {
    const filter: RequestedFilter = {
      filterCol: selectedFilter,
      filterValue: value,
    };
    onChange?.(filter, selectedSort);
  };

  const align = "right";

  return (
    <>
      <Grid container spacing={2} mb={1}>
        {sorts.length > 0 && (
          <Grid item xs={12}>
            <Box>
              <FormControl fullWidth variant="outlined">
                <InputLabel>{"مرتب سازی"}</InputLabel>
                <Select
                  value={selectedSort}
                  onChange={handleSortChange}
                  label={"مرتب سازی"}
                  autoWidth
                >
                  {sorts.map((sort) => (
                    <MenuItem key={sort.id} value={sort.id}>
                      {sort.text}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
        )}
        {filters.length > 0 && (
          <>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Box>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>{"فیلتر ها"}</InputLabel>
                  <Select
                    value={selectedFilter}
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
    </>
  );
};

export default Table;

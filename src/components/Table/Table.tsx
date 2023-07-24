import { ReactNode, useEffect, useState, useContext } from "react";
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
  Grid,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import MultipleFilters from "./MultipleFilters";
import NormalFilter from "./NormalFilter";
import Error from "../Error/Error";
import { FilterContext } from "../../contexts/FilterContext";

interface Props {
  tableColumns: {
    id: string;
    text: string;
    align?: "inherit" | "left" | "center" | "right" | "justify";
    unsortable?: boolean;
  }[];
  sx?: SxProps;
  children: ReactNode | ReactNode[];
  filters?: {
    id: string;
    text: string;
  }[];
  title?: string;
  onChange?(filter?: Filter, sort?: Sort): void;
  error?: boolean;
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
  error = false,
}: Props) => {
  const { getFilter, clearFilters, selectedFilterChanged } =
    useContext(FilterContext);

  const [selectedFilter, setSelectedFilter] = useState<Filter | undefined>(
    getFilter()
  );
  const [selectedSort, setSelectedSort] = useState<Sort>();

  useEffect(() => {
    onChange?.(selectedFilter, selectedSort);
  }, [selectedSort]);

  const handleSortChange = (value: string): void => {
    setSelectedSort((previousState) => ({
      sort: value,
      asc: previousState?.sort === value ? !previousState?.asc : true,
    }));
  };

  const handleFilterChange = (e?: SelectChangeEvent<string>): void => {
    if (!e) {
      setSelectedFilter(undefined);
      onChange?.(undefined, selectedSort);
      clearFilters();
      return;
    }

    // Reset filter
    if (
      selectedFilter?.filterValue &&
      selectedFilter?.filterValue?.length > 0
    ) {
      onChange?.(undefined, selectedSort);
      clearFilters();
    }

    const value = e.target.value;
    const filter = { filterCol: value, filterValue: "" };
    setSelectedFilter(filter);
    selectedFilterChanged(filter);
  };

  const onSearch = (value: string) => {
    setSelectedFilter((previousFilter) => ({
      ...previousFilter,
      filterValue: value,
    }));
    selectedFilterChanged({ ...selectedFilter, filterValue: value });
    onChange?.({ ...selectedFilter, filterValue: value }, selectedSort);
  };

  const tryAgain = () => {
    onChange?.(selectedFilter, selectedSort);
  };

  const align = "center";

  const ableToSearchTwoValues =
    selectedFilter?.filterCol === "rateSum" ||
    selectedFilter?.filterCol === "invoiceDate" ||
    selectedFilter?.filterCol === "invoiceCount" ||
    selectedFilter?.filterCol === "rateAvg";

  return (
    <>
      {ableToSearchTwoValues ? (
        <Grid item xs={12} sm={12} md={9} lg={10}>
          <MultipleFilters
            filters={filters}
            onSearch={onSearch}
            selectedFilter={selectedFilter}
            handleFilterChange={handleFilterChange}
          />
        </Grid>
      ) : (
        <Grid item xs={12} sm={12} md={9} lg={10}>
          <NormalFilter
            filters={filters}
            onSearch={onSearch}
            selectedFilter={selectedFilter}
            handleFilterChange={handleFilterChange}
          />
        </Grid>
      )}

      {error ? (
        <Error tryAgain={tryAgain} />
      ) : (
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
                      onClick={() => {
                        if (!item.unsortable) handleSortChange(item.id);
                      }}
                    >
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={item.align || align}
                      >
                        <Typography fontWeight={"bold"}>{item.text}</Typography>
                        {selectedSort?.sort === item.id && (
                          <Icon sx={{ ml: 1 }} fontSize="medium" />
                        )}
                      </Box>
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>{children}</TableBody>
          </MaterialTable>
        </TableContainer>
      )}
    </>
  );
};

export default Table;

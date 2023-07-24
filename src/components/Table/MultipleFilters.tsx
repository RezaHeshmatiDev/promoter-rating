import { useRef, useEffect } from "react";
import {
  Grid,
  Box,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button,
  SelectChangeEvent,
} from "@mui/material";

import { Filter } from "./Table";
import SearchBox from "../SearchBox";

interface Props {
  filters?: {
    id: string;
    text: string;
  }[];
  selectedFilter?: Filter;
  handleFilterChange(e?: SelectChangeEvent<string>): void;
  onSearch(value: string): void;
}

const MultipleFilters = ({
  filters,
  selectedFilter,
  handleFilterChange,
  onSearch,
}: Props) => {
  const fromSearchRef = useRef<any>(null);
  const toSearchRef = useRef<any>(null);

  useEffect(() => {
    const searchValue = selectedFilter?.filterValue?.split(":");
    if (searchValue) {
      fromSearchRef.current.setValue(searchValue[0]);
      toSearchRef.current.setValue(searchValue[1]);
    }
  }, []);

  if (!filters || filters.length === 0) {
    return null;
  }

  const responsive = {
    xs: 12,
    sm: 4,
    md: 3,
    lg: 3.5,
  };

  const onClickSearch = () => {
    const fromValue = fromSearchRef.current?.getValue();
    const toValue = toSearchRef.current?.getValue();
    onSearch(fromValue + ":" + toValue);
  };

  const clearFilters = () => {
    if (selectedFilter) filterChanged();
  };

  const filterChanged = (e?: SelectChangeEvent<string>) => {
    fromSearchRef.current.setValue("");
    toSearchRef.current.setValue("");
    handleFilterChange(e);
  };

  return (
    <Grid container spacing={2} mb={1}>
      <Grid item {...responsive}>
        <Box>
          <FormControl fullWidth variant="outlined">
            <InputLabel>{"فیلتر ها"}</InputLabel>
            <Select
              value={selectedFilter?.filterCol || ""}
              onChange={filterChanged}
              label={"فیلتر ها"}
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
      <Grid item {...responsive}>
        <SearchBox ref={fromSearchRef} placeholder={"جستجو از"} />
      </Grid>
      <Grid item {...responsive}>
        <SearchBox ref={toSearchRef} placeholder={"جستجو تا"} />
      </Grid>

      <Grid item lg={1.5} md={3} sm={4} display={"flex"} alignItems={"center"}>
        <Button variant="contained" onClick={onClickSearch}>
          {"جستجو"}
        </Button>
        <Button
          color={"error"}
          sx={{ ml: 1, paddingRight: "8px", paddingLeft: "8px" }}
          variant="contained"
          onClick={clearFilters}
        >
          {"حذف فیلتر"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default MultipleFilters;

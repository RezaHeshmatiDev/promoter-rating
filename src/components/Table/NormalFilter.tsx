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

const NormalFilter = ({
  filters,
  selectedFilter,
  handleFilterChange,
  onSearch,
}: Props) => {
  const searchRef = useRef<any>(null);

  useEffect(() => {
    if (selectedFilter?.filterValue) {
      searchRef.current?.setValue(selectedFilter?.filterValue);
    }
  }, []);

  if (!filters || filters.length === 0) {
    return null;
  }

  const responsive = {
    xs: 12,
    sm: 4,
    md: 4.5,
    lg: 5,
  };

  let selectedFilterText = "";
  if (filters.length > 0) {
    selectedFilterText =
      filters.find((item) => item.id === selectedFilter?.filterCol)?.text || "";
  }

  const onClickSearch = () => {
    const value = searchRef.current.getValue();
    onSearch(value);
  };

  const clearFilters = () => {
    if (selectedFilter) filterChanged();
  };

  const filterChanged = (e?: SelectChangeEvent<string>) => {
    searchRef.current.setValue("");
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
        <SearchBox
          ref={searchRef}
          placeholder={
            selectedFilterText ? `جستجو بر اساس ${selectedFilterText}` : ""
          }
        />
      </Grid>

      <Grid item lg={2} md={3} sm={4} display={"flex"} alignItems={"center"}>
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

export default NormalFilter;

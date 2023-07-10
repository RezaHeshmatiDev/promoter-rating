import { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  Box,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

import SearchBox from "../../components/SearchBox";
import { Promoter } from "../../utils/Interfaces";
import { apiGetAllPromoters } from "../../services/api/PromotersApi";
import LoadingModal from "../../components/LoadingModal";

interface Props {
  promoterId?: number;
  handlePrmoterChange(event: SelectChangeEvent<number>): void;
}

const PromotersDropDown = ({ promoterId, handlePrmoterChange }: Props) => {
  const [promoters, setPromoters] = useState<Promoter[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getPromoters();
  }, []);

  const getPromoters = (value?: string) => {
    apiGetAllPromoters({ filterCol: "promoterName", filterValue: value })
      .then((result) => setPromoters(result))
      .finally(() => setLoading(false));
  };

  const onSearchPromoters = (value: string) => {
    setLoading(true);
    getPromoters(value);
  };

  return (
    <>
      <FormControl fullWidth variant="outlined">
        <InputLabel id="select-promoter-label">{"بازاریاب ها"}</InputLabel>
        <Select
          id="select-promoter"
          labelId="select-promoter-label"
          value={promoterId}
          onChange={handlePrmoterChange}
          label="بازاریاب ها"
        >
          <Box p={1}>
            <SearchBox
              placeholder={"جستجو"}
              size={"small"}
              hasSearch
              onSearch={onSearchPromoters}
            />
          </Box>
          {promoters.map((item: Promoter) => {
            return (
              <MenuItem
                key={item.promoterID}
                value={item.promoterID}
                onKeyDown={(e) => e.stopPropagation()}
              >
                {item.promoterName}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <LoadingModal visible={loading} />
    </>
  );
};

export default PromotersDropDown;

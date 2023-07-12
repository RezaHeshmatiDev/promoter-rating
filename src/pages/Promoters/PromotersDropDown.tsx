import { useState, useEffect } from "react";
import { FormControl, Autocomplete, TextField } from "@mui/material";

import { AutocompleteOption, Promoter } from "../../utils/Interfaces";
import { apiGetAllPromoters } from "../../services/api/PromotersApi";
import LoadingModal from "../../components/LoadingModal";

interface Props {
  selectedPromoter: AutocompleteOption;
  handlePromoterChanged(promoter: AutocompleteOption): void;
}

const PromotersDropDown = ({
  selectedPromoter,
  handlePromoterChanged,
}: Props) => {
  const [promoters, setPromoters] = useState<AutocompleteOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getPromoters();
  }, []);

  const getPromoters = () => {
    apiGetAllPromoters()
      .then((result) => {
        const options = result.map((item: Promoter) => {
          return {
            id: item.promoterID,
            label: item.promoterName,
          };
        });
        setPromoters(options);
      })
      .finally(() => setLoading(false));
  };

  const onChange = (_event: unknown, value: AutocompleteOption | null) => {
    if (value?.id) {
      handlePromoterChanged(value);
    }
  };

  return (
    <>
      <FormControl fullWidth variant="outlined">
        <Autocomplete
          id="select-promoter"
          onChange={onChange}
          options={promoters}
          value={selectedPromoter}
          isOptionEqualToValue={(option, value) => value.id == option.id}
          renderInput={(params) => (
            <TextField {...params} label="بازاریاب ها" />
          )}
        />
      </FormControl>

      <LoadingModal visible={loading} />
    </>
  );
};
export default PromotersDropDown;

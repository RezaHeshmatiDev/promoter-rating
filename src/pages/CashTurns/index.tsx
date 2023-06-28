import { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { apiGetCacheTurns } from "../../services/api/Api";
import { CashTurn } from "../../utils/Interfaces";
import Page from "../../components/Page/Page";
import LoadingModal from "../../components/LoadingModal";

const CashTurns = () => {
  const [cashTurns, setCashTurns] = useState<CashTurn[]>([]);
  const [selectedCashTurn, setSelectedCashTurn] = useState<number | string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const theme = useTheme();

  const navigate = useNavigate();

  useEffect(() => {
    getCashTurns();
  }, []);

  const getCashTurns = async () => {
    setLoading(true);
    apiGetCacheTurns()
      .then((result) => setCashTurns(result))
      .finally(() => setLoading(false));
  };

  const handleCashTurnChange = (
    event: SelectChangeEvent<typeof selectedCashTurn>
  ) => {
    setSelectedCashTurn(event.target.value);
  };

  const onClickConfirm = () => {
    const cashTurn = cashTurns.find((item) => item.id === selectedCashTurn);
    if (cashTurn?.id) {
      navigate(`/promoters-rating/${cashTurn.id}`);
    }
  };

  return (
    <Page title="اپلیکیشن" hasBack>
      <Box p={theme.spacing(3)} maxWidth={"500px"} m={"auto"}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="select-label-id">{"انتخاب صندوق"}</InputLabel>
          <Select
            id="simple-label"
            labelId="select-label-id"
            value={selectedCashTurn}
            onChange={handleCashTurnChange}
            label={"انتخاب صندوق"}
          >
            {cashTurns.map((item) => {
              return (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <Button
          onClick={onClickConfirm}
          variant="contained"
          fullWidth
          sx={{ mt: theme.spacing(3) }}
          disabled={!selectedCashTurn}
        >
          {"تائید"}
        </Button>
      </Box>

      <LoadingModal visible={loading} />
    </Page>
  );
};

export default CashTurns;

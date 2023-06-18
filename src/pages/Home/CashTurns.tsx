import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
  Button,
} from "@mui/material";

import { CashTurn } from "../../utils/Interfaces";

interface Props {
  cashTurns: CashTurn[];
  selectedCashTurn?: CashTurn;
  onCashTurnChanged(item: CashTurn): void;
  cashTurnConfirmed(item: CashTurn): void;
}

const CashTurns = ({
  selectedCashTurn,
  cashTurns,
  onCashTurnChanged,
  cashTurnConfirmed,
}: Props) => {
  const theme = useTheme();

  const handleCashTurnChange = (event: any) => {
    const item = cashTurns.find((el) => el.id === event.target.value);
    if (item) onCashTurnChanged(item);
  };

  const onClickConfirm = () => {
    if (selectedCashTurn) cashTurnConfirmed(selectedCashTurn);
  };

  return (
    <Box p={theme.spacing(3)} maxWidth={"500px"} m={"auto"}>
      <FormControl fullWidth variant="outlined">
        <InputLabel id="select-label-id">{"انتخاب صندوق"}</InputLabel>
        <Select
          id="simple-label"
          labelId="select-label-id"
          value={selectedCashTurn?.id || ""}
          onChange={handleCashTurnChange}
          label="انتخاب صندوق"
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
  );
};

export default CashTurns;

import { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import Page from "../../components/Page/Page";
import { apiGetPromoterDetails } from "../../services/api/Api";
import { Promoter } from "../../utils/Interfaces";
import {
  Box,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  List,
  MenuItem,
  Select,
  SelectChangeEvent,
  useTheme,
} from "@mui/material";
import LoadingModal from "../../components/LoadingModal";

const PromoterDetails = () => {
  const { id }: any = useParams();
  const { state } = useLocation();

  const { promoters } = state;

  const [promoterId, setPromoterId] = useState<number>(id);
  const [promoterDetails, setPromoterDetails] = useState<Promoter | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const theme = useTheme();

  const getDetails = useCallback(() => {
    setLoading(true);
    apiGetPromoterDetails(promoterId)
      .then((result: Promoter) => setPromoterDetails(result))
      .finally(() => setLoading(false));
  }, [promoterId]);

  useEffect(() => {
    if (promoterId) getDetails();
  }, [getDetails, promoterId]);

  const handlePrmoterChange = (event: SelectChangeEvent<typeof promoterId>) => {
    setPromoterId(event.target.value as number);
  };

  const toggleLoadingVisibility = () => {
    setLoading(!loading);
  };

  return (
    <Page title={"نام بازاریاب میاد اینجا"} hasBack={true}>
      <Box sx={{ p: theme.spacing(3) }}>
        <Card sx={{ borderRadius: 2 }}>
          <CardContent>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="select-promoter-label">
                {"انتخاب صندوق"}
              </InputLabel>
              <Select
                id="select-promoter"
                labelId="select-promoter-label"
                value={promoterId}
                onChange={handlePrmoterChange}
                label="انتخاب صندوق"
              >
                {promoters.map((item: Promoter) => {
                  return (
                    <MenuItem key={item.promoterID} value={item.promoterID}>
                      {item.promoterName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </CardContent>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent></CardContent>
          </Card>
        </Card>
      </Box>

      <LoadingModal
        visible={loading}
        toggleVisibility={toggleLoadingVisibility}
      />
    </Page>
  );
};

export default PromoterDetails;

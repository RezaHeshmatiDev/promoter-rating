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
  MenuItem,
  Select,
  SelectChangeEvent,
  useTheme,
  TableCell,
  Typography,
  TableRow,
  Avatar,
} from "@mui/material";
import LoadingModal from "../../components/LoadingModal";
import Table from "../Table/Table";

const PromoterDetails = () => {
  const { id }: any = useParams();
  const { state } = useLocation();

  const { promoters }: { promoters: Promoter[] } = state;

  const [promoterId, setPromoterId] = useState<number>(id);
  const [promoterDetails, setPromoterDetails] = useState<Promoter[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const theme = useTheme();

  const getDetails = useCallback(() => {
    setLoading(true);
    apiGetPromoterDetails(promoterId)
      .then((result: Promoter[]) => setPromoterDetails(result))
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

  const headerTitle = promoterDetails[0]?.promoterName;

  return (
    <Page title={headerTitle} hasBack={true}>
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
            <CardContent>
              <Table
                tableColumns={[
                  { text: "شناسه" },
                  { text: "نام فروشنده" },
                  { text: "شناسه فاکتور" },
                  { text: "مجموع امتیاز" },
                  { text: "نام مشتری" },
                ]}
              >
                {promoterDetails.map((item) => {
                  return <ListItem key={item.promoterID} item={item} />;
                })}

                <LoadingModal visible={loading} />
              </Table>
            </CardContent>
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

const ListItem = ({
  item,
  onClickItem,
}: {
  item: Promoter;
  onClickItem?(): void;
}) => {
  return (
    <TableRow hover onClick={onClickItem}>
      <TableCell>
        <Typography>{item.promoterID}</Typography>
      </TableCell>
      <TableCell>
        <Box display={"flex"} alignItems={"center"}>
          <Avatar
            variant={"square"}
            src={item.promoterAvatar || ""}
            sx={{ height: "auto", width: "60px" }}
          />
          <Typography ml={1}>{item.promoterName}</Typography>
        </Box>
      </TableCell>
      <TableCell>
        <Typography>{item.invoiceID}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{item.rate}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{item.customerName}</Typography>
      </TableCell>
    </TableRow>
  );
};

export default PromoterDetails;

import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

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
import { baseURL } from "../../services/Axios";

interface Props {
  promoterName: string;
  promoterPhone: string;
  promoterID: number;
  data: Promoter[];
}

const PromoterDetails = () => {
  const { id }: any = useParams();
  const { state } = useLocation();

  const { promoters }: { promoters: Promoter[] } = state;

  const [promoterId, setPromoterId] = useState<number>(id);
  const [promoterDetails, setPromoterDetails] = useState<Props>();
  const [loading, setLoading] = useState<boolean>(false);

  const theme = useTheme();

  const navigate = useNavigate();

  const getDetails = useCallback(() => {
    setLoading(true);
    apiGetPromoterDetails(promoterId)
      .then((result: Props) => {
        setPromoterDetails(result);
      })
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

  const renderTitle = (
    <Box display={"flex"} alignItems={"center"}>
      <Avatar
        variant={"circular"}
        src={`${baseURL}static/images/promoters/${promoterDetails?.promoterID}.png`}
      />
      <Box ml={1}>
        <Typography color={theme.palette.common.white}>
          {promoterDetails?.promoterName}
        </Typography>
        <Typography variant={"caption"} color={theme.palette.common.white}>
          {promoterDetails?.promoterPhone}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Page title={renderTitle} hasBack={true}>
      <Box sx={{ p: theme.spacing(3) }}>
        <Card sx={{ borderRadius: 2 }}>
          <CardContent>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="select-promoter-label">
                {"بازاریاب ها"}
              </InputLabel>
              <Select
                id="select-promoter"
                labelId="select-promoter-label"
                value={promoterId}
                onChange={handlePrmoterChange}
                label="بازاریاب ها"
              >
                {promoters.map((item: Promoter, index: number) => {
                  return (
                    <MenuItem key={index} value={item.promoterID}>
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
                  { text: "شناسه فاکتور" },
                  { text: "تاریخ فاکتور" },
                  { text: "امتیاز" },
                  { text: "نام مشتری" },
                  { text: "شماره تماس مشتری" },
                  { text: "ملاحضات" },
                ]}
              >
                {promoterDetails?.data.map((item, index) => {
                  const onClickItem = () => {
                    navigate(
                      `/promoters/${promoterDetails.promoterID}/invoices/${item.invoiceID}`
                    );
                  };

                  return (
                    <ListItem
                      key={index}
                      item={item}
                      onClickItem={onClickItem}
                    />
                  );
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
    <TableRow>
      <TableCell onClick={onClickItem}>
        <Typography>{item.invoiceID}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{item.invoiceDate}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{item.rate}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{item.customerName}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{item.customerCellPhone}</Typography>
      </TableCell>
    </TableRow>
  );
};

export default PromoterDetails;

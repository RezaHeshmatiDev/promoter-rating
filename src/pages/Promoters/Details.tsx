import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
  Button,
} from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";

import Page from "../../components/Page/Page";
import { apiGetPromoterDetails } from "../../services/api/PromotersApi";
import { Promoter } from "../../utils/Interfaces";
import LoadingModal from "../../components/LoadingModal";
import Table, { Filter, Sort } from "../../components/Table/Table";
import { baseURL } from "../../services/Axios";
import NotesModal from "./NotesModal";

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
  const [hasError, setHasError] = useState<boolean>(false);

  const theme = useTheme();

  const navigate = useNavigate();

  useEffect(() => {
    if (promoterId) getDetails();
  }, [promoterId]);

  const getDetails = (filter?: Filter, sort?: Sort) => {
    setLoading(true);
    setHasError(false);
    apiGetPromoterDetails(promoterId, filter, sort)
      .then((result: Props) => {
        if (typeof result === "object") {
          setPromoterDetails(result);
        } else {
          handleError();
        }
      })
      .catch(handleError)
      .finally(() => setLoading(false));
  };

  const handleError = () => {
    setHasError(true);
    setPromoterDetails(undefined);
  };

  const handlePrmoterChange = (event: SelectChangeEvent<typeof promoterId>) => {
    setPromoterId(event.target.value as number);
  };

  const toggleLoadingVisibility = () => {
    setLoading(!loading);
  };

  const onChange = (filter: Filter, sort: Sort) => {
    console.log("onChange");
    getDetails(filter, sort);
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
                error={hasError}
                tableColumns={[
                  { id: "invoiceID", text: "شناسه فاکتور" },
                  { id: "invoiceDate", text: "تاریخ فاکتور" },
                  { id: "rate", text: "امتیاز" },
                  { id: "customerName", text: "نام مشتری" },
                  { id: "customerCellPhone", text: "شماره تماس مشتری" },
                  { id: "notes", text: "ملاحضات" },
                ]}
                filters={[
                  { id: "promoterID", text: "شناسه" },
                  { id: "promoterName", text: "نام فروشنده" },
                  { id: "inoviceID", text: "شناسه فاکتور" },
                  { id: "customerName", text: "نام مشتری" },
                  { id: "customerCellPhone", text: "شماره تماس مشتری" },
                ]}
                onChange={onChange}
              >
                {promoterDetails?.data.map((item) => {
                  const onClickItem = () => {
                    navigate(
                      `/promoters/${promoterDetails.promoterID}/invoices/${item.invoiceID}`
                    );
                  };

                  return (
                    <ListItem
                      key={item.invoiceID}
                      item={item}
                      onClickItem={onClickItem}
                      promoterID={promoterId}
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
  promoterID,
}: {
  item: Promoter;
  onClickItem?(): void;
  promoterID: number;
}) => {
  const [invoice, setInvoice] = useState<Promoter>(item);

  const notesModalRef = useRef<any>(null);

  const toggleNotesModal = () => {
    notesModalRef.current.toggleModal();
  };

  const onSubmitSuccess = (notes: string) => {
    setInvoice({ ...invoice, notes });
  };

  return (
    <TableRow>
      <TableCell onClick={onClickItem}>
        <Typography>{invoice.invoiceID}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{invoice.invoiceDate}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{invoice.rate}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{invoice.customerName}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{invoice.customerCellPhone}</Typography>
      </TableCell>
      <TableCell onClick={toggleNotesModal}>
        {invoice.notes ? (
          <Box display={"flex"}>
            <Typography mr={1}>{invoice.notes}</Typography>
            <EditTwoToneIcon />
          </Box>
        ) : (
          <Button variant={"contained"}>{"ثبت ملاحضات"}</Button>
        )}
      </TableCell>

      <NotesModal
        ref={notesModalRef}
        invoiceID={item.invoiceID}
        promoterID={promoterID}
        notes={invoice.notes}
        onSubmitSuccess={onSubmitSuccess}
      />
    </TableRow>
  );
};

export default PromoterDetails;

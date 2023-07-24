import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  useTheme,
  TableCell,
  Typography,
  TableRow,
  Avatar,
  Button,
  Grid,
} from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";

import Page from "../../components/Page/Page";
import { apiGetPromoterDetails } from "../../services/api/PromotersApi";
import { AutocompleteOption, Promoter } from "../../utils/Interfaces";
import LoadingModal from "../../components/LoadingModal";
import Table, { Filter, Sort } from "../../components/Table/Table";
import { baseURL } from "../../services/Axios";
import NotesModal from "./NotesModal";
import PromotersDropDown from "./PromotersDropDown";

interface Props {
  promoterName: string;
  promoterPhone: string;
  promoterID: number;
  data: Promoter[];
}

const PromoterDetails = () => {
  const { id }: any = useParams();

  const [promoterDetails, setPromoterDetails] = useState<Props>();
  const [selectedPromoter, setSelectedPromoter] = useState<AutocompleteOption>({
    id,
    label: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const theme = useTheme();

  const navigate = useNavigate();

  const getDetails = (promoterId: number, filter?: Filter, sort?: Sort) => {
    setLoading(true);
    setHasError(false);
    apiGetPromoterDetails(promoterId, filter, sort)
      .then((result: Props) => {
        if (typeof result === "object") {
          setSelectedPromoter({
            id: result.promoterID,
            label: result.promoterName,
          });
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

  const onChange = (filter: Filter, sort: Sort) => {
    getDetails(selectedPromoter.id, filter, sort);
  };

  const handlePromoterChanged = (promoter: AutocompleteOption) => {
    getDetails(promoter.id);
    setSelectedPromoter(promoter);
  };

  const renderTitle = (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      mb={3}
    >
      <Avatar
        variant={"circular"}
        src={`${baseURL}static/images/promoters/${promoterDetails?.promoterID}.png`}
        sx={{
          border: `1px solid ${theme.palette.common.black}`,
          width: "50px",
          height: "50px",
        }}
      />
      <Box ml={1}>
        <Typography>{promoterDetails?.promoterName}</Typography>
        <Typography variant={"caption"}>
          {promoterDetails?.promoterPhone}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Page hasBack={true}>
      <Box sx={{ p: theme.spacing(3) }}>
        {renderTitle}
        <Card sx={{ borderRadius: 2 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={3} lg={2}>
                <PromotersDropDown
                  selectedPromoter={selectedPromoter}
                  handlePromoterChanged={handlePromoterChanged}
                />
              </Grid>

              <Table
                error={hasError}
                tableColumns={[
                  { id: "invoiceID", text: "شناسه فاکتور" },
                  { id: "invoiceDate", text: "تاریخ فاکتور" },
                  { id: "rate", text: "امتیاز" },
                  { id: "customerName", text: "نام مشتری" },
                  { id: "customerCellPhone", text: "شماره تماس مشتری" },
                  { id: "notes", text: "ملاحظات" },
                ]}
                filters={[
                  { id: "invoiceID", text: "شناسه فاکتور" },
                  { id: "invoiceDate", text: "تاریخ فاکتور" },
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
                      promoterID={promoterDetails.promoterID}
                    />
                  );
                })}

                <LoadingModal visible={loading} />
              </Table>
            </Grid>
          </CardContent>
        </Card>
      </Box>

      <LoadingModal visible={loading} />
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
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Typography mr={1}>{invoice.notes}</Typography>
            <EditTwoToneIcon />
          </Box>
        ) : (
          <Button variant={"contained"}>{"ثبت ملاحظات"}</Button>
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

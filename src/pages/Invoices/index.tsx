import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  TableCell,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";

import Page from "../../components/Page/Page";
import Table, { Filter, Sort } from "../../components/Table/Table";
import { apiGetInvoices } from "../../services/api/CashsApi";
import LoadingModal from "../../components/LoadingModal";
import { Promoter } from "../../utils/Interfaces";

const Invoices = () => {
  const [invoices, setInvoices] = useState<Promoter[]>([]);
  const [customerName, setCustomerName] = useState<string>("");
  const [customerCellPhone, setCustomerCellPhone] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const { promoterID, invoiceID }: any = useParams();

  const theme = useTheme();

  const getInvoices = (filter?: Filter, sort?: Sort) => {
    setLoading(true);
    setHasError(false);
    apiGetInvoices(promoterID, invoiceID, filter, sort)
      .then(
        (result: {
          customerCellPhone: string;
          customerName: string;
          details: Promoter[];
          invoiceID: number;
        }) => {
          if (typeof result === "object") {
            setInvoices(result.details);
            setCustomerName(result.customerName);
            setCustomerCellPhone(result.customerCellPhone);
          } else {
            handleError();
          }
        }
      )
      .catch(handleError)
      .finally(() => setLoading(false));
  };

  const handleError = () => {
    setHasError(true);
    setInvoices([]);
  };

  const onChange = (filter: Filter, sort: Sort) => {
    getInvoices(filter, sort);
  };

  const renderTitle = (
    <Box>
      <Typography color={theme.palette.common.white}>{customerName}</Typography>
      <Typography variant={"caption"} color={theme.palette.common.white}>
        {customerCellPhone}
      </Typography>
    </Box>
  );

  return (
    <Page title={renderTitle}>
      <Box sx={{ p: theme.spacing(3) }}>
        <Card sx={{ borderRadius: 2 }}>
          <CardContent>
            <Table
              error={hasError}
              tableColumns={[
                { id: "promoterID", text: "شناسه" },
                { id: "promoterName", text: "نام بازاریاب" },
                { id: "name", text: "نام کالا" },
                { id: "barCode", text: "بارکد" },
              ]}
              onChange={onChange}
            >
              {invoices.map((item) => {
                return (
                  <ListItem
                    key={item.promoterID}
                    item={item}
                    promoterID={promoterID}
                  />
                );
              })}
            </Table>
          </CardContent>
        </Card>
      </Box>

      <LoadingModal visible={loading} />
    </Page>
  );
};

const ListItem = ({
  item,
  promoterID,
}: {
  item: Promoter;
  promoterID: number;
}) => {
  const theme = useTheme();

  return (
    <TableRow
      sx={{
        bgcolor:
          item.promoterID == promoterID ? theme.palette.primary.light : "",
      }}
    >
      <TableCell>
        <Typography>{item.promoterID}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{item.promoterName}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{item.name}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{item.barCode}</Typography>
      </TableCell>
    </TableRow>
  );
};

export default Invoices;

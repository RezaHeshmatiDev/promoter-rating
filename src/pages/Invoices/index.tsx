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
import Table, { RequestedFilter } from "../Table/Table";
import { apiGetInvoices } from "../../services/api/CashsApi";
import LoadingModal from "../../components/LoadingModal";
import { Promoter } from "../../utils/Interfaces";

const Invoices = () => {
  const [invoices, setInvoices] = useState<Promoter[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { promoterID, invoiceID }: any = useParams();

  const theme = useTheme();

  useEffect(() => {
    getInvoices();
  }, []);

  const getInvoices = (filter?: RequestedFilter, sort = "") => {
    setLoading(true);
    apiGetInvoices(promoterID, invoiceID, filter, sort)
      .then(
        (result: {
          customerCellPhone: string;
          customerName: string;
          details: Promoter[];
          invoiceID: number;
        }) => setInvoices(result.details)
      )
      .finally(() => setLoading(false));
  };

  const onChange = (filter: RequestedFilter, sort: string) => {
    getInvoices(filter, sort);
  };

  return (
    <Page title="اپلیکیشن">
      <Box sx={{ p: theme.spacing(3) }}>
        <Card sx={{ borderRadius: 2 }}>
          <CardContent>
            <Table
              tableColumns={[
                { text: "شناسه" },
                { text: "نام بازاریاب" },
                { text: "نام مشتری" },
                { text: "شماره همراه مشتری" },
                { text: "نام کالا" },
                { text: "بارکد" },
              ]}
              sorts={[
                { id: "promoterID", text: "شناسه" },
                { id: "promoterName", text: "نام بازاریاب" },
                { id: "customerName", text: "نام مشتری" },
                { id: "customerCellPhone", text: "شماره تماس مشتری" },
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
        <Typography>{item.customerName}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{item.customerCellPhone}</Typography>
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

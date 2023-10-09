import { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardHeader,
  Grid,
  List,
  ListItem,
  ListItemText,
  useTheme,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Typography,
} from "@mui/material";

import Page from "../../components/Page/Page";
import Chart from "../../components/Chart/Chart";
import {
  apiGetDashboardInvoices,
  apiGetDashboardPromoters,
} from "../../services/api/DashboardApi";
import { Promoter } from "../../utils/Interfaces";
import LoadingModal from "../../components/LoadingModal";
import { useNavigate } from "react-router-dom";

interface PromoterData {
  tops: Promoter[];
  bottoms: Promoter[];
}

export interface InvoiceData {
  0: InvoiceDataProps;
  1: InvoiceDataProps;
  2: InvoiceDataProps;
  3: InvoiceDataProps;
}

export interface InvoiceDataProps {
  allInvoicesCount: number;
  ratedInvoicesCount: number;
  unratedInvoices: number;
}

const Dashboard = () => {
  const [promoterData, setPromoterData] = useState<Partial<PromoterData>>({});
  const [invoiceData, setInvoiceData] = useState<Partial<InvoiceData>>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const theme = useTheme();

  const fetchData = () => {
    setLoading(true);
    Promise.all([getPromoterData(), getInvoiceData()])
      .then(([promoterResult, invoiceResult]) => {
        setPromoterData(promoterResult);
        setInvoiceData(invoiceResult);
      })
      .finally(() => setLoading(false));
  };

  const getPromoterData = async () => {
    return await apiGetDashboardPromoters();
  };

  const getInvoiceData = async () => {
    return await apiGetDashboardInvoices();
  };

  return (
    <Page hasBack={false}>
      <Container maxWidth={"sm"} sx={{ py: 4 }}>
        <Chart data={invoiceData} />

        <Grid container spacing={3}>
          <InvoiceTable data={invoiceData} />
          <DashboardPromotersItem
            bgcolor={theme.palette.success.light}
            title={"بهترین بازاریاب ها"}
            data={promoterData.tops || []}
          />
          <DashboardPromotersItem
            bgcolor={theme.palette.error.light}
            title={"ضعیف ترین بازاریاب ها"}
            data={promoterData.bottoms || []}
          />
        </Grid>
      </Container>

      <LoadingModal visible={loading} />
    </Page>
  );
};

const DashboardPromotersItem = ({
  data,
  title,
  bgcolor,
}: {
  data: Promoter[];
  title: string;
  bgcolor: string;
}) => {
  const navigate = useNavigate();

  return (
    <Grid item xs={12} sm={6}>
      <Card
        sx={{
          borderRadius: 2,
          bgcolor,
        }}
      >
        <CardHeader title={title} titleTypographyProps={{ variant: "h6" }} />
        <List>
          {data.map((item, index) => {
            const onClickItem = () => {
              navigate(`/promoters/${item.promoterID}`);
            };

            return (
              <ListItem key={item.promoterID} onClick={onClickItem}>
                <ListItemText>{`${index + 1}- ${
                  item.promoterName
                }`}</ListItemText>
                <ListItemText sx={{ textAlign: "right" }}>
                  {item.rateAvg.toFixed(2)}
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Card>
    </Grid>
  );
};

const InvoiceTable = ({ data }: { data: Partial<InvoiceData> }) => {
  const columns = ["", "کل فاکتور ها", "نظر داده شده", "نظر داده نشده"];
  const theme = useTheme();

  return (
    <TableContainer sx={{ mt: 4, ml: 3 }}>
      <Table
        sx={{
          "& .MuiTableCell-root": {
            border: `1px solid ${theme.palette.grey[500]}`,
          },
          bgcolor: theme.palette.grey[100],
        }}
      >
        <TableHead>
          <TableRow>
            {columns.map((item, index) => {
              return (
                <TableCell key={index}>
                  <Typography>{item}</Typography>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography>{"امروز"}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{data[0]?.allInvoicesCount}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{data[0]?.ratedInvoicesCount}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{data[0]?.unratedInvoices}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>{"دیروز"}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{data[1]?.allInvoicesCount}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{data[1]?.ratedInvoicesCount}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{data[1]?.unratedInvoices}</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Dashboard;

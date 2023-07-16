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
} from "@mui/material";

import Page from "../../components/Page/Page";
import Chart from "../../components/Chart/Chart";
import {
  apiGetDashboardInvoices,
  apiGetDashboardPromoters,
} from "../../services/api/DashboardApi";
import { Promoter } from "../../utils/Interfaces";
import LoadingModal from "../../components/LoadingModal";

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
    <Page title={"اپلیکیشن"} hasBack={false}>
      <Container maxWidth={"sm"} sx={{ py: 4 }}>
        <Chart data={invoiceData} />

        <Grid container spacing={3}>
          <DashboardInvoicesItem title={"دیروز"} data={invoiceData[1]} />
          <DashboardInvoicesItem title={"امروز"} data={invoiceData[0]} />
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
            return (
              <ListItem key={item.promoterID}>
                <ListItemText>{`${index + 1}- ${
                  item.promoterName
                }`}</ListItemText>
                <ListItemText sx={{ textAlign: "right" }}>
                  {item.rateAvg}
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Card>
    </Grid>
  );
};

const DashboardInvoicesItem = ({
  data,
  title,
}: {
  data?: InvoiceDataProps;
  title: string;
}) => {
  const theme = useTheme();

  return (
    <Grid item xs={12} sm={6}>
      <Card
        sx={{
          borderRadius: 2,
          bgcolor: theme.palette.grey[100],
        }}
      >
        <CardHeader title={title} titleTypographyProps={{ variant: "h6" }} />
        <List>
          <ListItem>
            <ListItemText>{"کل فاکتورها:‌"}</ListItemText>
            <ListItemText sx={{ textAlign: "right" }}>
              {data?.allInvoicesCount}
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>{"نظر داده شده:‌"}</ListItemText>
            <ListItemText sx={{ textAlign: "right" }}>
              {data?.allInvoicesCount}
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>{"نظر داده نشده:‌"}</ListItemText>
            <ListItemText sx={{ textAlign: "right" }}>
              {data?.allInvoicesCount}
            </ListItemText>
          </ListItem>
        </List>
      </Card>
    </Grid>
  );
};

export default Dashboard;

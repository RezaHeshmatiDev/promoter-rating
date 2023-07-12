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
  const [promoterData, setPromoterData] = useState<PromoterData | undefined>(
    undefined
  );
  const [invoiceData, setInvoiceData] = useState<InvoiceData | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(false);

  const theme = useTheme();

  useEffect(() => {
    fetchData();
  }, []);

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
      <Container maxWidth={"sm"} sx={{ my: 4 }}>
        <Chart data={invoiceData} />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                borderRadius: 2,
                bgcolor: theme.palette.grey[100],
              }}
            >
              <CardHeader title={"بهترین ها"} />
              <List>
                {promoterData?.tops.map((item, index) => {
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
          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                borderRadius: 2,
                bgcolor: theme.palette.grey[100],
              }}
            >
              <CardHeader title={"بدترین ها"} />
              <List>
                {promoterData?.bottoms.map((item, index) => {
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
        </Grid>
      </Container>

      <LoadingModal visible={loading} />
    </Page>
  );
};

export default Dashboard;

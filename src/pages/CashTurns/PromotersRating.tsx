import { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";

import { apiGetPromoters } from "../../services/api/CashsApi";
import LoadingModal from "../../components/LoadingModal";
import { Promoter } from "../../utils/Interfaces";
import Page from "../../components/Page/Page";
import Content from "./Content";

const PromotersRating = () => {
  const [promoters, setPromoters] = useState<Promoter[]>([]);
  const [invoiceID, setInvoiceID] = useState<number>(0);
  const [customerName, setCustomerName] = useState<string>("");
  const [cashName, setCashName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { cashTurnId, invoiceId }: any = useParams();

  useEffect(() => {
    getPromoters();
  }, []);

  const getPromoters = async () => {
    setLoading(true);
    apiGetPromoters(cashTurnId, invoiceId)
      .then((result) => {
        setPromoters(result.promoters);
        setInvoiceID(result.invoiceID);
        setCustomerName(result.customerName);
        setCashName(result.promoters[0].cashName);
      })
      .finally(() => setLoading(false));
  };

  const theme = useTheme();

  return (
    <Page hasBack={false}>
      <Box sx={{ p: theme.spacing(3) }}>
        <Card sx={{ borderRadius: 2 }}>
          <Box bgcolor={theme.palette.primary.main} p={theme.spacing(3)}>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-around"}
              color={theme.palette.common.white}
            >
              <Typography variant="h6">{`صندوق: ${cashName}`}</Typography>
              <Typography variant="h6">{`شماره فاکتور: ${invoiceID}`}</Typography>
              <Typography variant="h6">{`نام مشتری: ${customerName}`}</Typography>
            </Box>
          </Box>
          <CardContent>
            <Content promoters={promoters} />
          </CardContent>
        </Card>
      </Box>

      <Typography fontWeight={"bold"} px={3} pb={3}>
        {
          "لطفا با کلیک بر وضعیت های مشخص شده، به پرسنل مورد نظر امتیاز خود را ثبت کنید."
        }
      </Typography>

      <LoadingModal visible={loading} />
    </Page>
  );
};

export default PromotersRating;

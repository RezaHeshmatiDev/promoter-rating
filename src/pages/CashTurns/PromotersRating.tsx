import { useContext, useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";

import { apiGetPromoters } from "../../services/api/CashsApi";
import LoadingModal from "../../components/LoadingModal";
import { Promoter } from "../../utils/Interfaces";
import Page from "../../components/Page/Page";
import Content from "./Content";
import { SidebarContext } from "../../contexts/SidebarContext";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../../layouts/Sidebar";

const PromotersRating = () => {
  const [promoters, setPromoters] = useState<Promoter[]>([]);
  const [invoiceID, setInvoiceID] = useState<number>(0);
  const [customerName, setCustomerName] = useState<string>("");
  const [cashName, setCashName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const [surveyStarted, setSurveyStarted] = useState<boolean>(false);
  const { toggleSidebar } = useContext(SidebarContext);

  const { cashTurnId, invoiceId }: any = useParams();

  useEffect(() => {
    getPromoters();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);
    if (timer <= 0) {
      clearInterval(interval);
      console.log("done timer");
    }
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (timer <= 0 && surveyStarted)
      window.location.href = `/promoters-rating/${cashTurnId}/invoices/undefiend`;
  }, [timer, surveyStarted]);

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
    <Page hasBack={false} invisibleHeader={true}>
      <Box sx={{ p: theme.spacing(3) }}>
        <Card sx={{ borderRadius: 2 }}>
          <Box bgcolor={theme.palette.primary.main} p={theme.spacing(3)}>
            <Box>
              <MenuIcon
                onClick={() => {
                  console.log("clicked");
                  toggleSidebar();
                }}
              />
            </Box>
            <Sidebar />

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
            <Content
              promoters={promoters}
              setTimer={setTimer}
              setSurveyStarted={setSurveyStarted}
            />
          </CardContent>
        </Card>
      </Box>

      <Typography fontWeight={"bold"} px={3} pb={3}>
        {
          "لطفا با کلیک بر وضعیت های مشخص شده، به پرسنل مورد نظر امتیاز خود را ثبت کنید."
        }
      </Typography>

      {!!timer && (
        <Typography px={3} pb={3} align="center">
          {`${timer} ثانیه تا رفرش شدن صفحه `}
        </Typography>
      )}

      <LoadingModal visible={loading} />
    </Page>
  );
};

export default PromotersRating;

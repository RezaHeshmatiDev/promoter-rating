import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";

import Page from "../../components/Page/Page";
import { apiGetCacheTurns, apiGetPromoters } from "../../services/api/Api";
import CashTurns from "./CashTurns";
import { CashTurn, Promoter } from "../../utils/Interfaces";
import Content from "./Content";
import LoadingModal from "../../components/LoadingModal";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [cashTurns, setCashTurns] = useState<CashTurn[]>([]);
  const [selectedCashTurn, setSelectedCashTurn] = useState<
    CashTurn | undefined
  >(undefined);
  const [cashTurnsVisible, setCashTurnsVisible] = useState<boolean>(true);
  const [promoters, setPromoters] = useState<Promoter[]>([]);
  const [invoiceID, setInvoiceID] = useState<number>(0);
  const [customerName, setCustomerName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  const theme = useTheme();

  useEffect(() => {
    getCashTurns();
  }, []);

  const getCashTurns = async () => {
    setLoading(true);
    apiGetCacheTurns()
      .then((result) => setCashTurns(result))
      .finally(() => setLoading(false));
  };

  const getPromoters = async (id: number) => {
    setLoading(true);
    apiGetPromoters(id)
      .then((result) => {
        setPromoters(result.promoters);
        setInvoiceID(result.invoiceID);
        setCustomerName(result.customerName);
      })
      .finally(() => setLoading(false));
  };

  const onCashTurnChanged = (item: CashTurn) => {
    setSelectedCashTurn(item);
  };

  const cashTurnConfirmed = (item: CashTurn) => {
    getPromoters(item.id);
    setCashTurnsVisible(false);
  };

  const onClickBack = () => {
    if (!cashTurnsVisible) {
      setCashTurnsVisible(true);
    } else {
      navigate(-1);
    }
  };

  return (
    <Page title="اپلیکیشن" onClickBack={onClickBack}>
      <Box sx={{ p: theme.spacing(3) }}>
        <Card sx={{ borderRadius: 2 }}>
          {cashTurnsVisible ? (
            <CashTurns
              cashTurns={cashTurns}
              onCashTurnChanged={onCashTurnChanged}
              selectedCashTurn={selectedCashTurn}
              cashTurnConfirmed={cashTurnConfirmed}
            />
          ) : (
            <>
              <Box bgcolor={theme.palette.primary.main} p={theme.spacing(3)}>
                <Typography
                  textAlign={"center"}
                  fontWeight={"600"}
                  color={theme.palette.success.main}
                  variant="h5"
                  maxWidth={"350px"}
                  mx={"auto"}
                >
                  {"میزان رضایتمندی مشتری از پرسنل فروشگاه عاقبتی"}
                </Typography>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-around"}
                  color={theme.palette.common.white}
                  mt={2}
                >
                  <Typography variant="h6">{`صندوق: ${selectedCashTurn?.name}`}</Typography>
                  <Typography variant="h6">{`شماره فاکتور: ${invoiceID}`}</Typography>
                  <Typography variant="h6">{`نام مشتری: ${customerName}`}</Typography>
                </Box>
              </Box>
              <CardContent>
                <Content promoters={promoters} />
              </CardContent>
            </>
          )}
        </Card>
      </Box>

      {!cashTurnsVisible && (
        <Typography fontWeight={"bold"} px={3}>
          {
            "لطفا با کلیک بر وضعیت های مشخص شده، به پرسنل مورد نظر امتیاز خود را ثبت کنید."
          }
        </Typography>
      )}

      <LoadingModal visible={loading} />
    </Page>
  );
};

export default Home;

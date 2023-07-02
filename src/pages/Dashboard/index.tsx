import { Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Page from "../../components/Page/Page";
import Chart from "../../components/Chart/Chart";

const Dashboard = () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/cashs");
  };

  return (
    <Page title="اپلیکیشن" hasBack={false}>
      <Container maxWidth={"sm"} sx={{ my: 4 }}>
        <Chart />

        <Button onClick={navigateToHome} fullWidth variant={"contained"}>
          {"ورود به صفحه اصلی"}
        </Button>
      </Container>
    </Page>
  );
};

export default Dashboard;
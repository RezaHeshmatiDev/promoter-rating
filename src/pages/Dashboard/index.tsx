import { Container } from "@mui/material";

import Page from "../../components/Page/Page";
import Chart from "../../components/Chart/Chart";

const Dashboard = () => {
  return (
    <Page title="اپلیکیشن" hasBack={false}>
      <Container maxWidth={"sm"} sx={{ my: 4 }}>
        <Chart />
      </Container>
    </Page>
  );
};

export default Dashboard;

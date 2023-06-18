import { Box, Card, useTheme, Typography, CardContent } from "@mui/material";

import Page from "../../components/Page/Page";
import List from "./List";

const Promoters = () => {
  const theme = useTheme();

  return (
    <Page title="اپلیکیشن" hasBack={false}>
      <Box sx={{ p: theme.spacing(3) }}>
        <Card sx={{ borderRadius: 2 }}>
          <Box bgcolor={theme.palette.primary.main} p={theme.spacing(3)}>
            <Typography
              textAlign={"center"}
              fontWeight={"600"}
              color={theme.palette.success.main}
              variant="h5"
              maxWidth={"350px"}
              mx={"auto"}
            >
              {"میزان امتیازات مشتری ها از پرسنل فروشگاه عاقبتی"}
            </Typography>
          </Box>
          <CardContent>
            <List />
          </CardContent>
        </Card>
      </Box>
    </Page>
  );
};

export default Promoters;

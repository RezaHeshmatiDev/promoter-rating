import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ height: "100%" }}>
      <Box
        height={"100%"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Typography variant={"h2"}>{"404"}</Typography>
        <Typography variant={"h6"} fontWeight={"600"}>
          {"چنین صفحه ای وجود ندارد"}
        </Typography>
        <Button
          variant={"contained"}
          sx={{ mt: 2 }}
          onClick={() => navigate("/", { replace: true })}
        >
          <Typography>{"بازگشت به صفحه اصلی"}</Typography>
        </Button>
      </Box>
    </Container>
  );
};

export default PageNotFound;

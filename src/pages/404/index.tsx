import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center" }}>
      <Box >
        <Typography>{"404"}</Typography>
        <Typography>{"چنین صفحه ای وجود ندارد"}</Typography>
        <Button
          variant={"contained"}
          onClick={() => navigate("/", { replace: true })}
        >
          <Typography>{"بازگشت به صفحه اصلی"}</Typography>
        </Button>
      </Box>
    </Container>
  );
};

export default PageNotFound;

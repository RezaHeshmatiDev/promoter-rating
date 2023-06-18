import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Typography>{"404"}</Typography>
      <Typography>{"چنین صفحه ای وجود ندارد"}</Typography>
      <Button
        variant={"contained"}
        onClick={() => navigate("/", { replace: true })}
      >
        <Typography>{"بازگشت به صفحه اصلی"}</Typography>
      </Button>
    </Box>
  );
};

export default PageNotFound;

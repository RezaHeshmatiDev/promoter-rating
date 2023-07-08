import { Box, Button, Typography, useTheme } from "@mui/material";

interface Props {
  tryAgain(): void;
}

const Error = ({ tryAgain }: Props) => {
  const theme = useTheme();

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      mt={3}
    >
      <Typography color={theme.palette.error.main} fontWeight={"600"}>
        {"دریافت اطلاعات با خطا مواجه شد."}
      </Typography>
      <Typography color={theme.palette.error.main} fontWeight={"600"}>
        {"لطفا مجدد تلاش کنید."}
      </Typography>
      <Button onClick={tryAgain} sx={{ mt: 1 }} variant={"contained"}>
        {"تلاش مجدد"}
      </Button>
    </Box>
  );
};

export default Error;

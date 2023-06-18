import { Typography, Dialog, Grid, useTheme } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

interface Props {
  visible: boolean;
  toggleVisibility?(): void;
}

const LoadingModal = ({ visible, toggleVisibility }: Props) => {
  const theme = useTheme();

  return (
    <Dialog open={visible} onClose={toggleVisibility}>
      <Grid
        width={220}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        p={2}
      >
        <CircularProgress size={25} />
        <Typography mt={1} color={theme.palette.text.secondary}>
          {"لطفا چند لحظه صبر کنید ..."}
        </Typography>
      </Grid>
    </Dialog>
  );
};

export default LoadingModal;

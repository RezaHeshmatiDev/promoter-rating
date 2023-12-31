import { Component } from "react";
import { Button, Dialog, DialogTitle, Grid, Typography } from "@mui/material";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

interface State extends DialogProps {
  visible: boolean;
}

interface DialogProps {
  title: string;
  message: string;
  confirmBtn: string;
  cancelBtn?: string;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  onClickConfirm(): void;
}

class DialogAlert extends Component<Props, State> {
  static myComponentInstance: any;

  static showDialog({
    title,
    message,
    confirmBtn,
    cancelBtn,
    onClickConfirm,
    color,
  }: DialogProps) {
    DialogAlert.myComponentInstance.setState({
      visible: true,
      title,
      message,
      confirmBtn,
      cancelBtn,
      onClickConfirm,
      color,
    });
  }

  static closeDialog() {
    DialogAlert.myComponentInstance.setState({
      visible: false,
      message: "",
      confirmBtn: "",
      cancelBtn: "",
      onClickConfirm: null,
      color: undefined,
    });
  }

  constructor(props: any) {
    super(props);

    this.state = {
      visible: false,
      title: "",
      message: "",
      confirmBtn: "",
      cancelBtn: "",
      onClickConfirm: () => null,
      color: undefined,
    };

    DialogAlert.myComponentInstance = this;
    this.onClickCancel = this.onClickCancel.bind(this);
  }

  onClickCancel() {
    this.setState({ visible: false });
  }

  render() {
    return (
      <Dialog open={this.state.visible} onClose={this.onClickCancel}>
        <DialogTitle textAlign={"center"}>{this.state.title}</DialogTitle>
        <Grid
          maxWidth={450}
          flex={1}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          px={3}
          pb={2}
        >
          <Typography textAlign={"center"}>{this.state.message}</Typography>
          <Grid container spacing={1.5} pt={3}>
            <Grid item xs={this.state.cancelBtn ? 6 : 12}>
              <Button
                color={this.state.color}
                variant="contained"
                fullWidth
                onClick={this.state.onClickConfirm}
              >
                {this.state.confirmBtn}
              </Button>
            </Grid>
            {!!this.state.cancelBtn && (
              <Grid item xs={6}>
                <Button
                  color={this.state.color}
                  variant="outlined"
                  fullWidth
                  onClick={this.onClickCancel}
                >
                  {this.state.cancelBtn}
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Dialog>
    );
  }
}

export default DialogAlert;

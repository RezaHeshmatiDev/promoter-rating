import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";
import { Component } from "react";

interface Props {
  enqueueSnackbar(
    message: SnackbarMessage,
    options?: OptionsObject
  ): SnackbarKey;
  closeSnackbar(key?: SnackbarKey): void;
}

class Snack extends Component<Props> {
  static myComponentInstance: { props: Props };

  static error(message: SnackbarMessage, options?: OptionsObject) {
    const { enqueueSnackbar, closeSnackbar } = Snack.myComponentInstance.props;
    enqueueSnackbar(message, {
      variant: "error",
      onClick: () => closeSnackbar(),
      ...options,
    });
  }

  static info(message: SnackbarMessage, options?: OptionsObject) {
    const { enqueueSnackbar, closeSnackbar } = Snack.myComponentInstance.props;
    enqueueSnackbar(message, {
      variant: "info",
      onClick: () => closeSnackbar(),
      ...options,
    });
  }

  static warn(message: SnackbarMessage, options?: OptionsObject) {
    const { enqueueSnackbar, closeSnackbar } = Snack.myComponentInstance.props;
    enqueueSnackbar(message, {
      variant: "warning",
      onClick: () => closeSnackbar(),
      ...options,
    });
  }

  static success(message: SnackbarMessage, options?: OptionsObject) {
    const { enqueueSnackbar, closeSnackbar } = Snack.myComponentInstance.props;
    enqueueSnackbar(message, {
      variant: "success",
      onClick: () => closeSnackbar(),
      ...options,
    });
  }

  constructor(props: any) {
    super(props);

    Snack.myComponentInstance = this;
  }

  render() {
    return null;
  }
}

export default Snack;

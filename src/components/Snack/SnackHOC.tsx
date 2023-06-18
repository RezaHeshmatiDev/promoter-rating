import Snack from './Snack';
import { useSnackbar } from 'notistack';

const SnackHOC = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return (
    <Snack enqueueSnackbar={enqueueSnackbar} closeSnackbar={closeSnackbar} />
  );
};

export default SnackHOC;

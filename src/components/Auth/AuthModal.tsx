import { useState, forwardRef, useImperativeHandle } from "react";
import { Dialog } from "@mui/material";

import Auth from "./Auth";

interface Props {
  userIsAthenticated(): void;
}

const AuthModal = forwardRef(({ userIsAthenticated }: Props, ref) => {
  const [open, setOpen] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    toggleDialog() {
      toggleDialog();
    },
  }));

  const toggleDialog = () => {
    setOpen(!open);
  };

  return (
    <Dialog open={open} onClose={toggleDialog}>
      <Auth
        title={"احراز هویت"}
        subheader={
          "لطفا برای خروج از حساب کاربری، نام کاربری و رمز عبور خود را وارد کنید."
        }
        sx={{ bgcolor: "transparent" }}
        userIsAthenticated={userIsAthenticated}
        isLogin={false}
      />
    </Dialog>
  );
});

export default AuthModal;

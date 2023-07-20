import { ChangeEvent, useContext, useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  FormControl,
  InputLabel,
  TextField,
  useTheme,
  SxProps,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";

import { LoginContext } from "../../contexts/LoginContext";
import { apiGetProfile, apiPostLogin } from "../../services/api/AuthApi";
import Snack from "../Snack/Snack";
import { LocalUser } from "../../utils/Interfaces";

interface Props {
  title?: string;
  subheader?: string;
  sx?: SxProps;
  isLogin?: boolean;
  userIsAthenticated?(): void;
}

const Auth = ({
  title,
  subheader,
  sx,
  userIsAthenticated,
  isLogin = true,
}: Props) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const { submitUserData } = useContext(LoginContext);

  const theme = useTheme();

  const handleUsernameChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const login = () => {
    if (username.length > 0 && password.length > 0) {
      setLoading(true);
      apiPostLogin(username, password)
        .then((result) => {
          if (isLogin) {
            getUserInfo(result.access_token);
          } else {
            userIsAthenticated?.();
          }
        })
        .catch(() => setLoading(false));
    } else {
      Snack.warn("لطفا نام کاربری و پسوورد خود را وارد کنید.");
    }
  };

  const getUserInfo = (access_token: string) => {
    apiGetProfile(access_token)
      .then((result: LocalUser) => {
        submitUserData({ ...result, access_token });
        if (result.role === "user") {
          navigate(`/promoters-rating/${result.cash.id}/invoices/undefiend`);
        } else {
          navigate("/dashboard");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <Box
      height={"100%"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ bgcolor: theme.palette.primary.main, ...sx }}
    >
      <Card>
        <CardHeader title={title || "ورود"} subheader={subheader} />
        <CardContent>
          <FormControl fullWidth>
            <InputLabel id="username-input-label" />
            <TextField
              id="username-input-label"
              value={username}
              onChange={handleUsernameChanged}
              label={"نام کاربری"}
              size="small"
            />
            <InputLabel id="password-input-label" />
            <TextField
              id="password-input-label"
              value={password}
              onChange={handlePasswordChanged}
              label={"رمز عبور"}
              sx={{ mt: 2 }}
              size="small"
              type={"password"}
            />
          </FormControl>
          <LoadingButton
            sx={{ mt: 2 }}
            variant={"contained"}
            fullWidth
            onClick={login}
            loading={loading}
          >
            {title || "ورود"}
          </LoadingButton>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Auth;

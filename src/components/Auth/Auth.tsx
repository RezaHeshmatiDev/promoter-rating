import { ChangeEvent, useContext, useEffect, useState } from "react";
import {
  Box,
  Dialog,
  Card,
  CardHeader,
  CardContent,
  FormControl,
  InputLabel,
  TextField,
  useTheme,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { LoginContext } from "../../contexts/LoginContext";
import { apiPostLogin } from "../../services/api/Api";
import Snack from "../Snack/Snack";
import { setToken } from "../../utils/tokenFuncs";

const Auth = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { loginToggle, toggleLogin,
    //  submitUserData
  } = useContext(LoginContext);

  const theme = useTheme();

  useEffect(() => {
    if (location.pathname.includes("promoters-rating")) {
      return;
    }

    if (!loginToggle) {
      toggleLogin();
    }
  }, []);

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
          console.log({
            result
          })
          // submitUserData(result.data);
          setToken(result.access_token);
          toggleLogin();
        })
        .finally(() => setLoading(false));
    } else {
      Snack.warn("لطفا نام کاربری و پسوورد خود را وارد کنید.");
    }
  };

  return (
    <Dialog open={loginToggle} onClose={toggleLogin} fullScreen>
      <Box
        flex={1}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ bgcolor: theme.palette.primary.main }}
      >
        <Card>
          <CardHeader title={"ورود"} />
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
              {"ورود"}
            </LoadingButton>
          </CardContent>
        </Card>
      </Box>
    </Dialog>
  );
};

export default Auth;

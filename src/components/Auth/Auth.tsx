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
  Button,
  useTheme,
} from "@mui/material";

import { LoginContext } from "../../contexts/LoginContext";
import { LoadingButton } from "@mui/lab";
import { apiPostLogin } from "../../services/api/Api";
import Snack from "../Snack/Snack";

const Auth = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { loginToggle, toggleLogin } = useContext(LoginContext);

  const theme = useTheme();

  useEffect(() => {
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
        .then(toggleLogin)
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

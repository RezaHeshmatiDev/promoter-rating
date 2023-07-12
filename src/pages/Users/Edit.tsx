import { useState, ChangeEvent, useEffect } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  FormControl,
  InputLabel,
  TextField,
  Select,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import { CashTurn, User } from "../../utils/Interfaces";
import { apiGetCashs } from "../../services/api/CashsApi";
import { apiDeleteUser, apiPatchUser } from "../../services/api/AuthApi";
import LoadingModal from "../../components/LoadingModal";
import Page from "../../components/Page/Page";
import Snack from "../../components/Snack/Snack";

const EditUser = () => {
  const { state } = useLocation();

  const user: User = state;

  const [username, setUserName] = useState<string>(user.userName);
  const [fullname, setFullname] = useState<string>(user.fullName);
  const [password, setPassword] = useState<string>(user.password || "");
  const [notes, setNotes] = useState<string>(user.notes || "");
  const [selectedRole, setSelectedRole] = useState<string>(user.role);
  const [selectedCash, setSelectedCash] = useState<string>("");
  const [cashs, setCashs] = useState<CashTurn[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  const roles = [
    { id: "user", name: "کاربر" },
    { id: "admin", name: "ادمین" },
  ];

  useEffect(() => {
    getCashs();
  }, []);

  const getCashs = async () => {
    setLoading(true);
    apiGetCashs()
      .then((result) => {
        setCashs(result);
        setSelectedCash(user.cashID?.toString() || "");
      })
      .finally(() => setLoading(false));
  };

  const handleUsernameChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  const handlePasswordChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleFullnameChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setFullname(e.target.value);
  };
  const handleNotesChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setNotes(e.target.value);
  };
  const handleRoleChange = (event: SelectChangeEvent<typeof selectedRole>) => {
    setSelectedRole(event.target.value);
  };
  const handleCashChange = (event: SelectChangeEvent<typeof selectedCash>) => {
    setSelectedCash(event.target.value);
  };

  const submit = () => {
    setLoading(true);
    apiPatchUser(
      user.ID,
      username,
      password,
      fullname,
      notes,
      selectedRole,
      selectedCash
    )
      .then(() => {
        clearFields();
        Snack.success("ویرایش اطلاعات کاربر با موفقیت انجام شد.");
      })
      .finally(() => setLoading(false));
  };

  const removeUser = () => {
    setLoading(true);
    apiDeleteUser(user.ID)
      .then(() => {
        Snack.success("کاربر مورد نظر با موفقیت حذف شد.");
        navigate(-1);
      })
      .finally(() => setLoading(false));
  };

  const clearFields = () => {
    setUserName("");
    setPassword("");
    setFullname("");
    setNotes("");
    setSelectedRole("");
    setSelectedCash("");
  };

  return (
    <Page title={"ویرایش کاربر"}>
      <Box sx={{ p: 3 }}>
        <Card sx={{ maxWidth: "500px", margin: "auto" }}>
          <CardHeader title={"ویرایش کاربر"} />
          <CardContent>
            <FormControl fullWidth>
              {/** username */}
              <InputLabel id="username-input-label" />
              <TextField
                id="username-input-label"
                value={username}
                onChange={handleUsernameChanged}
                label={"نام کاربری"}
              />
              {/** password */}
              <InputLabel id="password-input-label" />
              <TextField
                id="password-input-label"
                value={password}
                onChange={handlePasswordChanged}
                label={"رمز عبور"}
                sx={{ mt: 2 }}
                type="password"
              />
              {/** fullname */}
              <InputLabel id="fullname-input-label" />
              <TextField
                id="fullname-input-label"
                value={fullname}
                onChange={handleFullnameChanged}
                label={"نام و نام خانوادگی"}
                sx={{ mt: 2 }}
              />
              {/** notes */}
              <InputLabel id="notes-input-label" />
              <TextField
                id="notes-input-label"
                value={notes}
                onChange={handleNotesChanged}
                label={"ملاحظات"}
                sx={{ mt: 2 }}
                multiline
              />
              {/** role */}
              <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                <InputLabel id="select-role-id">{"انتخاب دسترسی"}</InputLabel>
                <Select
                  id="input-role"
                  labelId="select-role-id"
                  value={selectedRole}
                  onChange={handleRoleChange}
                  label={"انتخاب دسترسی"}
                >
                  {roles.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              {/** select cashs dropdown */}
              <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                <InputLabel id="select-label-id">{"انتخاب صندوق"}</InputLabel>
                <Select
                  id="simple-label"
                  labelId="select-label-id"
                  value={selectedCash}
                  onChange={handleCashChange}
                  label={"انتخاب صندوق"}
                >
                  {cashs.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </FormControl>
          </CardContent>
          <CardActions sx={{ mx: 1 }}>
            <Button onClick={submit} variant={"contained"}>
              {"ویرایش"}
            </Button>
            <Button onClick={removeUser} color={"error"} variant={"contained"}>
              {"حذف"}
            </Button>
          </CardActions>
        </Card>
      </Box>

      <LoadingModal visible={loading} />
    </Page>
  );
};

export default EditUser;

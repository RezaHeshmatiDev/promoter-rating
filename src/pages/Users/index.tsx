import { useState, useEffect } from "react";
import { TableRow, TableCell, Typography, Box, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Page from "../../components/Page/Page";
import Table from "../../components/Table/Table";
import LoadingModal from "../../components/LoadingModal";
import { apiGetUsers } from "../../services/api/UsersApi";
import { User } from "../../utils/Interfaces";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    setLoading(true);
    apiGetUsers()
      .then((result: User[]) => setUsers(result))
      .catch(() => {
        setHasError(true);
        setUsers([]);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Page title={"کاربران"}>
      <Box sx={{ p: 3 }}>
        <Card sx={{ borderRadius: 2 }}>
          <Table
            tableColumns={[
              { id: "ID", text: "شناسه" },
              { id: "cashID", text: "شناسه صندوق" },
              { id: "fullName", text: "نام" },
              { id: "notes", text: "ملاحظات" },
              { id: "role", text: "دسترسی" },
              { id: "userName", text: "نام کاربری" },
            ]}
            error={hasError}
          >
            {users.map((item) => {
              return <ListItem key={item.ID} item={item} />;
            })}

            <LoadingModal visible={loading} />
          </Table>
        </Card>
      </Box>
    </Page>
  );
};

const ListItem = ({ item }: { item: User }) => {
  const navigate = useNavigate();

  const onClickItem = () => {
    navigate(`/users/${item.ID}`, { state: item });
  };

  return (
    <TableRow onClick={onClickItem}>
      <TableCell>
        <Typography>{item.ID}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{item.cashID}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{item.fullName}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{item.notes}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{item.role}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{item.userName}</Typography>
      </TableCell>
    </TableRow>
  );
};

export default Users;

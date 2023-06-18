import { useState, useEffect } from "react";
import { TableRow, TableCell, Typography, Box, Avatar } from "@mui/material";

import { Promoter } from "../../utils/Interfaces";
import Table from "../Table/Table";
import { apiGetAllPromoters } from "../../services/api/Api";
import LoadingModal from "../../components/LoadingModal";

const List = () => {
  const [promoters, setPromoters] = useState<Promoter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getPromoters();
  }, []);

  const getPromoters = async () => {
    setLoading(true);
    apiGetAllPromoters()
      .then((result) => setPromoters(result))
      .finally(() => setLoading(false));
  };

  return (
    <Table
      tableColumns={[
        { text: "شناسه" },
        { text: "نام فروشنده" },
        { text: "شناسه فاکتور" },
        { text: "امتیاز" },
      ]}
    >
      {promoters.map((item) => {
        return <ListItem key={item.promoterID} item={item} />;
      })}

      <LoadingModal visible={loading} />
    </Table>
  );
};

const ListItem = ({ item }: { item: Promoter }) => {
  return (
    <>
      <TableRow>
        <TableCell>
          <Typography>{item.promoterID}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{item.promoterName}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{item.invoiceID}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{item.rate}</Typography>
        </TableCell>
      </TableRow>
    </>
  );
};

export default List;

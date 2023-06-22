import { useState, useEffect } from "react";
import { TableRow, TableCell, Typography, Box, Avatar } from "@mui/material";

import { Promoter } from "../../utils/Interfaces";
import Table from "../Table/Table";
import { apiGetAllPromoters } from "../../services/api/Api";
import LoadingModal from "../../components/LoadingModal";
import { useNavigate } from "react-router-dom";

const List = () => {
  const [promoters, setPromoters] = useState<Promoter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

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
        { text: "تعداد فاکتور" },
        { text: "مجموع امتیاز" },
        { text: "میانگین امتیاز" },
      ]}
    >
      {promoters.map((item) => {
        const onClickItem = () => {
          navigate(`/promoters/${item.promoterID}`, { state: { promoters } });
        };
        return (
          <ListItem
            key={item.promoterID}
            item={item}
            onClickItem={onClickItem}
          />
        );
      })}

      <LoadingModal visible={loading} />
    </Table>
  );
};

const ListItem = ({
  item,
  onClickItem,
}: {
  item: Promoter;
  onClickItem?(): void;
}) => {
  return (
    <TableRow hover onClick={onClickItem}>
      <TableCell>
        <Typography>{item.promoterID}</Typography>
      </TableCell>
      <TableCell>
        <Box display={"flex"} alignItems={"center"}>
          <Avatar
            variant={"square"}
            src={item.promoterAvatar || ""}
            sx={{ height: "auto", width: "60px" }}
          />
          <Typography ml={1}>{item.promoterName}</Typography>
        </Box>
      </TableCell>
      <TableCell>
        <Typography>{item.invoiceCount}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{item.rateSum}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{item.rateSum / item.invoiceCount}</Typography>
      </TableCell>
    </TableRow>
  );
};

export default List;

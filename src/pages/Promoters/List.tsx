import { useState, useEffect } from "react";
import { TableRow, TableCell, Typography, Box, Avatar } from "@mui/material";

import { Promoter } from "../../utils/Interfaces";
import Table from "../Table/Table";
import { apiGetAllPromoters } from "../../services/api/Api";
import LoadingModal from "../../components/LoadingModal";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../services/Axios";

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
    <TableRow hover>
      <TableCell>
        <Typography>{item.promoterID}</Typography>
      </TableCell>
      <TableCell onClick={onClickItem}>
        <Box display={"flex"} alignItems={"center"}>
          <Avatar
            variant={"circular"}
            src={`${baseURL}static/images/promoters/${item.promoterID}.png`}
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

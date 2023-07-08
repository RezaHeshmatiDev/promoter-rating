import { useState, useEffect } from "react";
import { TableRow, TableCell, Typography, Box, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Promoter } from "../../utils/Interfaces";
import Table, { Filter, Sort } from "../../components/Table/Table";
import { apiGetAllPromoters } from "../../services/api/PromotersApi";
import LoadingModal from "../../components/LoadingModal";
import { baseURL } from "../../services/Axios";
import Snack from "../../components/Snack/Snack";

const List = () => {
  const [promoters, setPromoters] = useState<Promoter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    getPromoters();
  }, []);

  const getPromoters = (filter?: Filter, sort?: Sort) => {
    setLoading(true);
    setHasError(false);
    apiGetAllPromoters(filter, sort)
      .then((result) => {
        if (typeof result === "object") {
          setPromoters(result);
        } else {
          handleError();
        }
      })
      .catch(handleError)
      .finally(() => setLoading(false));
  };

  const handleError = () => {
    setHasError(true);
    setPromoters([]);
  };

  const onChange = (filter: Filter, sort: Sort) => {
    getPromoters(filter, sort);
  };

  return (
    <Table
      tableColumns={[
        { id: "promoterID", text: "شناسه" },
        { id: "promoterName", text: "نام فروشنده" },
        { id: "invoiceCount", text: "تعداد فاکتور" },
        { id: "rateSum", text: "مجموع امتیاز" },
        { id: "rateAvg", text: "میانگین امتیاز" },
      ]}
      filters={[
        { id: "promoterID", text: "شناسه" },
        { id: "promoterName", text: "نام فروشنده" },
        { id: "invoiceCount", text: "تعداد فاکتور" },
        { id: "rateSum", text: "مجموع امتیاز" },
        { id: "rateAvg", text: "میانگین امتیاز" },
      ]}
      onChange={onChange}
      error={hasError}
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
        <Typography>{item.rateSum.toFixed(2)}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{item.rateSum / item.invoiceCount}</Typography>
      </TableCell>
    </TableRow>
  );
};

export default List;

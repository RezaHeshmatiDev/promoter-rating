import React, { useState } from "react";
import {
  TableRow,
  TableCell,
  Typography,
  Avatar,
  Box,
  useTheme,
  Divider,
  lighten,
  Button,
} from "@mui/material";

import { Promoter, Rate } from "../../utils/Interfaces";
import Table from "../Table/Table";
import { apiPatchPromoters } from "../../services/api/Api";
import LoadingModal from "../../components/LoadingModal";
import Snack from "../../components/Snack/Snack";

const Content = ({ promoters }: { promoters: Promoter[] }) => {
  return (
    <Table tableColumns={[{ text: "فروشنده" }, { text: "محل فعالیت" }]}>
      {promoters.map((item) => {
        return <ListItem key={item.promoterID} item={item} />;
      })}
    </Table>
  );
};

const ListItem = ({ item }: { item: Promoter }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onSelectedRate = async (rate: Rate) => {
    setLoading(true);
    apiPatchPromoters(item.promoterID, item.invoiceID, rate.rate)
      .then((result) => Snack.success(result.message))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <TableRow>
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
          <Typography>{item.activityLocationName}</Typography>
        </TableCell>
        <TableCell>
          <RatesList onSelectedRate={onSelectedRate} />
        </TableCell>
      </TableRow>

      <LoadingModal visible={loading} />
    </>
  );
};

const RatesList = ({
  onSelectedRate,
}: {
  onSelectedRate(rate: Rate): void;
}) => {
  const [selectedRate, setSelectedRate] = useState<Rate | null>(null);

  const theme = useTheme();

  const rates: Rate[] = [
    { rate: 5, label: "خیلی خوب", color: theme.palette.success.main },
    { rate: 4, label: "خوب", color: lighten(theme.palette.success.main, 0.5) },
    {
      rate: 3,
      label: "متوسط",
      color: lighten(theme.palette.warning.main, 0.6),
    },
    { rate: 2, label: "ضعیف", color: theme.palette.warning.main },
    { rate: 1, label: "خیلی ضعیف", color: theme.palette.error.main },
  ];

  return (
    <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
      {rates.map((item, index) => {
        let opacity = 1;
        const selectedOpacity = 1;
        const unSelectedOpacity = 0.5;

        if (selectedRate) {
          opacity =
            item.rate === selectedRate.rate
              ? selectedOpacity
              : unSelectedOpacity;
        }

        const onChangeSelectedRate = () => {
          onSelectedRate(item);
          setSelectedRate(item);
        };

        return (
          <React.Fragment key={index}>
            {index !== 0 && (
              <Divider
                sx={{
                  width: "50px",
                  height: "1px",
                  bgcolor: "#232323",
                  opacity: selectedRate ? unSelectedOpacity : selectedOpacity,
                }}
              />
            )}
            <Button
              onClick={onChangeSelectedRate}
              disableRipple
              sx={{
                cursor: "pointer",
                opacity,
                borderRadius: "50%",
                bgcolor: item.color,
                minWidth: 60,
                width: 60,
                height: 60,
                border: "2px solid #232323",

                ":hover": {
                  backgroundColor: item.color,
                },
              }}
            >
              <Typography
                fontWeight={"600"}
                px={0.5}
                variant="caption"
                textAlign={"center"}
              >
                {item.label}
              </Typography>
            </Button>
          </React.Fragment>
        );
      })}
    </Box>
  );
};

export default Content;

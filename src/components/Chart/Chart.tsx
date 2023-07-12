import "chart.js/auto";
import { Box } from "@mui/material";
import { Chart as ReactChart } from "react-chartjs-2";
import { InvoiceData, InvoiceDataProps } from "../../pages/Dashboard";

interface Props {
  data?: InvoiceData;
}

const Chart = ({ data }: Props) => {
  const datasets: InvoiceDataProps[] = data ? Object.values(data) : [];

  return (
    <Box mb={3}>
      <ReactChart
        type="bar"
        data={{
          labels: ["امروز", "دیروز", "دو روز قبل", "سه روز قبل"],
          datasets: [
            {
              label: "allInvoicesCount",
              data: datasets.map((item) => item.allInvoicesCount),
            },
            {
              label: "ratedInvoicesCount",
              data: datasets.map((item) => item.ratedInvoicesCount),
            },
            {
              label: "unratedInvoices",
              data: datasets.map((item) => item.unratedInvoices),
            },
          ],
        }}
      />
    </Box>
  );
};

export default Chart;

import { defaults } from "chart.js/auto";
import { Box } from "@mui/material";
import { Chart as ReactChart } from "react-chartjs-2";
import { InvoiceData, InvoiceDataProps } from "../../pages/Dashboard";

interface Props {
  data: Partial<InvoiceData>;
}

const Chart = ({ data }: Props) => {
  const datasets: InvoiceDataProps[] = data ? Object.values(data) : [];

  defaults.font.family = "SNM";
  defaults.font.weight = "bold";

  return (
    <Box mb={3}>
      <ReactChart
        type="bar"
        data={{
          labels: ["امروز", "دیروز", "دو روز قبل", "سه روز قبل"],
          datasets: [
            {
              label: "کل فاکتورها",
              data: datasets.map((item) => item.allInvoicesCount),
            },
            {
              label: "نظر داده شده",
              data: datasets.map((item) => item.ratedInvoicesCount),
            },
            {
              label: "نظر داده نشده",
              data: datasets.map((item) => item.unratedInvoices),
            },
          ],
        }}
      />
    </Box>
  );
};

export default Chart;

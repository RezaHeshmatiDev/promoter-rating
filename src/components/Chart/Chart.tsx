import "chart.js/auto";
import { Box } from "@mui/material";
import { Chart as ReactChart } from "react-chartjs-2";

const Chart = () => {
  return (
    <Box mb={3}>
      <ReactChart
        type="bar"
        data={{
          labels: ["Jun", "Jul", "Aug"],
          datasets: [
            {
              label: "",
              data: [5, 6, 7],
            },
            {
              label: "",
              data: [3, 2, 1],
            },
          ],
        }}
      />
    </Box>
  );
};

export default Chart;

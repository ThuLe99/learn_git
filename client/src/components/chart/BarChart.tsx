import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { postAPI } from "../../utils/FetchData";

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);
const BarChart = () => {
  const [chartData, setChartData] = useState({});
  const [year, setYear] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setYear(event.target.value as number);
    console.log(year)
  };

  console.log(year)
  const chart = async () => {
    const res = await postAPI("chart", {year:2021});
    const data = await res.data;
    setChartData({
      labels: data.map((crypto: any) => crypto.month),
      datasets: [
        {
          label: "Blog in month",
          data: data.map((crypto: any) => crypto.ketQua),
          backgroundColor: ["#ffbb11"],
        },
      ],
    });
    console.log(data);
  };
  useEffect(() => {
    chart();
    return () => {
      setYear(0); // This worked for me
    };
  }, []);

  return (
    <div className="App">
      <h1>Dankmemes</h1>
      {/* <select className="form-control text-capitalize"
        value={year} name="category"
        onChange={handleChange}>
          <option defaultValue="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          
          
        </select> */}
      <div>
        <Bar
        style={{marginTop:"40px"}}
          data={chartData}
          options={{
            responsive: true,
            title: { text: "THICCNESS SCALE", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true,
                  },
                  gridLines: {
                    display: false,
                  },
                },
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
};

export default BarChart;

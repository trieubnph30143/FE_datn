import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import { RiSlideshow4Fill, RiUser3Fill, RiWallet3Fill, RiWalletFill } from "react-icons/ri";
import { convertToVND } from "@/utils/utils";
type Props = {
    rechanrgeTotals:any
    withdrawTotals:any
};
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);
import { subDays, format } from 'date-fns';
const generateLast7DaysData = () => {
    const labels = [];
    const values = [];
    for (let i = 6; i >= 0; i--) {
        const date = subDays(new Date(), i);
        labels.push(format(date, 'dd-MM-yyyy')); // Định dạng ngày
        values.push(Math.floor(Math.random() * 10000000)); // Giả lập dữ liệu
    }
    return { labels, values };
}
const DashboardView = ({rechanrgeTotals,withdrawTotals}: Props) => {
  const data = {
    labels: generateLast7DaysData().labels,
    datasets: [
      {
        label: "Doanh thu từ khóa học",
        data: generateLast7DaysData().values,
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        borderColor: "rgba(0, 123, 255, 1)",
        borderWidth: 2,
        pointStyle: "rectRot", // Styling the points
        pointRadius: 5, // Size of the points
        pointBackgroundColor: "rgba(255, 99, 132, 1)", // Background color of points
        pointBorderColor: "rgba(54, 162, 235, 1)", // Border color of points
        pointHoverRadius: 10, // Size of the points on hover
        pointHoverBackgroundColor: "rgba(255, 206, 86, 1)", // Background color on hover
        pointHoverBorderColor: "rgba(75, 192, 192, 1)", // Border color on hover
      },
    ],
  };
  const data2 = {
    labels: generateLast7DaysData().labels,
    datasets: [
      {
        label: "Nạp tiền",
        data: rechanrgeTotals,
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        borderColor: "rgba(0, 123, 255, 1)",
        borderWidth: 2,
        pointStyle: "rectRot", // Styling the points
        pointRadius: 5, // Size of the points
        pointBackgroundColor: "rgba(255, 99, 132, 1)", // Background color of points
        pointBorderColor: "rgba(54, 162, 235, 1)", // Border color of points
        pointHoverRadius: 10, // Size of the points on hover
        pointHoverBackgroundColor: "rgba(255, 206, 86, 1)", // Background color on hover
        pointHoverBorderColor: "rgba(75, 192, 192, 1)", // Border color on hover
      },
      {
        label: "Rút tiền",
        data: withdrawTotals,
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        borderColor: "#ff6384",
        borderWidth: 2,
        pointStyle: "rectRot", // Styling the points
        pointRadius: 5, // Size of the points
        pointBackgroundColor: "rgba(255, 99, 132, 1)", // Background color of points
        pointBorderColor: "rgba(54, 162, 235, 1)", // Border color of points
        pointHoverRadius: 10, // Size of the points on hover
        pointHoverBackgroundColor: "rgba(255, 206, 86, 1)", // Background color on hover
        pointHoverBorderColor: "rgba(75, 192, 192, 1)", // Border color on hover
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  return (
    <Box>
        <Typography variant="h3" fontWeight={"bold"} textAlign={"center"}>Thống kê</Typography>
        <Stack direction={"row"} gap={"20px"} mt={"50px"}>
        <Box
          width={"25%"}
          padding={"20px"}
          sx={{
            background: "white",
            border: "1px solid #dddddd",
            borderRadius: "10px",
            boxShadow: "0 2px 18px rgba(0,0,0,.2)",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            gap:"30px",
            color:"#5b648b"
          }}
        >
            <RiSlideshow4Fill size={30}  />
            <Box>
                <Typography  fontSize={"17px"}>Tổng doanh thu khóa học</Typography>
                <Typography fontWeight={"bold"} fontSize={"20px"}>{convertToVND(20000000)}</Typography>
            </Box>
        </Box>
        <Box
          width={"25%"}
          padding={"20px"}
          sx={{
            background: "white",
            border: "1px solid #dddddd",
            borderRadius: "10px",
            boxShadow: "0 2px 18px rgba(0,0,0,.2)",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            gap:"30px",
            color:"#5b648b"
          }}
        >
            <RiWallet3Fill size={30} />
           
            <Box>
                <Typography  fontSize={"17px"}>Tổng nạp tiền vào ví</Typography>
                <Typography fontWeight={"bold"} fontSize={"20px"}>{convertToVND(rechanrgeTotals.reduce((acc:any, cur:any) => acc + cur, 0))}</Typography>
            </Box>
        </Box>
        <Box
          width={"25%"}
          padding={"20px"}
          sx={{
            background: "white",
            border: "1px solid #dddddd",
            borderRadius: "10px",
            boxShadow: "0 2px 18px rgba(0,0,0,.2)",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            gap:"30px",
            color:"#5b648b"
          }}
        >
             <RiWalletFill  size={30}  />
            <Box>
                <Typography  fontSize={"17px"}>Tổng rút tiền từ ví</Typography>
                <Typography fontWeight={"bold"} fontSize={"20px"}>{convertToVND(withdrawTotals.reduce((acc:any, cur:any) => acc + cur, 0))}</Typography>
            </Box>
        </Box>
        <Box
          width={"25%"}
          padding={"20px"}
          sx={{
            background: "white",
            border: "1px solid #dddddd",
            borderRadius: "10px",
            boxShadow: "0 2px 18px rgba(0,0,0,.2)",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            gap:"30px",
            color:"#5b648b"
          }}
        >
             <RiUser3Fill    size={30}  />
            <Box>
                <Typography  fontSize={"17px"}>Người dùng</Typography>
                <Typography fontWeight={"bold"} fontSize={"20px"}>12</Typography>
            </Box>
        </Box>
      </Stack>
      <Stack direction={"row"}  mt={"50px"} gap={"50px"}>
        <Box width={"50%"}>
          <Typography
            fontWeight={"bold"}
            my={"10px"}
            textAlign={"center"}
            variant="h6"
          >
            Biểu đồ thống kê doanh thu khóa học 7 ngày gần nhất
          </Typography>
          <Line data={data} options={options} />
        </Box>
        <Box width={"50%"}>
          <Typography
            fontWeight={"bold"}
            my={"10px"}
            textAlign={"center"}
            variant="h6"
          >
            Biểu đồ thống kê nạp rút tiền từ ví 7 ngày gần nhất
          </Typography>
          <Line data={data2} options={options} />
        </Box>
      </Stack>
      
    </Box>
  );
};

export default DashboardView;

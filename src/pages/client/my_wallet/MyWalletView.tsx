import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Drawer,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Skeleton,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  TextField,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import bg from "../../../images/cong-thanh-toan-vnpay-va-cach-tich-hop-vao-website-wordpress.jpg";
import vnpay from "../../../images/vnp.png";
import {
  RiArrowLeftRightFill,
  RiArrowRightSLine,
  RiBankCardFill,
  RiDownload2Line,
  RiGift2Line,
  RiSearchLine,
  RiSparkling2Line,
  RiWalletLine,
} from "react-icons/ri";
import { convertToVND, formatDate, getStartOfMonth } from "@/utils/utils";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import profile from "../../../images/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg";
import { useLocalStorage } from "@/hooks/useStorage";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
type Props = {
  handleChangeTabs: any;
  value: any;
  handleChange: any;
  expanded: any;
  toggleDrawer: any;
  open: any;
  wallet: any;
  handleRechanrge: any;
  setRechanrge: any;
  rechanrge: any;
  transtions: any;
  setSearchEmail: any;
  searchEmail: any;
  handleSearchEmail: any;
  dataEmail: any;
  setTransfer: any;
  transfer: any;
  handleTrander: any;
  stk: any;
  setStk: any;
  amount: any;
  setAmount: any;
  bank: any;
  setBank: any;
  handleWithdraw: any;
  statistical: any;
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#ff5117",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const tenVietTatNganHangVN = [
  "Agribank",
  "BIDV",
  "Vietcombank",
  "Vietinbank",
  "BIDV SeABank",
  "CB",
  "ACB",
  "ABBANK",
  "Viet Capital Bank",
  "BacA Bank",
  "Bac Giang Bank",
  "BMT Bank",
  "BIDV SeABank",
  "VietinBank",
  "OceanBank",
  "Dong A Bank",
  "GPBank",
  "MSB",
  "Techcombank",
  "Kien Long Bank",
  "Techcombank",
  "Red River Bank",
  "NAB",
  "Navibank",
  "Agribank",
  "HDBank",
  "HDBank",
  "BIDV SeABank",
  "VIB",
  "Sacombank",
  "SHB",
  "Shinhan Bank",
  "LienVietPostBank",
  "Vietbank",
  "TPBank",
  "UOB Việt Nam",
  "VIB",
  "VietABank",
  "VPBank",
  "Eximbank",
];
const MyWalletView = ({
  handleChangeTabs,
  value,
  handleChange,
  expanded,
  toggleDrawer,
  open,
  wallet,
  handleRechanrge,
  setRechanrge,
  rechanrge,
  transtions,
  setSearchEmail,
  searchEmail,
  handleSearchEmail,
  dataEmail,
  transfer,
  setTransfer,
  handleTrander,
  stk,
  setStk,
  amount,
  setAmount,
  bank,
  setBank,
  handleWithdraw,
  statistical,
}: Props) => {
  const [user, setUser]: any = useLocalStorage("user", {});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [paginatedRows, setPaginatedRows] = useState([]);
  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };
  useEffect(() => {
    if (transtions) {
      setPaginatedRows(
        transtions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      );
    }
  }, [page, rowsPerPage, transtions]);
  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Box>
      <Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
        <Box width={"600px"} padding={"60px 30px"}>
          <img src={vnpay} width={"90%"} alt="" />

          <TextField
            value={rechanrge}
            onChange={(e) => setRechanrge(e.target.value)}
            sx={{ mt: "20px" }}
            id="outlined-basic"
            fullWidth
            label="Nhập số tiền"
            variant="outlined"
          />
          <FormControl sx={{ mt: "20px", display: "block" }}>
            <FormLabel id="demo-radio-buttons-group-label">
              Cổng thanh toán trực tuyến
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="vnpay"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="vnpay"
                control={<Radio />}
                label="VNPAY"
              />
            </RadioGroup>
          </FormControl>
          <Box p={"15px"} border={"1px solid #dddddd"} borderRadius={"10px"}>
            <Typography fontWeight={"bold"}>Ghi chú</Typography>
            <Typography fontSize={"14px"}>
              Số tiền nạp không dưới 10.000Đ
            </Typography>
          </Box>
          <Button
            onClick={handleRechanrge}
            sx={{
              color: "#ff5117",
              border: "2px solid #ff5117",
              height: "35px",
              px: "15px",
              mt: "20px",
            }}
          >
            Nạp tiền
            <RiWalletLine style={{ marginLeft: "5px" }} size={20} />
          </Button>
        </Box>
      </Drawer>
      <Stack direction={"row"} gap={"40px"}>
        <Box width={"70%"}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"end"}
          >
            <Typography
              variant="h4"
              fontWeight={"bold"}
              display={"flex"}
              alignItems={"center"}
            >
              <RiWalletLine style={{ marginRight: "10px" }} /> Ví của tôi
            </Typography>

            <Stack>
              <Stack
                direction={"row"}
                justifyContent={"center"}
                alignItems={"end"}
                gap={"10px"}
              >
                <Typography>Tổng tiền :</Typography>
                <Typography color={"red"} fontWeight={"bold"}>
                  {convertToVND(
                    Number(
                      wallet !== undefined && wallet.length > 0
                        ? wallet[0].balance
                        : 0
                    )
                  )}
                </Typography>
              </Stack>
              <Button
                onClick={toggleDrawer(true)}
                sx={{
                  color: "#ff5117",
                  border: "2px solid #ff5117",
                  height: "35px",
                  px: "15px",
                }}
              >
                Nạp tiền vào ví
                <RiWalletLine style={{ marginLeft: "5px" }} size={20} />
              </Button>
            </Stack>
          </Stack>
          <Stack>
            <Box width={"100%"} display={"flex"} justifyContent={"center"}>
              <Box
                mt={"20px"}
                sx={{
                  ".css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected": {
                    color: " #ff5117",
                  },
                  ".css-1aquho2-MuiTabs-indicator": {
                    background: "#ff5117",
                  },
                }}
              >
                <Tabs value={value} onChange={handleChangeTabs}>
                  <Tab
                    label={
                      <>
                        <Typography sx={{ gap: "5px" }}>Giao dịch</Typography>
                      </>
                    }
                  />
                  <Tab
                    label={
                      <>
                        <Typography sx={{ gap: "5px" }}>Chuyển tiền</Typography>
                      </>
                    }
                  />
                  <Tab
                    label={
                      <>
                        <Typography sx={{ gap: "5px" }}>Rút tiền</Typography>
                      </>
                    }
                  />
                  <Tab
                    label={
                      <>
                        <Typography sx={{ gap: "5px" }}>Thống kê</Typography>
                      </>
                    }
                  />
                </Tabs>
              </Box>
            </Box>
            <Stack direction={"column"} justifyContent={"center"}>
              {value == 0 && (
                <>
                  <TableContainer sx={{ mt: "30px" }} component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Kiểu</StyledTableCell>
                          <StyledTableCell>Số tiền</StyledTableCell>
                          <StyledTableCell>Trạng thái</StyledTableCell>
                          <StyledTableCell>Email</StyledTableCell>
                          <StyledTableCell>note</StyledTableCell>
                          <StyledTableCell>Thời điểm giao dịch</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      {paginatedRows.length == 0 ? (
                        <TableBody>
                          {Array.from({ length: 5 }, (value, index) => (
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell>
                                <Skeleton height={"35px"} width="150px" />
                              </TableCell>
                              <TableCell>
                                <Skeleton height={"25px"} width="100px" />
                              </TableCell>
                              <TableCell>
                                <Skeleton height={"35px"} width="100px" />
                              </TableCell>
                              <TableCell>
                                <Skeleton height={"25px"} width="200px" />
                              </TableCell>
                              <TableCell>
                                <Skeleton height={"25px"} width="140px" />
                              </TableCell>
                              <TableCell>
                                <Skeleton height={"25px"} width="80px" />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      ) : (
                        <TableBody>
                          {paginatedRows &&
                            paginatedRows.length > 0 &&
                            paginatedRows.map((row: any) => {
                              let message = "";
                              let style = {};
                              if (
                                row.type == "withdraw" &&
                                row.status == "completed"
                              ) {
                                message += "Rút tiền thành công";
                              }
                              if (
                                row.type == "withdraw" &&
                                row.status == "pending"
                              ) {
                                message += "Chờ thanh toán";
                              }
                              if (
                                row.type == "withdraw" &&
                                row.status == "failed"
                              ) {
                                message +=
                                  "Rút tiền thất bại.Ghi chú : " + row.note;
                              }
                              if (
                                row.type == "transfer" &&
                                row.status == "completed"
                              ) {
                                message += "Chuyển tiền thành công";
                              }
                              if (
                                row.type == "transfer" &&
                                row.status == "failed"
                              ) {
                                message += "Chuyển tiền thất bại";
                              }

                              if (
                                row.type == "rechanrge" &&
                                row.status == "completed"
                              ) {
                                message += "Nạp tiền thành công";
                              }
                              if (
                                row.type == "reward" &&
                                row.status == "completed"
                              ) {
                                message += row.note;
                              }
                              if (
                                row.type == "rechanrge" &&
                                row.status == "pending"
                              ) {
                                message += "Chờ thanh toán";
                              }
                              if (
                                row.type == "rechanrge" &&
                                row.status == "failed"
                              ) {
                                message += "Nạp tiền thất bại";
                              }
                              if (
                                row.type == "purchase" &&
                                row.status == "completed"
                              ) {
                                message += "Thanh toán khóa học thành công";
                              }
                              if (row.status == "completed") {
                                style = {
                                  border: "1px solid green",
                                  borderRadius: "80px",
                                  fontSize: "10px",
                                  color: "green",
                                };
                              }
                              if (row.status == "failed") {
                                style = {
                                  border: "1px solid red",
                                  borderRadius: "80px",
                                  fontSize: "10px",
                                  color: "red",
                                };
                              }
                              if (row.status == "pending") {
                                style = {
                                  border: "1px solid yellow",
                                  borderRadius: "80px",
                                  fontSize: "10px",
                                  color: "yellow",
                                };
                              }

                              return (
                                <TableRow
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell component="th" scope="row">
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        border: "1px solid grey",
                                        padding: "5px",
                                        borderRadius: "8px",
                                        justifyContent: "center",
                                      }}
                                    >
                                      {row.type == "transfer" && (
                                        <RiArrowLeftRightFill />
                                      )}
                                      {row.type == "rechanrge" && (
                                        <RiBankCardFill />
                                      )}
                                      {row.type == "withdraw" && (
                                        <RiDownload2Line />
                                      )}
                                      {row.type == "purchase" && (
                                        <RiSparkling2Line />
                                      )}
                                      {row.type == "reward" && <RiGift2Line />}
                                      {row.type}
                                    </Box>
                                  </TableCell>
                                  <TableCell>
                                    {convertToVND(row.amount)}
                                  </TableCell>
                                  <TableCell>
                                    <Button sx={style}>{row.status}</Button>
                                  </TableCell>

                                  <TableCell>{row.email_transfer}</TableCell>

                                  <TableCell>{message}</TableCell>
                                  <TableCell>
                                    {formatDate(row.createdAt)}
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      )}
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={transtions.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                  <Box
                    p={"15px"}
                    border={"1px solid #dddddd"}
                    borderRadius={"10px"}
                  >
                    <Typography fontWeight={"bold"}>Ghi chú</Typography>
                    <Typography
                      ml={"10px"}
                      fontWeight={"bold"}
                      fontSize={"15px"}
                    >
                      1.Kiểu
                    </Typography>
                    <ul
                      style={{
                        margin: " 0",
                        fontSize: "14px",
                        color: "#423a3a",
                      }}
                    >
                      <li style={{ margin: "0" }}>
                        Rechanrge : Nạp tiền vào ví{" "}
                      </li>
                      <li style={{ margin: "0" }}>
                        Transfer : Chuyển tiền từ ví của mình sang ví nguời khác
                        bằng Email{" "}
                      </li>
                      <li style={{ margin: "0" }}>
                        Withdraw : Rút tiền từ ví của mình về tài khoản ngân
                        hàng{" "}
                      </li>
                      <li style={{ margin: "0" }}>
                        Purchase : Thanh toán tiền khi mua khóa học
                      </li>
                      <li style={{ margin: "0" }}>reward : Phần thưởng</li>
                    </ul>
                    <Typography
                      ml={"10px"}
                      fontWeight={"bold"}
                      fontSize={"15px"}
                    >
                      2.Trạng thái
                    </Typography>
                    <ul
                      style={{
                        margin: " 0",
                        fontSize: "14px",
                        color: "#423a3a",
                      }}
                    >
                      <li style={{ margin: "0" }}>Completed : Thành công </li>
                      <li style={{ margin: "0" }}>Pending : Đang xử lý </li>
                      <li style={{ margin: "0" }}>Failed : Thất bại </li>
                    </ul>
                  </Box>
                </>
              )}

              {value == 1 && (
                <>
                  <Box
                    display={"flex"}
                    mt={"20px"}
                    flexDirection={"column"}
                    alignItems={"start"}
                    width={"100%"}
                  >
                    <Box>
                      <TextField
                        value={searchEmail}
                        size="small"
                        onChange={(e) => setSearchEmail(e.target.value)}
                        type={"email"}
                        sx={{
                          width: "420px",

                          ".css-1o9s3wi-MuiInputBase-input-MuiOutlinedInput-input":
                            {
                              padding: "5px",
                            },
                          ".css-1q6at85-MuiInputBase-root-MuiOutlinedInput-root":
                            {
                              borderRadius: "20px",
                              height: "40px",
                            },
                        }}
                        placeholder="Tìm kiếm người dùng bằng email..."
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">
                              <Box
                                onClick={handleSearchEmail}
                                sx={{ cursor: "pointer" }}
                              >
                                <RiSearchLine />
                              </Box>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                    {dataEmail.length > 0 && (
                      <Accordion
                        sx={{ width: "100%", marginTop: "20px" }}
                        expanded={expanded === "panel1"}
                        onChange={handleChange("panel1")}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >
                          <Stack
                            direction={"row"}
                            alignItems={"center"}
                            gap={"10px"}
                          >
                            <img
                              src={
                                dataEmail[0].image.url
                                  ? dataEmail[0].image.url
                                  : profile
                              }
                              width={"30px"}
                              height={"30px"}
                              style={{ borderRadius: "50%" }}
                              alt=""
                            />
                            <Typography>{dataEmail[0].user_name}</Typography>
                          </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Stack direction={"row"} gap={"20px"}>
                            <TextField
                              value={transfer}
                              id="outlined-basic"
                              size="small"
                              placeholder="Nhập số tiền cần chuyển"
                              variant="outlined"
                              onChange={(e) => setTransfer(e.target.value)}
                            />
                            <Button
                              onClick={handleTrander}
                              sx={{
                                color: "#ff5117",
                                border: "2px solid #ff5117",

                                px: "15px",
                              }}
                            >
                              Chuyển tiền
                              <RiArrowLeftRightFill
                                style={{ marginLeft: "5px" }}
                                size={20}
                              />
                            </Button>
                          </Stack>
                        </AccordionDetails>
                      </Accordion>
                    )}
                  </Box>
                  <Box
                    mt={"15px"}
                    p={"15px"}
                    border={"1px solid #dddddd"}
                    borderRadius={"10px"}
                  >
                    <Typography fontWeight={"bold"}>Ghi chú</Typography>
                    <Typography fontSize={"14px"}>
                      Tìm kiếm đúng Email nguời dùng
                    </Typography>
                  </Box>
                </>
              )}
              {value == 2 && (
                <>
                  <Box
                    display={"flex"}
                    width={"100%"}
                    mt={"20px"}
                    justifyContent={"center"}
                  >
                    <Box
                      width={"100%"}
                      border={"1px solid #dddddd"}
                      borderRadius={"10px"}
                    >
                      <Stack
                        p={"15px"}
                        borderBottom={"1px solid #dddddd"}
                        direction={"row"}
                        gap={"30px"}
                        alignItems={"end"}
                      >
                        <RiBankCardFill size={30} style={{ color: "#333" }} />
                        <Typography>Thanh toán bằng thẻ</Typography>
                      </Stack>
                      <Stack
                        direction={"row"}
                        p={"15px"}
                        width={"100%"}
                        borderBottom={"1px solid #dddddd"}
                        gap={"30px"}
                      >
                        <img
                          width={"50%"}
                          src="http://cafefcdn.com/thumb_w/650/2019/1/15/logo-cac-ngan-hang-o1-1504769513088-1-15426822036241306429105-crop-15426822135161921260068-15475498874711162616360-crop-15475498929411148016221.jpg"
                          alt=""
                        />
                        <Box width={"50%"} mt={"15px"}>
                          <FormControl sx={{ m: 1, width: "95%" }}>
                            <InputLabel id="demo-select-small-label">
                              Chọn ngân hàng
                            </InputLabel>
                            <Select
                              value={bank}
                              onChange={(e) => setBank(e.target.value)}
                              labelId="demo-select-small-label"
                              id="demo-select-small"
                              label="Chọn ngân hàng"
                              fullWidth
                            >
                              {tenVietTatNganHangVN.map((item) => {
                                return <MenuItem value={item}>{item}</MenuItem>;
                              })}
                            </Select>
                          </FormControl>
                          <TextField
                            value={stk}
                            onChange={(e) => setStk(e.target.value)}
                            id="outlined-basic"
                            sx={{ width: "95%", m: 1 }}
                            label="Số tài khoản"
                            variant="outlined"
                          />
                          <TextField
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            id="outlined-basic"
                            sx={{ width: "95%", m: 1 }}
                            label="Số tiền"
                            variant="outlined"
                          />
                          <Button
                            onClick={handleWithdraw}
                            size="small"
                            sx={{
                              color: "#ff5117",
                              border: "2px solid #ff5117",
                              m: 1,
                              width: "95%",
                              height:'50px'
                            }}
                          >
                            Rút tiền
                            <RiArrowLeftRightFill
                              style={{ marginLeft: "5px" }}
                              size={17}
                            />
                          </Button>
                        </Box>
                      </Stack>
                    </Box>
                  </Box>
                  <Box
                    mt={"15px"}
                    p={"15px"}
                    border={"1px solid #dddddd"}
                    borderRadius={"10px"}
                  >
                    <Typography fontWeight={"bold"}>Ghi chú</Typography>
                    <Typography fontSize={"14px"}>
                      Chọn đúng ngân hàng
                    </Typography>
                    <Typography fontSize={"14px"}>
                      Nhập đúng số tài khoản
                    </Typography>
                    <Typography fontSize={"14px"}>
                      Số tiền rút không dưòi 10.000Đ
                    </Typography>
                  </Box>
                </>
              )}
              {value == 3 && (
                <>
                  <Box
                    display={"flex"}
                    width={"100%"}
                    mt={"20px"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    gap={"40px"}
                  >
                    <Typography>
                      Thông kê từ ngày {getStartOfMonth()}
                    </Typography>
                    <PolarAreaChart statistical={statistical} />
                  </Box>
                </>
              )}
            </Stack>
          </Stack>
        </Box>
        <Box width={"27%"} display={"flex"} justifyContent={"center"}>
          <img
            src={bg}
            width={"100%"}
            height={"400px"}
            style={{ borderRadius: "10px" }}
            alt=""
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default MyWalletView;

const PolarAreaChart = (props: any) => {
  const data = {
    labels: ["Nạp tiền", "Rút tiền", "Thanh toán", "Thưởng", "Chuyển tiền"],
    datasets: [
      {
        data: [
          props.statistical !== undefined && props.statistical.status == 0
            ? props.statistical.rechanrge
            : 0,
          props.statistical !== undefined && props.statistical.status == 0
            ? props.statistical.withdraw
            : 0,
          props.statistical !== undefined && props.statistical.status == 0
            ? props.statistical.purchase
            : 0,
          props.statistical !== undefined && props.statistical.status == 0
            ? props.statistical.reward
            : 0,
          props.statistical !== undefined && props.statistical.status == 0
            ? props.statistical.transfer
            : 0,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options: any = {
    responsive: true,
    scales: {
      r: {
        pointLabels: {
          display: true,
          centerPointLabels: true,
          font: {
            size: 12,
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: false,
        text: "Biểu đồ thống kê chi tiêu trong tháng vừa qua",
      },
    },
  };

  return (
    <Box width={500} height={500}>
      <PolarArea data={data} options={options} />
    </Box>
  );
};

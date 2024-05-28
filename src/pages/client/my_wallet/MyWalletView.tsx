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
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import React from "react";
import bg from "../../../images/cong-thanh-toan-vnpay-va-cach-tich-hop-vao-website-wordpress.jpg";

import {
  RiArrowLeftRightFill,
  RiArrowRightSLine,
  RiBankCardFill,
  RiSearchLine,
  RiWalletLine,
} from "react-icons/ri";
import { convertToVND, formatDate } from "@/utils/utils";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import profile from "../../../images/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg";
import { useLocalStorage } from "@/hooks/useStorage";
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
  setTransfer:any
    transfer:any
        handleTrander:any
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
  handleTrander
}: Props) => {
    const [user, setUser]: any = useLocalStorage("user", {});
    console.log(user.data[0].email);
  return (
    <Box>
      <Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
        <Box width={"600px"} padding={"60px 30px"}>
          <Typography variant="h5" fontWeight={"bold"}>
            Nạp tiền
          </Typography>
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
            <Typography variant="h4" fontWeight={"bold"}>
              Ví của tôi
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
                </Tabs>
              </Box>
            </Box>
            <Stack direction={"row"} justifyContent={"center"}>
              {value == 0 && (
                <TableContainer sx={{ mt: "30px" }} component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Kiểu</StyledTableCell>
                        <StyledTableCell>Số tiền</StyledTableCell>
                        <StyledTableCell>Trạng thái</StyledTableCell>
                        <StyledTableCell>Thời điểm giao dịch</StyledTableCell>
                        <StyledTableCell>Email</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {transtions &&
                        transtions.length > 0 &&
                        transtions.map((row: any) => {
                            console.log(row.email_transfer);
                            return (
                                <TableRow
                                  sx={{
                                    "&:last-child td, &:last-child th": { border: 0 },
                                  }}
                                >
                                  <TableCell component="th" scope="row">
                                    {row.type}
                                  </TableCell>
                                  <TableCell>{convertToVND(row.amount)}</TableCell>
                                  <TableCell>{row.status}</TableCell>
                                  
                                  <TableCell>{formatDate(row.createdAt)}</TableCell>
                                  {row.type=="transfer"&&<TableCell>{row.email_transfer==user.data[0].email?row.email_transfer:row.email_transfer}</TableCell>}
                                </TableRow>
                              )
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}

              {value == 1 && (
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
                  {dataEmail.length > 0 ? (
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
                            src={dataEmail[0].image.url?dataEmail[0].image.url:profile}
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
                            onChange={(e)=>setTransfer(e.target.value)}
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
                  ) : (
                    <Typography textAlign={"center"} mt={"20px"}>Not found data</Typography>
                  )}
                </Box>
              )}
              {value == 2 && (
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
                          id="outlined-basic"
                          sx={{ width: "95%", m: 1 }}
                          label="Số tài khoản"
                          variant="outlined"
                        />
                        <TextField
                          id="outlined-basic"
                          sx={{ width: "95%", m: 1 }}
                          label="Số tiền"
                          variant="outlined"
                        />
                        <Button
                          size="small"
                          sx={{
                            color: "#ff5117",
                            border: "2px solid #ff5117",
                            m: 1,
                            width: "95%",
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

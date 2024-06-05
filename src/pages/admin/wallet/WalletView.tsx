import { convertToVND, formatDate } from "@/utils/utils";
import {
  Box,
  Button,
  Paper,
  Popover,
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#ff5117",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
type Props = {
  handleChangeTabs: any;
  value: any;
  completed: any;
  notcompleted: any;
  handleWithdrawSuccess: any;
  handleClose: any;
  id: any;
  anchorEl: any;
  handleClick: any;
  open: any;
  note: any;
  setNote: any;
  handleWithdrawFaild:any
};

const WalletView = ({
  handleChangeTabs,
  value,
  completed,
  notcompleted,
  handleWithdrawSuccess,
  handleClose,
  id,
  anchorEl,
  handleClick,
  open,
  note,
  setNote,
  handleWithdrawFaild
}: Props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [paginatedRows, setPaginatedRows] = useState([]);
  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };
  useEffect(() => {
    if (completed) {
      setPaginatedRows(
        completed.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      );
    }
  }, [page, rowsPerPage, completed,]);
  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box p={"10px"}>
        <TextField
          value={note}
          onChange={(e) => setNote(e.target.value)}
          id="outlined-basic"
          sx={{ width: "95%", m: 1 }}
         placeholder="Ghi chú"
          variant="outlined"
          size="small"
        />
         <Stack direction={"row"} mt={"5px"} justifyContent={"end"}>
            <Button onClick={handleClose}>Hủy</Button>
            <Button
              onClick={handleWithdrawFaild}
              sx={{ color: "red" }}>
              Xóa
            </Button>
          </Stack>

        </Box>
      </Popover>
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
                  <Typography sx={{ gap: "5px" }}>Chưa hoàn thành</Typography>
                </>
              }
            />
            <Tab
              label={
                <>
                  <Typography sx={{ gap: "5px" }}>Hoàn thành</Typography>
                </>
              }
            />
          </Tabs>
        </Box>
      </Box>

      <Stack direction={"column"} justifyContent={"center"}>
        {value == 0 && (
          <TableContainer sx={{ mt: "30px" }} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Kiểu</StyledTableCell>
                  <StyledTableCell>Số tiền</StyledTableCell>
                  <StyledTableCell>Trạng thái</StyledTableCell>
                  <StyledTableCell>Ngân hàng</StyledTableCell>
                  <StyledTableCell>Số tài khoản</StyledTableCell>
                  <StyledTableCell>Thời điểm giao dịch</StyledTableCell>
                  <StyledTableCell>Chuyển trạng thái</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {notcompleted &&
                  notcompleted.length > 0 &&
                  notcompleted.map((row: any) => {
                    return (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.type}
                        </TableCell>
                        <TableCell>{convertToVND(row.amount)}</TableCell>
                        <TableCell>{row.status}</TableCell>
                        <TableCell>{row.bankAccount}</TableCell>
                        <TableCell>{row.stk}</TableCell>
                        <TableCell>{formatDate(row.createdAt)}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handleWithdrawSuccess(row._id)}
                          >
                            Thành công
                          </Button>
                          <Button aria-describedby={id} onClick={(e)=>handleClick(e,row)}>
                            Thất bại
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {value == 1 && (
          <>
          <TableContainer sx={{ mt: "30px" }} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Kiểu</StyledTableCell>
                  <StyledTableCell>Số tiền</StyledTableCell>
                  <StyledTableCell>Trạng thái</StyledTableCell>
                  <StyledTableCell>Ngân hàng</StyledTableCell>
                  <StyledTableCell>Số tài khoản</StyledTableCell>
                  <StyledTableCell>Thời điểm giao dịch</StyledTableCell>
                  <StyledTableCell>ghi chú</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedRows &&
                  paginatedRows.length > 0 &&
                  paginatedRows.map((row: any) => {
                    return (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.type}
                        </TableCell>
                        <TableCell>{convertToVND(row.amount)}</TableCell>
                        <TableCell>{row.status}</TableCell>
                        <TableCell>{row.bankAccount}</TableCell>
                        <TableCell>{row.stk}</TableCell>
                        <TableCell>{formatDate(row.updatedAt)}</TableCell>
                        <TableCell>{row.note}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={completed.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
          </>
        )}
      </Stack>
    </div>
  );
};

export default WalletView;

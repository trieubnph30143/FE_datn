import {
    Box,
    Button,
    Modal,
    Popover,
    Stack,
    TextField,
    Typography,
    styled,
  } from "@mui/material";
  import Paper from "@mui/material/Paper";
  import Table from "@mui/material/Table";
  import TableBody from "@mui/material/TableBody";
  import TableCell, { tableCellClasses } from "@mui/material/TableCell";
  import TableContainer from "@mui/material/TableContainer";
  import TableHead from "@mui/material/TableHead";
  import TableRow from "@mui/material/TableRow";
  import * as React from "react";
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#ff5117",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  type typeProps = {
    data:any;
    register: any;
    handleSubmit: any;
   
    handleOpenModal: any;
    handleCloseModal: any;
    openModal: boolean;
    onSubmit: any;
    handleDelete: any;
    handleClick: any;
    handleClose: any;
    id: any;
    anchorEl: any;
    open: any;
    action: string;
    deleteCategory:any;
  };
  const ContactView = ({
    data,
    register,
    handleSubmit,
  
    handleCloseModal,
    handleOpenModal,
    openModal,
    onSubmit,
    handleDelete,
    handleClick,
    handleClose,
    id,
    anchorEl,
    open,
    action,
    deleteCategory
  }: typeProps) => {
    return (
      <>
        <Stack my={"20px"} direction={"row"} justifyContent={"space-between"}>
          <Typography variant='h5'>Contact</Typography>
         
        </Stack>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align='left'>Email</StyledTableCell>
                <StyledTableCell align='left'>Subject</StyledTableCell>
                <StyledTableCell align='left'>Message</StyledTableCell>
                <StyledTableCell align='left'>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.length &&
                data.map((row:any) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component='th' scope='row'>
                      {row.name}
                    </TableCell>
                    <TableCell  align='left'>
                      {row.email}
                    </TableCell>
                    <TableCell  align='left'>
                      {row.subject}
                    </TableCell>
                    <TableCell  align='left'>
                      {row.message}
                    </TableCell>
  
                    <TableCell align='left'>
                      <Button onClick={() => handleOpenModal("UPDATE", row)}>
                        Reply
                      </Button>
                    
                    </TableCell>
                   
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}>
          <Box padding={"10px"}>
            <Typography>Bạn có muốn xóa không?</Typography>
            <Stack direction={"row"} mt={"15px"} justifyContent={"end"}>
              <Button onClick={handleClose}>Hủy</Button>
              <Button
                onClick={() => handleDelete(deleteCategory)}
                sx={{ color: "red" }}>
                Xóa
              </Button>
            </Stack>
          </Box>
        </Popover>
        <ModalForm
          open={openModal}
          register={register}
          handleSubmit={handleSubmit}
          
          handleClose={handleCloseModal}
          onSubmit={onSubmit}
          action={action}
        />
      </>
    );
  };
  
  export default ContactView;
  const ModalForm = (props: any) => {
    const style = {
      position: "absolute" as "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "40%",
      bgcolor: "background.paper",
  
      boxShadow: 24,
      p: 4,
    };
  
    return (
      <Modal
        open={props.open}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography variant='h5' textAlign={"center"}>
            Reply Contact
          </Typography>
          <form onSubmit={props.handleSubmit(props.onSubmit)}>
            <Stack
              width={"100%"}
              mt={"20px"}
              gap={"15px"}
              direction={"row"}
              flexWrap={"wrap"}>
              <Box width={"48%"}>
                <TextField
                  {...props.register("name")}
                  fullWidth
                  id='outlined-basic'
                  label='Title'
                  variant='outlined'
                  size='small'
                 
                />
              </Box>
              <Box width={"48%"}>
                <TextField
                  type='text'
                  {...props.register("email")}
                  fullWidth
                  id='outlined-basic'
                  label='Email'
                  variant='outlined'
                  size='small'
                  
                />
              </Box>
              <Box width={"48%"}>
                <TextField
                  {...props.register("subject")}
                  fullWidth
                  id='outlined-basic'
                  label='Subject'
                  variant='outlined'
                  size='small'
                 
                />
              </Box>
              <Box width={"48%"}>
                <TextField
                  type='text'
                  {...props.register("message")}
                  fullWidth
                  id='outlined-basic'
                  label='Message'
                  variant='outlined'
                  size='small'
                  
                />
              </Box>
              <Box width={"98%"}>
                <TextField
                  type='text'
                  {...props.register("reply")}
                  fullWidth
                  id='outlined-basic'
                  label='Reply'
                  variant='outlined'
                  size='small'
                  
                />
              </Box>
              <Box
                width={"100%"}
                display={"flex"}
                justifyContent={"end"}
                gap={"10px"}>
                <Button
                  onClick={props.handleClose}
                  sx={{
                    color: "black",
                    borderRadius: "99px",
                    width: "82px",
                    height: "34px",
                    border: "1px solid #333",
                  }}>
                  Close
                </Button>
                <Button
                  type='submit'
                  sx={{
                    background:
                      "linear-gradient(to right bottom, #ff8f26, #ff5117)",
                    color: "white",
                    borderRadius: "99px",
                    width: "92px",
                    height: "34px",
                  }}>
                  Add
                </Button>
              </Box>
            </Stack>
            
          </form>
        </Box>
      </Modal>
    );
  };
  
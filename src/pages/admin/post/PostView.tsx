
import {
  Box,
  Button,
  Modal,
  Popover,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { RiCloseFill } from "react-icons/ri";
import { Editor } from "@tinymce/tinymce-react";
type typeProps = {
  data: any;
  handleOpenModal: any;
  handleCloseModal: any;
  onSubmit: any;
  handleDelete: any;
  handleClick: any;
  handleClose: any;
  id: any;
  anchorEl: any;
  open: any;
  detailPost: any;
  openModal: any;
  handelChangeActive:any
};
const PostView = ({
  data,
  handleOpenModal,
  handleDelete,
  handleClick,
  handleClose,
  id,
  anchorEl,
  open,
  openModal,
  handleCloseModal,
  detailPost,
  handelChangeActive
}: typeProps) => {
  return (
    <>
      <Stack my={"20px"} direction={"row"} justifyContent={"space-between"}>
        <Typography variant="h5">Post</Typography>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Readers</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell>Active</TableCell>

              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.length &&
              data.map((row: any) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <img src={row.image.url} width={50} height={50} alt="" />
                  </TableCell>
                  <TableCell align="left">{row.readers}</TableCell>
                  <TableCell width={"40%"} align="left">
                    {row.description}
                  </TableCell>
                  <TableCell align="left">
                    {row.active == false ? "Chưa duyệt" : "Đã duyệt"}
                  </TableCell>

                  <TableCell align="left">

                    {!row.active ==true&&<Button onClick={()=>handelChangeActive(row)}>Change Active</Button>}
                    <Button
                      color="secondary"
                      onClick={() => handleOpenModal(row)}
                    >
                      Detail
                    </Button>
                    <Button
                      aria-describedby={id}
                      onClick={(e) => handleClick(e, row)}
                      sx={{ color: "red" }}
                    >
                      Delete
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
        }}
      >
        <Box padding={"10px"}>
          <Typography>Bạn có muốn xóa không?</Typography>
          <Stack direction={"row"} mt={"15px"} justifyContent={"end"}>
            <Button onClick={handleClose}>Hủy</Button>
            <Button
                onClick={() => handleDelete(detailPost)}
                sx={{ color: "red" }}>
                Xóa
              </Button>
          </Stack>
        </Box>
      </Popover>
      <ModalForm
        open={openModal}
        handleCloseModal={handleCloseModal}
        detailPost={detailPost}
      />
    </>
  );
};

export default PostView;
const ModalForm = (props: any) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.paper",

    boxShadow: 24,
    p: 6,
  };

  return (
    <Modal
      open={props.open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          onClick={props.handleCloseModal}
          sx={{ position: "absolute", top: "10px", right: "10px" }}
        >
          <RiCloseFill size={"25px"} />
        </Box>
        <Stack direction={"row"} gap={"30px"}>
          <Stack width={"49%"} direction={"column"} gap={"38px"}>
            <Box>
              <TextField
                fullWidth
                value={props.detailPost&&props.detailPost.title}
                label="Tiêu đề"
                id="fullWidth"
              />
            </Box>

            <Box>
              <TextField
                value={props.detailPost&&props.detailPost.description}
                fullWidth
                label="Mô tả khi tin được hiển thị"
                id="fullWidth"
              />
            </Box>

            <Box>
              <TextField
                value={props.detailPost&&props.detailPost.readers}
                fullWidth
                label="Thêm tối đa 5 thẻ để độc giả biết bài viết của bạn nói về điều gì."
                id="fullWidth"
              />
            </Box>
          </Stack>
          <Box sx={{ width: "49%" }}>
            <div
              className="container"
              style={{
                width: "100%",
              }}
            >
              <label
                htmlFor="input-img"
                className="preview"
                style={{
                  border: "2px dashed  #ff5117",
                  width: "100%",
                  height: "250px",
                  color: " #ff5117",
                  fontSize: "22px",
                  position: "relative",
                  borderRadius: "6px",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  cursor: "pointer",
                }}
              >
                <img
                  src={props.detailPost&&props.detailPost.image.url}
                  width={300}
                  height={250}
                  style={{
                    
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                  alt=""
                />
              </label>
            </div>
          </Box>
        </Stack>
        <Typography>Content</Typography>
        <Box
            sx={{
              " .tox-editor-header": {
                display: "none !important",
              },
              ".tox-statusbar": {
                display: "none !important",
              },
              width: "100%",
              height: "400px",
              
            }}
          >
            <Editor
              apiKey="vr0wwkbvph803e16rtf0mauheh4p5jy4fiw0akbjnf1benb6"
              initialValue={props.detailPost&&props.detailPost.content}
              init={{
                height: "400px",
                
              }}
             disabled
            />
          </Box>  
       
      </Box>
    </Modal>
  );
};

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Popover,
  Select,
  SelectChangeEvent,
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
import { RiUploadCloudFill } from "react-icons/ri";
type typeProps = {
  data: typeCourses[];
  register: any;
  handleSubmit: any;
  onFinish: any;
  errors: any;
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
  setFile: any;
  action: string;
  category: typeCategories[];
  deleteCourses: any;
  valueCategory: any;
  setImageUrl: any;
  imageUrl: any;
  setValueCategory: any;
};

const CoursesView = ({
  data,
  register,
  handleSubmit,
  errors,
  onFinish,
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
  setFile,
  category,
  deleteCourses,
  valueCategory,
  setImageUrl,
  imageUrl,
  setValueCategory,
}: typeProps) => {
  return (
    <>
      <Stack my={"20px"} direction={"row"} justifyContent={"space-between"}>
        <Typography variant='h5'>Courses</Typography>
        <Button onClick={() => handleOpenModal("CREATE")} variant='contained'>
          Add Courses
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align='left'>Image</TableCell>
              <TableCell align='left'>Category</TableCell>
              <TableCell align='left'>Price</TableCell>
              <TableCell align='left'>Description</TableCell>
              <TableCell align='left'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.length &&
              data.map((row) => (
                <TableRow
                  key={row.title}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align='left'>{row.title}</TableCell>
                  <TableCell component='th' scope='row'>
                    <img src={row.image.url} width={50} height={50} alt='' />
                  </TableCell>
                  <TableCell align='left'>{row.category_id.length&& row.category_id[0].name}</TableCell>
                  <TableCell align='left'>{row.price}</TableCell>
                  <TableCell align='left'>{row.description}</TableCell>
                  <TableCell align='left'>
                    <Button onClick={() => handleOpenModal("UPDATE", row)}>
                      Edit
                    </Button>
                    <Button
                      aria-describedby={id}
                      onClick={(e) => handleClick(e, row)}
                      sx={{ color: "red" }}>
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
        }}>
        <Box padding={"10px"}>
          <Typography>Bạn có muốn xóa không?</Typography>
          <Stack direction={"row"} mt={"15px"} justifyContent={"end"}>
            <Button onClick={handleClose}>Hủy</Button>
            <Button
              onClick={() => handleDelete(deleteCourses)}
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
        onFinish={onFinish}
        errors={errors}
        handleClose={handleCloseModal}
        onSubmit={onSubmit}
        action={action}
        setFile={setFile}
        category={category}
        valueCategory={valueCategory}
        setImageUrl={setImageUrl}
        imageUrl={imageUrl}
        setValueCategory={setValueCategory}
      />
    </>
  );
};

export default CoursesView;
const ModalForm = (props: any) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.paper",

    boxShadow: 24,
    p: 4,
  };

  const handleImageChange = (e: any) => {
    let file = e.target.files[0];

    props.setFile(file);
    if (!file) return;

    const reader: any = new FileReader();
    reader.onload = () => {
      props.setImageUrl(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal
      open={props.open}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'>
      <Box sx={style}>
        <Typography variant='h5' textAlign={"center"}>
          {props.action == "CREATE" ? "Add Courses" : "Update Courses"}
        </Typography>
        <form onSubmit={props.handleSubmit(props.onFinish)}>
          <Stack
            width={"100%"}
            mt={"20px"}
            gap={"15px"}
            direction={"row"}
            flexWrap={"wrap"}>
            <Box width={"24%"}>
              <TextField
                {...props.register("title")}
                fullWidth
                id='outlined-basic'
                label='Title'
                variant='outlined'
                size='small'
              />
            </Box>
            <Box width={"24%"}>
              <TextField
                type='number'
                {...props.register("price")}
                fullWidth
                id='outlined-basic'
                label='Price'
                variant='outlined'
                size='small'
              />
            </Box>
            <Box width={"24%"}>
              <TextField
                {...props.register("instructor")}
                fullWidth
                id='outlined-basic'
                label='Instructor'
                variant='outlined'
                size='small'
              />
            </Box>
            <Box width={"24%"}>
              <FormControl fullWidth size='small'>
                <InputLabel id='demo-simple-select-label'>Category</InputLabel>
                <Select
                  {...props.register("category_id")}
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={props.valueCategory}
                  label='Category'
                  onChange={(e) => props.setValueCategory(e.target.value)}>
                  {props.category &&
                    props.category.length &&
                    props.category.map((item: any) => {
                      return <MenuItem value={item._id}>{item.name}</MenuItem>;
                    })}
                </Select>
              </FormControl>
            </Box>
            <Box width={"32%"}>
              <div
                className='container'
                style={{
                  width: "100%",
                }}>
                <label
                  htmlFor='input-img'
                  className='preview'
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
                  }}>
                  {props.imageUrl ? (
                    <img
                      src={props.imageUrl}
                      width={"100%"}
                      height={250}
                      style={{
                        objectFit: "cover",
                        position: "absolute",
                        top: 0,
                        left: 0,
                      }}
                      alt=''
                    />
                  ) : (
                    ""
                  )}
                  <RiUploadCloudFill size={"37px"} />
                  <Typography fontSize={"14px"}>
                    Upload to preview image
                  </Typography>
                </label>
                <input
                  onChange={handleImageChange}
                  type='file'
                  hidden
                  id='input-img'
                />
              </div>
            </Box>
            <Box width={"66.3%"}>
              <TextField
                {...props.register("description")}
                id='outlined-multiline-static'
                label='Description'
                multiline
                rows={9.5}
                fullWidth
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
                onClick={props.onSubmit}
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

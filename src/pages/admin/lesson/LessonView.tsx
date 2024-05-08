import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
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
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { RiCloseFill, RiUploadCloudFill } from "react-icons/ri";
function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];
const LessonView = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <Stack my={"20px"} direction={"row"} justifyContent={"space-between"}>
        <Typography variant='h5'>Lesson</Typography>
        <Button onClick={handleOpenModal} variant='contained'>
          Add Lesson
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align='right'>Duration</TableCell>

              <TableCell align='right'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell align='right'>{row.calories}</TableCell>

                <TableCell align='right'>
                  <Button>Edit</Button>
                  <Button
                    aria-describedby={id}
                    onClick={handleClick}
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
            <Button sx={{ color: "red" }}>Xóa</Button>
          </Stack>
        </Box>
      </Popover>
      <ModalForm open={openModal} handleClose={handleCloseModal} />
    </>
  );
};

export default LessonView;
const ModalForm = (props: any) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",

    boxShadow: 24,
    p: 4,
  };
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Modal
      open={props.open}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'>
      <Box sx={style}>
        <Typography variant='h5' textAlign={"center"}>
          Add Lesson
        </Typography>
        <Stack
          width={"100%"}
          mt={"20px"}
          gap={"15px"}
          direction={"row"}
          flexWrap={"wrap"}>
          <Box width={"48%"}>
            <TextField
              fullWidth
              id='outlined-basic'
              label='Title'
              variant='outlined'
              size='small'
            />
          </Box>
          <Box width={"48%"}>
            <TextField
              type='number'
              fullWidth
              id='outlined-basic'
              label='Duration'
              variant='outlined'
              size='small'
            />
          </Box>
          <Box width={"98%"}>
            <FormControl fullWidth size='small'>
              <InputLabel id='demo-simple-select-label'>Courses</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={age}
                label='Courses'
                onChange={handleChange}>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
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
      </Box>
    </Modal>
  );
};

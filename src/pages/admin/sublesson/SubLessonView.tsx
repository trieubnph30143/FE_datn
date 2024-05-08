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
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import {
  RiCloseFill,
  RiFileTextLine,
  RiPencilFill,
  RiPlayCircleFill,
  RiQuestionFill,
  RiUploadCloudFill,
} from "react-icons/ri";
import { Editor } from "@tinymce/tinymce-react";
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
const SubLessonView = () => {
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
        <Typography variant='h5'>SubLesson</Typography>
        <Button onClick={handleOpenModal} variant='contained'>
          Add SubLesson
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align='right'>Type</TableCell>

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

export default SubLessonView;
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
  const [age, setAge] = React.useState("");
  const [value, setValue] = React.useState(0);
  const [content, setContent] = React.useState("");

  const handleEditorChange = (e: any, editor: any) => {
    setContent(editor.getContent());
  };
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const handleChangeType = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Modal
      open={props.open}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'>
      <Box sx={style}>
        <Typography variant='h5' textAlign={"center"}>
          Add SubLesson
        </Typography>
        <Stack
          width={"100%"}
          mt={"20px"}
          gap={"15px"}
          direction={"row"}
          flexWrap={"wrap"}>
          <Box width={"98.5%"}>
            <FormControl fullWidth size='small'>
              <InputLabel id='demo-simple-select-label'>Lesson</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={age}
                label='Lesson'
                onChange={handleChange}>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box width={"32%"}>
            <TextField
              fullWidth
              id='outlined-basic'
              label='Title'
              variant='outlined'
              size='small'
            />
          </Box>
          <Box width={"32%"}>
            <TextField
              type='number'
              fullWidth
              id='outlined-basic'
              label='Duration'
              variant='outlined'
              size='small'
            />
          </Box>
          <Box width={"32%"}>
            <TextField
              fullWidth
              id='outlined-basic'
              label='Description'
              variant='outlined'
              size='small'
            />
          </Box>
          <Box width={"100%"}>
            <Tabs
              value={value}
              onChange={handleChangeType}
              aria-label='basic tabs example'>
              <Tab
                label={
                  <Stack direction={"row"} alignItems={"center"} gap={"5px"}>
                    <RiPlayCircleFill size={"14px"} />
                    <Typography textTransform={"lowercase"}>Video</Typography>
                  </Stack>
                }
              />
              <Tab
                label={
                  <Stack direction={"row"} alignItems={"center"} gap={"5px"}>
                    <RiQuestionFill size={"14px"} />
                    <Typography textTransform={"lowercase"}>Quizz</Typography>
                  </Stack>
                }
              />
              <Tab
                label={
                  <Stack direction={"row"} alignItems={"center"} gap={"5px"}>
                    <RiFileTextLine size={"14px"} />
                    <Typography textTransform={"lowercase"}>Blog</Typography>
                  </Stack>
                }
              />
              <Tab
                label={
                  <Stack direction={"row"} alignItems={"center"} gap={"5px"}>
                    <RiPencilFill size={"14px"} />
                    <Typography textTransform={"lowercase"}>Code</Typography>
                  </Stack>
                }
              />
            </Tabs>
            {value == 0 && (
              <Box mt={"20px"}>
                <Box width={"98.5%"}>
                  <TextField
                    fullWidth
                    id='outlined-basic'
                    label='VideoId'
                    variant='outlined'
                    size='small'
                  />
                </Box>
              </Box>
            )}
            {value == 1 && (
              <Box mt={"20px"}>
                <Box width={"98.5%"} display={"flex"} gap={"20px"}>
                  <Box
                    sx={{
                      ".tox-statusbar": {
                        display: "none !important",
                      },
                      width: "50%",
                    }}>
                    <Editor
                      apiKey='vr0wwkbvph803e16rtf0mauheh4p5jy4fiw0akbjnf1benb6'
                      onEditorChange={handleEditorChange}
                      init={{
                        plugins:
                          "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion",
                        editimage_cors_hosts: ["picsum.photos"],
                        menubar:
                          "file edit view insert format tools table help",
                        toolbar:
                          "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl",
                        autosave_ask_before_unload: true,
                        autosave_interval: "30s",
                        autosave_prefix: "{path}{query}-{id}-",
                        autosave_restore_when_empty: false,
                        autosave_retention: "2m",
                        image_advtab: true,
                        link_list: [
                          {
                            title: "My page 1",
                            value: "https://www.tiny.cloud",
                          },
                          {
                            title: "My page 2",
                            value: "http://www.moxiecode.com",
                          },
                        ],
                        image_list: [
                          {
                            title: "My page 1",
                            value: "https://www.tiny.cloud",
                          },
                          {
                            title: "My page 2",
                            value: "http://www.moxiecode.com",
                          },
                        ],
                        image_class_list: [
                          { title: "None", value: "" },
                          { title: "Some class", value: "class-name" },
                        ],
                        importcss_append: true,
                        file_picker_callback: (callback, value, meta) => {
                          /* Provide file and text for the link dialog */
                          if (meta.filetype === "file") {
                            callback(
                              "https://www.google.com/logos/google.jpg",
                              {
                                text: "My text",
                              }
                            );
                          }

                          /* Provide image and alt text for the image dialog */
                          if (meta.filetype === "image") {
                            callback(
                              "https://www.google.com/logos/google.jpg",
                              {
                                alt: "My alt text",
                              }
                            );
                          }

                          /* Provide alternative source and posted for the media dialog */
                          if (meta.filetype === "media") {
                            callback("movie.mp4", {
                              source2: "alt.ogg",
                              poster: "https://www.google.com/logos/google.jpg",
                            });
                          }
                        },

                        height: 300,
                        image_caption: true,
                        quickbars_selection_toolbar:
                          "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
                        noneditable_class: "mceNonEditable",
                        toolbar_mode: "sliding",
                        contextmenu: "link image table",

                        content_style:
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
                      }}
                    />
                  </Box>
                  <Box
                    width={"50%"}
                    display={"flex"}
                    flexDirection={"column"}
                    gap={"15px"}>
                    <Box display={"flex"} gap={"10px"}>
                      <Box width={"69%"}>
                        <TextField
                          fullWidth
                          id='outlined-basic'
                          label='AnswerOne'
                          variant='outlined'
                          size='small'
                        />
                      </Box>

                      <Box width={"29%"}>
                        <FormControl fullWidth size='small'>
                          <InputLabel id='demo-simple-select-label'>
                            Correct
                          </InputLabel>
                          <Select
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={age}
                            label='Correct'
                            onChange={handleChange}>
                            <MenuItem value={`true`}>True</MenuItem>
                            <MenuItem value={`false`}>False</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Box>
                    <Box display={"flex"} gap={"10px"}>
                      <Box width={"69%"}>
                        <TextField
                          fullWidth
                          id='outlined-basic'
                          label='AnswerTwo'
                          variant='outlined'
                          size='small'
                        />
                      </Box>

                      <Box width={"29%"}>
                        <FormControl fullWidth size='small'>
                          <InputLabel id='demo-simple-select-label'>
                            Correct
                          </InputLabel>
                          <Select
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={age}
                            label='Correct'
                            onChange={handleChange}>
                            <MenuItem value={`true`}>True</MenuItem>
                            <MenuItem value={`false`}>False</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Box>
                    <Box display={"flex"} gap={"10px"}>
                      <Box width={"69%"}>
                        <TextField
                          fullWidth
                          id='outlined-basic'
                          label='AnswerThree'
                          variant='outlined'
                          size='small'
                        />
                      </Box>

                      <Box width={"29%"}>
                        <FormControl fullWidth size='small'>
                          <InputLabel id='demo-simple-select-label'>
                            Correct
                          </InputLabel>
                          <Select
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={age}
                            label='Correct'
                            onChange={handleChange}>
                            <MenuItem value={`true`}>True</MenuItem>
                            <MenuItem value={`false`}>False</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}
            {value == 2 && (
              <Box mt={"20px"}>
                <Box width={"98.5%"} display={"flex"} gap={"20px"}>
                  <Box
                    sx={{
                      ".tox-statusbar": {
                        display: "none !important",
                      },
                      width: "99.5%",
                    }}>
                    <Editor
                      apiKey='vr0wwkbvph803e16rtf0mauheh4p5jy4fiw0akbjnf1benb6'
                      onEditorChange={handleEditorChange}
                      init={{
                        plugins:
                          "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion",
                        editimage_cors_hosts: ["picsum.photos"],
                        menubar:
                          "file edit view insert format tools table help",
                        toolbar:
                          "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl",
                        autosave_ask_before_unload: true,
                        autosave_interval: "30s",
                        autosave_prefix: "{path}{query}-{id}-",
                        autosave_restore_when_empty: false,
                        autosave_retention: "2m",
                        image_advtab: true,
                        link_list: [
                          {
                            title: "My page 1",
                            value: "https://www.tiny.cloud",
                          },
                          {
                            title: "My page 2",
                            value: "http://www.moxiecode.com",
                          },
                        ],
                        image_list: [
                          {
                            title: "My page 1",
                            value: "https://www.tiny.cloud",
                          },
                          {
                            title: "My page 2",
                            value: "http://www.moxiecode.com",
                          },
                        ],
                        image_class_list: [
                          { title: "None", value: "" },
                          { title: "Some class", value: "class-name" },
                        ],
                        importcss_append: true,
                        file_picker_callback: (callback, value, meta) => {
                          /* Provide file and text for the link dialog */
                          if (meta.filetype === "file") {
                            callback(
                              "https://www.google.com/logos/google.jpg",
                              {
                                text: "My text",
                              }
                            );
                          }

                          /* Provide image and alt text for the image dialog */
                          if (meta.filetype === "image") {
                            callback(
                              "https://www.google.com/logos/google.jpg",
                              {
                                alt: "My alt text",
                              }
                            );
                          }

                          /* Provide alternative source and posted for the media dialog */
                          if (meta.filetype === "media") {
                            callback("movie.mp4", {
                              source2: "alt.ogg",
                              poster: "https://www.google.com/logos/google.jpg",
                            });
                          }
                        },

                        height: 300,
                        image_caption: true,
                        quickbars_selection_toolbar:
                          "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
                        noneditable_class: "mceNonEditable",
                        toolbar_mode: "sliding",
                        contextmenu: "link image table",

                        content_style:
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            )}
            {value == 3 && (
              <Box mt={"20px"}>
                <Box width={"98.5%"} display={"flex"} gap={"20px"}>
                  <Box
                    sx={{
                      ".tox-statusbar": {
                        display: "none !important",
                      },
                      width: "50%",
                    }}>
                    <Editor
                      apiKey='vr0wwkbvph803e16rtf0mauheh4p5jy4fiw0akbjnf1benb6'
                      onEditorChange={handleEditorChange}
                      init={{
                        plugins:
                          "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion",
                        editimage_cors_hosts: ["picsum.photos"],
                        menubar:
                          "file edit view insert format tools table help",
                        toolbar:
                          "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl",
                        autosave_ask_before_unload: true,
                        autosave_interval: "30s",
                        autosave_prefix: "{path}{query}-{id}-",
                        autosave_restore_when_empty: false,
                        autosave_retention: "2m",
                        image_advtab: true,
                        link_list: [
                          {
                            title: "My page 1",
                            value: "https://www.tiny.cloud",
                          },
                          {
                            title: "My page 2",
                            value: "http://www.moxiecode.com",
                          },
                        ],
                        image_list: [
                          {
                            title: "My page 1",
                            value: "https://www.tiny.cloud",
                          },
                          {
                            title: "My page 2",
                            value: "http://www.moxiecode.com",
                          },
                        ],
                        image_class_list: [
                          { title: "None", value: "" },
                          { title: "Some class", value: "class-name" },
                        ],
                        importcss_append: true,
                        file_picker_callback: (callback, value, meta) => {
                          /* Provide file and text for the link dialog */
                          if (meta.filetype === "file") {
                            callback(
                              "https://www.google.com/logos/google.jpg",
                              {
                                text: "My text",
                              }
                            );
                          }

                          /* Provide image and alt text for the image dialog */
                          if (meta.filetype === "image") {
                            callback(
                              "https://www.google.com/logos/google.jpg",
                              {
                                alt: "My alt text",
                              }
                            );
                          }

                          /* Provide alternative source and posted for the media dialog */
                          if (meta.filetype === "media") {
                            callback("movie.mp4", {
                              source2: "alt.ogg",
                              poster: "https://www.google.com/logos/google.jpg",
                            });
                          }
                        },

                        height: 300,
                        image_caption: true,
                        quickbars_selection_toolbar:
                          "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
                        noneditable_class: "mceNonEditable",
                        toolbar_mode: "sliding",
                        contextmenu: "link image table",

                        content_style:
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
                      }}
                    />
                  </Box>
                  <Box
                    width={"50%"}
                    display={"flex"}
                    flexDirection={"column"}
                    gap={"15px"}>
                    <Box display={"flex"} flexDirection={"column"} gap={"15px"}>
                      <Box width={"100%"}>
                        <TextField
                          fullWidth
                          id='outlined-basic'
                          label='Prompt'
                          variant='outlined'
                          size='small'
                        />
                      </Box>
                      <Box width={"100%"}>
                        <TextField
                          fullWidth
                          id='outlined-basic'
                          label='Exercise'
                          variant='outlined'
                          size='small'
                        />
                      </Box>
                      <Box width={"100%"}>
                        <TextField
                          fullWidth
                          id='outlined-basic'
                          label='Solution'
                          variant='outlined'
                          size='small'
                        />
                      </Box>
                      <Box width={"100%"}>
                        <FormControl fullWidth size='small'>
                          <InputLabel id='demo-simple-select-label'>
                            Type Exercise
                          </InputLabel>
                          <Select
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={age}
                            label='Type Exercise'
                            onChange={handleChange}>
                            <MenuItem value={`html`}>Html</MenuItem>
                            <MenuItem value={`html-css`}>Html-Css</MenuItem>
                            <MenuItem value={`javascript`}>JavaScript</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}
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

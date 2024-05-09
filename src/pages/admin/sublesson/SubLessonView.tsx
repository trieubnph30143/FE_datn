import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Popover,
  Select,
  Stack,
  Tab,
  Tabs,
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
import MonacoEditor from "@monaco-editor/react";
import ReplayIcon from "@mui/icons-material/Replay";
import { Editor } from "@tinymce/tinymce-react";
import js from "../../../images/ja.svg";
import html from "../../../images/html.svg";
import css from "../../../images/css.svg";
import {
  RiFileTextLine,
  RiPencilFill,
  RiPlayCircleFill,
  RiQuestionFill,
} from "react-icons/ri";
type typeProps = {
  data: typeLesson[];
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
  action: string;
  deleteLesson: any;
  valueCourses: any;
  setValueCourses: any;
  handleEditorChange: any;
  value: any;
  handleChangeType: any;
  handleChangeRight: any;
  handleChangeExercise: any;
  handleChangeExerciseHtml: any;
  handleChangeExerciseCss: any;
  valueRight: any;
  lesson:any
};
const SubLessonView = ({
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
  deleteLesson,
  valueCourses,
  setValueCourses,
  handleChangeType,
  handleEditorChange,
  value,
  handleChangeRight,
  handleChangeExercise,
  handleChangeExerciseHtml,
  handleChangeExerciseCss,
  valueRight,
  lesson
}: typeProps) => {
  return (
    <>
      <Stack my={"20px"} direction={"row"} justifyContent={"space-between"}>
        <Typography variant="h5">Lesson</Typography>
        <Button onClick={() => handleOpenModal("CREATE")} variant="contained">
          Add Lesson
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Title</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Duration</TableCell>

              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.length &&
              data.map((row) => (
                <TableRow
                  key={row.title}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row.title}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.description}
                  </TableCell>

                  <TableCell align="left">{row.duration}</TableCell>

                  <TableCell align="left">
                    <Button onClick={() => handleOpenModal("UPDATE", row)}>
                      Edit
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
              onClick={() => handleDelete(deleteLesson)}
              sx={{ color: "red" }}
            >
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
        valueCourses={valueCourses}
        setValueCourses={setValueCourses}
        handleChangeType={handleChangeType}
        handleEditorChange={handleEditorChange}
        value={value}
        handleChangeRight={handleChangeRight}
        handleChangeExercise={handleChangeExercise}
        handleChangeExerciseHtml={handleChangeExerciseHtml}
        handleChangeExerciseCss={handleChangeExerciseCss}
        valueRight={valueRight}
        lesson={lesson}
      />
    </>
  );
};
export default SubLessonView;
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
const ModalForm = (props: any) => {
  return (
    <Modal
      open={props.open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h5" textAlign={"center"}>
          Add SubLesson
        </Typography>
        <form onSubmit={props.handleSubmit(props.onFinish)}>
          <Stack
            width={"100%"}
            mt={"20px"}
            gap={"15px"}
            direction={"row"}
            flexWrap={"wrap"}
          >
            <Box width={"32%"}>
              <TextField
                fullWidth
                {...props.register("title")}
                id="outlined-basic"
                label="Title"
                variant="outlined"
                size="small"
              />
            </Box>
            <Box width={"32%"}>
              <TextField
                {...props.register("duration")}
                type="number"
                fullWidth
                id="outlined-basic"
                label="Duration"
                variant="outlined"
                size="small"
              />
            </Box>
            <Box width={"32%"}>
              <TextField
                {...props.register("description")}
                fullWidth
                id="outlined-basic"
                label="Description"
                variant="outlined"
                size="small"
              />
            </Box>
            <Box width={"100%"}>
              <Tabs
                value={props.value}
                onChange={props.handleChangeType}
                aria-label="basic tabs example"
              >
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
              {props.value == 0 && (
                <Box mt={"20px"}>
                  <Box width={"98.5%"}>
                    <TextField
                      {...props.register("video_id")}
                      fullWidth
                      id="outlined-basic"
                      label="VideoId"
                      variant="outlined"
                      size="small"
                    />
                  </Box>
                </Box>
              )}
              {props.value == 1 && (
                <Box mt={"20px"}>
                  <Box width={"98.5%"} display={"flex"} gap={"20px"}>
                    <Box
                      sx={{
                        ".tox-statusbar": {
                          display: "none !important",
                        },
                        width: "50%",
                      }}
                    >
                      <Editor
                        apiKey="vr0wwkbvph803e16rtf0mauheh4p5jy4fiw0akbjnf1benb6"
                        onEditorChange={props.handleEditorChange}
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
                                poster:
                                  "https://www.google.com/logos/google.jpg",
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
                      gap={"15px"}
                    >
                      <Box display={"flex"} gap={"10px"}>
                        <Box width={"69%"}>
                          <TextField
                            {...props.register("answerOne")}
                            fullWidth
                            id="outlined-basic"
                            label="AnswerOne"
                            variant="outlined"
                            size="small"
                          />
                        </Box>

                        <Box width={"29%"}>
                          <FormControl fullWidth size="small">
                            <InputLabel id="demo-simple-select-label">
                              Correct
                            </InputLabel>
                            <Select
                              {...props.register("correctOne")}
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              label="Correct"
                            >
                              <MenuItem value={`true`}>True</MenuItem>
                              <MenuItem value={`false`}>False</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </Box>
                      <Box display={"flex"} gap={"10px"}>
                        <Box width={"69%"}>
                          <TextField
                            {...props.register("answerTwo")}
                            fullWidth
                            id="outlined-basic"
                            label="AnswerTwo"
                            variant="outlined"
                            size="small"
                          />
                        </Box>

                        <Box width={"29%"}>
                          <FormControl fullWidth size="small">
                            <InputLabel id="demo-simple-select-label">
                              Correct
                            </InputLabel>
                            <Select
                              {...props.register("correctTwo")}
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              label="Correct"
                            >
                              <MenuItem value={`true`}>True</MenuItem>
                              <MenuItem value={`false`}>False</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </Box>
                      <Box display={"flex"} gap={"10px"}>
                        <Box width={"69%"}>
                          <TextField
                            {...props.register("answerThree")}
                            fullWidth
                            id="outlined-basic"
                            label="AnswerThree"
                            variant="outlined"
                            size="small"
                          />
                        </Box>

                        <Box width={"29%"}>
                          <FormControl fullWidth size="small">
                            <InputLabel id="demo-simple-select-label">
                              Correct
                            </InputLabel>
                            <Select
                              {...props.register("correctThree")}
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              label="Correct"
                            >
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
              {props.value == 2 && (
                <Box mt={"20px"}>
                  <Box width={"98.5%"} display={"flex"} gap={"20px"}>
                    <Box
                      sx={{
                        ".tox-statusbar": {
                          display: "none !important",
                        },
                        width: "99.5%",
                      }}
                    >
                      <Editor
                        apiKey="vr0wwkbvph803e16rtf0mauheh4p5jy4fiw0akbjnf1benb6"
                        onEditorChange={props.handleEditorChange}
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
                                poster:
                                  "https://www.google.com/logos/google.jpg",
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
              {props.value == 3 && (
                <Box>
                  <Box mt={"10px"} display={"flex"} gap={"15px"}>
                    <Box width={"33%"}>
                      <TextField
                        {...props.register("solution_key")}
                        fullWidth
                        id="outlined-basic"
                        label="Solution Key"
                        variant="outlined"
                        size="small"
                      />
                    </Box>
                    <Box width={"33%"}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">
                          Type Exercise
                        </InputLabel>
                        <Select
                          {...props.register("type_exercise")}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Type Exercise"
                        >
                          <MenuItem value={`html`}>Html</MenuItem>
                          <MenuItem value={`html-css`}>Html-Css</MenuItem>
                          <MenuItem value={`javascript`}>JavaScript</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <Box width={"33%"}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Lesson</InputLabel>
              <Select
               {...props.register("courses_id")}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label='Lesson'
               
              >
                 {props.lesson &&
                    props.lesson.length &&
                    props.lesson.map((item: any) => {
                      return <MenuItem value={item._id}>{item.title}</MenuItem>;
                    })}
                
              </Select>
            </FormControl>
          </Box>
                  </Box>
                  <Box
                    width={"98.5%"}
                    mt={"15px"}
                    display={"flex"}
                    gap={"20px"}
                  >
                    <Box
                      sx={{
                        ".tox-statusbar": {
                          display: "none !important",
                        },
                        width: "50%",
                      }}
                    >
                      <Editor
                        apiKey="vr0wwkbvph803e16rtf0mauheh4p5jy4fiw0akbjnf1benb6"
                        onEditorChange={props.handleEditorChange}
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
                                poster:
                                  "https://www.google.com/logos/google.jpg",
                              });
                            }
                          },

                          height: 290,
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
                      borderRadius={"10px"}
                      overflow={"hidden"}
                      height={"290px"}
                    >
                     <Stack
            sx={{
              ".css-1aquho2-MuiTabs-indicator": {
                display: "none",
              },
              ".css-1h9z7r5-MuiButtonBase-root-MuiTab-root": {
                minHeight: "0",
                height: "40px",
                color: "white",
              },
              height: "40px",
              ".css-heg063-MuiTabs-flexContainer": {
                mt: "5px",
                background: "#1e1e1e",
              },
              ".css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected": {
                color: "#1976d2 !important",
              },
            }}
            bgcolor={"#343434"}
            
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            width={"99.9%"}>
            <Tabs
              value={props.valueRight}
              onChange={props.handleChangeRight}
              aria-label='basic tabs example'>
              <Tab
                label={
                  <Stack direction={"row"} alignItems={"center"} gap={"4px"}>
                    <img
                      src={js}
                      width={17}
                      height={17}
                      style={{ borderRadius: "5px" }}
                      alt=''
                    />
                    <Typography
                      fontSize={"12px"}
                      sx={{ textTransform: "lowercase"}}>
                      main.js
                    </Typography>
                  </Stack>
                }
              />
              <Tab
                label={
                  <Stack direction={"row"} alignItems={"center"} gap={"4px"}>
                    <img
                      src={html}
                      width={17}
                      height={17}
                      style={{ borderRadius: "5px" }}
                      alt=''
                    />
                    <Typography
                      
                      fontSize={"12px"}
                      sx={{ textTransform: "lowercase"}}>
                      index.html
                    </Typography>
                  </Stack>
                }
              />
              <Tab
                label={
                  <Stack direction={"row"} alignItems={"center"} gap={"4px"}>
                    <img
                      src={css}
                      width={17}
                      height={17}
                      style={{ borderRadius: "5px" }}
                      alt=''
                    />
                    <Typography
                      fontSize={"12px"}
                      sx={{ textTransform: "lowercase" }}>
                      style.css
                    </Typography>
                  </Stack>
                }
              />
            </Tabs>
            <Box
              width={"65px"}
              height={"40px"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              bgcolor={"#1e1e1e"}>
              <ReplayIcon sx={{ color: "white" }} />
            </Box>
          </Stack>
          <Box
            sx={{
              " .slider-mouseover": {
                display: "none",
              },
            }}>
            {props.valueRight == 0 && (
              <MonacoEditor
                width={"100%"}
                height='250px'
                language='javascript'
                theme='vs-dark'
                value={`//Tạo 1 mảng chứa ít nhất 3 phần tử tên Sum`}
                onChange={(value) => props.handleChangeExercise(value)}
              />
            )}
            {props.valueRight == 1 && (
              <MonacoEditor
                height='250px'
                language='html'
                theme='vs-dark'
                value={props.exerciseHtml}
                onChange={(value) => props.handleChangeExerciseHtml(value)}
              />
            )}
            {props.valueRight == 2 && (
              <MonacoEditor
                height='250px'
                language='css'
                theme='vs-dark'
                value={props.exerciseCss}
                onChange={(value) => props.handleChangeExerciseCss(value)}
              />
            )}
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
              gap={"10px"}
            >
              <Button
                onClick={props.handleClose}
                sx={{
                  color: "black",
                  borderRadius: "99px",
                  width: "82px",
                  height: "34px",
                  border: "1px solid #333",
                }}
              >
                Close
              </Button>
              <Button
                type="submit"
                sx={{
                  background:
                    "linear-gradient(to right bottom, #ff8f26, #ff5117)",
                  color: "white",
                  borderRadius: "99px",
                  width: "92px",
                  height: "34px",
                }}
              >
                Add
              </Button>
            </Box>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

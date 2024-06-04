import {
  Box,
  Button,
  CircularProgress,
  Drawer,
  Fade,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Popover,
  Radio,
  RadioGroup,
  Stack,
  Step,
  StepConnector,
  StepContent,
  StepLabel,
  Stepper,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  TooltipProps,
  Typography,
  styled,
  tooltipClasses,
} from "@mui/material";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import logo from "../../../images/f8-icon.18cd71cfcfa33566a22b.png";
import direction from "../../../images/Screenshot from 2024-05-21 10-05-13.png";
import left from "../../../images/left.png";
import right from "../../../images/right.png";
import ques from "../../../images/q.png";
import note2 from "../../../images/note2.png";
import note1 from "../../../images/n.png";
import direction2 from "../../../images/direction.png";
import {
  RiAddFill,
  RiArrowDownSLine,
  RiArrowDropDownFill,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiArticleLine,
  RiCheckboxCircleFill,
  RiCheckLine,
  RiCloseLine,
  RiFile3Fill,
  RiFlagFill,
  RiFolderOpenFill,
  RiGift2Fill,
  RiHeartFill,
  RiLock2Fill,
  RiMessengerFill,
  RiMoreFill,
  RiPencilFill,
  RiPlayCircleFill,
  RiQuestionFill,
  RiShareBoxFill,
  RiStickyNoteFill,
  RiSubtractFill,
  RiYoutubeFill,
} from "react-icons/ri";
import ReplayIcon from "@mui/icons-material/Replay";
import MonacoEditor from "@monaco-editor/react";
import { Editor } from "@tinymce/tinymce-react";
import js from "../../../images/ja.svg";
import html from "../../../images/html.svg";
import css from "../../../images/css.svg";
import Confetti from "canvas-confetti";
import Loading from "@/components/Loading";
import BlogContent from "@/components/BlogContent";
import { addProgress, checkExersiceProgress, getProgress } from "@/service/progress";
import { useLocalStorage } from "@/hooks/useStorage";
import { addNote } from "@/service/note";
import { convertToVND } from "@/utils/utils";
import { toast } from "react-toastify";
import { useCoursesContext } from "@/App";
import { getUserWallet, updateWallet } from "@/service/wallet";
import { addTransactions } from "@/service/transactions";
import { addOrder, deleteOrder, updateOrder } from "@/service/order";
import { useLocation } from "react-router-dom";
import { getVnpay } from "@/service/vnpay";
import { getOneUser } from "@/service/auth";
import { addNotify } from "@/service/notify";
import { io } from "socket.io-client";

type Props = {
  courses: typeCourses;
  expanded: any;
  handleTongle: any;
  handleTongleAll: any;
  toggle: any;

  activeLesson: any;
  handleActiveLesson: any;
  dataLesson: any;
  typeCode: any;
  progress: any;
  handleProgress: any;
  handleEnded: any;
  player: any;
  playing: any;
  played: any;
  handleNextLesson: any;
  done: boolean;
  loading: any;
  setDone: any;
  progressBar: any;
  totalProgressBar: any;
  toggleDrawerNote: any;
  timeVideo: any;
  setPlaying: any;
  navigate: any;
  toggleDrawerDirection: any;
  openDirection: any;
  setOpenDirection: any;
};
const LearningView = ({
  courses,
  expanded,
  handleTongle,
  handleTongleAll,
  toggle,
  activeLesson,
  handleActiveLesson,
  dataLesson,
  typeCode,
  progress,
  handleProgress,
  handleEnded,
  player,
  playing,
  played,
  handleNextLesson,
  done,
  loading,
  setDone,
  progressBar,
  totalProgressBar,
  toggleDrawerNote,
  timeVideo,
  setPlaying,
  navigate,
  toggleDrawerDirection,
  openDirection,
  setOpenDirection,
}: Props) => {
  return (
    <Box
     
    >
      <Header
        progressBar={progressBar}
        courses={courses}
        totalProgressBar={totalProgressBar}
        toggleDrawerNote={toggleDrawerNote}
        navigate={navigate}
        toggleDrawerDirection={toggleDrawerDirection}
        openDirection={openDirection}
        setOpenDirection={setOpenDirection}
      />
      <Stack direction={"row"}>
        {loading && (
          <Box
            sx={{
              display: "flex",
              width: "75%",
              height: "93vh",
              justifyContent: "center",
              alignItems: "center",
              background: "rgba(255,255,255,.8)",
            }}
          >
            <Box>
              <CircularProgress />
            </Box>
          </Box>
        )}
        {!loading && (
          <>
            {dataLesson && dataLesson.type == "video" && (
              <ContentLeftVideo
                courses={courses}
                handleProgress={handleProgress}
                handleEnded={handleEnded}
                player={player}
                playing={playing}
                played={played}
                data={dataLesson}
                timeVideo={timeVideo}
                setPlaying={setPlaying}
              />
            )}
            {dataLesson && dataLesson.type == "blog" && (
              <ContentLeftBlog data={dataLesson} />
            )}
            {dataLesson && dataLesson.type == "quiz" && (
              <ContentLeftQuiz setDone={setDone} data={dataLesson} />
            )}
            {dataLesson && dataLesson.type == "code" && (
              <ContentLeftExercise
                setDone={setDone}
                typeCode={typeCode}
                data={dataLesson}
              />
            )}
          </>
        )}
        {progress !== undefined && (
          <ContentRight
            courses={courses}
            expanded={expanded}
            handleTongle={handleTongle}
            handleTongleAll={handleTongleAll}
            toggle={toggle}
            activeLesson={activeLesson}
            handleActiveLesson={handleActiveLesson}
            progress={progress}
          />
        )}
      </Stack>

      <Footer done={done} handleNextLesson={handleNextLesson} />
    </Box>
  );
};

export default LearningView;

const Header = (props: any) => {
  let total = Math.floor(100 / props.totalProgressBar);
  let success = Math.floor(props.progressBar[0] / props.totalProgressBar);
  const steps = [
    {
      label: "Khu vực học tập",
      description: `Đây là khu vực trung tâm của màn hình này, 
      toàn bộ nội dung các bài học như là video, hình ảnh,
       văn bản sẽ được hiển thị ở đây nhé ^^`,
    },
    {
      label: "Danh sách khóa học",
      description:
        "Tiếp theo là khu vực quan trọng không kém, đây là danh sách các bài học tại khóa này. Cậu sẽ rất thường xuyên tương tác tại đây để chuyển bài học và làm bài tập đấy >_<",
    },
    {
      label: "Hỏi đáp",
      description: `Và đây là khu vực dành cho việc hỏi đáp, trao đổi trong mỗi bài học. Nếu có bài học nào hay thì cậu bình luận một lời động viên vào đây cũng được nhé. Miu sẽ rất vui và cảm thấy biết ơn đấy <3`,
    },
    {
      label: "Tạo ghi chú",
      description: `Tại Fdemycó một chức năng rất đặc biệt, đó là chức năng "Tạo ghi chú". Khi học sẽ có nhiều lúc cậu muốn ghi chép lại đó, tại Fdemycậu sẽ không cần tốn giấy mực để làm việc này đâu. Thả tim nào <3`,
    },
    {
      label: "Xem ghi chú",
      description: `Ghi chú được note ở bài học sẽ được hiển thị ở đây. Thả tim nào <3`,
    },
  ];
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const [openGift,setOpenGift]:any  = useState(false)
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleToggleGift = (newOpen: boolean) => () => {
    setOpenGift(newOpen);
  };

  const handleReset = () => {
    props.setOpenDirection(false);
    setActiveStep(0);
  };
  const socket = io("http://localhost:4000");
  const [paymentMethod, setPaymentMethod] = useState("");
  const context: any = useCoursesContext();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [emailGift, setEmailGift] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramTransactionStatus = queryParams.get("vnp_TransactionStatus");
  const paramOrder_id = queryParams.get("order_id");
  const user_id_gift = queryParams.get("user_id");
  let count = 0;
  useEffect(() => {
    if (!(Object.keys(context.state.user).length == 0)) {
      let message = "";
      if (paramTransactionStatus) {
        switch (paramTransactionStatus) {
          case "00":
            message += "Giao dịch thành công";
            break;
          case "01":
            message += "Giao dịch chưa hoàn tất";
            break;
          case "02":
            message += "Giao dịch bị lỗi";
            break;
          case "04":
            message +=
              "Giao dịch đảo (Khách hàng đã bị trừ tiền tại Ngân hàng nhưng GD chưa thành công ở VNPAY)";
            break;
          case "05":
            message += "VNPAY đang xử lý giao dịch này (GD hoàn tiền)";
            break;
          case "06":
            message +=
              "VNPAY đã gửi yêu cầu hoàn tiền sang Ngân hàng (GD hoàn tiền)";
            break;
          case "07":
            message += "Giao dịch bị nghi ngờ gian lận";
            break;
          case "09":
            message += "GD Hoàn trả bị từ chối";
            break;

          default:
            break;
        }
        if (message == "Giao dịch thành công") {
          setPaymentSuccess(true);
          updateStatusOrder();
          if (count == 0) {
            toast.success(message);
            count++;
          }
        } else {
          deleteOrderStatus();
          if (count == 0) {
            toast.error(message);
            count++;
          }
        }
      } 
    }
  }, [context.state.user]);
  const updateStatusOrder = async () => {
    try {
      let data = await updateOrder(paramOrder_id);
      if (data?.status == 0) {
        let arr = props.courses.lesson.map((item: any, index: number) => {
          return {
            lesson_id: item._id,
            completed: false,
            sub_lesson: item.sub_lesson.map((item2: any, index2: number) => {
              if (index == 0 && index2 == 0) {
                return {
                  sub_lesson_id: item2._id,
                  completed: false,
                  result: true,
                };
              }
              return {
                sub_lesson_id: item2._id,
                completed: false,
                result: false,
              };
            }),
          };
        });
        let body = {
          courses_id: props.courses._id,
          completed: false,
          user_id:user_id_gift,
          lesson_progress: arr,
        };
        let dataProgress = await addProgress(body);
        if (dataProgress?.status == 0) {
          await addNotify({user_id:[user_id_gift],title:`Quà tặng`,message:`Bạn vừa được tặng khóa học ${props.courses.title} từ email ${context.state.user[0].email}.`,url:`/learning/${props.courses._id}`,read:false})
          socket.emit("getNewNotify", { 
            user_id:user_id_gift,
          });
          props.navigate(`/learning/${props.courses._id}`)
        }
      }
    } catch (error) {}
  };
  const deleteOrderStatus = async () => {
    try {
      let data = await deleteOrder(String(paramOrder_id));
      if (data?.status == 0) {
        console.log("delete");
      }
    } catch (error) {}
  };
  const handlePayment = async () => {
    try {
      if (emailGift == context.state.user[0].email) {
        toast.warning("Không tặng cho Email chính mình");
      } else {
        let data:any = await getOneUser(emailGift);
        let progress = await getProgress(data.data[0]._id, props.courses._id);
        if(progress[0]){
          toast.warning("Người dùng đã mua khóa học này rồi.");
        }else{
          if (data?.status == 0&&data.data.length>0) {
            if (paymentMethod == "wallet") {
              let wallet = await getUserWallet(context.state.user[0]._id);
              if (wallet?.status == 0) {
                console.log(Number(wallet.data[0].balance));
                console.log(Number(props.courses.price));
                if (Number(wallet.data[0].balance) - Number(props.courses.price) >= 0) {
                  let res = await updateWallet({
                    _id: wallet.data[0]._id,
                    user_id: [wallet.data[0].user_id[0]],
                    balance: Number(wallet.data[0].balance) - Number(props.courses.price),
                  });
                  await addTransactions({
                    user_id: [context.state.user[0]._id],
                    type: "purchase",
                    status: "completed",
                    amount: props.courses.price,
                  });
                  if (res?.status == 0) {
                    let order = await addOrder({
                      status: true,
                      courses_id: [props.courses._id],
                      user_id: [context.state.user[0]._id],
                    });
                    if (order?.status == 0) {
                      let arr = props.courses.lesson.map((item: any, index: number) => {
                        return {
                          lesson_id: item._id,
                          completed: false,
                          sub_lesson: item.sub_lesson.map((item2: any, index2: number) => {
                            if (index == 0 && index2 == 0) {
                              return {
                                sub_lesson_id: item2._id,
                                completed: false,
                                result: true,
                              };
                            }
                            return {
                              sub_lesson_id: item2._id,
                              completed: false,
                              result: false,
                            };
                          }),
                        };
                      });
                      let body = {
                        courses_id: props.courses._id,
                        completed: false,
                        user_id: data.data[0]._id,
                        lesson_progress: arr,
                      };

                      let dataProgress = await addProgress(body);
                      if (dataProgress?.status == 0) {
                        await addNotify({user_id:[ data.data[0]._id],title:`Quà tặng`,message:`Bạn vừa được tặng khóa học ${props.courses.title} từ email ${context.state.user[0].email}.`,url:`/learning/${props.courses._id}`,read:false})
                        socket.emit("getNewNotify", { 
                          user_id:data.data[0]._id,
                        });
                      }
                      setOpenGift(false);
                      setPaymentSuccess(true);
                      toast.success("Bạn đã thanh toán thành công");
                    }
                  }
                } else {
                  toast.warning("Bạn không đủ số dư trong ví");
                }
              }
            } else {
              let order = await addOrder({
                status: false,
                courses_id: [props.courses._id],
                user_id: [context.state.user[0]._id],
              });
              if (order?.status == 0) {
                let url: any = await getVnpay({
                  order_id: order.data._id,
                  amount: props.courses.price,
                  courses_id: props.courses._id,
                  user_id: data.data[0]._id,
                  type: "gift",
                });
                if (url) {
                  window.location.href = url;
                }
              }
            
          }
          }else{
            toast.warning("Email không tồn tại.");
          }
        }
       
      }
        
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Stack
      height={"50px "}
      px={"30px"}
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      bgcolor={"#29303b"}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        color={"white"}
        gap={"15px"}
      >
        <RiArrowLeftSLine onClick={() => props.navigate("/")} size={25} />
        <img
          src={logo}
          width={30}
          style={{ borderRadius: "8px" }}
          height={30}
          alt=""
        />
        <Typography fontWeight={"bold"} fontSize={"13px"}>
          {props.courses.title}
        </Typography>
      </Stack>
      <Stack direction={"row"} sx={{cursor:"pointer"}} gap={"20px"}>
        {props.courses.price>0&&
        <Stack onClick={handleToggleGift(true)} direction={"row"}
          color={"white"}
          alignItems={"center"}
          gap={0.5}>
        <RiGift2Fill />
        <Typography fontSize={"13px"}>Tặng khóa học này</Typography>
        </Stack>}
        <Stack
          color={"white"}
          direction={"row"}
          alignItems={"center"}
          gap={0.5}
          sx={{
            ".CircularProgressbar .CircularProgressbar-text": {
              fill: "white !important",
              fontSize: "30px !important",
            },
          }}
        >
          <Box style={{ width: "35px", position: "relative" }}>
            <CircularProgressbar
              value={props.progressBar[0]}
              text={`${props.progressBar[0]}%`}
              strokeWidth={7}
              styles={buildStyles({
                strokeLinecap: "round",
                textSize: "16px",
                pathTransitionDuration: 0.5,
                pathColor: `#ff5117`,
                textColor: "#333",
                trailColor: "#d6d6d6",
                backgroundColor: "#3e98c7",
              })}
            />
          </Box>
          <Typography fontSize={"13px"}>
            <b>
              {success}/{total}
            </b>{" "}
            bài học
          </Typography>
        </Stack>
        <Stack
          direction={"row"}
          color={"white"}
          alignItems={"center"}
          gap={0.5}
          onClick={props.toggleDrawerNote(true)}
        >
          <RiFile3Fill />
          <Typography fontSize={"13px"}>Ghi chú</Typography>
        </Stack>
        <Stack
          direction={"row"}
          color={"white"}
          alignItems={"center"}
          gap={0.5}
          onClick={props.toggleDrawerDirection(true)}
        >
          <RiQuestionFill />
          <Typography fontSize={"13px"}>Hướng dẫn</Typography>
        </Stack>
      </Stack>
      <Drawer
        open={props.openDirection}
        anchor={"right"}
        onClose={props.toggleDrawerDirection(false)}
      >
        <Box width={"1200px"} padding={"50px 100px"}>
          <Box sx={{ position: "relative" }}>
            <Box
              width={"100%"}
              sx={{ position: "absolute", top: 0, left: 0 }}
              height={"485px"}
              bgcolor={"rgba(0,0,0,.5)"}
            >
              {" "}
            </Box>
            {activeStep == 0 && (
              <img
                src={left}
                style={{
                  position: "absolute",
                  objectFit: "cover",
                  top: "25px",
                  height: "435px",
                  boxShadow: "0px 0px 18px white",
                }}
                width={"75%"}
                alt=""
              />
            )}
            {activeStep == 1 && (
              <img
                src={right}
                style={{
                  position: "absolute",
                  objectFit: "cover",
                  top: "25px",
                  height: "435px",
                  right: 0,
                  boxShadow: "0px 0px 18px white",
                }}
                width={"25%"}
                alt=""
              />
            )}
            {activeStep == 2 && (
              <img
                src={ques}
                style={{
                  position: "absolute",
                  objectFit: "cover",
                  bottom: "51px",
                  height: "22px",
                  right: 299,
                  borderRadius: "99px",
                  boxShadow: "0px 0px 18px white",
                }}
                width={"57px"}
                alt=""
              />
            )}
            {activeStep == 3 && (
              <img
                src={note2}
                style={{
                  position: "absolute",
                  objectFit: "cover",
                  top: "330px",
                  height: "26.4px",
                  right: 318,
                  borderRadius: "4px",
                  boxShadow: "0px 0px 18px white",
                }}
                width={"111px"}
                alt=""
              />
            )}
            {activeStep == 4 && (
              <img
                src={note1}
                style={{
                  position: "absolute",
                  objectFit: "cover",
                  top: "1px",
                  height: "27px",
                  right: 63,
                  boxShadow: "0px 0px 18px white",
                }}
                width={"50px"}
                alt=""
              />
            )}

            <img
              src={direction}
              style={{ objectFit: "cover" }}
              width={"100%"}
              alt=""
            />
          </Box>
          <Box
            sx={{
              ".css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-active": {
                color: "#ff5117",
              },
              ".css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed": {
                color: "#ff5117",
              },
            }}
          >
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel>{step.label}</StepLabel>
                  <StepContent>
                    <Typography>{step.description}</Typography>
                    <Box sx={{ mb: 2 }}>
                      <div>
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          sx={{
                            background:
                              "linear-gradient(to right bottom, #ff8f26, #ff5117)",
                            color: "white",

                            height: "34px",
                            mt: 1,
                            mr: 1,
                          }}
                        >
                          {index === steps.length - 1
                            ? "Hoàn thành"
                            : "Đi tiếp"}
                        </Button>
                        <Button
                          disabled={index === 0}
                          onClick={handleBack}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Quay lại
                        </Button>
                      </div>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Box>
          {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Button
                sx={{
                  background:
                    "linear-gradient(to right bottom, #ff8f26, #ff5117)",
                  color: "white",

                  height: "34px",
                  mt: 1,
                  mr: 1,
                }}
                onClick={handleReset}
              >
                Thoát hướng dẫn
              </Button>
            </Paper>
          )}
        </Box>
      </Drawer>
      <Drawer
        open={openGift}
        anchor={"right"}
        onClose={handleToggleGift(false)}
      >
        <Box width={"600px"} padding={"50px 50px"}>
            <Typography variant="h5" textAlign={"center"} fontWeight={"bold"}>Tặng khóa học {props.courses.title}</Typography>
            <Typography my={"20px"} color={"#333"} fontSize={"14px"}>
                { props.courses.description}
              </Typography>
            <form style={{marginTop:"30px"}}>
            <TextField id="outlined-basic" type="email"  value={emailGift} onChange={(e)=>setEmailGift(e.target.value)} label="Email người nhận" size="small" fullWidth variant="outlined" />
            <Box
              mt={"20px"}
              width={"100%"}
              padding={"10px"}
              border={"1px solid #dddddd"}
              borderRadius={"10px"}
            >
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Box>Giá bán : </Box>
                <Box>{convertToVND(props.courses.price)}</Box>
              </Stack>
              <Stack
                direction={"row"}
                mt={"15px"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Box>Tổng tiền : </Box>
                <Box>{convertToVND(props.courses.price)}</Box>
              </Stack>
              <FormControl sx={{ mt: "20px", display: "block" }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Phương thức thanh toán
                </FormLabel>

                <RadioGroup
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="wallet"
                    control={<Radio />}
                    label="Thanh toán bằng ví"
                  />
                  <FormControlLabel
                    value="vnpay"
                    control={<Radio />}
                    label="Cổng thanh toán VNPAY"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box mt={"20px"}>
              <Button
              disabled={!emailGift||!paymentMethod}
               onClick={handlePayment}
                sx={{
                  background:
                    "linear-gradient(to right bottom, #ff8f26, #ff5117)",
                  color: "white",
                  borderRadius: "30px",
                  float: "right",
                  height: "34px",
                }}
              >
                Thanh toán
              </Button>
            </Box>
            </form>
        </Box>
      </Drawer>
    </Stack>
  );
};

const Footer = (props: any) => {
  return (
    <Box
      position={"fixed"}
      bottom={0}
      height={"50px"}
      width={"100%"}
      bgcolor={"#F5F5F5"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      left={0}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        gap={"35px"}
        justifyContent={"center"}
      >
        <Button sx={{ color: "black" }}>
          <RiArrowLeftSLine size={25} />
          Bài trước
        </Button>
        <Button
          className={props.done && "animation"}
          onClick={props.handleNextLesson}
          sx={{
            color: "#ff5117",
            border: "2px solid #ff5117",
            height: "35px",
            px: "15px",
          }}
        >
          Bài tiếp theo
          <RiArrowRightSLine size={25} />
        </Button>
      </Stack>
    </Box>
  );
};

const ContentLeftVideo = (props: any) => {
  const [user, setUser] = useLocalStorage("user", {});
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState("");
  const toggleDrawer = (newOpen: boolean) => () => {
    if (newOpen) {
      props.setPlaying(false);
      setOpen(newOpen);
    } else {
      props.setPlaying(true);
      setOpen(newOpen);
    }
  };

  const handleEditorChange = (e: any, editor: any) => {
    setContent(editor.getContent());
  };
  const handleNote = async () => {
    try {
      let body = {
        courses_id: [props.courses._id],
        sub_lesson_id: [props.data._id],
        content: content,
        user_id: [user.data[0]._id],
        time: props.timeVideo,
      };
      let data = await addNote(body);
      if (data?.status == 0) {
        props.setPlaying(true);
        setOpen(false);
        setContent("");
      }
    } catch (error) {}
  };
  return (
    <Box
      width={"75%"}
      className="scroll-left"
      height={"93vh"}
      sx={{ overflowY: "scroll" }}
    >
      <Box>
        <Stack className="section">
          <Box
            sx={{
              width: "100%",
              height: "550px",
              background: "black",
              display: "flex",
              justifyContent: "center",
            }}
            className="player-wrapper"
          >
            <ReactPlayer
              ref={props.player}
              className="react-player"
              width="80%"
              height="100%"
              url={props.data.video_id.url}
              playing={props.playing}
              controls
              played={props.played}
              onProgress={props.handleProgress}
              onEnded={props.handleEnded}
            />
          </Box>
        </Stack>
        <Box mt={"30px"} padding={"0 10%"}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography fontSize={"30px"} fontWeight={"700"}>
              {props.data.title}
            </Typography>
            <Box
              onClick={toggleDrawer(true)}
              sx={{
                background: "rgb(235, 235, 235)",
                borderRadius: "6px",
                padding: "10px",
                display: "flex",
                alignItems: "center",
                gap: "3px",
              }}
            >
              <RiAddFill />{" "}
              <Typography mt={"2px"} fontSize={"15px"} color={"#333"}>
                Thêm ghi chú tại <b>{props.timeVideo}</b>
              </Typography>{" "}
            </Box>
          </Stack>
          <Typography fontSize={"14px"} color={"#333"} my={"10px"}>
            Cập nhật tháng 2 năm 2022
          </Typography>
          <Typography mt={"20px"} lineHeight={2.5}>
            Tham gia nhóm Học{" "}
            <a style={{ color: "#ff5117" }} href="">
              lập trình tại FDemy
            </a>{" "}
            trên Facebook để cùng nhau trao đổi trong quá trình học tập ❤️
            <br></br>
            Các bạn subscribe{" "}
            <a style={{ color: "#ff5117" }} href="">
              kênh Youtube Fdemy Official
            </a>{" "}
            để nhận thông báo khi có các bài học mới nhé ❤️<br></br>
            Form HTML template:{" "}
            <a style={{ color: "#ff5117" }} href="">
              https://codepen.io/ng-ngc-sn-the-bashful/pen/mdVEoWP
            </a>
            <br></br>
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", py: "70px" }}>
        <Typography
          fontSize={"14px"}
          color={"#333"}
          sx={{ display: "flex", alignItems: "center", gap: "3px" }}
        >
          Made with <RiHeartFill size={20} color={"#ff5117"} />· Powered by F8
        </Typography>
      </Box>

      <Drawer open={open} anchor={"bottom"} onClose={toggleDrawer(false)}>
        <Box width={"100%"} padding={"50px 100px"}>
          <Box
            sx={{
              ".tox-statusbar": {
                display: "none !important",
              },
              width: "100%",
            }}
          >
            <Typography
              mb={"20px"}
              display={"flex"}
              alignItems={"center"}
              gap={"10px"}
            >
              Thêm ghi chú tại{" "}
              <Button
                sx={{
                  background:
                    "linear-gradient(to right bottom, #ff8f26, #ff5117)",
                  color: "white",
                  borderRadius: "99px",
                  padding: "2px 5px",
                }}
              >
                {props.timeVideo}
              </Button>{" "}
              bài : <b>{props.data.title}</b>
            </Typography>
            <Editor
              value={content}
              onChange={handleEditorChange}
              apiKey="vr0wwkbvph803e16rtf0mauheh4p5jy4fiw0akbjnf1benb6"
              init={{
                plugins:
                  "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion",
                editimage_cors_hosts: ["picsum.photos"],
                menubar: "file edit view insert format tools table help",
                toolbar:
                  "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl",
                autosave_ask_before_unload: true,
                autosave_interval: "30s",
                autosave_prefix: "{path}{query}-{id}-",
                autosave_restore_when_empty: false,
                autosave_retention: "2m",
                image_advtab: true,
                link_list: [
                  { title: "My page 1", value: "https://www.tiny.cloud" },
                  { title: "My page 2", value: "http://www.moxiecode.com" },
                ],
                image_list: [
                  { title: "My page 1", value: "https://www.tiny.cloud" },
                  { title: "My page 2", value: "http://www.moxiecode.com" },
                ],
                image_class_list: [
                  { title: "None", value: "" },
                  { title: "Some class", value: "class-name" },
                ],
                importcss_append: true,
                file_picker_callback: (callback, value, meta) => {
                  /* Provide file and text for the link dialog */
                  if (meta.filetype === "file") {
                    callback("https://www.google.com/logos/google.jpg", {
                      text: "My text",
                    });
                  }

                  /* Provide image and alt text for the image dialog */
                  if (meta.filetype === "image") {
                    callback("https://www.google.com/logos/google.jpg", {
                      alt: "My alt text",
                    });
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
          <Box display={"flex"} gap={"10px"} justifyContent={"end"} mt={"30px"}>
            <Button onClick={toggleDrawer(false)} sx={{ color: "black" }}>
              Hủy bỏ
            </Button>
            <Button
              onClick={handleNote}
              sx={{
                background:
                  "linear-gradient(to right bottom, #ff8f26, #ff5117)",
                color: "white",

                height: "34px",
              }}
            >
              Tạo ghi chú
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

const ContentRight = (props: any) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const handleClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Box
      width={"25%"}
      className="list-learning"
      padding={"15px"}
      paddingBottom={"65px"}
      sx={{ overflowY: "scroll", height: "93vh" }}
    >
      <Typography fontWeight={"700"} fontSize={"16px"}>
        Nội dung khóa học
      </Typography>
      {props.courses &&
        props.courses.lesson &&
        props.courses.lesson.map((item: any, index: any) => {
          return (
            <Box
              mt={"15px"}
              maxHeight={props.expanded[index] ? "1000px" : "47px"}
              overflow={"hidden"}
              sx={{ transition: ".4s" }}
            >
              <Box>
                <Stack
                  direction={"row"}
                  onClick={() => props.handleTongle(index)}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  padding={"10px 20px"}
                  bgcolor={"#f5f5f5"}
                  borderRadius={"6px"}
                  border={"1px solid #ebebeb"}
                >
                  <Stack direction={"row"} gap={"10px"} alignItems={"center"}>
                    {props.expanded[index] ? (
                      <RiSubtractFill size={"25px"} color={"#f05123"} />
                    ) : (
                      <RiAddFill size={"25px"} color={"#f05123"} />
                    )}

                    <Typography fontWeight={"bold"}>{item.title}</Typography>
                  </Stack>
                  <Typography fontSize={"12px"}>
                    {item.sub_lesson.length}
                  </Typography>
                </Stack>
                {item.sub_lesson && (
                  <>
                    {item.sub_lesson.map((itemchild: any, index2: any) => {
                      let check;
                      let checkSuccess;
                      if (props.progress && props.progress[0]) {
                        const lessonProgress =
                          props.progress[0].lesson_progress[index];
                        if (lessonProgress) {
                          const subLessonProgress =
                            lessonProgress.sub_lesson[index2];
                          if (subLessonProgress) {
                            check =
                              subLessonProgress.result &&
                              !subLessonProgress.completed;
                            checkSuccess = subLessonProgress.completed;
                          }
                        }
                      }
                      let active = props.activeLesson == itemchild._id;
                      
                      return (
                        <Box
                          position={"relative"}
                          sx={{
                            cursor: "pointer",
                          }}
                        >
                          <Box
                            sx={{
                              pointerEvents:
                                !checkSuccess && !check ? "none" : "auto",
                              position: "relative",
                            }}
                            onClick={() => props.handleActiveLesson(itemchild)}
                          >
                            <Stack
                              direction={"row"}
                              borderTop={
                                index2 == 0 ? "none" : "1px solid #dddddd"
                              }
                              alignItems={"start"}
                              sx={{
                                background: active
                                  ? "rgba(240, 81, 35, .2)"
                                  : !checkSuccess && !check
                                  ? "#e6e6e6"
                                  : undefined,
                                opacity: !checkSuccess && !check ? ".5" : "1",
                              }}
                              justifyContent={"space-between"}
                              padding={"15px 20px"}
                            >
                              <Stack
                                direction={"row"}
                                alignItems={"center"}
                                gap={"7px"}
                              >
                                <Typography color={"#333"} fontSize={"14px"}>
                                  {index2 + 1}.{itemchild.title}
                                  <Stack
                                    direction={"row"}
                                    alignItems={"center"}
                                    justifyContent={"space-between"}
                                  >
                                    <Stack
                                      direction={"row"}
                                      mt={"5px"}
                                      gap={"10px"}
                                    >
                                      {itemchild.type == "video" && (
                                        <RiYoutubeFill
                                          size={"20px"}
                                          color={"#f05123"}
                                        />
                                      )}
                                      {itemchild.type == "blog" && (
                                        <RiArticleLine
                                          size={"20px"}
                                          color={"#f05123"}
                                        />
                                      )}
                                      {itemchild.type == "code" && (
                                        <RiPencilFill
                                          size={"20px"}
                                          color={"#f05123"}
                                        />
                                      )}
                                      {itemchild.type == "quiz" && (
                                        <RiQuestionFill
                                          size={"20px"}
                                          color={"#f05123"}
                                        />
                                      )}{" "}
                                      {itemchild.duration}
                                    </Stack>
                                  </Stack>
                                </Typography>
                              </Stack>
                              <Typography fontSize={"12px"}>
                                {check ? (
                                  ""
                                ) : (
                                  <>
                                    {checkSuccess && (
                                      <RiCheckboxCircleFill
                                        color="green"
                                        size={"20px"}
                                      />
                                    )}

                                    {!checkSuccess && (
                                      <RiLock2Fill size={"20px"} />
                                    )}
                                  </>
                                )}
                              </Typography>
                            </Stack>
                          </Box>
                          {itemchild.source&&itemchild.source!=="..."&&
                          <>
                          <Box
                            aria-describedby={id}
                            onClick={handleClick}
                            padding={" 3px 5px"}
                            position={"absolute"}
                            right={"3px"}
                            bottom={"3px"}
                            display={"flex"}
                            alignItems={"center"}
                            gap={"3px"}
                            border={"1px solid #333"}
                          >
                            <RiFolderOpenFill />
                            <Typography fontSize={"13px"}>Tài nguyên</Typography>
                            <RiArrowDropDownFill size={20} />
                          </Box>
                          <Popover
                           sx={{
                            ".css-3bmhjh-MuiPaper-root-MuiPopover-paper": {
                              boxShadow: "0 0 3px #dddddd",
                            },
                          }}
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'right',
                            }}
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}
                          >
                            <a href={itemchild.source} target="_blank">
                            <Typography fontSize={"14px"} display={"flex"} alignItems={"center"} gap={"7px"} sx={{ p: 1 }}>
                            <RiShareBoxFill />
                            Mã nguồn
                            </Typography>

                            </a>
                          </Popover>
                          </>
                          }
                          
                        </Box>
                      );
                    })}
                  </>
                )}
              </Box>
            </Box>
          );
        })}
    </Box>
  );
};

const ContentLeftExercise = (props: any) => {
  const [value, setValue] = React.useState(0);
  const [valueRight, setValueRight] = React.useState(0);
  const [exerciseHtml, setexerciseHtml] = React.useState(
    JSON.parse(props.data.type_exercise).html
  );
  const [message, setMessage]: any = useState("");
  const [success, setSuccess]: any = useState(false);
  const [exerciseCss, setexerciseCss] = React.useState(
    JSON.parse(props.data.type_exercise).css
  );

  const [exercise, setExercise]: any = useState(
    JSON.parse(props.data.type_exercise).javascript
  );

  useEffect(() => {
    if (props.data.solution_key == "...") {
      setSuccess(true);
      setMessage("Nhấn nút kiểm tra để hoàn thành bài học");
    }
    if (props.typeCode == "html") {
      setexerciseHtml(JSON.parse(props.data.type_exercise).html);
    }
    if (props.typeCode == "javascript") {
      setExercise(JSON.parse(props.data.type_exercise).javascript);
    }
    if (props.typeCode == "html-css") {
      setexerciseCss(JSON.parse(props.data.type_exercise).css);
      setexerciseHtml(JSON.parse(props.data.type_exercise).html);
    }
  }, [props.data]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleChangeRight = (event: React.SyntheticEvent, newValue: number) => {
    setValueRight(newValue);
  };

  const handleChangeExercise = (e: any) => {
    setExercise(e);
  };
  const handleChangeExerciseHtml = (e: any) => {
    setexerciseHtml(e);
  };
  const handleChangeExerciseCss = (e: any) => {
    setexerciseCss(e);
  };
  const handleClickSucess = async () => {
    try {
      if (props.data.solution_key !== "...") {
        let data: any = await checkExersiceProgress({
          id: props.data.solution_key,
          type: props.typeCode,
          exercise:
            props.typeCode == "javascript"
              ? exercise
              : `${exerciseHtml}<style>${exerciseCss}</style>`,
        });
        if (data?.status == 0) {
          setSuccess(true);
          setMessage(data.message);
          props.setDone(true);
          Confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 1 },
          });
        } else {
          setMessage(data.message);
          setSuccess(false);
        }
      } else {
        props.setDone(true);
        Confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 1 },
        });
      }
    } catch (error) {}
  };

  return (
    <Box width={"75%"} borderRight={"1px solid #dddddd"}>
      <Stack direction={"row"}>
        <Box
          sx={{
            ".css-1h9z7r5-MuiButtonBase-root-MuiTab-root": {
              width: "50%",
            },
            ".css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected": {
              color: " #ff5117",
            },
            ".css-1aquho2-MuiTabs-indicator": {
              background: "#ff5117",
            },
          }}
          width={"45%"}
          borderRight={"1px solid #dddddd"}
        >
          <Tabs value={value} onChange={handleChange} centered>
            <Tab
              label={
                <>
                  <Typography
                    sx={{ display: "flex", alignItems: "center", gap: "5px" }}
                    fontWeight={600}
                  >
                    <RiFile3Fill /> Nội dung
                  </Typography>
                </>
              }
            />
            <Tab
              label={
                <>
                  <Typography
                    sx={{ display: "flex", alignItems: "center", gap: "5px" }}
                    fontWeight={600}
                  >
                    {" "}
                    <RiPlayCircleFill size={"19px"} />
                    Trình duyệt
                  </Typography>
                </>
              }
            />
          </Tabs>
          {value == 0 && (
            <Box p={"15px"}>
              <Box
                width={"100%"}
                className="resultCourses"
                sx={{
                  " .tox-editor-header": {
                    display: "none !important",
                  },
                  ".tox-statusbar": {
                    display: "none !important",
                  },

                  ".tox-tinymce": {
                    border: "none",
                  },

                  overflowY: "scroll",
                }}
              >
                <Editor
                  apiKey="vr0wwkbvph803e16rtf0mauheh4p5jy4fiw0akbjnf1benb6"
                  initialValue={props.data.content_code}
                  init={{
                    height: "85vh",
                  }}
                  disabled
                />
                <BlogContent content={props.data.content_blog} />
              </Box>
            </Box>
          )}

          {value == 1 && (
            <>
              {props.typeCode == "javascript" ? (
                <>
                  <Typography
                    textAlign={"center"}
                    color={"grey"}
                    mt={"20px"}
                    fontSize={"14px"}
                  >
                    Nếu có file index.html thì nội dung của nó<br></br>
                    sẽ được hiển thị tại đây.
                  </Typography>
                </>
              ) : (
                <Box>
                  <iframe
                    title="result"
                    srcDoc={`<!DOCTYPE html><html><head><title>Result</title> <style>${exerciseCss}</style></head><body>${exerciseHtml}</body></html>`}
                    style={{
                      width: "100%",
                      height: "85vh",
                      border: "1px solid #ccc",
                    }}
                  />
                </Box>
              )}
            </>
          )}
        </Box>
        <Box width={"55%"}>
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
            width={"99.9%"}
          >
            {props.typeCode !== null && props.typeCode == "html" && (
              <Tabs
                value={valueRight}
                onChange={handleChangeRight}
                aria-label="basic tabs example"
              >
                <Tab
                  label={
                    <Stack direction={"row"} alignItems={"center"} gap={"4px"}>
                      <img
                        src={html}
                        width={17}
                        height={17}
                        style={{ borderRadius: "5px" }}
                        alt=""
                      />
                      <Typography
                        fontSize={"12px"}
                        sx={{ textTransform: "lowercase" }}
                      >
                        index.html
                      </Typography>
                    </Stack>
                  }
                />
              </Tabs>
            )}
            {props.typeCode !== null && props.typeCode == "javascript" && (
              <Tabs
                value={valueRight}
                onChange={handleChangeRight}
                aria-label="basic tabs example"
              >
                <Tab
                  label={
                    <Stack direction={"row"} alignItems={"center"} gap={"4px"}>
                      <img
                        src={js}
                        width={17}
                        height={17}
                        style={{ borderRadius: "5px" }}
                        alt=""
                      />
                      <Typography
                        fontSize={"12px"}
                        sx={{ textTransform: "lowercase" }}
                      >
                        main.js
                      </Typography>
                    </Stack>
                  }
                />
              </Tabs>
            )}
            {props.typeCode !== null && props.typeCode == "html-css" && (
              <>
                <Tabs
                  value={valueRight}
                  onChange={handleChangeRight}
                  aria-label="basic tabs example"
                >
                  <Tab
                    label={
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        gap={"4px"}
                      >
                        <img
                          src={html}
                          width={17}
                          height={17}
                          style={{ borderRadius: "5px" }}
                          alt=""
                        />
                        <Typography
                          fontSize={"12px"}
                          sx={{ textTransform: "lowercase" }}
                        >
                          index.html
                        </Typography>
                      </Stack>
                    }
                  />
                  <Tab
                    label={
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        gap={"4px"}
                      >
                        <img
                          src={css}
                          width={17}
                          height={17}
                          style={{ borderRadius: "5px" }}
                          alt=""
                        />
                        <Typography
                          fontSize={"12px"}
                          sx={{ textTransform: "lowercase" }}
                        >
                          style.css
                        </Typography>
                      </Stack>
                    }
                  />
                </Tabs>
              </>
            )}
            <Box
              width={"65px"}
              height={"40px"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              bgcolor={"#1e1e1e"}
            >
              <ReplayIcon sx={{ color: "white" }} />
            </Box>
          </Stack>
          <Box
            sx={{
              " .slider-mouseover": {
                display: "none",
              },
            }}
          >
            {props.typeCode !== null && props.typeCode == "javascript" && (
              <MonacoEditor
                width={"100%"}
                height="50vh"
                language="javascript"
                theme="vs-dark"
                value={exercise}
                onChange={(value) => handleChangeExercise(value)}
              />
            )}
            {props.typeCode !== null && props.typeCode == "html" && (
              <MonacoEditor
                height="50vh"
                language="html"
                theme="vs-dark"
                value={exerciseHtml}
                onChange={(value) => handleChangeExerciseHtml(value)}
              />
            )}
            {props.typeCode !== null && props.typeCode == "html-css" && (
              <>
                {valueRight == 0 && (
                  <MonacoEditor
                    height="50vh"
                    language="html"
                    theme="vs-dark"
                    value={exerciseHtml}
                    onChange={(value) => handleChangeExerciseHtml(value)}
                  />
                )}
                {valueRight == 1 && (
                  <MonacoEditor
                    height="50vh"
                    language="css"
                    theme="vs-dark"
                    value={exerciseCss}
                    onChange={(value) => handleChangeExerciseCss(value)}
                  />
                )}
              </>
            )}
          </Box>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            padding={"10px"}
            borderBottom={"1px solid #dddddd"}
          >
            <Typography fontWeight={"600"} fontSize={"14px"}>
              {success ? "Bài kiểm tra (1/1)" : "Bài kiểm tra (0/1)"}
            </Typography>
            <Button
              onClick={handleClickSucess}
              sx={{
                background:
                  "linear-gradient(to right bottom, #ff8f26, #ff5117)",
                color: "white",
                borderRadius: "99px",
                width: "92px",
                height: "34px",
                fontSize: "12px",
              }}
            >
              Kiểm tra
            </Button>
          </Stack>
          <Stack padding={"20px"}>
            <Stack direction={"row"} alignItems={"center"} gap={"10px"}>
              {message !== "" ? (
                <>
                  <Box>
                    {success ? (
                      <RiCheckLine color="#5db85c" size={"25px"} />
                    ) : (
                      <RiCloseLine size={"25px"} color="red" />
                    )}
                  </Box>
                  <Typography fontWeight={"400"} fontSize={"16px"}>
                    {message}
                  </Typography>
                </>
              ) : (
                ""
              )}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};
const ContentLeftBlog = (props: any) => {
  return (
    <Box width={"75%"}>
      <Box
        width={"100%"}
        paddingLeft={"95px"}
        className="resultCourses"
        sx={{
          height: "85vh",
          overflowY: "scroll",
          paddingRight: "20px",
        }}
      >
        <BlogContent content={props.data.content_blog} />
      </Box>
    </Box>
  );
};

const ContentLeftQuiz = (props: any) => {
  const [total, setTotal]: any = useState(null);
  const [color, setColor]: any = useState(null);
  const quiz = JSON.parse(props.data.questions);

  const handleClickAnswer = (value: any) => {
    setColor("#0093fc");
    setTotal(value);
  };
  const handleTotal = () => {
    if (total.result == "true") {
      setColor("#48bd79");
      Confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 1 },
      });
      props.setDone(true);
    } else {
      setColor("#cc5140");
      props.setDone(false);
    }
  };
  return (
    <Box width={"75%"}>
      <Box
        display={"flex"}
        mt={"40px"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box
          width={"80%"}
          sx={{
            " .tox-editor-header": {
              display: "none !important",
            },
            ".tox-statusbar": {
              display: "none !important",
            },

            ".tox-tinymce": {
              border: "none",
            },
            ".mce-content-body": {
              padding: "40px",
            },
            "iframe code ": {
              background: "none",
            },
          }}
        >
          <BlogContent content={props.data.content_quizz} />
        </Box>
        <Stack
          direction={"column"}
          mt={"50px"}
          position={"relative"}
          zIndex={"1"}
          gap={"15px"}
          width={"70%"}
        >
          {quiz.map((item: any) => {
            let check = false;
            if (total) {
              check = total.answer == item.answer;
            }

            return (
              <Box
                onClick={() => handleClickAnswer(item)}
                border={check ? `2px solid ${color}` : "none"}
                width={"100%"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                borderRadius={"10px"}
                height={"50px"}
                bgcolor={"#f6f7f9"}
              >
                {item.answer}
              </Box>
            );
          })}
        </Stack>
        <Box width={"70%"} mt={"15px"} pb={"50px"}>
          <Button
            onClick={handleTotal}
            sx={{
              pointerEvents: total ? "auto" : "none",
              opacity: total ? 1 : 0.3,
              background: "linear-gradient(to right bottom, #ff8f26, #ff5117)",
              color: "white",
              borderRadius: "99px",
              width: "92px",
              height: "34px",
              fontSize: "12px",
              float: "right",
            }}
          >
            Kiểm tra
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

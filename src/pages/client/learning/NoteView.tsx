import BlogContent from "@/components/BlogContent";
import { Box, Drawer, Stack, Typography } from "@mui/material";
import { RiCloseLine, RiDeleteBin2Line, RiEdit2Fill } from "react-icons/ri";

type Props = {
  toggleDrawerNote: any;
  openNote: any;
  data: any;
};

const NoteView = ({ toggleDrawerNote, openNote, data }: Props) => {
  return (
    <Box>
      <Drawer open={openNote} anchor="right" onClose={toggleDrawerNote(false)}>
        <Box
          width={"800px"}
          height={"100vh"}
          padding={"50px"}
          className="comment-tab"
          sx={{ position: "relative", overflowY: "scroll" }}
        >
          <Box
            position={"absolute"}
            onClick={toggleDrawerNote(false)}
            top={20}
            right={20}
          >
            <RiCloseLine size={30} />
          </Box>
          <Box>
            <Typography variant="h5" fontWeight={"bold"}>
              Ghi chú của tôi
            </Typography>
            {data.length==0?
            <Box
              width={"100%"}
              height={"90vh"}
              display={"flex"}
              flexDirection={"column"}
              gap={"5px"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <img
                src="https://fullstack.edu.vn/static/media/no-note-yet.17b90847cc48c790cb73ed2d495e0ea3.svg"
                alt=""
              />
              <Typography fontSize={"15px"} fontWeight={"bold"}>
                Bạn chưa có ghi chú nào
              </Typography>
              <Typography fontSize={"14px"}>
                Hãy ghi chép để nhớ những gì bạn đã học!
              </Typography>
            </Box>:
            <Stack mt={"50px"}>
              {data&&data.map((item:any)=>{
                  return <Box>
                  <Stack  direction={"row"} justifyContent={"space-between"}>
                    <Typography fontSize={"14px"} fontWeight={"bold"}>{item.sub_lesson_id[0].title}</Typography>
                    <Stack direction={'row'} gap={"18px"}>
                    <RiEdit2Fill  color={"rgb(102, 102, 102)"}/>
                    <RiDeleteBin2Line color={"rgb(102, 102, 102)"}/>
                    </Stack>
                  </Stack>
                  <Box mt={"10px"} bgcolor={"rgb(247, 248, 250)"} borderRadius={"5px"} p={"3px 20px"}>
                    <BlogContent content={item.content} />
    
                  </Box>
                  </Box>
              })}
              
            </Stack>}
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default NoteView;

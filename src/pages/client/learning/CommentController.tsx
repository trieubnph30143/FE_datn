import React, { useEffect, useState } from "react";
import CommentView from "./CommentView"
import { io } from "socket.io-client";
import { useLocalStorage } from "@/hooks/useStorage";


const CommentController = ({courses_id,lesson_id}:any) => {
  const [etend, setExtend] = useState(false);
  const [etendDad, setExtendDad] = useState(false);
  const [etendChild, setExtendChild] = useState(false);
  const [etendType, setExtendType] = useState([]);
  const [open,setOpen] = useState(false)
  const [detailComment,setDetailComment] = useState(null)
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [user, setUser] = useLocalStorage("user", {});
  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const [dataEditComment,setDataEditComment]:any = useState(null)
  const [content, setContent] = useState("");
  const [contentChild, setContentChild] = useState("");
  const handleEditorChange = (e: any, editor: any) => {
    setContent(editor.getContent());
  };
  const handleEditorChangeChild = (e: any, editor: any) => {
    setContentChild(editor.getContent());
  };


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>,data:any) => {
    setAnchorEl(event.currentTarget);
    setDetailComment(data)
   

  };
 
  const handleClose = () => {
    setAnchorEl(null);
  };


  const socket = io("http://localhost:4000");
  const [comments, setComments] = useState<any>([]);
  const [anchorElChild, setAnchorElChild] = React.useState<HTMLButtonElement | null>(null);

  const handleClickChild = (event: React.MouseEvent<HTMLButtonElement>,data:any) => {
    setAnchorElChild(event.currentTarget);
    setFeedBack(data._id)
    setContentChild(`<p><span>@${data.user_id[0].user_name}</span></p>`)
     
    setExtendType(
      etendType.filter(
        (i: any) => i !== data._id
      )
    );
  };

  const handleCloseChild = () => {
    setFeedBack('')
    setAnchorElChild(null);
    setFeedBackChild(null)
  };
  const handleEdit = (data:any)=>{
    setContentChild(data.content)
    setFeedBack(data._id)
    setDataEditComment(data)
  }
  const handleEditChild = (dataChild:any,data:any,index:number)=>{
    setContentChild(dataChild.content)
    setFeedBackChild(index)
    setDataEditComment(data)
  }
  const openChild = Boolean(anchorElChild);
  const idChild = openChild ? 'simple-popover' : undefined;
  const [feedBack, setFeedBack] = useState<string>("");
  const [feedBackChild, setFeedBackChild] = useState<any>(null);
  useEffect(() => {
    socket.emit("getCommentsForProduct",{lesson_id, courses_id},);
    socket.on("allComments", (receivedComments) => {
      setComments(receivedComments);
    });
    socket.on("newComment", (data) => {
      setComments(data);
    });
    socket.on("deletedComment", ({ commentId }) => {
      setComments((prevComments: any) =>
        prevComments.filter((comment: any) => comment._id !== commentId)
      );
    });
    socket.on("updatedComment", (updateComment: any) => {
      setComments(updateComment);
    });

    return () => {
      socket.disconnect();
    };
  }, [lesson_id]);
  const handleCommentSubmit = () => {

    socket.emit('comment', {
      content: content,
      user_id: user.data[0]._id,
      courses_id: courses_id,
      lesson_id:lesson_id
    })
    setContent("")
  }
  function handleFeedBackSubmit() {
    console.log(feedBackChild);
    if(feedBackChild||feedBackChild ==0){
      let arrnew = dataEditComment.comments_child.map((item:any,index:number)=>index==feedBackChild?{...item,content:contentChild}:item)
      socket.emit('updateComment', {
        id:dataEditComment._id,
        dataEditComment: arrnew,
        lesson_id,
        courses_id,
        type:"edit_comment_child",

      })
    }
    else{
      if(dataEditComment){
        socket.emit('updateComment', {
          id:feedBack,
          dataEditComment: contentChild,
          lesson_id,
          courses_id,
          type:"edit_comment"
        })
      }else{
        socket.emit('updateComment', {
          id:feedBack,
          updatedContent: {
            user_id: user.data[0]._id,
            content: contentChild,
          },
          lesson_id,
          courses_id,
          type:"add_comment_child"
        })
      }
    }
   setDataEditComment(null)
    setFeedBack('')
    setContentChild("")
    handleCloseChild()
    setFeedBackChild(null)
  }
  function handleDelete(id: string) {
    socket.emit('deleteComment', {id,courses_id,lesson_id,type:"comment"})
    handleClose()
  }
  function handleDeleteChild(index: number,data:any) {
    
    let arrNew = data.comments_child.filter((item:any,i:number)=>i!==index)
  
    socket.emit('deleteComment', {id:data._id,courses_id,lesson_id,type:"comment_child",data:arrNew})
    handleClose()
  }
  return (
    <><CommentView
    id={id}
    toggleDrawer={toggleDrawer}
    content={content}
    contentChild={contentChild}
    handleEditorChange={handleEditorChange}
    handleEditorChangeChild={handleEditorChangeChild}
    handleClick={handleClick}
    handleClose={handleClose}
    open={open}
    etend={etend}
    setExtend={setExtend}
    etendDad={etendDad}
    setExtendDad={setExtendDad}
    etendChild={etendChild}
    setExtendChild={setExtendChild}
    etendType={etendType}
    setExtendType={setExtendType}
    openPopover={openPopover}
    anchorEl={anchorEl}
    handleCommentSubmit={handleCommentSubmit}
    comments={comments}
    anchorElChild={anchorElChild}
    setAnchorElChild={setAnchorElChild}
    handleClickChild={handleClickChild}
    handleCloseChild={handleCloseChild}
    openChild={openChild}
    idChild={idChild}
    handleFeedBackSubmit={handleFeedBackSubmit}
    user={user}
    handleDelete={handleDelete}
    detailComment={detailComment}
    feedBack={feedBack}
    setFeedBack={setFeedBack}
    handleEdit={handleEdit}
    setFeedBackChild={setFeedBackChild}
    feedBackChild={feedBackChild}
    handleEditChild={handleEditChild}
    handleDeleteChild={handleDeleteChild}
    
    /></>
  )
}

export default CommentController
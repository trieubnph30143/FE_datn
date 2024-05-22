import { Box, Button, Stack } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import ContentEditable from "react-contenteditable";
import { RiBold, RiItalic, RiListOrdered2, RiListUnordered, RiUnderline } from "react-icons/ri";
import sanitizeHtml from "sanitize-html";

function Cv() {
  const initialData = [
    { age: "<b>Họ và tên</b>", name: "Bùi Văn Toản" },
    { age: "<b>Điện thoại</b>", name: "Nguyễn Văn A" },
    { age: "<b>Ngày sinh</b>", name: "Trần Văn B" },
    { age: "<b>Email</b>", name: "Lê Văn C" },
    { age: "<b>Address</b>", name: "Phạm Văn D" },
  ];

  const [data, setData] = useState(initialData);
  const [focusIndex, setFocusIndex] = useState(null);

  const contentEditableRefs = useRef(data.map(() => React.createRef()));

  const handleChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  const handleFocus = (index) => {
    setFocusIndex(index);
  };

  const handleClickOutside = (event) => {
    if (
      contentEditableRefs.current.every(
        (ref) => ref.current && !ref.current.contains(event.target)
      )
    ) {
      setFocusIndex(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const applyCommand = (cmd, arg) => {
    document.execCommand(cmd, false, arg);
  };

  return (
    <Box display={"flex"} width={600} flexWrap={"wrap"}>
      {data.map((item, index) => (
        <Box
            
          key={index}
          position={"relative"}
          sx={{
            border: focusIndex === index ? "1px solid grey" : "none",
            padding: "0 5px",
            borderRadius: "3px",
           
          }}
          width={"290px"}
          ref={contentEditableRefs.current[index]}
        >
          <Box>
            <Stack direction={"row"}>
              <ContentEditable
                className="editable"
                tagName="pre"
                html={item.age}
                onChange={(e) => handleChange(index, "age", e.target.value)}
                style={{ width: "max-content", padding: "3px 5px", margin: "5px 0" }}
                onFocus={() => handleFocus(index)}
                spellCheck={false}
              />
              <ContentEditable
                className="editable"
                tagName="pre"
                html={item.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
                style={{ width: "max-content", padding: "3px 5px", margin: "5px 0" }}
                onFocus={() => handleFocus(index)}
                spellCheck={false}
              />
            </Stack>
          </Box>
          <Stack
            direction={"row"}
            sx={{
              background: "grey",
              width: 'max-content',
              position: "absolute",
              top: "-30px",
              right: "0",
              display: focusIndex === index ? "flex" : "none",
            }}
          >
            <Button sx={{ minWidth: "39px", height: "30px", color: "white" }} onClick={() => applyCommand("italic")}>
              <RiItalic size={"20px"} />
            </Button>
            <Button sx={{ minWidth: "39px", height: "30px", color: "white" }} onClick={() => applyCommand("bold")}>
              <RiBold size={"20px"} />
            </Button>
            <Button sx={{ minWidth: "39px", height: "30px", color: "white" }} onClick={() => applyCommand("underline")}>
              <RiUnderline size={"20px"} />
            </Button>
            <Button sx={{ minWidth: "39px", height: "30px", color: "white" }} onClick={() => applyCommand("insertUnorderedList")}>
              <RiListUnordered size={"20px"} />
            </Button>
            <Button sx={{ minWidth: "39px", height: "30px", color: "white" }} onClick={() => applyCommand("insertOrderedList")}>
              <RiListOrdered2 size={"20px"} />
            </Button>
          </Stack>
        </Box>
      ))}
    </Box>
  );
}

export default Cv;

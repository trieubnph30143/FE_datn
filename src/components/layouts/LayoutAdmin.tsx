import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  DialogActions,
  DialogContent,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  styled,
  Dialog,
  DialogTitle,
  Avatar,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
import React, { useState } from "react";
import logo from "../../images/logo4.png"
import profile from "../../images/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg"
import {
  RiArticleLine,
  RiBankCardFill,
  RiCloseCircleFill,
  RiContactsLine,
  RiFileListFill,
  RiGitBranchFill,
  RiInboxFill,
  RiLineChartFill,
  RiLineChartLine,
  RiMailAddFill,
  RiMenuFill,
  RiMessage3Fill,
  RiNotification2Fill,
  RiOrganizationChart,
  RiPencilFill,
  RiSearch2Fill,
  RiShuffleFill,
  RiSlideshow4Fill,
  RiTeamFill,
  RiUserAddFill,
  
  
} from "react-icons/ri";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { AiOutlineSearch } from "react-icons/ai";
import "../../App.css";
import { Link, Outlet, useLocation } from "react-router-dom";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent:"end",
  gap:"40px"
}));

const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: "#7ef2c2",
    color: "#0d8f50",
    "&:hover": {
      backgroundColor: "#a5f2d2",
    },
  },
}));

const LayoutAdmin = () => {
  const theme:any = useTheme();
  const [open, setOpen] = React.useState(true);
  const [selectedItem, setSelectedItem] = useState("");
  const location = useLocation();
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (text: string) => {
    setSelectedItem(text);
  };

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  const [opened, setOpenEnd] = React.useState(false);

  const handleClickOpen = () => {
    setOpenEnd(true);
  };
  const handleClose = () => {
    setOpenEnd(false);
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openned = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosed = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Box sx={{ display: "flex",".css-123k39-MuiPaper-root-MuiAppBar-root":{
        zIndex:9
      } }}>
        <CssBaseline />
        <AppBar
          position='fixed'
          open={open}
          sx={{ background:"#262b40", color: "black" }}>
          <Toolbar
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <div style={{ display: "flex" }}>
              <IconButton
                color='inherit'
                aria-label='open drawer'
                onClick={handleDrawerOpen}
                edge='start'
                sx={{ mr: 2, ...(open && { display: "none" }) }}>
               
                <ChevronLeftIcon sx={{ color: "white", fontSize: "30px" }} />
              </IconButton>
              <div>
                <IconButton>
                  <AiOutlineSearch
                    style={{ fontSize: "30px", color: "white" }}
                    onClick={handleClickOpen}
                  />
                </IconButton>
              </div>
            </div>
            <React.Fragment>
              <BootstrapDialog
                onClose={handleClose}
                aria-labelledby='customized-dialog-title'
                open={opened}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <AiOutlineSearch
                    style={{
                      margin: "15px",
                      fontSize: "30px",
                      color: "gray",
                    }}></AiOutlineSearch>
                  <input
                    type='text'
                    style={{
                      outline: "none",
                      border: "none",
                      fontWeight: "bold",
                      fontSize: "20px",
                      color: "#ccc",
                    }}
                    className='search'
                    placeholder='Search...'
                  />
                  <IconButton
                    aria-label='close'
                    onClick={handleClose}
                    sx={{
                      position: "absolute",
                      right: 8,
                      top: 8,
                      color: (theme) => theme.palette.grey[500],
                    }}>
                    <RiCloseCircleFill />
                  </IconButton>
                </div>
                <DialogContent dividers>
                  <Typography gutterBottom>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo
                    odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
                    risus, porta ac consectetur ac, vestibulum at eros.
                  </Typography>
                  <Typography gutterBottom>
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur et. Vivamus sagittis lacus vel augue laoreet
                    rutrum faucibus dolor auctor.
                  </Typography>
                  <Typography gutterBottom>
                    Aenean lacinia bibendum nulla sed consectetur. Praesent
                    commodo cursus magna, vel scelerisque nisl consectetur et.
                    Donec sed odio dui. Donec ullamcorper nulla non metus auctor
                    fringilla.
                  </Typography>
                </DialogContent>
                {/* <DialogActions>
                <Button autoFocus onClick={handleClose}>
                  Save changes
                </Button>
              </DialogActions> */}
              </BootstrapDialog>
            </React.Fragment>
            <Box>
              <Badge badgeContent={4} color='warning' sx={{ mr: 2 }}>
                <IconButton>
                  <RiNotification2Fill
                    style={{ color: "white", width: "20px", height: "20px" }}
                  />
                </IconButton>
              </Badge>

              <IconButton onClick={handleClick}>
               <img src={profile}  width={34} height={34} style={{borderRadius:"50%"}} alt="" />
              </IconButton>
            </Box>

            <Menu
              id='basic-menu'
              anchorEl={anchorEl}
              open={openned}
              onClose={handleClosed}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}>
              <MenuItem onClick={handleClosed}>Profile</MenuItem>
              <MenuItem onClick={handleClosed}>My account</MenuItem>
              <MenuItem onClick={handleClosed} sx={{ color: "green" }}>
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Box sx={{
          ".css-12i7wg6-MuiPaper-root-MuiDrawer-paper":{
            zIndex:9
          }
        }}>

        <Drawer
          
          sx={{
            width: drawerWidth,
            
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
            ".css-12i7wg6-MuiPaper-root-MuiDrawer-paper":{
              background:"#262b40",
              
            },
            padding:"10px"
          }}
          variant='persistent'
          anchor='left'
          open={open}>
          <DrawerHeader>
            <img src={logo} width={80} height={80} style={{objectFit:"contain"}} alt="" />
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon  sx={{color:"white",fontSize:"30px"}}/>
              ) : (
                <ChevronRightIcon sx={{color:"white",fontSize:"30px"}}/>
              )}
            </IconButton>
          </DrawerHeader>
          <Box className="see-more-admin" sx={{overflowY:"scroll",color:"white"}}>
          <List sx={{px:"10px"}}>
              <Typography ml={"5px"} fontWeight={"bold"}>Dashboard</Typography>
              <ListItem   sx={{"a":{
                color:"white",
                textDecoration:"none"
              },
              background:location.pathname=="/dashboard"? "#2e3650":undefined,
              border:location.pathname=="/dashboard"?"1px solid #4c5680":"none",
              borderRadius:location.pathname=="/dashboard"?"5px":"none",
              }} disablePadding>
                <Link to={"/dashboard"}> 
                <CustomListItemButton
                  >
                   <ListItemIcon sx={{display:"flex",justifyContent:"center"}}>
                  <RiLineChartFill    color={"white"}/>
                  </ListItemIcon>
                  <ListItemText primary={"Dashboard"} />
                </CustomListItemButton>
                
                </Link>
              </ListItem>
             
           
          </List>
          <Divider />

          <List sx={{px:"10px"}}>
              <Typography ml={"5px"} fontWeight={"bold"}>Courses</Typography>
              <ListItem   sx={{"a":{
                color:"white",
                textDecoration:"none"
              },
              background:location.pathname=="/dashboard/courses"? "#2e3650":undefined,
              border:location.pathname=="/dashboard/courses"?"1px solid #4c5680":"none",
              borderRadius:location.pathname=="/dashboard/courses"?"5px":"none",
              }} disablePadding>
                <Link to={"/dashboard/courses"}> 
                <CustomListItemButton
                  >
                   <ListItemIcon sx={{display:"flex",justifyContent:"center"}}>
                  <RiSlideshow4Fill  color={"white"}/>
                  </ListItemIcon>
                  <ListItemText primary={"Courses"} />
                </CustomListItemButton>
                
                </Link>
              </ListItem>
              <ListItem  sx={{"a":{
                color:"white",
                textDecoration:"none"
              },
              background:location.pathname=="/dashboard/lesson"? "#2e3650":undefined,
              border:location.pathname=="/dashboard/lesson"?"1px solid #4c5680":"none",
              borderRadius:location.pathname=="/dashboard/lesson"?"5px":"none",
              
              }} disablePadding>
                <Link to={"/dashboard/lesson"}> 
                <CustomListItemButton
                  >
                  <ListItemIcon sx={{display:"flex",justifyContent:"center"}}>
                  <RiFileListFill color={"white"}/>
                  </ListItemIcon>
                  <ListItemText primary={"Lesson"} />
                </CustomListItemButton>
                
                </Link>
              </ListItem>
              <ListItem  sx={{"a":{
                color:"white",
                textDecoration:"none"
              },
              background:location.pathname=="/dashboard/sublesson"? "#2e3650":undefined,
              border:location.pathname=="/dashboard/sublesson"?"1px solid #4c5680":"none",
              borderRadius:location.pathname=="/dashboard/sublesson"?"5px":"none",
              }} disablePadding>
                <Link to={"/dashboard/sublesson"}> 
                <CustomListItemButton
                  >
                  <ListItemIcon sx={{display:"flex",justifyContent:"center"}}>
                  <RiOrganizationChart color={"white"}/>
                  </ListItemIcon>
                  <ListItemText primary={"Sub Lesson"} />
                </CustomListItemButton>
                
                </Link>
              </ListItem>
           
          </List>
          <Divider />
          <List sx={{px:"10px"}}>
          <Typography ml={"5px"} fontWeight={"bold"}>Category</Typography>
          <ListItem  sx={{"a":{
                color:"white",
                textDecoration:"none"
              }
              ,  background:location.pathname=="/dashboard/categories"? "#2e3650":undefined,
              border:location.pathname=="/dashboard/categories"?"1px solid #4c5680":"none",
              borderRadius:location.pathname=="/dashboard/categories"?"5px":"none",
              }} disablePadding>
                <Link to={"/dashboard/categories"}> 
                <CustomListItemButton
                  >
                  <ListItemIcon sx={{display:"flex",justifyContent:"center"}}>
                  <RiGitBranchFill color={"white"}/>
                  </ListItemIcon>
                  <ListItemText primary={"Category"} />
                </CustomListItemButton>
                
                </Link>
              </ListItem>
          </List>
          <Divider />
          <List sx={{px:"10px"}}>
            
          <Typography ml={"5px"} fontWeight={"bold"}>Post</Typography>
          <ListItem  sx={{"a":{
                color:"white",
                textDecoration:"none"
              },
              background:location.pathname=="/dashboard/post"? "#2e3650":undefined,
              border:location.pathname=="/dashboard/post"?"1px solid #4c5680":"none",
              borderRadius:location.pathname=="/dashboard/post"?"5px":"none",
              }} disablePadding>
                <Link to={"/dashboard/post"}> 
                <CustomListItemButton
                  >
                  <ListItemIcon sx={{display:"flex",justifyContent:"center"}}>
                  <RiArticleLine color={"white"}/>
                  </ListItemIcon>
                  <ListItemText primary={"Blog"} />
                </CustomListItemButton>
                
                </Link>
              </ListItem>
          </List>
          <Divider />
          <List sx={{px:"10px"}}>
            
          <Typography ml={"5px"} fontWeight={"bold"}>Wallet</Typography>
          <ListItem  sx={{"a":{
                color:"white",
                textDecoration:"none"
              },
              background:location.pathname=="/dashboard/wallet"? "#2e3650":undefined,
              border:location.pathname=="/dashboard/wallet"?"1px solid #4c5680":"none",
              borderRadius:location.pathname=="/dashboard/wallet"?"5px":"none",
              }} disablePadding>
                <Link to={"/dashboard/wallet"}> 
                <CustomListItemButton
                  >
                  <ListItemIcon sx={{display:"flex",justifyContent:"center"}}>
                  <RiBankCardFill color={"white"}/>
                  </ListItemIcon>
                  <ListItemText primary={"Wallet"} />
                </CustomListItemButton>
                
                </Link>
              </ListItem>
          </List>
          <Divider />
          <List sx={{px:"10px"}}>
          <Typography ml={"5px"} fontWeight={"bold"}>Comment</Typography>
          <ListItem  sx={{"a":{
                color:"white",
                textDecoration:"none"
              }
              , background:location.pathname=="/dashboard/comment"? "#2e3650":undefined,
              border:location.pathname=="/dashboard/comment"?"1px solid #4c5680":"none",
              borderRadius:location.pathname=="/dashboard/comment"?"5px":"none",
              }} disablePadding>
                <Link to={"/dashboard/comment"}> 
                <CustomListItemButton
                  >
                  <ListItemIcon sx={{display:"flex",justifyContent:"center"}}>
                  <RiMessage3Fill color={"white"}/>
                  </ListItemIcon>
                  <ListItemText primary={"Comment"} />
                </CustomListItemButton>
                
                </Link>
              </ListItem>
          </List>
          <Divider />
          <List sx={{px:"10px"}}>
          <Typography ml={"5px"} fontWeight={"bold"}>Contact</Typography>
          <ListItem  sx={{"a":{
                color:"white",
                textDecoration:"none"
              },
              background:location.pathname=="/dashboard/contact"? "#2e3650":undefined,
              border:location.pathname=="/dashboard/contact"?"1px solid #4c5680":"none",
              borderRadius:location.pathname=="/dashboard/contact"?"5px":"none",
              }} disablePadding>
                <Link to={"/dashboard/contact"}> 
                <CustomListItemButton
                  >
                  <ListItemIcon sx={{display:"flex",justifyContent:"center"}}>
                  <RiContactsLine color={"white"}/> 
                  </ListItemIcon>
                  <ListItemText primary={"Contact"} />
                </CustomListItemButton>
                
                </Link>
              </ListItem>
          </List>
          <Divider />
          <List sx={{px:"10px"}}>
          <Typography ml={"5px"} fontWeight={"bold"}>User</Typography>
          <ListItem  sx={{"a":{
                color:"white",
                textDecoration:"none"
              },
              background:location.pathname=="/dashboard/user"? "#2e3650":undefined,
              border:location.pathname=="/dashboard/user"?"1px solid #4c5680":"none",
              borderRadius:location.pathname=="/dashboard/user"?"5px":"none",
              }} disablePadding>
                <Link to={"/dashboard/user"}> 
                <CustomListItemButton
                  >
                  <ListItemIcon sx={{display:"flex",justifyContent:"center"}}>
                  <RiUserAddFill color={"white"}/>
                  </ListItemIcon>
                  <ListItemText primary={"User"} />
                </CustomListItemButton>
                
                </Link>
              </ListItem>
              <ListItem  sx={{"a":{
                color:"white",
                textDecoration:"none"
              },
              background:location.pathname=="/dashboard/permission"? "#2e3650":undefined,
              border:location.pathname=="/dashboard/permission"?"1px solid #4c5680":"none",
              borderRadius:location.pathname=="/dashboard/permission"?"5px":"none",
              }} disablePadding>
                <Link to={"/dashboard/permission"}> 
                <CustomListItemButton
                  >
                  <ListItemIcon sx={{display:"flex",justifyContent:"center"}}>
                  <RiTeamFill color={"white"}/>
                  </ListItemIcon>
                  <ListItemText primary={"Permission"} />
                </CustomListItemButton>
                
                </Link>
              </ListItem>
              <ListItem  sx={{"a":{
                color:"white",
                textDecoration:"none"
              },
              background:location.pathname=="/dashboard/role"? "#2e3650":undefined,
              border:location.pathname=="/dashboard/role"?"1px solid #4c5680":"none",
              borderRadius:location.pathname=="/dashboard/role"?"5px":"none",
              }} disablePadding>
                <Link to={"/dashboard/role"}> 
                <CustomListItemButton
                  >
                  <ListItemIcon sx={{display:"flex",justifyContent:"center"}}>
                  <RiPencilFill color={"white"}/>
                  </ListItemIcon>
                  <ListItemText primary={"Role"} />
                </CustomListItemButton>
                
                </Link>
              </ListItem>
              <ListItem  sx={{"a":{
                color:"white",
                textDecoration:"none"
              }
              , background:location.pathname=="/dashboard/role_permission"? "#2e3650":undefined,
              border:location.pathname=="/dashboard/role_permission"?"1px solid #4c5680":"none",
              borderRadius:location.pathname=="/dashboard/role_permission"?"5px":"none",
              }} disablePadding>
                <Link to={"/dashboard/role_permission"}> 
                <CustomListItemButton
                  >
                  <ListItemIcon sx={{display:"flex",justifyContent:"center"}}>
                  <RiShuffleFill color={"white"}/>
                  </ListItemIcon>
                  <ListItemText primary={"Role Permission"} />
                </CustomListItemButton>
                
                </Link>
              </ListItem>
          </List>
          </Box>
        </Drawer>
        </Box>
        <Main sx={{background:"#f5f8fb",minHeight:"100vh"}} open={open}>
          <DrawerHeader />
          <Box >
          <Outlet />

          </Box>
        </Main>
      </Box>
    </div>
  );
};

export default LayoutAdmin;

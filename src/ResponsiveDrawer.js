import * as React from "react";
import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import FormBuilder from "./FormBuilder";
import DialogBox from "./DialogBox";
import "./index.css";


const drawerWidth = 200;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => (
  {
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function PersistentDrawerRight() {

  // dialog box
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  /* textField type */
  const [fields, setFields] = useState([]);
  const [fieldId, setId] = useState(0);

  //method add the text field
  const handleAddField = (
    fieldType,
    fieldTitle,
    fieldLabel,
    fieldRadioData,
    noOfRadioData
  ) => {
    const newField = {
      id: fieldId,
      label: fieldLabel,
      type: fieldType,
      value: "",
      title: fieldTitle,
      radioData: fieldRadioData?fieldRadioData:"",
      noOfData: noOfRadioData?noOfRadioData:0,
    };
    setId(fieldId + 1);
    setFields([...fields, newField]);
  };

  const handleDeleteField = (fieldid) => {
    const newFields = fields.filter((field) => field.id !== fieldid);
    setFields(newFields);
  };

  // method field
  const handleFieldChange = (event, fieldId) => {
    const fieldIndex = fields.findIndex((field) => field.id === fieldId);
    const updatedField = {
      ...fields[fieldIndex],
      value: event.target.value,
    };

    setFields([
      ...fields.slice(0, fieldIndex),
      updatedField,
      ...fields.slice(fieldIndex + 1),
    ]);
  };

  const handleClearChange = () => {
    setFields([]);
  };

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [typeOfField, setTypeOfField] = useState("text");



  return (
    <Box sx={{ display: "flex" }}>
      <DialogBox
        open={openDialog}
        handleAddField={handleAddField}
        handleClose={handleClose}
        typeOfField={typeOfField}
      />
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
            Form Builder
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Main open={open}>
        <DrawerHeader />
        <Typography paragraph>
          <FormBuilder
            fields={fields}
            handleFieldChange={handleFieldChange}
            handleClearChange={handleClearChange}
            handleDeleteField={handleDeleteField}
          />
        </Typography>
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Text Box", "Date", "Radio Button", "Check Box", "Menu"].map(
            (text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  onClick={() => {
                    switch (text) {
                      case "Text Box":
                        setTypeOfField("text");
                        handleClickOpen();
                        break;
                      case "Date":
                        setTypeOfField("date");
                        handleClickOpen();
                        break;
                      case "Radio Button":
                        setTypeOfField("radio");
                        handleClickOpen();
                        break;
                      case "Check Box":
                        setTypeOfField("checkbox");
                        handleClickOpen();
                        break;
                      case "Menu":
                        setTypeOfField("menu");
                        handleClickOpen();
                        break;
                      default:
                        break;
                    }
                  }}
                >
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </Drawer>
    </Box>
  );
}



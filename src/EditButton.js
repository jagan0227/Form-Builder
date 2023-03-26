import * as React from "react";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Edit from "@mui/icons-material/Edit";
import "./index.css";
import UpdateDialogBox from "./UpdateDialogBox";

function EditButton({ updateField,setUpdatedContent }) {

  const [openDialog, setOpenDialog] = useState(false);

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  return (
    <>
        <UpdateDialogBox
        setUpdatedContent = {setUpdatedContent}
          open={openDialog}
          handleClose={handleClose}
          typeOfField={updateField.type}
          updateField={updateField}>
        </UpdateDialogBox>

      <IconButton
        className="editBtn editBtn--edit"
        onClick={() => {
          handleClickOpen();
        }}
      >
        <Edit className="editBtn" />
      </IconButton>
    </>
  );
}

export default EditButton;

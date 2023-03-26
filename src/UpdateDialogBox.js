import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import "./index.css";
import { TextField } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function UpdateDialogBox({
  open,
  handleClose,
  typeOfField,
  updateField,
  setUpdatedContent
}) {
  const [title, setTitle] = useState(updateField.title?updateField.title:"");
  const [label, setLabel] = useState(updateField.label?updateField.label:"");
  const [noOfRadio, setNoOfRadio] = useState(updateField.noOfData?updateField.noOfData:0);
  const [radioData, setRadioData] = useState(updateField.radioData?updateField.radioData:"");

  return (
    <div> 
      <BootstrapDialog
        onClose={() => {
          handleClose();
          setTitle(updateField.title)
          setLabel(updateField.label)
          setNoOfRadio(updateField.noOfRadio)
          setRadioData(updateField.radioData)      
        }}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={() => {
            handleClose();
            setTitle(updateField.title)
            setLabel(updateField.label)
            setNoOfRadio(updateField.noOfRadio)
            setRadioData(updateField.radioData)    
          }}
        >
          Update Details
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom className="fieldForm">
            {(() => {
              switch (typeOfField) {
                case "text":
                  return (
                    <>
                      <TextField
                        label={"Enter Title"}
                        type={"text"}
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                      />
                      <br />
                      <br />
                      <TextField
                        label={"Enter Label"}
                        type={"text"}
                        value={label}
                        onChange={(event) => setLabel(event.target.value)}
                      />
                    </>
                  );

                case "date":
                  return (
                    <>
                      <TextField
                        label={"Enter Title for date"}
                        type={"text"}
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                      />
                    </>
                  );
                case "radio":
                case "checkbox":
                case "menu":
                  return (
                    <>
                      <TextField
                        label={"Enter Title for radio"}
                        type={"text"}
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                      />
                      <br />
                      <br />
                      <TextField
                        label={"Enter of radio"}
                        type={"number"}
                        value={noOfRadio}
                        onChange={(event) => {
                          const no = parseInt(event.target.value);
                          if (no > 0 && no <= 10) {
                            setNoOfRadio(parseInt(event.target.value));
                          }
                        }}
                      />
                      <br />
                      <br />
                      <TextField
                        label={"Enter of fields seperated by (,)"}
                        type={"text"}
                        value={radioData}
                        onChange={(event) => {
                          const count =
                            event.target.value.split(",").length - 1;
                          if (count < noOfRadio) {
                            const fieldData = event.target.value;
                            setRadioData(fieldData);
                          }
                        }}
                      />
                    </>
                  );
                default:
                  return null;
              }
            })()}
          </Typography>
        </DialogContent>
        <DialogActions>
           {title.toString().length > 0 && (
            <Button
              variant="outlined"
              onClick={() => {
                setUpdatedContent(
                  title,
                  label,
                  radioData,
                  noOfRadio,
                  updateField
                );
                handleClose();
              }}
            >
              Update
            </Button>
          )} 
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}


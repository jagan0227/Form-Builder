import { Button } from "@mui/material";
import DynamicTextField from "./DynamicTextField";
import RadioButton from "./RadioButton";
import CheckboxButton from "./CheckboxButton";
import MenuButton from "./MenuButton";
import "./index.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import DialogBox from "./DialogBox";
import { useState, useRef, useEffect } from "react";
import DeleteButton from "./DeletButton";
import EditButton from "./EditButton";
import dragula from "dragula";
import 'dragula/dist/dragula.css';


function FormBuilder({
  fields,
  handleFieldChange,
  handleClearChange,
  handleDeleteField,
}) {
  //

  const formRef = useRef(null);
  useEffect(() => {
    const formContainer = formRef.current;
    dragula([formContainer]);
  }, []);

  //

  const [update, setUpdate] = useState(0);

  const setUpdatedContent = (title, label, radioData, noOfRadio, fieldData) => {
    fieldData.title = title;
    fieldData.label = label;
    fieldData.radioData = radioData;
    fieldData.noOfRadio = parseInt(noOfRadio);

    setUpdate(update + 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fields.map((k) => {
      console.log(k.value);
    });
  };

  // dialog box
  const [openDialog, setOpenDialog] = useState(false);

  const handleClose = () => {
    setOpenDialog(false);
  };

  const [dataField] = useState("");
  const [fieldType] = useState("text");

  return (
    <form onSubmit={handleSubmit}>
      <br />
      <div draggable={true} className="form-element" ref={formRef}>
        {fields.map((field) => {
          
          switch (field.type) {
            case "text":
              return (
                <div className="container" key={field.id}>
                  <Card sx={{ minWidth: 205 }}>
                    <CardContent>
                      <Typography component="div">
                        <div className="text_title">
                          {field.title + " "}
                          <EditButton
                            setUpdatedContent={setUpdatedContent}
                            updateField={field}
                          />
                          <DeleteButton
                            onClick={() => handleDeleteField(field.id)}
                          />
                        </div>
                        <DynamicTextField
                          key={field.id}
                          label={field.label}
                          type={field.type}
                          value={field.value}
                          onChange={(event) =>
                            handleFieldChange(event, field.id)
                          }
                        />
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              );
            case "date":
              return (
                <div className="container" key={field.id}>
                  <Card sx={{ minWidth: 205 }}>
                    <CardContent>
                      <Typography component="div">
                        <div className="text_title">
                          {field.title + " "}
                          <EditButton
                            setUpdatedContent={setUpdatedContent}
                            updateField={field}
                          />
                          <DeleteButton
                            onClick={() => handleDeleteField(field.id)}
                          />
                        </div>
                        <DynamicTextField
                          key={field.id}
                          type={field.type}
                          value={field.value}
                          onChange={(event) =>
                            handleFieldChange(event, field.id)
                          }
                        />
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              );
            case "checkbox":
              return (
                <div className="container" key={field.id}>
                  <Card sx={{ minWidth: 205 }}>
                    <CardContent>
                      <Typography component="div">
                        <div className="text_title">
                          {field.title + " "}
                          <EditButton
                            setUpdatedContent={setUpdatedContent}
                            updateField={field}
                          />
                          <DeleteButton
                            onClick={() => handleDeleteField(field.id)}
                          />
                        </div>
                        <CheckboxButton
                          listOfOptions={field.radioData.split(",")}
                          onChange={(selectedOptions) => {
                            field.value = selectedOptions;
                          }}
                        />
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              );
            case "radio":
              return (
                <div className="container" key={field.id}>
                  <Card sx={{ minWidth: 205 }}>
                    <CardContent>
                      <Typography component="div">
                        <div className="text_title">
                          {field.title + " "}
                          <EditButton
                            setUpdatedContent={setUpdatedContent}
                            updateField={field}
                          />
                          <DeleteButton
                            onClick={() => handleDeleteField(field.id)}
                          />
                        </div>
                        <RadioButton
                          listOfOptions={field.radioData.split(",")}
                          onChange={(event) =>
                            (field.value = event.target.value)
                          }
                        />
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              );
            case "menu":
              return (
                <div className="container" key={field.id}>
                  <Card sx={{ minWidth: 205 }}>
                    <CardContent>
                      <Typography component="div">
                        <div className="text_title">
                          {field.title + " "}
                          <EditButton
                            setUpdatedContent={setUpdatedContent}
                            updateField={field}
                          />
                          <DeleteButton
                            onClick={() => handleDeleteField(field.id)}
                          />
                        </div>
                        <MenuButton
                          listOfOptions={field.radioData.split(",")}
                          onChange={(event) =>
                            (field.value = event.target.value)
                          }
                        />
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              );
            default:
              console.error("unknown selected");
          
        }
        })}
      </div>

      {fields.length > 0 && (
        <Button className="submint_button" variant="contained" type="submit">
          Submit Form
        </Button>
      )}
      {fields.length > 0 && (
        <Button
          className="submint_button"
          variant="contained"
          type="clear"
          onClick={handleClearChange}
        >
          Clear Form
        </Button>
      )}

      <DialogBox
        open={openDialog}
        handleClose={handleClose}
        typeOfField={fieldType}
        updateField={dataField}
      />
    </form>
  );
}

export default FormBuilder;

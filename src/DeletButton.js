import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";

function DeleteButton(props) {
  const { onClick } = props;
  
  return (
    <IconButton
      className="editBtn editBtn--delete"
      onClick={onClick}
    >
      <Delete className="editBtn" />
    </IconButton>
  );
}

export default DeleteButton;
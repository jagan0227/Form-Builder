import { TextField } from '@mui/material';

function DynamicTextField(props) {
  const { label, value, onChange,type } = props;
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      type={type}
    />
  );
}

export default DynamicTextField;

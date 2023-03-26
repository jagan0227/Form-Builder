import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function CheckboxButton({ listOfOptions, onChange }) {
  const [selectedOptions, setSelectedOptions] = React.useState([]);

  const handleOptionChange = (event) => {
    const selectedOption = event.target.value;
    const newSelectedOptions = selectedOptions.includes(selectedOption)
      ? selectedOptions.filter((option) => option !== selectedOption)
      : [...selectedOptions, selectedOption];

    setSelectedOptions(newSelectedOptions);
    onChange(newSelectedOptions);
  };

  return (
    <FormGroup>
      {listOfOptions.map((option) => (
        <FormControlLabel
          key={option}
          control={
            <Checkbox
              checked={selectedOptions.includes(option)}
              onChange={handleOptionChange}
              value={option}
            />
          }
          label={option}
        />
      ))}
    </FormGroup>
  );
}
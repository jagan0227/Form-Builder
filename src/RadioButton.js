import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

export default function RadioButtons({ listOfOptions, onChange }) {
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        onChange={onChange}
      >
        {listOfOptions.map((option) => (
          <FormControlLabel
            key={option}
            value={option}
            control={<Radio />}
            label={option}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

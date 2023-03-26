import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export default function MenuButton({listOfOptions ,onChange}) {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-select-currency-native"
          select
          SelectProps={{
            native: true,
            onChange
          }}
        >
          {
            listOfOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))
          }
        </TextField>
      </div>
      
    </Box>
  );
}
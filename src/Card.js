import * as React from 'react';
import DynamicTextField from './DynamicTextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function BasicCard() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">

        {/* Field */}

        </Typography>
        </CardContent>
    </Card>
  );
}
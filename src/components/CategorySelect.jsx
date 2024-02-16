import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const CategorySelect = (props) => {
  const { categories, handleInput } = props;
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demp-simple-select-label">Choose Category</InputLabel>
        <Select
          labelId="demp-simple-select-label"
          id="demo-simple-select"
          label="Category"
          name="category"
          onChange={handleInput}
        >
          {categories.map((elem) => (
            <MenuItem key={elem.id} value={elem.name}>
              {elem.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CategorySelect;

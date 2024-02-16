import { Pagination, Stack, Typography } from "@mui/material";
import React from "react";

const PaginationAllCard = ({ count, page, handleChange }) => {
  return (
    <div>
      <Stack spacing={2}>
        <Typography>Page:{page}</Typography>
        <Pagination count={count} color="primary" onChange={handleChange} />
      </Stack>
    </div>
  );
};

export default PaginationAllCard;

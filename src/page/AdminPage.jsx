import { Button } from "@mui/material";
import React, { useState } from "react";
import AddProduct from "../components/AddProduct";
import AddCategory from "../components/AddCategory";

const AdminPage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button onClick={handleOpen} variant="contained">
        Add Category
      </Button>
      <AddProduct />
      <AddCategory open={open} handleClose={handleClose} />
    </div>
  );
};

export default AdminPage;

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
      <AddCategory open={open} handleClose={handleClose} />
      <button
        className="btn red"
        id="btn-add-category-admin"
        onClick={handleOpen}
        variant="contained"
      >
        Add Category
      </button>
      <AddProduct />
    </div>
  );
};

export default AdminPage;

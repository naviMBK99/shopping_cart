import React, { useState } from "react";
import { useProduct } from "../context/ProductContextProvider";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";

const AddCategory = (props) => {
  const style = {
    position: "absolute",
    top: "30%",
    left: "30%",
    width: 700,
    display: "flex",
    border: "2px solid black",
    boxShadow: 24,
    bgColor: "background.paper",
    p: 4,
  };
  const { createCategory } = useProduct();
  const [category, setCategory] = useState();
  const handleClick = () => {
    if (!category) {
      alert("Заполните поле!");
    } else {
      const newCategory = {
        name: category,
      };
      createCategory(newCategory);
    }
    setCategory("");
    handleClose();
  };
  const { open, handleClose } = props;
  return (
    <div>
      <Modal onClose={handleClose} open={open}>
        <Box sx={style}>
          <Typography id="modal-modal-title">
            Добавить новую категорию
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            onChange={(e) => setCategory(e.target.value)}
          />
          <Button onClick={handleClick}>Добавить</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AddCategory;

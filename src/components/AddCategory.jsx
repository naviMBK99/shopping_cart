import React, { useState } from "react";
import { useProduct } from "../context/ProductContextProvider";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";

const AddCategory = (props) => {
  const style = {
    position: "absolute",
    top: "20%",
    left: "25%",
    width: 700,
    display: "flex",
    border: "2px solid black",
    boxShadow: 24,
    backGround: "white",
    p: 4,
  };
  const { createCategory } = useProduct();
  const [category, setCategory] = useState("");
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
    <>
      <Modal onClose={handleClose} open={open} className="modal-admin">
        <Box sx={style}>
          <Typography sx={{ color: "rgb(23, 23, 95)", boxShadow: "white 4px" }}>
            Добавить новую категорию
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Button className="btn red" onClick={handleClick}>
            Добавить
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default AddCategory;

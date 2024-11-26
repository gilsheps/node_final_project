import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { newDepartment } from "../../utils/utilsDepartment";
import {
  Box,
  Button,
  FormControl,
  TextField,
} from "@mui/material";

export default function NewDepartmentComp() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [department, setDepartment] = React.useState({
    name: "",
    managerName: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("user", user);
    newDepartment(department)
  };

  const hadleCancelClick = () => {
    navigate("/main_page");
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mx: "auto",
        width: "75%",
        alignItems: "stretch",
      }}
    >
      <FormControl>
        <TextField
          type="text"
          fullWidth
          label="Department name:"
          variant="outlined"
          onChange={(e) => {
            setDepartment({ ...department, name: e.target.value });
          }}
        />
      </FormControl>
      <FormControl>
        <TextField
          type="text"
          label="Department manager name:"
          variant="outlined"
          fullWidth
          onChange={(e) => {
            setDepartment({ ...department, managerName: e.target.value });
          }}
        />
      </FormControl>

      <Button type="submit" variant="contained">
        Save
      </Button>
      <Button onClick={hadleCancelClick} variant="contained">
        Cancel
      </Button>
    </Box>
  );
}

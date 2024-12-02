import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { editDepartment, newDepartment } from "../../utils/utilsDepartment";
import { Box, Button, FormControl, TextField } from "@mui/material";
import { getActionsAllowed } from "../../utils/actionsAllowed.js";

export default function NewDepartmentComp() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [department, setDepartment] = useState({
    name: "",
    managerName: "",
  });

  useEffect(() => {
    getActionsAllowed()
    if (state.department) {
      console.log('state.department',state.department)
      setDepartment(state.department);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("user", user);
    if (e.nativeEvent.submitter.name === "btn_edit") {
      editDepartment(department);
    } else {
      newDepartment(department);
    }
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
          value={department?.name || ""}
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
          value={department?.managerName || ""}
          onChange={(e) => {
            setDepartment({ ...department, managerName: e.target.value });
          }}
        />
      </FormControl>

      {state.department ? (
        <Button type="submit" name="btn_edit" variant="contained">
          Edit
        </Button>
      ) : (
        <Button type="submit" name="btn_save" variant="contained">
          Save
        </Button>
      )}
      <Button onClick={hadleCancelClick} variant="contained">
        Cancel
      </Button>
    </Box>
  );
}

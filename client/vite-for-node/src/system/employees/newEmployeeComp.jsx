import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  Box,
  Button,
  FormControl,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { getDepartmentsList } from "../../utils/utilsDepartment.js";
import { addNewEmployee, editEmployee } from "../../utils/utilsEmployee";
import { getActionsAllowed } from "../../utils/actionsAllowed";

export default function NewEmployeeComp() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    startWorkYear: 0,
    departmentId: "",
  });
  const [departmentsList, setDepartmentsList] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    getActionsAllowed();
    if (e.nativeEvent.submitter.name === "btn_edit") {
      editEmployee(user);
    } else {
      addNewEmployee(user);
    }
  };
  useEffect(() => {
    getDepartmentsList().then((dep) => {
      setDepartmentsList(dep.data);
      if (state.employee) {
        const depName = dep.data.filter(
          (e) => e._id == state.employee.departmentId
        )[0].name;
        setUser({ ...state.employee, depName });
      }
    });
  }, []);

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
          label="First Name:"
          variant="outlined"
          value={user?.firstName || ""}
          onChange={(e) => {
            setUser({ ...user, firstName: e.target.value });
          }}
        />
      </FormControl>
      <FormControl>
        <TextField
          type="text"
          label="Last Name:"
          variant="outlined"
          value={user?.lastName || ""}
          fullWidth
          onChange={(e) => {
            setUser({ ...user, lastName: e.target.value });
          }}
        />
      </FormControl>
      <FormControl>
        <TextField
          type="number"
          label="Start Work Year:"
          variant="outlined"
          value={user?.startWorkYear || ""}
          onChange={(e) => {
            setUser({ ...user, startWorkYear: e.target.value });
          }}
        />
      </FormControl>
      <FormControl>
        <InputLabel id="test-select-label">Department ID:</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select"
          value={user?.departmentId || ""}
          onChange={(e) => setUser({ ...user, departmentId: e.target.id })}
          displayEmpty={false}
        >
          {departmentsList.map((item, index) => {
            return (
              <MenuItem value={item.name} name={item._id} key={index}>
                {item.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {state.user ? (
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

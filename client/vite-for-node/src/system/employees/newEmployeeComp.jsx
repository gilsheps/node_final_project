import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { getDepartmentsList } from "../../utils/utilsDepartment";
import { addNewEmployee } from "../../utils/utilsEmployee";

export default function NewEmployeeComp() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [user, setUser] = React.useState({
    firstName: "",
    lastName: "",
    startWorkYear: 0,
    departmentId: 0,
  });
  const [departmentsList, setDepartmentsList] = React.useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    addNewEmployee(user);
  };
  React.useEffect(() => {
    getDepartmentsList().then((dep) => {
      setDepartmentsList(dep.data);
    });
    if (state) {
      setUser(state.employee);
    }
  }, [user]);

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
          defaultValue={user?.departmentId || ""}
          onChange={(e) => setUser({ ...user, departmentId: e.target.value })}
          displayEmpty={false}
        >
          {departmentsList.map((item, index) => {
            return (
              <MenuItem value={item._id} key={index}>
                {item.name}
              </MenuItem>
            );
          })}
        </Select>
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

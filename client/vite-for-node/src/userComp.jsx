import * as React from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import EmployeesComp from "./system/employees/employeesComp";
import DepartmentComp from "./system/department/departmentComp";
import ShiftsComp from "./system/shift/ShiftsComp";
import SignOutComp from "./system/signout";
import UsersSystemComp from "./system/users/UsersSystemComp"

export default function UserComp() {
  const [value, setValue] = React.useState('1');
  const [user, setUser] = React.useState({});

  const handleChange = (event, newValue) => {
    // console.log("handleChange", event, newValue);
    setValue(newValue);
    localStorage.setItem("newValue", newValue);
  };

  React.useEffect(() => {
    let valueFromStorage = localStorage.getItem("newValue");
    if (valueFromStorage == "0") {
      setValue("1");
      localStorage.setItem("newValue", "1");
    } else {
      if (valueFromStorage < "5") {
        if (valueFromStorage) {
          if (valueFromStorage != value) {
            setValue(valueFromStorage);
          }
        } else {
          localStorage.setItem("newValue", value);
          setValue(localStorage.getItem("newValue"));
        }
      }
    }
    setUser(JSON.parse(localStorage.getItem("user")))
  }, []);

//   const getUserName = () => {
//     return 
//   };
  return (
    <div className="square">
      <h1>Hello, {user.username}</h1>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              centered
            >
              <Tab label="Employees" value="1" />
              <Tab label="Department" value="2" />
              <Tab label="Shifts" value="3" />
              <Tab label="Users" value="4" />
              <Tab label="Sign Out" value="5" />
            </TabList>
          </Box>
          <TabPanel value="1">{<EmployeesComp />}</TabPanel>
          <TabPanel value="2">{<DepartmentComp />}</TabPanel>
          <TabPanel value="3">{<ShiftsComp />}</TabPanel>
          <TabPanel value="4">{<UsersSystemComp />}</TabPanel>
          <TabPanel value="5">{<SignOutComp />}</TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

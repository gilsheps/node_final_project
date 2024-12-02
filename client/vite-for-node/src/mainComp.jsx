import { useEffect, useState, useRef } from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import EmployeesComp from "./system/employees/employeesComp";
import DepartmentComp from "./system/department/departmentComp";
import ShiftsComp from "./system/shift/ShiftsComp";
import SignOutComp from "./system/signout";
import UsersSystemComp from "./system/users/usersComp";
import { getActionsAllowed } from "./utils/actionsAllowed";
import { useNavigate } from "react-router";
import {
  getUserFromLocalStorage,
  getUserNameFromLocalStorage,
  setInLocalStorage,
} from "./utils/utilsLocalStorage";

export default function MainComp() {
  const [value, setValue] = useState("1");
  const [user, setUser] = useState({});
  const initialized = useRef(false);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setInLocalStorage("newValue", newValue);
    getActionsAllowed();
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      console.log("stop run twice!!!");
      getActionsAllowed();
      // console.log("getUserFromLocalStorage", getUserFromLocalStorage());
      setUser(getUserFromLocalStorage());

      let valueFromStorage = localStorage.getItem("newValue");
      if (valueFromStorage == "0") {
        setValue("1");
        setInLocalStorage("newValue", "1");
      } else {
        if (valueFromStorage < "5") {
          if (valueFromStorage) {
            if (valueFromStorage != value) {
              setValue(valueFromStorage);
            }
          } else {
            setInLocalStorage("newValue", value);
            setValue(localStorage.getItem("newValue"));
          }
        }
      }
    }
  }, []);

  return (
    <div className="square">
      <h1>Hello, {getUserNameFromLocalStorage()}</h1>
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
          <TabPanel value="1">{value === "1" && <EmployeesComp />}</TabPanel>
          <TabPanel value="2">{value === "2" && <DepartmentComp />}</TabPanel>
          <TabPanel value="3">{value === "3" && <ShiftsComp />}</TabPanel>
          <TabPanel value="4">{value === "4" && <UsersSystemComp />}</TabPanel>
          <TabPanel value="5">{value === "5" && <SignOutComp />}</TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

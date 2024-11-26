import * as React from "react";
import { useNavigate } from "react-router-dom";
import { getAllEmployee } from "../../utils/utilsEmployee";
import { getDepartmentsList } from "../../utils/utilsDepartment";
import NewEmployeeComp from "./newEmployeeComp";
import { Box, Button, InputLabel, Select, MenuItem } from "@mui/material";
import { getAllShifts } from "../../utils/utilsShifts";

export default function EmployeesComp() {
  const [employees, setEmployees] = React.useState([{}]);
  const [shifts, setShifts] = React.useState([]);
  const [departmentsList, setDepartmentsList] = React.useState([]);
  const [department, setDepartment] = React.useState({});
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/add_employee", { state: {} });
    console.log("clickkkkkk");
  };

  React.useEffect(() => {
    getAllEmployee().then((data) => {
      setEmployees(data.data);
    });
    getDepartmentsList().then((data) => {
      setDepartmentsList(data.data);
    });
    getAllShifts().then((data) => {
      setShifts(data.data);
    });
  }, []);

  const haddleDepartmentsClick = (employee, index) => {
    navigate("/edit_department", { state: getDepartmentById(employee) });
  };

  const handleNameClick = (employee, index) => {
    navigate("/add_employee", { state: { employee } });
  };

  const getDepartmentById = (employee) => {
    return (
      departmentsList?.filter((data) => data._id == employee.departmentId)[0] ||
      ""
    );
  };

  const getEmployee = (employee, index) => {
    return (
      <tr key={index}>
        <td>
          <Button onClick={() => handleNameClick(employee, index)}>
            {`${employee.firstName} ${employee.lastName}`}
          </Button>
        </td>
        <td>
          <div>
            <Button onClick={() => haddleDepartmentsClick(employee, index)}>
              {getDepartmentById(employee).name}
            </Button>
          </div>
        </td>
        <td>
          <div>
            <ul>
              {shifts.map((item, index) => {
                return (
                  <li value={item._id} key={index}>
                    date:
                    {item.date.substring(0, item.date.indexOf("T"))} time:
                    {item.startingHour} - {item.endingHour}
                  </li>
                );
              })}
            </ul>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="divCenter">
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select"
        defaultValue=""
        onChange={(e) => setDepartment(e.target.value)}
        displayEmpty={false}
      >
        <MenuItem value="">
          <em>All</em>
        </MenuItem>
        {departmentsList.map((item, index) => {
          return (
            <MenuItem value={item._id} key={index}>
              {item.name}
            </MenuItem>
          );
        })}
      </Select>
      <table border={1} className="center">
        <tbody>
          <tr>
            <th>Full Name</th>
            <th>Department</th>
            <th>Shifts</th>
          </tr>

          {employees
            .filter((e) => e.departmentId == department)
            .map((employee, index) => getEmployee(employee, index)).length > 0
            ? employees
                .filter((e) => e.departmentId == department)
                .map((employee, index) => getEmployee(employee, index))
            : employees.map((employee, index) => getEmployee(employee, index))}
        </tbody>
      </table>
      <Button onClick={handleClick}>New Employee</Button>
    </div>
  );
}

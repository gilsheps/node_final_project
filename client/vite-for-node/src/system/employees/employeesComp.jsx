import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getAllEmployee } from "../../utils/utilsEmployee";
import { getDepartmentsList } from "../../utils/utilsDepartment";
import { Button, Select, MenuItem } from "@mui/material";
import { getAllShifts } from "../../utils/utilsShifts";
import { getEmployeeName } from "../../utils/utilsEmployee";
import { getActionsAllowed } from "../../utils/actionsAllowed";

export default function EmployeesComp() {
  const [employees, setEmployees] = useState([{}]);
  const [shifts, setShifts] = useState([]);
  const [departmentsList, setDepartmentsList] = useState([]);
  const [department, setDepartment] = useState({});
  const navigate = useNavigate();
  const handleClick = () => {
    getActionsAllowed()
    navigate("/employee", { state: {} });
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getAllEmployee();
      setEmployees(data);
      const { data: depData } = await getDepartmentsList();
      setDepartmentsList(depData);
      const { data: shiftData } = await getAllShifts();
      setShifts(shiftData);
    };
    fetchData();
  }, []);

  const haddleDepartmentsClick = async (item) => {
    getActionsAllowed()
    const dep = getDepartmentById(item);
    console.log("haddleDepartmentsClick", dep.manager);
    const managerName = await getEmployeeName(dep.manager);
    console.log("haddleDepartmentsClick", managerName);
    const department = { ...dep, managerName: managerName };
    navigate("/department", {
      state: { department },
    });
  };

  const handleNameClick = (employee) => {
    getActionsAllowed()
    navigate("/employee", { state: { employee } })
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
          <Button onClick={() => handleNameClick(employee)}>
            {`${employee.firstName} ${employee.lastName}`}
          </Button>
        </td>
        <td>
          <div>
            <Button onClick={() => haddleDepartmentsClick(employee)}>
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

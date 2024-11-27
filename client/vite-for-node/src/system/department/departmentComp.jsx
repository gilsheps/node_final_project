import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getEmployeeName } from "../../utils/utilsEmployee";
import {
  getDepartmentsList,
  getEmployessByDepartmentList,
} from "../../utils/utilsDepartment";
import { Button } from "@mui/material";

export default function DepartmentComp() {
  const [departmentsList, setDepartmentsList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getDepartmentsList();
      const managerPromises = data.map(async (dep) => {
        const managerName = await getEmployeeName(dep.manager);
        const { data: employeeList } = await getEmployessByDepartmentList(
          dep._id
        );
        return { ...dep, managerName, employeeList };
      });

      const updatedDepartments = await Promise.all(managerPromises);
      console.log("updatedDepartments", updatedDepartments);

      setDepartmentsList(updatedDepartments);
    };

    fetchData().catch(console.error);
  }, []);

  const handleNameClick = (department) => {
    console.log("handleNameClick", department);
    navigate("/department", { state: { department } });
  };
  const handleManagerClick = (e, item) => {
    console.log("handleManagerClick", e.target.value);
    console.log(e.target.textContent);
    const {employeeList} = item
    const employee = employeeList.filter(
      (obj) =>
        e.target.textContent ==
        `${obj.firstName} ${obj.lastName}`
    )[0];
    navigate("/employee", { state: { employee } });
  };

  const handleEmployeeClick = (employee) => {
    console.log("handleEmployeeClick", employee);
    navigate("/employee", { state: { employee } });
  };
  return (
    <div className="divCenter">
      <table border={1} className="center">
        <tbody>
          <tr>
            <th>Department name</th>
            <th>Department manager name</th>
            <th>Employees names</th>
          </tr>
          {departmentsList.map((dep, index) => {
            return (
              <tr key={index}>
                <td>
                  <Button onClick={() => handleNameClick(dep)}>
                    {dep.name}
                  </Button>
                </td>
                <td>
                  <Button onClick={(e) => handleManagerClick(e, dep)}>
                    {dep.managerName}
                  </Button>
                </td>
                <td>
                  <div>
                    <ul>
                      {dep.employeeList.map((item, index) => {
                        return (
                          <li value={item._id} key={index}>
                            <Button onClick={() => handleEmployeeClick(item)}>
                              {item.firstName} {item.lastName}
                            </Button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Button onClick={() => navigate("/department", { state: {} })}>
        New Department
      </Button>
    </div>
  );
}

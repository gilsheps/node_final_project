import * as React from "react";
import { useNavigate } from "react-router-dom";
import { getEmployeeName } from "../../utils/utilsEmployee";
import {
  getDepartmentsList,
  getFullDepartmentsList,
} from "../../utils/utilsDepartment";
import { Button } from "@mui/material";

export default function DepartmentComp() {
  const [departmentsList, setDepartmentsList] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const { data } = await getDepartmentsList();
      const managerPromises = data.map(async (dep) => {
        const managerName = await getEmployeeName(dep.manager);
        return { ...dep, managerName }; // Return the updated department object
      });
      const updatedDepartments = await Promise.all(managerPromises);
      console.log("updatedDepartments", updatedDepartments);

      setDepartmentsList(updatedDepartments);
    };

    fetchData().catch(console.error);
  }, []);

  const handleNameClick = (department, index) => {
    console.log("handleNameClick", department, index);
  };
  const handleManagerClick = (department, index) => {
    console.log("handleManagerClick", department, index);
  };
  const getEmployeeNameForId = async (id) => {
    console.log("getEmployeeNameForId", id);
    return await getEmployeeName(id);
  };

  const getDepartmentsEmployee = async (depId) => {};
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
                  <Button onClick={() => handleNameClick(dep, index)}>
                    {dep.name}
                  </Button>
                </td>
                <td>
                  <Button onClick={() => handleManagerClick(dep, index)}>
                    {dep.managerName}
                  </Button>
                </td>
                <td>
                  <div>
                     getDepartmentsEmployee
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

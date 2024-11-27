import React from "react";
import { useState, useEffect } from "react";
import {getAllUsers} from "../../utils/utilsUsers"
import  {actions} from "../../actionsAllowed.json"

export default function UsersComp() {
  const [usersList, setUsersList] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getAllUsers()
      console.log(data)
      setUsersList(data)
    };

    fetchData().catch(console.error);
    console.log(actions)
  }, []);

  return (
    <div className="divCenter">
      <table border={1} className="center">
        <tbody>
          <tr>
            <th>User Full Name</th>
            <th>Max Actions Allowed</th>
            <th>Current Actions Allowed</th>
          </tr>
          {usersList.map((user, index) => {
            return (
              <tr key={index}>
                <td>
                  <div>{user.fullName}</div>
                </td>
                <td>
                  <div>
                    {user.actionsAllowed}
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

import React from "react";
import { useState, useEffect } from "react";
import { getAllUsers } from "../../utils/utilsUsers";
import { getActionsAllowedByUser } from "../../utils/actionsAllowed.js";

export default function UsersComp() {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    console.log("stop run twice!!!");
    const fetchData = async () => {
      const { data } = await getAllUsers();
      // console.log("dataaaa", data);
      const foo = data.map(async (user) => {
        const userData = await getActionsAllowedByUser(user._id)
        user.maxActions = 10;
        if (userData.data) {
          user.actionsAllowed = userData.data.actionAllowd;
        } else {
          user.actionsAllowed = 10;
        }
        return user;
      });

      const promi = await Promise.all(foo)
      setUsersList(promi)
      console.log("fooooo", promi);
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("usersListusersList", usersList);
  }, [usersList]);
  return (
    <div className="divCenter">
      <table border={1} className="center">
        <tbody>
          <tr>
            <th>User Full Name</th>
            <th>Max Actions Allowed</th>
            <th>Current Actions Allowed</th>
          </tr>
          {usersList?.map((user, index) => {
            return (
              <tr key={index}>
                <td>
                  <div>{user.fullName}</div>
                </td>
                <td>
                  <div>{user.maxActions}</div>
                </td>
                <td>
                  <div>
                    {/* {console.log("user._iduser._iduser._id", user._id)} */}
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

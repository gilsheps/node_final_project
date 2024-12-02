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
      // const arr = []
      setUsersList(data);
      data.map(async (user) => {
        const { data: userData } = await getActionsAllowedByUser(user._id);
        if (userData !== "undefined") {
          console.log("undefined",user,userData)
          setUsersList([{ ...data, actionsAllowed: userData.actionAllowd }])
        }
        // console.log("usersssss", user);
        // console.log('userData',userData)
      });
      //
      //   const { data: userData } = await getActionsAllowedByUser(user._id);
      //   if (data !== "undefined") {
      //     console.log("undefinedundefined");
      //     //   console.log("datatatat", data.actionAllowd);
      //     setUsersList([{ ...data, actionsAllowed: 0 }]);
      //   } else {
      //     setUsersList([
      //       { ...userData, actionsAllowed: userData.actionsAllowed },
      //     ]);
      //   }
        // console.log("userData", userData);
        console.log("user", usersList);
      //   // arr.push(updatedObject)
      //   // console.log("updatedObjectupdatedObject", updatedObject);
      // });
      // ;
      // console.log('arrrrrr',arr)
      // setUsersList(data);
    };
    fetchData();

    // getAllUsers().then((users) => {

    //   setUsersList(users.data);
    // });
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
          {usersList?.map((user, index) => {
            return (
              <tr key={index}>
                <td>
                  <div>{user.fullName}</div>
                </td>
                <td>
                  <div>{user.actionsAllowed}</div>
                </td>
                <td>
                  <div>
                    {/* {console.log("user._iduser._iduser._id", user._id)} */}
                    {user.actionAllowd}
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

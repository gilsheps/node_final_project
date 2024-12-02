import axios from "axios";
import * as React from "react";
import { getAllShifts ,sendUpdateShift} from "../../utils/utilsShifts";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

export default function ShiftsComp() {
  const [shifts, setShifts] = React.useState([]);
  const [editIndex, setEditIndex] = React.useState(null);
  const [date, setDate] = React.useState();
  const [startingHour, setStartingHour] = React.useState();
  const [endingHour, setEndingHour] = React.useState();

  React.useEffect(() => {
    getAllShifts().then((data) => {
      console.log("data", data.data);
      setShifts(data.data);
    });

    console.log("shifts", shifts);
    console.log("editIndex", editIndex);
  }, []);

  const hadleClick = (index) => {
    console.log("hadleClick", index);
    setEditIndex(index);
  };

  const hadleSaveClick = (index) => {
    setEditIndex(null);
    console.log("sdfsd", shifts[index]);
    sendUpdateShift(shifts[index])
  };

  const handleChange=(index, newProduct)=>{
    const updatedShifts = [...shifts];
    console.log("newProduct",updatedShifts[index],newProduct.target.id)
    updatedShifts[index][newProduct.target.id] = Number(newProduct.target.value);
    console.log('updatedShiftsss',updatedShifts)
    setShifts(updatedShifts)
    setEditIndex(index)
  }

  return (
    <div className="divCenter">
      <table border={1} className="center">
        <tbody>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Starting Hour</th>
            <th>Ending Hour</th>
          </tr>

          {shifts.map((shift, index) => {
            return (
              <tr key={index}>
                <td>{shift._id}</td>
                <td>
                  <input
                    disabled={editIndex !== index}
                    id='date'
                    defaultValue={shifts[index].date || shift.date}
                    onChange={(e) => handleChange(index, e)}
                  />
                </td>
                <td>
                  <input
                    disabled={editIndex !== index}
                    type="number"
                    id="starting_hour"
                    defaultValue={shifts[index].startingHour || shift.startingHour}
                    onChange={(e) => handleChange(index, e)}
                  />
                </td>
                <td>
                  <input
                    disabled={editIndex !== index}
                    type="number"
                    id="ending_hour"
                    defaultValue={shifts[index].endingHour || shift.endingHour}
                    onChange={(e) => handleChange(index, e)}
                  />
                </td>
                <td>
                  {editIndex === index ? (
                    <button onClick={() => hadleSaveClick(index)}>Save</button>
                  ) : (
                    <button onClick={() => hadleClick(index)}>Edit</button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

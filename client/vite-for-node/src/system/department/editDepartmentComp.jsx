import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function EditDepartmentComp() {
  const navigate = useNavigate();
  const { state } = useLocation();
  React.useEffect(() => {
    console.log('editDepartmentComp',state);
  });
  return (
    <div>
      editDepartmentComp
    </div>
  );
}

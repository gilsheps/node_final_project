import * as React from "react";
import { useNavigate  } from "react-router-dom";


export default function SignOutComp() {
  const navigate = useNavigate()
  React.useEffect(() => {
    localStorage.clear()
    navigate("/login")
  }, []);

  return (
    <div>
      <h1>SignOut</h1>
    </div>
  );
}

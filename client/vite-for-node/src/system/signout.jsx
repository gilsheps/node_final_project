import * as React from "react";
import { useNavigate } from "react-router";

export default function SignOutComp() {
  const navigate = useNavigate();
  React.useEffect(() => {
    // localStorage.removeItem('authToken');
    localStorage.clear();
    return navigate("/login");
  }, []);

  return (
    <div>
      <h1>SignOut</h1>
    </div>
  );
}

import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { axios } from "axios";
function UserDashboard() {
  let { userObj } = useSelector((state) => state.user);
  let [data, setData] = useState("");
  const getProtectedData = async () => {
    let token = localStorage.getItem("token");
    let response = await axios.get("/user/test", {
      headers: { Authorization: token },
    });
    setData(response.data.message);
  };

  return (
    <>
      <div className="display-4 text-center"> Welcome,{userObj.username}</div>
      <Button variant="danger" onClick={getProtectedData}>
        Get info
      </Button>
      <h1 className="text-center text-info">{data}</h1>
    </>
  );
}

export default UserDashboard;

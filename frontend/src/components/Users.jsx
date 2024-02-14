import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Users() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter).then(response => setUsers(response.data.user));
  }, [filter])

  return (
    <>
      <div>Users</div>
      <div className="my-2">
        <input onChange={(e) => setFilter(e.target.value)}
          type="text"
          placeholder="Search User..."
          className="border rounded w-full border-slate-200 px-2 py-1"
        ></input>
      </div>
      <div>
        {users.map((user) => <User user={user}></User>)}
      </div>
    </>
  );
}

function User({user}) {
  const navigate = useNavigate();

  return (
    <div className="justify-between flex">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 justify-center flex mr-2 mt-1">
          <div className="justify-center flex-col text-xl flex h-full">{user.firstName[0]}</div>
        </div>
        <div className="justify-center flex flex-col h-full">{user.firstName} {user.lastName}</div>
      </div>
      <div className="justify-center flex flex-col h-full">
        <Button onClick={(e) => {
          navigate("/send?id=" + user._id + "&name=" + user.firstName + "_" + user.lastName)
        }} label={"Send Money"}></Button>
      </div>
    </div>
  );
}

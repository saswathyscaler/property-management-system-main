import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaSimplybuilt } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
const port = 7000;

const UserWidget = () => {

     const [user, setUser] = useState({
       name: "",
       email: "",
     });


       const data = localStorage.getItem("token");
       console.log(data);

  const navigate = useNavigate();


    useEffect(() => {
      getAuthData();
      console.log("get auth data");
    }, []);

    const getAuthData = async () => {
      if (!data) {
        navigate("/login");
      } else {
        try {
          const responce = await fetch(
            `http://localhost:${port}/api/property`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `${data}`,
              },
              mode: "cors",
            }
          );
          const result = await responce.json();
          console.log(result);
          setUser(result);
        } catch (error) {}
      }
    };
//   const capName = username;
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="p-4 bg-blue-50 rounded-xl drop-shadow-md ">
      <div className="flex items-center justify-between gap-[1rem] pb-[1.1rem] ">
        <div className="flex items-center justify-between gap-[1rem] cursor-pointer">
            <FaSimplybuilt className=" h-[40px] w-[40px]" />
          <div>
            <div className="flex flex-col gap-3">
              <h3>{user.name}</h3>
            </div>
            <p className="font-normal text-sm text-[#074FB2]">@{user.email}</p>
          </div>
            <div>
              <BiLogOut onClick={logout} className="h-[20px] w-[20px]" />
            </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default UserWidget;

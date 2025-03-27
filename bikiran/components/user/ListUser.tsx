import React from "react";
import { userData } from "./constant";

const ListUser = () => {
  return (
    <div className="container mt-10">
      <h2 className="font-medium text-xl md:text-3xl">List Of User</h2>

      <div className="overflow-x-auto mt-5 border md:p-5 rounded-10">
        <table className="table-container table-fixed">
          <thead>
            <tr>
              <th className="!text-center w-[40px]">ID</th>
              <th className="text-left w-[100px]">User/Name</th>
              <th className="text-center w-[100px]">Domain</th>
              <th className="text-center w-[100px]">Status</th>
              <th className="text-center w-[150px]">Email</th>
              <th className="!text-center w-[50px]">#</th>
            </tr>
          </thead>
          <tbody>
            {/*  */}
            {userData.map((user, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="!text-center">{user.id}</td>
                <td className="text-left">{user.name}</td>
                <td className="text-center">{user.domain}</td>
                <td className="text-center">{user.status}</td>
                <td className="text-center">{user.email}</td>
                <td className="!text-center">
                  <button className="text-blue-500">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListUser;

import React from "react";
import { userData } from "./constant";

const ListUser = () => {
  return (
    <div className="container">
      <h2 className="text-primary text-2xl font-medium mt-5 mb-2">List of user</h2>
      <table
        cellPadding={0}
        cellSpacing={0}
        className="table-container table-fixed"
      >
        <thead>
          <tr>
            <th className="!text-center w-[100px]">ID</th>
            <th className="text-left w-[260px]">User/Name</th>

            <th className="text-center w-[250px]">Domain</th>
            <th className="text-center w-[100px]">Status</th>
            <th className="text-center w-[100px]">Email</th>

            {/* <th className="text-center w-32">Created on</th> */}
            <th className="!text-center w-[50px]">#</th>
          </tr>
        </thead>
        <tbody>
          {/*  */}
          {
            userData.map((user, index) => (

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
            ))
          }

        </tbody>
      </table>
    </div>
  );
};

export default ListUser;

import React, { FC, useEffect, useState } from "react";
import { useHostingList } from "./context/HostingListProvider";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { InputField } from "bik-inputs";
import { SelectField } from "@/bik-lib/lib/InputFields";
import { addOption } from "@/bik-lib/utils/option";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import FilterUser from "@/bikiran/shared/user-info/FilterUser";
import Image from "next/image";
import { TUser } from "@/bikiran/shared/user-search/UserSearchType";
import { Button } from "bik-button";
import { icons } from "@/bikiran/lib/icons";
import SelectedUserInfo from "@/bikiran/shared/user-info/SelectedUserInfo";

const HostingFilterFields: FC<{
  handleInputChange: (ev: TInputChangeEvent) => void;
  formData: { [key: string]: any };
  setFormData: (data: { [key: string]: any }) => void;
}> = ({ handleInputChange, formData }) => {
  const { status } = useHostingList();
  const [selectedUser, setSelectedUser] = useState<TUser>({} as TUser);

  useEffect(() => {
    if (selectedUser.id) {
      formData["userId"] = selectedUser.id;
    } else {
      delete formData["userId"];
    }
  }, [selectedUser]);

  return (
    <div className="space-y-4">
      {selectedUser.id ? (
        <SelectedUserInfo
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      ) : (
        <FilterUser
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      )}
      <InputField
        formData={formData}
        label={"Domain"}
        placeholder="example.com"
        name="domain"
        onChange={handleInputChange}
        parentClassName="filter-parent-class"
        className=" filter-inputs"
      />
      <SelectField
        formData={formData}
        label={"Package List"}
        name="packageList"
        placeholder="Select Package"
        onChange={handleInputChange}
        options={[]}
        parentClassName="filter-parent-class"
        className=" filter-inputs"
      />
      <InputField
        formData={formData}
        label={"Email or Phone"}
        placeholder="Email or Phone"
        name="emailOrPhone"
        onChange={handleInputChange}
        parentClassName="filter-parent-class"
        className=" filter-inputs"
      />
      <SelectField
        formData={formData}
        label={"Status"}
        name="status"
        onChange={handleInputChange}
        placeholder="Select Status"
        parentClassName="filter-parent-class"
        className=" filter-inputs"
        options={status.map((item) =>
          addOption(item, capitalizeFirstLetter(item), item)
        )}
      />
    </div>
  );
};

export default HostingFilterFields;

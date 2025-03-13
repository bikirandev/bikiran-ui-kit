"use client";
import React, { FC, useEffect, useState } from "react";
import { useCPanel } from "./context/CPanelProvider";
import TableHeaderWrapperComp from "@/bikiran/shared/table-header-wrapper/TableHeaderWrapperComp";
import { useRouter } from "next/navigation";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { FilterBarWrapper } from "bik-utils";
import { InputField } from "bik-inputs";
import { SelectField } from "@/bik-lib/lib/InputFields";
import { addOption } from "@/bik-lib/utils/option";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { TUser } from "@/bikiran/shared/user-search/UserSearchType";
import SelectedUserInfo from "@/bikiran/shared/user-info/SelectedUserInfo";
import FilterUser from "@/bikiran/shared/user-info/FilterUser";

const CPanelHeaderSection: FC = () => {
  const { reload, loading } = useCPanel();
  const status = ["active", "inactive", "suspended"];
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const router = useRouter();
  const handleInputChange = (ev: TInputChangeEvent) => {
    const { name, value } = ev.target;
    setFormData({ ...formData, [name]: value });
  };
  const [selectedUser, setSelectedUser] = useState<TUser>({} as TUser);

  useEffect(() => {
    if (selectedUser.id) {
      formData["user"] = selectedUser.displayName;
    } else {
      delete formData["user"];
    }
  }, [selectedUser]);

  const handleSearch = (search: string) => {
    router.push(`${search}`);
  };
  return (
    <TableHeaderWrapperComp
      loading={loading}
      reload={reload}
      title="cPanels List"
      // btnTitle="+ Create cPanels"
      // modalType="create-cPanels"
    >
      <FilterBarWrapper formData={formData} onSearch={handleSearch}>
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
          label={"Subscription Id"}
          placeholder="Example: 123456"
          name="subscriptionId"
          onChange={handleInputChange}
           parentClassName="filter-parent-class"
          className=" filter-inputs"
        />
        <InputField
          formData={formData}
          label={"Domain"}
          placeholder="example.com"
          name="domain"
          onChange={handleInputChange}
           parentClassName="filter-parent-class"
          className=" filter-inputs"
        />{" "}
        <InputField
          formData={formData}
          label={"Email Or Phone"}
          placeholder="Ex: y@gmail.com or 1234567890"
          name="domain"
          onChange={handleInputChange}
           parentClassName="filter-parent-class"
          className=" filter-inputs"
        />
        <InputField
          formData={formData}
          label={"Hostname"}
          placeholder="example.com"
          name="hostname"
          onChange={handleInputChange}
           parentClassName="filter-parent-class"
          className=" filter-inputs"
        />
        <InputField
          formData={formData}
          label={"cP Username"}
          placeholder="bik.com"
          name="cPUsername"
          onChange={handleInputChange}
           parentClassName="filter-parent-class"
          className=" filter-inputs"
        />
        <SelectField
          formData={formData}
          label={"Status"}
          name="status"
          onChange={handleInputChange}
           parentClassName="filter-parent-class"
          className=" filter-inputs"
          options={status.map((item) =>
            addOption(item, capitalizeFirstLetter(item), item)
          )}
          placeholder="Select Status"
        />
      </FilterBarWrapper>
    </TableHeaderWrapperComp>
  );
};

export default CPanelHeaderSection;

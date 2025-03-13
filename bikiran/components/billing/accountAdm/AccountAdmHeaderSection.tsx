import React, { useState } from "react";
import { useAccountAdmContext } from "./context/AccountAdmProvider";
import TableHeaderWrapperComp from "@/bikiran/shared/table-header-wrapper/TableHeaderWrapperComp";
import { FilterBarWrapper } from "bik-utils";
import { useRouter } from "next/navigation";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import AccountFilterFields from "./AccountFilterFields";
import dayjs from "dayjs";

const AccountAdmHeaderSection = () => {
  const { reFetch, reFetching } = useAccountAdmContext();
  const [formData, setFormData] = useState<{ [key: string]: any }>({
    dateFrom: dayjs().subtract(1, "month").format("YYYY-MM-DD"),
  });
  const router = useRouter();
  const handleInputChange = (ev: TInputChangeEvent) => {
    const { name, value } = ev.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSearch = (search: string) => {
    router.push(`${search}`);
  };

  return (
    <TableHeaderWrapperComp
      loading={reFetching}
      title="Billing Account"
      reload={reFetch}
      // btnTitle="+ Add"
      // modalType="add"
    >
      <FilterBarWrapper
        formData={formData}
        onSearch={handleSearch}
        overflow="overflow-visible"
      >
        <AccountFilterFields
          formData={formData}
          setFormData={setFormData}
          handleInputChange={handleInputChange}
        />
      </FilterBarWrapper>
    </TableHeaderWrapperComp>
  );
};

export default AccountAdmHeaderSection;

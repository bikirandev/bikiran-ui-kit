"use client";
import React, { useState } from "react";
import { useTransaction } from "./context/TransactionProvider";
import { TFilterField } from "@/bik-lib/features/filter-bar/filterBarTypes";
import TableHeaderWrapperComp from "@/bikiran/shared/table-header-wrapper/TableHeaderWrapperComp";
import { FilterBarWrapper } from "bik-utils";
import { InputField } from "bik-inputs";
import { useRouter } from "next/navigation";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { SelectField } from "@/bik-lib/lib/InputFields";
import { addOption } from "@/bik-lib/utils/option";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";

const TransactionHeaderSection: React.FC = () => {
  const { reFetching, refetchTransactionData } = useTransaction();
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const status = ["pending", "completed", "failed", "cancelled"];
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
      reload={refetchTransactionData}
      title="Transaction manage"
      // btnTitle="+ Create New Invoice"
      // modalType="create-invoice"
    >
      <FilterBarWrapper formData={formData} onSearch={handleSearch}>
        <InputField
          formData={formData}
          label={"Invoice ID"}
          name="invoiceId"
          placeholder="Ex: 123456"
          onChange={handleInputChange}
           parentClassName="filter-parent-class"
          className="filter-inputs"
        />
        <InputField
          formData={formData}
          label={"Type"}
          name="type"
          placeholder="Ex: Invoice"
          onChange={handleInputChange}
           parentClassName="filter-parent-class"
          className="filter-inputs"
        />
        <SelectField
          formData={formData}
          label={"Status"}
          name="status"
           parentClassName="filter-parent-class"
          options={status.map((item) =>
            addOption(item, capitalizeFirstLetter(item), item)
          )}
          onChange={handleInputChange}
          placeholder="Select Status"
          className="filter-inputs"
        />
      </FilterBarWrapper>
    </TableHeaderWrapperComp>
  );
};

export default TransactionHeaderSection;

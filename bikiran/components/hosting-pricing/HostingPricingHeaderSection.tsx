"use client";
import { SelectField } from "@/bik-lib/lib/InputFields";
import { useHosting } from "./context/HostingPricingProvider";
import TableHeaderWrapperComp from "@/bikiran/shared/table-header-wrapper/TableHeaderWrapperComp";
import { FilterBarWrapper } from "bik-utils";
import { addOption } from "@/bik-lib/utils/option";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import RangeInputField from "../domain-pricing/RangeInput";

const HostingPricingHeaderSection: React.FC = () => {
  const { reload, loading, hostingPriceData } = useHosting();
  const typeOptions = hostingPriceData.subTypes;
  const status = hostingPriceData.status;
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
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
      loading={loading}
      reload={reload}
      title="Hosting Package"
      btnTitle="+ Create New Package"
      modalType="create-hosting-package"
    >
      <FilterBarWrapper
        formData={formData}
        onSearch={handleSearch}
        overflow="overflow-visible"
      >
        <RangeInputField
          formData={formData}
          label="Disk"
          content="Disk Range"
          fromField="diskFrom"
          toField="diskTo"
          onChange={handleInputChange}
          classname="filter-inputs"
        />
        <RangeInputField
          label="CPU"
          content="CPU Range"
          formData={formData}
          fromField="cpuFrom"
          toField="cpuTo"
          onChange={handleInputChange}
          classname="filter-inputs"
        />
        <RangeInputField
          formData={formData}
          label="RAM"
          content="RAM Range"
          fromField="ramFrom"
          toField="ramTo"
          onChange={handleInputChange}
          classname="filter-inputs"
        />
        <SelectField
          formData={formData}
          label={"Type"}
          name="type"
          onChange={handleInputChange}
          options={typeOptions.map((item) => addOption(item, item, item))}
          placeholder="Select Type"
          parentClassName="filter-parent-class"
          className="filter-inputs"
        />
        <SelectField
          formData={formData}
          label={"Status"}
          name="status"
          onChange={handleInputChange}
          parentClassName="filter-parent-class"
          options={status.map((item) =>
            addOption(item, capitalizeFirstLetter(item), item)
          )}
          placeholder="Select Status"
          className="filter-inputs"
        />
      </FilterBarWrapper>
    </TableHeaderWrapperComp>
  );
};

export default HostingPricingHeaderSection;

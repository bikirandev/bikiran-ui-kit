import { FC, useState } from "react";
import { useEnConfig } from "./context/EnConfigProvider";
import { ButtonRefresh } from "@/bik-lib/lib/button";
import { SelectField } from "@/bik-lib/lib/InputFields";
import { addOption } from "@/bik-lib/utils/option";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { useRouter } from "next/navigation";
import { useApi } from "@/bik-lib/context/api/ApiProvider";

const EnConfigHeader: FC<{ query: Record<string, any> }> = ({ query }) => {
  const { filters } = useEnConfig();
  const { reload } = useApi();

  const updatedQuery = { type: query.type || "auth" };
  const [formData, setFormData] = useState<{ type: string }>(updatedQuery);

  const router = useRouter();

  const handleOnChange = (ev: TInputChangeEvent) => {
    const { name, value } = ev.target;
    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value }));
      router.push(`/en/configuration?type=${value}`);
    }
  };

  return (
    <section className="flex justify-between items-center mb-4">
      <div>
        <h2 className="text-primary text-xl font-medium">
          Email Notification Configuration
        </h2>
      </div>

      <div className="flex items-center gap-2 [&>div>div]:mt-0">
        <SelectField
          label=""
          name="type"
          placeholder="Select Type"
          className="w-56 h-10"
          options={
            filters?.type?.map((option) =>
              addOption(option, capitalizeFirstLetter(option), option)
            ) || []
          }
          formData={formData}
          onChange={handleOnChange}
        />
        <ButtonRefresh className="size-10" onClick={reload} />
      </div>
    </section>
  );
};

export default EnConfigHeader;

import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { ButtonRefresh } from "@/bik-lib/lib/button";
import { Button } from "bik-button";
import React, { FC, useState } from "react";

type TableHeaderWrapperProps = {
  title: string;
  children?: React.ReactNode;
  loading: boolean;
  reload: () => void;
  btnTitle?: string;
  modalType?: string;
};

const TableHeaderWrapperComp: FC<TableHeaderWrapperProps> = ({
  title,
  loading,
  reload,
  btnTitle,
  modalType,
  children,
}) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const { openModal } = useTemplate();

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-2.5 mb-4">
        <div className="flex items-center gap-x-8 gap-y-2 flex-1">
          <h2 className="text-2xl  font-medium whitespace-nowrap">{title}</h2>
          {children && <div className="w-full max-w-[700px]">{children}</div>}
        </div>
        <div className="flex items-stretch gap-2">
          {reload && (
            <div className="h-10">
              <ButtonRefresh disabled={loading} onClick={reload} />
            </div>
          )}
          {btnTitle && (
            <Button
              variant="secondary"
              className="px-4 h-10 text-sm"
              disabled={loading}
              onClick={() => openModal(modalType || "")}
            >
              {btnTitle}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableHeaderWrapperComp;

import { Button } from "bik-button";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { FC } from "react";
import { SIZE_MD, SIZE_XS } from "@/bik-lib/context/LayoutProvider";
import { useApi } from "@/bik-lib/context/api/ApiProvider";
import catchAsync from "@/bik-lib/context/api/catchAsync";

export const DEVICE_SIZES = [
  { name: "Desktop", width: 0 },
  { name: "Tablet", width: SIZE_MD }, // 768
  { name: "Mobile", width: SIZE_XS }, // 475
];

const TemplatePreviewComp: FC<{
  device: number;
  code: string;
  selectDevice: (width: number) => void;
}> = ({ selectDevice, device, code }) => {
  const { setMessage, modalData, closeModal } = useTemplate();

  const { put, reload, startLoading, loading } = useApi();

  const key = modalData?.key || "";
  const updateTemplate = catchAsync(async () => {
    startLoading();
    setMessage("Updating template...");
    const { message } = await put(
      `/admin/notification/email/config/${key}/update-html-template`,
      {
        html: code,
      }
    );
    setMessage(message);
    closeModal();
    reload();
  });

  return (
    <div className="p-4 flex flex-col h-full">
      {/* Device Selection */}
      <div className="flex justify-between gap-2 mb-2">
        <div className="flex gap-2">
          {DEVICE_SIZES.map((d) => (
            <button
              key={d.name}
              onClick={() => selectDevice(d.width)}
              className={`px-3 py-1 text-sm rounded ${
                (Math.floor(device) > SIZE_MD && d.width === 0) ||
                Math.floor(device) === d.width
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {d.name}
            </button>
          ))}
        </div>

        <div>
          <Button
            variant="secondary"
            title="Update Template"
            loading={loading}
            onClick={updateTemplate}
          />
        </div>
      </div>

      {/* Preview Iframe */}
      <div className="border border-gray-300 shadow-lg bg-white mx-auto w-full h-full pr-[0.5px]">
        <iframe srcDoc={code} className="w-full h-full" />
      </div>
    </div>
  );
};

export default TemplatePreviewComp;

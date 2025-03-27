import { useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { InputDate, InputField } from "@/bik-lib/lib/Input";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import Button from "@/bik-lib/lib/button";

export const ModalForm = () => {
  const { modalType, closeModal } = useTemplate();

  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev: any) => {
        return { ...prev, [name]: value ? value : "" };
      });
    }
  };
  return (
    <Dialog open={modalType === "create-user"} onOpenChange={closeModal}>
      <DialogTrigger></DialogTrigger>
      <DialogContent aria-describedby={undefined} className="bg-slate-900">
        <DialogHeader>
          <DialogTitle className="text-white">Edit Profile</DialogTitle>
        </DialogHeader>
        <DialogBody>
          {/* <ModalContent setMessage={setMessage} closeModal={closeModal} /> */}
          <div className="mt-5 grid gap-3">
            <div className="grid gap-2 md:flex md:gap-8">
              <InputField
                label="First Name"
                name="first name"
                formData={formData}
                onChange={handleChange}
                placeholder="Enter Your First Name"
              />
              <InputField
                label="Last Name"
                name="last name"
                formData={formData}
                onChange={handleChange}
                placeholder="Enter Your Last Name"
              />
            </div>
            <div className="grid gap-2 md:flex md:gap-8">
              <InputField
                label="Email Address"
                name="email"
                formData={formData}
                onChange={handleChange}
                placeholder="Email"
              />
              <InputField
                label="Phone Number"
                name="phone"
                formData={formData}
                onChange={handleChange}
                placeholder="Phone"
              />
            </div>
            <div>
              <InputField
                label="Address"
                name="address"
                formData={formData}
                onChange={handleChange}
                placeholder="Address"
              />
            </div>
            <div className="grid gap-2 md:flex md:gap-8">
              <InputField
                label="City"
                name="name"
                formData={formData}
                onChange={handleChange}
                placeholder="Enter Your Name"
              />

              <InputDate
                label="Date of Birth"
                name="schedule"
                type="datetime-local"
                formData={formData}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-end pt-6">
              <Button title={"update"} className="!bg-success" />
            </div>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

"use client";
import React, { useState } from "react";
import { overviewData } from "./constant";
import Image from "next/image";
import Button from "@/bik-lib/lib/button";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { InputDate, InputField } from "@/bik-lib/lib/Input";
import { InputTextareaField } from "@/bik-lib/lib/InputFields";
import { icons } from "@/bikiran/lib/icons";

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
      <DialogTrigger>
        <h2>user</h2>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className="bg-slate-900">
        <DialogHeader>
          <DialogTitle className="text-white">Edit Profile</DialogTitle>
        </DialogHeader>
        <DialogBody>
          {/* <ModalContent setMessage={setMessage} closeModal={closeModal} /> */}
          <div className="mt-5 grid gap-3">
            <div className="md:flex gap-8">
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
            <div className="md:flex gap-8">
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
            <div className="md:flex gap-8">
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

const UserInfoTableComp = () => {
  const { openModal } = useTemplate();

  return (
    <section>
      <div className="border border-[#FFFFFF]/10 rounded-20 mt-5 px-3 md:px-7.5 py-5 bg-[#19181F]">
        <div>
          <p className="font-medium text-xl">
            User Info Table <span className="text-[#14B9FF]"> #</span>
          </p>
          <p className="text-sm text-[#F3F4F6]/70 mt-1 text-justify">
            Form controls are styled with a mix of Sass and CSS variables,
            allowing them to adapt to color modes and support any customization
            method.
          </p>
        </div>

        <div className="overflow-x-auto mt-4 rounded-10">
          <table className="table-container-variant w-full">
            <thead>
              <tr>
                <th className="!text-center w-[50px]">User Id</th>
                <th className="text-center w-[150px]">User Info</th>
                <th className="text-center w-[150px]">Phone</th>
                <th className="text-center w-[150px]">Organization</th>
                <th className="text-center w-[150px]">Action</th>
              </tr>
            </thead>

            <tbody>
              {overviewData.map((user, index) => (
                <tr
                  key={index}
                  className={`${
                    user.id === 1
                      ? "bg-light"
                      : user.id === 2
                        ? "bg-[#ffff]/10"
                        : user.id === 3
                          ? "bg-light"
                          : user.id === 4
                            ? "bg-[#ffff]/10"
                            : user.id === 5
                              ? "bg-light"
                              : user.id === 6
                                ? "bg-[#ffff]/10"
                                : "bg-gray-500"
                  } text-white`}
                >
                  <td className="!text-center">{user.id}</td>
                  <td className="text-center">
                    <div className="flex gap-1 items-center">
                      <div>
                        <Image
                          src={user.image}
                          alt="alt"
                          width={0}
                          height={0}
                          sizes="100vw"
                          className="w-[30px] h-auto opacity-100 group-hover:opacity-0 transition-all duration-500"
                        />
                      </div>
                      <div>
                        {user.firstName} {user.lastName} <br />
                        <span className="text-pink">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">{user.phone}</td>
                  <td className="text-center">{user.organization}</td>
                  <td>
                    <div
                      className="px-4 h-10 text-sm flex justify-center"
                      onClick={() => openModal("create-user")}
                    >
                      <Image
                        src={icons.iconAction}
                        alt="alt"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-[30px] h-auto opacity-100 group-hover:opacity-0 transition-all duration-500"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ModalForm />
        </div>

        <div className="border border-[#FFFFFF]/10 mt-8 rounded-15">
          <div className="flex justify-between bg-[#1F1E25] border-b rounded-t-15 border-[#FFFFFF]/10 px-5 py-3">
            <p>HTML</p>
            <button className="border border-[#12C55C] px-2.5 py-1 rounded-8 hover:bg-[#12C55C]">
              Copy
            </button>
          </div>
          <div className="h-[280px] overflow-y-scroll custom-scrollbar px-5 py-3 flex gap-10">
            <code>
              <span className="text-secondary">{`<tr className="bg-secondary">`}</span>{" "}
              <br />
              <span className="text-primary-700">{`<tr className="bg-primary-700">`}</span>{" "}
              <br />
              <span className="text-success">{`<tr className="bg-success">`}</span>{" "}
              <br />
              <span className="text-info">{`<tr className="bg-info">`}</span>{" "}
              <br />{" "}
              <span className="text-pink">{`<tr className="bg-pink">`}</span>{" "}
              <br />
              <span className="text-royalBlue">{`<tr className="bg-royalBlue">`}</span>{" "}
              <br />
              <span className="text-orange">{`<tr className="bg-orange">`}</span>{" "}
              <br />
              <span className="text-warning">{`<tr className="bg-success">`}</span>{" "}
              <br />
            </code>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="bg-[#FFDC5D]/5 rounded-10 px-5 py-4.5 mt-6 border-l-2 border-[#FFDC5D]">
          <p className="text-base text-[#44CAB3]">
            Accessibility tip: Using color to add meaning only provides a visual
            indication, which will not be conveyed to users of assistive
            technologies like screen readers. Please ensure the meaning is
            obvious from the content itself (e.g., the visible text with
            a sufficient color contrast) or is included through alternative
            means, such as additional text hidden with
            the .visually-hidden class.
          </p>
        </div>
      </div>
    </section>
  );
};

export default UserInfoTableComp;

// import React, { FC, useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogBody,
// } from "@/bikiran/components/ui/dialog";
// import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
// import { TInputChangeEvent } from "@/bik-lib/types/event";
// import UserDetailsComp from "@/bikiran/shared/user-search/UserDetailsComp";
// import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
// import { showInt } from "@/bik-lib/utils/show";
// import {
//   ApiCreateDebitNote,
//   ApiGetDebitNoteInfo,
// } from "../AccountAdmOperation";
// import { TDebitCredit } from "../AccountAdmTypes";
// import { AnimatedTextArea, InputField } from "bik-inputs";
// import { Button } from "bik-button";
// import UserSkeletonComp from "@/bikiran/shared/user-search/UserSkeletonComp";
// import { Skeleton } from "@/bikiran/components/ui/skeleton";

// type TProps = {
//   closeModal: () => void;
//   modalData: any;
//   setMessage: (message: string) => void;
// };

// const initialValue: TDebitCredit = {
//   user: {
//     id: 0,
//     displayName: "",
//     email: "",
//     phone: "",
//     photoUrl: "",
//     status: "",
//     userProfile: "",
//     primaryIds: [],
//     primaryProjectId: 0,
//   },
//   fac: {
//     facId: 0,
//     facType: "",
//     credit: 0,
//     debit: 0,
//     balance: 0,
//     currency: "",
//   },
// };

// const ModalContent: FC<TProps> = ({ closeModal, modalData, setMessage }) => {
//   const [loading, setLoading] = useState<boolean>(false);
//   const [userFetching, setUserFetching] = useState<boolean>(false);
//   const [formData, setFormData] = useState<{
//     amount: number;
//     note: string;
//   }>({
//     amount: 0,
//     note: "",
//   });
//   const { authInfo } = useAuth2();
//   const [data, setData] = useState<{
//     creditSide: TDebitCredit;
//     debitSide: TDebitCredit;
//   }>({
//     creditSide: initialValue,
//     debitSide: initialValue,
//   });

//   useEffect(() => {
//     setUserFetching(true);
//     ApiGetDebitNoteInfo(authInfo, modalData.id)
//       .then(({ data }) => {
//         setData(data);
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//       .finally(() => {
//         setUserFetching(false);
//       });
//   }, []);

//   const creditSide = data.creditSide;
//   const debitSide = data.debitSide;

//   const handleOnChange = (e: TInputChangeEvent) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const operatorNewBalance =
//     Number(debitSide.fac.balance) - Number(formData.amount);
//   const userNewBalance =
//     Number(creditSide.fac.balance) + Number(formData.amount);

//   const handleSubmit = () => {
//     const payload = {
//       creditAccountId: creditSide.fac.facId,
//       amount: formData.amount,
//       note: formData.note,
//     };
//     setLoading(true);
//     ApiCreateDebitNote(authInfo, debitSide.fac.facId, payload)
//       .then(({ message }) => {
//         closeModal();
//         if (message) {
//           setMessage(message);
//         }
//       })
//       .catch((err: Error) => {
//         setMessage(err.message);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   return (
//     <div className="space-y-4">
//       <div className="flex item-center gap-[6px]">
//         <div className="w-full space-y-[5px] pr-3">
//           {userFetching ? (
//             <UserSkeletonComp className="py-3" />
//           ) : (
//             <UserDetailsComp data={debitSide.user} className="px-0" />
//           )}
//           <div className="space-y-[5px]">
//             <div className="flex justify-between items-center text-sm font-medium py-[8px]">
//               <div className="text-primary-700">AC Number</div>
//               <div className="text-primary">
//                 {userFetching ? (
//                   <Skeleton className="h-4 w-24" />
//                 ) : (
//                   debitSide.fac.facId
//                 )}
//               </div>
//             </div>
//             <div className="flex justify-between items-center text-sm font-medium py-[8px]">
//               <div className="text-primary-700">AC Type</div>
//               <div className="text-primary">
//                 {userFetching ? (
//                   <Skeleton className="h-4 w-24" />
//                 ) : (
//                   <span>{debitSide.fac.facType}</span>
//                 )}
//               </div>
//             </div>
//             <div className="flex justify-between items-center text-sm font-medium py-[8px]">
//               <div className="text-primary-700">Balance</div>
//               <div className="text-primary">
//                 {userFetching ? (
//                   <Skeleton className="h-4 w-24" />
//                 ) : (
//                   <span>
//                     {debitSide.fac.currency} {showInt(debitSide.fac.balance)}
//                   </span>
//                 )}
//               </div>
//             </div>
//             <div className="flex justify-between items-center text-sm font-medium">
//               <div className="text-primary-700">Amount</div>
//               <div className="">
//                 <InputField
//                   formData={formData}
//                   label=""
//                   name="amount"
//                   onChange={handleOnChange}
//                   className="!w-32 !h-9 text-sm text-end"
//                 />
//               </div>
//             </div>
//             <div className="flex justify-between items-center text-sm font-medium">
//               <div className="text-primary-700">New Balance</div>
//               <div className="text-primary mt-2.5">
//                 {userFetching ? (
//                   <Skeleton className="h-4 w-24" />
//                 ) : (
//                   <span>{showInt(operatorNewBalance)}</span>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="h-auto w-1 bg-primary-100"> </div>
//         <div className="w-full space-y-[5px] pl-3">
//           {userFetching ? (
//             <UserSkeletonComp className="py-3" />
//           ) : (
//             <UserDetailsComp data={creditSide.user} className="px-0" />
//           )}
//           <div className="space-y-[5px]">
//             <div className="flex justify-between items-center text-sm font-medium py-[8px]">
//               <div className="text-primary-700">AC Number</div>
//               <div className="text-primary">
//                 {userFetching ? (
//                   <Skeleton className="h-4 w-24" />
//                 ) : (
//                   creditSide.fac.facId
//                 )}
//               </div>
//             </div>
//             <div className="flex justify-between items-center text-sm font-medium py-[8px]">
//               <div className="text-primary-700">AC Type</div>
//               <div className="text-primary">
//                 {userFetching ? (
//                   <Skeleton className="h-4 w-24" />
//                 ) : (
//                   <span>{creditSide.fac.facType}</span>
//                 )}
//               </div>
//             </div>
//             <div className="flex justify-between items-center text-sm font-medium py-[8px]">
//               <div className="text-primary-700">Balance</div>
//               <div className="text-primary">
//                 {userFetching ? (
//                   <Skeleton className="h-4 w-24" />
//                 ) : (
//                   <span>
//                     {creditSide.fac.currency} {showInt(creditSide.fac.balance)}
//                   </span>
//                 )}
//               </div>
//             </div>
//             <div className="flex justify-between items-center text-sm font-medium pt-[5px] pb-[8px]">
//               <div className="text-primary-700">Amount</div>
//               <div className="w-32 h-9 text-sm bg-secondary-50 !font-normal text-secondary text-center justify-center flex items-center rounded-8">
//                 {formData.amount > 0 ? (
//                   <span> + {formData.amount}</span>
//                 ) : (
//                   <span>+ 0</span>
//                 )}
//               </div>
//             </div>
//             <div className="flex justify-between items-center text-sm font-medium">
//               <div className="text-primary-700">New Balance</div>
//               <div className="text-primary">
//                 {userFetching ? (
//                   <Skeleton className="h-4 w-24" />
//                 ) : (
//                   <span>{showInt(userNewBalance)}</span>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="w-full flex justify-start gap-[76px]">
//         <div className="text-primary-700 text-sm font-medium">
//           Note<span className="text-error">*</span>
//         </div>
//         <AnimatedTextArea
//           formData={formData}
//           label="Please Write a Reason"
//           name="note"
//           onChange={handleOnChange}
//           className="!h-18 !w-[491px]"
//         />
//       </div>
//       <div className="flex justify-end gap-2.5">
//         <Button
//           variant="gray"
//           className="w-24 h-10"
//           disabled={loading}
//           onClick={closeModal}
//         >
//           Cancel
//         </Button>
//         <Button
//           variant="secondary"
//           className="w-24 h-10"
//           loading={loading}
//           onClick={handleSubmit}
//           disabled={userFetching}
//         >
//           Transfer
//         </Button>
//       </div>
//     </div>
//   );
// };

// const ModalDebit = () => {
//   const { closeModal, modalType, modalData, setMessage } = useTemplate();
//   return (
//     <Dialog open={modalType === "debit-note"} onOpenChange={closeModal}>
//       <DialogContent aria-describedby={undefined} className="!max-w-[650px]">
//         <DialogHeader>
//           <DialogTitle>Debit Note</DialogTitle>
//         </DialogHeader>
//         <DialogBody className="w-auto  min-h-1">
//           <ModalContent
//             closeModal={closeModal}
//             modalData={modalData}
//             setMessage={setMessage}
//           />
//         </DialogBody>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ModalDebit;

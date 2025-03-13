"use client";
import React, { FC } from "react";
import PaymentMethodProvider from "./context/PaymentMethodProvider";
import PaymentMethodHeader from "./PaymentMethodHeader";
import PaymentMethodTable from "./PaymentMethodTable";
import ModalAddPaymentMethod from "./modals/ModalAddPaymentMethod";
import ModalChangeIcon from "./modals/ModalChangeIcon";
import ModalUpdateInformation from "./modals/ModalUpdateInformation";

const PaymentMethodsPage: FC<{ query: Record<string, any> }> = ({ query }) => {
  return (
    <PaymentMethodProvider query={query}>
      <PaymentMethodHeader />
      <PaymentMethodTable />

      {/* modals  */}
      <ModalAddPaymentMethod />
      <ModalChangeIcon />
      <ModalUpdateInformation />
    </PaymentMethodProvider>
  );
};

export default PaymentMethodsPage;

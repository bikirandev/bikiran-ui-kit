import React, { FC, useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import { motion } from "motion/react";
import { useClientInfo } from "./context/ClientInfoProvider";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { ApiReorderApplication } from "../manage-application/ApplicationApiOperation";
import ClientInfoTableRowComp from "./ClientInfoTableRowComp";
import ClientInfoSkeletonComp from "./ClientInfoSkeletonComp";
import { cn } from "@/bik-lib/utils/cn";
import { TClientData } from "./ClientInfoTypes";
import { Button } from "bik-button";

type TProps = {
  data: TClientData[];
};

const ClientTableBody: FC<TProps> = ({ data = [] }) => {
  const { loading, reFetch } = useClientInfo();
  const [items, setItems] = useState(data);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isReordered, setIsReordered] = useState(false);
  const { authInfo } = useAuth2();
  const { setMessage } = useTemplate();

  useEffect(() => {
    if (data.length !== 0) {
      setItems(data);
    }
  }, [data, loading]);

  useEffect(() => {
    if (!isDragging) {
      // compare array items with data items to check if the order has changed or not
      const isSameOrder = items.every(
        (item, index) => item.id === data[index]?.id
      );
      setIsReordered(!isSameOrder);
    }
  }, [items, isDragging, data]);
  const handleSaveReorder = () => {
    if (isReordered) {
      setIsLoading(true);
      const priorityArr = items.map((item) => item.id);
      //TODO : this api  need to  be changed
      ApiReorderApplication(authInfo, { priorityArr })
        .then(({ message }) => {
          setIsLoading(false);
          reFetch();
          setIsReordered(false);
          setMessage(message);
        })
        .catch((ex: Error) => {
          setIsLoading(false);
          setMessage(ex.message);
        });
    }
  };

  const placeHolderArr = items.length
    ? items.map((_, index) => index + 1)
    : [1, 2, 3];
  return (
    <Reorder.Group axis="y" values={items} onReorder={setItems}>
      <motion.div>
        {loading &&
          placeHolderArr.map((i) => <ClientInfoSkeletonComp key={i} />)}
        {!loading &&
          items.map((data) => (
            <ClientInfoTableRowComp
              key={data.id}
              item={data}
              isDragging={isDragging}
              setIsDragging={setIsDragging}
            />
          ))}
        <div
          className={cn("w-full mt-10 flex gap-2 opacity-0 invisible", {
            "opacity-100 visible": isReordered,
          })}
        >
          <Button
            title="Save Re-order"
            onClick={() => handleSaveReorder()}
            loading={isLoading}
          />
          <Button
            variant="red"
            title={"Close"}
            onClick={() => setItems([...data])}
          />
        </div>
      </motion.div>
    </Reorder.Group>
  );
};

export default ClientTableBody;

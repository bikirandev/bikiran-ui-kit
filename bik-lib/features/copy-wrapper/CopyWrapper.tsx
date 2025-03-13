import Copy from "@/bik-lib/utils/Copy";
import { icons } from "@/bikiran/lib/icons";
import Image from "next/image";
import React, { FC } from "react";

const CopyWrapper: FC<{ content: any }> = ({ content }) => {
  const { copy, isCopied } = Copy();
  return (
    <button
      className="flex items-center gap-1 group"
      onClick={() => copy(content)}
    >
      <div className="text-sm">{content}</div>
      {isCopied ? (
        <Image
          src={icons.iconTick}
          alt="copy"
          width={100}
          height={100}
          sizes="100vw"
          className="size-4 "
        />
      ) : (
        <Image
          src={icons.iconCopy}
          alt="copy"
          width={100}
          height={100}
          sizes="100vw"
          className="size-4 hidden group-hover:block"
        />
      )}
    </button>
  );
};

export default CopyWrapper;

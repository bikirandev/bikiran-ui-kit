"use client";
import {
  TRenewData,
  TRenewProduct,
  TRenewProductPayload,
} from "./renewProductTypes";
import { useRouter } from "next/navigation";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { getBikiranUrl } from "@/bik-lib/utils/Env";
import { initialRenewData } from "./renewProductConstants";
import { FC, useEffect, useState } from "react";
import { showCurrencySign, showInt } from "@/bik-lib/utils/show";
import { ApiCreateRenewInvoice, ApiLoadRenewData } from "./RenewOperation";
import ProductNotFoundSection from "./ProductNotFoundSection";
import RenewProductComp from "./RenewProductComp";
import ProductRenewHeaderSection from "./ProductRenewHeaderSection";
import ProductRenewSkeletonSection from "./ProductRenewSkeletonSection";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { Button } from "bik-button";

type TRenewApiQuery = {
  subscriptionId: number;
  asset: string;
  currency?: string;
};

const ProductCalculation: FC<{
  subTotal: number;
  selectedData: number;
  currency: string;
}> = ({ subTotal, selectedData, currency }) => {
  return (
    <div className="flex items-center justify-end gap-7 text-primary text-base font-medium mt-4 mb-5">
      <span>Subtotal ({selectedData} Items )</span>{" "}
      <span>
        {showCurrencySign(currency)}
        {showInt(subTotal)}
      </span>
    </div>
  );
};

const RecommendedProducts: FC<{
  data: TRenewProduct[];
  selectProduct: (data: TRenewProduct) => void;
  selectedData: TRenewProduct[];
}> = ({ data, selectProduct, selectedData }) => {
  return (
    <div>
      <h2 className="text-primary font-medium mt-2.5 mb-2">Recommended</h2>
      <div className="sm:border border-y border-[#E0C1FF] sm:rounded-[13px]">
        {data?.map((item: TRenewProduct) => {
          return (
            <RenewProductComp
              key={item.subscriptionId}
              data={item}
              setSelectedData={() => selectProduct(item)}
              selectedData={selectedData}
            />
          );
        })}
      </div>
    </div>
  );
};
const RenewPage: FC<{
  subscriptionId: number;
  asset: string;
}> = ({ subscriptionId, asset }) => {
  const [renewData, setRenewData] = useState<TRenewData>(initialRenewData);
  const [reloadKey, setReloadKey] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  // Destructuring renewData
  const products = renewData.scopes || [];
  const billingAccounts = renewData.billingAccounts || [];
  const currency = renewData.currency || "";

  const [formData, setFormData] = useState<Record<string, any>>({});
  const [dataLength, setDataLength] = useState<number>(2);

  // Default checked product
  const defaultSelectedData =
    products?.filter((dt: TRenewProduct) => dt.isChecked) || [];

  // State to store selected renew products
  const [selectedData, setSelectedData] =
    useState<TRenewProduct[]>(defaultSelectedData);

  const { authInfo, chkLoginReq } = useAuth2();
  const { setMessage } = useTemplate();

  const subTotal = selectedData.reduce((acc, dt) => acc + dt.totalPrice, 0);

  const recommendedProducts = products?.filter(
    (i: TRenewProduct) => !i.isChecked
  );

  const query: TRenewApiQuery = {
    subscriptionId,
    asset,
    currency: formData.currency?.toLowerCase() || "",
  };

  // Load renew data
  useEffect(() => {
    if (!authInfo.loading && !authInfo.error && reloadKey !== -2) {
      ApiLoadRenewData(authInfo, chkLoginReq, query)
        .then(({ data }) => {
          if (data) {
            // If no data found
            if (Object.keys(data).length === 0) {
              setRenewData({ ...data, notFound: true });
            } else {
              setRenewData(data);
            }
            setSelectedData(
              data?.scopes.filter((dt: TRenewProduct) => dt.isChecked)
            );
          }
        })
        .catch(() => {
          setRenewData({ ...initialRenewData, notFound: true });
        })
        .finally(() => {
          setReloadKey(-2);
        });
    }
  }, [authInfo, reloadKey, query]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      currency,
    }));
  }, [currency]);

  const reloadRenewData = () => {
    setReloadKey(-1);
  };

  const selectProduct = (data: TRenewProduct) => {
    setSelectedData((prevData) => {
      if (prevData.some((dt) => dt.subscriptionId === data.subscriptionId)) {
        return prevData.filter(
          (dt) => dt.subscriptionId !== data.subscriptionId
        );
      } else {
        return [...prevData, data];
      }
    });
  };

  // handler to checkout
  const handleCheckout = () => {
    const payload: TRenewProductPayload = {
      primarySubscriptionId: subscriptionId,
      // billingAccountId: billingAccounts[0].id,
      currency: formData.currency,
      subscriptionIds: selectedData.map((dt) => dt.subscriptionId),
    };

    setLoading(true);
    setMessage("Creating invoice...");

    ApiCreateRenewInvoice(authInfo, chkLoginReq, payload)
      .then(({ message, data }) => {
        setMessage(message);

        // Redirect to invoice page
        router.push(`${getBikiranUrl()}/invoice/${data.invoiceId}`);
      })
      .catch((err: Error) => {
        setMessage(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const isLoading = reloadKey === -1;

  if (isLoading) return <ProductRenewSkeletonSection />;

  if (renewData.notFound) {
    return (
      <section className="">
        <ProductRenewHeaderSection
          formData={formData}
          setFormData={setFormData}
          billingAccounts={billingAccounts}
          reloadRenewData={reloadRenewData}
          notFound
        />
        <ProductNotFoundSection />
      </section>
    );
  }
  return (
    <section>
      <ProductRenewHeaderSection
        formData={formData}
        setFormData={setFormData}
        billingAccounts={billingAccounts}
        reloadRenewData={reloadRenewData}
      />

      {/* Selected Renew Product */}

      <div className="overflow-auto pb-7 custom-scrollbar">
        {defaultSelectedData?.length > 0 && (
          <RenewProductComp data={defaultSelectedData[0]} isSelected={true} />
        )}

        {/* Recommend Renew Products */}
        {recommendedProducts.length !== 0 && (
          <RecommendedProducts
            data={recommendedProducts?.slice(0, dataLength)}
            selectProduct={selectProduct}
            selectedData={selectedData}
          />
        )}

        {/* Load more button*/}

        {dataLength < recommendedProducts?.length && (
          <button
            type="button"
            className="text-secondary font-medium mt-2 border-b border-secondary"
            onClick={() => setDataLength((prev) => prev + 2)}
          >
            Load more +{recommendedProducts?.length - dataLength}
          </button>
        )}

        <ProductCalculation
          subTotal={subTotal}
          selectedData={selectedData.length}
          currency={currency}
        />

        <div className="flex justify-end">
          <Button
            variant="secondary"
            className="px-5 py-2.5"
            onClick={handleCheckout}
            loading={loading}
          >
            Checkout
          </Button>
        </div>
      </div>
    </section>
  );
};
export default RenewPage;

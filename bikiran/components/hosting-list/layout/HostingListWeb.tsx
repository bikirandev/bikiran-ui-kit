import { FC } from "react";
import { THostingListItem, TUser } from "../hostingListType";
import { useHostingList } from "../context/HostingListProvider";
import HostingListSkeletonComp from "../HostingListSkeletonComp";
import { GetDate, GetTime } from "@/bik-lib/utils/date";
import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { showCurrencySign, showInt } from "@/bik-lib/utils/show";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { ApiSyncDown } from "../HostingListOperation";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { useRouter } from "next/navigation";
import { TooltipUserInfo } from "bik-utils";
import Image from "next/image";
import StatusColor from "@/bik-lib/utils/statusColor";
type TProps = {
  data: THostingListItem[];
};

const TableRow: FC<{ data: THostingListItem }> = ({ data }) => {
  const { openModal, setMessage } = useTemplate();
  const { authInfo, chkLoginReq } = useAuth2();

  const router = useRouter();

  const syncDown = (id: string) => {
    setMessage("Syncing Down...");
    ApiSyncDown(authInfo, chkLoginReq, id)
      .then((massage) => {
        setMessage("Sync Down Successful");
      })
      .catch((error) => {
        setMessage(`Error: ${error.message}`);
      });
  };

  return (
    <tr>
      <td className=" text-center">{data?.id}</td>
      <td>
        <TooltipUserInfo user={data?.user} ImageComponent={Image} />
        {/* <UserInformation data={data.user} key={data.id} /> */}
      </td>
      <td className="text-left">
        <div className="flex flex-col">
          <span className="font-medium text-primary 2xl:text-base text-sm">
            {data?.title}
          </span>
          {data?.domainName ? (
            <span className="text-primary-500 2xl:text-sm text-[13px]">
              {data?.domainName}
            </span>
          ) : (
            <span className="text-xs text-error">Not Configured</span>
          )}
        </div>
      </td>
      <td className="text-center text-sm">
        {GetDate(data?.timeExpire)} <br />
        <span
          className={`${
            data?.expireRemain > 30 ? "text-success" : "text-error"
          } text-[13px]`}
        >
          {data?.expireRemain} days left
        </span>
      </td>
      <td className="text-center">
        {data?.contractDuration} {capitalizeFirstLetter(data?.contractUnitName)}
      </td>
      <td className="text-center !font-medium">
        <div className="flex justify-center">
          {data?.contractPrice === data?.contractPriceOffer ? (
            <span>
              {showCurrencySign(data.contractCurrency)}
              {showInt(data?.contractPriceOffer)}
            </span>
          ) : (
            <div className="flex flex-col">
              <span className="">
                {showCurrencySign(data.contractCurrency)}
                {showInt(data?.contractPriceOffer)}
              </span>
              <span className="line-through text-xs text-primary-500">
                {showCurrencySign(data.contractCurrency)}
                {showInt(data?.contractPrice)}
              </span>
            </div>
          )}
        </div>
      </td>
      <td className="text-center !font-medium">
        <div className="flex justify-center">
          {data?.contractPriceUSD === data?.contractPriceOfferUSD ? (
            <span>${showInt(data?.contractPriceOfferUSD)}</span>
          ) : (
            <div className="flex flex-col">
              <span className="">${showInt(data?.contractPriceOfferUSD)}</span>
              <span className="line-through text-xs text-primary-500">
                ${showInt(data?.contractPriceUSD)}
              </span>
            </div>
          )}
        </div>
      </td>
      <td className="text-center text-success">{data?.contractVatPercent}%</td>
      <td className="text-center">
        <StatusColor status={data?.status} />
      </td>
      <td>
        <InstOption>
          <button
            type="button"
            className="text-error"
            onClick={(ev) => {
              ev.stopPropagation();
              syncDown(data.id.toString());
            }}
          >
            Sync Down
          </button>
          <button
            type="button"
            onClick={(ev) => {
              ev.stopPropagation();
              router.push(`/renew?subscription-id=${data.id}&asset=hosting`);
            }}
          >
            Renew
          </button>
          <button
            type="button"
            onClick={() => openModal("update-Package", data)}
          >
            Update Package
          </button>
          <button type="button" onClick={() => openModal("update-basic", data)}>
            Update Basic
          </button>
          <button
            type="button"
            onClick={() => openModal("update-ownership", data)}
          >
            Update Ownership
          </button>
          <button
            type="button"
            onClick={() => openModal("update-pricing", data)}
          >
            Update Pricing
          </button>
          <button
            type="button"
            onClick={() => openModal("update-status", data)}
          >
            Update Status
          </button>
        </InstOption>
      </td>
    </tr>
  );
};

const HostingListWeb: FC<TProps> = ({ data }) => {
  const { loading } = useHostingList();
  const placeholderArr = Array.from({ length: data?.length || 3 }, (_, i) => i);
  return (
    <table cellPadding={0} cellSpacing={0} className="table-container">
      <thead>
        <tr>
          <th className="w-[100px] !text-center">ID</th>
          <th className="text-center w-14">User </th>
          <th className="text-left">Title</th>
          <th className="text-center w-28">Expire At</th>
          <th className="text-center w-36">Duration</th>
          <th className="text-center w-20">Price(local)</th>
          <th className="text-center w-20">Price(USD)</th>
          <th className="text-center w-20">Vat</th>
          <th className="text-center w-[80px]">Status</th>
          <th className="!w-[50px]"># </th>
        </tr>
      </thead>
      <tbody>
        {loading
          ? placeholderArr.map((i) => <HostingListSkeletonComp key={i} />)
          : data.map((item) => <TableRow key={item.id} data={item} />)}

        {!loading && data.length === 0 && (
          <tr className="not-found">
            <td colSpan={6} className="text-center">
              No hosting data found!
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default HostingListWeb;

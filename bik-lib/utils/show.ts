import Cookie from "./Cookie";
import { getBaseDomain } from "./Env";

export const showCurrencySign = (currency?: string) => {
  const localeData =
    typeof window !== "undefined"
      ? new Cookie("locale", getBaseDomain()).getCookie()
      : null;
  const value = currency?.toLowerCase();
  const localeCurrency = localeData ? JSON.parse(localeData).currency : "";

  if (currency !== undefined && currency?.length > 0) {
    return value === "usd" ? "$" : value === "bdt" ? "৳" : "₹" ;
  }
  return localeCurrency?.toLowerCase() === "usd" ? "$" : localeCurrency?.toLowerCase() === "bdt" ? "৳" : "₹";
};

export const showInt = (value: number, fixedCount: number = 2) => {
  if (typeof value === "string") {
    return parseFloat(value || 0).toFixed(fixedCount);
  }
  return value?.toFixed(fixedCount);
};

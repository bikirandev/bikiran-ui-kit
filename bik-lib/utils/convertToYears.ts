export function convertToYears(quantity: number, unit?: string): string {
  switch (unit ? unit?.toLowerCase() : "months") {
    case "day":
      return `${quantity / 365 === 1 ? "" : `${quantity / 365}/`}y`;
    case "week":
      return `${quantity / 52 === 1 ? "" : `${quantity / 52}/`}y`;
    case "month":
      return `${quantity / 12 === 1 ? "" : `${quantity / 12}/`}y`;
    case "year":
      return `${quantity === 1 ? "" : `${quantity}/`}y`;
    default:
      return "y";
  }
}

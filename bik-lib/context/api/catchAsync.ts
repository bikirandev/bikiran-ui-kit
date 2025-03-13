import { useApi } from "./ApiProvider";
import { useTemplate } from "../template/TemplateProvider";

type TFunction = (...args: any[]) => any;

const catchAsync = (func: TFunction) => {
  const { setMessage } = useTemplate();
  const { stopLoading } = useApi();
  return (...args: any[]) => {
    Promise.resolve(func(...args))
      .catch((err: Error) => {
        setMessage(err.message);
      })
      .finally(() => {
        stopLoading();
      });
  };
};

export default catchAsync;

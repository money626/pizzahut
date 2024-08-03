import { extend, setInteractionMode } from "vee-validate";
import { confirmed, email, max, required } from "vee-validate/dist/rules";
import { emailUsed } from "@/util/api";

export const VALIDATION_FAILED_MESSAGE = {
  EMAIL: "信箱格式錯誤",
  REQUIRED: "此欄位必填",
  CONFIRMED: "兩次輸入的密碼不符",
  PASSWORD: "",
  CARRIER: "載具格式錯誤",
  MAX: "該欄位最長長度為{length}",
  CELLPHONE: "手機格式錯誤",
  EMAIL_USED: "此信箱已被使用",
};

export const VALIDATION_FUNCTION = {
  CARRIER: (value: string) => /[^\W_]{7}/.test(value),
  CELLPHONE: (value: string) => /09\d{8}/.test(value),
  PASSWORD: () => true,
  EMAIL_USED: async (value: string) => {
    return !(await emailUsed(value));
  },
};

export function importRules() {
  setInteractionMode("lazy");
  extend("email", { ...email, message: VALIDATION_FAILED_MESSAGE.EMAIL });
  extend("required", {
    ...required,
    message: VALIDATION_FAILED_MESSAGE.REQUIRED,
  });
  extend("max", { ...max, message: VALIDATION_FAILED_MESSAGE.MAX });
  extend("cellphone", {
    validate: VALIDATION_FUNCTION.CELLPHONE,
    message: VALIDATION_FAILED_MESSAGE.CELLPHONE,
  });
  extend("carrier", {
    validate: VALIDATION_FUNCTION.CARRIER,
    message: VALIDATION_FAILED_MESSAGE.CARRIER,
  });
  extend("password", {
    validate: VALIDATION_FUNCTION.PASSWORD,
    message: VALIDATION_FAILED_MESSAGE.PASSWORD,
  });
  extend("emailUsed", {
    validate: VALIDATION_FUNCTION.EMAIL_USED,
    message: VALIDATION_FAILED_MESSAGE.EMAIL_USED,
  });
  extend("confirmed", {
    ...confirmed,
    message: VALIDATION_FAILED_MESSAGE.CONFIRMED,
  });
}

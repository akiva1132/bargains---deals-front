import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  username: yup
    .string()
    .required("חובה להזין כתובת מייל")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "כתובת המייל אינה תקינה")
    .min(3, "כתובת המייל קצרה מידי")
    .max(50, "כתובת המייל ארוכה מידי"),
    fullname: yup
    .string()
    .required("חובה להכניס שם מלא או שם מגרש")
    .min(1, "שם קצר מידי")
    .max(20, "שם ארוך מידי"),
    code: yup
    .string()
    .required("חובה להכניס קוד הרשמה")
    .min(6, "קוד קצר מידי")
    .max(6, "קוד ארוך מידי"),
    phone: yup
    .string()
    .required("חובה להכניס מספר טלפון")
    .min(9, "מספר קצר מידי")
    .max(10, "מספר ארוך מידי"),
  password: yup
    .string()
    .required("חובה להזין סיסמא")
    .required("חובה להזין סיסמה")
    .min(8, "הסיסמה חייבת להיות בעלת לפחות 8 תווים")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*$/, "הסיסמה חייבת לכלול לפחות אות אחת ולפחות ספרה אחת"),
  confirmPassword: yup
    .string()
    .required("יש להזין את הסיסמא שוב לצורך אימות")
    .oneOf([yup.ref("password")], "הסיסמאות אינם זהות")
});

import * as Yup from "yup";

export const FormValidation = Yup.object({
  email: Yup.string()
    .email("Неверный адрес электронной почты")
    .required("Обязательно"),
  password: Yup.string()
    .min(5, "Должно быть не менее 5 символов")
    .max(15, "Должно быть не более 10 символов")
    .required("Обязательно"),
});

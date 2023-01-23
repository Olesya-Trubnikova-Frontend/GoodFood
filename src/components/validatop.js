import * as Yup from "yup";

export const FormValidation = Yup.object({
  email: Yup.string()
  	.email("Invalid email address")
	  .required("Required"),
  password: Yup.string()
    .min(5, "Must be 5 characters or more")
    .max(15, "Must be 10 characters or less")
    .required("Required"),
});

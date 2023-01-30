import regStyles from "./formReg.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormValidation } from "../validatop";
import { useTokenContext } from "../../contexts/TokenContext";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

// объект для формы
const initialValues = {
		email: '',
		group: 'sm9',
		password: '',
}

export const FormReg = () => {

	const { setNewToken } = useTokenContext()

	const navigate = useNavigate()

	// сетевой запрос на регистрацию
  const {mutateAsync, isLoading} = useMutation({
	  mutationFn: (data) => fetch("https://api.react-learning.ru/signup", {
		  	method: "POST",
		  	headers: {
				  "Content-type": "application/json"
		  	},
		  	body: JSON.stringify(data)
	    }).then((res) => res.json()).then((user) => setNewToken(user.token))
	  }
)

	const submitHandler = async (values) => {

		await mutateAsync(values)
		setTimeout(() => {navigate("/signin")})
	}  

	return (
			<Formik className={regStyles.wr}
			initialValues={initialValues} 
			validationSchema={FormValidation}
			onSubmit={submitHandler}
			>
         <Form className={regStyles.box}>
           <Field className={regStyles.text} name="email" placeholder="email" type="text" />
           <ErrorMessage component ="p" className={"error"} name="email" />

					 <Field className={regStyles.text} name="group" placeholder="sm9" type="text" />
           <ErrorMessage component ="p" className={"error"} name="group" />

					 <Field className={regStyles.text} name="password" placeholder="пароль" type="password" />
           <ErrorMessage component ="p" className={"error"} name="password" />
					 <div>
           <button disabled={isLoading} className={regStyles.btn} type="submit">Зарегистрироваться</button>
					 </div>
         </Form>
       </Formik>
	)
}
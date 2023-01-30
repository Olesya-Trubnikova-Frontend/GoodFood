import logStyles from "./formLog.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormValidation } from "../validatop";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useTokenContext } from "../../contexts/TokenContext";


// объект для формы
const initialValues = {
		email: '',
		password: ''
}

export const FormLog = () => {

	const { setNewToken } = useTokenContext()

	const navigate = useNavigate()

	// сетевой запрос на вход
  const {mutateAsync, isLoading} = useMutation({
	  mutationFn: (data) => fetch("https://api.react-learning.ru/signin", {
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
		setTimeout(() => {navigate("/products")})
	}

	return (
			<Formik className={logStyles.wr}
			initialValues={initialValues} 
			validationSchema={FormValidation}
			onSubmit={submitHandler}
			>
         <Form className={logStyles.box}>
           <Field className={logStyles.text} name="email" placeholder="email" type="text" />
           <ErrorMessage component ="p" className={"error"} name="email" />

					 <Field className={logStyles.text} name="password" placeholder="пароль" type="password" />
           <ErrorMessage component ="p" className={"error"} name="password" />
					 <div>
           <button disabled={isLoading} className={logStyles.btn} type="submit">Войти</button>
					 </div>
         </Form>
       </Formik>
	)
}
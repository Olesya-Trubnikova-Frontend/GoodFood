import logStyles from "./formLog.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormValidation } from "../validatop";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setNewUser } from '../../redux/slices/userSlice'
import { cartInitialize } from '../../redux/slices/cartSlice'
import { DOGFOOD_CART_LS_KEY } from "../../redux/constants";


// объект для формы
const initialValues = {
		email: '',
		password: ''
}

export const FormLog = () => {

	const dispatch = useDispatch()

	const navigate = useNavigate()


	const {mutateAsync, isLoading} = useMutation({
		mutationFn: (data) => fetch("https://api.react-learning.ru/signin", {
			method: 'POST',
			headers: {
				  "Content-type": "application/json"
		  	},
		  	body: JSON.stringify(data)
		})
		.then((res) => res.json())//забрать ответ от сервера
		.then((user)=>{
			const cartFromLS = window.localStorage.getItem(DOGFOOD_CART_LS_KEY)

			if (cartFromLS) {
          const cartForCurrentUser = JSON.parse(cartFromLS)[user.data_id]

          dispatch(cartInitialize(cartForCurrentUser ?? []))
      }

			dispatch(setNewUser(user.data._id, user.token, user.data.email))
			console.log("------------", user.token)
			console.log("------------", user.data._id)
			console.log("------------", user.data.email)

		})
	})
	

	const submitHandler = async (values) => {
		await mutateAsync(values)
		setTimeout(() => {navigate("/products")})
	}

	return (
			<Formik className={logStyles.wr}
			initialValues={initialValues} 
			validationSchema={FormValidation}
			onSubmit={(values) => submitHandler(values)}
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
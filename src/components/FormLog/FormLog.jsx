import logStyles from "./formLog.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormValidation } from "../validatop";


// объект для формы
const initialValues = {
		email: '',
		password: '',
}

export const FormLog = () => {
	return (
			<Formik className={logStyles.wr}
			initialValues={initialValues} 
			validationSchema={FormValidation}
			onSubmit={(values) => {
				console.log({values})
			}}
			>
         <Form className={logStyles.box}>
           <Field className={logStyles.text} name="email" placeholder="email here" type="text" />
           <ErrorMessage component ="p" className={"error"} name="email" />

					 <Field className={logStyles.text} name="password" placeholder="password here" type="text" />
           <ErrorMessage component ="p" className={"error"} name="password" />
					 <div>
           <button className={logStyles.btn} type="submit">Войти</button>
					 </div>
         </Form>
       </Formik>
	)
}
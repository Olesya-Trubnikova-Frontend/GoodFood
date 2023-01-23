import regStyles from "./formReg.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormValidation } from "../validatop";

// объект для формы
const initialValues = {
		email: '',
		group: 'sm9',
		password: '',
}

export const FormReg = () => {
	return (
			<Formik className={regStyles.wr}
			initialValues={initialValues} 
			validationSchema={FormValidation}
			onSubmit={(values) => {
			console.log({values})
			}}
			>
         <Form className={regStyles.box}>
           <Field className={regStyles.text} name="email" placeholder="email here" type="text" />
           <ErrorMessage component ="p" className={"error"} name="email" />

					 <Field className={regStyles.text} name="group" placeholder="sm9" type="text" />
           <ErrorMessage component ="p" className={"error"} name="group" />

					 <Field className={regStyles.text} name="password" placeholder="password here" type="text" />
           <ErrorMessage component ="p" className={"error"} name="password" />
					 <div>
           <button className={regStyles.btn} type="submit">Зарегистрироваться</button>
					 </div>
         </Form>
       </Formik>
	)
}
import productsStyles from "./products.module.css";
import { useQuery } from "@tanstack/react-query";
import { ProductItem } from "../ProductItem/ProductItem"
import { useTokenContext } from "./../../contexts/TokenContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Products = () => {

	const { userToken } = useTokenContext()
	console.log({userToken})

	const navigate = useNavigate()

	// при входе на сайт, если нет токена, редирект на регистрацию
	useEffect(() => {
		if (!userToken) {
			navigate("/signin")
		}
	}, [userToken])

	const {
		data, isLoading, isError, error, refetch
	} = useQuery({
		queryKey: ["productsfetch"],
		queryFn: () => fetch("https://api.react-learning.ru/products", {
			headers: {
				authorization: `Bearer ${userToken}`,
			}
		}).then((res) => {
			if (res.status >= 400) {
				throw new Error (`${res.status}: Ошибка при получении товара`)
			} return res.json()
		})
	})
	console.log({data, isLoading, isError, error, refetch})

	const {products} = Object(data)

	console.log("Список продуктов", products)

	return (
		<div className={productsStyles.box}>
			<h1>Наши товары</h1>
			{products && (
				<ul className={productsStyles.text}>
				{products.map((product) => (
				<ProductItem 
				key={product._id}
				pictures={product.pictures}
				name={product.name}
				price={product.price}
				wight={product.wight}
				/>
				))}
		</ul>
			)}
		</div>
	)
}
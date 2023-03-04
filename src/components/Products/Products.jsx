import productsStyles from "./products.module.css";
import { useQuery } from "@tanstack/react-query";
import  ProductItem  from "../ProductItem/ProductItem"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getTokenSelector } from '../../redux/slices/userSlice'
import { getSearchSelector } from '../../redux/slices/filterSlice'
import { getQuerySearchKey } from './utils'
import withQuery from '../HOCs/withQuery'
import { DogFoodApiConst } from '../../Api/DogFoodApi'

function ProductsInner({data}) {

	const products = data

	return (
			<div className={productsStyles.box}>
		  	<h1>Наши товары</h1>
		  	{products[0] && (
			  	<ul className={productsStyles.text}>
			  	{products.map((product) => (
			  	<ProductItem 
				  	key={product._id}
						id={product._id}
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

const ProductsInnerWithQuery = withQuery(ProductsInner)

export const  Products = () => {

  const userToken = useSelector(getTokenSelector)
	
  const navigate = useNavigate()

	// при входе на сайт, если нет токена, редирект на регистрацию
	useEffect(() => {
		if (!userToken) {
			navigate("/signin")
		}
	}, [userToken])

  const search = useSelector(getSearchSelector)
  const {
    data, isLoading, isError, error, refetch,
  } = useQuery({
    queryKey: getQuerySearchKey(search),
    queryFn: () => DogFoodApiConst.getAllProducts(search, userToken),
    enabled: (userToken !== undefined) && (userToken !== ''),
  })

  return <ProductsInnerWithQuery data={data} isLoading={isLoading} isError={isError} refetch={refetch} error={error} />
}

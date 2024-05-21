import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../features/ProductSlice'
import CardComponent from './CardComponent'
import axios from 'axios'
import { inputCart, updateCart } from '../features/CartSlice'

const ProductComponent = () => {
    const products = useSelector((state) => state.product.data)
    const loading = useSelector((state) => state.product.loading)
    const error = useSelector((state) => state.product.error)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProduct())
    }, [dispatch])

    const setCart = async (product) => {
        const response = await axios.get(`/carts?productId=${product.id}`)
        if (response.data && response.data.length > 0) {
            console.log("UPDATE")
            const orderItem = response.data[0];
            orderItem.qty = parseInt(orderItem.qty) + 1;
            orderItem.totalPrice = parseInt(orderItem.price) * parseInt(orderItem.qty);
            dispatch(updateCart(orderItem))
            // console.log(orderItem)
        } else {
            console.log("INSERT")
            const orderItem = {
                qty: 1,
                price: product.price,
                name: product.name,
                totalPrice: product.price,
                note: "",
                productId: product.id
            }
            // console.log(orderItem)
            dispatch(inputCart(orderItem))
        }
    }
    return (
        <div>
            <h3>Product</h3>
            {error ? error : ""}
            <hr />
            <div className='card-div'>
                {
                    products ? (
                        products.map((item) => (
                            <CardComponent key={item.id} products={item} setCart={setCart} />
                        ))
                    ) : loading ? <p>Loading ...</p> : <p>No Data</p>
                }
            </div>
        </div>
    )
}

export default ProductComponent
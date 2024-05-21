import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { saveCart } from '../features/CartSlice';

const TotalCartComponent = ({ carts }) => {
    const dispatch = useDispatch()

    let sum = 0
    if (carts) {
        sum = carts.reduce((result, item) => {
            return result + parseInt(item.totalPrice)
        }, 0)
    }
    const saveCartData = (data) => {
        const orderData = {
            date: new Date(),
            total: sum,
            detail: data
        }
        dispatch(saveCart(orderData))
    }
    // const saveCarts = useSelector((state) => state.cart.data)
    // const loading = useSelector((state) => state.cart.loading)
    // const error = useSelector((state) => state.cart.error)

    // useEffect(() => {
    //     dispatch(saveCart())
    // }, [dispatch])
    return (
        <div className='cart-total'>
            {
                sum > 0 ?
                    <>
                        <div className='total-buy'>
                            <p>Total Bayar:</p>
                            <p><strong>Rp. {sum.toLocaleString("id-ID")}</strong></p>
                        </div>
                        <div className='button-cart'>
                            <Button className='me-3 mb-3' style={{ width: '18rem' }} onClick={()=> saveCartData(carts)}>
                                <FaCartArrowDown /> Bayar
                            </Button>
                        </div>
                    </>
                    : ""
            }
        </div>
    )
}

export default TotalCartComponent
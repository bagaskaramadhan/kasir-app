import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCart } from '../features/CartSlice'
import { ListGroup } from 'react-bootstrap'
import TotalCartComponent from './TotalCartComponent'

const CartComponent = () => {
    const carts = useSelector((state) => state.cart.data)
    const loading = useSelector((state) => state.cart.loading)
    const error = useSelector((state) => state.cart.error)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCart())
    }, [dispatch])
    return (
        <div>
            <h3>Cart</h3>
            {error ? error : ""}
            <hr />
            {
                carts ?
                    (
                        carts.map((item) => (
                            <ListGroup.Item
                                key={item.id}
                                variant='flush'
                                style={{ cursor: 'pointer' }}
                            >
                                <p><b>{item.name}</b></p>
                                <p>Rp. {parseInt(item.price).toLocaleString("id-ID")} x {item.qty}</p>
                                <small>{item.note}</small>
                            </ListGroup.Item>
                        ))
                    )
                    : loading ? <p>Loading ...</p> : <p>No data</p>
            }
            <TotalCartComponent carts={carts}/>
        </div>
    )
}

export default CartComponent
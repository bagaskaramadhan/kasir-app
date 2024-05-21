import React from 'react'
import { Button, Card, Image } from 'react-bootstrap'

const CardComponent = ({ products, setCart }) => {
    return (
        <Card className='card-products' key={products.id} onClick={() => setCart(products)}>
            <Image width={286} height={250} src={"img/" + products.image.toLowerCase()} />
            <Card.Body>
                <Card.Title>{products.name}</Card.Title>
                <h5>Rp.{products.price.toLocaleString("id-ID")}</h5>
                <div className='button-product'>
                    <Button variant="primary">Add to cart</Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default CardComponent
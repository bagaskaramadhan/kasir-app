import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { categorySelectors, getAllCategory } from '../features/CategorySlice';
import { ListGroup } from 'react-bootstrap';
import { IoFastFoodSharp, FaBowlFood, MdLocalDrink, GiCakeSlice } from "../icons"
import { getProduct, getProductByCategory } from '../features/ProductSlice';

const CategoryComponent = () => {
    const dispatch = useDispatch();
    const category = useSelector(categorySelectors.selectAll)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(getAllCategory()).finally(() => setLoading(false));
    }, [dispatch]);

    const setActive = (element) => {
        let active = document.getElementsByClassName("active")
        for (let i = 0; i < active.length; i++) {
            active[i].classList.remove("active");
        }
        element.classList.add("active");
    }

    const setIcon = (category) => {
        if (category === 1) {
            return <FaBowlFood />
        } else if (category === 2) {
            return <MdLocalDrink />
        } else {
            return <GiCakeSlice />
        }
    }

    const showAll = () => {
        dispatch(getProduct())
    }

    const productByCategory = (id) => {
        dispatch(getProductByCategory(id))
    }

    return (
        <div>
            <h3>Categories</h3>
            <p>{loading ? "Loading ..." : ""}</p>
            <hr />
            <ListGroup key={"all001"}>
                <ListGroup.Item
                    id={'all001'}
                    className='mb-1 shadow-sm'
                    active
                    action
                    onClick={() =>
                        setActive(document.getElementById(`all001`), showAll())}
                >
                    <IoFastFoodSharp /> All Product
                </ListGroup.Item>
            </ListGroup>

            {category && category.map((item) => (
                <ListGroup key={item.id}>
                    <ListGroup.Item
                        id={`key${item.id}`}
                        className='mb-1 shadow-sm'
                        action
                        onClick={() =>
                            setActive(document.getElementById(`key${item.id}`), productByCategory(item.id))}
                    >
                        {setIcon(item.id)} {item.name}
                    </ListGroup.Item>
                </ListGroup>
            ))}
        </div>
    )
}

export default CategoryComponent
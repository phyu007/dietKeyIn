import React, { useState } from 'react'
import data from '../../mockdata/data'

const DietInput = ({ addDiet }) => {
    const [foodName, setFoodName] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [temperature, setTemperature] = useState(0)
    const [initialValues] = useState(data)


    const handleFoodNameChange = (event) => { setFoodName(event.target.value) }
    const handleQuantityChange = (event) => { setQuantity(event.target.value) }
    const handleTempChange = (event) => { setTemperature(event.target.value) }

    const handleSubmit = event => {
        event.preventDefault()

        addDiet({
            foodName,
            quantity,
            temperature,
            datetime: new Date()
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="foodName">Food Name:</label>
                <select id="foodName" value={foodName} onChange={handleFoodNameChange}>
                    <option value="">Select a food name</option>
                    {Object.keys(initialValues).map((name) => (
                        <option key={name} value={name}>
                            {name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="quantity">Quantity:</label>
                <input type="number" id="quantity" placeholder="Quantity" value={quantity} onChange={handleQuantityChange} />
            </div>
            <div>
                <input type="submit" value="Add to Diet" />
            </div>
        </form>

    )
}

export default DietInput
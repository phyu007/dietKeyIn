import React, { useState } from 'react'
import data from '../../mockdata/data'

const DietInput = ({ addDiet }) => {
    const [foodName, setFoodName] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [temperature, setTemperature] = useState(0)
    const[ initialValues] = useState(data)


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
            {/* <input
                type="text"
                placeholder='Food name'
                value={foodName}
                onChange={handleFoodNameChange}
            /> */}
            <select value={foodName} onChange={handleFoodNameChange}>
                <option value="">Select a food name</option>
                {Object.keys(initialValues).map((name) => (
                    <option key={name} value={name}>
                        {name}
                    </option>
                ))}
            </select>
            <input
                type="number"
                placeholder='Quantity'
                value={quantity}
                onChange={handleQuantityChange}
            />
            {/* <input
                type="number"
                placeholder='Temperature'
                value={temperature}
                onChange={handleTempChange}
            /> */}
            <input type="submit" text="Add" />
        </form>
    )
}

export default DietInput
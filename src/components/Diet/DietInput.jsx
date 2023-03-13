import React, { useState } from 'react'

const DietInput = ({ addDiet }) => {
    const [foodName, setFoodName] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [temperature, setTemperature] = useState(0)

    const handleFoodNameChange = (event) => { setFoodName(event.target.value) }
    const handleQuantityChange = (event) => { setQuantity(event.target.value) }
    const handleTempChange = (event) => { setTemperature(event.target.value) }

    const handleSubmit = event => {
        event.preventDefault()
        console.log(foodName, quantity)

        addDiet({ 
            foodName, 
            quantity, 
            temperature,
            datetime: new Date()
        })
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder='Food name'
                value={foodName}
                onChange={handleFoodNameChange}
            />
            <input
                type="number"
                placeholder='Quantity'
                value={quantity}
                onChange={handleQuantityChange}
            />
            <input
                type="number"
                placeholder='Temperature'
                value={temperature}
                onChange={handleTempChange}
            />
            <input type="submit" text="Add"/>
        </form>
    )
}

export default DietInput
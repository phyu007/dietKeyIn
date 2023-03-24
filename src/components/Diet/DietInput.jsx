import React, { useState } from 'react'
import data from '../../mockdata/data'

const DietInput = ({ addDiet }) => {
    const [foodName, setFoodName] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [temperature, setTemperature] = useState(0)
    const[ initialValues] = useState(data)
    let values = initialValues

    const handleFoodNameChange = (event) => { setFoodName(event.target.value) }
    const handleQuantityChange = (event) => { setQuantity(event.target.value) }
    const handleTempChange = (event) => { setTemperature(event.target.value) }
    console.log("This is initialValues before submit",initialValues)

    const handleSubmit = event => {
        event.preventDefault()
        console.log(foodName, quantity)
        values = setIniQuantity(foodName,quantity,values);
        console.log("This is initialValues after submit",values)

        addDiet({
            foodName,
            quantity,
            temperature,
            datetime: new Date()
        })
    }
    const setIniQuantity = (foodName, amount, values) => {
        const updatedValues = { ...values };
        Object.keys(updatedValues).forEach((key) => {
          if (key === foodName) {
            console.log("This is foodname",foodName)
            console.log("This is key",key)
            console.log("This is amount",amount )
            updatedValues[key] = amount;
          }
        });
        console.log("This is updatedValues",updatedValues)
        return updatedValues;
      };

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
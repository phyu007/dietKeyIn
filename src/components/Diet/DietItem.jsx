import React, { useState } from 'react'

const DietItem = ({ diet }) => {
    const { foodName, quantity, temperature } = diet
    return (
        <div style={{
            display: "flex",
            gap: "25px 10px"
        }}>
            <span>{foodName}</span>
            <span>{quantity}</span>
            {/* <span>{temperature} Celsius</span> */}
        </div>
    )
}

export default DietItem
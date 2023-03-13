import React, { useState } from 'react'

const DietItem = ({ diet }) => {
    const { foodName, quantity } = diet
    return (
        <div style={{
            display: "flex",
            gap: "25px 10px"
        }}>
            <span>{foodName}</span>
            <span>{quantity}</span>
        </div>
    )
}

export default DietItem
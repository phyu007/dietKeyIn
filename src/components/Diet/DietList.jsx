import React, { useState } from 'react'
import DietItem from './DietItem'

const DietList = ({ dietList }) => {
    const generateDietList = dietList => {
        return dietList.map(diet => <DietItem diet={diet} />)
    }

    return (
        <div>
            {generateDietList(dietList)}
        </div>
    )
}

export default DietList
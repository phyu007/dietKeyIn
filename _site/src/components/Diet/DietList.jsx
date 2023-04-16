import React, { useState } from 'react'
import DietItem from './DietItem'

// create a language selector component
// implement handleLanguageSelect function
const DietList = ({ dietList }) => {
    const generateDietList = dietList => {
        return dietList.map(diet => <DietItem diet={diet} key={diet} />)
    }

    return (
        <div>
            {generateDietList(dietList)}
        </div>
    )
}

export default DietList
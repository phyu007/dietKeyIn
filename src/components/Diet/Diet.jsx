import React, { useState } from 'react'
import DietInput from './DietInput'
import DietList from './DietList'

const Diet = (props) => {
    const [dietList, setDietList] = useState([
        // {
        //     foodName: 'apple',
        //     quantity: 2
        // },
        // {
        //     foodName: 'orange',
        //     quantity: 2
        // }
    ])

    const addDiet = (diet) => {
        let tempDietList = dietList.slice()
        tempDietList.push(diet)
        setDietList(tempDietList)
    }

    return (
        <div>
            <DietInput addDiet={addDiet} />
            <DietList dietList={dietList} />
        </div>
    )
}

export default Diet
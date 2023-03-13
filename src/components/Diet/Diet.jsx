import React, { useState } from 'react'
import DietInput from './DietInput'
import DietList from './DietList'
import { postDiet } from '../../api/apiClient'

const Diet = (props) => {
    const [dietList, setDietList] = useState([])

    const addDiet = (diet) => {
        let tempDietList = dietList.slice()
        tempDietList.push(diet)
        setDietList(tempDietList)
    }

    const handleSubmit = async () => {
        if (dietList.length == 0)
            return console.error('Diet list is empty!')
        try {
            await postDiet(dietList)
        } catch (eInfo) {
            console.error(eInfo)
        }
    }

    return (
        <div>
            <DietInput addDiet={addDiet} />
            <DietList dietList={dietList} />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default Diet
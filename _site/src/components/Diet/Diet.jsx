import React, { useState } from 'react'
import DietInput from './DietInput'
import DietList from './DietList'
import { postDiet } from '../../api/urineAnalysis'
import { getPredictedPH } from '../../api/urineAnalysis'
import insert from '../../api/backend';
import data from '../../mockdata/data'


const Diet = (props) => {
    const [dietList, setDietList] = useState([])
    const[ initialValues] = useState(data)

    const updatedValues = {...initialValues};

    dietList.forEach(item => {
        if (updatedValues.hasOwnProperty(item.foodName)) {
          updatedValues[item.foodName] += Number(item.quantity);
        }
      });
      
    const addDiet = (diet) => {
        let tempDietList = dietList.slice()
        tempDietList.push(diet)
        setDietList(tempDietList)
    }

    const handleSubmit = async () => {
        if (dietList.length == 0)
            return console.error('Diet list is empty!')
        try {
            await postDiet(updatedValues)
            let response = await getPredictedPH(updatedValues)
            console.log("This is predicted PH",response.data.body.predi)
            //console.log("This is after initValues",updatedValues)
            //console.log("This is dietlist",dietList)
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
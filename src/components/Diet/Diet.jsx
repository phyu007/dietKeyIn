import React, { useState } from 'react'
import DietInput from './DietInput'
import DietList from './DietList'
import { postDiet ,getRecommendedDiet,updateurineph,getPredictedPH} from '../../api/urineAnalysis'
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
            console.log("This is person_id", props.user.person_id)
            updatedValues["person_id"] = props.user.person_id
            console.log("This is updatedValues", updatedValues)
            await postDiet(updatedValues)
            delete updatedValues.person_id;
            console.log("This is updatedValues for predict", updatedValues)
            let response = await getPredictedPH(updatedValues)
            let predictedPH = response.data.body.predicted_urine
            console.log("This is predicted PH",response.data.body.predicted_urine)
            window.alert("Your predicted urine pH is " + predictedPH.toFixed(2));
            if(predictedPH < 7)
            {
                let response = await getRecommendedDiet(predictedPH)
                window.alert("Your urine is acidic. We recommend you to have more " + response.recommended_items + " in your diet to balance your pH level.")

            }
            let payload = {
                "person_id": props.user.person_id,
                "urine_ph": predictedPH.toFixed(2)
            }
            let updatePHResponse = await updateurineph(payload)
            console.log("This is after update",updatePHResponse)
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
import React, { useState } from 'react'
import DietInput from './DietInput'
import DietList from './DietList'
import { postDiet ,getRecommendedDiet,updateurineph,getPredictedPH} from '../../api/urineAnalysis'
import data from '../../mockdata/data'


const Diet = (props) => {
    const [dietList, setDietList] = useState([])
    const[ initialValues] = useState(data)
    const updatedValues = {...initialValues};
    console.log("THis is person",props.user.guid)

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
                window.alert("The predicted urine is acidic. We recommend you to test your urine in the smart toilet and to have more " + response.recommended_items + " in your diet to balance your pH level.")

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
            <br />
            <DietList dietList={dietList} />
            <br />
            <button onClick={handleSubmit}>Submit</button>
            <br />
            <br />
            <br />
            <div>
                <h3>You can access historical data: <a href={`http://smarttoilet.s3-website-ap-southeast-1.amazonaws.com/index.html?psersonGuid=${props.user.guid}`}>here</a></h3>
            </div>
        </div>
    )
}

export default Diet
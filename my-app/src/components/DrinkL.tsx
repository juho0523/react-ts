import { useState } from "react"

const DrinkL = ({drinks}: {drinks: string[]}) => {
    
    return(
        <div>
            <ul>
                {drinks.map((drink, index) => (
                    <li key={index}>{drink}</li>
                ))}
            </ul>
        </div>
    )
}
export default DrinkL
import { useState } from "react";
import "../css/Home.css"
import "../css/Card.css"
import ollama from "ollama"

function Home() {

    const [searchQuery, setSearchQuery] = useState("")
    const [categoryReturnString, setCategoryReturnString] = useState("")
    const [categoryReturnJSON, setCategoryReturnJSON] = useState("")
  
    let contactDictionary = {}

    contactDictionary["Injuries"] = ["Tom Montgomery", " / Alice Wilson", " / Central Reporting"]
    contactDictionary["Accidents"] = ["Don Varley", " / Adam Stephens", " / Tom Montgomery", " / Alice Wilson", " / Central Reporting"]
    contactDictionary["Medical Records"] = ["Frederiki Martinos", " / Ann Kuhen"]
    contactDictionary["Video"] = ["Christina Nescio", " / Shannon Merten", " / Terri McGraw"]
    contactDictionary["Police Department"] = ["Kevin J. Amberg", " / APD Reports"]
    contactDictionary["Procurement"] = ["Ronald Hovey, Sr.", " / John R. McCrohan", " / Michelle Cherbavaz"]
    contactDictionary["Media Relations"] = ["Corporate Communications"]
    contactDictionary["Marketing"] = ["Alicia Austion", " / Matt Donnelly", " / Candice Jones", " / Marlon Sharpe"]
    contactDictionary["Real Estate"] = ["Cindy Durst", " / Linda Frankel", " / David Handera", " / Sandra Zibelman", " / Jim Kaliber"]
    contactDictionary["Engineering"] = ["Jennifer Mullen", " / Paul Fries"]
    contactDictionary["HR"] = ["Patty Boggs", " / HRESC", " / Dan Black"]



    async function categorizeText(text, categories) {

        const prompt = [{
            "role": 'user',
            "content": "We are conducting a noise assessment for The Marine Drive Apartments, 205 Marine Drive, Buffalo, Erie County, NY 14202. A CSXT rail line runs parallel and adjacent to the subject property, within approximately 150 feet to the east. The U.S. DOT Crossing Inventory Form indicates this line is also used by Amtrak. We are requesting information about the number of daytime and nighttime thru trains, as well as the average speed of those trains."
            },
            {
            "role": 'assistant',
            "content": 'Scheduling'
            },
            {
            "role": 'user',
            "content": `Categorize the following text into one of these categories, only choose one category and make sure the reponse
             has category first in the key called "category" and then explanation second in the key called "explanation": ${categories.join(',')}. Text: ${text}`
            }
        ]
        
        try{
            const response = await ollama.chat({
                model: 'phi4',
                messages: prompt,
                format:"json"
            });

            const category = response.message.content.trim();
            return category
        }
        catch(err) {
            console.log(err)
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!searchQuery.trim()) return

        const categories = ["Injuries","Accidents","Medical Records","Video","Police Department","Procurement","Media Relations","Marketing","Real Estate","Engineering","HR"]

        try{
            const category = await categorizeText(searchQuery, categories)
            setCategoryReturnString(category)
            const categoryJSON = JSON.parse(category)
            setCategoryReturnJSON(categoryJSON)
            alert(categoryJSON.category)
        } catch (err){
            console.log(err)
        } finally {
        }
    }

    function Card({children}) {
        return(
            <div className="card">
                {children}
            </div>
        )
    }

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input type="text" 
                placeholder="Enter FOIA Request..." 
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}></input>
                <button type="submit" className="search-button"> Process </button>
            </form>
            <hr></hr>
            <br></br>
            <Card>
                <h2>This FOIA request has been categorized as: {categoryReturnJSON.category}</h2>
            </Card>
            <br></br>
            <Card>
                <h2>The reason for this categorization is: {categoryReturnJSON.explanation}</h2>
            </Card>
            <hr></hr>
            <br></br>
            <Card>
                <h2>You should contact the following individuals to gather information for this request: {contactDictionary[categoryReturnJSON.category]}</h2>
            </Card>
        </div>
    );
}

export default Home
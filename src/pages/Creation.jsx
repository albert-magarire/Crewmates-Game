import { useState, useEffect } from "react"
import {supabase} from "../client"
import "./creation.css"
import wookie from "../assets/wookie.webp"
import human from "../assets/human.png"
import twilek from "../assets/twilek.jpg"
import droid from "../assets/Droid.webp"
import empty from "../assets/x-mark.png"

const Creation = () => {
    const [name, setName] = useState("")
    const [species, setSpecies] = useState("")
    const [role, setRole] = useState("")
    const [memberImage, setMemberImage] = useState()

    useEffect(() => {
        setMemberImage("")
    }, [])

    const handleNameChange = (e) => {
        const newName = e.target.value
        setName(newName)
    }

    const handleSpeciesSelect = (e) => {
        const newSpecies = e.target.value

        setSpecies(newSpecies)

        // console.log(human)

        switch(newSpecies)
        {
            case "Human":
                setMemberImage(human)
                break;
            case "Droid":
                setMemberImage(droid)
                break;
            case "Wookie":
                setMemberImage(wookie)
                break;
            case "Twilek":
                setMemberImage(twilek)
                break;
            default:
                setMemberImage(null)
        }
    }

    const handleRoleSelect = (e) => {
        const newRole = e.target.value
        setRole(newRole)
    }

    const createMember = async (e) => {
        e.preventDefault()

        const member = {name: `${name}`, species: `${species}`, role: `${role}`}

        if(!(member.name && member.species && member.role))
        {
            alert("Please fill in all fields")
            return
        }

        const {data, error} = 
            await supabase
                .from('crewMembers')
                .insert(member)
                .select()

        console.log(error)

        window.location = "/gallery"
    }

    const setImage = () => {

    }

    return(
        <div className="creation-page">
            <form className="creation-form" onSubmit={createMember}>
                <div>
                    <label>Name</label><br/>
                    <input id="name" name="name" type="text" value={name} onChange={handleNameChange}/><br/>
                </div>
                <div>
                    <label>Species</label><br/>
                    {/* <input id="species" name="species" type="text" value={species} onChange={handleSpeciesChange}/><br/><br/> */}
                    <select onChange={handleSpeciesSelect}>
                        <option>--Choose a Species--</option>
                        <option>Human</option>
                        <option>Droid</option>
                        <option>Wookie</option>
                        <option>Twilek</option>
                    </select>
                </div>

                <div>
                    <label>Role</label><br/>
                    {/* <input id="role" name="role" type="text" value={role} onChange={handleRoleChange}/><br/><br/> */}
                    <select onChange={handleRoleSelect}>
                        <option>--Choose a Role--</option>
                        <option>Pilot</option>
                        <option>Co-pilot</option>
                        <option>Gunner</option>
                        <option>Medic</option>
                        <option>Technician</option>
                    </select>
                </div>

                <input id="submit" type="submit" value="Enlist" />
            </form>
            <div className="creation-img">
                <img alt="Select a Species" style={{display: memberImage? "block" : "none"}} src={memberImage}/>
            </div>
        </div>
    )
}

export default Creation
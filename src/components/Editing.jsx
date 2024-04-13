import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { supabase } from "../client"
import "./editing.css"
import wookie from "../assets/wookie.webp"
import human from "../assets/human.png"
import twilek from "../assets/twilek.jpg"
import droid from "../assets/Droid.webp"

const Editing = ({crewMembers}) => {
    const {id} = useParams()
    const [name, setName] = useState()
    const [species, setSpecies] = useState()
    const [role, setRole] = useState()
    const [memberImage, setMemberImage] = useState()

    useEffect(() => {

        if(crewMembers && crewMembers.length > 0)
        {
            
            const memb = crewMembers.filter((mem) => mem.id === parseInt(id))[0]

            // console.log(memb)

            setName(memb.name)
            setSpecies(memb.species)
            setRole(memb.role)
        }

    }, [crewMembers])

    useEffect(() => {
        switch(species)
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
    }, [species])
    
    const handleNameChange = (e) => {
        const newName = e.target.value
        setName(newName)
    }

    const handleSpeciesSelect = (e) => {
        const newSpecies = e.target.value

        setSpecies(newSpecies)

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

    const updateMember = async (e) => {
        e.preventDefault()
        const member = {name: `${name}`, species: `${species}`, role: `${role}`}

        if(!(member.name && member.species && member.role) || (member.species === "--Choose a Species--" || member.role === "--Choose a Role--"))
        {
            alert("Please fill in all fields")
            return
        }

        await supabase
            .from('crewMembers')
            .update(member)
            .eq('id', id)
        
        window.location = "/gallery";
    }

    const deleteMember = async () => {

        await supabase
            .from('crewMembers')
            .delete()
            .eq('id', id);
        
        window.location = "/gallery";
    }

    return(
        <div className="editing-page">
            {crewMembers &&
                <form className="editing-form" onSubmit={updateMember}>
                    <div>
                        <label>Name</label><br/>
                        <input id="name" name="name" type="text" value={name} onChange={handleNameChange}/><br/><br/>
                    </div>
                    <div>
                        <label>Species</label><br/>
                        <select value={species} onChange={handleSpeciesSelect}>
                            <option>--Choose a Species--</option>
                            <option>Human</option>
                            <option>Droid</option>
                            <option>Wookie</option>
                            <option>Twilek</option>
                        </select><br/><br/>
                    </div>
                    <div>
                        <label>Role</label><br/>
                        <select value={role} onChange={handleRoleSelect}>
                            <option>--Choose a Role--</option>
                            <option>Pilot</option>
                            <option>Co-pilot</option>
                            <option>Gunner</option>
                            <option>Medic</option>
                            <option>Technician</option>
                        </select><br/><br/>
                    </div>

                    <input id="submit" type="submit" value="Submit" />
                    <button onClick={deleteMember} className="deleteButton">Delete</button>
                </form>
            }
            <div className="editing-img">
                <img alt="Select a Species" style={{display: memberImage? "block" : "none"}} src={memberImage}/>
            </div>
        </div>
    )
}

export default Editing
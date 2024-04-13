import "./gallery.css"
import { Link } from "react-router-dom"
import wookie from "../assets/wookie.webp"
import human from "../assets/human.png"
import twilek from "../assets/twilek.jpg"
import droid from "../assets/Droid.webp"

const Gallery = ({crewMembers}) => {

    const handleImg = (species) => {

        switch(species)
        {
            case "Human":
                return human
                break;
            case "Droid":
                return droid
                break;
            case "Wookie":
                return wookie
                break;
            case "Twilek":
                return twilek
                break;
            default:
                return null
        }
    }

    return(
        <>
        {crewMembers && crewMembers.length > 0?

            <div className="gallery-page" style={{height: (crewMembers.length <= 3)? "100vh" : "max-content"}}>
                <div className="members-container">
                        {crewMembers.map((member, index) => {
                            return(
                                <div className="member-card">
                                    <h2>{member.name}</h2>
                                    <img src={handleImg(member.species)}/>
                                    <p>{member.species}</p>
                                    <p>{member.role}</p>
                                    <div className="edit-link">
                                    <Link to={`/editing/${member.id}`}>Edit Member</Link><br/>
                                    </div>
                                    <div className="member-link">
                                        <Link to={`/member/${member.id}`}>Member Details</Link>
                                    </div>
                                </div>
                            )
                        })}
                </div>      
            </div>
            :
            ""}
        </>
    )
}

export default Gallery
import { useParams, Link } from "react-router-dom"
import {useState, useEffect} from "react"
import { supabase } from "../client"
import "./memberview.css"


const MemberView = ({crewMembers}) => {
    const [member, setMember] = useState()
    const {id} = useParams()

    useEffect(() => {
        const fetchMember = async () => {
            const {data, error} = 
                await supabase
                    .from('crewMembers')
                    .select()
                    .eq('id', id)
            
            setMember(crewMembers? data[0] : null)
        }

        fetchMember()


    }, [crewMembers])

    return(
        <div className="memberview-page">
            {member &&
                <div className="member-data">
                    <h2>{member.name}</h2>
                    <p>{member.species}</p>
                    <p>{member.role}</p> <br/><br/>
                    <p>Is this the kind of crew mate you need?</p><br/>
                    <div className="edit-link">
                        <Link to={`/editing/${member.id}`}>Edit Member</Link>
                    </div>
                </div>
            }
        </div>
    )
}

export default MemberView
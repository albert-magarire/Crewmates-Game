import { useEffect, useState } from 'react'
import { useRoutes } from 'react-router-dom'
import Sidebar from "./components/SideBar.jsx"
import Gallery from "./pages/Gallery.jsx"
import Creation from "./pages/Creation.jsx"
import Editing from "./components/Editing.jsx"
import Home from './pages/Home.jsx'
import MemberView from './components/MemberView.jsx'
import { supabase } from './client.js'
import './App.css'

function App() {
  const [crewMembers, setCrewMembers] = useState()

  useEffect(() => {
    const fetchCrewMembers = async () => {

      //get all crew members from database and set them to state

      const {data} = await supabase
        .from('crewMembers')
        .select()
        .order('created_at', { ascending: true })
        setCrewMembers(data)
    }

    fetchCrewMembers()
  }, [])

  let element = useRoutes([
    {
      path:"/",
      element: <Sidebar/>,
      children: [
        {
          path:"/",
          element: <Home crewMembers={crewMembers}/>,
        },
        {
          path:"/gallery",
          element: <Gallery crewMembers={crewMembers} />,
        },
        {
          path:"/creation",
          element: <Creation crewMembers={crewMembers} />,
        },
        {
          path:"/editing/:id",
          element: <Editing crewMembers={crewMembers}/>,
        },
        {
          path:"/member/:id",
          element: <MemberView crewMembers={crewMembers}/>,
        },
      ]
    },
  ])



  return (
    <div className="App">
      {element}
    </div>
  )
}

export default App


import './App.css';
import Navbar from "./components/Navbar";
import Addmedicine from "./components/Addmedicine";
import Medicinedatabase from './components/medicinedatabase';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Updatemedicine from './components/updatemedicine';
import Notices from './components/Notices';
import Suggest from './components/suggest';


function App() {
  return (
    <><Router>
      <Navbar />
      <Routes> 
        <Route exact path="/Addmedicine" element={<Addmedicine />} />
        <Route exact path="/Ingredient" element={<Suggest />} />
        <Route exact path="/Medicinedatabase" element={<Medicinedatabase />} /> 
        <Route exact path="/Updatedatabase" element={<Updatemedicine/>}/>
        <Route exact path='/' element={<Notices/>}/>
        </Routes>
        </Router>
        </>
  );
}

export default App;

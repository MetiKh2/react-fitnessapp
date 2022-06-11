import './App.css';
import {Box} from "@mui/material";
import {Routes,Route} from 'react-router-dom'
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ExerciseDetails from './pages/ExerciseDetails';
function App() {
  return (
    <Box width={480} sx={{width:{xl:'1488px'}}} m={"auto"}>
        <Navbar/>
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/exercise/:id'} element={<ExerciseDetails/>}/>
      </Routes>
      <Footer/>
    </Box>
  );
}

export default App;

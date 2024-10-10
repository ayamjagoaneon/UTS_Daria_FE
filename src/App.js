import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Homepage from './layout/Homepage';
import Proyek from './Pages/Proyek';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/proyek' element={<Proyek/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import Room from './components/Room/Room';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/:roomId" element={<Room />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


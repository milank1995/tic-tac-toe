import './App.css';
import { Routes, Route } from 'react-router-dom';
import { PlayArea } from './PlayArea';
import { PlayWithComputer } from './PlayWithComputer';


function App() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<PlayArea />} />
            <Route path="/auto" element={<PlayWithComputer />} />
        </Routes>
    </div>
  );
}

export default App;


import './App.css';
import Input from './Components/Input';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    
    <Router>
    <Routes>
      <Route path="/" element={<Input />} />
    </Routes>
  </Router>

  );
}

export default App;

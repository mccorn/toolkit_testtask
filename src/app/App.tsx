import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import RepositoryPage from './pages/RepositoryPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/home" element={<Home />} />
      <Route path="/repo/:id" element={<RepositoryPage />} />
    </Routes>
  )
}

export default App

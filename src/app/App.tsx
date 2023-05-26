import './App.css';
import Home from './pages/Home';
import RepositoryPage from './pages/RepositoryPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/repo/:id" element={<RepositoryPage />} />
    </Routes>
  )
}

export default App

import './App.css'
import Home from './pages/Home'
import RepositoryPage from './pages/RepositoryPage/index.js'
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';

function App() {
  

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/repo/:id" element={<RepositoryPage />} />
    </Routes>
  )
}

const withRouter = WrappedComponent => props => {
  const params = useParams();
  const navigate = useNavigate();

  return (
      <WrappedComponent
          {...props}
          params={params}
          navigate={navigate}
      />
  );
};

export default App

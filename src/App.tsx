import { Outlet } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';

function App() {

  return (
    <div className='app-container'>
      <NavBar />
      <div className='main-content'>
          <Outlet />
      </div>
    </div>
  )
}

export default App

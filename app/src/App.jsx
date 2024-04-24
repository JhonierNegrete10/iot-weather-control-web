
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
import Dashboard from './pages/dashboard.jsx';
// import Header from './components/Header.jsx';
function App() {


  return (
    <BrowserRouter>
        <div style={{ display: 'flex'}} >
          {/* <Sidebar /> */}
          <div className="principal" style={{ flex: 1 }} >
            {/* <Header /> */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              </Routes>
          </div>
        </div>
      </BrowserRouter>
  )
}

export default App

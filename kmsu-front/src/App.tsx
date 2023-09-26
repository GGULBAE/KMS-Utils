import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Pages from './pages';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path="/" element={<Pages.Home />} />
            {/* <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/postdetail' element={<PostDetail />} />
            <Route path='/postlist' element={<PostList />} />
            <Route path='/write' element={<PostWrite />} /> */}
            <Route path='*' element={<Pages.NotFound/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

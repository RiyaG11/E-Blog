
import './App.css';
import Nav from './components/nav';
import Footer from './components/footer';
import AddBlog from './components/addblog'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/signup';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import BlogList from './components/BlogList';
import Profile from './components/profile';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<BlogList />} />
            <Route path="/add" element={<AddBlog />} />
            <Route path="/logout" element={<h1>Logout Blogging</h1>} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;

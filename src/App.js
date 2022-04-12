import logo from './logo.svg';
import './App.css';
import Header from './components/header/Header'
import {Route,Routes} from 'react-router-dom'
import Home from './components/home/home'
import Login from './components/login/Login'
import Products from './components/product/Products';
import Dashboard from './components/dashboard/Dashboard'
import Footer from './components/footer/footer'
function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/products' element={<Products/>}/>
      <Route exact path='/dashboard' element={<Dashboard/>}/>
      <Route exact path='/login' element={<Login/>}/>
    </Routes>
    <Footer/>
    </>
  );
}

export default App;

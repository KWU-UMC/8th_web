import './App.css'
import CartList from './components/CartList'
import Navbar from './components/Navbar'
import PriceBox from './components/PriceBox'
import InitializeModal from './components/InitializeModal'

function App() {
  return (
    <>
      <Navbar/>
      <CartList/>
      <PriceBox/>
      <InitializeModal/>
  </>
  )
}

export default App

import './App.css'
import CartList from './components/CartList'
import Navbar from './components/Navbar'
import PriceBox from './components/PriceBox'
import store from './store/store'
import { Provider } from 'react-redux'
import InitializeModal from './components/InitializeModal'

function App() {
  return (
    <Provider store={store}>
      <Navbar/>
      <CartList/>
      <PriceBox/>
      <InitializeModal/>
    </Provider>
  )
}

export default App

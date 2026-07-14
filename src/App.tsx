import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { HomePage } from './pages/HomePage/HomePage'
import { CheckoutLayout } from './pages/checkout/CheckoutLayout'
import { CartStepPage } from './pages/checkout/CartStepPage'
import { DetailsStepPage } from './pages/checkout/DetailsStepPage'
import { ShippingStepPage } from './pages/checkout/ShippingStepPage'
import { SuccessStepPage } from './pages/checkout/SuccessStepPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="cart" element={<Navigate to="/checkout" replace />} />
          <Route path="checkout" element={<CheckoutLayout />}>
            <Route index element={<CartStepPage />} />
            <Route path="details" element={<DetailsStepPage />} />
            <Route path="shipping" element={<ShippingStepPage />} />
            <Route path="success" element={<SuccessStepPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

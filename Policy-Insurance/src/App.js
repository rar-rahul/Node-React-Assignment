import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Store } from './store';
import Header from './components/Header';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import PolicyDetail from './components/PolicyDetail';
import ComparePolicy from './components/ComparePolicy';
import PurchaseForm from './components/PurchaseForm';
import PaymentForm from './components/PaymentForm';
import ClaimForm from './components/ClaimForm';
import ClaimHistory from './components/ClaimHistory';
import AdminClaimList from './components/AdminClaimList'
import AdminPolicyList from './components/AdminPolicyList'
import Footer from './components/Footer';
function App() {
  return (
    <div>
      <Provider store={Store}>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/policyDetail" element={<PolicyDetail />} />
            <Route exact path="/compare" element={<ComparePolicy />} />
            <Route exact path="/purchase-policy" element={<PurchaseForm />} />
            <Route exact path="/payment" element={<PaymentForm />} />
            <Route exact path="/claim" element={<ClaimForm />} />
            <Route exact path="/claim-history" element={<ClaimHistory />} />
            <Route exact path="/viewclaims" element={<AdminClaimList />} />
            <Route exact path="/viewpolicies" element={<AdminPolicyList />} />

          </Routes>
          <Footer />
        </Router>
      </Provider>
    </div>
  );
}

export default App;

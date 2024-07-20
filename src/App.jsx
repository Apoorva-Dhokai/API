import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
        </Router>
    );
};

export default App;
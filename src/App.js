import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/layout/HeroSection';
import MarqueeBrands from './components/layout/MarqueeBrands';
import BikeList from './components/layout/BikeList';
import BikeDetails from './components/layout/BikeDetails';
import CategoryPage from './components/layout/CategoryPage';
import CategoryDetails from './components/layout/CategoryDetails'; // ✅ Import it here
import About from "./components/layout/About";
import Compare from "./components/layout/Compare";
import BrandDetails from './components/layout/BrandDetails';
import BrandPage from './components/layout/Company';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <HeroSection />
                <MarqueeBrands />
                <BikeList />
                <CategoryPage />
              </>
            } />
            <Route path="/bike/:id" element={<BikeDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/brand/:brandId" element={<BrandDetails />} />
            <Route path="/brandspage" element={<BrandPage />} />
            <Route path="/category/:categoryName" element={<CategoryDetails />} /> {/* ✅ Added route */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

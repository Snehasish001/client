import Marquee from "react-fast-marquee";
import { Link } from 'react-router-dom';
import bmwLogo from '../assets/bmw.webp';
import heroLogo from '../assets/hero.webp';
import ktmLogo from '../assets/ktm.webp';
import kawasakiLogo from '../assets/kawasaki.webp';
import yamahaLogo from '../assets/yamaha.webp';
import royalEnfieldLogo from '../assets/royal-enfield.webp';
import bajajLogo from '../assets/bajaj.webp';
import ducatiLogo from '../assets/ducati.webp';
import '../styles/MarqueeBrands.css'
const brands = [
  { id: "yamaha", name: "Yamaha", logo: yamahaLogo },
  { id: "hero", name: "Hero", logo: heroLogo },
  { id: "ktm", name: "KTM", logo: ktmLogo },
  { id: "royal-enfield", name: "Royal Enfield", logo: royalEnfieldLogo },
  { id: "bajaj", name: "Bajaj", logo: bajajLogo },
  { id: "ducati", name: "Ducati", logo: ducatiLogo },
  { id: "bmw", name: "BMW", logo: bmwLogo },
  { id: "kawasaki", name: "Kawasaki", logo: kawasakiLogo }
];

const MarqueeBrands = () => {
  return (
    <div className="marquee-wrapper">
      <Marquee pauseOnHover={true} speed={50} gradient={false}>
        {brands.map((brand, idx) => (
          brand.logo && (
            <Link to={`/brand/${brand.id}`} key={idx} className="brand-card">
              <img src={brand.logo} alt={brand.name} className="brand-logo" />
            </Link>
          )
        ))}
      </Marquee>
    </div>
  );
};

export default MarqueeBrands;


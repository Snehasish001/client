import { Link } from 'react-router-dom';  // Import Link here

import bmwLogo from '../assets/bmw.webp';
import heroLogo from '../assets/hero.webp';
import ktmLogo from '../assets/ktm.webp';
import kawasakiLogo from '../assets/kawasaki.webp';
import yamahaLogo from '../assets/yamaha.webp';
import royalEnfieldLogo from '../assets/royal-enfield.webp';
import bajajLogo from '../assets/bajaj.webp';
import ducatiLogo from '../assets/ducati.webp';

import '../styles/Company.css';

const brands = [
  { id: 'bmw', name: 'BMW', logo: bmwLogo },
  { id: 'hero', name: 'Hero MotoCorp', logo: heroLogo },
  { id: 'ktm', name: 'KTM', logo: ktmLogo },
  { id: 'kawasaki', name: 'Kawasaki', logo: kawasakiLogo },
  { id: 'yamaha', name: 'Yamaha', logo: yamahaLogo },
  { id: 'royal-enfield', name: 'Royal Enfield', logo: royalEnfieldLogo },
  { id: 'bajaj', name: 'Bajaj', logo: bajajLogo },
  { id: 'ducati', name: 'Ducati', logo: ducatiLogo },
];

const overview = `
  The world’s leading motorcycle brands offer a remarkable diversity of machines tailored for every type of rider. From BMW’s precision-engineered premium bikes to Hero MotoCorp’s mass-market appeal,
  KTM’s aggressive off-road and street performance, Kawasaki and Yamaha’s innovative engineering, Royal Enfield’s timeless classics,
  Bajaj’s affordable and reliable commuters, and Ducati’s iconic Italian sportbikes — these brands together shape the global motorcycle landscape,
  providing enthusiasts with unparalleled options that range from daily practical rides to thrilling high-performance machines.
`;

const BrandPage = () => {
  return (
    <div className='brandPageContainer'>
      <h1>Explore Top Motorcycle Brands</h1>
      <p className='overviewText'>{overview}</p>

      <div className="brandsGrid">
        {brands.map(({ id, name, logo }) => (
          <Link
            to={`/brand/${id}`}
            key={id}
            className="brandBox"
            style={{ textDecoration: 'none' }} // remove underline from Link
          >
            <img src={logo} alt={`${name} Logo`} className="brandLogo" />
            {/* <h3 className={styles.brandName}>{name}</h3> */}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BrandPage;

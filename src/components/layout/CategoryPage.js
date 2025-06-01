// src/components/Motorcycles/CategoryPage.js
import '../styles/CategoryPage.css';
import { Link } from 'react-router-dom';


import AdventureImg from '../assets/Bike categories/Adventure.png';
import CruiserImg from '../assets/Bike categories/Cruiser.png';
import DirtImg from '../assets/Bike categories/Dirt.png';
import RetroImg from '../assets/Bike categories/Retro.png';
import SportImg from '../assets/Bike categories/sports.png';
import StreetImg from '../assets/Bike categories/street.png';
import SuperSportImg from '../assets/Bike categories/super.png';
import TourerImg from '../assets/Bike categories/Tourer.png';

const categories = [
    { name: 'Street', image: StreetImg },
    { name: 'Sport', image: SportImg },
    { name: 'Adventure', image: AdventureImg },
    { name: 'Cruiser', image: CruiserImg },
    { name: 'SuperSport', image: SuperSportImg },
    { name: 'Retro', image: RetroImg },
    { name: 'Tourer', image: TourerImg },
    { name: 'Dirt', image: DirtImg },
];

function CategoryPage() {
    return (
        <section className="category-section-homepage">
            <h2>Browse by Category</h2>
            <div className="categories-grid-homepage">
                {categories.map((category, index) => (
                    <Link
                        to={`/category/${category.name}`}
                        key={index}
                        className="category-item-homepage"
                    >
                        <img
                            src={category.image}
                            alt={category.name}
                            className="category-image-homepage"
                        />
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default CategoryPage;

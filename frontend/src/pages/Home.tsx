import { HeroSection } from '../components/home/HeroSection';
import { Categories } from '../components/home/Categories';
import { RestaurantGrid } from '../components/home/RestaurantGrid';
import { restaurants } from '../data/mockData';

export function Home() {
  return (
    <div>
      <HeroSection />
      <Categories />
      <RestaurantGrid restaurants={restaurants} />
    </div>
  );
}
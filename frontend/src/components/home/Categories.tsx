import { 
  Pizza, 
  Sandwich, 
  Salad, 
  Coffee, 
  IceCream, 
  Beef, 
  Fish, 
  Soup
} from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  { name: 'Pizza', icon: Pizza, color: 'bg-red-100 text-red-500' },
  { name: 'Burgers', icon: Sandwich, color: 'bg-amber-100 text-amber-500' },
  { name: 'Salads', icon: Salad, color: 'bg-green-100 text-green-500' },
  { name: 'Coffee', icon: Coffee, color: 'bg-brown-100 text-amber-700' },
  { name: 'Dessert', icon: IceCream, color: 'bg-purple-100 text-purple-500' },
  { name: 'Steak', icon: Beef, color: 'bg-rose-100 text-rose-500' },
  { name: 'Seafood', icon: Fish, color: 'bg-blue-100 text-blue-500' },
  { name: 'Soup', icon: Soup, color: 'bg-orange-100 text-orange-500' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export function Categories() {
  return (
    <section className="py-12 bg-muted">
      <div className="container">
        <h2 className="text-2xl font-bold mb-8 text-center">Explore Categories</h2>
        
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {categories.map((category) => (
            <motion.a
              key={category.name}
              href="#"
              className="flex flex-col items-center justify-center p-4 rounded-lg transition-transform hover:scale-105"
              variants={item}
            >
              <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mb-3`}>
                <category.icon className="h-8 w-8" />
              </div>
              <span className="text-sm font-medium">{category.name}</span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
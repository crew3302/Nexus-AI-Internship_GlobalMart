import React from 'react';
import { motion } from 'framer-motion';
import { Award, Target, Users, Globe, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

// Animation variants for a smooth, staggered entrance effect
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 12 },
  },
};

// Your company's core principles
const values = [
    { icon: Award, title: 'A Commitment to Quality', description: 'We don’t just sell products; we stand by them. Every item in our collection is rigorously vetted to meet our high standards of craftsmanship, durability, and value.' },
    { icon: Users, title: 'A Customer-First Philosophy', description: 'Your satisfaction is the foundation of our business. We are dedicated to providing a seamless, supportive, and responsive customer experience at every touchpoint.' },
    { icon: Globe, title: 'Global Vision, Local Heart', description: 'We bring the world’s best trends and innovations to your doorstep, all while understanding and catering to the unique needs of the Pakistani market.' },
];

export const AboutPage: React.FC = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
      {/* --- HERO SECTION --- */}
      <motion.section variants={itemVariants} className="text-center mb-24">
        <h1 className="text-4xl lg:text-6xl font-poppins font-extrabold text-primary-text mb-4">
          About GlobalMart
        </h1>
        <p className="text-lg text-slate-300 font-roboto max-w-3xl mx-auto">
          GlobalMart was born from a desire to bridge the gap between exceptional, world-class products and the Pakistani shopper. We believe that quality should be accessible, not a luxury.
        </p>
      </motion.section>

      {/* --- MISSION & VISION SECTION --- */}
      <motion.section variants={containerVariants} className="grid md:grid-cols-2 gap-12 items-center mb-24">
        <motion.div variants={itemVariants}>
          <img 
            src="https://media.istockphoto.com/id/1449490038/photo/online-shopping-and-e-commerce-technology-concept-shopper-using-computer-laptop-to-input.jpg?b=1&s=612x612&w=0&k=20&c=dtFLguRoyXUeOZsadaCbvQ8g9MdZ9vxNYhrOqFssIrc=" 
            alt="The GlobalMart team planning and collaborating"
            className="rounded-2xl shadow-2xl shadow-primary-accent/15"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <h2 className="text-3xl font-poppins font-bold text-primary-accent mb-4 flex items-center gap-3">
            <Target className="w-8 h-8"/> Our Mission
          </h2>
          <p className="text-slate-300 font-roboto leading-relaxed text-lg">
            Our mission is to empower consumers by providing a trusted and seamless platform for discovering high-quality products. We leverage technology to create a shopping experience that is not only user-friendly and secure but also inspiring. We are committed to building lasting relationships based on transparency, reliability, and a shared passion for excellence.
          </p>
        </motion.div>
      </motion.section>
      
      {/* --- OUR CORE PRINCIPLES SECTION --- */}
      <motion.section variants={itemVariants} className="mb-24">
          <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-white">Our Core Principles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 text-center"
                    whileHover={{ y: -8, scale: 1.03, boxShadow: '0 12px 25px rgba(129, 140, 248, 0.1)' }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                      <div className="flex justify-center mb-4">
                          <div className="p-4 bg-primary-accent/10 rounded-full border border-primary-accent/20">
                              <value.icon className="w-8 h-8 text-primary-accent" />
                          </div>
                      </div>
                      <h3 className="text-xl font-poppins font-semibold text-white mb-2">{value.title}</h3>
                      <p className="text-slate-400 font-roboto">{value.description}</p>
                  </motion.div>
              ))}
          </div>
      </motion.section>

      {/* --- EXPLORE PRODUCTS CTA SECTION --- */}
      <motion.section 
        variants={itemVariants}
        className="bg-gradient-to-r from-primary-accent/80 to-indigo-500/80 rounded-2xl p-12 text-center flex flex-col items-center"
      >
        <h2 className="text-3xl font-poppins font-bold text-white mb-4">
          Discover Your Next Favorite Thing
        </h2>
        <p className="text-lg text-indigo-100 max-w-2xl mx-auto mb-8">
          Our curated collection is waiting for you. Step into a world of quality and innovation, and find what you've been looking for.
        </p>
        <Link to="/products">
            <Button size="lg" variant="secondary" className="group">
                Explore Our Products
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
        </Link>
      </motion.section>
    </motion.div>
  );
};
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    // --- UPDATED SHOP SECTION TO MAIN PAGES ---
    {
      title: 'Quick Links',
      links: [
        { name: 'Home', href: '/' },
        { name: 'Products', href: '/products' },
        { name: 'About Us', href: '/about' },
        { name: 'Contact Us', href: '/contact' },
      ]
    },
    // --- ORIGINAL CUSTOMER SERVICE SECTION ---
    {
      title: 'Customer Service',
      links: [
        { name: 'Shipping Info', href: '/shipping-info' },
        { name: 'Returns', href: '/returns' },
        { name: 'FAQ', href: '/faq' },
      ]
    },
    // --- ORIGINAL ABOUT SECTION ---
    {
      title: 'Company',
      links: [
        { name: 'Our Story', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press', href: '/press' },
        { name: 'Privacy Policy', href: '/privacy-policy' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <footer className="bg-slate-900/70 border-t border-slate-700/80 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <motion.div
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
              className="lg:col-span-1"
            >
              <div className="flex items-center mb-4">
                <span className="font-poppins text-xl font-bold text-primary-accent">
                  GlobalMart
                </span>
              </div>
              
              <p className="text-slate-300 font-roboto text-sm mb-6 max-w-sm">
                Your premier online shopping destination for quality products, unbeatable prices, and exceptional service.
              </p>

              <div className="space-y-3 text-sm font-roboto">
                <a href="mailto:support@globalmart.com" className="flex items-center text-slate-300 hover:text-primary-accent transition-colors">
                  <Mail className="w-4 h-4 mr-3 text-primary-accent" />
                  support@globalmart.com
                </a>
                <a href="tel:+923001234567" className="flex items-center text-slate-300 hover:text-primary-accent transition-colors">
                  <Phone className="w-4 h-4 mr-3 text-primary-accent" />
                  +92 300 1234567
                </a>
                <div className="flex items-center text-slate-300">
                  <MapPin className="w-4 h-4 mr-3 text-primary-accent" />
                  Blue Area, Islamabad, Pakistan
                </div>
              </div>
            </motion.div>

            {/* Link Sections */}
            {footerSections.map((section, index) => (
              <motion.div
                key={section.title}
                custom={index + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
              >
                <h3 className="font-poppins font-semibold text-white text-lg mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-slate-300 hover:text-primary-accent transition-colors font-roboto text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="py-6 border-t border-slate-700/80">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 font-roboto text-sm mb-4 md:mb-0">
              © {currentYear} GlobalMart. All rights reserved.
            </p>

            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary-accent transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div >
          </div>
        </div>
      </div>
    </footer>
  );
};
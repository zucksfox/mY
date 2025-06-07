import { useState } from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import logoGif from '../assets/zuckf0x.gif';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { title: 'Home', to: 'home' },
    //{ title: 'Skills', to: 'skills' },
    { title: 'Projects', to: 'projects' },
    //{ title: 'Fun Tools', to: 'fun-tools' },
  ];

  return (
    <nav className="fixed w-full bg-primary-light/90 dark:bg-primary/90 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 py-2 md:py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <img src={logoGif} alt="ZucksFox Logo" className="h-12 sm:h-16 md:h-20 w-auto" />
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 lg:space-x-8">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={item.to}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="nav-link text-base lg:text-lg"
                >
                  {item.title}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-textPrimary-light dark:text-textPrimary hover:text-secondary-light dark:hover:text-secondary transition-colors p-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4">
            {menuItems.map((item) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  to={item.to}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="nav-link block text-lg px-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar; 
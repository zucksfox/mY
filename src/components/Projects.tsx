import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const projects = [
  {
    title: 'NyuratS',
    description: 'Aplikasi Android Pembuatan Surat Desa Menggunakan Dart',
    image: '/Nyurats.png', // Add your project image
    tech: ['Dart', 'Flutter'],
    github: 'https://github.com/fahrurmon/nyurat',
  },
  {
    title: 'Zoum Butik Web Catalog',
    description: 'Sebuah web catalog untuk butik zoum, menggunakan Next.js, Tailwind CSS, dan TypeScript.',
    image: '/porto2.png', // Add your project image
    tech: ['TypeScript', 'Next.js', 'Tailwind CSS'],
    github: 'https://github.com/zucksfox/butikbayu',
    live: 'https://butikbayu.vercel.app',
  },
  {
    title: 'Bukit Barede Web Information',
    description: 'Sebuah web informasi untuk bukit barede, menggunakan HTML dan Javascript.',
    image: '/barede.png', // Add your project image
    tech: ['Html', 'Javascript'],
    github: 'https://github.com/fahrurmon/bukittestbarede',
    live: 'https://bukittestbarede.vercel.app/',
  },
];

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      rotateY: direction > 0 ? 45 : -45,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      rotateY: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      rotateY: direction < 0 ? 45 : -45,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + projects.length) % projects.length);
  };

  return (
    <section id="projects" className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="section-title">Featured Projects</h2>
          
          <div className="relative h-[600px] mt-12 perspective-1000">
            <div className="absolute w-full h-full flex items-center justify-center">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    rotateY: { duration: 0.8, ease: "easeInOut" },
                    opacity: { duration: 0.4 }
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);
                    if (swipe < -swipeConfidenceThreshold) {
                      paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                      paginate(-1);
                    }
                  }}
                  className="absolute w-full max-w-4xl bg-primary-light dark:bg-primary/50 rounded-xl shadow-2xl overflow-hidden"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="grid md:grid-cols-2 gap-6 p-6">
                    <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden">
                      <img
                        src={projects[currentIndex].image}
                        alt={projects[currentIndex].title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="text-2xl font-bold mb-4">{projects[currentIndex].title}</h3>
                      <p className="text-textSecondary-light dark:text-textSecondary mb-6">
                        {projects[currentIndex].description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {projects[currentIndex].tech.map((tech) => (
                          <span key={tech} className="skill-tag">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        <a
                          href={projects[currentIndex].github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary !px-4 !py-2 flex items-center gap-2"
                        >
                          <FaGithub /> Code
                        </a>
                        <a
                          href={projects[currentIndex].live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary !px-4 !py-2 flex items-center gap-2"
                        >
                          <FaExternalLinkAlt /> Live Demo
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation buttons */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-secondary-light/20 dark:bg-secondary/20 text-secondary-light dark:text-secondary hover:bg-secondary-light/30 dark:hover:bg-secondary/30 transition-colors z-10"
              onClick={() => paginate(-1)}
            >
              <FaChevronLeft size={24} />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-secondary-light/20 dark:bg-secondary/20 text-secondary-light dark:text-secondary hover:bg-secondary-light/30 dark:hover:bg-secondary/30 transition-colors z-10"
              onClick={() => paginate(1)}
            >
              <FaChevronRight size={24} />
            </button>

            {/* Dots indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const direction = index > currentIndex ? 1 : -1;
                    setDirection(direction);
                    setCurrentIndex(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex
                      ? 'bg-secondary-light dark:bg-secondary'
                      : 'bg-secondary-light/20 dark:bg-secondary/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 
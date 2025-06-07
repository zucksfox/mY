import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { useState, useRef } from 'react';

const Hero = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse position values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring animation config
  const springConfig = { damping: 15, stiffness: 150 };

  // Create smooth spring animations
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isOpening) return;

    const rect = cardRef.current.getBoundingClientRect();
    
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const normalizedX = (mouseX / rect.width) - 0.5;
    const normalizedY = (mouseY / rect.height) - 0.5;

    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = () => {
    if (!isFlipped) {
      setIsOpening(true);
      // Trigger gift opening animation
      setTimeout(() => {
        setIsFlipped(true);
        setIsOpening(false);
      }, 1000);
    } else {
      setIsFlipped(false);
    }
  };

  const socialLinks = [
    {
      icon: <FaGithub size={24} />,
      href: 'https://github.com/zucksfox',
      label: 'GitHub',
    },
    {
      icon: <FaLinkedin size={24} />,
      href: 'https://linkedin.com/in/fahrur-anshori',
      label: 'LinkedIn',
    },
    {
      icon: <FaEnvelope size={24} />,
      href: 'mailto:fahrurans@gmail.com',
      label: 'Email',
    },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-secondary-light dark:text-secondary mb-4 font-medium"
            >
              Hi, my name is
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-textPrimary-light dark:from-textPrimary to-secondary-light dark:to-secondary"
            >
              Fahrur Anshori
            </motion.h1>
          </div>

          {/* 3D Gift Box Card */}
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-[360px] h-[360px] mx-auto perspective-1000 cursor-pointer mb-12"
            onClick={handleClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX: !isFlipped && !isOpening ? rotateX : 0,
              rotateY: !isFlipped ? rotateY : 180,
              transformStyle: "preserve-3d",
              scale: isOpening ? 1.1 : 1,
            }}
          >
            {/* Front of card (Gift Box) */}
            <motion.div
              className="absolute w-full h-full backface-hidden"
              style={{ rotateY: 0 }}
              animate={isOpening ? {
                scale: [1, 1.2, 0.8],
                rotateZ: [0, -10, 10, 0],
              } : {}}
              transition={{ duration: 1 }}
            >
              <motion.div 
                className="w-full h-full bg-primary-light dark:bg-primary/50 rounded-2xl p-6 shadow-xl border border-secondary-light/20 dark:border-secondary/20 flex flex-col justify-center items-center"
                animate={isOpening ? {
                  boxShadow: [
                    "0px 0px 0px rgba(100, 255, 218, 0)",
                    "0px 0px 30px rgba(100, 255, 218, 0.5)",
                    "0px 0px 0px rgba(100, 255, 218, 0)"
                  ]
                } : {}}
                transition={{ duration: 1 }}
              >
                <motion.div 
                  className="w-32 h-32 rounded-full bg-secondary-light/20 dark:bg-secondary/20 mb-6 overflow-hidden"
                  animate={isOpening ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, 360],
                  } : {}}
                  transition={{ duration: 1 }}
                >
                  <img
                    src="/box.png"
                    alt="Gift Box"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.h2 
                  className="text-2xl font-bold mb-2"
                  animate={isOpening ? {
                    scale: [1, 1.2, 1],
                    color: ["#64ffda", "#ffffff", "#64ffda"]
                  } : {}}
                  transition={{ duration: 1 }}
                >
                  Just Click Here!!!
                </motion.h2>
                <motion.p 
                  className="text-textSecondary-light dark:text-textSecondary text-center"
                  animate={isOpening ? { opacity: [1, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  Click to see more about me
                </motion.p>
              </motion.div>
            </motion.div>

            {/* Back of card (Content) */}
            <motion.div
              className="absolute w-full h-full backface-hidden"
              style={{ rotateY: 180 }}
            >
              <motion.div 
                className="w-full h-full bg-primary-light dark:bg-primary/50 rounded-2xl p-6 shadow-xl border border-secondary-light/20 dark:border-secondary/20 flex flex-col justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: isFlipped ? 1 : 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.h3 
                  className="text-xl font-bold mb-4"
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  I need a job plzzzz!!!
                </motion.h3>
                <motion.p 
                  className="text-textSecondary-light dark:text-textSecondary mb-6"
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  I specialize in building exceptional digital experiences with Python and JavaScript.
                  Focused on creating innovative and user-friendly applications.
                </motion.p>
                <motion.div 
                  className="flex justify-center space-x-6 mt-auto"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.1 }}
                >
                  {socialLinks.map((link) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-textSecondary-light dark:text-textSecondary hover:text-secondary-light dark:hover:text-secondary transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {link.icon}
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Animated background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 animate-gradient opacity-30" />
      </div>
    </section>
  );
};

export default Hero; 
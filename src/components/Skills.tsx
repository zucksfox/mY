import { motion } from 'framer-motion';
import { FaJs, FaPython, FaReact } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiDart } from 'react-icons/si';

const Skills = () => {
  const skills = [
    { name: 'Python', icon: <FaPython size={40} />, level: 90 },
    { name: 'JavaScript', icon: <FaJs size={40} />, level: 90 },
    { name: 'TypeScript', icon: <SiTypescript size={40} />, level: 60 },
    { name: 'React', icon: <FaReact size={40} />, level: 60 },
    { name: 'Tailwind CSS', icon: <SiTailwindcss size={40} />, level: 90 },
    { name: 'Dart', icon: <SiDart size={40} />, level: 90 },
  ];

  return (
    <section id="skills" className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="section-title text-2xl md:text-3xl lg:text-4xl">Skills & Technologies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-primary/50 p-4 md:p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-secondary mb-3 md:mb-4 flex justify-center">{skill.icon}</div>
                <h3 className="text-base md:text-lg font-semibold mb-2 text-center">{skill.name}</h3>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-secondary h-2 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 
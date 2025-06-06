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
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="section-title">Skills & Technologies</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-12">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-primary/50 p-6 rounded-lg"
              >
                <div className="text-secondary mb-4">{skill.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <motion.div
                    className="bg-secondary h-2.5 rounded-full"
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
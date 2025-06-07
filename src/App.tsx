import Navbar from './components/Navbar';
import Hero from './components/Hero';
//import Skills from './components/Skills';
import Projects from './components/Projects';
//import FunTools from './components/FunTools';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="bg-primary-light dark:bg-primary min-h-screen text-textPrimary-light dark:text-textPrimary transition-colors duration-300">
        <Navbar />
        <Hero />   
        {/*<Skills />*/}
        <Projects />
        {/*<FunTools />*/}
        <ThemeToggle />
      </div>
    </ThemeProvider>
  );
}

export default App;

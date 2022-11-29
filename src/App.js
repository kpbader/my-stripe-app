import Header from './components/header/header';
import Hero from './components/hero/hero';
import MainSection from './components/main-section/main-section';
import './App.scss';
import FeaturedCollection from './components/featured-collection/featured-collection';

// import { Route } from 'react-router';


function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <MainSection />
      <FeaturedCollection />
    </div>
  );
}

export default App;

import React from 'react';
import PortCatRails from './PortCatRails';
import HeroSlider from './HeroSlider';
import Footer from './Footer'
import AboutSection from './AboutSection';

const HomePage = () => (
    <div className="home-page">
        <HeroSlider />
        <AboutSection />
        <PortCatRails />
        <Footer />
    </div>
);


export default HomePage;
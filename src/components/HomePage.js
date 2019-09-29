import React from 'react';
import PortCatRails from './PortCatRails';
import HeroSlider from './HeroSlider';
import Footer from './Footer'
import AboutSection from './AboutSection';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="home-page">
                <HeroSlider />
                <AboutSection />
                <PortCatRails />
                <Footer />
            </div>
            )        
    }

};


export default HomePage;
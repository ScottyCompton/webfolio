import React from 'react';
import PortCatRails from './PortCatRails';
import HeroSlider from './HeroSlider';
import Footer from './Footer'
import AboutSection from './AboutSection';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const returnOffsetTop = localStorage.getItem('returnOffsetTop') || 0;
        const doReturnHome = localStorage.getItem('returnhome') === '1';
        if(doReturnHome) {
            localStorage.setItem('returnhome','0');
            window.scrollTo(0,returnOffsetTop);
        }    
    }    

    render() {
        return (
            <div id="home-page" className="home-page">
                <HeroSlider />
                <AboutSection />
                <PortCatRails />
                <Footer />
            </div>
            )        
    }

};


export default HomePage;
import React from 'react';
import { connect } from 'react-redux';
import portCategories from '../fixtures/portcats';
import { Link } from 'react-router-dom';
import uuid from 'uuid';
import Slider from 'react-slick';
import SliderArrow from './SliderArrow';
import GalleryTile from './GalleryTile';
import { history } from '../routers/AppRouter';


class PortfolioItemDetailsPage extends React.Component {
    constructor(props) {
        super(props)
        var w = window.innerWidth;
        var h = window.innerHeight;

        this.state = {
            galleryMode: props.portfolioItem.auxImgs && props.portfolioItem.auxImgs.length === 1 ? 'slideshow' : 'tile'
        }
        
    }

    handleReturn = (e) => {
        e.preventDefault();
        // this is to makesure that the home page scroller only works
        // once when componentDidMount() fires on the home page load.
        localStorage.setItem('returnhome','1');

        history.push('/');
    }


    toggleGalleryMode = (e, idx) => {
        e.preventDefault();

        var w = window.innerWidth;
        var h = window.innerHeight;
        if(w < 768) {
            return false;
        }

        this.setState({
            galleryMode: this.state.galleryMode === 'tile' ? 'slideshow' : 'tile'
        })
        setTimeout(() => {
            if(this.state.galleryMode === 'slideshow') {
                this.slider.slickGoTo(idx);
            }
        }, 500)
    }


    render() {

    
        const sliderSettings = {
            dots: false,
            infinite: true,
            speed: 1000,
            ladyLoad: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            swipeToSlide: true,
            centerPadding: "60px",
            arrows: true,
            centerMode: false,
            nextArrow: <SliderArrow type='next' />,
            prevArrow: <SliderArrow type='prev' />,

        }

        const {
            projectTitle,
            shortDesc,
            longDesc,
            previewImg,
            auxImgs,
            githubUrl,
            projectUrl,
            portcats,
            techSpecs,
            auxImgAspectRatio = "64.3"
        } = this.props.portfolioItem;

        const logoStyle = {
            backgroundImage: `url(${previewImg})`
        }

        let aryCats = [];
        
        portCategories.forEach((cat) => {
            const idx = portcats.findIndex((portcat) => {
                return portcat+'' === cat.id+''
            })
            if(idx !== -1) {

                aryCats.push(`${cat.name} / `)
            }
        })

        // remove the slash from the end of the last category or it'll look weird
        aryCats[aryCats.length-1] = aryCats[aryCats.length-1].replace(' / ', '');

        const tilesClass = this.state.galleryMode === 'tile' ? 'Portfolio-Item__Gallery--tiles content--active' : 'Portfolio-Item__Gallery--tiles content--inactive';
        const slideClass = this.state.galleryMode === 'slideshow' ? 'Portfolio-Item__Gallery--slideshow content--active' : 'Portfolio-Item__Gallery--slideshow content--inactive';
        
        return (
            <div className="Portfolio-Item hide-on-nav">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="Portfolio-Item__Container">
                                <div className="Portfolio-Item__Head">
                                    <div className="Portfolio-Item__Logo">
                                        <img src="/images/nothing.png" />
                                        <div className="Portfolio-Item__Logo--container">
                                            <div className="Portfolio-Item__Logo--img" style={logoStyle}></div>
                                        </div>
                                    </div>
                                    <div className="Portfolio-Item__Summary">
                                        <h1 className="Portfolio-Item__Title text-primary">{projectTitle}</h1>
                                        <h6>{shortDesc}</h6>
                                        <div className="Portfolio-Item__Subdetails">
                                        {projectUrl && 
                                            <div className="Portfolio-Item__Subdetail">
                                                <div className="Subdetail_left text-primary">Website: </div>
                                                <div className="Subdetail_right"><a href={`${projectUrl}`} target="_blank">{projectUrl}</a></div>
                                            </div>                                        
                                        }
                                        {githubUrl && 
                                            <div className="Portfolio-Item__Subdetail">
                                                <div className="Subdetail_left text-primary">Github URL: </div>
                                                <div className="Subdetail_right">http://somewebsite.com</div>
                                            </div>                                        
                                        }
                                        {techSpecs && 
                                                <div className="Portfolio-Item__Subdetail">
                                                <div className="Subdetail_left text-primary">Technologies Used: </div>
                                                <div className="Subdetail_right">{techSpecs}</div>
                                            </div>                                            
                                        }

                                        </div>
                                    </div>
                                </div>

                                <div className="Portfolio-Item__Content">
                                    <div className="Portfolio-Item__Portcats">
                                        <span  className="text-primary">Project Categories: </span>
                                        {aryCats.map((cat) => {
                                            return (
                                                <span key={uuid()}>{cat}</span>
                                                )
                                        })}
                                    </div>
                                    {longDesc && 
                                    <div className="Portfolio-Item__LongDesc section-content">
                                        <h4 className="text-primary Portfolio-Item__Subtitle">About This Project</h4>
                                        {longDesc}
                                    </div>
                                    }

                                    <div className="Portfolio-Item__Gallery section-content">
                                        <div className="Portfolio-Item__Gallery-Heading">
                                            <h4 className="float-left text-primary Portfolio-Item__Subtitle">Project Gallery</h4>
                                            {(this.state.galleryMode === 'slideshow' && auxImgs && auxImgs.length > 1) &&
                                                <Link to="#" className="float-right" onClick={this.toggleGalleryMode}>Tile View</Link>
                                            }                                    
                                        </div>
                                        <div className={tilesClass}>
                                        {this.state.galleryMode === 'tile' && 
                                        <div className="Portfolio-Item__Gallery-Imgs">
                                            {auxImgs.map((img, idx) => {
                                                return (
                                                <GalleryTile 
                                                    key={idx}
                                                    handleClick={this.toggleGalleryMode}
                                                    src={img}
                                                    idx={idx}
                                                    auxImgAspectRatio={auxImgAspectRatio}
                                                />)
                                            })}

                                            </div>
                                        }
                                        </div>
                                        <div className={slideClass}>
                                            {this.state.galleryMode === 'slideshow' &&
                                                <Slider ref={slider=> (this.slider = slider)} {...sliderSettings}>
                                                {auxImgs.map((item) => {
                                                    return (
                                                        <img  key={uuid()} src={item} />
                                                    )
                                                })}
                                                </Slider>                                  
                                        
                                            }
                                        </div>
                                    </div>                                    
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
                            <Link className="btn btn-outline-warning" onClick={this.handleReturn} to="/">Back To Porfolio</Link>
                        </div>
                    </div>
                </div>  
            </div>
        )
    }

}



const mapStateToProps = (state, props) => {

    return {
        portfolioItem: state.portfolio.find((item) => item.id === props.match.params.id)
    }
}


export default connect(mapStateToProps)(PortfolioItemDetailsPage);
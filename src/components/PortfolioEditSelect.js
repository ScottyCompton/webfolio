import React from 'react';
import { Link } from 'react-router-dom';
import portcats from '../fixtures/portcats'
import { connect } from 'react-redux'
import uuid from 'uuid';
import MessageModal from './MessageModal';
import {Accordion, useAccordionToggle} from 'react-bootstrap'


class PortfolioEditSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isDirty: false,
            showModal: false,
            navToId: '#',
            dropdownActiveClass: ''
        }
        document.addEventListener('click', this.handleDocClick);        
    }

    componentDidUpdate(prevProps) {
        const currProps = this.props;

        if(currProps && prevProps) {
            if(currProps.isDirty !== prevProps.isDirty) {
                this.setState({
                    isDirty: currProps.isDirty
                })
            }    
        }

    }


    handleItemClick = (e) => {
        e.preventDefault();
        const navToId = e.target.getAttribute('data-id');
        const isDirty = this.state.isDirty;
        //this.handleDropdownBtnClick();
        this.setState({navToId});

        if(isDirty) {
            this.setState({
                showModal: true
            })
        } else {
            setTimeout(() => {
                this.onExitConfirm();                
            }, 400);            
        }
    }

    handleDocClick = (e) => {
        const srcElement = e.srcElement

        if(srcElement.getAttribute('class') === null || !srcElement.getAttribute('class').includes('dropdown-toggle')) {
            this.setState({
                dropdownActiveClass: ''
            })            
        }
    }

    onExitConfirm = () => {
        const navToId = this.state.navToId;
        this.closeMsgModal();
        const portfolioItem = this.props.portfolio.find((item) => {
            return (
                item.id === navToId
            )
        })
        this.props.handleClick(portfolioItem)
    }


    closeMsgModal = () => {
        this.setState(
            {
               showModal: false
            }
        )
    }

    // handleDropdownBtnClick = () => {
    //     this.setState({
    //         dropdownActiveClass: this.state.dropdownActiveClass === '' ? 'dropdown-active' : '' 
    //     })
    // }

    //{this.props.portfolioItem && <EditSelectToggle eventKey="0">Edit Portfolio Item</EditSelectToggle>}


    render() {
        const portfolioItemsWithCats = portcats.map((cat) => {
            let catId = cat.id;
            let catName = cat.name;
            let portItems = this.props.portfolio.filter((item) => {     
                return (item.portcats && item.portcats.indexOf(catId+'') !== -1)                    
            })            
            return (
                portItems.length > 0 &&
                <div key={uuid()} className="portfolio-edit-select__group">
                    <h6>{catName}</h6>
                    <div className="portfolio-edit-select__list">
                        {portItems.map((item) => {
                            return (
                                <div key={uuid()} className="portfolio-edit-select__item">
                                    <Link to="#" data-id={item.id} onClick={this.handleItemClick}>{item.projectTitle}</Link>
                                </div>
                                )
                        })}  
                    </div>
                </div>
                
            )
        })

        return (
            <div>
                <MessageModal 
                onHide={this.closeMsgModal} 
                onConfirm={this.onExitConfirm} 
                show={this.state.showModal} 
                type="INFO" 
                message="You have unsaved changes. Leave without saving your changes?"
                />
                <Accordion>
                    <EditSelectToggle eventKey="0">{this.props.linkText}</EditSelectToggle>
                    <Accordion.Collapse eventKey="0">
                        <div className="portfolio-edit-select">
                            <div className="portfolio-edit-select__container">
                                {portfolioItemsWithCats}           
                            </div>
                        </div>
                    </Accordion.Collapse>
                </Accordion>
            </div>
        )                

    }


}


const mapStateToProps = (state, props) => {
    return {
        portfolio: state.portfolio
    }
}


export const EditSelectToggle = ({ children, eventKey }) => {
    const decoratedOnClick = useAccordionToggle(eventKey, () =>
      console.log('totally custom!'),
    );
    return (
        <div>
            <h5 style={{textAlign: "right"}}>
                <Link style={{color: "white"}} to="#" onClick={decoratedOnClick}>{children}</Link>
            </h5>
        </div>
    );
  }


export default connect(mapStateToProps)(PortfolioEditSelect);




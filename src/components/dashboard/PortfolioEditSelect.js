import React from 'react';
import { Link } from 'react-router-dom';
import uuid from 'uuid';
import MessageModal from './MessageModal';
import {Accordion, useAccordionToggle} from 'react-bootstrap';
import PortfolioItemsWithCats from './PortfolioItemsWithCats';

export default class PortfolioEditSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isDirty: false,
            showModal: false,
            navToId: '#',
            dropdownActiveClass: ''
        }
        //document.addEventListener('click', this.handleDocClick);        
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


    render() {


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
                    <EditSelectToggle isNew={this.props.isNew} eventKey="0">{this.props.linkText}</EditSelectToggle>
                    <Accordion.Collapse eventKey="0">
                        <div className="portfolio-edit-select">
                            <div className="portfolio-edit-select__container">
                                <PortfolioItemsWithCats onClick={this.handleItemClick} />
                            </div>
                        </div>
                    </Accordion.Collapse>
                </Accordion>
            </div>
        )                

    }


}


// const mapStateToProps = (state, props) => {
//     return {
//         portfolio: state.portfolio
//     }
// }


export const EditSelectToggle = ({ children, eventKey, isNew=false }) => {
    const decoratedOnClick = useAccordionToggle(eventKey, () =>
      console.log('totally custom!'),
    );
    return (
        <div>
            <h5 style={{textAlign: "right"}}>
                <Link style={{color: "white"}} to="#" onClick={decoratedOnClick}>{children}</Link>
                {!isNew && <Link className="portfolio-list__create-new btn btn-secondary float-right" to="/dashboard/portfolio/create">Create New Item</Link>}

            </h5>
        </div>
    );
  }

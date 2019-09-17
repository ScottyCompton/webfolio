import React from 'react';
import uuid from 'uuid';
import {Container, Row, Col, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import { startRemovePortfolioItem } from '../actions/portfolio-items';
import PortfolioEditListItem from './PortfolioEditListItem';



class PortfolioEditList extends React.Component {
    constructor(props) {
        super(props);
    }


    handleDelete = (e) => {
       const id = e.target.getAttribute('data-id');
       this.props.startRemovePortfolioItem({id})
    }

    render() {
        return (
            <Container>
            <Row>
                <Col className="col-xs-12">
                <h5 className="float-right">Your Portfolio</h5>
                </Col>
            </Row>
                
            <Row>
                <Col className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="card text-white bg-secondary mb-3">
                        <div className="portfolio-list">
                        {this.props.portfolio.map((item) => (
                            <PortfolioEditListItem key={uuid()} portfolioItem={item} handleDelete={this.handleDelete} />
                        ))}      
                        </div>          
                    </div>
                </Col>
            </Row>
        
            </Container>
        )
    }

}


const mapStateToProps = (state, props) => {
    return {
        portfolio: state.portfolio
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startRemovePortfolioItem: ({id}) => dispatch(startRemovePortfolioItem({id}))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PortfolioEditList)

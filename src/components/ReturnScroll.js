import React from 'react'

class ReturnScroll extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const returnOffsetTop = localStorage.getItem('returnOffsetTop') || 0;
        window.scrollTo({
            top: returnOffsetTop,
            behavior: 'smooth'
        })    
    
    }

    render() {
        return (
            <span></span>
        )
    }

}

export default ReturnScroll;
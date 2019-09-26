import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';


class SiteTitle extends Component {
    constructor(props) {
        super(props);
        this.titleEl = document.getElementsByTagName("title")[0];
    }

    render() {
        const {siteTitle = 'Webfolio Portfolio App'} = this.props.siteSettings;
        let fullTitle;

        if(this.props.pageTitle) {
             fullTitle = this.props.pageTitle + " - " + siteTitle;
        } else {
            fullTitle = siteTitle;
        }

        return ReactDOM.createPortal(
            fullTitle || "",
            this.titleEl
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        siteSettings: state.siteSettings
    }
}


export default connect(mapStateToProps)(SiteTitle);
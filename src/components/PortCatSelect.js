import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import uuid from 'uuid';
import portcats from '../fixtures/portcats'
import PortCatSelectItem from './PortCatSelectItem';

export class PortCatSelect extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {
        return (
            <div>
    
            {portcats.map((cat) => (
                <div key={uuid()}>
                    <PortCatSelectItem 
                        id={cat.id}
                        name={cat.name}
                        checked={this.props.compareTo ? (this.props.compareTo.indexOf(cat.id + "") !== -1 ? true : false) : false}
                        onChange={this.props.onChange}
                    />
                </div>
            ))}
        </div>
        );    
    }
}



export default PortCatSelect;
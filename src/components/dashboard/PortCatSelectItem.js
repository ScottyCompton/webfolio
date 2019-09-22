import React from 'react'


const PortCatSelectItem = ({checked, id, name, onChange}) => {
    return (
        <label>
            <input  type="checkbox" checked={checked} onChange={onChange} name="portcat" id={`portcat_${id}`} value={id} />{name}
        </label>
    );    
}


export default PortCatSelectItem;
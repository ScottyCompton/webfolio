import uuid from 'uuid';
import {db} from '../firebase/firebase';
import moment from 'moment';


export const updateSiteSettings = (updates) => {
    return ({
        type: 'UPDATE_SITE_SETTINGS',
        updates
    })
};


export const startUpdateSiteSettings = (updates) => {
    
    return(dispatch, getState) => {
        //const uid = getState().auth.uid;

        return db.ref(`settings`).update(updates).then(() => {
            dispatch(updateSiteSettings(updates));
        }).catch((err) => {
            console.log(err);
        }) ;
    }
};


// GET_SITE_SETTINGS
export const getSiteSettings = (settings) => ({
    type: 'GET_SITE_SETTINGS',
    settings
})

export const startGetSiteSettings = () => {
    return (dispatch, getState) => {
        //const uid = getState().auth.uid;
        return db.ref(`settings`).once('value').then((snapshot) => {
            dispatch(getSiteSettings(snapshot.val()));
        });
    }
}
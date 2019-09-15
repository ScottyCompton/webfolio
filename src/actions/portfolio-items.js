import uuid from 'uuid';
import {db} from '../firebase/firebase';
import moment from 'moment';

// ADD_PORTFOLIO_ITEM ACTION
export const addPortfolioItem = (portfolioItem) => {

    return {
        type: 'ADD_PORTFOLIO_ITEM',
        portfolioItem    
    };
}

export const startAddPortfolioItem = (portfolioItemData = {}) => {
    return (dispatch, getState) => {
        //const uid = getState().auth.uid;
        const {
            projectTitle = '', 
            shortDesc = '', 
            longDesc = '', 
            projectUrl = '', 
            techSpecs = '',
            previewImg = '',
            portcats = [],
            createDate = moment().valueOf(),
            lastUpdated = moment().valueOf(),
            githubUrl = ''
        } = portfolioItemData;
        
        const portfolioItem = {
            projectTitle, 
            shortDesc, 
            longDesc, 
            projectUrl,
            techSpecs,
            previewImg,
            portcats,
            createDate,
            lastUpdated,
            githubUrl
        };

        return db.ref(`portfolio`).push(portfolioItem).then((ref) => {
            dispatch(addPortfolioItem({
                id: ref.key,
                ...portfolioItem
            }))
        })
    };
};



// UPDATE_PORTFOLIO_ITEM ACTION
export const updatePortfolioItem = (id, updates) => {
    return ({
        type: 'UPDATE_PORTFOLIO_ITEM',
        id,
        updates
    })
};


export const startUpdatePortfolioItem = (id, updates) => {
    return(dispatch, getState) => {
        //const uid = getState().auth.uid;
        return db.ref(`portfolio/${id}`).update(updates).then(() => {
            dispatch(updatePortfolioItem(id, updates));
        });
    }
};



// REMOVE_PORTFOLIO_ITEM
export const removePortfolioItem = ({id} = {}) => ({
    type: 'REMOVE_PORTFOLIO_ITEM',
    id
});

export const startRemovePortfolioItem = ({id} = {}) => {
    return (dispatch, getState) => {
        //const uid = getState().auth.uid;
        return  db.ref(`portfolio/${id}`).remove().then((snapshot) => {
            dispatch(removePortfolioItem({id}));
        });
    }
};


// GET_PORTFOLIO_ITEMS
export const getPortfolioItems = (portfolioItems) => ({
    type: 'GET_PORTFOLIO_ITEMS',
    portfolioItems
})

export const startGetPortfolioItems = () => {
    return (dispatch, getState) => {
        //const uid = getState().auth.uid;
        return db.ref(`portfolio/`).once('value').then((snapshot) => {
            const portfolioItems = [];
            snapshot.forEach((childSnapshot) => {
                portfolioItems.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            });

            dispatch(getPortfolioItems(portfolioItems));
        });
    }
}
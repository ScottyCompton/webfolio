
const admPortListReducerDefaultState = {
    catId: ''
};

// filters reducer

export default (state = admPortListReducerDefaultState, action) => {
    switch(action.type) {
        case 'LIST_BY_CATEGORY':            
            return {
                ...state, 
                catId: catId
            }
        
        case 'LIST_ALL':
            return {
                ...state
            }

        default:
            return state;
    }
}

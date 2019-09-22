
const admPortListReducerDefaultState = {
    catId: '-1'
};

// filters reducer

export default (state = admPortListReducerDefaultState, action) => {
    switch(action.type) {
        case 'LIST_BY_CATEGORY':            
            return {
                ...state, 
                catId: action.catId
            }
        
        case 'LIST_ALL':
            return {
                ...state
            }

        default:
            return state;
    }
}

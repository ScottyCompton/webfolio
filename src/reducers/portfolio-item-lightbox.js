
const defaultLightBoxState = {portfolioItem: {}, lightboxClass: "--hidden"};

export default (state = defaultLightBoxState, action) => {

    switch (action.type) {

        case 'LOAD_LIGHTBOX':
            return {
                portfolioItem: action.portfolioItem,
                lightboxClass: action.lightboxClass
            }
        
        case 'SHOW_LIGHTBOX':
            return {
                ...state,
                lightboxClass: action.lightboxClass
            }

        case 'UNLOAD_LIGHTBOX':
            return {
                ...state,
                lightboxClass: action.lightboxClass
            }

        case 'HIDE_LIGHTBOX':
            return defaultLightBoxState

        default:
            return state;
        }
    }

export const loadLightbox = (portfolioItem) => {
    return {
        type: 'LOAD_LIGHTBOX',
        portfolioItem,
        lightboxClass: '--active-enter'
    }
}


export const showLightbox = () => {
    return {
        type: 'SHOW_LIGHTBOX',
        lightboxClass: '--active'
    }
}


export const unloadLightbox = () => {
    return {
        type: 'UNLOAD_LIGHTBOX',
        lightboxClass: '--active-exit'
    }
}


export const hideLightbox = () => {
    return {
        type: 'HIDE_LIGHTBOX',
        lightboxClass: '--hidden'
    }
}


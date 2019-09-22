
export const showPortfolioItemModal = (portfolioItem) => {
    return {
        type: 'SHOW_PORTFOLIO_ITEM_MODAL',
        portfolioItem
    }
}

export const hidePortfolioItemModal = () => {
    return {
        type: 'HIDE_PORTFOLIO_ITEM_MODAL'
    }
}
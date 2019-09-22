

// get portfoli by category

export default (portfolio, {catId}) => {

    if(catId !== '-1') {
        const filtered = portfolio.filter((item) => {
            return (item.portcats && item.portcats.indexOf(catId + '') !== -1)                    
         });            
         return filtered;
    } else {
        return portfolio;
    }
    // .sort((a,b) => {
    //     if(sortBy === 'date') {            
    //         return dateSortOrder === 'ASC' ? (
    //             a.dueDate < b.dueDate ? 1 : -1
    //         ) : (
    //             b.dueDate < a.dueDate ? 1 : -1
    //         );
    //     }

    //     if(sortBy === 'amount') {
    //         return amountSortOrder === 'ASC' ? 
    //         (
    //             a.amount < b.amount ? 1 : -1
    //         ) : (
    //             b.amount < a.amount ? 1 : -1
    //         );
    //     }
    // });
};
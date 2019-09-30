

// get portfoli by category

export default (portfolio, {catId}, published) => {

    if(catId !== '-1') {
        const filtered = portfolio.filter((item) => {
            if(published === undefined) {
                return ((item.portcats && item.portcats.indexOf(catId + '') !== -1))
            } else {
                return ((item.portcats && item.portcats.indexOf(catId + '') !== -1) && (item.published === published))
            }
         });
        
        const sorted = filtered.sort((a,b) => {
            if((a.cso && a.cso.length !== 0) && (b.cso && b.cso.length !== 0)) {
                const csoA = a.cso.find((item) => {
                    return (item.catId+'' === catId+'')
                })
    
                const csoB = b.cso.find((item) => {
                    return (item.catId+'' === catId+'')
                })
                if(!csoA || !csoB) {
                    return -1;
                } else {
                    return csoA.sortOrder < csoB.sortOrder ? -1 : 1    
                }
            } else {
                return -1;
            }
        })
         return sorted;
    } else {
        const sorted = portfolio.sort((a,b) => {
            return a.projectTitle < b.projectTitle ? -1 : 1
        });
        return sorted;
    }

};
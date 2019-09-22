const catList =  ['Website Design', 'Business Cards', 'Graphic Design', 'Logo Design', 'Print Media', 'Special Projects'];

const portcats = (
        catList.map((name, id) => {
            return {
                id,
                name
            }
        })
    )


export default portcats;
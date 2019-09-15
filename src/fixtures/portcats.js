const catList =  ['PHP', 'WordPress', 'React', 'Graphic Design', 'Logo Design', 'Laravel', 'Classic ASP', 'Business Cards', 'Print Media'];

const portcats = (
        catList.map((name, id) => {
            return {
                id,
                name
            }
        })
    )


export default portcats;
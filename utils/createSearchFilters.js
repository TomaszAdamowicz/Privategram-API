const searchFilter = (tag, year, user) => {
    const filters = {};

    if(tag){
        filters.tags = `#${tag}`;
    }

    if(year){
        filters.year = year;
    }

    if(user.role != "Admin"){
        filters.public = {
            $ne: false
        };
    }

    return filters;
}

module.exports = searchFilter;
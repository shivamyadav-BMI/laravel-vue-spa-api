const usePagination = function (fetchAll){
    function previousPage(pagination) {
        let prev = pagination.current_page - 1;
        fetchAll(prev);
    }

    function nextPage(pagination) {
        let next = pagination.current_page + 1;
        fetchAll(next);

    }

    return { nextPage, previousPage };
}

export default usePagination;

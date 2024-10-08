function settingsListCards(cards,show){
    let newCards = [];
    cards.length > show++ ? newCards = cards.slice(0, show - 1) : cards;
    $('.more').click(function() {
        let loadMore = $('.blog__loading-more');
        loadMore.css('display','none');
        $("#listCard").html("");
        showCard(cards);
    });
    showCard(newCards);
}

function showCard(cards) {
    $('.filter button').click(function(){
        let textFilter = $(this).val();
        let listsFilter = cards.filter(items => items.textImg === textFilter);
        $("#listCard").html("");
        listCard(listsFilter);
    });
    listCard(cards);
};

function listCard(filterCard) {
    for (let i = 0; i < filterCard.length; i++) {
        const item = filterCard[i];
        $("#listCard").append(
            `   
                <div class="card">
                    <a href=${item.href}>
                        <div class="image position-relative">
                            <img class="card-img-top" src=${item.src} alt=${item.alt}>
                            <p>${item.textImg}</p>
                        </div>
                        <div class="card-body px-0">
                            <div class="blog__date">
                                <small>${item.date}</small>
                            </div>
                            <div class="blog__title">
                                <h5>${item.title}</h5>
                            </div>
                            <div class="blog__content">
                                <p>${item.content}</p>
                            </div>
                            <div class="blog__read-more">
                                <a href=${item.href}>Read More</a>
                            </div>
                        </div>
                    </a>
                </div>
            `
        );
    }
}

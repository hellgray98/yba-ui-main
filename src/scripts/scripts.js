$(function() {
    let cards = [
        {href: "./blog-post.html", src: "./assets/imgs/blog/blog-1.jpg", alt: "blog-1", textImg: "Services", date: "12.05.2020", title: "Placeholder title of article", content: "To start, we work with you to make sure your accounting systems are properly set up."},
        {href: "./blog-post.html", src: "./assets/imgs/blog/blog-4.jpg", alt: "blog-4", textImg: "Economic Crisis", date: "12.05.2020", title: "Placeholder title of article", content: "To start, we work with you to make sure your accounting systems are properly set up."},
        {href: "./blog-post.html", src: "./assets/imgs/blog/blog-7.jpg", alt: "blog-7", textImg: "Tax", date: "12.05.2020", title: "Placeholder title of article", content: "To start, we work with you to make sure your accounting systems are properly set up."},
        {href: "./blog-post.html", src: "./assets/imgs/blog/blog-2.jpg", alt: "blog-2", textImg: "Swimming to The Safe Harbour", date: "12.05.2020", title: "Placeholder title of article", content: "To start, we work with you to make sure your accounting systems are properly set up."},
        {href: "./blog-post.html", src: "./assets/imgs/blog/blog-5.jpg", alt: "blog-5", textImg: "The Elephant In The Room", date: "12.05.2020", title: "Placeholder title of article", content: "To start, we work with you to make sure your accounting systems are properly set up."},
        {href: "./blog-post.html", src: "./assets/imgs/blog/blog-8.jpg", alt: "blog-8", textImg: "Services", date: "12.05.2020", title: "Placeholder title of article", content: "To start, we work with you to make sure your accounting systems are properly set up."},
        {href: "./blog-post.html", src: "./assets/imgs/blog/blog-3.jpg", alt: "blog-3", textImg: "Tax", date: "12.05.2020", title: "Placeholder title of article", content: "To start, we work with you to make sure your accounting systems are properly set up."},
        {href: "./blog-post.html", src: "./assets/imgs/blog/blog-6.jpg", alt: "blog-6", textImg: "Economic Crisis", date: "12.05.2020", title: "Placeholder title of article", content: "To start, we work with you to make sure your accounting systems are properly set up."},
        {href: "./blog-post.html", src: "./assets/imgs/blog/blog-9.jpg", alt: "blog-9", textImg: "Services", date: "12.05.2020", title: "Placeholder title of article", content: "To start, we work with you to make sure your accounting systems are properly set up."},
        {href: "./blog-post.html", src: "./assets/imgs/blog/blog-10.jpg", alt: "blog-10", textImg: "Services", date: "12.05.2020", title: "Placeholder title of article", content: "To start, we work with you to make sure your accounting systems are properly set up."},
        {href: "./blog-post.html", src: "./assets/imgs/blog/blog-11.jpg", alt: "blog-11", textImg: "Swimming to The Safe Harbour", date: "12.05.2020", title: "Placeholder title of article", content: "To start, we work with you to make sure your accounting systems are properly set up."},
        {href: "./blog-post.html", src: "./assets/imgs/blog/blog-12.jpg", alt: "blog-12", textImg: "Economic Crisis", date: "12.05.2020", title: "Placeholder title of article", content: "To start, we work with you to make sure your accounting systems are properly set up."},
        {href: "./blog-post.html", src: "./assets/imgs/blog/blog-13.jpg", alt: "blog-13", textImg: "Economic Crisis", date: "12.05.2020", title: "Placeholder title of article", content: "To start, we work with you to make sure your accounting systems are properly set up."},
        {href: "./blog-post.html", src: "./assets/imgs/blog/blog-14.jpg", alt: "blog-14", textImg: "Services", date: "12.05.2020", title: "Placeholder title of article", content: "To start, we work with you to make sure your accounting systems are properly set up."},
        {href: "./blog-post.html", src: "./assets/imgs/blog/blog-15.jpg", alt: "blog-15", textImg: "Tax", date: "12.05.2020", title: "Placeholder title of article", content: "To start, we work with you to make sure your accounting systems are properly set up."},
        {href: "./blog-post.html", src: "./assets/imgs/blog/blog-16.jpg", alt: "blog-16", textImg: "The Elephant In The Room", date: "12.05.2020", title: "Placeholder title of article", content: "To start, we work with you to make sure your accounting systems are properly set up."},
    ];
    settingsListCards(cards, 9);
});
$('.owl-carousel').owlCarousel({
    loop: false,
    margin: 10,
    nav: false,
    dots: false,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 1
        }
    }
});


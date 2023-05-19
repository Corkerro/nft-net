(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    function headerScroll() {
        addWindowScrollEvent = true;
        const header = document.querySelector("header.header");
        const headerShow = header.hasAttribute("data-scroll-show");
        const headerShowTimer = header.dataset.scrollShow ? header.dataset.scrollShow : 500;
        const startPoint = header.dataset.scroll ? header.dataset.scroll : 1;
        let scrollDirection = 0;
        let timer;
        document.addEventListener("windowScroll", (function(e) {
            const scrollTop = window.scrollY;
            clearTimeout(timer);
            if (scrollTop >= startPoint) {
                !header.classList.contains("_header-scroll") ? header.classList.add("_header-scroll") : null;
                if (headerShow) {
                    if (scrollTop > scrollDirection) header.classList.contains("_header-show") ? header.classList.remove("_header-show") : null; else !header.classList.contains("_header-show") ? header.classList.add("_header-show") : null;
                    timer = setTimeout((() => {
                        !header.classList.contains("_header-show") ? header.classList.add("_header-show") : null;
                    }), headerShowTimer);
                }
            } else {
                header.classList.contains("_header-scroll") ? header.classList.remove("_header-scroll") : null;
                if (headerShow) header.classList.contains("_header-show") ? header.classList.remove("_header-show") : null;
            }
            scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
        }));
    }
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    if (ScrollTrigger.isTouch !== 1) {
        ScrollSmoother.create({
            wrapper: ".wrapper",
            content: ".content",
            smooth: 2,
            effects: true
        });
        gsap.fromTo(".main__container", {
            opacity: 1
        }, {
            opacity: 0,
            scrollTrigger: {
                trigger: ".main__container",
                start: "100",
                end: "700",
                scrub: true
            }
        });
        gsap.fromTo(".about__left", {
            opacity: 0,
            x: -50
        }, {
            opacity: 1,
            x: 0,
            scrollTrigger: {
                trigger: ".about",
                scrub: true,
                start: "-500",
                end: "100"
            }
        });
        gsap.fromTo(".about__h2", {
            opacity: 0,
            x: -50
        }, {
            opacity: 1,
            x: 0,
            scrollTrigger: {
                trigger: ".about",
                scrub: true,
                start: "-700",
                end: "-200"
            }
        });
        gsap.fromTo(".about__right", {
            opacity: 0,
            x: 50
        }, {
            opacity: 1,
            x: 0,
            scrollTrigger: {
                trigger: ".about",
                scrub: true,
                start: "-500",
                end: "100"
            }
        });
    }
    window["FLS"] = true;
    isWebp();
    headerScroll();
})();
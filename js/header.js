document.addEventListener("DOMContentLoaded",()=>{

    const header = document.querySelector(".header-smart")
    const btnMenu = document.querySelector(".icon-right")
    btnMenu.addEventListener("click",()=>{
        header.classList.toggle("on")
    })

   let lastScrollTop = 0;
    const main = document.querySelector("main"); // main 요소 선택

    main.addEventListener("scroll", () => {
        let scrollTop = main.scrollTop; // main 내부 스크롤 값

        if (scrollTop < lastScrollTop) {
            // 위로 스크롤
            header.classList.remove("on");
        } else {
            // 아래로 스크롤
            header.classList.remove("on");
        }

        lastScrollTop = scrollTop;
    });

    const menuLinks = document.querySelectorAll(".gnb-smart a");

    menuLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault(); // a태그 기본 이동 막기

            const targetId = this.getAttribute("href"); // #section1
            const target = document.querySelector(targetId);

            if (target) {
                const topPos = target.offsetTop; // main 내부에서의 위치 계산

                main.scrollTo({
                    top: topPos,
                    behavior: "smooth"
                });
            }
        });
    });







})
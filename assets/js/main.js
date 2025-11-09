const aboutMe = {
    init: function () {
        this.showAside();
        this.handlePanel();
        this.typingEffect();
        this.scrollspy();
    },
    // showAside: function () {
    //     let bar = document.querySelector('.bar');
    //     let app = document.querySelector('.app');
    //     const _this = this;
    //     const menuItem = document.querySelectorAll("#navbar > ul > li");

    //     menuItem.forEach((item) => {
    //         item.addEventListener("click", () => {
    //             const activeItem = document.querySelector("#navbar > ul > li.at");
    //             activeItem.classList.remove("at");
    //             const link = item.querySelector("a");
    //             const linkHrefId = link.getAttribute("href").substring(1);
    //             if (linkHrefId === "skills") {
    //                 _this.progressEffect();
    //             }
    //             item.classList.toggle("at");

    //             if (bar.classList.contains('change')) {
    //                 document.body.style.overflow = "auto";
    //                 bar.classList.toggle('change');
    //                 app.classList.toggle('off');
    //             }
    //         });
    //     })

    //     bar.onclick = function () {
    //         if (bar.classList.contains('change') == false) {
    //             this.classList.toggle('change');
    //             app.classList.toggle('off');
    //             document.body.style.overflow = "hidden";
    //         } else {
    //             document.body.style.overflow = "auto";
    //             this.classList.toggle('change');
    //             app.classList.toggle('off');
    //         }
    //     }

    //     app.addEventListener("click", (e) => {
    //         if (!e.target.closest(".aside, .bar")) {
    //             document.body.style.overflow = "auto";
    //             bar.classList.toggle('change');
    //             app.classList.toggle('off');
    //         }
    //     });
    // },
    showAside: function () {
        // 1. DOM Queries: Lấy tất cả các phần tử cần thiết một lần
        const bar = document.querySelector('.bar');
        const app = document.querySelector('.app');
        const navList = document.querySelector("#navbar > ul");
        const _this = this;

        // 2. Helper Function: Hàm duy nhất để bật/tắt mobile menu
        const toggleMobileMenu = () => {
            const isMenuOpening = !bar.classList.contains('change');

            bar.classList.toggle('change');
            app.classList.toggle('off');
            document.body.style.overflow = isMenuOpening ? "hidden" : "auto";
        };

        // 3. Event Listener cho nút Bar (Hamburger Icon)
        bar.addEventListener('click', toggleMobileMenu);

        // 4. Event Delegation cho Menu Items
        navList.addEventListener("click", (e) => {
            const clickedLi = e.target.closest('li');
            if (!clickedLi) return;

            // Xóa class 'at' ở mục đang active
            const currentActive = navList.querySelector("li.at");
            if (currentActive) {
                currentActive.classList.remove("at");
            }

            // Thêm class 'at' cho mục vừa click
            clickedLi.classList.add("at");

            // Gọi progressEffect cho mục "skills"
            const link = clickedLi.querySelector("a");
            if (link && link.getAttribute("href").substring(1) === "skills") {
                _this.progressEffect();
            }

            if (bar.classList.contains('change')) {
                setTimeout(() => {
                    toggleMobileMenu();
                }, 500);
            }
        });

        // 5. Event Listener để đóng menu khi click ra ngoài (lớp overlay)
        app.addEventListener("click", (e) => {
            if (e.target === app) {
                toggleMobileMenu();
            }
        });
    },
    handlePanel: function () {
        const panels = document.querySelectorAll('.panel');
        if (!panels) return;
        Array.from(panels).forEach(function (panel, index, array) {
            panel.onclick = function (e) {
                const eIdex = index;
                array.forEach(function (i, id) {
                    if (i.classList.contains('at') && (id !== eIdex)) {
                        i.classList.remove('at');
                    }
                });
                if (e.target.closest('.panel-heading')) {
                    this.classList.toggle('at');
                }
            }
        })
    },
    progressEffect: function () {
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach((bar) => {
            setTimeout(() => {
                const done = bar.getAttribute('data-progress');
                const spanBar = bar.querySelector('span');
                bar.style.width = `${done}%`;
                bar.style.opacity = 1;
                spanBar.innerText = `${done}%`;
            }, 750);
        })
    },
    typingEffect: function () {
        // Type Effect
        const typedText = document.querySelector('#typist-element');
        const cursorSpan = document.querySelector('.typist-cursor');
        const textArray = typedText.dataset.typist.split(',');
        const typingDelay = 200;
        const erasingDelay = 100;
        const newTextDelay = 2000;

        let textArrayIndex = 0;
        let charIndex = 0;

        function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
                typedText.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            }
            else {
                cursorSpan.classList.remove('typing');
                setTimeout(erase, newTextDelay);
            }
        }

        function erase() {
            if (charIndex > 0) {
                if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
                typedText.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, erasingDelay);
            } else {
                cursorSpan.classList.remove('typing');
                textArrayIndex++;
                if (textArrayIndex >= textArray.length) textArrayIndex = 0;
                setTimeout(type, typingDelay + 1100);
            }
        }

        type();

        document.addEventListener("DOMContentLoaded", function () {
            if (textArray.length) setTimeout(type, newTextDelay + 250);
        })
    },
    scrollspy: function () {
        const _this = this;
        const sections = document.querySelectorAll("section");
        const navLi = document.querySelectorAll("#navbar > ul > li");
        const navbarHeight = document.getElementById("navbar").offsetHeight; // Lấy chiều cao của navbar để tính offset

        // Hàm tối ưu hóa (throttle) để ngăn việc gọi hàm liên tục khi scroll
        // Giúp cải thiện hiệu suất đáng kể.
        function throttle(func, limit) {
            let inThrottle;
            return function () {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            }
        }

        // Hàm chính để kiểm tra vị trí và cập nhật class "at"
        function updateActiveSection() {
            let currentSectionId = "";
            const scrollPosition = window.pageYOffset;

            // Tìm section đang hiển thị trên màn hình
            sections.forEach(section => {
                // section.offsetTop là vị trí của section so với đầu trang.
                // Trừ đi navbarHeight và một chút khoảng đệm để active chính xác hơn khi có header cố định.
                const sectionTop = section.offsetTop - navbarHeight - 20;
                if (scrollPosition >= sectionTop) {
                    currentSectionId = section.getAttribute("id");
                }
            });

            // Cập nhật class "at" cho các mục menu
            navLi.forEach(li => {
                const link = li.querySelector("a");
                const linkHrefId = link.getAttribute("href").substring(1);

                if (linkHrefId === currentSectionId) {
                    if (!li.classList.contains("at")) {
                        li.classList.add("at");
                        // Gọi hàm progressEffect chỉ khi section "skills" được active
                        if (currentSectionId === "skills") {
                            _this.progressEffect();
                        }
                    }
                } else {
                    li.classList.remove("at");
                }
            });
        }

        // Gọi hàm một lần khi tải trang để set trạng thái active ban đầu
        updateActiveSection();

        // Gán sự kiện scroll vào window, sử dụng hàm đã được tối ưu hóa
        window.addEventListener("scroll", throttle(updateActiveSection, 100)); // 100ms là khoảng thời gian chờ
    }
};
aboutMe.init();
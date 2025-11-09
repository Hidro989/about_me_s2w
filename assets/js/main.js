const aboutMe = {
    init: function () {
        this.showAside();
        this.handlePanel();
        this.progressEffect();
        this.typingEffect();
        this.handleSideBarMenu();
    },
    showAside: function () {
        let bar = document.querySelector('.bar');
        let app = document.querySelector('.app');
        bar.onclick = function () {
            if (bar.classList.contains('change') == false) {
                this.classList.toggle('change');
                app.classList.toggle('off');
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "auto";
                this.classList.toggle('change');
                app.classList.toggle('off');
            }
        }
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
            }, 1000);
        })
    },
    typingEffect: function () {
        // Type Effect
        const typedText = document.querySelector('#typist-element');
        const cusorSpan = document.querySelector('.typist-cusor');
        const textArray = typedText.dataset.typist.split(',');
        const typingDelay = 200;
        const erasingDelay = 100;
        const newTextDelay = 2000;

        let textArrayIndex = 0;
        let charIndex = 0;

        function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                if (!cusorSpan.classList.contains('typing')) cusorSpan.classList.add('typing');
                typedText.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            }
            else {
                cusorSpan.classList.remove('typing');
                setTimeout(erase, newTextDelay);
            }
        }

        function erase() {
            if (charIndex > 0) {
                if (!cusorSpan.classList.contains('typing')) cusorSpan.classList.add('typing');
                typedText.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, erasingDelay);
            } else {
                cusorSpan.classList.remove('typing');
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
    handleSideBarMenu: function () {
        const menuItem = document.querySelectorAll("#navbar > ul > li");

        menuItem.forEach((item) => {
            item.addEventListener("click", () => {
                const activeItem = document.querySelector("#navbar > ul > li.at");
                activeItem.classList.remove("at");
                item.classList.toggle("at");
            });
        })
    }
};
aboutMe.init();
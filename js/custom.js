/**
 * Main JS file for BlogInn behaviours (vanilla JS, no jQuery)
 */
(function () {
    "use strict";

    function ready(fn) {
        if (document.readyState !== "loading") {
            fn();
        } else {
            document.addEventListener("DOMContentLoaded", fn);
        }
    }

    ready(function () {
        var entryContent = document.querySelector(".entry-content");
        if (entryContent && typeof window.fitVids === "function") {
            window.fitVids(entryContent);
        }

        var menuToggle = document.getElementById("menu-toggle");
        var navMenu = document.querySelector(".nav-menu");
        if (menuToggle && navMenu) {
            menuToggle.addEventListener("click", function () {
                var expanded = this.getAttribute("aria-expanded") === "true";
                this.setAttribute("aria-expanded", !expanded);
                this.classList.toggle("toggled-on");
                navMenu.classList.toggle("toggled-on");
            });
            window.addEventListener("resize", function () {
                if (window.getComputedStyle(menuToggle).display === "none") {
                    menuToggle.setAttribute("aria-expanded", "false");
                    menuToggle.classList.remove("toggled-on");
                    navMenu.classList.remove("toggled-on");
                }
            });
            window.addEventListener("orientationchange", function () {
                if (window.getComputedStyle(menuToggle).display === "none") {
                    menuToggle.setAttribute("aria-expanded", "false");
                    menuToggle.classList.remove("toggled-on");
                    navMenu.classList.remove("toggled-on");
                }
            });
        }

        var topLink = document.getElementById("top-link");
        if (topLink) {
            topLink.addEventListener("click", function (e) {
                window.scrollTo({ top: 0, behavior: "smooth" });
                e.preventDefault();
            });
        }
    });
})();

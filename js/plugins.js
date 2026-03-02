/*
 * FitVids (vanilla JS)
 * Responsive video embeds - wrap iframes in fluid-width wrapper.
 * Inspired by FitVids by Chris Coyier & Dave Rupert.
 */
(function () {
    "use strict";

    var styleStr =
        ".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}" +
        ".fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed{" +
        "position:absolute;top:0;left:0;width:100%;height:100%;}";

    function ensureStyle() {
        if (!document.getElementById("fit-vids-style")) {
            var style = document.createElement("style");
            style.id = "fit-vids-style";
            style.textContent = styleStr;
            (document.head || document.documentElement).appendChild(style);
        }
    }

    var selectors = [
        "iframe[src*='player.vimeo.com']",
        "iframe[src*='youtube.com']",
        "iframe[src*='youtube-nocookie.com']",
        "iframe[src*='kickstarter.com'][src*='video.html']",
        "object",
        "embed",
    ].join(",");

    function fitVids(container) {
        if (!container || !container.querySelector) return;
        ensureStyle();
        var nodes = container.querySelectorAll(selectors);
        for (var i = 0; i < nodes.length; i++) {
            var el = nodes[i];
            if (el.tagName.toLowerCase() === "embed" && el.parentNode && el.parentNode.tagName && el.parentNode.tagName.toLowerCase() === "object") continue;
            if (el.parentNode && el.parentNode.className && el.parentNode.className.indexOf("fluid-width-video-wrapper") !== -1) continue;
            var height =
                el.tagName.toLowerCase() === "object" || (el.getAttribute("height") && !isNaN(parseInt(el.getAttribute("height"), 10)))
                    ? parseInt(el.getAttribute("height"), 10)
                    : el.offsetHeight;
            var width = !isNaN(parseInt(el.getAttribute("width"), 10))
                ? parseInt(el.getAttribute("width"), 10)
                : el.offsetWidth;
            if (!width || !height) continue;
            var ratio = (height / width) * 100;
            if (!el.id) el.id = "fitvid" + Math.floor(999999 * Math.random());
            var wrapper = document.createElement("div");
            wrapper.className = "fluid-width-video-wrapper";
            wrapper.style.paddingTop = ratio + "%";
            el.parentNode.insertBefore(wrapper, el);
            wrapper.appendChild(el);
            el.removeAttribute("height");
            el.removeAttribute("width");
        }
    }

    window.fitVids = fitVids;
})();

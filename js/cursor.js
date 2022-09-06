(function () {
    var cursor = document.getElementById("cursor");
    var pos = { pre: null, now: null };
    var elem = document.getElementsByTagName("*");
    var pts = [];
    window.addEventListener("load", () => {
        for (let i of elem)
            if (window.getComputedStyle(i).cursor == "pointer")
                pts.push(i.outerHTML);
        var style = document.createElement("style");
        style.innerHTML =
            "*{cursor:url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' width='8px' height='8px'><circle cx='4' cy='4' r='4' opacity='.5'/></svg>\")4 4,auto!important;}";
        document.body.appendChild(style);
    });
    document.addEventListener("mouseover", (e) => {
        if (pts.includes(e.target.outerHTML)) cursor.classList.add("hover");
    });
    document.addEventListener("mouseout", (e) => {
        if (pts.includes(e.target.outerHTML)) cursor.classList.remove("hover");
    });
    document.addEventListener("mousemove", (e) => {
        if (!pos.now) {
            cursor.style.left = e.clientX - 8 + "px";
            cursor.style.top = e.clientY - 8 + "px";
        }
        pos.now = { x: e.clientX - 8, y: e.clientY - 8 };
        cursor.classList.add("visible");
    });
    document.addEventListener("mouseenter", () => {
        cursor.classList.add("visible");
        pos.pre = null;
    });
    document.addEventListener("mouseleave", () => {
        cursor.classList.remove("visible");
    });
    document.addEventListener("mousedown", () => {
        cursor.classList.add("active");
    });
    document.addEventListener("mouseup", () => {
        cursor.classList.remove("active");
    });
    const lerp = (a, b, n) => (1 - n) * a + n * b;
    function render() {
        if (pos.pre) {
            pos.pre = {
                x: lerp(pos.pre.x, pos.now.x, 0.15),
                y: lerp(pos.pre.y, pos.now.y, 0.15),
            };
            cursor.style.left = pos.pre.x + "px";
            cursor.style.top = pos.pre.y + "px";
        } else pos.pre = pos.now;
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
})();
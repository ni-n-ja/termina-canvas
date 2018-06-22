'use strict'
var terminal;
var contain;
var terminalContent;
var terminalInput;
var x;
var y;
var drag;
var ctx;

window.onload = function () {
    terminal = document.getElementsByClassName("terminal");
    contain = document.getElementsByClassName("contain");
    terminalContent = document.getElementById("terminal");
    ctx = terminalContent.getContext('2d');
    ctx.font = "48px serif";
    ctx.fillStyle = "red";
    terminalInput = document.getElementById("input");


    for (var i = 0; i < terminal.length; i++) {
        terminal[i].addEventListener("mousedown", mouseDown, false);
        terminal[i].addEventListener("touchstart", touchDown, false);
        contain[i].addEventListener("mousedown", function (e) {
            e.stopPropagation();
        }, false);
        contain[i].addEventListener("touchstart", function (e) {
            e.stopPropagation();
        }, false);
        terminalContent.addEventListener("mousedown", function (e) {
            setTimeout(() => {
                terminalInput.focus();
            }, 100);
        }, false);
        terminalContent.addEventListener("touchstart", function (e) {
            e.stopPropagation();
        }, false);

        terminalInput.onkeydown = (e) => {
            if (e.code.match("Space")) {
                // console.log(e.key);
            } else if (e.key.match(/^.{1}$/)) {
                // console.log(e.key);
                //terminalInput.value = '';
            } else if (e.key.match("Enter")) {
                //terminalInput.value = '';
                // console.log(e.key);
            } else if (e.key.match("Backspace")) {
                // terminalInput.value = '';
                // console.log(e.key);
            }
        };

        terminalInput.onkeyup = (e) => {
            // terminalInput.value = '';
            console.log();
            // ctx.clearRect(0, 0, terminalContent.clientWidth, terminalContent.clientHeight);
            // ctx.fillText(e.key, 10, 50);
        }

        terminalInput.oninput = (e) => {
            console.log(e.data);
            ctx.clearRect(0, 0, terminalContent.clientWidth, terminalContent.clientHeight);
            ctx.fillText(e.data, 10, 50);
            terminalInput.value = '';
        }

        document.onkeydown = (e) => {
            e.stopPropagation();
        };
    }

    function mouseDown(e) {
        this.classList.add("drag");
        drag = document.getElementsByClassName("drag")[0];
        x = e.pageX - this.offsetLeft;
        y = e.pageY - this.offsetTop;
        document.body.addEventListener("mousemove", mouseMove, false);
        document.body.addEventListener("touchmove", touchMove, false);
        document.body.addEventListener("mouseup", mouseUp, false);
        document.body.addEventListener("touchend", mouseUp, false);
    }

    function touchDown(e) {
        this.classList.add("drag");
        drag = document.getElementsByClassName("drag")[0];
        x = e.changedTouches[0].pageX - this.offsetLeft;
        y = e.changedTouches[0].pageY - this.offsetTop;
        document.body.addEventListener("mousemove", mouseMove, false);
        document.body.addEventListener("touchmove", touchMove, false);
        document.body.addEventListener("mouseup", mouseUp, false);
        document.body.addEventListener("touchend", mouseUp, false);
    }

    function mouseMove(e) {
        drag.style.top = e.pageY - y + "px";
        drag.style.left = e.pageX - x + "px";
    }

    function touchMove(e) {
        drag.style.top = e.changedTouches[0].pageY - y + "px";
        drag.style.left = e.changedTouches[0].pageX - x + "px";
    }

    function mouseUp(e) {
        document.body.removeEventListener("mousemove", mouseMove, false);
        drag.removeEventListener("mouseup", mouseUp, false);
        document.body.removeEventListener("touchmove", mouseMove, false);
        drag.removeEventListener("touchend", mouseUp, false);
        drag.classList.remove("drag");
    }

}
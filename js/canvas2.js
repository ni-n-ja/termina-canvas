'use strict'

var ctx;
var backCtx;
var canvas;
var backCanvas
var img;
var DOMURL;
var uIntArray;
var png;
var url;

window.onload = function () {

    XHRArrayBuffer('image/192.png', (xhr) => {
        var data = xhr.response;
        xhr.abort();
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");
        backCanvas = document.getElementById("backCanvas");
        backCtx = backCanvas.getContext("2d");
        DOMURL = self.URL || self.webkitURL || self;
        uIntArray = new Uint8ClampedArray(data);
        png = new Blob([uIntArray], {
            type: 'image/png'
        });
        url = DOMURL.createObjectURL(png);
        img = new Image();
        img.src = url;
        img.onload = function () {
            ctx.drawImage(img, 0, 0, 500, 500);
            DOMURL.revokeObjectURL(png);
            th = 0;
            thPlus = 0.1;
            // requestAnimationFrame(noise);
            noise();
            fireNoise();
        };
    });

}

var th;
var thPlus;
var height;
var x;
var scale;
var tension = 0;
var imageWidth = 500;

function noise() {
    backCtx.clearRect(0, 0, 500, 500);
    th %= 2 * Math.PI;
    th += thPlus;
    for (var i = 0; i < imageWidth;) {
        height = parseInt(Math.random() * Math.random() * 42);
        if (height <= 1) {
            height = 1;
        }
        x = Math.sin((i / 100) * Math.PI + th * (0.5 - Math.random()) * Math.random() * 10) * 6 * (0.5 - Math.random());
        scale = Math.exp(-1 * Math.pow(((i - (imageWidth / 2)) / (imageWidth / 2)), 2) / 0.3) * (Math.random() * Math.random());
        x *= scale * tension;
        if (0.5 - Math.random() < 0) {
            x *= -1;
        }
        backCtx.putImageData(ctx.getImageData(0, i, 500, i + height), x, i);
        i += (height <= 1) ? 1 : height;
    }

    if (tension > 0) {
        tension *= 0.7;
    }

    // setTimeout(() => {
    //     noise();
    // }, 42);
    requestAnimationFrame(noise);
}

function fireNoise() {
    tension += 36;
    setTimeout(() => {
        fireNoise();
    }, Math.random() * 3000);
}
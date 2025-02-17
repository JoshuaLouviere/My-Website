var lastscroll = 0;

addEventListener("scroll", (event) => {
    var ele = document.getElementById("navbar");
    var temp = document.getElementById("temp");
    var sy = window.pageYOffset;

    if (sy > lastscroll) {
        ele.style.top = "-200px";
    } else {
        ele.style.top = "0px";
    }

    var tp = temp.getBoundingClientRect().top;

    if (tp > -700 && tp < 700) {
        temp.style.left = "0px";
        console.log("SDFJKLF:J");
        console.log("SDFJKLF:J");
    } else {
        console.log("puckerass");
        temp.style.left = "-10000px";
    }
    // console.log(temp.getBoundingClientRect().top);


    console.log(tp);
    lastscroll = sy;
});
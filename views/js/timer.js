var deadline = new Date(new Date().setTime(0));
var x = setInterval(function() { 
var now = new Date().getTime(); 
var t = deadline - now; 
var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)); 
var seconds = Math.floor((t % (1000 * 60)) / 1000); 
document.getElementById("span.time").innerHTML = days + "d "  
+ hours + "h " + minutes + "m " + seconds + "s "; 
    if (t < 0) { 
        clearInterval(x); 
        document.getElementById("span.time").innerHTML = "EXPIRED"; 
    } 
}, 1000); 
 
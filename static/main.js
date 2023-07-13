
window.onload = function () {
    updateProgressBar(0);
    const socket = io();
    let socketid = undefined;
    socket.connect(root_url);

    socket.on("connect", function () {
        socketid = socket.id;
    })
    
    socket.on("update progress", function(progress) {
        //do something with percent
        total = document.getElementsByClassName("dz-success").length;
        updateProgressBar(progress, total);
    })
    

    let button = document.getElementById("button");
    button.onclick = function(event) {
        event.preventDefault();
        updateProgressBar(0, document.getElementsByClassName("dz-success").length);
        fetch("/progress/" + socketid, {
            method: "POST"
        }).then(response => {
            setTimeout(function() {
                window.location.href = receipt_url;
            }, 600);
        });
    }
}

function updateProgressBar(progress, total) {
    var bar = document.getElementById("bar");
    var pr = document.getElementById("progress");
    var progress_text = document.getElementById("scan");
    if(progress != 0){
        pr.style.height = '30px'
        pr.style.borderWidth = '1px'
    }
    if(total != undefined){
        progress_text.innerHTML = 'scanning ' + progress + '/' + total + '... please wait';
    }

    bar.style.width = (progress/total)*100 + "%";
}


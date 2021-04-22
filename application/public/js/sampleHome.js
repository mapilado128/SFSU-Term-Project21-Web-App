var v;
let mainDiv = document.getElementById("gallery")
if(mainDiv){
    let fetchURL ="https://jsonplaceholder.typicode.com/albums/2/photos"
    fetch(fetchURL)
        .then((data) => data.json())
        .then((photos) => {
            let innerHTML = "";
            photos.forEach((obj) => {
                document.getElementById("gallery").innerHTML += `<div id=${obj.id} class="gallery" onclick="fadeOut(${obj.id})">
                <img src=${obj.url} width="600" height="400"/>
                <div class="desc">${obj.title}</div></div>`;
            });
        });
    v = fetchURL.length;
    document.getElementById("count").innerHTML=`${v} displayed images`;
}
function fadeOut(id){
    var element = document.getElementById(id);
    var op = 1;
    var timer = setInterval(function() {
        if(op <= 0.1) {
            clearInterval(timer);
            element.remove();
            v--;
            document.getElementById("count").innerHTML=`<div>${v} displayed images</div>`;
        }
        element.style.opacity = op;
        op-=0.1;
    }, 50);
}
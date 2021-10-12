const lightbox = document.createElement('div')
lightbox.id = 'lightbox'
document.body.appendChild(lightbox)
//Enter path do img's here into array
let imageURL = ["../img/gallery/DSC_0130.jpg", "../img/gallery/DSC_0176.jpg", "../img/gallery/DSC_0130.jpg", "../img/gallery/DSC_0176.jpg", "../img/gallery/DSC_0130.jpg", "../img/gallery/DSC_0176.jpg", "../img/gallery/DSC_0176.jpg", "../img/gallery/DSC_0130.jpg", "../img/gallery/DSC_0176.jpg", "../img/gallery/DSC_0130.jpg", "../img/gallery/DSC_0176.jpg", "../img/gallery/DSC_0176.jpg", "../img/gallery/DSC_0130.jpg", "../img/gallery/DSC_0176.jpg", "../img/gallery/DSC_0130.jpg", "../img/gallery/DSC_0176.jpg","../img/gallery/DSC_0176.jpg", "../img/gallery/DSC_0130.jpg", "../img/gallery/DSC_0176.jpg", "../img/gallery/DSC_0130.jpg", "../img/gallery/DSC_0176.jpg" ,"../img/gallery/DSC_0176.jpg", "../img/gallery/DSC_0130.jpg", "../img/gallery/DSC_0176.jpg", "../img/gallery/DSC_0130.jpg", "../img/gallery/DSC_0176.jpg" ,"../img/gallery/DSC_0176.jpg", "../img/gallery/DSC_0130.jpg", "../img/gallery/DSC_0176.jpg", "../img/gallery/DSC_0130.jpg", "../img/gallery/DSC_0176.jpg" ];

// Galeriebilder dynamisch erzeugen und mit dem src aus dem Array
var gallery = document.getElementById("gallery");
for (img in imageURL){
    var imgElement = document.createElement('img');
    imgElement.src = imageURL[img];
    imgElement.id = "GalleryImage" + img;
    gallery.appendChild(imgElement);    
}

const images = document.querySelectorAll('img');
var index;
images.forEach(image => {
    image.addEventListener('click', e => {
        console.log(e);
        index = parseInt(e.target.id.substring(12));
        lightbox.classList.add('active')
        const img = document.createElement('img')
        img.id="fullscreenimage"
        // img.src = arraymitsrcs[0]
        img.src = image.src
        while (lightbox.firstChild) {
            lightbox.removeChild(lightbox.firstChild)
        }
        lightbox.appendChild(img)
        img.style.maxHeight = "85%";

        var divleft = document.createElement('div');
        var divright = document.createElement('div');
        
        // Die Höhe aus dem Bild errechnen
        var height = document.getElementById("fullscreenimage").offsetHeight
        var left = document.getElementById("fullscreenimage").offsetLeft
        var width = document.getElementById("fullscreenimage").offsetWidth
        var top = document.getElementById("fullscreenimage").offsetTop

        // Die Daten an das div weitergeben
        divleft.id = "divleft";
        divleft.style.position = "absolute";
        divleft.style.top = top + "px";
        divleft.style.left = left + "px";
        divleft.style.width = (width / 2)  + "px";
        divleft.style.height = height  + "px";
       // divleft.style.background = "red";
      //  divleft.style.opacity = "0.5";

        divright.id = "divright";
        divright.style.position = "absolute";
        divright.style.top = top + "px";
        divright.style.left = (left + width / 2) + "px";
        divright.style.width = (width / 2)  + "px";
        divright.style.height = height  + "px";
      //  divright.style.background = "green";
      //  divright.style.opacity = "0.5";

        divright.addEventListener('click', e => {
            console.log("rechts")
            if (index < imageURL.length - 1){
                index += 1;
            }
            img.src = imageURL[calcIndex(index).last];
            console.log(index);
            resizeGal();
        });

        divleft.addEventListener('click', e => {
            console.log("links")
            if (index > 0){
                index -= 1;
            }
            img.src = imageURL[calcIndex(index).next];
            console.log(index);
            resizeGal();
        });
        console.log(index);
        lightbox.appendChild(divleft);
        lightbox.appendChild(divright);

    })
})

function calcIndex(index){
    if (index > 0){
        var lastindex = index - 1;
    } else {
        var lastindex = index;           
    }
    
    if (index < imageURL.length){
    var nextindex = index + 1;
    } else {
        var nextindex = index + 1;
    }
    return {last: lastindex, next: nextindex};
}

lightbox.addEventListener('click', e => {
    if (e.target !== e.currentTarget){
} else {
    lightbox.classList.remove('active');
}
})
  
function resizeGal(){
    var divleft = document.getElementById("divleft");
    var divright = document.getElementById("divright");
    
    // Die Höhe aus dem Bild errechnen
    var height = document.getElementById("fullscreenimage").offsetHeight
    var left = document.getElementById("fullscreenimage").offsetLeft
    var width = document.getElementById("fullscreenimage").offsetWidth
    var top = document.getElementById("fullscreenimage").offsetTop

    // Die Daten an das div weitergeben

    divleft.style.top = top + "px";
    divleft.style.left = left + "px";
    divleft.style.width = (width / 2)  + "px";
    divleft.style.height = height  + "px";

    divright.style.top = top + "px";
    divright.style.left = (left + width / 2) + "px";
    divright.style.width = (width / 2)  + "px";
    divright.style.height = height  + "px";
}

window.onresize = function(){
  resizeGal();
};
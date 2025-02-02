const getElement = (id) => {return document.getElementById(id)}

const carousel = getElement("carousel")
const img = getElement("carousel-image")
let images = [
      {
        name: "white",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Color_icon_white.svg/1024px-Color_icon_white.svg.png",
      },
      {
        name: "pink",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Color_icon_pink_v2.svg/1024px-Color_icon_pink_v2.svg.png",
      },
      {
        name: "purple",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Color_icon_purple_v2.svg/1200px-Color_icon_purple_v2.svg.png",
      },
      {
        name: "magenta",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Color_icon_magenta.png/1024px-Color_icon_magenta.png",
      },
      {
        name: "blue",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Color_icon_blue.svg/640px-Color_icon_blue.svg.png",
      },
      {
        name: "green",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Color_icon_green.png/1200px-Color_icon_green.png",
      },
      {
        name: "yellow",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Color_icon_yellow.svg/1024px-Color_icon_yellow.svg.png",
      },
      {
        name: "orange",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Color_icon_orange.png/1024px-Color_icon_orange.png",
      },
      {
        name: "red",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Color_icon_red.png/1200px-Color_icon_red.png",
      },
      {
        name: "brown",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Color_icon_brown_v2.svg/1024px-Color_icon_brown_v2.svg.png",
      },
      {
        name: "grey",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Color_icon_gray_v2.svg/1024px-Color_icon_gray_v2.svg.png",
      },
      {
        name: "black",
        src: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Color_icon_black_new2.png",
      },
    ]

async function downloadFile(src,name) {
  const image = await fetch(src)
  const imageBlob = await image.blob()
  const imageURL = URL.createObjectURL(imageBlob)
  const link = document.createElement('a');
  link.href = imageURL;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const carouselLoad = (array) => {
  carousel.style.display = "flex"
  images = array
  carouselRender()
}

const carouselRender = (index = images.length - 1) => {
  let content = ""
  if (index !== 0) {
    content += `<li class='no-list-style' onclick='carouselRender(${index - 1})'><img alt="${images[index - 1]["name"]}" src=${images[index - 1]["src"]} height="200" width="200"></li>`
  } else {
    content += `<div style='width:200px'></div>`
  }

  content += `<li class='no-list-style' id='index' value=${index}>
		<img alt="${images[index]["name"]}" 
			src=${images[index]["src"]} 
			onclick="window.open('${images[index]["src"]}', '_blank').focus();"
			height="250" width="250"></li>`

  if (index !== images.length - 1) {
    content += `<li class='no-list-style' onclick='carouselRender(${index + 1})'><img alt="${images[index + 1]["name"]}" src=${images[index + 1]["src"]} height="200" width="200"></li>`
  }
  img.innerHTML = content
  panoramaRender()
  disableButtons()
}

const panoramaRender = (index = images.length - 1) => {
  let content = ""
  for (const [i, { name, src }] of images.entries()) {
    if (i === getElement("index").value) {
      content += `<div style="width:25px;height:25px;outline:solid 1px black"></div>`
    } else {
      content += `<img alt="${name}" src=${src} height="25" width="24" onclick="carouselRender(${i})">`
    }
    getElement("carousel-panorama").innerHTML = content
  }
}

function disableButtons() {
  if (getElement("index").value === 0) {
    getElement("carousel-navigation-first").disabled = true
  } else {
    getElement("carousel-navigation-first").disabled = false
  }
  if (getElement("index").value === images.length - 1) {
    getElement("carousel-navigation-last").disabled = true
  } else {
    getElement("carousel-navigation-last").disabled = false
  }
}

function carouselSlide(increment) {
  let value = getElement("index").value
  switch (increment) {
    case -2:
      carouselRender(0)
      break
    case -1:
      if (value != 0) {
        carouselRender(value - 1)
      } else {
        carouselRender(images.length - 1)
      }
      break
    case 1:
      if (value != images.length - 1) {
        carouselRender(value + 1)
      } else {
        carouselRender(0)
      }
      break
    case 2:
      carouselRender()
      break
  }
}

carouselLoad(images)

getElement('carousel-download').addEventListener('click',(e) => {
	downloadFile(
			src = images[getElement('index').value]['src'],
			name = images[getElement('index').value]['name']
		)
})

# carousel-js
HTML, JavaScript and CSS files for a Carousel component

## Steps to run this code
- Run the HTML, JS and CSS code on an app or an IDE of your choice.
- Make sure the `carouselLoad()` function runs after the `#carousel` element is loaded in the DOM.
- You may need to change the `background-image` gradient for the `.carousel-left-grad` classNames to match your page's background.

The `carouselLoad()` function takes a single `array` argument, which is an array of dictionaries for your images:
```
[
  {
    name: "example",
    src: "https://path/to/image.png",
  }
]
```
The `name` of each image will be set as the image's `alt` attribute.

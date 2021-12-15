While you could render your game with the DOM, that would be slow and cumbersome because the DOM is designed for webpages, rather than games. The Canvas gives us a bit of extra freedom.

Instead of cobbling together CSS and HTML, you draw using a JavaScript API. Let's use it to fill in a rectangle.

I've supplied the necessary code to do so on the right, but if you try and run it, there's an error. The error claims that the canvas doesn't exist, which is silly since we define it in the HTML right before our little script.

The solution is to have our script schedule itself to run when the page loads. This is an example of how to do that:

```js
window.onload = () => {
  console.log("The page is loaded!");
}
```

Wrap the existing code in a similar way. Oh, and leave in the comments that start with `/* --`; we use them to know which parts of code to test and which we can leave alone.

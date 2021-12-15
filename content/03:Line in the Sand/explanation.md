```
  ctx.fillRect(10, 10, 20, 20);
```
Because we called fillRect this way, our rectangle was ten pixels from the top-left on each axis, and our rectangle was 20 by 20 pixels large. We're going to make a game where rectangles march across the screen, so it makes sense to make some ground that they can march on.

This line of code will fill the bottom-half of our canvas:
```
  ctx.fillRect(
    /* top left: */           0, canvas.height/2,
    /*     size: */ canvas.width, canvas.height/2
  );
```

With that in mind, do you think you could move our original rectangle to the right-hand side of the screen?

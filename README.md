<p align="center">
<img src="https://github.com/patrick-lafferty/saturn/blob/master/saturn_logo.png">
</p>

# Apollo
<img src="https://img.shields.io/badge/License-BSD%203--Clause-blue.svg">

Apollo is <a href="https://github.com/patrick-lafferty/saturn">Saturn's</a> graphical UI framework. It uses a tiling window manager that splits up screen space into a hierarchy of tiles (application windows) and containers that arrange tiles horizontally or vertically. One of the main goals of Apollo is to support rapid UI prototyping. To accomplish this, Apollo uses a declarative layout language called Mercury. By editing Mercury files you can easily create and modify an application's UI. 

<a href="https://patrick-lafferty.github.io/apollo/">View it live here!</a>

# Features

```lisp
(grid

    (rows (fixed-height 50) (proportional-height 1))
    (columns (fixed-width 50) (proportional-width 1))

    (items
        
        (label (caption "This is a label")
            (alignment (vertical center))
            (padding (horizontal 10))
            (meta (grid (column 1))))

        (list-view
            (meta (grid (row 1) (column-span 2)))
            (item-source (bind entries))

            (item-template
                (label (caption (bind content))
                    (background (bind background))
                    (font-colour (bind fontColour)))))))
```

Apollo also makes heavy use of databinding. Certain UI elements like Labels
expose properties that are 'bindable', such as caption and background. You
can define properties in your application and then 'bind' them to elements,
and when your values change it automatically updates the appropriate UI element.

Note that the example also shows item templates. You can create a collection
of some user-defined struct, and by defining an item template you tell
Apollo how to create UI elements from that struct.

# Running

An interactive Apollo editor is hosted <a href="https://patrick-lafferty.github.io/apollo/">here!</a>

# Features

TODO

# License

Saturn uses the 3-clause BSD license.
# Stories of Solidarity

## Frontend 

A static site to pull stories from the [stories-of-solidarity-api](https://github.com/spacedogXYZ/stories-of-solidarity-api) and display them visually. Provides user login capability and new story additions, sending submissions over the API to be saved in the database.

### Technologies

* [Grunt](http://gruntjs.com)
* [Backbone.js](http://backbonejs.org)
* [Bootstrap](http://getbootstrap.com)
* [D3](http://d3js.org)
* [Fontcustom](http://fontcustom.com)

### Development

We use [Bower](http://bower.io/) as our front-end package manager.

```bash
$ npm install bower -g
```

We use [Grunt](http://gruntjs.com/) as our task runner. Get the CLI (command line interface) and install it globally.

```bash
$ npm install grunt-cli -g
```

Now compile and serve the site locally. This will watch for changes as you make them and reload them in the browser window.
```bash
$ grunt serve
```

To add new icons to the custom font, put the SVG file in `/app/images/icons` and re-run `fontcustom compile` from the repository root.

### Deployment

Using GitHub Pages, build and push the resulting `dist` directory to the gh-pages branch.

``bash
$ grunt build
$ grunt buildcontrol:live
``
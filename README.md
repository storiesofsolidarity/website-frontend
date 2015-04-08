# Stories of Solidarity

## Frontend 

A static site to pull stories from the [stories-of-solidarity-api](https://github.com/spacedogXYZ/stories-of-solidarity-api) and display them visually. Provides user login capability and new story additions, sending submissions over the API to be saved in the database.

### Technologies

* Grunt
* Backbone.js
* Bootstrap
* D3

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


### Deployment

Using GitHub Pages, build and push the resulting `dist` directory to the gh-pages branch.

``bash
$ grunt build
$ grunt gh-pages --gh-pages-message 'commit message'
``
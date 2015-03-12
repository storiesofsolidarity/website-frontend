# Stories of Solidarity

## Frontend 

A static site to pull stories from the [stories-of-solidarity-api](https://github.com/spacedogXYZ/stories-of-solidarity-api) and display them visually. Provides user login capability and new story additions, sending submissions over the API to be saved in the database.

### Technologies

* Grunt
* Backbone.js
* Bootstrap
* D3

### Development

We use [Grunt](http://gruntjs.com/) as our task runner. Get the CLI (command line interface).

```bash
$ npm install grunt-cli -g
```

We use [Bower](http://bower.io/) as our front-end package manager.

```bash
$ npm install bower -g
```


### Deployment

Using GitHub Pages, push the `dist` directory to the gh-pages branch.
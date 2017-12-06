# Stories of Solidarity

A social media tool that helps workers in low wage, precarious jobs to build new forms of solidarity and mutual aid.

## Frontend 

This is a static site to pull stories from the [database](https://github.com/storiesofsolidarity/story-database) and display them visually. Provides user login capability and new story additions, sending submissions over the API to be saved in the database.

## Application Structure

This project uses Backbone to provide an MVC-like structure. Routes, views, models, and collections are defined in `app/scripts/`, and specific projections and mapping utlities are in `app/scripts/map/`. Model fields sync from the data api, so fields are defined there with only minor normalization on the client. Results are [paginated](https://github.com/backbone-paginator/backbone.paginator) and cached locally. Templates are written in plain HTML, and rendered with Handlebars to their proper divs.

A manager provides the ability to layer views, without having to reload their contents. An active class is applied to the navigation bar to provide the appearance of a raised ribbon. The splash page will cycle through available translations, and clicking a localized button will load the interface in that language.

## Geographic Representation

The map is intended to be an easy way for viewers to explore the stories by geography. It will eventually be supplemented with labor statistics and user-contributed content tags. It uses D3 to render each state and Puerto Rico in the Albers projection, providing a relatively compact view across the whole country. Hovering over a state shows stories that have been posted from there, and clicking loads  local geography and more details.

Users can drill down to the state, county, and zipcode level, with results displayed on the map or in a list. These routes are detailed in `/app/routes/stories.js`, which provides some caching to ensure that large geography files are not loaded multiple times. This also updates the browser history, so that URLs are shareable, and reloading maintains the user's place.

The map does not show roads or interstate highways, because these visuals are designed for a car-centric view of the world, not the humans whose stories we wish to tell. However, to make it easier to find your location, we do allow searching by zipcode and free pan-and-zoom functionality. This could be augmented with other tiled base layers for additional context.

## Adding Content

Stories can be added by SMS, via the data-api, or through the web interface. Authentication is lightweight, and content is manually screened for inappropriate language and spam.

### Technologies

* [Grunt](http://gruntjs.com)
* [Backbone.js](http://backbonejs.org)
* [Bootstrap](http://getbootstrap.com)
* [D3](http://d3js.org)
* [Fontcustom](http://fontcustom.com)
* [Transifex](http://transifex.com)

### Development

We use [Bower](http://bower.io/) as our front-end package manager.

```bash
$ npm install bower -g
```

We use [Grunt](http://gruntjs.com/) as our task runner. Get the CLI (command line interface) and install it globally, and any other devDependencies locally.

```bash
$ npm install grunt-cli -g
$ npm install
```

Now compile and serve the site locally. This will watch for changes as you make them and reload them in the browser window.
```bash
$ grunt serve --watch
```

You may also want to run the [data-api](https://github.com/storiesofsolidarity/data-api) and [us-data](https://github.com/storiesofsolidarity/us-data) servers locally for a complete development stack. If you don't, comment out the `Solidarity.apiRoot` and `dataRoot` settings in `index.html` to use the production endpoints.

To add new icons to the custom font, put the SVG file in `/app/images/icons` and re-run `fontcustom compile` from the repository root.

### Deployment

Using GitHub Pages, build and push the resulting `dist` directory to the gh-pages branch.

```bash
$ grunt build
$ grunt buildcontrol:live
```
const { DateTime: date_time } = require("luxon")
const fs = require("fs")
const plugin_rss = require("@11ty/eleventy-plugin-rss")
const plugin_syntax_highlight = require("@11ty/eleventy-plugin-syntaxhighlight")
const plugin_navigation = require("@11ty/eleventy-navigation")
const plugin_sass = require('eleventy-sass')
const markdown_it = require("markdown-it")
const markdown_it_anchor = require("markdown-it-anchor")

module.exports = function(eleventy_config) {
  // Copy the `img` and `css` folders to the output
  eleventy_config.addPassthroughCopy("img")
  eleventy_config.addPassthroughCopy("css")
  eleventy_config.addPassthroughCopy("fonts")

  // Add plugins
  eleventy_config.addPlugin(plugin_rss)
  eleventy_config.addPlugin(plugin_syntax_highlight)
  eleventy_config.addPlugin(plugin_navigation)
  eleventy_config.addPlugin(plugin_sass)

  eleventy_config.addFilter("readableDate", dateObj => {
    return date_time.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd.LL.yyyy")
  })

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventy_config.addFilter('htmlDateString', (dateObj) => {
    return date_time.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd')
  })

  // Get the first `n` elements of a collection.
  eleventy_config.addFilter("head", (array, n) => {
    if(!Array.isArray(array) || array.length === 0) {
      return []
    }
    if( n < 0 ) {
      return array.slice(n)
    }

    return array.slice(0, n)
  })

  // Return the smallest number argument
  eleventy_config.addFilter("min", (...numbers) => {
    return Math.min.apply(null, numbers)
  })

  function filterTagList(tags) {
    return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1)
  }

  eleventy_config.addFilter("filterTagList", filterTagList)

  // Create an array of all tags
  eleventy_config.addCollection("tagList", function(collection) {
    let tagSet = new Set()
    collection.getAll().forEach(item => {
      (item.data.tags || []).forEach(tag => tagSet.add(tag))
    })

    return filterTagList([...tagSet])
  })

  // TODO: will have to make some alterations here probably for the intended markdown features
  // Customize Markdown library and settings:
  let markdown_library = markdown_it({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdown_it_anchor, {
    permalink: markdown_it_anchor.permalink.ariaHidden({
      placement: "after",
      class: "direct-link",
      symbol: "#",
      level: [1,2,3,4],
    }),
    slugify: eleventy_config.getFilter("slug")
  })
  eleventy_config.setLibrary("md", markdown_library)

  // Override Browsersync defaults (used only with --serve)
  eleventy_config.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, browserSync) {
        const content_404 = fs.readFileSync('_site/404.html')

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.writeHead(404, {"Content-Type": "text/html charset=UTF-8"})
          res.write(content_404)
          res.end()
        })
      },
    },
    ui: false,
    ghostMode: false
  })

  return {
    // Control which files Eleventy will process
    // e.g.: *.md, *.njk, *.html, *.liquid
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],

    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: "njk",

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: "njk",

    // -----------------------------------------------------------------
    // If your site deploys to a subdirectory, change `pathPrefix`.
    // Don’t worry about leading and trailing slashes, we normalize these.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.dev/docs/filters/url/

    // You can also pass this in on the command line using `--pathprefix`

    // Optional (default is shown)
    pathPrefix: "/",
    // -----------------------------------------------------------------

    // These are all optional (defaults are shown):
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  }
}

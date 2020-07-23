# My Personal Website

<img src="https://travis-ci.org/joshuapowell/www.joshuapowell.io.svg?branch=master" alt="" title="" />

## Development Notes

### Disabling Offline Caching
The presence of the `offline.js` service worker can negatively impact basic
page refresh. During development it is advisable to disabled the `<script>`
for the `serviceWorker` and any tracking codes such as Google Analytics.

You can prorammatically disable it by setting `"DEBUG":true` in your
development config file.

The `default.html` template will automatically disable these two items from
being loaded.
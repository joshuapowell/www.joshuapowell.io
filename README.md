# My Personal Website

<img src="https://travis-ci.org/joshuapowell/www.joshuapowell.io.svg?branch=master" alt="" title="" />

## Development Notes

### Disabling Offline Caching
The presence of the `offline.js` service worker can negatively impact basic
page refresh. During development it is advisable to comment out the `<script>`
for the `serviceWorker`.
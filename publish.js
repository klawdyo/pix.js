/* eslint-disable import/no-extraneous-dependencies */
const ghpages = require('gh-pages');

ghpages.publish('site', (err) => {
  if (err) {
    console.log(err);
  }
});

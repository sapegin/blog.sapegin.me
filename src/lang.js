const mri = require('mri');

const args = process.argv.slice(2);

module.exports = mri(args).lang || 'en';

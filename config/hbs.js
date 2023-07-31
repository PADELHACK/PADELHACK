const hbs = require('hbs')
const path = require('path')

// Register partials
hbs.registerPartials(path.join(__dirname, '../views/partials'))

// Register helpers
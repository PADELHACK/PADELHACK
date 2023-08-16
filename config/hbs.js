const hbs = require("hbs");
const path = require("path");

// Register partials
hbs.registerPartials(path.join(__dirname, "../views/partials"));

// Register helpers
hbs.registerHelper('switch', function(value, options) {
    this.switch_value = value;
    return options.fn(this);
  });
  
  hbs.registerHelper('case', function(value, options) {
    if (value == this.switch_value) {
      return options.fn(this);
    }
  });

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

  hbs.registerHelper('isActive', function(index, options) {
    if (index == 0) {
      return options.fn(this);
    }
  });

  hbs.registerHelper('activeFilter', function (options) {
    const { query, param } = options.hash;
  
    if (query && query[param] ) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
  
  hbs.registerHelper('activeItemFilter', function (options) {
    const { query, param, value } = options.hash;
  
    if (query && query[param] === value) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  //evaluar si es admin o superadmin

  hbs.registerHelper('isAdmin', function (user, options) {
    if (user.role === 'Admin' || user.role === 'SuperAdmin') {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });
  



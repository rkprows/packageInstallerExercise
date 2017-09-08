exports.packageInstaller = function(packagesArray) {

  if (!packagesArray) {
    return ("Error - Packages Installer requires an input");
  };

  if (!Array.isArray(packagesArray)) {
    return ("Error - Input must be an array");
  };
  
  packagesArray.forEach(function(package) {
    if (typeof package !== 'string') {
      throw new TypeError (`Error - Input must be an array of strings. Instead got ${typeof package}`);
    };
  });

  if(packagesArray.length === 1) {
    var package = packagesArray[0].split(":");
    return (package[0]);
  }
  var packagesArray = packagesArray;

  var splitPackages = function() {
    var output = [];
    packagesArray.forEach(function(pkg) {
      var pkgs = pkg.split(":");
      // output.push(pkgs)
      var pack = pkgs[0];
      var dep = pkgs[1];
      var result = [pack, dep]

      if(!output[pack]) {
        output[pack] = [];
      } 

      if(!output[dep] && dep.length > 0) {
        output[dep] = [];
      }

      if(dep.length > 0) {
        output[pack].push(dep);
      }
    });
    return (output);
  }

  var sortPackages = function(splitPkgs) {
    var Toposort = require('toposort-class');
    var t = new Toposort();
    splitPkgs.forEach(function(pkg) {
      t.add(pkg);
    });
    return (t.sort());
  };

  return {
    packages: packagesArray,
    install: function() {
      var splitPkgs = splitPackages();
      return sortPackages(splitPkgs).join(",");
    }
  }
};


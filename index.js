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
      var pack = pkgs[0];
      var dep = pkgs[1];
      var result = [pack, dep]

      if(!output.includes(pack)) {
        output[pack] = [];
      } 

      if(!output.includes(dep) && dep.length > 0) {
        output[dep] = [];
      }

      if(dep.length > 0) {
        output[pack].push(dep);
      }
    });
    return (output);
  }

  var sortPackages = function(splitPkgs) {
    var topsort = require('topsort');
    var pkgs = splitPkgs;
    var sorted = topsort(pkgs);
    // HANDLE IF SORTED RETURNS ERROR
    // if (sorted === Error) {
      // throw new Error('Error - Cycle in dependencies')
    // } else {
      // return sorted;
    // }
    return sorted;  
  };

  return {
    installPkgs: function() {
      var splitPkgs = splitPackages(packagesArray);
      return sortPackages(splitPkgs).join(",");
    }
  }
};
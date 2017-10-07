exports.packageInstaller = function(packagesArray) {

  if (!packagesArray) {
    return ("Error - Packages Installer requires an input");
  };

  if (!Array.isArray(packagesArray)) {
    return ("Error - Input must be an array");
  };
  
  packagesArray.forEach(function(package) {
    if (typeof package !== 'string') {
      return (`Error - Input must be an array of strings. Instead got ${typeof package}`);
    };
  });

  if(packagesArray.length === 1) {
    var package = packagesArray[0].split(":");
    return (package[0]);
  }

  var packagesArray = packagesArray;

  var splitPackages = function() {
     var output = {};
    packagesArray.forEach(function(package) {
      var packages = package.split(':');
      var pkg = packages[0].trim();
      var dep = packages[1].trim();

      if (!output[pkg]) {
        output[pkg] = [];
      };
      if (!output[dep] && dep.length > 0) {
        output[dep] = [];
      }; 
      if (dep.length > 0){
        output[pkg].push(dep);
      };
    });
    return output;
  }

  var sortPackages = function(splitPkgs) {
    var output = [];
    var ordered = {};

    Object.keys(splitPkgs).forEach(function(pkg) {
      sort(pkg, []);
    });

    function sort(pkg, parents) {
      if (ordered[pkg]) {
        return;
      }
      [parents].push(pkg);
      var p = splitPkgs[pkg];
      p.forEach(function(dep) {
        if (parents.indexOf(dep) >= 0) {
          return 'Error - Cycle in dependencies';
        } else {
          sort(dep, parents);
        }
      });
      ordered[pkg] = true;
      output.push(pkg);
    }

    return output;   
  };

  return {
    packagesArray: packagesArray,
    installPkgs: function() {
      var splitPkgs = splitPackages(packagesArray);
      return sortPackages(splitPkgs).join(", ");
    }
  };
};
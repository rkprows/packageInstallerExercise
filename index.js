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
    } else {
      return typeof package;
    }
  });
  
}
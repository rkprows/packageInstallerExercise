exports.packageInstaller = function(packagesArray) {
  if (!packagesArray) {
    return ("Error - Packages Installer requires an input");
  };

  if (!Array.isArray(packagesArray)) {
    return ("Error - Input must be an array");
  } else {
    return packagesArray;
  };
}
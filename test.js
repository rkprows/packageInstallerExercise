var expect    = require("chai").expect;
var installer = require("./index.js");

describe("Package Installer", function() {
  it("requires an input", function() {
    expect(installer.packageInstaller()).to.equal("Error - Packages Installer requires an input");
  });
  
  it("rejects anything that is not an array", function() {
    var input = 7;
    expect(installer.packageInstaller(input)).to.equal("Error - Input must be an array");
  });

  it("accepts an array", function() {
    var input = ["one: ", "two: one"];
    expect(installer.packageInstaller(input)).to.be.an('array');
  });

  it("throws error when dependencies cycle", function() {

  });

  it("returns single string when single given single package", function() {
    var input = ["First: "];
    expect(installer.packageInstaller(input).to.equal('First'));
  });

  it("returns a comma separated string", function() {

  });

  it("returns packages in correct order", function() {

  });

});
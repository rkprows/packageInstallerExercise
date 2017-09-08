var expect    = require("chai").expect;
var assert = require("assert");
var installer = require("./index.js");

describe("Package Installer", function() {
  it("requires an input", function() {
    expect(installer.packageInstaller()).to.equal("Error - Packages Installer requires an input");
  });
  
  it("rejects anything that is not an array", function() {
    var input = 7;
    expect(installer.packageInstaller(input)).to.equal("Error - Input must be an array");
  });


  it("fails when input is not array of strings", function() {
    var input = [1, 2, 3];
    expect(installer.packageInstaller(input)).to.throw(TypeError, `Error - Input must be an array of strings. Instead got ${typeof package}`).that.is.a('string');
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
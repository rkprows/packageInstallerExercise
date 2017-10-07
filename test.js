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

  it("throws error when dependencies cycle", function() {
    var input =   ["Leetmeme: Cyberportal", "Cyberportal: Leetmeme"];
    expect(installer.packageInstaller(input).installPkgs()).to.equal('Error - Cycle in dependencies');    
  });

  it("returns single string when single given single package", function() {
    var input = [ "CamelCaser: "];
    expect(installer.packageInstaller(input)).to.equal("CamelCaser");
  });

  it("returns packages in correct order", function() {
    var input =  ["KittenService: ", "Leetmeme: Cyberportal", "Cyberportal: Ice", "CamelCaser: KittenService", "Fraudstream: Leetmeme", "Ice: "]
    expect(installer.packageInstaller(input).installPkgs()).to.equal("KittenService, Ice, Cyberportal, Leetmeme, CamelCaser, Fraudstream");
  });

});
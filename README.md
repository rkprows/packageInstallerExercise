# packageInstallerExercise
The program accepts an array of strings defining packages and their dependencies.
It rejects as invalid a dependency specification that contains cycles.
The program outputs a comma separated string of package names in the order of install, such that a package’s dependency will always precede that package.

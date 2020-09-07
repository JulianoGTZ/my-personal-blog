const execa = require("execa");

(async () => {
  try {
    await execa("git", ["fetch"]);
    console.log("fetching master")
    await execa("git", ["checkout", "--orphan", "gh-pages"]);
    console.log("Building...");
    await execa("yarn", ["build"]);
    // Understand if it's dist or build folder
    const folderName = "build";
    await execa("git", ["add", "--all"]);
    await execa("git", ["commit", "-m", "gh-pages"]);
    console.log("Pushing to gh-pages...");
    await execa("git", ["push", "origin", "HEAD:gh-pages", "--force"]);
    await execa("rm", ["-rf", folderName]);
    await execa("git", ["checkout", "master"]);
    await execa("git", ["branch", "-D", "gh-pages"]);
    console.log("Successfully deployed");
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
})();

const execa = require('execa');

(async () => {
  try {
    await execa('git', ['fetch']);
    console.log('fetching main');
    await execa('git', ['checkout', '--orphan', 'gh-pages']);
    console.log('Building...');
    await execa('yarn', ['build']);
    const folderName = 'build';
    await execa('cp', ['-r', 'public', 'docs']);
    await execa('git', ['add', '--all']);
    await execa('git', ['commit', '-m', 'gh-pages']);
    console.log('Pushing to gh-pages...');
    await execa('git', ['push', 'origin', 'gh-pages', '--force']);
    await execa('rm', ['-rf', folderName]);
    await execa('rm', ['-rf', 'docs']);
    await execa('git', ['checkout', 'main']);
    await execa('git', ['branch', '-D', 'gh-pages']);
    console.log('Successfully deployed');
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
})();

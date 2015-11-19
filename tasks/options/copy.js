module.exports = {
  build: {
    files: [{
      expand: true,
      cwd: 'app',
      src: ['manifest.json', 'img/**/*.*', 'lib/**/*.*', '*.html', 'bower/**/*.*', 'style/*'],
      dest: 'build'
    }]
  },
  debug: {
    files: [{
      expand: true,
      cwd: 'app',
      src: ['manifest.json', 'img/**/*.*', 'lib/**/*.*'],
      dest: 'build'
    }]
  },
  manifest: {
    files: [{
      expand: true,
      cwd: 'app',
      src: ['manifest.json'],
      dest: 'build'
    }]
  },
  img: {
    files: [{
      expand: true,
      cwd: 'app/img/',
      src: ['*'],
      dest: 'build/img'
    }]
  },
  js: {
    files: [{
      expand: true,
      cwd: 'app/scripts/',
      src: ['*.js'],
      dest: 'build/scripts'
    }]
  },
  popup: {
    src: 'app/popup.html',
    dest: 'build/popup.html'
  }
};

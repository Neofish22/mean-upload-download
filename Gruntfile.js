
module.exports = function(grunt) {

  var
    concurrently = 'concurrently --color --kill-others',
    concColMongod = 'black.bgRed.bold',
    concColNode = 'black.bgGreen.bold',
    concColMiddle = 'black.bgYellow.bold',
    concColFront = 'black.bgBlue.bold',
    concColLivereload = 'black.bgMagenta.bold',

    startMongoCmd = 'mongod --config /usr/local/etc/mongod.conf',
    startNodeProdCmd = 'nodemon -w build/middle build/middle/server.js',
    startNodeCmd = 'NODE_ENV=dev ' + startNodeProdCmd,

    buildMiddleCmd = 'tsc -p srv --pretty --preserveWatchOutput',
    buildMiddleProdCmd = buildMiddleCmd,
    watchMiddleCmd = buildMiddleCmd + ' --watch',
    watchMiddleProdCmd = buildMiddleProdCmd + ' --watch',
    lintMiddleCmd = 'tslint -p srv',
    lintMiddleFixCmd = 'tslint -p srv --fix',

    buildFrontCmd = 'ng build --aot --no-progress',
    buildFrontProdCmd = buildFrontCmd + ' --prod --source-map',
    watchFrontCmd = buildFrontCmd + ' --watch',
    watchFrontProdCmd = buildFrontProdCmd + ' --watch',
    lintFrontCmd = 'ng lint',
    lintFrontFixCmd = 'ng lint --fix',

    liveReloadCmd = 'livereload build -w 250',

    clocAllCmd = 'cloc . --exclude-dir=node_modules,build --not-match-f "(package-lock.json)" --force-lang=TypeScript,ts',
    clocCodeCmd = 'cloc . --exclude-dir=node_modules,build --not-match-f "(package-lock.json)|(.spec.ts)" --force-lang=TypeScript,ts',
    clocTestCmd = 'cloc . --exclude-dir=node_modules,build --match-f "(.spec.ts$)" --force-lang=TypeScript,ts',

    mongoClientCmd = 'mongo mean-upload-download -u sam --authenticationDatabase admin'

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Commands to parse.
    exec: {
      // Start servers.
      serve: {
        cmd: `${concurrently} -n "mongod,node,reload" -c "${concColMongod},${concColNode},${concColLivereload}" "${startMongoCmd}" "${startNodeCmd}" "${liveReloadCmd}"`
      },
      // Lint commands config.
      lint: {
        cmd: `${concurrently} -n "middle,front" -c "${concColMiddle},${concColFront}" "${lintMiddleCmd}" "${lintFrontCmd}"`
      },
      lint_fix: {
        cmd: `${concurrently} -n "middle,front" -c "${concColMiddle},${concColFront}" "${lintMiddleCmd}" "${lintFrontCmd}"`
      },
      // Watch commands config.
      watch_dev: {
        cmd: `${concurrently} -n "mongod,node,middle,front,reload" -c "${concColMongod},${concColNode},${concColMiddle},${concColFront},${concColLivereload}" "${startMongoCmd}" "${startNodeCmd}" "${watchMiddleCmd}" "${watchFrontCmd}" "${liveReloadCmd}"`
      },
      watch_prod: {
        cmd: `${concurrently} -n "mongod,node,middle,front,reload" -c "${concColMongod},${concColNode},${concColMiddle},${concColFront},${concColLivereload}" "${startMongoCmd}" "${startNodeProdCmd}" "${watchMiddleProdCmd}" "${watchFrontProdCmd}" "${liveReloadCmd}"`
      },
      // Build commands config.
      build_dev: {
        cmd: `echo "${buildMiddleCmd}" && ${buildMiddleCmd} && echo "${buildFrontCmd}" && ${buildFrontCmd}`
      },
      build_dev_middle: {
        cmd: buildMiddleCmd
      },
      build_dev_front: {
        cmd: buildFrontCmd
      },
      build_prod: {
        cmd: `echo "${buildMiddleProdCmd}" && ${buildMiddleProdCmd} && echo "${buildFrontProdCmd}" && ${buildFrontProdCmd}`
      },
      build_prod_middle: {
        cmd: buildMiddleProdCmd
      },
      build_prod_front: {
        cmd: buildFrontProdCmd
      },
      // cloc commands config.
      cloc_all: {
        cmd: clocAllCmd
      },
      cloc_code: {
        cmd: clocCodeCmd
      },
      cloc_test: {
        cmd: clocTestCmd
      },
      cloc_code_and_test: {
        cmd: `echo "cloc for CODE" && ${clocCodeCmd} && echo "cloc for TEST CODE" && ${clocTestCmd}`
      },
      // Mongo client config.
      mongo_client_connect: {
        cmd: `echo "Run the following command:\n${mongoClientCmd}"`
      }
    }
  })

  // Load plugins.
  grunt.task.loadNpmTasks('grunt-exec')

  // Load additional tasks.
  //grunt.task.loadTasks('tasks')

  // Create synonyms for my exec tasks.
  grunt.registerTask('serve',['exec:serve'])
  grunt.registerTask('lint',['exec:lint'])
  grunt.registerTask('lint-fix',['exec:lint_fix'])
  grunt.registerTask('watch-dev',['exec:watch_dev'])
  grunt.registerTask('watch-prod',['exec:watch_prod'])
  grunt.registerTask('watch',['watch-dev'])
  grunt.registerTask('build-dev',['exec:build_dev'])
  grunt.registerTask('build-prod',['exec:build_prod'])
  grunt.registerTask('build',['build-prod'])
  grunt.registerTask('cloc-all',['exec:cloc_all'])
  grunt.registerTask('cloc-code',['exec:cloc_code'])
  grunt.registerTask('cloc-test',['exec:cloc_test'])
  grunt.registerTask('cloc-both',['exec:cloc_code_and_test'])
  grunt.registerTask('cloc',['cloc-both'])
  grunt.registerTask('mongo',['exec:mongo_client_connect'])

  // Default task(s).
  grunt.registerTask('default', ['watch'])
}

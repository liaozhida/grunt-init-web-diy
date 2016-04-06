// Basic template description.
exports.description = 'Create a umi web project.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '项目名不能包含node或者js，且项目名在代码仓库中是唯一的';

// Template-specific notes to be displayed after question prompts.
exports.after = '安装完毕，请使用 npm install 安装项目依赖，使用 grunt help 可以查看grunt支持的任务。';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = 'Gruntfile.js';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({
    type: 'node'
  }, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('description'),
    init.prompt('version', '1.0.0'),
    init.prompt('author_name'),
    init.prompt('author_email'),
    init.prompt('node_version', '>= 0.12.0'),
    init.prompt('page_dir', ''),
    init.prompt('main', 'index.js'),
    init.prompt('port', '3600'), {
      name: 'gitlab_ci',
      message: 'Will this project be tested with Gitlab CI?',
      default: 'Y/n',
      warning: 'If selected, you must enable Gitlab CI support for this project.'
    }, {
      name: 'mongo',
      message: '是否使用mongo？如果使用，请输入mongdb的数据库名，否则直接回车',
      default: ''
    }, {
      name: 'redis',
      message: '是否使用redis？',
      default: 'Y/n'
    }, {
      name: 'restify',
      message: '是否使用restify？如果使用，请输入远程地址(如http://REST:8080),否则直接回车',
      default: ''
    }, {
      name: 'appsec',
      message: '是否启用appsec的防csrf攻击？启用的话需要所有的POST请求必须携带_csrf字段',
      default: 'Y/n'
    },
  ], function(err, props) {
    props.keywords = [];
    props.homepage = 'http://gitlab.umiit.cn/' + (props.page_dir ? props.page_dir + '/' : '') + props.name;
    props.repository = props.homepage + '.git';
    props.bugs = props.homepage + '/issues';
    props.devDependencies = {
      'grunt-contrib-jshint': '~1.0.0',
      'grunt-contrib-watch': '~1.0.0',
      "grunt-contrib-clean": "~1.0.0",
      "grunt-umi-fis": "^2.0.0",
      "grunt-umi-layout": "^2.0.0",
      "grunt-umi-qiniu": "^2.0.0",
    };

    props.scripts = {
      "start": "./bin/start.sh"
    };

    props.dependencies = {
      "ejs": "^1.0.0",
      "express": "^4.13.0",
      "express-session": "^1.13.0",
      "kraken-js": "^1.0.6",
      "kraken-middleware": "^1.0.3",
      "kraken-util": "^1.0.3",
      "validate-chain": "^1.1.1",
      "log4js": "^0.6.27",
      "async": "^1.5.2",
      "moment": "^2.12.0",
      "uid2": "^0.0.3",
      "util-format": "^2.0.0",
      "util-cipher": "^2.0.0",
    };

    props.redis = /y/i.test(props.redis);
    if (props.redis) {
      props.dependencies['redis'] = "^2.5.3";
    }
    if (props.mongo) {
      props.dependencies['mongoose'] = "^4.4.11";
    }
    if (props.restify) {
      props.dependencies['util-restify'] = "^2.0.0";
    }

    props.gitlab_ci = /y/i.test(props.gitlab_ci);

    props.appsec = /y/i.test(props.appsec) ? 'true' : 'false';

    // Files to copy (and process).
    var files = init.filesToCopy(props);
    if (!props.gitlab_ci) {
      delete files['.gitlab-ci.yml'];
    }

    if (!props.mongo) {
      delete files['models/user.js'];
    }

    // Add properly-named license files.
    // init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file.
    init.writePackageJSON('package.json', props, function(pkg, props) {
      pkg['publishConfig'] = {
        "registry": "http://m2.umiit.cn/content/repositories/npm-umi/"
      };
      pkg['license'] = "MIT";
      return pkg;
    });

    // All done!
    done();
  });

};
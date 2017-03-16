module.exports = function(grunt) {

	//压缩后的代码目录
	var _product_dir = '../dist/browserify-babel-demo';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
        browserify: {
            options: {
               transform: [
                  /**
                   * 两种打包react和翻译es6的方法
                   * 1. 同时使用reactify和babelify(presets里配置1个)
                   * 2. 只使用babelify(presets里配置2个)
                   */
                  // ["reactify", {
                       // //es6翻译不标准，比如const都不会翻译
                       // //es6: true
                  // }],
                //   ["babelify", { //将js转换，翻译。js的翻译的语法取决于presets的配置。配合browserify将nodejs的代码打包成浏览器可识别的。
                //        //sourceMap: true, 是否生成.map文件
                //        //将js的es6,react的jsx语法，翻译成es5，浏览器可识别的js语法
                //        presets: ["D:/我的资料/代码源码/nodejs/tools/node_modules/babel-preset-es2015","D:/我的资料/代码源码/nodejs/tools/node_modules/babel-preset-react"]
                //        //presets: ["D:/我的资料/代码源码/nodejs/tools/node_modules/babel-preset-es2015"]
                //   }]
                	["babelify"]
               ],
			   external: ['jquery'] //jquery作为外部引用
            },
			//开发环境
            develop: {
				options: {
					// watch: true,
                    // keepAlive: true,
					browserifyOptions: {
	 				   debug: true
	 			    }
				},
                expand: true,
                cwd: './develop/page',
                src: ['**/*.js'],
                dest: './bundle'
            },
			//生产环境
			product: {
                expand: true,
                cwd: './develop/page',
                src: ['**/*.js'],
                dest: _product_dir+'/bundle'
			}
       },
	   //压缩
	   uglify: {
		   options: {
			   report: 'gzip'
		   },
		   apps: {
			   cwd: _product_dir+'/bundle',
			   src: ['*.js'],
			   dest: _product_dir+'/bundle',
			   expand: true,
			   flatten: true,
			   ext: '.js'
		   },
		   lib: {
			   cwd: './lib',
			   src: ['*.js'],
			   dest: _product_dir+'/lib',
			   expand: true,
			   flatten: true,
			   ext: '.js'
		   }
	   },
	   //文件复制
	   copy: {
		   html: {
			   expand: true,
			   src: '*.html',
			   dest: _product_dir
		   }
	   }
	});

	grunt.loadNpmTasks("grunt-browserify");
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');

	//grunt develop -v
	grunt.registerTask('develop', ['browserify:develop']);

	//grunt -v
	grunt.registerTask('default', ['browserify:product','uglify','copy']);

};

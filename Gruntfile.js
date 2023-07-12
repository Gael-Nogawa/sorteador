
/* os arquivos foram deletados:
        main.css
        main.less
        main.min.css
        main.scss
        main2.css
        main2.css.map

*/
module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: { // 
                files: {
                    /* 'main.css': 'main.less' */
                    'dev/styles/main.css': 'src/styles/main.less'
                    // origem            destino
                }
            },
            production: {
                options: {
                    compress: true // Para comprimir o main2.css
                },
                files:{
                    'dist/styles/main.min.css': 'src/styles/main.less'
                }
            }
        },

        watch: {
            less: {
                files: ['src/styles/**/*.less'],
                tasks: ['less:development']
            },
            html: {
                files: ['src/index.html'],
                tasks: ['replace:dev']
            }
        },


        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS', //Precisa ser em maiusculo
                            replacement: './styles/main.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS', //Precisa ser em maiusculo
                            replacement: '../src/scripts/main.js'
                        }
                    ]
                },

                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'dev/'
                    }
                ]
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS', //Precisa ser em maiusculo
                            replacement: './styles/main.min.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS', //Precisa ser em maiusculo
                            replacement: './scripts/main.min.js'
                        }
                    ]
                },

                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['prebuild/index.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
            
                },
                files: {
                    'prebuild/index.html': 'src/index.html'
                }
            }
        },
        clean: ['prebuild'],
        uglify: {
            target: {
                files: {
                    'dist/scripts/main.min.js': 'src/scripts/main.js'
                    //destino                   // origem
                }
            }
        }
    })
/* 
        sass: {
            dist: {
                options: {
                    style: 'compressed' // Para que o main2.css também saia minificado.
                },
                files: {
                    'main2.css': 'main.scss'
                }
            }
        },
        concurrent: {
            target: ['olaGrunt', 'less', 'tchauGrunt', 'sass']
        }
        
    })

    grunt.registerTask('olaGrunt', function(){
        const done = this.async(); // Se não tiver essa constante, o Grunt não percebe que é uma tarefa assincrona, e não executa o console.log;
        setInterval(function(){
            console.log('olá, Grunt!');
            done();
        }, 3000)
    })

    grunt.registerTask('tchauGrunt', function(){
        const done = this.async();
        setInterval(function(){
            console.log('tchauuuu, meu amigo Grunt!');
            done();
        }, 10000)
    }) 
*/

    grunt.loadNpmTasks('grunt-contrib-less'); // colocando o plugin dentro do Grunfile.js
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    /*  
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-concurrent');
 */


    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'clean', 'uglify']);


}
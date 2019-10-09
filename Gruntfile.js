module.exports = function(grunt) {

    "use strict";

    var time = new Date(), day = time.getDate(), month = time.getMonth()+1, year = time.getFullYear(), hour = time.getHours(), mins = time.getMinutes(), sec = time.getSeconds();
    var timestamp = (day < 10 ? "0"+day:day) + "/" + (month < 10 ? "0"+month:month) + "/" + (year) + " " + (hour<10?"0"+hour:hour) + ":" + (mins<10?"0"+mins:mins) + ":" + (sec<10?"0"+sec:sec);


    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            build: ['build']
        },

        postcss: {
            options: {
                processors: [
                    require('autoprefixer')
                ]
            },
            dist: {
                src: ['public_html/css/*.css', 'public_html/examples/**/*.css']
            }
        },

        copy: {
            main: {
                expand: true,
                cwd: 'public_html',
                src: "**",
                dest: "build/"
            }
        },

        replace: {
            adsense: {
                options: {
                    patterns: [
                        {
                            match: /<!-- ads-html -->/g,
                            replacement: '\n' +
                                '<!-- Metro UI - Responsive 1 -->\n' +
                                '<ins class="adsbygoogle"\n' +
                                '     style="display:block"\n' +
                                '     data-ad-client="ca-pub-1632668592742327"\n' +
                                '     data-ad-slot="8347181909"\n' +
                                '     data-ad-format="auto"></ins>\n' +
                                '<script>\n' +
                                '(adsbygoogle = window.adsbygoogle || []).push({});\n' +
                                '</script>'
                        },
                        {
                            match: /<!-- ads-script -->/g,
                            replacement: '<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>'
                        },
                        {
                            match: /<!-- ga-script -->/g,
                            replacement: '<script async src="https://www.googletagmanager.com/gtag/js?id=UA-84808651-2"></script>\n' +
                                '<script>\n' +
                                '  window.dataLayer = window.dataLayer || [];\n' +
                                '  function gtag(){dataLayer.push(arguments);}\n' +
                                '  gtag("js", new Date());\n' +
                                '\n' +
                                '  gtag("config", "UA-84808651-2");\n' +
                                '</script>'
                        },
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['build/*.html'], dest: 'build/'
                    }
                ]
            },
            hit_ua: {
                options: {
                    patterns: [
                        {
                            match: /<!-- hit-ua -->/g,
                            replace: "\n" +
                                "<a href='https://hit.ua/?x=136075' target='_blank' style='position: absolute; top: 0; z-index: -1;'>\n" +
                                "<script language=\"javascript\" type=\"text/javascript\"><!--\n" +
                                "Cd=document;Cr=\"&\"+Math.random();Cp=\"&s=1\";\n" +
                                "Cd.cookie=\"b=b\";if(Cd.cookie)Cp+=\"&c=1\";\n" +
                                "Cp+=\"&t=\"+(new Date()).getTimezoneOffset();\n" +
                                "if(self!=top)Cp+=\"&f=1\";\n" +
                                "//--></script>\n" +
                                "<script language=\"javascript1.1\" type=\"text/javascript\"><!--\n" +
                                "if(navigator.javaEnabled())Cp+=\"&j=1\";\n" +
                                "//--></script>\n" +
                                "<script language=\"javascript1.2\" type=\"text/javascript\"><!--\n" +
                                "if(typeof(screen)!='undefined')Cp+=\"&w=\"+screen.width+\"&h=\"+\n" +
                                "screen.height+\"&d=\"+(screen.colorDepth?screen.colorDepth:screen.pixelDepth);\n" +
                                "//--></script>\n" +
                                "<script language=\"javascript\" type=\"text/javascript\"><!--\n" +
                                "Cd.write(\"<img src='//c.hit.ua/hit?i=136075&g=0&x=2\"+Cp+Cr+\n" +
                                "\"&r=\"+escape(Cd.referrer)+\"&u=\"+escape(window.location.href)+\n" +
                                "\"' border='0' wi\"+\"dth='1' he\"+\"ight='1'/>\");\n" +
                                "//--></script></a>\n"
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['build/*.html'], dest: 'build/'
                    }
                ]
            }
        },

        ftp_push: {
            main: {
                options: {
                    authKey: "metroui",
                    host: "eg77.mirohost.net",
                    dest: "metroui.org.ua/",
                    port: 21,
                    incrementalUpdates: false
                },
                files: [
                    {
                        expand: true,
                        cwd: "build",
                        src: ['**/*']
                    }
                ]
            }
        }
    });

    grunt.registerTask('default', [
        'clean',
        'postcss',
        'copy',
        'replace',
        'ftp_push'
    ]);

};
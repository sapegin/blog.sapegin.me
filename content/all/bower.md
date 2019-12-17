---
layout: Post
lang: en
title: 'Bower: why frontend needs a package manager'
date: 2014-07-24
tags:
  - tools
  - build
---

_This article was written in 2014, when npm 2 was the latest, and wasn’t popular among fronted developers because of the issues described in the article. Now use [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/), and consider this article historical._

_This article was first published in the [May 2014 issue](https://xakep.ru/issues/xa/?id=184) of Russian “Hacker” magazine. The article in the magazine is a shortened version; the full one is below. Article was [translated](http://frontendbabel.info/articles/bower-why-frontend-package-manager/) by [George Gritsouk](http://gggritso.com/) for [Frontend Babel](http://frontendbabel.info/)._

Package managers simplify installing and updating project dependencies, which are libraries that it uses: jQuery, Fotorama, everything that is used on your site and isn’t written by you.

Browsing all the library sites, downloading and unpacking the archives, copying files into the projects—all of this is replaced with a few commands in the terminal.

Many programming languages have standard package managers, which developers use to install all libraries: gem for Ruby, pip for Python and others. For server-side JavaScript there is npm (reasons why it’s not suitable for client-side are below), but client-side JavaScript until recently didn’t have anything. There were many different package managers (Jam, Component, Volo, Ender), but the majority of them never became popular, and there is little sense in package managers that can’t install the right packages.

Bower is not the standard package manager for client-side JavaScript, but the most popular one: currently there are more than sixteen thousand packages.

Bower doesn’t prescribe to the user its own build tool, or to the developer a method of including libraries (AMD, CommonJS, etc.) All Bower does is install the right versions of the packages that the project needs and their dependencies. In other words: it downloads source files for the right libraries and everything they need into a special folder. Everything else is up to the developer.

## Why not npm

The main difference between npm and Bower is the approach for installing package dependencies. npm installs dependencies for each package separately, and as a result makes a big package dependency tree (`node_modules/grunt/node_modules/glob/node_modules/...`), where there could be several version of the same package. For client-side JavaScript this is unacceptable: you can’t add two different version for jQuery or any other library to a page. With Bower each package is installed once (jQuery will always be in the `bower_components/jquery` folder, regardless of how many packages depend on it) and in the case of a dependency conflict, Bower simply won’t install the package incompatible with one that’s already installed.

## Installing Bower

To work with Bower you’ll need Node and git. Installation:

```bash
npm install -g bower
```

## Working with packages

Let’s try to install something, for example jQuery:

```bash
bower install --save jquery  # or bower i -S jquery
```

This command will download the latest version of jQuery into the `bower_components/jquery` folder.

The `--save` flag tells Bower that it should save the package name and its version into the `bower.json` manifest file. In this file is a list of all dependencies of the project (packages installed with Bower) and other metadata required for creation of your own packages (more on this at the end of the article). With the package names it’s possible to specify the version with which your project is guaranteed to work.

We don’t have a file like that yet, which is what the line “No bower.json file to save to, use bower init to create one” in the log is about. Let’s create it:

```bash
bower init
```

Bower will ask many questions, but until we want to register our package, answers to most of them don’t matter, you can press Enter.

The question “Set currently installed components as dependencies?” should be answered with “yes”—all previously installed components (in our case it’s jQuery) will be automatically placed in the created JSON file. The question “Would you like to mark this package as private which prevents it from being accidentally published to the registry?” should also be answered “yes”—this will prevent accidental publication of the package into the Bower registry.

Let’s install a few more packages:

```bash
bower install --save social-likes jquery-icheck fotorama
```

And take a look at what we got:

```bash
bower list
bower check-new     Checking for new versions of the project dependencies..
bowertest#0.0.0 /Users/admin/bowertest
├─┬ fotorama#4.5.1
│ └── jquery#2.1.0 (2.1.1-beta1 available)
├── jquery#2.1.0 (2.1.1-beta1 available)
├─┬ jquery-icheck#1.0.2
│ └── jquery#2.1.0 (2.1.1-beta1 available)
└─┬ social-likes#3.0.2
    └── jquery#2.1.0
```

The `bower list` command shows a list of all installed packages. Here we see that all packages depend on jQuery, and that Bower found a version suitable for them all: 2.1.0.

In the file system it looks like this:

```bash
tree -L 2
.
├── bower.json
└── bower_components
    ├── fotorama
    ├── jquery
    ├── jquery-icheck
    └── social-likes

5 directories, 1 file
```

Each package is installed into its own folder, there are no nested packages, and jQuery is only included once. In the project root lies the created by `bower init` file `bower.json`, but now it lists all the packages shown by `bower list`, not just jQuery.

For uninstalling packages the `bower uninstall` command is used:

```bash
bower uninstall --save jquery-icheck  # Or bower un -S jquery-icheck
```

You can confidently delete the `bower_components` directory or add it to your `.gitignore`. The `bower install` (without additional parameters) command will return everything to the way it was:

```bash
bower install
```

### Deploying the project

There are two approaches for deploying a project:

1. Only the manifest file is added to the repository and all packages are installed during deployment. This way there is nothing unnecessary in the repository, but if GitHub crashes during deployment or another server from which packages are installed crashes, there will be problems.
2. The `bower_components` folder as well as `bower.json` are added to the repository. This way deployment doesn’t depend on external servers, but the repository blows up with hundreds (if not thousands) of extra files.

### Semantic versions (semver)

[Semver](http://semver.org/) is, first-of-all, an approach to versioning libraries: a format for version numbers MAJOR.MINOR.PATCH and rules, which have to be followed when incrementing each number.

Secondly, it’s a method of describing necessary dependencies, which is used by Bower and npm.

While installing with the `--save` flag, package version are added to `bower.json` like `~1.0.1`. The tilde at the beginning means that during installation version 1.0.1 will be chosen, or a version with a larger last number (PATCH) if it’s available. This way the installed version will have the latest bug fixes, but will be fully compatible with the one specified in the manifest file.

## Updating dependencies

Bower has a `bower update` command, but it updates packages with respect to the demands of the manifest file. For example, if it lists jQuery ~2.0.0 Bower can update jQuery to version 2.0.9, but 2.1.0 won’t be installed because it doesn’t satisfy the ~2.0.0 formula.

To update packages (and `bower.json`) to the truly latest version you can use the [bower-update](https://github.com/sapegin/bower-update) utility. Installation:

```bash
npm install -g bower-update
```

Launch:

```bash
bower-update
```

## Searching for packages

There are two methods for finding packages with Bower: geeky and normal.

Geeky:

```bash
bower search jquery
Search results:

        jquery git://github.com/jquery/jquery.git
        jquery-ui git://github.com/components/jqueryui
        ...
```

Normal: open [bower.io/search](https://bower.io/search/) in a browser.

## Automatic builds

Bower puts the problem of project builds on the shoulders of the developer. The simplest method is to concatenate the JS files with Grunt, Gulp or any other task runner that you use.

I use Grunt, so I’ll describe how to concatenate the packages with Grunt. There was a [big article](http://nano.sapegin.ru/all/grunt-0-4) on using Grunt in the June issue of last year, so I’ll show my config of the `grunt-contrib-concat` plugin right away:

```javascript
concat: {
    main: {
        src: [
            "bower_components/jquery/jquery.min.js",
            "bower_components/fotorama/….js",
            "bower_components/jquery-icheck/….js",
            "bower_components/social-likes/social-likes.min.js",
            "scripts/*.js"  // Your site’s scripts
        ],
        dest: "build/scripts.js"
    }
}
```

This method has many downsides: you have to watch the files for each package, make sure that the files are assembled in the right order (for example, jQuery has to be higher than scripts depending on it). The [grunt-bower-concat](https://github.com/sapegin/grunt-bower-concat) plugin can do this for you: it automatically concatenates all installed dependencies in the right order into a single file:

```javascript
bower_concat: {
    all: {
        dest: "build/_bower.js",  // Concatenated file
        exclude: [  // Packages excluded from Bower
                "jquery",  // If jQuery is loaded from the Google CDN
                "modernizr"  // If loading scripts at the end of the page, modernizr should be loaded in the <head>
        ]
    }
},
concat: {
    main: {
        src: [
            "build/_bower.js",
            "scripts/*.js"  // You site’s scripts
        ],
        dest: "build/scripts.js"
    }
}
```

## Registering your packages

To make your library available to be installed with Bower it has to be registered. To do this:

- at the root of a project there should be a `bower.json` manifest file.
- the project should be a git repository (for example on GitHub)
- the project should use semantic versioning and the repository should have a git tag for the latest version

To create the manifest file the `bower init` command is used:

```bash
bower init
[?] name: awesomelib
[?] version: 0.0.1
[?] description: My awesome jQuery plugin.
[?] main file: jquery.awesomeplugin
[?] keywords: jquery awesome yay
[?] authors: Artem Sapegin <artem@sapegin.ru>
[?] license: MIT
[?] homepage: https://github.com/sapegn/jquery.awesomeplugin.js
[?] set currently installed components as dependencies? Yes
[?] add commonly ignored files to ignore list? Yes
[?] would you like to mark this package as private which prevents it from being accidentally
    published to the registry? No

{
    name: 'awesomelib',
    version: '0.0.1',
    description: 'My awesome jQuery plugin.',
    main: 'jquery.awesomeplugin.js',
    keywords: [
        'jquery',
        'awesome',
        'yay'
    ],
    authors: [
        'Artem Sapegin <artem@sapegin.ru>'
    ],
    license: 'MIT',
    homepage: 'https://github.com/sapegn/jquery.awesomeplugin',
    ignore: [
        '**/.*',
        'node_modules',
        'bower_components',
        'test',
        'tests'
    ],
    "dependencies": {
        "jquery": "~2.1.0"
    }
}

[?] Looks good? Yes
```

And, although it’s mandatory to fill in the `name` field, other fields are also very useful:

- `description` and `keywords` will help users find your library through the package search interface.
- `main` determines the main file of the package. Thie field can be used by automatic build tools like `grunt-bower-concat`.
- `license`—always specify a license: it tells a potential user of your package whether they can use it in their project. For example, the `GPL` license required that every project using it is also released with the same license, which isn’t always possible.
- `ignore`—by default Bower will download the whole repository, which, firstly, will increase installation time, and, secondly, will add unnecessary files to the project. It’s best to exclude everything except the files required for the package to work (main JS file, CSS, etc.), license and README.
- `dependencies`—all packages on which your package depends.

Now we need to commit the `bower.json` file, create a git tag with the latest version and push it to the remote repository:

```bash
git add bower.json
git commit -m "Add bower.json"
git tag "v0.0.1"
git push origin --tags
```

Now you can register your package:

```bash
bower register jquery-awesomeplugin git://github.com/sapegin/jquery-awesomeplugin.git
```

From now on, Bower will check package updates, you only need to create Git tags for each new version.

To make updating your packages easier you can use tools like [grunt-bump](https://github.com/vojtajina/grunt-bump) or [mversion](https://github.com/mikaelbr/mversion).

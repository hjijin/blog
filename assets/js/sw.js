// Copyright (c) 2020 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// ⚡️ DANGER ZONE ⚡️
// ================
// 

// The shell cache keeps "landmark" resources, like CSS and JS, web fonts, etc.
// which won't change between content updates.
// 
// 
const SHELL_CACHE = "shell-9.1.6--v13--sw/blog/";

// A separate assets cache that won't be invalidated when there's a newer version of Hydejack.
// NOTE: Whenever you make changes to any of the files in yor `assets` folder,
//       increase the cache number, otherwise the changes will *never* be visible to returning visitors.
const ASSETS_CACHE = "assets--v13--sw/blog/";

// The cache for regular content, which will be invalidated every time you make a new build.
const CONTENT_CACHE = "content--2024-05-13T13:33:24+08:00--sw/blog/";

// A URL search parameter you can add to external assets to cache them in the service worker.
const SW_CACHE_SEARCH_PARAM = "sw-cache";
const NO_CACHE_SEARCH_PARAM = "no-cache";

// The regular expression used to find URLs in webfont style sheets.
const RE_CSS_URL = /url\s*\(['"]?(([^'"\\]|\\.)*)['"]?\)/u;

const ICON_FONT = "/blog/assets/icomoon/style.css";
const KATEX_FONT = "/blog/assets/bower_components/katex/dist/katex.min.css";

// 
// 
const GOOGLE_FONTS = "https://fonts.googleapis.com/css?family=Roboto+Slab:700%7CNoto+Sans:400,400i,700,700i&display=swap";
// 

const SHELL_FILES = [
  "/blog/assets/css/hydejack-9.1.6.css",
  "/blog/assets/js/service-worker.js",
];

const STATIC_FILES = [
  /**/"/blog/assets/bower.json",
  /**/"/blog/assets/bower_components/MathJax/LICENSE",
  /**/"/blog/assets/bower_components/MathJax/bower.json",
  /**/"/blog/assets/bower_components/MathJax/composer.json",
  /**/"/blog/assets/bower_components/MathJax/es5/a11y/assistive-mml.js",
  /**/"/blog/assets/bower_components/MathJax/es5/a11y/complexity.js",
  /**/"/blog/assets/bower_components/MathJax/es5/a11y/explorer.js",
  /**/"/blog/assets/bower_components/MathJax/es5/a11y/semantic-enrich.js",
  /**/"/blog/assets/bower_components/MathJax/es5/adaptors/liteDOM.js",
  /**/"/blog/assets/bower_components/MathJax/es5/core.js",
  /**/"/blog/assets/bower_components/MathJax/es5/input/asciimath.js",
  /**/"/blog/assets/bower_components/MathJax/es5/input/mml.js",
  /**/"/blog/assets/bower_components/MathJax/es5/input/mml/entities.js",
  /**/"/blog/assets/bower_components/MathJax/es5/input/tex-base.js",
  /**/"/blog/assets/bower_components/MathJax/es5/input/tex-full.js",
  /**/"/blog/assets/bower_components/MathJax/es5/input/tex.js",
  /**/"/blog/assets/bower_components/MathJax/es5/input/tex/extensions/action.js",
  /**/"/blog/assets/bower_components/MathJax/es5/input/tex/extensions/all-packages.js",
  /**/"/blog/assets/bower_components/MathJax/es5/input/tex/extensions/ams.js",
  /**/"/blog/assets/bower_components/MathJax/es5/input/tex/extensions/amscd.js",
  /**/"/blog/assets/bower_components/MathJax/es5/input/tex/extensions/autoload.js",
  /**/"/blog/assets/bower_components/MathJax/es5/input/tex/extensions/bbox.js",
  /**/"/blog/assets/bower_components/MathJax/es5/input/tex/extensions/boldsymbol.js",
  /**/"/blog/assets/bower_components/MathJax/es5/input/tex/extensions/braket.js",
  /**/"/blog/assets/bower_components/MathJax/es5/input/tex/extensions/bussproofs.js",
  /**/"/blog/assets/bower_components/MathJax/es5/input/tex/extensions/cancel.js",
  /**/"/blog/assets/bower_components/MathJax/es5/input/tex/extensions/color.js",
  /**/"/blog/assets/bower_components/MathJax/es5/input/tex/extensions/colorV2.js",
  /**/"/blog/assets/bower_components/MathJax/es5/input/tex/extensions/configMacros.js",
  /**/"/blog/assets/bower_components/MathJax/es5/input/tex/extensions/enclose.js",
  /**/"/blog/assets/bower_components/MathJax/es5/input/tex/extensions/extpfeil.js",
  /**/"/blog/assets/bower_components/MathJax/es5/input/tex/extensions/html.js",
  /**/"/blog/assets/bower_components/MathJax/es5/input/tex/extensions/mhchem.js",
  /**/"/blog/assets/bower_components/MathJax/es5/input/tex/extensions/newcommand.js",
  /**/"/blog/assets/bower_components/MathJax/es5/input/tex/extensions/noerrors.js",
  /**/"/blog/assets/bower_components/MathJax/es5/input/tex/extensions/noundefined.js",
  /**/"/blog/assets/bower_components/MathJax/es5/input/tex/extensions/physics.js",
  /**/"/blog/assets/bower_components/MathJax/es5/input/tex/extensions/require.js",
  /**/"/blog/assets/bower_components/MathJax/es5/input/tex/extensions/tagFormat.js",
  /**/"/blog/assets/bower_components/MathJax/es5/input/tex/extensions/textmacros.js",
  /**/"/blog/assets/bower_components/MathJax/es5/input/tex/extensions/unicode.js",
  /**/"/blog/assets/bower_components/MathJax/es5/input/tex/extensions/verb.js",
  /**/"/blog/assets/bower_components/MathJax/es5/latest.js",
  /**/"/blog/assets/bower_components/MathJax/es5/loader.js",
  /**/"/blog/assets/bower_components/MathJax/es5/mml-chtml.js",
  /**/"/blog/assets/bower_components/MathJax/es5/mml-svg.js",
  /**/"/blog/assets/bower_components/MathJax/es5/node-main.js",
  /**/"/blog/assets/bower_components/MathJax/es5/output/chtml.js",
  /**/"/blog/assets/bower_components/MathJax/es5/output/chtml/fonts/tex.js",
  /**/"/blog/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_AMS-Regular.woff",
  /**/"/blog/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Calligraphic-Bold.woff",
  /**/"/blog/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Calligraphic-Regular.woff",
  /**/"/blog/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Fraktur-Bold.woff",
  /**/"/blog/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Fraktur-Regular.woff",
  /**/"/blog/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Main-Bold.woff",
  /**/"/blog/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Main-Italic.woff",
  /**/"/blog/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Main-Regular.woff",
  /**/"/blog/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Math-BoldItalic.woff",
  /**/"/blog/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Math-Italic.woff",
  /**/"/blog/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Math-Regular.woff",
  /**/"/blog/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_SansSerif-Bold.woff",
  /**/"/blog/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_SansSerif-Italic.woff",
  /**/"/blog/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_SansSerif-Regular.woff",
  /**/"/blog/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Script-Regular.woff",
  /**/"/blog/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Size1-Regular.woff",
  /**/"/blog/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Size2-Regular.woff",
  /**/"/blog/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Size3-Regular.woff",
  /**/"/blog/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Size4-Regular.woff",
  /**/"/blog/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Typewriter-Regular.woff",
  /**/"/blog/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Vector-Bold.woff",
  /**/"/blog/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Vector-Regular.woff",
  /**/"/blog/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Zero.woff",
  /**/"/blog/assets/bower_components/MathJax/es5/output/svg.js",
  /**/"/blog/assets/bower_components/MathJax/es5/output/svg/fonts/tex.js",
  /**/"/blog/assets/bower_components/MathJax/es5/sre/mathmaps/de.js",
  /**/"/blog/assets/bower_components/MathJax/es5/sre/mathmaps/en.js",
  /**/"/blog/assets/bower_components/MathJax/es5/sre/mathmaps/es.js",
  /**/"/blog/assets/bower_components/MathJax/es5/sre/mathmaps/fr.js",
  /**/"/blog/assets/bower_components/MathJax/es5/sre/mathmaps/mathmaps_ie.js",
  /**/"/blog/assets/bower_components/MathJax/es5/sre/mathmaps/nemeth.js",
  /**/"/blog/assets/bower_components/MathJax/es5/sre/sre-node.js",
  /**/"/blog/assets/bower_components/MathJax/es5/sre/sre_browser.js",
  /**/"/blog/assets/bower_components/MathJax/es5/startup.js",
  /**/"/blog/assets/bower_components/MathJax/es5/tex-chtml-full.js",
  /**/"/blog/assets/bower_components/MathJax/es5/tex-chtml.js",
  /**/"/blog/assets/bower_components/MathJax/es5/tex-mml-chtml.js",
  /**/"/blog/assets/bower_components/MathJax/es5/tex-mml-svg.js",
  /**/"/blog/assets/bower_components/MathJax/es5/tex-svg-full.js",
  /**/"/blog/assets/bower_components/MathJax/es5/tex-svg.js",
  /**/"/blog/assets/bower_components/MathJax/es5/ui/menu.js",
  /**/"/blog/assets/bower_components/MathJax/es5/ui/safe.js",
  /**/"/blog/assets/bower_components/MathJax/package.json",
  /**/"/blog/assets/bower_components/html5shiv/Gruntfile.js",
  /**/"/blog/assets/bower_components/html5shiv/bower.json",
  /**/"/blog/assets/bower_components/html5shiv/dist/html5shiv-printshiv.js",
  /**/"/blog/assets/bower_components/html5shiv/dist/html5shiv-printshiv.min.js",
  /**/"/blog/assets/bower_components/html5shiv/dist/html5shiv.js",
  /**/"/blog/assets/bower_components/html5shiv/dist/html5shiv.min.js",
  /**/"/blog/assets/bower_components/html5shiv/package.json",
  /**/"/blog/assets/bower_components/katex/LICENSE",
  /**/"/blog/assets/bower_components/katex/bower.json",
  /**/"/blog/assets/bower_components/katex/dist/contrib/auto-render.js",
  /**/"/blog/assets/bower_components/katex/dist/contrib/auto-render.min.js",
  /**/"/blog/assets/bower_components/katex/dist/contrib/auto-render.mjs",
  /**/"/blog/assets/bower_components/katex/dist/contrib/copy-tex.css",
  /**/"/blog/assets/bower_components/katex/dist/contrib/copy-tex.js",
  /**/"/blog/assets/bower_components/katex/dist/contrib/copy-tex.min.css",
  /**/"/blog/assets/bower_components/katex/dist/contrib/copy-tex.min.js",
  /**/"/blog/assets/bower_components/katex/dist/contrib/copy-tex.mjs",
  /**/"/blog/assets/bower_components/katex/dist/contrib/mathtex-script-type.js",
  /**/"/blog/assets/bower_components/katex/dist/contrib/mathtex-script-type.min.js",
  /**/"/blog/assets/bower_components/katex/dist/contrib/mathtex-script-type.mjs",
  /**/"/blog/assets/bower_components/katex/dist/contrib/mhchem.js",
  /**/"/blog/assets/bower_components/katex/dist/contrib/mhchem.min.js",
  /**/"/blog/assets/bower_components/katex/dist/contrib/mhchem.mjs",
  /**/"/blog/assets/bower_components/katex/dist/contrib/render-a11y-string.js",
  /**/"/blog/assets/bower_components/katex/dist/contrib/render-a11y-string.min.js",
  /**/"/blog/assets/bower_components/katex/dist/contrib/render-a11y-string.mjs",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_AMS-Regular.ttf",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_AMS-Regular.woff",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_AMS-Regular.woff2",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Caligraphic-Bold.ttf",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Caligraphic-Bold.woff",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Caligraphic-Bold.woff2",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Caligraphic-Regular.ttf",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Caligraphic-Regular.woff",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Caligraphic-Regular.woff2",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Fraktur-Bold.ttf",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Fraktur-Bold.woff",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Fraktur-Bold.woff2",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Fraktur-Regular.ttf",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Fraktur-Regular.woff",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Fraktur-Regular.woff2",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Main-Bold.ttf",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Main-Bold.woff",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Main-Bold.woff2",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Main-BoldItalic.ttf",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Main-BoldItalic.woff",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Main-BoldItalic.woff2",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Main-Italic.ttf",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Main-Italic.woff",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Main-Italic.woff2",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Main-Regular.ttf",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Main-Regular.woff",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Main-Regular.woff2",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Math-BoldItalic.ttf",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Math-BoldItalic.woff",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Math-BoldItalic.woff2",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Math-Italic.ttf",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Math-Italic.woff",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Math-Italic.woff2",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Bold.ttf",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Bold.woff",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Bold.woff2",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Italic.ttf",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Italic.woff",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Italic.woff2",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Regular.ttf",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Regular.woff",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Regular.woff2",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Script-Regular.ttf",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Script-Regular.woff",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Script-Regular.woff2",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Size1-Regular.ttf",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Size1-Regular.woff",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Size1-Regular.woff2",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Size2-Regular.ttf",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Size2-Regular.woff",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Size2-Regular.woff2",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Size3-Regular.ttf",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Size3-Regular.woff",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Size3-Regular.woff2",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Size4-Regular.ttf",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Size4-Regular.woff",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Size4-Regular.woff2",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Typewriter-Regular.ttf",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Typewriter-Regular.woff",
  /**/"/blog/assets/bower_components/katex/dist/fonts/KaTeX_Typewriter-Regular.woff2",
  /**/"/blog/assets/bower_components/katex/dist/katex.css",
  /**/"/blog/assets/bower_components/katex/dist/katex.js",
  /**/"/blog/assets/bower_components/katex/dist/katex.min.css",
  /**/"/blog/assets/bower_components/katex/dist/katex.min.js",
  /**/"/blog/assets/bower_components/katex/dist/katex.mjs",
  /**/"/blog/assets/bower_components/katex/flow-typed/npm/jest_v24.x.x.js",
  /**/"/blog/assets/bower_components/katex/yarn.lock",
  /**/"/blog/assets/css/lightbox.css",
  /**/"/blog/assets/icomoon/fonts/icomoon.eot",
  /**/"/blog/assets/icomoon/fonts/icomoon.svg",
  /**/"/blog/assets/icomoon/fonts/icomoon.ttf",
  /**/"/blog/assets/icomoon/fonts/icomoon.woff",
  /**/"/blog/assets/icomoon/selection.json",
  /**/"/blog/assets/icomoon/style.css",
  /**/"/blog/assets/icons/favicon.ico",
  /**/"/blog/assets/icons/icon-120x120.png",
  /**/"/blog/assets/icons/icon-144x144.png",
  /**/"/blog/assets/icons/icon-152x152.png",
  /**/"/blog/assets/icons/icon-192x192.png",
  /**/"/blog/assets/icons/icon-384x384.png",
  /**/"/blog/assets/icons/icon-512x512.png",
  /**/"/blog/assets/icons/icon-72x72.png",
  /**/"/blog/assets/icons/icon-96x96.png",
  /**/"/blog/assets/img/daily/funny/2013/2013-02-20/1.gif",
  /**/"/blog/assets/img/daily/funny/2013/2013-02-20/10.gif",
  /**/"/blog/assets/img/daily/funny/2013/2013-02-20/11.gif",
  /**/"/blog/assets/img/daily/funny/2013/2013-02-20/12.gif",
  /**/"/blog/assets/img/daily/funny/2013/2013-02-20/13.gif",
  /**/"/blog/assets/img/daily/funny/2013/2013-02-20/14.gif",
  /**/"/blog/assets/img/daily/funny/2013/2013-02-20/15.gif",
  /**/"/blog/assets/img/daily/funny/2013/2013-02-20/16.gif",
  /**/"/blog/assets/img/daily/funny/2013/2013-02-20/17.gif",
  /**/"/blog/assets/img/daily/funny/2013/2013-02-20/18.gif",
  /**/"/blog/assets/img/daily/funny/2013/2013-02-20/19.gif",
  /**/"/blog/assets/img/daily/funny/2013/2013-02-20/2.gif",
  /**/"/blog/assets/img/daily/funny/2013/2013-02-20/3.gif",
  /**/"/blog/assets/img/daily/funny/2013/2013-02-20/4.gif",
  /**/"/blog/assets/img/daily/funny/2013/2013-02-20/5.gif",
  /**/"/blog/assets/img/daily/funny/2013/2013-02-20/6.gif",
  /**/"/blog/assets/img/daily/funny/2013/2013-02-20/7.gif",
  /**/"/blog/assets/img/daily/funny/2013/2013-02-20/8.gif",
  /**/"/blog/assets/img/daily/funny/2013/2013-02-20/9.gif",
  /**/"/blog/assets/img/development/client/2013-06-28/architecture.jpg",
  /**/"/blog/assets/img/development/client/2015-08-02/1.jpg",
  /**/"/blog/assets/img/development/server/2016-05-06/branch_default.jpg",
  /**/"/blog/assets/img/mynameis007.png",
  /**/"/blog/assets/img/sidebar-bg.jpg",
  /**/"/blog/assets/img/swipe.svg",
  /**/"/blog/assets/js/0-hydejack-9.1.6.worker.js",
  /**/"/blog/assets/js/LEGACY-0-hydejack-9.1.6.worker.js",
  /**/"/blog/assets/js/LEGACY-clap-button-hydejack-9.1.6.js",
  /**/"/blog/assets/js/LEGACY-drawer-hydejack-9.1.6.js",
  /**/"/blog/assets/js/LEGACY-fetch-hydejack-9.1.6.js",
  /**/"/blog/assets/js/LEGACY-hydejack-9.1.6.js",
  /**/"/blog/assets/js/LEGACY-navbar-hydejack-9.1.6.js",
  /**/"/blog/assets/js/LEGACY-push-state-hydejack-9.1.6.js",
  /**/"/blog/assets/js/LEGACY-resize-observer-hydejack-9.1.6.js",
  /**/"/blog/assets/js/LEGACY-search-hydejack-9.1.6.js",
  /**/"/blog/assets/js/LEGACY-shadydom-hydejack-9.1.6.js",
  /**/"/blog/assets/js/LEGACY-toc-hydejack-9.1.6.js",
  /**/"/blog/assets/js/LEGACY-vendors~clap-button-hydejack-9.1.6.js",
  /**/"/blog/assets/js/LEGACY-vendors~drawer-hydejack-9.1.6.js",
  /**/"/blog/assets/js/LEGACY-vendors~drawer~push-state-hydejack-9.1.6.js",
  /**/"/blog/assets/js/LEGACY-vendors~drawer~push-state~search-hydejack-9.1.6.js",
  /**/"/blog/assets/js/LEGACY-vendors~fetch-hydejack-9.1.6.js",
  /**/"/blog/assets/js/LEGACY-vendors~intersection-observer-hydejack-9.1.6.js",
  /**/"/blog/assets/js/LEGACY-vendors~push-state-hydejack-9.1.6.js",
  /**/"/blog/assets/js/LEGACY-vendors~search-hydejack-9.1.6.js",
  /**/"/blog/assets/js/LEGACY-vendors~shadydom-hydejack-9.1.6.js",
  /**/"/blog/assets/js/LEGACY-vendors~webanimations-hydejack-9.1.6.js",
  /**/"/blog/assets/js/LEGACY-vendors~webcomponents-hydejack-9.1.6.js",
  /**/"/blog/assets/js/LEGACY-webcomponents-hydejack-9.1.6.js",
  /**/"/blog/assets/js/clap-button-hydejack-9.1.6.js",
  /**/"/blog/assets/js/clap-button.js",
  /**/"/blog/assets/js/drawer-hydejack-9.1.6.js",
  /**/"/blog/assets/js/fetch-hydejack-9.1.6.js",
  /**/"/blog/assets/js/hydejack-9.1.6.js",
  /**/"/blog/assets/js/lightbox.js",
  /**/"/blog/assets/js/navbar-hydejack-9.1.6.js",
  /**/"/blog/assets/js/push-state-hydejack-9.1.6.js",
  /**/"/blog/assets/js/resize-observer-hydejack-9.1.6.js",
  /**/"/blog/assets/js/search-hydejack-9.1.6.js",
  /**/"/blog/assets/js/shadydom-hydejack-9.1.6.js",
  /**/"/blog/assets/js/sidebar-folder.js",
  /**/"/blog/assets/js/toc-hydejack-9.1.6.js",
  /**/"/blog/assets/js/vendors~clap-button-hydejack-9.1.6.js",
  /**/"/blog/assets/js/vendors~drawer-hydejack-9.1.6.js",
  /**/"/blog/assets/js/vendors~drawer~push-state-hydejack-9.1.6.js",
  /**/"/blog/assets/js/vendors~drawer~push-state~search-hydejack-9.1.6.js",
  /**/"/blog/assets/js/vendors~fetch-hydejack-9.1.6.js",
  /**/"/blog/assets/js/vendors~intersection-observer-hydejack-9.1.6.js",
  /**/"/blog/assets/js/vendors~push-state-hydejack-9.1.6.js",
  /**/"/blog/assets/js/vendors~search-hydejack-9.1.6.js",
  /**/"/blog/assets/js/vendors~shadydom-hydejack-9.1.6.js",
  /**/"/blog/assets/js/vendors~webanimations-hydejack-9.1.6.js",
  /**/"/blog/assets/js/webcomponents-hydejack-9.1.6.js",
  /**/"/blog/assets/version.json",
  /**/"/blog/assets/%E4%B8%AA%E4%BA%BA%E7%AE%80%E5%8E%86.pdf",
  /**/"/blog/node_modules/re-template-tag/LICENSE",
  /**/"/blog/node_modules/re-template-tag/cjs/index.js",
  /**/"/blog/node_modules/re-template-tag/esm/index.js",
  /**/"/blog/node_modules/re-template-tag/package.json",
  /**/"/blog/node_modules/re-template-tag/test/index_test.js",
  /**/"/blog/package-lock.json",
  /**/"/blog/package.json",
  /**/"/blog/yarn.lock",
  /**/
];

const PRE_CACHED_ASSETS = [
  '/blog/assets/icons/favicon.ico',
  /**/"/blog/assets/img/sidebar-bg.jpg",/**/
  /**/"/blog/assets/img/mynameis007.png",/**/
  /**/"/blog/assets/img/swipe.svg",
  /**/
];

// Files we add on every service worker installation.
const CONTENT_FILES = [
  "/blog/",
  "/blog/offline.html",
  /**/"/blog/licenses/",
  /**/
];

const SITE_URL = new URL("/blog/", self.location);
const OFFLINE_PAGE_URL = new URL("/blog/offline.html", self.location);

self.addEventListener("install", e => e.waitUntil(onInstall(e)));
self.addEventListener("activate", e => e.waitUntil(onActivate(e)));
self.addEventListener("fetch", e => e.respondWith(onFetch(e)));

// Takes a URL with pathname like `/foo/bar/file.txt` and returns just the dirname like `/foo/bar/`.
const dirname = ({ pathname }) => pathname.replace(/[^/]*$/, "");

function matchAll(text, regExp) {
  const globalRegExp = new RegExp(regExp, 'g'); // force global regexp to prevent infinite loop
  const matches = [];
  let lastMatch;
  while (lastMatch = globalRegExp.exec(text)) matches.push(lastMatch);
  return matches;
}

// Returns the second element of an iterable (first match in RegExp match array)
const second = ([, _]) => _;

const toAbsoluteURL = url => new URL(url, self.location);

// Creates a URL that bypasses the browser's HTTP cache by appending a random search parameter.
function noCache(url) {
  return new Request(url, { cache: 'no-store' });
}

// Removes the sw search paramter, if present.
function noSWParam(url) {
  const url2 = new URL(url);
  if (url2.searchParams.has(SW_CACHE_SEARCH_PARAM)) {
    url2.searchParams.delete(SW_CACHE_SEARCH_PARAM);
    return url2.href;
  }
  return url;
}

const warn = (e) => {
  console.warn(e);
  return new Response(e.message, { status: 500 });
}

async function getIconFontFiles() {
  const fontURLs = STATIC_FILES.filter(x => (
    x.startsWith('/blog/assets/icomoon/fonts/') &&
    x.endsWith('.woff') 
  ));
  return [ICON_FONT, ...fontURLs];
}
 
async function getKaTeXFontFiles() {
  const fontURLs = STATIC_FILES.filter(x => (
    x.startsWith('/blog/assets/bower_components/katex/dist/fonts/') &&
    x.endsWith('.woff2')
  ));
  return [KATEX_FONT, ...fontURLs];
}

async function getMathJaxFiles() {
  // NOTE: Removed due to MathJax' enormous size. 
  // Uncomment if you're using MathJax and don't mind forcing a 50 MB download on every visitor...
  /*
  const mathJaxFiles = STATIC_FILES.filter(x => (
    x.startsWith('/blog/assets/bower_components/MathJax/es5/') &&
    x.endsWith('.js')
  ));
  const fontURLs = STATIC_FILES.filter(x => (
    x.startsWith('/blog/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2') &&
    x.endsWith('.woff')
  ));
  return [...mathJaxFiles, ...fontURLs];
  */
}

async function getGoogleFontsFiles() {
  const googleFontRes = await fetch(noCache(GOOGLE_FONTS)).catch(warn);
  if (googleFontRes.ok) {
    const text = await googleFontRes.text();
    return [GOOGLE_FONTS, ...matchAll(text, RE_CSS_URL).map(second)];
  }
  return [];
}

function addAll(cache, urls) {
  return Promise.all(
    urls.map(url => (
      fetch(noCache(toAbsoluteURL(url)))
        .then(res => cache.put(url, res))
        .catch(warn)
      )
    )
  );
}

async function cacheShell(cache) {
  const fontFiles = await Promise.all([
    getIconFontFiles(),
    /**/getGoogleFontsFiles(),/**/
    /**/
    /**/getMathJaxFiles(),/**/
  ]);

  const jsFiles = STATIC_FILES.filter(url => (
    url.startsWith('/blog/assets/js/') &&
    url.endsWith('.js') && !url.includes('LEGACY')
  ));

  const urls = SHELL_FILES.concat(jsFiles, ...fontFiles).filter(x => !!x);
  return addAll(cache, urls);
}

async function cacheAssets(cache) {
  const urls = PRE_CACHED_ASSETS.filter(x => !!x);
  return addAll(cache, urls);
}

async function cacheContent(cache) {
  const urls = CONTENT_FILES.filter(x => !!x);
  return addAll(cache, urls);
}

async function preCache() {
  const keys = await caches.keys();

  if (keys.includes(SHELL_CACHE) && keys.includes(ASSETS_CACHE)) {
    const contentCache = await caches.open(CONTENT_CACHE);
    return cacheContent(contentCache);
  } else {
    const [shellCache, assetsCache, contentCache] = await Promise.all([
      caches.open(SHELL_CACHE),
      caches.open(ASSETS_CACHE),
      caches.open(CONTENT_CACHE),
    ]);
    return Promise.all([
      cacheShell(shellCache),
      cacheAssets(assetsCache),
      cacheContent(contentCache),
    ]);
  }
}

async function onInstall() {
  await preCache();
  return self.skipWaiting();
}

const isSameSite = ({ origin, pathname }) => origin === SITE_URL.origin && pathname.startsWith(SITE_URL.pathname);
const isAsset = ({ pathname }) => pathname.startsWith("/blog/assets");
const hasSWParam = ({ searchParams }) => searchParams.has(SW_CACHE_SEARCH_PARAM);
const hasNoCacheParam = ({ searchParams }) => searchParams.has(NO_CACHE_SEARCH_PARAM);
const isGoogleFonts = ({ hostname }) => hostname === 'fonts.googleapis.com' || hostname === 'fonts.gstatic.com'

async function cacheResponse(cacheName, req, res) {
  const cache = await caches.open(cacheName);
  return cache.put(req, res);
}

async function onActivate() {
  await self.clients.claim();

  const keys = await caches.keys();

  return Promise.all(
    keys
      // Only consider caches created by this baseurl, i.e. allow multiple Hydejack installations on same domain.
      .filter(key => key.endsWith("sw/blog/"))
      // Delete old caches
      .filter(key => key !== SHELL_CACHE && key !== ASSETS_CACHE && key !== CONTENT_CACHE)
      .map(key => caches.delete(key))
  );
}

const NEVER = new Promise(() => {});

// Returns the first promise that resolves with non-nullish value,
// or `undefined` if all promises resolve with a nullish value.
// Note that this inherits the behavior of `Promise.race`,
// where the returned promise rejects as soon as one input promise rejects.
async function raceTruthy(iterable) {
  const ps = [...iterable].map(_ => Promise.resolve(_));
  let { length } = ps;
  const continueWhenNullish = value => value != null
    ? value
    : --length > 0
      ? NEVER
      : undefined;
  return Promise.race(ps.map(p => p.then(continueWhenNullish)));
}

async function fromNetwork(url, ...args) {
  const cacheName = isAsset(url) || hasSWParam(url) ? ASSETS_CACHE : CONTENT_CACHE;
  return fetchAndCache(cacheName, url, ...args);
}

async function fetchAndCache(cacheName, url, request, e) {
  const response = await fetch(noCache(noSWParam(url)));
  if (response.ok) e.waitUntil(cacheResponse(cacheName, request, response.clone()));
  return response;
}

async function onFetch(e) {
  const { request } = e;
  const url = new URL(request.url);

  // Bypass
  // ------
  // Go to network for non-GET request and Google Analytics right away.
  const shouldCache = isSameSite(url) || hasSWParam(url) || isGoogleFonts(url);
  if (request.method !== "GET" || !shouldCache || hasNoCacheParam(url)) {
    return fetch(request).catch(e => Promise.reject(e));
  }

  try {
    // Caches
    // ------
    const matching = await raceTruthy([
      caches.open(SHELL_CACHE).then(c => c.match(url.href, { ignoreSearch: true })),
      caches.open(ASSETS_CACHE).then(c => c.match(url.href, { ignoreSearch: true })),
      caches.open(CONTENT_CACHE).then(c => c.match(url.href, { ignoreSearch: true })),
    ]);

    if (matching) return matching;

    // Network
    // -------
    // Got to network otherwise. Show 404 when there's a network error.
    // TODO: Use separate offline site instead of 404!?
    return await fromNetwork(url, request, e);
  } catch (err) {
    // console.error(err)
    const cache = await caches.open(CONTENT_CACHE);
    return cache.match(OFFLINE_PAGE_URL);
  }
}

// 


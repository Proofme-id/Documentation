/*
 * Vendored, patched copy of websequencediagrams-docsify@2.0.1
 * (https://unpkg.com/websequencediagrams-docsify@2.0.1/dist/docsify-websequencediagrams.js)
 *
 * WHY VENDORED INSTEAD OF LOADED FROM unpkg: the plugin has been unmaintained since its
 * only published release (2.0.1, no newer version on npm as of this fix), and docsify v5
 * changed the HTML it generates for a fenced code block's <code> element from a single
 * class (`class="lang-websequencediagrams"` in v4) to two classes
 * (`class="lang-websequencediagrams language-websequencediagrams"` in v5 — confirmed by
 * diffing the compiled docsify@4 vs docsify@5 CDN bundles). The plugin looked up that
 * element with an EXACT-match CSS attribute selector (`code[class=lang-websequencediagrams]`),
 * which only matches when the class attribute's value is that exact string with nothing
 * else — so under v5 it always returned null, and `realDiagram.textContent` threw
 * "Cannot read properties of null (reading 'textContent')" for every sequence-diagram code
 * block on the site (used across examples.md, intro/identifications.md, diagrams/*.md,
 * components/signalling.md).
 *
 * ONLY CHANGE from the upstream 2.0.1 source: the querySelector below now uses a class
 * selector (`code.lang-websequencediagrams`), which matches regardless of any additional
 * classes present — correct under both docsify v4 and v5's output, so this vendored copy
 * doesn't reintroduce a v4-only assumption either.
 */
const $c79ae9c9c83a6e0a$var$Docsify_WebSequenceDiagram = {
};
$c79ae9c9c83a6e0a$var$Docsify_WebSequenceDiagram.loadWSD = function() {
    var wsdScript = document.createElement("script");
    wsdScript.id = "wsd_loaded";
    wsdScript.src = "https://www.websequencediagrams.com/service.js";
    window.Docsify.dom.$.head.appendChild(wsdScript);
};
$c79ae9c9c83a6e0a$var$Docsify_WebSequenceDiagram.loadWSDCss = function() {
    const styleElem = document.createElement("style");
    window.Docsify.dom.$.head.appendChild(styleElem);
    const cssText = `.loader {
        border: 16px solid #f3f3f3; /* Light grey */
        border-top: 16px solid #3498db; /* Blue */
        border-radius: 50%;
        width: 120px;
        height: 120px;
        animation: spin 2s linear infinite;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }`;
    if (styleElem.styleSheet) // This is required for IE8 and below.
    styleElem.styleSheet.cssText = cssText;
    else styleElem.appendChild(document.createTextNode(cssText));
};
$c79ae9c9c83a6e0a$var$Docsify_WebSequenceDiagram.toBeginWith = 0;
$c79ae9c9c83a6e0a$var$Docsify_WebSequenceDiagram.divIds = [];
let $c79ae9c9c83a6e0a$var$plugin = (hook, vm)=>{
    hook.afterEach(function(html, next) {
        // We load the HTML inside a DOM node to allow for manipulation
        var htmlElement = document.createElement("div");
        htmlElement.innerHTML = html;
        htmlElement.querySelectorAll("pre[data-lang=websequencediagrams]").forEach((element)=>{
            var divId = `WebSequenceDiagram_${$c79ae9c9c83a6e0a$var$Docsify_WebSequenceDiagram.toBeginWith++}`;
            // Fetches the diagram text
            // PATCHED: was `code[class=lang-websequencediagrams]` (exact match, broken
            // under docsify v5's two-class output — see file header).
            var realDiagram = element.querySelector("code.lang-websequencediagrams");
            // Creates a structure as mentioned in websequencediagrams api
            // here: https://www.websequencediagrams.com/embedding.html
            var preTag = document.createElement("pre");
            var replacement = document.createElement("div");
            replacement.setAttribute("wsd_style", "modern-blue");
            replacement.setAttribute("id", divId);
            replacement.classList.add("wsd");
            var loader = document.createElement("div");
            loader.classList.add('loader');
            preTag.innerHTML = realDiagram.textContent;
            replacement.appendChild(preTag);
            replacement.appendChild(loader);
            preTag.hidden = true;
            $c79ae9c9c83a6e0a$var$Docsify_WebSequenceDiagram.divIds.push(divId);
            // Replace the code with the diagram generation expectation
            element.parentNode.replaceChild(replacement, element);
        });
        // Do the magic!
        next(htmlElement.innerHTML);
        // In case of WSD already present in the space, it needs to be recalled
        setTimeout(function wsd_present_diagrams() {
            if (window.document.querySelector("#wsd_loaded")) {
                var myConcern = document.querySelector("#wsd_loaded");
                myConcern.parentNode.removeChild(myConcern);
                $c79ae9c9c83a6e0a$var$Docsify_WebSequenceDiagram.loadWSD();
            } else setTimeout(wsd_present_diagrams, 100); // else re-schedule
        }, 1000);
    });
    hook.ready(function() {
        // Lets the websequence do the magic
        window.Docsify.dom.documentReady(function() {
            $c79ae9c9c83a6e0a$var$Docsify_WebSequenceDiagram.loadWSD();
            $c79ae9c9c83a6e0a$var$Docsify_WebSequenceDiagram.loadWSDCss();
        });
    });
};
var $c79ae9c9c83a6e0a$export$2e2bcd8739ae039 = $c79ae9c9c83a6e0a$var$plugin;


if (!window.$docsify) window.$docsify = {
};
window.$docsify.plugins = (window.$docsify.plugins || []).concat($c79ae9c9c83a6e0a$export$2e2bcd8739ae039);

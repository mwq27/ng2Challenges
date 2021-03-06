System.register(["angular2/src/facade/async", "angular2/src/dom/dom_adapter", "../view/view", "./style_url_resolver", "./shadow_dom_strategy", "./util"], function($__export) {
  "use strict";
  var Promise,
      DOM,
      viewModule,
      StyleUrlResolver,
      ShadowDomStrategy,
      moveViewNodesIntoParent,
      NativeShadowDomStrategy;
  return {
    setters: [function($__m) {
      Promise = $__m.Promise;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      viewModule = $__m;
    }, function($__m) {
      StyleUrlResolver = $__m.StyleUrlResolver;
    }, function($__m) {
      ShadowDomStrategy = $__m.ShadowDomStrategy;
    }, function($__m) {
      moveViewNodesIntoParent = $__m.moveViewNodesIntoParent;
    }],
    execute: function() {
      NativeShadowDomStrategy = (function($__super) {
        function NativeShadowDomStrategy(styleUrlResolver) {
          $traceurRuntime.superConstructor(NativeShadowDomStrategy).call(this);
          this.styleUrlResolver = styleUrlResolver;
        }
        return ($traceurRuntime.createClass)(NativeShadowDomStrategy, {
          attachTemplate: function(el, view) {
            moveViewNodesIntoParent(DOM.createShadowRoot(el), view);
          },
          processStyleElement: function(hostComponentId, templateUrl, styleEl) {
            var cssText = DOM.getText(styleEl);
            cssText = this.styleUrlResolver.resolveUrls(cssText, templateUrl);
            DOM.setText(styleEl, cssText);
            return null;
          }
        }, {}, $__super);
      }(ShadowDomStrategy));
      $__export("NativeShadowDomStrategy", NativeShadowDomStrategy);
      Object.defineProperty(NativeShadowDomStrategy, "parameters", {get: function() {
          return [[StyleUrlResolver]];
        }});
      Object.defineProperty(NativeShadowDomStrategy.prototype.attachTemplate, "parameters", {get: function() {
          return [[], [viewModule.RenderView]];
        }});
      Object.defineProperty(NativeShadowDomStrategy.prototype.processStyleElement, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string], []];
        }});
    }
  };
});
//# sourceMappingURL=native_shadow_dom_strategy.js.map

//# sourceMappingURL=../../../../src/render/dom/shadow_dom/native_shadow_dom_strategy.js.map
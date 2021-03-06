System.register(["angular2/di", "angular2/src/core/annotations/view", "angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/reflection/reflection"], function($__export) {
  "use strict";
  var Injectable,
      View,
      Type,
      stringify,
      isBlank,
      BaseException,
      Map,
      MapWrapper,
      List,
      ListWrapper,
      reflector,
      TemplateResolver;
  return {
    setters: [function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      View = $__m.View;
    }, function($__m) {
      Type = $__m.Type;
      stringify = $__m.stringify;
      isBlank = $__m.isBlank;
      BaseException = $__m.BaseException;
    }, function($__m) {
      Map = $__m.Map;
      MapWrapper = $__m.MapWrapper;
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      reflector = $__m.reflector;
    }],
    execute: function() {
      TemplateResolver = (function() {
        function TemplateResolver() {
          this._cache = MapWrapper.create();
        }
        return ($traceurRuntime.createClass)(TemplateResolver, {
          resolve: function(component) {
            var view = MapWrapper.get(this._cache, component);
            if (isBlank(view)) {
              view = this._resolve(component);
              MapWrapper.set(this._cache, component, view);
            }
            return view;
          },
          _resolve: function(component) {
            var annotations = reflector.annotations(component);
            for (var i = 0; i < annotations.length; i++) {
              var annotation = annotations[i];
              if (annotation instanceof View) {
                return annotation;
              }
            }
            throw new BaseException(("No template found for " + stringify(component)));
          }
        }, {});
      }());
      $__export("TemplateResolver", TemplateResolver);
      Object.defineProperty(TemplateResolver, "annotations", {get: function() {
          return [new Injectable()];
        }});
      Object.defineProperty(TemplateResolver.prototype.resolve, "parameters", {get: function() {
          return [[Type]];
        }});
      Object.defineProperty(TemplateResolver.prototype._resolve, "parameters", {get: function() {
          return [[Type]];
        }});
    }
  };
});
//# sourceMappingURL=template_resolver.js.map

//# sourceMappingURL=../../../src/core/compiler/template_resolver.js.map
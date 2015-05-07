System.register(["angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/reflection/reflection", "./key", "./annotations", "./exceptions"], function($__export) {
  "use strict";
  var Type,
      isBlank,
      isPresent,
      CONST,
      List,
      MapWrapper,
      ListWrapper,
      reflector,
      Key,
      Inject,
      InjectLazy,
      InjectPromise,
      Optional,
      DependencyAnnotation,
      NoAnnotationError,
      Dependency,
      _EMPTY_LIST,
      Binding,
      ResolvedBinding,
      BindingBuilder;
  function bind(token) {
    return new BindingBuilder(token);
  }
  function _constructDependencies(factoryFunction, dependencies) {
    return isBlank(dependencies) ? _dependenciesFor(factoryFunction) : ListWrapper.map(dependencies, (function(t) {
      return Dependency.fromKey(Key.get(t));
    }));
  }
  function _dependenciesFor(typeOrFunc) {
    var params = reflector.parameters(typeOrFunc);
    if (isBlank(params))
      return [];
    if (ListWrapper.any(params, (function(p) {
      return isBlank(p);
    })))
      throw new NoAnnotationError(typeOrFunc);
    return ListWrapper.map(params, (function(p) {
      return _extractToken(typeOrFunc, p);
    }));
  }
  function _extractToken(typeOrFunc, annotations) {
    var depProps = [];
    var token = null;
    var optional = false;
    var lazy = false;
    var asPromise = false;
    for (var i = 0; i < annotations.length; ++i) {
      var paramAnnotation = annotations[i];
      if (paramAnnotation instanceof Type) {
        token = paramAnnotation;
      } else if (paramAnnotation instanceof Inject) {
        token = paramAnnotation.token;
      } else if (paramAnnotation instanceof InjectPromise) {
        token = paramAnnotation.token;
        asPromise = true;
      } else if (paramAnnotation instanceof InjectLazy) {
        token = paramAnnotation.token;
        lazy = true;
      } else if (paramAnnotation instanceof Optional) {
        optional = true;
      } else if (paramAnnotation instanceof DependencyAnnotation) {
        if (isPresent(paramAnnotation.token)) {
          token = paramAnnotation.token;
        }
        ListWrapper.push(depProps, paramAnnotation);
      }
    }
    if (isPresent(token)) {
      return _createDependency(token, asPromise, lazy, optional, depProps);
    } else {
      throw new NoAnnotationError(typeOrFunc);
    }
  }
  function _createDependency(token, asPromise, lazy, optional, depProps) {
    return new Dependency(Key.get(token), asPromise, lazy, optional, depProps);
  }
  $__export("bind", bind);
  return {
    setters: [function($__m) {
      Type = $__m.Type;
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
      CONST = $__m.CONST;
    }, function($__m) {
      List = $__m.List;
      MapWrapper = $__m.MapWrapper;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      reflector = $__m.reflector;
    }, function($__m) {
      Key = $__m.Key;
    }, function($__m) {
      Inject = $__m.Inject;
      InjectLazy = $__m.InjectLazy;
      InjectPromise = $__m.InjectPromise;
      Optional = $__m.Optional;
      DependencyAnnotation = $__m.DependencyAnnotation;
    }, function($__m) {
      NoAnnotationError = $__m.NoAnnotationError;
    }],
    execute: function() {
      Dependency = (function() {
        function Dependency(key, asPromise, lazy, optional, properties) {
          this.key = key;
          this.asPromise = asPromise;
          this.lazy = lazy;
          this.optional = optional;
          this.properties = properties;
        }
        return ($traceurRuntime.createClass)(Dependency, {}, {fromKey: function(key) {
            return new Dependency(key, false, false, false, []);
          }});
      }());
      $__export("Dependency", Dependency);
      Object.defineProperty(Dependency, "parameters", {get: function() {
          return [[Key], [assert.type.boolean], [assert.type.boolean], [assert.type.boolean], [List]];
        }});
      Object.defineProperty(Dependency.fromKey, "parameters", {get: function() {
          return [[Key]];
        }});
      _EMPTY_LIST = [];
      Binding = (function() {
        function Binding(token, $__2) {
          var $__3 = $__2,
              toClass = $__3.toClass,
              toValue = $__3.toValue,
              toAlias = $__3.toAlias,
              toFactory = $__3.toFactory,
              toAsyncFactory = $__3.toAsyncFactory,
              deps = $__3.deps;
          this.token = token;
          this.toClass = toClass;
          this.toValue = toValue;
          this.toAlias = toAlias;
          this.toFactory = toFactory;
          this.toAsyncFactory = toAsyncFactory;
          this.dependencies = deps;
        }
        return ($traceurRuntime.createClass)(Binding, {resolve: function() {
            var $__0 = this;
            var factoryFn;
            var resolvedDeps;
            var isAsync = false;
            if (isPresent(this.toClass)) {
              factoryFn = reflector.factory(this.toClass);
              resolvedDeps = _dependenciesFor(this.toClass);
            } else if (isPresent(this.toAlias)) {
              factoryFn = (function(aliasInstance) {
                return aliasInstance;
              });
              resolvedDeps = [Dependency.fromKey(Key.get(this.toAlias))];
            } else if (isPresent(this.toFactory)) {
              factoryFn = this.toFactory;
              resolvedDeps = _constructDependencies(this.toFactory, this.dependencies);
            } else if (isPresent(this.toAsyncFactory)) {
              factoryFn = this.toAsyncFactory;
              resolvedDeps = _constructDependencies(this.toAsyncFactory, this.dependencies);
              isAsync = true;
            } else {
              factoryFn = (function() {
                return $__0.toValue;
              });
              resolvedDeps = _EMPTY_LIST;
            }
            return new ResolvedBinding(Key.get(this.token), factoryFn, resolvedDeps, isAsync);
          }}, {});
      }());
      $__export("Binding", Binding);
      Object.defineProperty(Binding, "annotations", {get: function() {
          return [new CONST()];
        }});
      ResolvedBinding = (function() {
        function ResolvedBinding(key, factory, dependencies, providedAsPromise) {
          this.key = key;
          this.factory = factory;
          this.dependencies = dependencies;
          this.providedAsPromise = providedAsPromise;
        }
        return ($traceurRuntime.createClass)(ResolvedBinding, {}, {});
      }());
      $__export("ResolvedBinding", ResolvedBinding);
      Object.defineProperty(ResolvedBinding, "parameters", {get: function() {
          return [[Key], [Function], [assert.genericType(List, Dependency)], [assert.type.boolean]];
        }});
      BindingBuilder = (function() {
        function BindingBuilder(token) {
          this.token = token;
        }
        return ($traceurRuntime.createClass)(BindingBuilder, {
          toClass: function(type) {
            return new Binding(this.token, {toClass: type});
          },
          toValue: function(value) {
            return new Binding(this.token, {toValue: value});
          },
          toAlias: function(aliasToken) {
            return new Binding(this.token, {toAlias: aliasToken});
          },
          toFactory: function(factoryFunction) {
            var dependencies = arguments[1] !== (void 0) ? arguments[1] : null;
            return new Binding(this.token, {
              toFactory: factoryFunction,
              deps: dependencies
            });
          },
          toAsyncFactory: function(factoryFunction) {
            var dependencies = arguments[1] !== (void 0) ? arguments[1] : null;
            return new Binding(this.token, {
              toAsyncFactory: factoryFunction,
              deps: dependencies
            });
          }
        }, {});
      }());
      $__export("BindingBuilder", BindingBuilder);
      Object.defineProperty(BindingBuilder.prototype.toClass, "parameters", {get: function() {
          return [[Type]];
        }});
      Object.defineProperty(BindingBuilder.prototype.toFactory, "parameters", {get: function() {
          return [[Function], [List]];
        }});
      Object.defineProperty(BindingBuilder.prototype.toAsyncFactory, "parameters", {get: function() {
          return [[Function], [List]];
        }});
      Object.defineProperty(_constructDependencies, "parameters", {get: function() {
          return [[Function], [List]];
        }});
    }
  };
});
//# sourceMappingURL=binding.js.map

//# sourceMappingURL=../../src/di/binding.js.map
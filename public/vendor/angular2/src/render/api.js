System.register(["angular2/src/facade/lang", "angular2/src/facade/async", "angular2/src/facade/collection", "angular2/change_detection"], function($__export) {
  "use strict";
  var isPresent,
      Promise,
      List,
      Map,
      ASTWithSource,
      EventBinding,
      ElementBinder,
      DirectiveBinder,
      ProtoViewDto,
      DirectiveMetadata,
      ProtoViewRef,
      ViewRef,
      RenderViewContainerRef,
      ViewDefinition,
      Renderer,
      EventDispatcher;
  return {
    setters: [function($__m) {
      isPresent = $__m.isPresent;
    }, function($__m) {
      Promise = $__m.Promise;
    }, function($__m) {
      List = $__m.List;
      Map = $__m.Map;
    }, function($__m) {
      ASTWithSource = $__m.ASTWithSource;
    }],
    execute: function() {
      EventBinding = (function() {
        function EventBinding(fullName, source) {
          this.fullName = fullName;
          this.source = source;
        }
        return ($traceurRuntime.createClass)(EventBinding, {}, {});
      }());
      $__export("EventBinding", EventBinding);
      Object.defineProperty(EventBinding, "parameters", {get: function() {
          return [[assert.type.string], [ASTWithSource]];
        }});
      ElementBinder = (function() {
        function ElementBinder($__1) {
          var $__2 = $__1,
              index = $__2.index,
              parentIndex = $__2.parentIndex,
              distanceToParent = $__2.distanceToParent,
              directives = $__2.directives,
              nestedProtoView = $__2.nestedProtoView,
              propertyBindings = $__2.propertyBindings,
              variableBindings = $__2.variableBindings,
              eventBindings = $__2.eventBindings,
              textBindings = $__2.textBindings,
              readAttributes = $__2.readAttributes;
          this.index = index;
          this.parentIndex = parentIndex;
          this.distanceToParent = distanceToParent;
          this.directives = directives;
          this.nestedProtoView = nestedProtoView;
          this.propertyBindings = propertyBindings;
          this.variableBindings = variableBindings;
          this.eventBindings = eventBindings;
          this.textBindings = textBindings;
          this.readAttributes = readAttributes;
        }
        return ($traceurRuntime.createClass)(ElementBinder, {}, {});
      }());
      $__export("ElementBinder", ElementBinder);
      DirectiveBinder = (function() {
        function DirectiveBinder($__1) {
          var $__2 = $__1,
              directiveIndex = $__2.directiveIndex,
              propertyBindings = $__2.propertyBindings,
              eventBindings = $__2.eventBindings,
              hostPropertyBindings = $__2.hostPropertyBindings;
          this.directiveIndex = directiveIndex;
          this.propertyBindings = propertyBindings;
          this.eventBindings = eventBindings;
          this.hostPropertyBindings = hostPropertyBindings;
        }
        return ($traceurRuntime.createClass)(DirectiveBinder, {}, {});
      }());
      $__export("DirectiveBinder", DirectiveBinder);
      ProtoViewDto = (function() {
        function ProtoViewDto() {
          var $__1 = arguments[0] !== (void 0) ? arguments[0] : {},
              render = $__1.render,
              elementBinders = $__1.elementBinders,
              variableBindings = $__1.variableBindings,
              type = $__1.type;
          this.render = render;
          this.elementBinders = elementBinders;
          this.variableBindings = variableBindings;
          this.type = type;
        }
        return ($traceurRuntime.createClass)(ProtoViewDto, {}, {
          get HOST_VIEW_TYPE() {
            return 0;
          },
          get COMPONENT_VIEW_TYPE() {
            return 1;
          },
          get EMBEDDED_VIEW_TYPE() {
            return 1;
          }
        });
      }());
      $__export("ProtoViewDto", ProtoViewDto);
      DirectiveMetadata = (function() {
        function DirectiveMetadata($__1) {
          var $__2 = $__1,
              id = $__2.id,
              selector = $__2.selector,
              compileChildren = $__2.compileChildren,
              hostListeners = $__2.hostListeners,
              hostProperties = $__2.hostProperties,
              properties = $__2.properties,
              readAttributes = $__2.readAttributes,
              type = $__2.type;
          this.id = id;
          this.selector = selector;
          this.compileChildren = isPresent(compileChildren) ? compileChildren : true;
          this.hostListeners = hostListeners;
          this.hostProperties = hostProperties;
          this.properties = properties;
          this.readAttributes = readAttributes;
          this.type = type;
        }
        return ($traceurRuntime.createClass)(DirectiveMetadata, {}, {
          get DECORATOR_TYPE() {
            return 0;
          },
          get COMPONENT_TYPE() {
            return 1;
          },
          get VIEWPORT_TYPE() {
            return 2;
          }
        });
      }());
      $__export("DirectiveMetadata", DirectiveMetadata);
      ProtoViewRef = (function() {
        function ProtoViewRef() {}
        return ($traceurRuntime.createClass)(ProtoViewRef, {}, {});
      }());
      $__export("ProtoViewRef", ProtoViewRef);
      ViewRef = (function() {
        function ViewRef() {}
        return ($traceurRuntime.createClass)(ViewRef, {}, {});
      }());
      $__export("ViewRef", ViewRef);
      RenderViewContainerRef = (function() {
        function RenderViewContainerRef(view, elementIndex) {
          this.view = view;
          this.elementIndex = elementIndex;
        }
        return ($traceurRuntime.createClass)(RenderViewContainerRef, {}, {});
      }());
      $__export("RenderViewContainerRef", RenderViewContainerRef);
      Object.defineProperty(RenderViewContainerRef, "parameters", {get: function() {
          return [[ViewRef], [assert.type.number]];
        }});
      ViewDefinition = (function() {
        function ViewDefinition($__1) {
          var $__2 = $__1,
              componentId = $__2.componentId,
              absUrl = $__2.absUrl,
              template = $__2.template,
              directives = $__2.directives;
          this.componentId = componentId;
          this.absUrl = absUrl;
          this.template = template;
          this.directives = directives;
        }
        return ($traceurRuntime.createClass)(ViewDefinition, {}, {});
      }());
      $__export("ViewDefinition", ViewDefinition);
      Renderer = (function() {
        function Renderer() {}
        return ($traceurRuntime.createClass)(Renderer, {
          createHostProtoView: function(componentId) {
            return null;
          },
          createImperativeComponentProtoView: function(rendererId) {
            return null;
          },
          compile: function(template) {
            return null;
          },
          mergeChildComponentProtoViews: function(protoViewRef, componentProtoViewRefs) {
            return null;
          },
          createViewInContainer: function(vcRef, atIndex, protoViewRef) {
            return null;
          },
          destroyViewInContainer: function(vcRef, atIndex) {},
          insertViewIntoContainer: function(vcRef, atIndex, view) {},
          detachViewFromContainer: function(vcRef, atIndex) {},
          createDynamicComponentView: function(hostViewRef, elementIndex, componentProtoViewRef) {
            return null;
          },
          destroyDynamicComponentView: function(hostViewRef, elementIndex) {},
          createInPlaceHostView: function(parentViewRef, hostElementSelector, hostProtoViewRef) {
            return null;
          },
          destroyInPlaceHostView: function(parentViewRef, hostViewRef) {},
          setElementProperty: function(view, elementIndex, propertyName, propertyValue) {},
          setText: function(view, textNodeIndex, text) {},
          setEventDispatcher: function(viewRef, dispatcher) {},
          flush: function() {}
        }, {});
      }());
      $__export("Renderer", Renderer);
      Object.defineProperty(Renderer.prototype.compile, "parameters", {get: function() {
          return [[ViewDefinition]];
        }});
      Object.defineProperty(Renderer.prototype.mergeChildComponentProtoViews, "parameters", {get: function() {
          return [[ProtoViewRef], [assert.genericType(List, ProtoViewRef)]];
        }});
      Object.defineProperty(Renderer.prototype.createViewInContainer, "parameters", {get: function() {
          return [[RenderViewContainerRef], [assert.type.number], [ProtoViewRef]];
        }});
      Object.defineProperty(Renderer.prototype.destroyViewInContainer, "parameters", {get: function() {
          return [[RenderViewContainerRef], [assert.type.number]];
        }});
      Object.defineProperty(Renderer.prototype.insertViewIntoContainer, "parameters", {get: function() {
          return [[RenderViewContainerRef], [assert.type.number], [ViewRef]];
        }});
      Object.defineProperty(Renderer.prototype.detachViewFromContainer, "parameters", {get: function() {
          return [[RenderViewContainerRef], [assert.type.number]];
        }});
      Object.defineProperty(Renderer.prototype.createDynamicComponentView, "parameters", {get: function() {
          return [[ViewRef], [assert.type.number], [ProtoViewRef]];
        }});
      Object.defineProperty(Renderer.prototype.destroyDynamicComponentView, "parameters", {get: function() {
          return [[ViewRef], [assert.type.number]];
        }});
      Object.defineProperty(Renderer.prototype.createInPlaceHostView, "parameters", {get: function() {
          return [[ViewRef], [], [ProtoViewRef]];
        }});
      Object.defineProperty(Renderer.prototype.destroyInPlaceHostView, "parameters", {get: function() {
          return [[ViewRef], [ViewRef]];
        }});
      Object.defineProperty(Renderer.prototype.setElementProperty, "parameters", {get: function() {
          return [[ViewRef], [assert.type.number], [assert.type.string], [assert.type.any]];
        }});
      Object.defineProperty(Renderer.prototype.setText, "parameters", {get: function() {
          return [[ViewRef], [assert.type.number], [assert.type.string]];
        }});
      Object.defineProperty(Renderer.prototype.setEventDispatcher, "parameters", {get: function() {
          return [[ViewRef], [assert.type.any]];
        }});
      EventDispatcher = (function() {
        function EventDispatcher() {}
        return ($traceurRuntime.createClass)(EventDispatcher, {dispatchEvent: function(elementIndex, eventName, locals) {}}, {});
      }());
      $__export("EventDispatcher", EventDispatcher);
      Object.defineProperty(EventDispatcher.prototype.dispatchEvent, "parameters", {get: function() {
          return [[assert.type.number], [assert.type.string], [assert.genericType(Map, assert.type.string, assert.type.any)]];
        }});
    }
  };
});
//# sourceMappingURL=api.js.map

//# sourceMappingURL=../../src/render/api.js.map
System.register(["angular2/src/facade/lang"], function($__export) {
  "use strict";
  var StringWrapper,
      RegExpWrapper,
      isPresent,
      NG_BINDING_CLASS_SELECTOR,
      NG_BINDING_CLASS,
      EVENT_TARGET_SEPARATOR,
      CAMEL_CASE_REGEXP,
      DASH_CASE_REGEXP;
  function camelCaseToDashCase(input) {
    return StringWrapper.replaceAllMapped(input, CAMEL_CASE_REGEXP, (function(m) {
      return '-' + m[1].toLowerCase();
    }));
  }
  function dashCaseToCamelCase(input) {
    return StringWrapper.replaceAllMapped(input, DASH_CASE_REGEXP, (function(m) {
      return m[1].toUpperCase();
    }));
  }
  $__export("camelCaseToDashCase", camelCaseToDashCase);
  $__export("dashCaseToCamelCase", dashCaseToCamelCase);
  return {
    setters: [function($__m) {
      StringWrapper = $__m.StringWrapper;
      RegExpWrapper = $__m.RegExpWrapper;
      isPresent = $__m.isPresent;
    }],
    execute: function() {
      NG_BINDING_CLASS_SELECTOR = '.ng-binding';
      $__export("NG_BINDING_CLASS_SELECTOR", NG_BINDING_CLASS_SELECTOR);
      NG_BINDING_CLASS = 'ng-binding';
      $__export("NG_BINDING_CLASS", NG_BINDING_CLASS);
      EVENT_TARGET_SEPARATOR = ':';
      $__export("EVENT_TARGET_SEPARATOR", EVENT_TARGET_SEPARATOR);
      CAMEL_CASE_REGEXP = RegExpWrapper.create('([A-Z])');
      DASH_CASE_REGEXP = RegExpWrapper.create('-([a-z])');
      Object.defineProperty(camelCaseToDashCase, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(dashCaseToCamelCase, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
    }
  };
});
//# sourceMappingURL=util.js.map

//# sourceMappingURL=../../../src/render/dom/util.js.map
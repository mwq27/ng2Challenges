System.register(["angular2/angular2", "./validators", "./directives"], function($__export) {
  "use strict";
  var Decorator,
      Validators,
      ControlDirective,
      RequiredValidatorDirective;
  return {
    setters: [function($__m) {
      Decorator = $__m.Decorator;
    }, function($__m) {
      Validators = $__m.Validators;
    }, function($__m) {
      ControlDirective = $__m.ControlDirective;
    }],
    execute: function() {
      RequiredValidatorDirective = (function() {
        function RequiredValidatorDirective(c) {
          c.validator = Validators.compose([c.validator, Validators.required]);
        }
        return ($traceurRuntime.createClass)(RequiredValidatorDirective, {}, {});
      }());
      $__export("RequiredValidatorDirective", RequiredValidatorDirective);
      Object.defineProperty(RequiredValidatorDirective, "annotations", {get: function() {
          return [new Decorator({selector: '[required]'})];
        }});
      Object.defineProperty(RequiredValidatorDirective, "parameters", {get: function() {
          return [[ControlDirective]];
        }});
    }
  };
});
//# sourceMappingURL=validator_directives.js.map

//# sourceMappingURL=../../src/forms/validator_directives.js.map
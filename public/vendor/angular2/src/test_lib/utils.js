System.register(["angular2/src/facade/collection", "angular2/src/dom/dom_adapter", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var List,
      ListWrapper,
      DOM,
      isPresent,
      Log;
  function viewRootNodes(view) {
    return view.render.delegate.rootNodes;
  }
  function queryView(view, selector) {
    var rootNodes = viewRootNodes(view);
    for (var i = 0; i < rootNodes.length; ++i) {
      var res = DOM.querySelector(rootNodes[i], selector);
      if (isPresent(res)) {
        return res;
      }
    }
    return null;
  }
  function dispatchEvent(element, eventType) {
    DOM.dispatchEvent(element, DOM.createEvent(eventType));
  }
  function el(html) {
    return DOM.firstChild(DOM.content(DOM.createTemplate(html)));
  }
  $__export("viewRootNodes", viewRootNodes);
  $__export("queryView", queryView);
  $__export("dispatchEvent", dispatchEvent);
  $__export("el", el);
  return {
    setters: [function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      isPresent = $__m.isPresent;
    }],
    execute: function() {
      Log = (function() {
        function Log() {
          this._result = [];
        }
        return ($traceurRuntime.createClass)(Log, {
          add: function(value) {
            ListWrapper.push(this._result, value);
          },
          fn: function(value) {
            var $__0 = this;
            return (function() {
              ListWrapper.push($__0._result, value);
            });
          },
          result: function() {
            return ListWrapper.join(this._result, "; ");
          }
        }, {});
      }());
      $__export("Log", Log);
    }
  };
});
//# sourceMappingURL=utils.js.map

//# sourceMappingURL=../../src/test_lib/utils.js.map
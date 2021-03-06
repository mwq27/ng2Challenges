System.register(["angular2/src/facade/lang", "angular2/src/facade/collection", "./abstract_change_detector", "./change_detection_util", "./directive_record", "./proto_record"], function($__export) {
  "use strict";
  var isPresent,
      isBlank,
      BaseException,
      Type,
      List,
      ListWrapper,
      MapWrapper,
      StringMapWrapper,
      AbstractChangeDetector,
      ChangeDetectionUtil,
      DirectiveIndex,
      DirectiveRecord,
      ProtoRecord,
      RECORD_TYPE_SELF,
      RECORD_TYPE_PROPERTY,
      RECORD_TYPE_LOCAL,
      RECORD_TYPE_INVOKE_METHOD,
      RECORD_TYPE_CONST,
      RECORD_TYPE_INVOKE_CLOSURE,
      RECORD_TYPE_PRIMITIVE_OP,
      RECORD_TYPE_KEYED_ACCESS,
      RECORD_TYPE_PIPE,
      RECORD_TYPE_BINDING_PIPE,
      RECORD_TYPE_INTERPOLATE,
      ABSTRACT_CHANGE_DETECTOR,
      UTIL,
      DISPATCHER_ACCESSOR,
      PIPE_REGISTRY_ACCESSOR,
      PROTOS_ACCESSOR,
      DIRECTIVES_ACCESSOR,
      CONTEXT_ACCESSOR,
      IS_CHANGED_LOCAL,
      CHANGES_LOCAL,
      LOCALS_ACCESSOR,
      MODE_ACCESSOR,
      TEMP_LOCAL,
      CURRENT_PROTO,
      ChangeDetectorJITGenerator;
  function typeTemplate(type, cons, detectChanges, notifyOnAllChangesDone, setContext) {
    return ("\n" + cons + "\n" + detectChanges + "\n" + notifyOnAllChangesDone + "\n" + setContext + ";\n\nreturn function(dispatcher, pipeRegistry) {\n  return new " + type + "(dispatcher, pipeRegistry, protos, directiveRecords);\n}\n");
  }
  function constructorTemplate(type, fieldsDefinitions) {
    return ("\nvar " + type + " = function " + type + "(dispatcher, pipeRegistry, protos, directiveRecords) {\n" + ABSTRACT_CHANGE_DETECTOR + ".call(this);\n" + DISPATCHER_ACCESSOR + " = dispatcher;\n" + PIPE_REGISTRY_ACCESSOR + " = pipeRegistry;\n" + PROTOS_ACCESSOR + " = protos;\n" + DIRECTIVES_ACCESSOR + " = directiveRecords;\n" + LOCALS_ACCESSOR + " = null;\n" + fieldsDefinitions + "\n}\n\n" + type + ".prototype = Object.create(" + ABSTRACT_CHANGE_DETECTOR + ".prototype);\n");
  }
  function pipeOnDestroyTemplate(pipeNames) {
    return pipeNames.map((function(p) {
      return (p + ".onDestroy()");
    })).join("\n");
  }
  function hydrateTemplate(type, mode, fieldDefinitions, pipeOnDestroy, directiveFieldNames, detectorFieldNames) {
    var directiveInit = "";
    for (var i = 0; i < directiveFieldNames.length; ++i) {
      directiveInit += (directiveFieldNames[i] + " = directives.getDirectiveFor(this.directiveRecords[" + i + "].directiveIndex);\n");
    }
    var detectorInit = "";
    for (var i = 0; i < detectorFieldNames.length; ++i) {
      detectorInit += (detectorFieldNames[i] + " = directives.getDetectorFor(this.directiveRecords[" + i + "].directiveIndex);\n");
    }
    return ("\n" + type + ".prototype.hydrate = function(context, locals, directives) {\n  " + MODE_ACCESSOR + " = \"" + mode + "\";\n  " + CONTEXT_ACCESSOR + " = context;\n  " + LOCALS_ACCESSOR + " = locals;\n  " + directiveInit + "\n  " + detectorInit + "\n}\n" + type + ".prototype.dehydrate = function() {\n  " + pipeOnDestroy + "\n  " + fieldDefinitions + "\n  " + LOCALS_ACCESSOR + " = null;\n}\n" + type + ".prototype.hydrated = function() {\n  return " + CONTEXT_ACCESSOR + " !== " + UTIL + ".unitialized();\n}\n");
  }
  function detectChangesTemplate(type, body) {
    return ("\n" + type + ".prototype.detectChangesInRecords = function(throwOnChange) {\n  " + body + "\n}\n");
  }
  function callOnAllChangesDoneTemplate(type, body) {
    return ("\n" + type + ".prototype.callOnAllChangesDone = function() {\n  " + body + "\n}\n");
  }
  function onAllChangesDoneTemplate(directive) {
    return (directive + ".onAllChangesDone();");
  }
  function detectChangesBodyTemplate(localDefinitions, changeDefinitions, records) {
    return ("\n" + localDefinitions + "\n" + changeDefinitions + "\nvar " + TEMP_LOCAL + ";\nvar " + IS_CHANGED_LOCAL + " = false;\nvar " + CURRENT_PROTO + ";\nvar " + CHANGES_LOCAL + " = null;\n\ncontext = " + CONTEXT_ACCESSOR + ";\n" + records + "\n");
  }
  function pipeCheckTemplate(protoIndex, context, bindingPropagationConfig, pipe, pipeType, oldValue, newValue, change, update, addToChanges, lastInDirective) {
    return ("\n" + CURRENT_PROTO + " = " + PROTOS_ACCESSOR + "[" + protoIndex + "];\nif (" + pipe + " === " + UTIL + ".unitialized()) {\n  " + pipe + " = " + PIPE_REGISTRY_ACCESSOR + ".get('" + pipeType + "', " + context + ", " + bindingPropagationConfig + ");\n} else if (!" + pipe + ".supports(" + context + ")) {\n  " + pipe + ".onDestroy();\n  " + pipe + " = " + PIPE_REGISTRY_ACCESSOR + ".get('" + pipeType + "', " + context + ", " + bindingPropagationConfig + ");\n}\n\n" + newValue + " = " + pipe + ".transform(" + context + ");\nif (! " + UTIL + ".noChangeMarker(" + newValue + ")) {\n  " + change + " = true;\n  " + update + "\n  " + addToChanges + "\n  " + oldValue + " = " + newValue + ";\n}\n" + lastInDirective + "\n");
  }
  function referenceCheckTemplate(protoIndex, assignment, oldValue, newValue, change, update, addToChanges, lastInDirective) {
    return ("\n" + CURRENT_PROTO + " = " + PROTOS_ACCESSOR + "[" + protoIndex + "];\n" + assignment + "\nif (" + newValue + " !== " + oldValue + " || (" + newValue + " !== " + newValue + ") && (" + oldValue + " !== " + oldValue + ")) {\n  " + change + " = true;\n  " + update + "\n  " + addToChanges + "\n  " + oldValue + " = " + newValue + ";\n}\n" + lastInDirective + "\n");
  }
  function assignmentTemplate(field, value) {
    return (field + " = " + value + ";");
  }
  function localDefinitionsTemplate(names) {
    return names.map((function(n) {
      return ("var " + n + ";");
    })).join("\n");
  }
  function changeDefinitionsTemplate(names) {
    return names.map((function(n) {
      return ("var " + n + " = false;");
    })).join("\n");
  }
  function fieldDefinitionsTemplate(names) {
    return names.map((function(n) {
      return (n + " = " + UTIL + ".unitialized();");
    })).join("\n");
  }
  function ifChangedGuardTemplate(changeNames, body) {
    var cond = changeNames.join(" || ");
    return ("\nif (" + cond + ") {\n  " + body + "\n}\n");
  }
  function addToChangesTemplate(oldValue, newValue) {
    return (CHANGES_LOCAL + " = " + UTIL + ".addChange(" + CHANGES_LOCAL + ", " + CURRENT_PROTO + ".bindingRecord.propertyName, " + UTIL + ".simpleChange(" + oldValue + ", " + newValue + "));");
  }
  function updateDirectiveTemplate(oldValue, newValue, directiveProperty) {
    return ("\nif(throwOnChange) " + UTIL + ".throwOnChange(" + CURRENT_PROTO + ", " + UTIL + ".simpleChange(" + oldValue + ", " + newValue + "));\n" + directiveProperty + " = " + newValue + ";\n" + IS_CHANGED_LOCAL + " = true;\n  ");
  }
  function updateElementTemplate(oldValue, newValue) {
    return ("\nif(throwOnChange) " + UTIL + ".throwOnChange(" + CURRENT_PROTO + ", " + UTIL + ".simpleChange(" + oldValue + ", " + newValue + "));\n" + DISPATCHER_ACCESSOR + ".notifyOnBinding(" + CURRENT_PROTO + ".bindingRecord, " + newValue + ");\n  ");
  }
  function notifyOnChangesTemplate(directive) {
    return ("\nif(" + CHANGES_LOCAL + ") {\n  " + directive + ".onChange(" + CHANGES_LOCAL + ");\n  " + CHANGES_LOCAL + " = null;\n}\n");
  }
  function notifyOnPushDetectorsTemplate(detector) {
    return ("\nif(" + IS_CHANGED_LOCAL + ") {\n  " + detector + ".markAsCheckOnce();\n}\n");
  }
  function lastInDirectiveTemplate(notifyOnChanges, notifyOnPush) {
    return ("\n" + notifyOnChanges + "\n" + notifyOnPush + "\n" + IS_CHANGED_LOCAL + " = false;\n");
  }
  return {
    setters: [function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      BaseException = $__m.BaseException;
      Type = $__m.Type;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      AbstractChangeDetector = $__m.AbstractChangeDetector;
    }, function($__m) {
      ChangeDetectionUtil = $__m.ChangeDetectionUtil;
    }, function($__m) {
      DirectiveIndex = $__m.DirectiveIndex;
      DirectiveRecord = $__m.DirectiveRecord;
    }, function($__m) {
      ProtoRecord = $__m.ProtoRecord;
      RECORD_TYPE_SELF = $__m.RECORD_TYPE_SELF;
      RECORD_TYPE_PROPERTY = $__m.RECORD_TYPE_PROPERTY;
      RECORD_TYPE_LOCAL = $__m.RECORD_TYPE_LOCAL;
      RECORD_TYPE_INVOKE_METHOD = $__m.RECORD_TYPE_INVOKE_METHOD;
      RECORD_TYPE_CONST = $__m.RECORD_TYPE_CONST;
      RECORD_TYPE_INVOKE_CLOSURE = $__m.RECORD_TYPE_INVOKE_CLOSURE;
      RECORD_TYPE_PRIMITIVE_OP = $__m.RECORD_TYPE_PRIMITIVE_OP;
      RECORD_TYPE_KEYED_ACCESS = $__m.RECORD_TYPE_KEYED_ACCESS;
      RECORD_TYPE_PIPE = $__m.RECORD_TYPE_PIPE;
      RECORD_TYPE_BINDING_PIPE = $__m.RECORD_TYPE_BINDING_PIPE;
      RECORD_TYPE_INTERPOLATE = $__m.RECORD_TYPE_INTERPOLATE;
    }],
    execute: function() {
      ABSTRACT_CHANGE_DETECTOR = "AbstractChangeDetector";
      UTIL = "ChangeDetectionUtil";
      DISPATCHER_ACCESSOR = "this.dispatcher";
      PIPE_REGISTRY_ACCESSOR = "this.pipeRegistry";
      PROTOS_ACCESSOR = "this.protos";
      DIRECTIVES_ACCESSOR = "this.directiveRecords";
      CONTEXT_ACCESSOR = "this.context";
      IS_CHANGED_LOCAL = "isChanged";
      CHANGES_LOCAL = "changes";
      LOCALS_ACCESSOR = "this.locals";
      MODE_ACCESSOR = "this.mode";
      TEMP_LOCAL = "temp";
      CURRENT_PROTO = "currentProto";
      Object.defineProperty(typeTemplate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string], [assert.type.string], [assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(constructorTemplate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(pipeOnDestroyTemplate, "parameters", {get: function() {
          return [[List]];
        }});
      Object.defineProperty(hydrateTemplate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string], [assert.type.string], [assert.type.string], [assert.genericType(List, String)], [assert.genericType(List, String)]];
        }});
      Object.defineProperty(detectChangesTemplate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(callOnAllChangesDoneTemplate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(onAllChangesDoneTemplate, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(detectChangesBodyTemplate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(pipeCheckTemplate, "parameters", {get: function() {
          return [[assert.type.number], [assert.type.string], [assert.type.string], [assert.type.string], [assert.type.string], [assert.type.string], [assert.type.string], [assert.type.string], [assert.type.string], [], [assert.type.string]];
        }});
      Object.defineProperty(referenceCheckTemplate, "parameters", {get: function() {
          return [[assert.type.number], [assert.type.string], [assert.type.string], [assert.type.string], [assert.type.string], [assert.type.string], [assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(assignmentTemplate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(localDefinitionsTemplate, "parameters", {get: function() {
          return [[List]];
        }});
      Object.defineProperty(changeDefinitionsTemplate, "parameters", {get: function() {
          return [[List]];
        }});
      Object.defineProperty(fieldDefinitionsTemplate, "parameters", {get: function() {
          return [[List]];
        }});
      Object.defineProperty(ifChangedGuardTemplate, "parameters", {get: function() {
          return [[List], [assert.type.string]];
        }});
      Object.defineProperty(addToChangesTemplate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(updateDirectiveTemplate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(updateElementTemplate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(notifyOnChangesTemplate, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(notifyOnPushDetectorsTemplate, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(lastInDirectiveTemplate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
      ChangeDetectorJITGenerator = (function() {
        function ChangeDetectorJITGenerator(typeName, changeDetectionStrategy, records, directiveRecords) {
          this.typeName = typeName;
          this.changeDetectionStrategy = changeDetectionStrategy;
          this.records = records;
          this.directiveRecords = directiveRecords;
          this.localNames = this.getLocalNames(records);
          this.changeNames = this.getChangeNames(this.localNames);
          this.fieldNames = this.getFieldNames(this.localNames);
          this.pipeNames = this.getPipeNames(this.localNames);
        }
        return ($traceurRuntime.createClass)(ChangeDetectorJITGenerator, {
          getLocalNames: function(records) {
            var index = 0;
            var names = records.map((function(r) {
              var sanitizedName = r.name.replace(new RegExp("\\W", "g"), '');
              return ("" + sanitizedName + index++);
            }));
            return ["context"].concat(names);
          },
          getChangeNames: function(localNames) {
            return localNames.map((function(n) {
              return ("change_" + n);
            }));
          },
          getFieldNames: function(localNames) {
            return localNames.map((function(n) {
              return ("this." + n);
            }));
          },
          getPipeNames: function(localNames) {
            return localNames.map((function(n) {
              return ("this." + n + "_pipe");
            }));
          },
          generate: function() {
            var text = typeTemplate(this.typeName, this.genConstructor(), this.genDetectChanges(), this.genCallOnAllChangesDone(), this.genHydrate());
            return new Function('AbstractChangeDetector', 'ChangeDetectionUtil', 'protos', 'directiveRecords', text)(AbstractChangeDetector, ChangeDetectionUtil, this.records, this.directiveRecords);
          },
          genConstructor: function() {
            return constructorTemplate(this.typeName, this.genFieldDefinitions());
          },
          genHydrate: function() {
            var mode = ChangeDetectionUtil.changeDetectionMode(this.changeDetectionStrategy);
            return hydrateTemplate(this.typeName, mode, this.genFieldDefinitions(), pipeOnDestroyTemplate(this.getNonNullPipeNames()), this.getDirectiveFieldNames(), this.getDetectorFieldNames());
          },
          getDirectiveFieldNames: function() {
            var $__0 = this;
            return this.directiveRecords.map((function(d) {
              return $__0.getDirective(d.directiveIndex);
            }));
          },
          getDetectorFieldNames: function() {
            var $__0 = this;
            return this.directiveRecords.filter((function(r) {
              return r.isOnPushChangeDetection();
            })).map((function(d) {
              return $__0.getDetector(d.directiveIndex);
            }));
          },
          getDirective: function(d) {
            return ("this.directive_" + d.name);
          },
          getDetector: function(d) {
            return ("this.detector_" + d.name);
          },
          genFieldDefinitions: function() {
            var fields = [];
            fields = fields.concat(this.fieldNames);
            fields = fields.concat(this.getNonNullPipeNames());
            fields = fields.concat(this.getDirectiveFieldNames());
            fields = fields.concat(this.getDetectorFieldNames());
            return fieldDefinitionsTemplate(fields);
          },
          getNonNullPipeNames: function() {
            var $__0 = this;
            var pipes = [];
            this.records.forEach((function(r) {
              if (r.mode === RECORD_TYPE_PIPE || r.mode === RECORD_TYPE_BINDING_PIPE) {
                pipes.push($__0.pipeNames[r.selfIndex]);
              }
            }));
            return pipes;
          },
          genDetectChanges: function() {
            var body = this.genDetectChangesBody();
            return detectChangesTemplate(this.typeName, body);
          },
          genCallOnAllChangesDone: function() {
            var notifications = [];
            var dirs = this.directiveRecords;
            for (var i = dirs.length - 1; i >= 0; --i) {
              var dir = dirs[i];
              if (dir.callOnAllChangesDone) {
                var directive = ("this.directive_" + dir.directiveIndex.name);
                notifications.push(onAllChangesDoneTemplate(directive));
              }
            }
            return callOnAllChangesDoneTemplate(this.typeName, notifications.join(";\n"));
          },
          genDetectChangesBody: function() {
            var $__0 = this;
            var rec = this.records.map((function(r) {
              return $__0.genRecord(r);
            })).join("\n");
            return detectChangesBodyTemplate(this.genLocalDefinitions(), this.genChangeDefinitions(), rec);
          },
          genLocalDefinitions: function() {
            return localDefinitionsTemplate(this.localNames);
          },
          genChangeDefinitions: function() {
            return changeDefinitionsTemplate(this.changeNames);
          },
          genRecord: function(r) {
            if (r.mode === RECORD_TYPE_PIPE || r.mode === RECORD_TYPE_BINDING_PIPE) {
              return this.genPipeCheck(r);
            } else {
              return this.genReferenceCheck(r);
            }
          },
          genPipeCheck: function(r) {
            var context = this.localNames[r.contextIndex];
            var oldValue = this.fieldNames[r.selfIndex];
            var newValue = this.localNames[r.selfIndex];
            var change = this.changeNames[r.selfIndex];
            var pipe = this.pipeNames[r.selfIndex];
            var cdRef = r.mode === RECORD_TYPE_BINDING_PIPE ? "this.ref" : "null";
            var update = this.genUpdateDirectiveOrElement(r);
            var addToChanges = this.genAddToChanges(r);
            var lastInDirective = this.genLastInDirective(r);
            return pipeCheckTemplate(r.selfIndex - 1, context, cdRef, pipe, r.name, oldValue, newValue, change, update, addToChanges, lastInDirective);
          },
          genReferenceCheck: function(r) {
            var oldValue = this.fieldNames[r.selfIndex];
            var newValue = this.localNames[r.selfIndex];
            var change = this.changeNames[r.selfIndex];
            var assignment = this.genUpdateCurrentValue(r);
            var update = this.genUpdateDirectiveOrElement(r);
            var addToChanges = this.genAddToChanges(r);
            var lastInDirective = this.genLastInDirective(r);
            var check = referenceCheckTemplate(r.selfIndex - 1, assignment, oldValue, newValue, change, update, addToChanges, lastInDirective);
            if (r.isPureFunction()) {
              return this.ifChangedGuard(r, check);
            } else {
              return check;
            }
          },
          genUpdateCurrentValue: function(r) {
            var context = this.getContext(r);
            var newValue = this.localNames[r.selfIndex];
            var args = this.genArgs(r);
            switch (r.mode) {
              case RECORD_TYPE_SELF:
                return assignmentTemplate(newValue, context);
              case RECORD_TYPE_CONST:
                return (newValue + " = " + this.genLiteral(r.funcOrValue));
              case RECORD_TYPE_PROPERTY:
                return assignmentTemplate(newValue, (context + "." + r.name));
              case RECORD_TYPE_LOCAL:
                return assignmentTemplate(newValue, (LOCALS_ACCESSOR + ".get('" + r.name + "')"));
              case RECORD_TYPE_INVOKE_METHOD:
                return assignmentTemplate(newValue, (context + "." + r.name + "(" + args + ")"));
              case RECORD_TYPE_INVOKE_CLOSURE:
                return assignmentTemplate(newValue, (context + "(" + args + ")"));
              case RECORD_TYPE_PRIMITIVE_OP:
                return assignmentTemplate(newValue, (UTIL + "." + r.name + "(" + args + ")"));
              case RECORD_TYPE_INTERPOLATE:
                return assignmentTemplate(newValue, this.genInterpolation(r));
              case RECORD_TYPE_KEYED_ACCESS:
                var key = this.localNames[r.args[0]];
                return assignmentTemplate(newValue, (context + "[" + key + "]"));
              default:
                throw new BaseException(("Unknown operation " + r.mode));
            }
          },
          getContext: function(r) {
            if (r.contextIndex == -1) {
              return this.getDirective(r.directiveIndex);
            } else {
              return this.localNames[r.contextIndex];
            }
          },
          ifChangedGuard: function(r, body) {
            var $__0 = this;
            return ifChangedGuardTemplate(r.args.map((function(a) {
              return $__0.changeNames[a];
            })), body);
          },
          genInterpolation: function(r) {
            var res = "";
            for (var i = 0; i < r.args.length; ++i) {
              res += this.genLiteral(r.fixedArgs[i]);
              res += " + ";
              res += this.localNames[r.args[i]];
              res += " + ";
            }
            res += this.genLiteral(r.fixedArgs[r.args.length]);
            return res;
          },
          genLiteral: function(value) {
            return JSON.stringify(value);
          },
          genUpdateDirectiveOrElement: function(r) {
            if (!r.lastInBinding)
              return "";
            var newValue = this.localNames[r.selfIndex];
            var oldValue = this.fieldNames[r.selfIndex];
            var br = r.bindingRecord;
            if (br.isDirective()) {
              var directiveProperty = (this.getDirective(br.directiveRecord.directiveIndex) + "." + br.propertyName);
              return updateDirectiveTemplate(oldValue, newValue, directiveProperty);
            } else {
              return updateElementTemplate(oldValue, newValue);
            }
          },
          genAddToChanges: function(r) {
            var newValue = this.localNames[r.selfIndex];
            var oldValue = this.fieldNames[r.selfIndex];
            return r.bindingRecord.callOnChange() ? addToChangesTemplate(oldValue, newValue) : "";
          },
          genLastInDirective: function(r) {
            var onChanges = this.genNotifyOnChanges(r);
            var onPush = this.genNotifyOnPushDetectors(r);
            return lastInDirectiveTemplate(onChanges, onPush);
          },
          genNotifyOnChanges: function(r) {
            var br = r.bindingRecord;
            if (r.lastInDirective && br.callOnChange()) {
              return notifyOnChangesTemplate(this.getDirective(br.directiveRecord.directiveIndex));
            } else {
              return "";
            }
          },
          genNotifyOnPushDetectors: function(r) {
            var br = r.bindingRecord;
            if (r.lastInDirective && br.isOnPushChangeDetection()) {
              return notifyOnPushDetectorsTemplate(this.getDetector(br.directiveRecord.directiveIndex));
            } else {
              return "";
            }
          },
          genArgs: function(r) {
            var $__0 = this;
            return r.args.map((function(arg) {
              return $__0.localNames[arg];
            })).join(", ");
          }
        }, {});
      }());
      $__export("ChangeDetectorJITGenerator", ChangeDetectorJITGenerator);
      Object.defineProperty(ChangeDetectorJITGenerator, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string], [assert.genericType(List, ProtoRecord)], [List]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.getLocalNames, "parameters", {get: function() {
          return [[assert.genericType(List, ProtoRecord)]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.getChangeNames, "parameters", {get: function() {
          return [[assert.genericType(List, assert.type.string)]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.getFieldNames, "parameters", {get: function() {
          return [[assert.genericType(List, assert.type.string)]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.getPipeNames, "parameters", {get: function() {
          return [[assert.genericType(List, assert.type.string)]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.getDirective, "parameters", {get: function() {
          return [[DirectiveIndex]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.getDetector, "parameters", {get: function() {
          return [[DirectiveIndex]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.genRecord, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.genPipeCheck, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.genReferenceCheck, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.genUpdateCurrentValue, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.getContext, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.ifChangedGuard, "parameters", {get: function() {
          return [[ProtoRecord], [assert.type.string]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.genInterpolation, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.genUpdateDirectiveOrElement, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.genAddToChanges, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.genLastInDirective, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.genNotifyOnChanges, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.genNotifyOnPushDetectors, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.genArgs, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
    }
  };
});
//# sourceMappingURL=change_detection_jit_generator.js.map

//# sourceMappingURL=../../src/change_detection/change_detection_jit_generator.js.map
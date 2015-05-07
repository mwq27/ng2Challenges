System.register(["angular2/di", "angular2/src/facade/collection", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var Injectable,
      List,
      ListWrapper,
      SetWrapper,
      int,
      NumberWrapper,
      StringJoiner,
      StringWrapper,
      TOKEN_TYPE_CHARACTER,
      TOKEN_TYPE_IDENTIFIER,
      TOKEN_TYPE_KEYWORD,
      TOKEN_TYPE_STRING,
      TOKEN_TYPE_OPERATOR,
      TOKEN_TYPE_NUMBER,
      Lexer,
      Token,
      EOF,
      $EOF,
      $TAB,
      $LF,
      $VTAB,
      $FF,
      $CR,
      $SPACE,
      $BANG,
      $DQ,
      $HASH,
      $$,
      $PERCENT,
      $AMPERSAND,
      $SQ,
      $LPAREN,
      $RPAREN,
      $STAR,
      $PLUS,
      $COMMA,
      $MINUS,
      $PERIOD,
      $SLASH,
      $COLON,
      $SEMICOLON,
      $LT,
      $EQ,
      $GT,
      $QUESTION,
      $0,
      $9,
      $A,
      $B,
      $C,
      $D,
      $E,
      $F,
      $G,
      $H,
      $I,
      $J,
      $K,
      $L,
      $M,
      $N,
      $O,
      $P,
      $Q,
      $R,
      $S,
      $T,
      $U,
      $V,
      $W,
      $X,
      $Y,
      $Z,
      $LBRACKET,
      $BACKSLASH,
      $RBRACKET,
      $CARET,
      $_,
      $a,
      $b,
      $c,
      $d,
      $e,
      $f,
      $g,
      $h,
      $i,
      $j,
      $k,
      $l,
      $m,
      $n,
      $o,
      $p,
      $q,
      $r,
      $s,
      $t,
      $u,
      $v,
      $w,
      $x,
      $y,
      $z,
      $LBRACE,
      $BAR,
      $RBRACE,
      $NBSP,
      ScannerError,
      _Scanner,
      OPERATORS,
      KEYWORDS;
  function newCharacterToken(index, code) {
    return new Token(index, TOKEN_TYPE_CHARACTER, code, StringWrapper.fromCharCode(code));
  }
  function newIdentifierToken(index, text) {
    return new Token(index, TOKEN_TYPE_IDENTIFIER, 0, text);
  }
  function newKeywordToken(index, text) {
    return new Token(index, TOKEN_TYPE_KEYWORD, 0, text);
  }
  function newOperatorToken(index, text) {
    return new Token(index, TOKEN_TYPE_OPERATOR, 0, text);
  }
  function newStringToken(index, text) {
    return new Token(index, TOKEN_TYPE_STRING, 0, text);
  }
  function newNumberToken(index, n) {
    return new Token(index, TOKEN_TYPE_NUMBER, n, "");
  }
  function isWhitespace(code) {
    return (code >= $TAB && code <= $SPACE) || (code == $NBSP);
  }
  function isIdentifierStart(code) {
    return ($a <= code && code <= $z) || ($A <= code && code <= $Z) || (code == $_) || (code == $$);
  }
  function isIdentifierPart(code) {
    return ($a <= code && code <= $z) || ($A <= code && code <= $Z) || ($0 <= code && code <= $9) || (code == $_) || (code == $$);
  }
  function isDigit(code) {
    return $0 <= code && code <= $9;
  }
  function isExponentStart(code) {
    return code == $e || code == $E;
  }
  function isExponentSign(code) {
    return code == $MINUS || code == $PLUS;
  }
  function unescape(code) {
    switch (code) {
      case $n:
        return $LF;
      case $f:
        return $FF;
      case $r:
        return $CR;
      case $t:
        return $TAB;
      case $v:
        return $VTAB;
      default:
        return code;
    }
  }
  return {
    setters: [function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
      SetWrapper = $__m.SetWrapper;
    }, function($__m) {
      int = $__m.int;
      NumberWrapper = $__m.NumberWrapper;
      StringJoiner = $__m.StringJoiner;
      StringWrapper = $__m.StringWrapper;
    }],
    execute: function() {
      TOKEN_TYPE_CHARACTER = 1;
      $__export("TOKEN_TYPE_CHARACTER", TOKEN_TYPE_CHARACTER);
      TOKEN_TYPE_IDENTIFIER = 2;
      $__export("TOKEN_TYPE_IDENTIFIER", TOKEN_TYPE_IDENTIFIER);
      TOKEN_TYPE_KEYWORD = 3;
      $__export("TOKEN_TYPE_KEYWORD", TOKEN_TYPE_KEYWORD);
      TOKEN_TYPE_STRING = 4;
      $__export("TOKEN_TYPE_STRING", TOKEN_TYPE_STRING);
      TOKEN_TYPE_OPERATOR = 5;
      $__export("TOKEN_TYPE_OPERATOR", TOKEN_TYPE_OPERATOR);
      TOKEN_TYPE_NUMBER = 6;
      $__export("TOKEN_TYPE_NUMBER", TOKEN_TYPE_NUMBER);
      Lexer = (function() {
        function Lexer() {}
        return ($traceurRuntime.createClass)(Lexer, {tokenize: function(text) {
            var scanner = new _Scanner(text);
            var tokens = [];
            var token = scanner.scanToken();
            while (token != null) {
              ListWrapper.push(tokens, token);
              token = scanner.scanToken();
            }
            return tokens;
          }}, {});
      }());
      $__export("Lexer", Lexer);
      Object.defineProperty(Lexer, "annotations", {get: function() {
          return [new Injectable()];
        }});
      Object.defineProperty(Lexer.prototype.tokenize, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Token = (function() {
        function Token(index, type, numValue, strValue) {
          this.index = index;
          this.type = type;
          this._numValue = numValue;
          this._strValue = strValue;
        }
        return ($traceurRuntime.createClass)(Token, {
          isCharacter: function(code) {
            return (this.type == TOKEN_TYPE_CHARACTER && this._numValue == code);
          },
          isNumber: function() {
            return (this.type == TOKEN_TYPE_NUMBER);
          },
          isString: function() {
            return (this.type == TOKEN_TYPE_STRING);
          },
          isOperator: function(operater) {
            return (this.type == TOKEN_TYPE_OPERATOR && this._strValue == operater);
          },
          isIdentifier: function() {
            return (this.type == TOKEN_TYPE_IDENTIFIER);
          },
          isKeyword: function() {
            return (this.type == TOKEN_TYPE_KEYWORD);
          },
          isKeywordVar: function() {
            return (this.type == TOKEN_TYPE_KEYWORD && this._strValue == "var");
          },
          isKeywordNull: function() {
            return (this.type == TOKEN_TYPE_KEYWORD && this._strValue == "null");
          },
          isKeywordUndefined: function() {
            return (this.type == TOKEN_TYPE_KEYWORD && this._strValue == "undefined");
          },
          isKeywordTrue: function() {
            return (this.type == TOKEN_TYPE_KEYWORD && this._strValue == "true");
          },
          isKeywordFalse: function() {
            return (this.type == TOKEN_TYPE_KEYWORD && this._strValue == "false");
          },
          toNumber: function() {
            return (this.type == TOKEN_TYPE_NUMBER) ? this._numValue : -1;
          },
          toString: function() {
            var type = this.type;
            if (type >= TOKEN_TYPE_CHARACTER && type <= TOKEN_TYPE_STRING) {
              return this._strValue;
            } else if (type == TOKEN_TYPE_NUMBER) {
              return this._numValue.toString();
            } else {
              return null;
            }
          }
        }, {});
      }());
      $__export("Token", Token);
      Object.defineProperty(Token, "parameters", {get: function() {
          return [[int], [int], [assert.type.number], [assert.type.string]];
        }});
      Object.defineProperty(Token.prototype.isCharacter, "parameters", {get: function() {
          return [[int]];
        }});
      Object.defineProperty(Token.prototype.isOperator, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(newCharacterToken, "parameters", {get: function() {
          return [[int], [int]];
        }});
      Object.defineProperty(newIdentifierToken, "parameters", {get: function() {
          return [[int], [assert.type.string]];
        }});
      Object.defineProperty(newKeywordToken, "parameters", {get: function() {
          return [[int], [assert.type.string]];
        }});
      Object.defineProperty(newOperatorToken, "parameters", {get: function() {
          return [[int], [assert.type.string]];
        }});
      Object.defineProperty(newStringToken, "parameters", {get: function() {
          return [[int], [assert.type.string]];
        }});
      Object.defineProperty(newNumberToken, "parameters", {get: function() {
          return [[int], [assert.type.number]];
        }});
      EOF = new Token(-1, 0, 0, "");
      $__export("EOF", EOF);
      $EOF = 0;
      $__export("$EOF", $EOF);
      $TAB = 9;
      $__export("$TAB", $TAB);
      $LF = 10;
      $__export("$LF", $LF);
      $VTAB = 11;
      $__export("$VTAB", $VTAB);
      $FF = 12;
      $__export("$FF", $FF);
      $CR = 13;
      $__export("$CR", $CR);
      $SPACE = 32;
      $__export("$SPACE", $SPACE);
      $BANG = 33;
      $__export("$BANG", $BANG);
      $DQ = 34;
      $__export("$DQ", $DQ);
      $HASH = 35;
      $__export("$HASH", $HASH);
      $$ = 36;
      $__export("$$", $$);
      $PERCENT = 37;
      $__export("$PERCENT", $PERCENT);
      $AMPERSAND = 38;
      $__export("$AMPERSAND", $AMPERSAND);
      $SQ = 39;
      $__export("$SQ", $SQ);
      $LPAREN = 40;
      $__export("$LPAREN", $LPAREN);
      $RPAREN = 41;
      $__export("$RPAREN", $RPAREN);
      $STAR = 42;
      $__export("$STAR", $STAR);
      $PLUS = 43;
      $__export("$PLUS", $PLUS);
      $COMMA = 44;
      $__export("$COMMA", $COMMA);
      $MINUS = 45;
      $__export("$MINUS", $MINUS);
      $PERIOD = 46;
      $__export("$PERIOD", $PERIOD);
      $SLASH = 47;
      $__export("$SLASH", $SLASH);
      $COLON = 58;
      $__export("$COLON", $COLON);
      $SEMICOLON = 59;
      $__export("$SEMICOLON", $SEMICOLON);
      $LT = 60;
      $__export("$LT", $LT);
      $EQ = 61;
      $__export("$EQ", $EQ);
      $GT = 62;
      $__export("$GT", $GT);
      $QUESTION = 63;
      $__export("$QUESTION", $QUESTION);
      $0 = 48;
      $9 = 57;
      $A = 65, $B = 66, $C = 67, $D = 68, $E = 69, $F = 70, $G = 71, $H = 72, $I = 73, $J = 74, $K = 75, $L = 76, $M = 77, $N = 78, $O = 79, $P = 80, $Q = 81, $R = 82, $S = 83, $T = 84, $U = 85, $V = 86, $W = 87, $X = 88, $Y = 89, $Z = 90;
      $LBRACKET = 91;
      $__export("$LBRACKET", $LBRACKET);
      $BACKSLASH = 92;
      $__export("$BACKSLASH", $BACKSLASH);
      $RBRACKET = 93;
      $__export("$RBRACKET", $RBRACKET);
      $CARET = 94;
      $_ = 95;
      $a = 97, $b = 98, $c = 99, $d = 100, $e = 101, $f = 102, $g = 103, $h = 104, $i = 105, $j = 106, $k = 107, $l = 108, $m = 109, $n = 110, $o = 111, $p = 112, $q = 113, $r = 114, $s = 115, $t = 116, $u = 117, $v = 118, $w = 119, $x = 120, $y = 121, $z = 122;
      $LBRACE = 123;
      $__export("$LBRACE", $LBRACE);
      $BAR = 124;
      $__export("$BAR", $BAR);
      $RBRACE = 125;
      $__export("$RBRACE", $RBRACE);
      $NBSP = 160;
      ScannerError = (function($__super) {
        function ScannerError(message) {
          $traceurRuntime.superConstructor(ScannerError).call(this);
          this.message = message;
        }
        return ($traceurRuntime.createClass)(ScannerError, {toString: function() {
            return this.message;
          }}, {}, $__super);
      }(Error));
      $__export("ScannerError", ScannerError);
      _Scanner = (function() {
        function _Scanner(input) {
          this.input = input;
          this.length = input.length;
          this.peek = 0;
          this.index = -1;
          this.advance();
        }
        return ($traceurRuntime.createClass)(_Scanner, {
          advance: function() {
            this.peek = ++this.index >= this.length ? $EOF : StringWrapper.charCodeAt(this.input, this.index);
          },
          scanToken: function() {
            var input = this.input,
                length = this.length,
                peek = this.peek,
                index = this.index;
            while (peek <= $SPACE) {
              if (++index >= length) {
                peek = $EOF;
                break;
              } else {
                peek = StringWrapper.charCodeAt(input, index);
              }
            }
            this.peek = peek;
            this.index = index;
            if (index >= length) {
              return null;
            }
            if (isIdentifierStart(peek))
              return this.scanIdentifier();
            if (isDigit(peek))
              return this.scanNumber(index);
            var start = index;
            switch (peek) {
              case $PERIOD:
                this.advance();
                return isDigit(this.peek) ? this.scanNumber(start) : newCharacterToken(start, $PERIOD);
              case $LPAREN:
              case $RPAREN:
              case $LBRACE:
              case $RBRACE:
              case $LBRACKET:
              case $RBRACKET:
              case $COMMA:
              case $COLON:
              case $SEMICOLON:
                return this.scanCharacter(start, peek);
              case $SQ:
              case $DQ:
                return this.scanString();
              case $HASH:
                return this.scanOperator(start, StringWrapper.fromCharCode(peek));
              case $PLUS:
              case $MINUS:
              case $STAR:
              case $SLASH:
              case $PERCENT:
              case $CARET:
              case $QUESTION:
                return this.scanOperator(start, StringWrapper.fromCharCode(peek));
              case $LT:
              case $GT:
              case $BANG:
              case $EQ:
                return this.scanComplexOperator(start, $EQ, StringWrapper.fromCharCode(peek), '=');
              case $AMPERSAND:
                return this.scanComplexOperator(start, $AMPERSAND, '&', '&');
              case $BAR:
                return this.scanComplexOperator(start, $BAR, '|', '|');
              case $NBSP:
                while (isWhitespace(this.peek))
                  this.advance();
                return this.scanToken();
            }
            this.error(("Unexpected character [" + StringWrapper.fromCharCode(peek) + "]"), 0);
            return null;
          },
          scanCharacter: function(start, code) {
            assert(this.peek == code);
            this.advance();
            return newCharacterToken(start, code);
          },
          scanOperator: function(start, str) {
            assert(this.peek == StringWrapper.charCodeAt(str, 0));
            assert(SetWrapper.has(OPERATORS, str));
            this.advance();
            return newOperatorToken(start, str);
          },
          scanComplexOperator: function(start, code, one, two) {
            assert(this.peek == StringWrapper.charCodeAt(one, 0));
            this.advance();
            var str = one;
            while (this.peek == code) {
              this.advance();
              str += two;
            }
            assert(SetWrapper.has(OPERATORS, str));
            return newOperatorToken(start, str);
          },
          scanIdentifier: function() {
            assert(isIdentifierStart(this.peek));
            var start = this.index;
            this.advance();
            while (isIdentifierPart(this.peek))
              this.advance();
            var str = this.input.substring(start, this.index);
            if (SetWrapper.has(KEYWORDS, str)) {
              return newKeywordToken(start, str);
            } else {
              return newIdentifierToken(start, str);
            }
          },
          scanNumber: function(start) {
            assert(isDigit(this.peek));
            var simple = (this.index === start);
            this.advance();
            while (true) {
              if (isDigit(this.peek)) {} else if (this.peek == $PERIOD) {
                simple = false;
              } else if (isExponentStart(this.peek)) {
                this.advance();
                if (isExponentSign(this.peek))
                  this.advance();
                if (!isDigit(this.peek))
                  this.error('Invalid exponent', -1);
                simple = false;
              } else {
                break;
              }
              this.advance();
            }
            var str = this.input.substring(start, this.index);
            var value = simple ? NumberWrapper.parseIntAutoRadix(str) : NumberWrapper.parseFloat(str);
            return newNumberToken(start, value);
          },
          scanString: function() {
            assert(this.peek == $SQ || this.peek == $DQ);
            var start = this.index;
            var quote = this.peek;
            this.advance();
            var buffer;
            var marker = this.index;
            var input = this.input;
            while (this.peek != quote) {
              if (this.peek == $BACKSLASH) {
                if (buffer == null)
                  buffer = new StringJoiner();
                buffer.add(input.substring(marker, this.index));
                this.advance();
                var unescapedCode = void 0;
                if (this.peek == $u) {
                  var hex = input.substring(this.index + 1, this.index + 5);
                  try {
                    unescapedCode = NumberWrapper.parseInt(hex, 16);
                  } catch (e) {
                    this.error(("Invalid unicode escape [\\u" + hex + "]"), 0);
                  }
                  for (var i = 0; i < 5; i++) {
                    this.advance();
                  }
                } else {
                  unescapedCode = unescape(this.peek);
                  this.advance();
                }
                buffer.add(StringWrapper.fromCharCode(unescapedCode));
                marker = this.index;
              } else if (this.peek == $EOF) {
                this.error('Unterminated quote', 0);
              } else {
                this.advance();
              }
            }
            var last = input.substring(marker, this.index);
            this.advance();
            var unescaped = last;
            if (buffer != null) {
              buffer.add(last);
              unescaped = buffer.toString();
            }
            return newStringToken(start, unescaped);
          },
          error: function(message, offset) {
            var position = this.index + offset;
            throw new ScannerError(("Lexer Error: " + message + " at column " + position + " in expression [" + this.input + "]"));
          }
        }, {});
      }());
      Object.defineProperty(_Scanner, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(_Scanner.prototype.scanCharacter, "parameters", {get: function() {
          return [[int], [int]];
        }});
      Object.defineProperty(_Scanner.prototype.scanOperator, "parameters", {get: function() {
          return [[int], [assert.type.string]];
        }});
      Object.defineProperty(_Scanner.prototype.scanComplexOperator, "parameters", {get: function() {
          return [[int], [int], [assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(_Scanner.prototype.scanNumber, "parameters", {get: function() {
          return [[int]];
        }});
      Object.defineProperty(_Scanner.prototype.error, "parameters", {get: function() {
          return [[assert.type.string], [int]];
        }});
      Object.defineProperty(isWhitespace, "parameters", {get: function() {
          return [[int]];
        }});
      Object.defineProperty(isIdentifierStart, "parameters", {get: function() {
          return [[int]];
        }});
      Object.defineProperty(isIdentifierPart, "parameters", {get: function() {
          return [[int]];
        }});
      Object.defineProperty(isDigit, "parameters", {get: function() {
          return [[int]];
        }});
      Object.defineProperty(isExponentStart, "parameters", {get: function() {
          return [[int]];
        }});
      Object.defineProperty(isExponentSign, "parameters", {get: function() {
          return [[int]];
        }});
      Object.defineProperty(unescape, "parameters", {get: function() {
          return [[int]];
        }});
      OPERATORS = SetWrapper.createFromList(['+', '-', '*', '/', '%', '^', '=', '==', '!=', '===', '!==', '<', '>', '<=', '>=', '&&', '||', '&', '|', '!', '?', '#']);
      KEYWORDS = SetWrapper.createFromList(['var', 'null', 'undefined', 'true', 'false']);
    }
  };
});
//# sourceMappingURL=lexer.js.map

//# sourceMappingURL=../../../src/change_detection/parser/lexer.js.map
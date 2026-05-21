import xe, { useRef as Fe, useEffect as we, useState as de } from "react";
import Vr from "react-dom";
import Wr from "showdown";
function Ur(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function Yr(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var cr = { exports: {} }, j = cr.exports = {}, B, H;
function $e() {
  throw new Error("setTimeout has not been defined");
}
function Le() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? B = setTimeout : B = $e;
  } catch {
    B = $e;
  }
  try {
    typeof clearTimeout == "function" ? H = clearTimeout : H = Le;
  } catch {
    H = Le;
  }
})();
function lr(t) {
  if (B === setTimeout)
    return setTimeout(t, 0);
  if ((B === $e || !B) && setTimeout)
    return B = setTimeout, setTimeout(t, 0);
  try {
    return B(t, 0);
  } catch {
    try {
      return B.call(null, t, 0);
    } catch {
      return B.call(this, t, 0);
    }
  }
}
function qr(t) {
  if (H === clearTimeout)
    return clearTimeout(t);
  if ((H === Le || !H) && clearTimeout)
    return H = clearTimeout, clearTimeout(t);
  try {
    return H(t);
  } catch {
    try {
      return H.call(null, t);
    } catch {
      return H.call(this, t);
    }
  }
}
var Z = [], ce = !1, oe, Ce = -1;
function Br() {
  !ce || !oe || (ce = !1, oe.length ? Z = oe.concat(Z) : Ce = -1, Z.length && fr());
}
function fr() {
  if (!ce) {
    var t = lr(Br);
    ce = !0;
    for (var o = Z.length; o; ) {
      for (oe = Z, Z = []; ++Ce < o; )
        oe && oe[Ce].run();
      Ce = -1, o = Z.length;
    }
    oe = null, ce = !1, qr(t);
  }
}
j.nextTick = function(t) {
  var o = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var c = 1; c < arguments.length; c++)
      o[c - 1] = arguments[c];
  Z.push(new dr(t, o)), Z.length === 1 && !ce && lr(fr);
};
function dr(t, o) {
  this.fun = t, this.array = o;
}
dr.prototype.run = function() {
  this.fun.apply(null, this.array);
};
j.title = "browser";
j.browser = !0;
j.env = {};
j.argv = [];
j.version = "";
j.versions = {};
function Q() {
}
j.on = Q;
j.addListener = Q;
j.once = Q;
j.off = Q;
j.removeListener = Q;
j.removeAllListeners = Q;
j.emit = Q;
j.prependListener = Q;
j.prependOnceListener = Q;
j.listeners = function(t) {
  return [];
};
j.binding = function(t) {
  throw new Error("process.binding is not supported");
};
j.cwd = function() {
  return "/";
};
j.chdir = function(t) {
  throw new Error("process.chdir is not supported");
};
j.umask = function() {
  return 0;
};
var Hr = cr.exports;
const Ne = /* @__PURE__ */ Yr(Hr);
var _e = { exports: {} }, ve = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var er;
function Jr() {
  if (er) return ve;
  er = 1;
  var t = xe, o = Symbol.for("react.element"), c = Symbol.for("react.fragment"), i = Object.prototype.hasOwnProperty, u = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, m = { key: !0, ref: !0, __self: !0, __source: !0 };
  function f(v, l, E) {
    var g, b = {}, C = null, a = null;
    E !== void 0 && (C = "" + E), l.key !== void 0 && (C = "" + l.key), l.ref !== void 0 && (a = l.ref);
    for (g in l) i.call(l, g) && !m.hasOwnProperty(g) && (b[g] = l[g]);
    if (v && v.defaultProps) for (g in l = v.defaultProps, l) b[g] === void 0 && (b[g] = l[g]);
    return { $$typeof: o, type: v, key: C, ref: a, props: b, _owner: u.current };
  }
  return ve.Fragment = c, ve.jsx = f, ve.jsxs = f, ve;
}
var pe = {}, rr;
function zr() {
  return rr || (rr = 1, Ne.env.NODE_ENV !== "production" && function() {
    var t = xe, o = Symbol.for("react.element"), c = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), u = Symbol.for("react.strict_mode"), m = Symbol.for("react.profiler"), f = Symbol.for("react.provider"), v = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), E = Symbol.for("react.suspense"), g = Symbol.for("react.suspense_list"), b = Symbol.for("react.memo"), C = Symbol.for("react.lazy"), a = Symbol.for("react.offscreen"), $ = Symbol.iterator, J = "@@iterator";
    function L(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = $ && e[$] || e[J];
      return typeof r == "function" ? r : null;
    }
    var P = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function x(e) {
      {
        for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), s = 1; s < r; s++)
          n[s - 1] = arguments[s];
        z("error", e, n);
      }
    }
    function z(e, r, n) {
      {
        var s = P.ReactDebugCurrentFrame, y = s.getStackAddendum();
        y !== "" && (r += "%s", n = n.concat([y]));
        var _ = n.map(function(h) {
          return String(h);
        });
        _.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, _);
      }
    }
    var V = !1, ee = !1, re = !1, te = !1, W = !1, k;
    k = Symbol.for("react.module.reference");
    function R(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === i || e === m || W || e === u || e === E || e === g || te || e === a || V || ee || re || typeof e == "object" && e !== null && (e.$$typeof === C || e.$$typeof === b || e.$$typeof === f || e.$$typeof === v || e.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === k || e.getModuleId !== void 0));
    }
    function A(e, r, n) {
      var s = e.displayName;
      if (s)
        return s;
      var y = r.displayName || r.name || "";
      return y !== "" ? n + "(" + y + ")" : n;
    }
    function U(e) {
      return e.displayName || "Context";
    }
    function S(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && x("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case i:
          return "Fragment";
        case c:
          return "Portal";
        case m:
          return "Profiler";
        case u:
          return "StrictMode";
        case E:
          return "Suspense";
        case g:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case v:
            var r = e;
            return U(r) + ".Consumer";
          case f:
            var n = e;
            return U(n._context) + ".Provider";
          case l:
            return A(e, e.render, "ForwardRef");
          case b:
            var s = e.displayName || null;
            return s !== null ? s : S(e.type) || "Memo";
          case C: {
            var y = e, _ = y._payload, h = y._init;
            try {
              return S(h(_));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var I = Object.assign, F = 0, K, G, q, Y, w, X, ae;
    function he() {
    }
    he.__reactDisabledLog = !0;
    function vr() {
      {
        if (F === 0) {
          K = console.log, G = console.info, q = console.warn, Y = console.error, w = console.group, X = console.groupCollapsed, ae = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: he,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        F++;
      }
    }
    function pr() {
      {
        if (F--, F === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: I({}, e, {
              value: K
            }),
            info: I({}, e, {
              value: G
            }),
            warn: I({}, e, {
              value: q
            }),
            error: I({}, e, {
              value: Y
            }),
            group: I({}, e, {
              value: w
            }),
            groupCollapsed: I({}, e, {
              value: X
            }),
            groupEnd: I({}, e, {
              value: ae
            })
          });
        }
        F < 0 && x("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Se = P.ReactCurrentDispatcher, Te;
    function ge(e, r, n) {
      {
        if (Te === void 0)
          try {
            throw Error();
          } catch (y) {
            var s = y.stack.trim().match(/\n( *(at )?)/);
            Te = s && s[1] || "";
          }
        return `
` + Te + e;
      }
    }
    var je = !1, me;
    {
      var hr = typeof WeakMap == "function" ? WeakMap : Map;
      me = new hr();
    }
    function Ve(e, r) {
      if (!e || je)
        return "";
      {
        var n = me.get(e);
        if (n !== void 0)
          return n;
      }
      var s;
      je = !0;
      var y = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var _;
      _ = Se.current, Se.current = null, vr();
      try {
        if (r) {
          var h = function() {
            throw Error();
          };
          if (Object.defineProperty(h.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(h, []);
            } catch (D) {
              s = D;
            }
            Reflect.construct(e, [], h);
          } else {
            try {
              h.call();
            } catch (D) {
              s = D;
            }
            e.call(h.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (D) {
            s = D;
          }
          e();
        }
      } catch (D) {
        if (D && s && typeof D.stack == "string") {
          for (var p = D.stack.split(`
`), M = s.stack.split(`
`), T = p.length - 1, O = M.length - 1; T >= 1 && O >= 0 && p[T] !== M[O]; )
            O--;
          for (; T >= 1 && O >= 0; T--, O--)
            if (p[T] !== M[O]) {
              if (T !== 1 || O !== 1)
                do
                  if (T--, O--, O < 0 || p[T] !== M[O]) {
                    var N = `
` + p[T].replace(" at new ", " at ");
                    return e.displayName && N.includes("<anonymous>") && (N = N.replace("<anonymous>", e.displayName)), typeof e == "function" && me.set(e, N), N;
                  }
                while (T >= 1 && O >= 0);
              break;
            }
        }
      } finally {
        je = !1, Se.current = _, pr(), Error.prepareStackTrace = y;
      }
      var se = e ? e.displayName || e.name : "", ne = se ? ge(se) : "";
      return typeof e == "function" && me.set(e, ne), ne;
    }
    function gr(e, r, n) {
      return Ve(e, !1);
    }
    function mr(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function ye(e, r, n) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Ve(e, mr(e));
      if (typeof e == "string")
        return ge(e);
      switch (e) {
        case E:
          return ge("Suspense");
        case g:
          return ge("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case l:
            return gr(e.render);
          case b:
            return ye(e.type, r, n);
          case C: {
            var s = e, y = s._payload, _ = s._init;
            try {
              return ye(_(y), r, n);
            } catch {
            }
          }
        }
      return "";
    }
    var le = Object.prototype.hasOwnProperty, We = {}, Ue = P.ReactDebugCurrentFrame;
    function be(e) {
      if (e) {
        var r = e._owner, n = ye(e.type, e._source, r ? r.type : null);
        Ue.setExtraStackFrame(n);
      } else
        Ue.setExtraStackFrame(null);
    }
    function yr(e, r, n, s, y) {
      {
        var _ = Function.call.bind(le);
        for (var h in e)
          if (_(e, h)) {
            var p = void 0;
            try {
              if (typeof e[h] != "function") {
                var M = Error((s || "React class") + ": " + n + " type `" + h + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[h] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw M.name = "Invariant Violation", M;
              }
              p = e[h](r, h, s, n, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (T) {
              p = T;
            }
            p && !(p instanceof Error) && (be(y), x("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", s || "React class", n, h, typeof p), be(null)), p instanceof Error && !(p.message in We) && (We[p.message] = !0, be(y), x("Failed %s type: %s", n, p.message), be(null));
          }
      }
    }
    var br = Array.isArray;
    function Oe(e) {
      return br(e);
    }
    function _r(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, n = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return n;
      }
    }
    function Er(e) {
      try {
        return Ye(e), !1;
      } catch {
        return !0;
      }
    }
    function Ye(e) {
      return "" + e;
    }
    function qe(e) {
      if (Er(e))
        return x("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", _r(e)), Ye(e);
    }
    var fe = P.ReactCurrentOwner, Rr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Be, He, ke;
    ke = {};
    function Cr(e) {
      if (le.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function wr(e) {
      if (le.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function xr(e, r) {
      if (typeof e.ref == "string" && fe.current && r && fe.current.stateNode !== r) {
        var n = S(fe.current.type);
        ke[n] || (x('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', S(fe.current.type), e.ref), ke[n] = !0);
      }
    }
    function Sr(e, r) {
      {
        var n = function() {
          Be || (Be = !0, x("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        n.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: n,
          configurable: !0
        });
      }
    }
    function Tr(e, r) {
      {
        var n = function() {
          He || (He = !0, x("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        n.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: n,
          configurable: !0
        });
      }
    }
    var jr = function(e, r, n, s, y, _, h) {
      var p = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: o,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: n,
        props: h,
        // Record the component responsible for creating this element.
        _owner: _
      };
      return p._store = {}, Object.defineProperty(p._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(p, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: s
      }), Object.defineProperty(p, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: y
      }), Object.freeze && (Object.freeze(p.props), Object.freeze(p)), p;
    };
    function Or(e, r, n, s, y) {
      {
        var _, h = {}, p = null, M = null;
        n !== void 0 && (qe(n), p = "" + n), wr(r) && (qe(r.key), p = "" + r.key), Cr(r) && (M = r.ref, xr(r, y));
        for (_ in r)
          le.call(r, _) && !Rr.hasOwnProperty(_) && (h[_] = r[_]);
        if (e && e.defaultProps) {
          var T = e.defaultProps;
          for (_ in T)
            h[_] === void 0 && (h[_] = T[_]);
        }
        if (p || M) {
          var O = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          p && Sr(h, O), M && Tr(h, O);
        }
        return jr(e, p, M, y, s, fe.current, h);
      }
    }
    var Pe = P.ReactCurrentOwner, Je = P.ReactDebugCurrentFrame;
    function ie(e) {
      if (e) {
        var r = e._owner, n = ye(e.type, e._source, r ? r.type : null);
        Je.setExtraStackFrame(n);
      } else
        Je.setExtraStackFrame(null);
    }
    var Ae;
    Ae = !1;
    function Me(e) {
      return typeof e == "object" && e !== null && e.$$typeof === o;
    }
    function ze() {
      {
        if (Pe.current) {
          var e = S(Pe.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function kr(e) {
      return "";
    }
    var Ke = {};
    function Pr(e) {
      {
        var r = ze();
        if (!r) {
          var n = typeof e == "string" ? e : e.displayName || e.name;
          n && (r = `

Check the top-level render call using <` + n + ">.");
        }
        return r;
      }
    }
    function Ge(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var n = Pr(r);
        if (Ke[n])
          return;
        Ke[n] = !0;
        var s = "";
        e && e._owner && e._owner !== Pe.current && (s = " It was passed a child from " + S(e._owner.type) + "."), ie(e), x('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', n, s), ie(null);
      }
    }
    function Xe(e, r) {
      {
        if (typeof e != "object")
          return;
        if (Oe(e))
          for (var n = 0; n < e.length; n++) {
            var s = e[n];
            Me(s) && Ge(s, r);
          }
        else if (Me(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var y = L(e);
          if (typeof y == "function" && y !== e.entries)
            for (var _ = y.call(e), h; !(h = _.next()).done; )
              Me(h.value) && Ge(h.value, r);
        }
      }
    }
    function Ar(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var n;
        if (typeof r == "function")
          n = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === l || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === b))
          n = r.propTypes;
        else
          return;
        if (n) {
          var s = S(r);
          yr(n, e.props, "prop", s, e);
        } else if (r.PropTypes !== void 0 && !Ae) {
          Ae = !0;
          var y = S(r);
          x("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", y || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && x("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Mr(e) {
      {
        for (var r = Object.keys(e.props), n = 0; n < r.length; n++) {
          var s = r[n];
          if (s !== "children" && s !== "key") {
            ie(e), x("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", s), ie(null);
            break;
          }
        }
        e.ref !== null && (ie(e), x("Invalid attribute `ref` supplied to `React.Fragment`."), ie(null));
      }
    }
    var Ze = {};
    function Qe(e, r, n, s, y, _) {
      {
        var h = R(e);
        if (!h) {
          var p = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (p += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var M = kr();
          M ? p += M : p += ze();
          var T;
          e === null ? T = "null" : Oe(e) ? T = "array" : e !== void 0 && e.$$typeof === o ? (T = "<" + (S(e.type) || "Unknown") + " />", p = " Did you accidentally export a JSX literal instead of a component?") : T = typeof e, x("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", T, p);
        }
        var O = Or(e, r, n, y, _);
        if (O == null)
          return O;
        if (h) {
          var N = r.children;
          if (N !== void 0)
            if (s)
              if (Oe(N)) {
                for (var se = 0; se < N.length; se++)
                  Xe(N[se], e);
                Object.freeze && Object.freeze(N);
              } else
                x("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Xe(N, e);
        }
        if (le.call(r, "key")) {
          var ne = S(e), D = Object.keys(r).filter(function(Nr) {
            return Nr !== "key";
          }), Ie = D.length > 0 ? "{key: someKey, " + D.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Ze[ne + Ie]) {
            var Fr = D.length > 0 ? "{" + D.join(": ..., ") + ": ...}" : "{}";
            x(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Ie, ne, Fr, ne), Ze[ne + Ie] = !0;
          }
        }
        return e === i ? Mr(O) : Ar(O), O;
      }
    }
    function Ir(e, r, n) {
      return Qe(e, r, n, !0);
    }
    function Dr(e, r, n) {
      return Qe(e, r, n, !1);
    }
    var $r = Dr, Lr = Ir;
    pe.Fragment = i, pe.jsx = $r, pe.jsxs = Lr;
  }()), pe;
}
var tr;
function Kr() {
  return tr || (tr = 1, Ne.env.NODE_ENV === "production" ? _e.exports = Jr() : _e.exports = zr()), _e.exports;
}
var d = Kr(), ue = {}, nr;
function Gr() {
  if (nr) return ue;
  nr = 1;
  var t = Vr;
  if (Ne.env.NODE_ENV === "production")
    ue.createRoot = t.createRoot, ue.hydrateRoot = t.hydrateRoot;
  else {
    var o = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    ue.createRoot = function(c, i) {
      o.usingClientEntryPoint = !0;
      try {
        return t.createRoot(c, i);
      } finally {
        o.usingClientEntryPoint = !1;
      }
    }, ue.hydrateRoot = function(c, i, u) {
      o.usingClientEntryPoint = !0;
      try {
        return t.hydrateRoot(c, i, u);
      } finally {
        o.usingClientEntryPoint = !1;
      }
    };
  }
  return ue;
}
var Xr = Gr();
const Zr = /* @__PURE__ */ Ur(Xr);
var De = {}, Ee = {}, or;
function Qr() {
  if (or) return Ee;
  or = 1, Object.defineProperty(Ee, "__esModule", {
    value: !0
  });
  var t = /* @__PURE__ */ function() {
    function m(f, v) {
      var l = [], E = !0, g = !1, b = void 0;
      try {
        for (var C = f[Symbol.iterator](), a; !(E = (a = C.next()).done) && (l.push(a.value), !(v && l.length === v)); E = !0)
          ;
      } catch ($) {
        g = !0, b = $;
      } finally {
        try {
          !E && C.return && C.return();
        } finally {
          if (g) throw b;
        }
      }
      return l;
    }
    return function(f, v) {
      if (Array.isArray(f))
        return f;
      if (Symbol.iterator in Object(f))
        return m(f, v);
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
  }(), o = xe;
  function c(m) {
    if (Array.isArray(m)) {
      for (var f = 0, v = Array(m.length); f < m.length; f++)
        v[f] = m[f];
      return v;
    } else
      return Array.from(m);
  }
  var i = function(f, v) {
    var l = (0, o.useRef)(function() {
      throw new Error("Cannot call an event handler while rendering.");
    });
    return (0, o.useEffect)(function() {
      l.current = f;
    }, [f].concat(c(v))), (0, o.useCallback)(function(E) {
      var g = l.current;
      return g(E);
    }, [l]);
  }, u = function() {
    var f = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, v = f.onEnd, l = v === void 0 ? function() {
    } : v, E = f.onResult, g = E === void 0 ? function() {
    } : E, b = f.onError, C = b === void 0 ? function() {
    } : b, a = (0, o.useRef)(null), $ = (0, o.useState)(!1), J = t($, 2), L = J[0], P = J[1], x = (0, o.useState)(!1), z = t(x, 2), V = z[0], ee = z[1], re = function(A) {
      var U = Array.from(A.results).map(function(S) {
        return S[0];
      }).map(function(S) {
        return S.transcript;
      }).join("");
      g(U);
    }, te = function(A) {
      A.error === "not-allowed" && (a.current.onend = function() {
      }, P(!1)), C(A);
    }, W = i(function() {
      var R = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      if (!(L || !V)) {
        var A = R.lang, U = A === void 0 ? "" : A, S = R.interimResults, I = S === void 0 ? !0 : S, F = R.continuous, K = F === void 0 ? !1 : F, G = R.maxAlternatives, q = G === void 0 ? 1 : G, Y = R.grammars;
        P(!0), a.current.lang = U, a.current.interimResults = I, a.current.onresult = re, a.current.onerror = te, a.current.continuous = K, a.current.maxAlternatives = q, Y && (a.current.grammars = Y), a.current.onend = function() {
          return a.current.start();
        }, a.current.start();
      }
    }, [L, V, a]), k = i(function() {
      !L || !V || (a.current.onresult = function() {
      }, a.current.onend = function() {
      }, a.current.onerror = function() {
      }, P(!1), a.current.stop(), l());
    }, [L, V, a, l]);
    return (0, o.useEffect)(function() {
      typeof window > "u" || (window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition, window.SpeechRecognition && (ee(!0), a.current = new window.SpeechRecognition()));
    }, []), {
      listen: W,
      listening: L,
      stop: k,
      supported: V
    };
  };
  return Ee.default = u, Ee;
}
var Re = {}, ar;
function et() {
  if (ar) return Re;
  ar = 1, Object.defineProperty(Re, "__esModule", {
    value: !0
  });
  var t = /* @__PURE__ */ function() {
    function i(u, m) {
      var f = [], v = !0, l = !1, E = void 0;
      try {
        for (var g = u[Symbol.iterator](), b; !(v = (b = g.next()).done) && (f.push(b.value), !(m && f.length === m)); v = !0)
          ;
      } catch (C) {
        l = !0, E = C;
      } finally {
        try {
          !v && g.return && g.return();
        } finally {
          if (l) throw E;
        }
      }
      return f;
    }
    return function(u, m) {
      if (Array.isArray(u))
        return u;
      if (Symbol.iterator in Object(u))
        return i(u, m);
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
  }(), o = xe, c = function() {
    var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, m = u.onEnd, f = m === void 0 ? function() {
    } : m, v = (0, o.useState)([]), l = t(v, 2), E = l[0], g = l[1], b = (0, o.useState)(!1), C = t(b, 2), a = C[0], $ = C[1], J = (0, o.useState)(!1), L = t(J, 2), P = L[0], x = L[1], z = function(k) {
      g(k);
    }, V = function() {
      var k = window.speechSynthesis.getVoices();
      if (k.length > 0) {
        z(k);
        return;
      }
      window.speechSynthesis.onvoiceschanged = function(R) {
        k = R.target.getVoices(), z(k);
      };
    }, ee = function() {
      $(!1), f();
    };
    (0, o.useEffect)(function() {
      typeof window < "u" && window.speechSynthesis && (x(!0), V());
    }, []);
    var re = function() {
      var k = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, R = k.voice, A = R === void 0 ? null : R, U = k.text, S = U === void 0 ? "" : U, I = k.rate, F = I === void 0 ? 1 : I, K = k.pitch, G = K === void 0 ? 1 : K, q = k.volume, Y = q === void 0 ? 1 : q;
      if (P) {
        $(!0);
        var w = new window.SpeechSynthesisUtterance();
        w.text = S, w.voice = A, w.onend = ee, w.rate = F, w.pitch = G, w.volume = Y, window.speechSynthesis.speak(w);
      }
    }, te = function() {
      P && ($(!1), window.speechSynthesis.cancel());
    };
    return {
      supported: P,
      speak: re,
      speaking: a,
      cancel: te,
      voices: E
    };
  };
  return Re.default = c, Re;
}
var ir;
function rt() {
  return ir || (ir = 1, function(t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var o = Qr();
    Object.defineProperty(t, "useSpeechRecognition", {
      enumerable: !0,
      get: function() {
        return i(o).default;
      }
    });
    var c = et();
    Object.defineProperty(t, "useSpeechSynthesis", {
      enumerable: !0,
      get: function() {
        return i(c).default;
      }
    });
    function i(u) {
      return u && u.__esModule ? u : { default: u };
    }
  }(De)), De;
}
var tt = rt();
const nt = "Chat", ot = ({
  isMinimized: t,
  onMinimizeToggle: o,
  icon: c,
  title: i,
  headerStyle: u
}) => t ? null : /* @__PURE__ */ d.jsxs(
  "div",
  {
    className: "ax-chat-header",
    style: u,
    onClick: o,
    children: [
      c && (typeof c == "string" ? /* @__PURE__ */ d.jsx("img", { src: c, alt: "Chat icon", className: "ax-chat-icon" }) : /* @__PURE__ */ d.jsx("span", { className: "ax-chat-icon", children: c })),
      i || (c ? null : /* @__PURE__ */ d.jsx("span", { className: "ax-chat-title", children: i ?? nt })),
      !t && /* @__PURE__ */ d.jsx("span", { className: "ax-minimize-indicator", children: "x" })
    ]
  }
), sr = "#000000", ur = ({ type: t, strokeColor: o }) => t === "on" ? /* @__PURE__ */ d.jsx(
  "svg",
  {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ d.jsx(
      "path",
      {
        d: "M19 10V12C19 15.866 15.866 19 12 19M5 10V12C5 15.866 8.13401 19 12 19M12 19V22M8 22H16M12 15C10.3431 15 9 13.6569 9 12V5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5V12C15 13.6569 13.6569 15 12 15Z",
        stroke: o ?? sr,
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  }
) : /* @__PURE__ */ d.jsx(
  "svg",
  {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ d.jsx(
      "path",
      {
        d: "M15 9.4V5C15 3.34315 13.6569 2 12 2C10.8224 2 9.80325 2.67852 9.3122 3.66593M12 19V22M8 22H16M3 3L21 21M5.00043 10C5.00043 10 3.50062 19 12.0401 19C14.51 19 16.1333 18.2471 17.1933 17.1768M19.0317 13C19.2365 11.3477 19 10 19 10M12 15C10.3431 15 9 13.6569 9 12V9L14.1226 14.12C13.5796 14.6637 12.8291 15 12 15Z",
        stroke: o ?? sr,
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  }
), at = ({
  isMinimized: t,
  loading: o,
  listening: c,
  textContent: i,
  speechContent: u,
  inputStyle: m,
  buttonStyle: f,
  theme: v,
  onSetInput: l,
  onSendMessage: E,
  onToggleSpeech: g
}) => {
  const b = Fe(null), C = () => {
    const a = b.current;
    a && (a.style.height = `${a.scrollHeight}px`);
  };
  return we(() => {
    C();
  }, [i]), we(() => {
    var a;
    !o && !t && ((a = b.current) == null || a.focus());
  }, [o, t]), t ? null : /* @__PURE__ */ d.jsxs("div", { className: "ax-chat-footer", children: [
    /* @__PURE__ */ d.jsx(
      "textarea",
      {
        ref: b,
        placeholder: c ? "Listening..." : "Type a message...",
        value: c ? u : i,
        style: m,
        disabled: o || c,
        onChange: (a) => {
          l(a.target.value);
        },
        onKeyDown: (a) => {
          a.key === "Enter" && !a.shiftKey && (a.preventDefault(), E());
        },
        rows: 1
      }
    ),
    /* @__PURE__ */ d.jsx("button", { onClick: g, style: { padding: 10 }, children: ur(c ? {
      type: "off",
      strokeColor: v.buttonTextColor
    } : {
      type: "on",
      strokeColor: v.buttonTextColor
    }) }),
    /* @__PURE__ */ d.jsx("button", { onClick: E, disabled: o, style: f, children: "Send" })
  ] });
}, it = new Wr.Converter({
  tables: !0,
  simpleLineBreaks: !0,
  simplifiedAutoLink: !0,
  openLinksInNewWindow: !0,
  omitExtraWLInCodeBlocks: !0
}), st = ({
  avatar: t,
  message: o,
  userMessageStyle: c,
  botMessageStyle: i
}) => {
  const { from: u, text: m } = o;
  return /* @__PURE__ */ d.jsxs(
    "div",
    {
      className: `chat-message flex ${u}`,
      style: { justifyContent: u === "bot" ? "flex-start" : "flex-end" },
      children: [
        o.from === "bot" && t && /* @__PURE__ */ d.jsx(
          "img",
          {
            src: t,
            alt: "Avatar",
            className: "ax-chat-avatar",
            style: {
              width: 32,
              height: 32,
              borderRadius: "50%",
              marginRight: 8
            }
          }
        ),
        /* @__PURE__ */ d.jsx(
          "div",
          {
            className: `ax-message ${u === "user" ? "ax-user" : "ax-bot"}`,
            style: u === "user" ? c : i,
            children: /* @__PURE__ */ d.jsx(
              "div",
              {
                dangerouslySetInnerHTML: {
                  __html: it.makeHtml(m)
                }
              }
            )
          }
        )
      ]
    }
  );
}, ut = ({
  isMinimized: t,
  loading: o,
  avatar: c,
  messages: i,
  userMessageStyle: u,
  botMessageStyle: m
}) => {
  const f = Fe(null);
  return we(() => {
    var v;
    (v = f.current) == null || v.scrollIntoView({ behavior: "smooth" });
  }, [i]), t ? null : /* @__PURE__ */ d.jsxs("div", { className: "ax-chat-body", children: [
    i.map((v, l) => /* @__PURE__ */ d.jsx(
      st,
      {
        avatar: c,
        message: v,
        userMessageStyle: u,
        botMessageStyle: m
      },
      l
    )),
    o && /* @__PURE__ */ d.jsxs("div", { className: "ax-message ax-bot ax-typing-indicator", children: [
      /* @__PURE__ */ d.jsx("span", {}),
      /* @__PURE__ */ d.jsx("span", {}),
      /* @__PURE__ */ d.jsx("span", {})
    ] }),
    /* @__PURE__ */ d.jsx("div", { ref: f })
  ] });
}, ct = () => /* @__PURE__ */ d.jsx(
  "svg",
  {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ d.jsx(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22ZM8 13.25C7.58579 13.25 7.25 13.5858 7.25 14C7.25 14.4142 7.58579 14.75 8 14.75H13.5C13.9142 14.75 14.25 14.4142 14.25 14C14.25 13.5858 13.9142 13.25 13.5 13.25H8ZM7.25 10.5C7.25 10.0858 7.58579 9.75 8 9.75H16C16.4142 9.75 16.75 10.0858 16.75 10.5C16.75 10.9142 16.4142 11.25 16 11.25H8C7.58579 11.25 7.25 10.9142 7.25 10.5Z",
        fill: "currentColor"
      }
    )
  }
), lt = ({
  mode: t,
  isMinimized: o,
  onMinimizeToggle: c,
  icon: i,
  title: u
}) => o ? (!i && !u && (i = /* @__PURE__ */ d.jsx(ct, {})), /* @__PURE__ */ d.jsxs("div", { className: `ax-chat-badge ${t}`, onClick: c, children: [
  i && (typeof i == "string" ? /* @__PURE__ */ d.jsx("img", { src: i, alt: "badge icon" }) : /* @__PURE__ */ d.jsx("span", { children: i })),
  u && /* @__PURE__ */ d.jsx("span", { children: u })
] })) : null, ft = {
  headerColor: "#333",
  headerTextColor: "#fff",
  backgroundColor: "#fff",
  userMessageColor: "#ccc",
  userMessageTextColor: "#333",
  botMessageColor: "#333",
  botMessageTextColor: "#fff",
  buttonColor: "#333",
  buttonTextColor: "#fff",
  inputBorderColor: "#ccc"
}, dt = {
  vertical: "bottom",
  horizontal: "right",
  offsetX: 24,
  offsetY: 24
}, vt = "👋 Hi there! How can I help you today?", pt = () => {
  const t = "ax_chat_session_id";
  let o = localStorage.getItem(t);
  return o || (o = crypto.randomUUID(), localStorage.setItem(t, o)), o;
}, ht = ({
  webhookUrl: t,
  title: o,
  welcomeMessage: c = vt,
  theme: i = {},
  position: u = {},
  icon: m,
  avatar: f
}) => {
  const [v, l] = de([
    { from: "bot", text: c }
  ]), [E, g] = de(""), [b, C] = de(""), [a, $] = de(!0), [J, L] = de(!1), P = () => {
    g((w) => w ? `${w} ${b}` : b), C(""), console.log("Speech ended");
  }, x = (w) => {
    typeof w == "string" ? C(w) : console.error("Unable to recognize speech");
  }, z = (w) => {
    w.error === "not-allowed" ? console.error("Speech input not allowed, check browser permissions") : console.error("Error", w.error);
  }, { listen: V, listening: ee, stop: re } = tt.useSpeechRecognition({
    onResult: x,
    onEnd: P,
    onError: z
  }), te = ee ? re : () => {
    V({ lang: "en-TH" });
  }, W = Fe(null);
  we(() => {
    W.current = pt();
  }, []);
  const k = async () => {
    const w = E.trim();
    if (w) {
      l((X) => [...X, { from: "user", text: w }]), g(""), L(!0);
      try {
        const X = await fetch(t, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: w,
            sessionId: W.current
          })
        });
        if (!X.ok) throw new Error("Network error");
        const ae = await X.text();
        l((he) => [...he, { from: "bot", text: ae }]);
      } catch (X) {
        console.error(X), l((ae) => [
          ...ae,
          { from: "bot", text: "⚠️ Sorry, something went wrong." }
        ]);
      } finally {
        L(!1);
      }
    }
  }, R = { ...ft, ...i }, A = { ...dt, ...u }, U = {
    backgroundColor: R.headerColor,
    color: R.headerTextColor
  }, S = {
    backgroundColor: R.backgroundColor
  }, I = {
    backgroundColor: R.buttonColor,
    color: R.buttonTextColor
  }, F = {
    borderColor: R.inputBorderColor
  }, K = {
    backgroundColor: R.userMessageColor,
    color: R.userMessageTextColor
  }, G = {
    backgroundColor: R.botMessageColor,
    color: R.botMessageTextColor
  }, q = o ? "pill" : "bubble", Y = ["ax-chat-container"];
  return a && (Y.push("ax-minimized"), Y.push(q)), /* @__PURE__ */ d.jsxs(
    "div",
    {
      className: Y.join(" "),
      style: {
        ...S,
        position: "fixed",
        [A.vertical]: A.offsetY,
        [A.horizontal]: A.offsetX
      },
      children: [
        /* @__PURE__ */ d.jsx(
          lt,
          {
            mode: q,
            isMinimized: a,
            onMinimizeToggle: () => $(!a),
            icon: m,
            title: o
          }
        ),
        /* @__PURE__ */ d.jsx(
          ot,
          {
            isMinimized: a,
            onMinimizeToggle: () => $(!a),
            icon: m,
            title: o,
            headerStyle: U
          }
        ),
        /* @__PURE__ */ d.jsx(
          ut,
          {
            isMinimized: a,
            loading: J,
            avatar: f,
            messages: v,
            userMessageStyle: K,
            botMessageStyle: G
          }
        ),
        /* @__PURE__ */ d.jsx(
          at,
          {
            isMinimized: a,
            loading: J,
            listening: ee,
            textContent: E,
            speechContent: b,
            inputStyle: F,
            buttonStyle: I,
            theme: i,
            onSetInput: g,
            onSendMessage: k,
            onToggleSpeech: te
          }
        )
      ]
    }
  );
};
function bt(t) {
  const { parent: o = document.body, ...c } = t;
  let i = o.querySelector(".automationx-chat-container");
  if (!i)
    i = document.createElement("div"), i.className = "automationx-chat-container", o.appendChild(i);
  else {
    console.log("Widget is already attached to this parent.");
    return;
  }
  const u = Zr.createRoot(i);
  return u.render(/* @__PURE__ */ d.jsx(ht, { ...c })), {
    destroy: () => {
      u.unmount(), i.remove();
    }
  };
}
export {
  ht as ChatWidget,
  bt as createChat,
  bt as default
};

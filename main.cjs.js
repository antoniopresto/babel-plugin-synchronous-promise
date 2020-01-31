"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = promiseToSync;

var _helperModuleImports = require("@babel/helper-module-imports");

// addNamed(path, 'named', 'source', { nameHint: "hintedName" });
// import { named as _hintedName } from "source"
function promiseToSync(_ref) {
  var t = _ref.types;
  return {
    visitor: {
			ReferencedIdentifier(path) {
				const { node, parent, scope } = path;

				if (node.name !== "Promise") return;
				if (t.isMemberExpression(parent)) return;
				if (scope.getBindingIdentifier("Promise")) return;

				path.replaceWithSourceString(
					`require("synchronous-promise").SynchronousPromise`
				);
			},

			MemberExpression(path) {
				const { node } = path;
				const obj = node.object;

				if (obj.name !== "Promise") return;
				if (!path.isReferenced()) return;
				if (path.scope.getBindingIdentifier("Promise")) return;

				if (node.computed) {
					path.replaceWithSourceString(
						`require("synchronous-promise").SynchronousPromise["${node.property}"]`
					);
				} else {
					path.replaceWithSourceString(
						`require("synchronous-promise").SynchronousPromise["${node.property.name}"]`
						// addNamed(path, `SynchronousPromise["${node.property.name}"]`, "synchronous-promise")
					);
				}
			}


    }
  };
}
//# sourceMappingURL=main.cjs.js.map

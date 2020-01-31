import { addNamed } from "@babel/helper-module-imports";

// addNamed(path, 'named', 'source', { nameHint: "hintedName" });
// import { named as _hintedName } from "source"

export default function promiseToSync({ types: t }) {
  return {
    visitor: {
			ReferencedIdentifier(path) {
				let importName = this.importName;
				if (importName) {
					importName = t.cloneDeep(importName);
				} else {
					// require('bluebird').coroutine
					importName = this.importName = addNamed(path, 'coroutine', 'bluebird');
				}

				path.replaceWith(importName);
			}

      // ReferencedIdentifier(path) {
      //   const { node, parent, scope } = path;
			//
      //   if (node.name !== "Promise") return;
      //   if (t.isMemberExpression(parent)) return;
      //   if (scope.getBindingIdentifier("Promise")) return;
			//
      //   path.replaceWith(
      //     addNamed(path, "SynchronousPromise", "synchronous-promise", {
      //       nameHint: "SynchronousPromise"
      //     })
      //   );
      // },

      // MemberExpression(path) {
      //   const { node } = path;
      //   const obj = node.object;
			//
      //   if (obj.name !== "Promise") return;
      //   if (!path.isReferenced()) return;
      //   if (path.scope.getBindingIdentifier("Promise")) return;
			//
      //   if (node.computed) {
      //     path.replaceWith(
      //       t.memberExpression(
      //         addNamed(path, "SynchronousPromise", "synchronous-promise", {
      //           nameHint: "SynchronousPromise"
      //         }),
      //         node.property,
      //         true
      //       )
      //     );
      //   } else {
      //     path.replaceWith(
      //       addNamed(path, node.property.name, "synchronous-promise", {
      //         nameHint: "Promise"
      //       })
      //     );
      //   }
      // }
    }
  };
}

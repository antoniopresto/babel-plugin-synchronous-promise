import { addNamed } from "@babel/helper-module-imports";

export default function promiseToSync({ types: t }) {
  return {
    visitor: {
      ReferencedIdentifier(path) {
        const { node, parent, scope } = path;

        if (node.name !== "Promise") return;
        if (t.isMemberExpression(parent)) return;
        if (scope.getBindingIdentifier("Promise")) return;

        path.replaceWith(
          addNamed(path, "SynchronousPromise", "synchronous-promise", {
            nameHint: "Promise"
          })
        );
      },

      MemberExpression(path) {
        const { node } = path;
        const obj = node.object;

        if (obj.name !== "Promise") return;
        if (!path.isReferenced()) return;
        if (path.scope.getBindingIdentifier("Promise")) return;

        if (node.computed) {
          path.replaceWith(
            t.memberExpression(
              addNamed(path, "SynchronousPromise", "synchronous-promise", {
                nameHint: "Promise"
              }),
              node.property,
              true
            )
          );
        } else {
          path.replaceWith(
            addNamed(path, node.property.name, "synchronous-promise", {
              nameHint: "Promise"
            })
          );
        }
      }
    }
  };
}

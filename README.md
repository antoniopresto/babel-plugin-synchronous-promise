# babel-plugin-synchronous-promise

This plugin replaces `Promise` with https://www.npmjs.com/package/synchronous-promise.

## Usage

1. Install *synchronous-promise*: `npm install --save synchronous-promise`
2. Install the *babel-plugin-synchronous-promise* plugin: `npm install --save-dev babel-plugin-synchronous-promise`
3. Add *babel-plugin-synchronous-promise* to your *.babelrc* file:
```json
{
	"plugins": ["babel-plugin-synchronous-promise"]
}
```
If you'r using the *transform-runtime* plugin add *babel-plugin-synchronous-promise* before
*transform-runtime*:
```json
{
	"plugins": [
		"babel-plugin-synchronous-promise",
		"transform-runtime"
	]
}
```

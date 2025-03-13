# DOMUtils

🚀 DOMUtils is a JavaScript utility class for dynamically creating and configuring DOM and SVG elements.

## Features
✔ Create HTML & SVG elements dynamically  
✔ Support for **classList, attributes, styles, events, and nested children**  
✔ Easy-to-use API

## Installation
You can install DOMUtils via npm:

```sh
npm install dom-utils-light
```

Or use it directly in your project:

```js
import DOMUtils from "dom-utils-light";
```

# Usage

## Creating an HTML element

```js
const domUtils = new DOMUtils();
const div = domUtils.createElement({
    tag: 'div',
    classList: ['container', 'show'],
    props: { textContent: 'Hello, world!' },
    children: [
        {
            tag: 'span',
            classList: ['text'],
        },
        {
            tag: 'a',
            classList: ['link'],
            props: {
                href: '/'
            },
            children: [
                {
                    tag: 'span',
                    props: {
                        textContent: 'Open Link'
                    }
                }
            ]
        },
    ]
});
document.body.appendChild(div);
```

## Creating an SVG element

```js
const svgElement = domUtils.createElement({
    namespace: 'svg',
    tag: 'svg',
    attributes: { width: '100', height: '100' },
    children: [
        {
            namespace: 'svg',
            tag: 'circle',
            attributes: {
                cx: '50',
                cy: '50',
                r: '40',
                stroke: 'black',
                'stroke-width': '3',
                fill: 'red'
            }
        }
    ]
});
document.body.appendChild(svgElement);
```

## License
This project is licensed under the MIT License.
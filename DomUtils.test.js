import DOMUtils from './DomUtils.js';

test('creates a div element', () => {
    const domUtils = new DOMUtils();
    const element = domUtils.createElement({ tag: 'div' });

    expect(element.tagName).toBe('DIV');
});

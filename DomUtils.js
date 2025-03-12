/**
 * Класс создания элементов DOM структуры
 */

export default class  DOMUtils {
    /**
     * Создает DOM или SVG элемент с возможностью вложенности.
     * @param {Object} [config] - конфигурация элемента
     * @param {String} [config.namespace] - Пространство имен элемента ("html" или "svg"). По умолчанию "html".
     * @param {String} [config.tag] - Тэг элемента. По умолчанию "div".
     * @param {Array} [config.classList] - Классы CSS (['class1','class2']).
     * @param {Object} [config.props] - Свойства элемента (textContent, innerHTML, placeholder и т.д.).
     * @param {Object} [config.attributes] - Атрибуты элемента (например, {'data-id': '123'}).
     * @param {Object} [config.styles] - CSS стили ({ zIndex: '100' }).
     * @param {Object} [config.events] - События (например, { click: () => {} }).
     * @param {Array} [config.children] - Вложенные элементы.
     * @returns {HTMLElement|SVGElement}
     */
    createElement(config) {
        if(config !== null) {
            const namespace = config.namespace || 'html';
            const tag = config.tag || 'div';

            let element;
            if (namespace === 'svg') {
                element = document.createElementNS('http://www.w3.org/2000/svg', tag);
            } else {
                element = document.createElement(tag);
            }

            // Добавляем классы
            if (config.classList) {
                config.classList.forEach(className => {
                    if(className !== '') {
                        element.classList.add(className);
                    }
                });
            }

            // Добавляем атрибуты
            if (config.attributes) {
                for (const [key, value] of Object.entries(config.attributes)) {
                    if(value) {
                        element.setAttribute(key, value);
                    }
                }
            }

            // Устанавливаем стили
            if (config.styles) {
                this.setStyles(element, config.styles);
            }

            // Устанавливаем свойства элемента (для обычных HTML-элементов)
            if (config.props) {
                for (const [key, value] of Object.entries(config.props)) {
                    if (key in element) {
                        element[key] = value;
                    }
                }
            }

            // Добавляем обработчики событий
            if (config.events) {
                for (const [evt, fn] of Object.entries(config.events)) {
                    if (typeof fn === 'function') {
                        element.addEventListener(`${evt}`, fn);
                    } else {
                        console.warn(`Ошибка при создании события ${evt} для элемента ${element.tag}`);
                    }
                }
            }

            // Добавляем дочерние элементы
            if (config.children) {
                config.children.forEach(child => {
                    if(child instanceof HTMLElement) {
                        element.appendChild(child);
                    } else if (typeof child === 'object' && child !== null) {
                        const childElement = this.createElement(child);
                        element.appendChild(childElement);
                    }
                });
            }
            return element;
        }
    }

    /**
     * Устанавливает стили элемента
     * @param {HTMLElement} element
     * @param {Object} styles
     */
    setStyles(element, styles) {
        if (styles && typeof styles === 'object') {
            for (const [key, value] of Object.entries(styles)) {
                element.style[key] = value;
            }
        }
    }
}
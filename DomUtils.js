/**
 * Класс создания элементов DOM структуры
 */

export default class  DOMUtils {
    /**
     * Создает DOM элемент с возмодностью вложенности.
     * @param {Object} [config] - конфигурация DOM элемента
     * @param {String} [config.tag] - Тэг эемента. По умолчанию DIV.
     * @param {Array} [config.classList] - Массив классов для объекта ['class1','class2'] и т.д.
     * @param {Object} [config.props] - Свойства элемента. Например props{textContent: 'текст'}
     * @param {String} [config.props.textContent] - Текст элемента
     * @param {String} [config.props.innerHTML] - HTML внутри элемента
     * @param {String} [config.props.placeholder] - placeholder
     * @param {String} [config.props.type] - input type
     * @param {String} [config.props.name] - input name
     * @param {Object} [config.attributes] - Аттрибуты элемента. Например attributes{'data-set': 'text'}.
     * @param {Object} [config.styles] - Стили элемента. Например styles{zIndex: '100'}.
     * @param {Object} [config.events] - События, который вешаются на элемент. Например events{click: () => {}}
     * @param {Array} [config.children] - Массив дочерних объектов. Обладает всеми теми же ключами, что и родительский: tag, props, children и т.д.
     * */
    createElement(config) {
        if(config !== null) {
            const element = document.createElement(config.tag || 'div');
            if (config.classList) {
                config.classList.forEach(className => {
                    if(className !== '') {
                        element.classList.add(className);
                    }
                });
            }

            if (config.attributes) {
                for (const [key, value] of Object.entries(config.attributes)) {
                    if(value) {
                        element.setAttribute(key, value);
                    }
                }
            }

            if (config.styles) {
                this.setStyles(element, config.styles);
            }

            if (config.props) {
                for (const [key, value] of Object.entries(config.props)) {
                    if (key in element) {
                        element[key] = value;
                    }
                }
            }

            if (config.events) {
                for (const [evt, fn] of Object.entries(config.events)) {
                    if (typeof fn === 'function') {
                        element.addEventListener(`${evt}`, fn);
                    } else {
                        console.warn(`Ошибка при создании события ${evt} для элемента ${element.tag}`);
                    }
                }
            }

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
    setStyles(element, styles) {
        if (styles && typeof styles === 'object') {
            for (const [key, value] of Object.entries(styles)) {
                element.style[key] = value;
            }
        }
    }
}
import { dedupeMixin } from '@open-wc/dedupe-mixin';
import { adoptStyles } from '@lit/reactive-element/css-tag.js';

/**
 * @typedef {import('./types').ScopedElementsMixin} ScopedElementsMixin
 * @typedef {import('./types').ScopedElementsHost} ScopedElementsHost
 * @typedef {import('./types').ScopedElementsMap} ScopedElementsMap
 */

const ScopedElementsMixinImplementation = superclass =>
  /** @type {ScopedElementsMixin} */
  class ScopedElementsHost extends superclass {
    /**
     * Obtains the scoped elements definitions map if specified.
     *
     * @returns {ScopedElementsMap}
     */
    static get scopedElements() {
      return {};
    }

    /**
     * Obtains the CustomElementRegistry if specified.
     *
     * @return {CustomElementRegistry}
     */
    get registry() {
      if (!this._registry) {
        this._registry = new CustomElementRegistry();
      }

      return this._registry;
    }

    createRenderRoot() {
      const { scopedElements, shadowRootOptions, elementStyles } = /** @type {typeof ScopedElementsHost} */ (this.constructor);

      Object.entries(scopedElements).forEach(([tagName, klass]) =>
        this.registry.define(tagName, klass),
      );

      this.renderOptions.creationScope = this.attachShadow({
        ...shadowRootOptions,
        customElements: this.registry,
      });

      adoptStyles(this.renderOptions.creationScope, elementStyles);

      return this.renderOptions.creationScope;
    }

    /**
     * Defines a scoped element.
     *
     * @param {string} tagName
     * @param {typeof HTMLElement} klass
     */
    defineScopedElement(tagName, klass) {
      return this.registry.get(tagName) || this.registry.define(tagName, klass);
    }
  };

export const ScopedElementsMixin = dedupeMixin(ScopedElementsMixinImplementation);

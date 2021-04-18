import { Constructor } from '@open-wc/dedupe-mixin';
import { ReactiveElement } from '@lit/reactive-element';

export type ScopedElementsMap = {
  [key: string]: typeof HTMLElement;
};

export declare class ScopedElementsHost {
  constructor(...args: any[]);
  /**
   * Obtains the scoped elements definitions map
   */
  static scopedElements: ScopedElementsMap;

  /**
   * Obtains the CustomElementRegistry
   */
  static registry: CustomElementRegistry;

  /**
   * Defines a scoped element inside the CustomElementRegistry bound to the shadowRoot.
   */
  defineScopedElement<T extends HTMLElement>(tagName: string, klass: Constructor<T>): void;
}

declare function ScopedElementsMixinImplementation<T extends Constructor<ReactiveElement>>(
  superclass: T,
): T & Constructor<ScopedElementsHost> & typeof ScopedElementsHost;

export type ScopedElementsMixin = typeof ScopedElementsMixinImplementation;

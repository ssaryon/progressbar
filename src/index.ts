import { Data } from './api/Data';
import type { ComponentConfig } from './@types/types';
import { ShippingProgressBar } from './components/ShippingProgressBar';

function renderComponent(config: ComponentConfig): void {
  const { customElement, siblingElement } = config;

  let Component;
  defineWebComponent(customElement);
  // eslint-disable-next-line prefer-const
  Component = document.createElement(customElement) as ShippingProgressBar;

  Component.props = config;

  const sibling = document.querySelector(siblingElement)!;
  sibling.insertAdjacentElement('afterend', Component);
}

function defineWebComponent(component: string): void {
  const preRegisteredElement = customElements.get(component);
  if (!preRegisteredElement) {
    customElements.define(component, ShippingProgressBar);
  }
}

renderComponent(Data);

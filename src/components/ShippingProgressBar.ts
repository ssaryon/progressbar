/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { ComponentConfig } from '../@types/types';

export class ShippingProgressBar extends HTMLElement {
  props: ComponentConfig;

  constructor(props: ComponentConfig) {
    super();
    this.props = props;
  }

  totalSpent = 30;
  isLoggedIn = true;

  connectedCallback(): void {
    const { parentClassName, spendingGoal } = this.props;
    this.className = parentClassName;

    this.appendChild(
      this.createMessage(
        this.isLoggedIn,
        this.totalSpent,
        parseFloat(spendingGoal),
      ),
    );
    this.appendChild(this.createProgressBar(25, parseFloat(spendingGoal)));
  }

  createStyle(style: string): HTMLStyleElement {
    const styles = document.createElement('style');
    styles.textContent = style;
    return styles;
  }

  createProgressBar(totalSpent: number, spendingGoal: number): HTMLDivElement {
    const progressBarWrapper = document.createElement('div');
    progressBarWrapper.className = 'progressbar-wrapper';

    const progressBar = document.createElement('div');
    progressBar.className = 'progressbar';

    const progressionResult = this.calculateBarProgression(
      totalSpent,
      spendingGoal,
    );

    //Compiles progressbar
    progressBar.appendChild(progressionResult);
    progressBarWrapper.appendChild(progressBar);
    const shippingGoalPrice = document.createElement('span');
    shippingGoalPrice.className = 'free-shipping-goal';
    shippingGoalPrice.textContent = '$' + spendingGoal;

    progressBarWrapper.appendChild(shippingGoalPrice);

    return progressBarWrapper;
  }

  calculateBarProgression(
    totalSpent: number,
    spendingGoal: number,
  ): HTMLElement {
    const progressionResult = document.createElement('div');
    progressionResult.className = 'progress-result';

    if (totalSpent >= spendingGoal) {
      setTimeout(() => (progressionResult.style.width = '100%'), 1000);
    } else if (totalSpent < spendingGoal) {
      totalSpent = totalSpent * 2;
      setTimeout(
        () => (progressionResult.style.width = `${totalSpent}%`),
        1000,
      );
    }

    return progressionResult;
  }

  createMessage(
    isLoggedIn: boolean,
    totalSpent: number,
    spendingGoal: number,
  ): HTMLDivElement {
    const messageWrapper = document.createElement('div');
    messageWrapper.className = 'shipping-message-wrapper';

    const firstText = document.createElement('p');
    const secondText = document.createElement('p');

    if (isLoggedIn && totalSpent >= spendingGoal) {
      firstText.innerHTML = 'You qualify for free shipping!';
    } else if (isLoggedIn && totalSpent < spendingGoal) {
      firstText.innerHTML = `$${
        spendingGoal - totalSpent
      } more to go to qualify for free shipping!`;
    }

    if (!isLoggedIn) {
      firstText.innerHTML = `Members get <span>free shipping</span> on orders $${spendingGoal}+.`;

      secondText.innerHTML =
        '<a href="https://www.nike.com/membership">Join us</a> or <a href="https://www.nike.com/membership">Sign-in</a>';
    }

    messageWrapper.appendChild(firstText);
    !isLoggedIn && messageWrapper.appendChild(secondText);

    return messageWrapper;
  }

  getCartTotalAmount() {
    //TODO: Fetch cart total price value and pass into web component (either through webscrapping, cart api, or other methods.)
  }
}

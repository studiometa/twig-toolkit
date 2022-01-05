import type { Twig } from 'twig';

/**
 * ExtendTag class.
 */
export abstract class AbstractTag {
  protected instance: Twig;

  /**
   * Class constructor.
   * @param {Twig} instance
   */
  constructor(instance: Twig) {
    this.instance = instance;
  }
}

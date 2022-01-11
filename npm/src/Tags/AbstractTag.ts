import type { Twig } from 'twig';

/**
 * ExtendTag class.
 */
export abstract class AbstractTag {
  protected static instance: Twig;

  /**
   * Class constructor.
   * @param {Twig} instance
   */
  constructor(instance: Twig) {
    AbstractTag.instance = instance;
  }
}

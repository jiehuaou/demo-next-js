
/**
 * demo define namespace.
 */

declare namespace myshape {

  /**
   * location Point
   */
  interface Point {
    x: number;
    y: number;
  }

  /**
   * circle shape with center and radius.
   */
  interface Circle {
    center: Point;
    radius: number;
  }

  /**
   * compute Area via Circle
   */
  function getArea(circle: Circle): number;


}

export = myshape;
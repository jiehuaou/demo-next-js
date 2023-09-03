import { Point } from "./shape-namespace";

/**
 * "extending namespace" need to import type if you want to use it.
 * 
 * which is not as convenient as "extending module", 
 * 
 * since "extending module" does not need to import type.
 */

declare namespace myshape {

  /**
   * Rectangle shape with start and end.
   */
  interface Rectangle {
    start: Point;
    end: Point;
  }

  /**
   * compute Area of Rectangle
   */
  function getArea(area: Rectangle): number;


}

export = myshape;
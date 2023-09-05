/////<reference path="./shape-namespace.d.ts" />
import { Point as Pointxy } from "./shape-namespace";

/**
 * "extending namespace" need to import type if you want to use it.
 * 
 * which is not as convenient as "extending module", 
 * 
 * since "extending module" does not need to import type.
 */

declare namespace myshape {

  interface Z {
    /**
     * z coordinate
     */
    z?: number;
  }

  /**
   * location Point(x,y,z)
   */
  export type Point = Pointxy & Z;

  
  /**
   * Rectangle shape with start and end.
   */
   export interface Rectangle {
    start: Point;
    end: Point;
  }

  /**
   * compute Area of Rectangle
   */
   export function getArea(area: Rectangle): number;


}

const data : myshape.Point = {
  x: 1,
  y: 2,
  z: 3
}

export = myshape;
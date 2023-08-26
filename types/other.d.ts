
/**
 * demo how to use d.ts file to declare types for react prject.
 */

declare module other {
  export type MyType = {
    id: number;
    name: string;
  };

  export interface MyInterface {
    email: string;
    age: number;
  }

  /**
   * greet Function
   * @param param 
   */
  export function greetFunction(param: MyInterface): string;

  export function otherFunction(param: MyType): boolean;
}



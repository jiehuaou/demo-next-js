
/**
 * demo how to use d.ts file to declare types for react prject.
 */

declare module Other {
  export type MyType = {
    id: number;
    name: string;
  };

  export interface MyInterface {
    age: number;
    email: string;
  }

  export function greetFunction(param: MyInterface): string;

  export function otherFunction(param: MyType): boolean;
}


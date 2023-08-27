import { type MyContact, type MyIdentity } from "./other";

/**
 * demo how to use declaration merging to extend 
 * existing interface with additional properties.
 */

declare module "./other" {
    interface MyIdentity {
        //   id: number;
        //   name: string;
        token: string;
    }

    interface MyContact {
        // email: string;
        // age: number;
        mobile: string;
    }
}

// export {}
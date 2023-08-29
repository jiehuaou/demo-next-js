// import { MyContact,  MyIdentity } from "./other";

/**
 * 
 * demo how to use "Module Augmentation" to extend 
 * existing interface with additional properties.
 */

declare module './other' {

    interface MyIdentity {
        
        /**
         * user token 888-999-1111
         */
        token: string;
    }

    interface MyContact {
        
        /**
         * user mobile 123-{6}8
         */
        mobile: string;  // 
    }
}

export { }
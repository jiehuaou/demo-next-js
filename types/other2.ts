// import { MyContact,  MyIdentity } from "./other";

/**
 * 
 * demo how to use "Module Augmentation" to extend 
 * existing interface with additional properties.
 */

 declare module './other' {

    interface MyIdentity {
        
        /**
         * security token \d{3}-\d{3}-\d{4}
         */
        token: string;
    }

    interface MyContact {
        
        /**
         * user mobile 123-\d{6}
         */
        mobile: string;  // 123-888888
    }
}

export { }
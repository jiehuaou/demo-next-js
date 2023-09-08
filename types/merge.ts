
/**
 * demo :
 * 
 * add new property "role" on nested object "user" of parent object "Hello"
 */

export type ISODateString = string

export interface DefaultHello {
    user?: {
        name?: string | null
        email?: string | null
        image?: string | null
    }
    expires: ISODateString
}

export interface Hello extends DefaultHello { }

export interface DefaultHello {

    //add new property "role" 
    
    task: string;
}


export interface Hello extends DefaultHello {
    counter?: number;
    user?: DefaultHello['user'] &  {
        /**
         * add new property on nested object
         */
        role?: string | null
    };
}

let hello: Hello = {
    expires: '2020-01-01',
    counter: 123,
    user: {
        role: "admin",
        name: 'test',
        email: 'test@example.com',
        image: 'test'
    },
    task: 'test'
}

console.log(hello);

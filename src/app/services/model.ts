export interface User {
    id: number;
    name: string;
    lastName: string;
    prefix: string;
    title: string;
    imageUrl: string;
}

export interface UserDetails {
    id: number;
    name: string;
    lastName: string;
    prefix: string;
    title: string;
    imageUrl: string;
    jobDescriptor: string;
    jobArea: string;
    jobType: string;
    email: string;
    ip: string;
    company: {
        name: string;
        suffix: string;
    };
    address: {
        zipCode: string;
        city: string;
        streetAddress: string;
        country: string;
        state: string;
    }
}

export interface UserFriends {
    list: User[];
    pagination: {
        current: number;
        nextPage: number | null;
        pageSize: number;
        previousPage: number | null;
        total: number;
    }
}
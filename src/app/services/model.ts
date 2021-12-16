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
    company: Company;
    address: Address;
}

export interface UserFriends {
    list: User[];
    pagination: Pagination;
}

export interface Address {
    zipCode: string;
    city: string;
    streetAddress: string;
    country: string;
    state: string;
}

export interface Company {
    name: string;
    suffix: string;
}

export interface Pagination {
    current: number;
    nextPage: number | null;
    pageSize: number;
    previousPage: number | null;
    total: number;
}
export interface User {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    pwd: string;
    id: number;
    accountExpired: boolean;
    accountLocked: boolean;
    credentialsExpired: boolean;
    enabled: boolean;
    registeredAt: Date;
    roles: object;
}
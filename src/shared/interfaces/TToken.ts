
export type RolesType =
	| "STUDENT"
	| "ADMIN"
	| "TEACHER";

export type TToken = {
    /** user id */
    sub: string;
    /** user email */
    email: string;
    /** user name */
    name: string;
    /** user roles */
    role: RolesType[];
    /** host */
    iss: string;
    /** target */
    aud: string;
    /** expiration date */
    exp: number;

    jti: string;
    nbf: string;
    iat: string;
};
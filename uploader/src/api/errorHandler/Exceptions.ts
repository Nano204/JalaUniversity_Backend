export interface Exception {
    code: number;
    message: string;
}

export class BadRequestException extends Error implements Exception {
    public code: number;
    public message: string;

    constructor(message?: string) {
        super();
        this.code = 400;
        this.message = message || "Bad request";
    }
}

export class NotFoundException extends Error implements Exception {
    public code: number;
    public message: string;
    public stack!: string;

    constructor(message?: string) {
        super();
        this.code = 404;
        this.message = message || "Content not found";
    }
}

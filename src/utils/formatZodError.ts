import { ZodError } from "zod";

export const formatZodError = (error: ZodError): string => {
    const errorMessage = JSON.stringify(error.format(), null, 2);
    console.error(errorMessage);

    return errorMessage;
};

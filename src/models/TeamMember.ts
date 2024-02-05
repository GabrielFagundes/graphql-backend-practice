export interface TeamMember {
    id: number;
    name: string;
    position?: string;
    dateOfBirth: string | Date;
    nationality: string | null;
}

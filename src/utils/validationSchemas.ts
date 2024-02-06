// src/validationSchemas.js

import { z } from "zod";

const competitionSchema = z.object({
    id: z.number().optional(),
    code: z.string().min(1),
    name: z.string().min(1),
    areaName: z.string().min(1),
});

const teamSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1),
    tla: z.string().min(1).nullable(),
    shortName: z.string().min(1).nullable(),
    areaName: z.string().min(1).nullable(),
    address: z.string().min(1).nullable(),
});

const playerSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1),
    position: z.string().min(1),
    dateOfBirth: z.string().min(1),
    nationality: z.string().min(1).nullable(),
    teamId: z.number().optional().nullable(),
});

const coachSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1),
    dateOfBirth: z.string().min(1),
    nationality: z.string().min(1).nullable(),
    teamId: z.number().optional().nullable(),
});

const leagueCodeInput = z.string().min(2);

const teamNameInput = z.string().min(3);

export {
    competitionSchema,
    teamSchema,
    playerSchema,
    coachSchema,
    leagueCodeInput,
    teamNameInput,
};

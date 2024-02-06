import LeagueController from "../../controllers/LeagueController.js";
import PlayerController from "../../controllers/PlayerController.js";
import TeamController from "../../controllers/TeamController.js";
import { formatZodError } from "../../utils/formatZodError.js";
import { logger } from "../../utils/logger.js";
import {
    teamNameInput,
    leagueCodeInput,
} from "../../utils/validationSchemas.js";

const resolvers = {
    Mutation: {
        importLeague: async (
            _parent: unknown,
            args: { leagueCode: string }
        ) => {
            try {
                const validatedInput = leagueCodeInput.safeParse(
                    args.leagueCode
                );
                if (!validatedInput.success) {
                    return new Error(formatZodError(validatedInput.error));
                }

                return await LeagueController.importLeagueData(args.leagueCode);
            } catch (error) {
                logger.error(
                    `Failed to import league data for: ${args.leagueCode}`
                );
                throw new Error("Failed to import league data");
            }
        },
    },
    Query: {
        getTeams: async () => await TeamController.getAllTeams(),
        getTeamMembersByLeague: async (
            _parent: unknown,
            { leagueCode }: { leagueCode: string }
        ) => {
            const validatedInput = leagueCodeInput.safeParse(leagueCode);
            if (!validatedInput.success) {
                return new Error(formatZodError(validatedInput.error));
            }

            return await PlayerController.getTeamMembersByLeague(leagueCode);
        },
        getTeamByName: async (_parent: unknown, { name }: { name: string }) => {
            const validatedInput = teamNameInput.safeParse(name);

            if (!validatedInput.success) {
                return new Error(formatZodError(validatedInput.error));
            }

            return await TeamController.getTeamByName(name);
        },
    },
};

export default resolvers;

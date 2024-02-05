import LeagueController from "../../controllers/LeagueController";
import PlayerController from "../../controllers/PlayerController";
import TeamController from "../../controllers/TeamController";
import { TeamMember } from "../../models/TeamMember";
// import { competitionController } from '../controllers/CompetitionController'; // Assuming similar setup

const resolvers = {
    Mutation: {
        importLeague: async (
            _parent: unknown,
            args: { leagueCode: string }
        ) => {
            try {
                return await LeagueController.importLeagueData(args.leagueCode);
            } catch (error) {
                console.error("Failed to import league data:", error);
                // Depending on your error handling strategy, you might want to throw an error,
                // return a specific error message, or handle it in another appropriate manner.
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
            return await PlayerController.getTeamMembersByLeague(leagueCode);
        },
        getTeamByName: async (_parent: unknown, { name }: { name: string }) => {
            return await TeamController.getTeamByName(name);
        },
        teamMembers: (
            _parent: unknown,
            args: { teamId: number }
        ): Promise<TeamMember[]> => {
            return TeamController.getTeamMembers(args.teamId);
        },
    },
    TeamMember: {
        __resolveType(obj: TeamMember) {
            if (obj.position) {
                return "Player";
            } else {
                return "Coach";
            }
        },
    },
};

export default resolvers;

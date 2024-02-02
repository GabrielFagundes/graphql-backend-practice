import LeagueController from "../../controllers/LeagueController";

// Sample data (replace with your actual data source)
const players = [
    {
        id: "1",
        name: "Player 1",
        position: "Forward",
        dateOfBirth: "1990-01-01",
        nationality: "Country A",
    },
    {
        id: "2",
        name: "Player 2",
        position: "Midfielder",
        dateOfBirth: "1995-02-02",
        nationality: "Country B",
    },
    // Add more players...
];

const teams = [
    {
        id: "1",
        name: "Team A",
        tla: "TA",
        shortName: "A",
        areaName: "Region X",
        address: "123 Main St",
        players: [players[0]],
    },
    {
        id: "2",
        name: "Team B",
        tla: "TB",
        shortName: "B",
        areaName: "Region Y",
        address: "456 Elm St",
        players: [players[1]],
    },
    // Add more teams...
];

const competitions = [
    {
        id: "1",
        name: "Competition 1",
        code: "C1",
        areaName: "Region X",
        teams: [teams[0], teams[1]],
    },
    // Add more competitions...
];

const resolvers = {
    Mutation: {
        importLeague: async (
            _parent: unknown,
            args: { leagueCode: string }
            // _context: unknown,
            // _info: unknown
        ) => {
            try {
                // Use the LeagueController to import league data
                const response = await LeagueController.importLeagueData(
                    args.leagueCode
                );
                return response;
            } catch (error) {
                console.error("Failed to import league data:", error);
                // Depending on your error handling strategy, you might want to throw an error,
                // return a specific error message, or handle it in another appropriate manner.
                throw new Error("Failed to import league data");
            }
        },
    },
    Query: {
        getPlayer: (_: unknown, args: { id: string }) => {
            return players.find((player) => player.id === args.id);
        },
        getTeam: (_: unknown, args: { id: string }) => {
            return teams.find((team) => team.id === args.id);
        },
        getCompetition: (_: unknown, args: { id: string }) => {
            return competitions.find(
                (competition) => competition.id === args.id
            );
        },
    },
    Team: {
        players: (parent: any) => {
            return parent.players.map((playerId: string) =>
                players.find((player) => player.id === playerId)
            );
        },
    },
    Competition: {
        teams: (parent: any) => {
            return parent.teams.map((teamId: string) =>
                teams.find((team) => team.id === teamId)
            );
        },
    },
};

export default resolvers;

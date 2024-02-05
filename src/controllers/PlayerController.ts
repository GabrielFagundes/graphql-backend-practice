import CoachService from "../services/CoachService";
import PlayerService from "../services/PlayerService";

class PlayerController {
    async getTeamMembersByLeague(leagueCode: string, teamName?: string) {
        const players = await PlayerService.getPlayersByLeague(
            leagueCode,
            teamName
        );
        if (players.length > 0) {
            return players;
        } else {
            const coaches = await CoachService.getCoachesByLeague(
                leagueCode,
                teamName
            );
            if (coaches.length > 0) {
                return coaches;
            }
        }
        throw new Error(
            `No data found for leagueCode: ${leagueCode}${
                teamName ? ` and teamName: ${teamName}` : ""
            }`
        );
    }
}

export default new PlayerController();

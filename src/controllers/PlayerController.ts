import CoachService from "../services/CoachService.js";
import PlayerService from "../services/PlayerService.js";

class PlayerController {
    async getTeamMembersByLeague(leagueCode: string) {
        const players = await PlayerService.getPlayersByLeague(leagueCode);
        if (players.length > 0) {
            return players;
        } else {
            const coaches = await CoachService.getCoachesByLeague(leagueCode);
            if (coaches.length > 0) {
                return coaches;
            }
        }
        throw new Error(`No data found for leagueCode: ${leagueCode}`);
    }
}

export default new PlayerController();

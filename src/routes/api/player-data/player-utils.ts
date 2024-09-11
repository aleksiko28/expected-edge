import type { Player } from "@/types"

export const getPositionMinCost = (position: number) => {
  switch (position) {
    case 1:
      return 40
    case 2:
      return 40
    case 3:
      return 45
    case 4:
      return 45
    default:
      return 45
  }
}

export const formatPlayerData = (elements: Player[]) =>
  elements.map((player: Player) => {
    const xAddedPointsPerMatch = getExpectedPoints(player)
    return {
      id: player.id,
      first_name: player.first_name,
      second_name: player.second_name,
      web_name: player.web_name,
      team: player.team,
      element_type: player.element_type,
      now_cost: player.now_cost,
      selected_by_percent: player.selected_by_percent,
      total_points: player.total_points,
      points_per_game: player.points_per_game,
      minutes: player.minutes,
      goals_scored: player.goals_scored,
      assists: player.assists,
      clean_sheets: player.clean_sheets,
      goals_conceded: player.goals_conceded,
      own_goals: player.own_goals,
      penalties_saved: player.penalties_saved,
      penalties_missed: player.penalties_missed,
      yellow_cards: player.yellow_cards,
      expected_assists: player.expected_assists,
      expected_assists_per_90: player.expected_assists_per_90,
      expected_goal_involvements: player.expected_goal_involvements,
      expected_goal_involvements_per_90:
        player.expected_goal_involvements_per_90,
      expected_goals: player.expected_goals,
      expected_goals_conceded: player.expected_goals_conceded,
      expected_goals_conceded_per_90: player.expected_goals_conceded_per_90,
      expected_goals_per_90: player.expected_goals_per_90,
      code: player.code,
      ppm: player.total_points / player.now_cost,
      vapm: (player.points_per_game - 2) / (player.now_cost / 10),
      /** Appearance points */
      xppm: 2 + xAddedPointsPerMatch,
      xvapm: xAddedPointsPerMatch / (player.now_cost / 10),
    }
  })

export const getExpectedPoints = (player: Player) => {
  const getGoalMultiplier = () => {
    switch (player.element_type) {
      /** GKP */
      case 1:
        return 10
      /** DEF */
      case 2:
        return 6
      /** MID */
      case 3:
        return 5
      /** FWD */
      case 4:
        return 4
      default:
        return 4
    }
  }
  const getCleansheetMultiplier = () => {
    switch (player.element_type) {
      /** GKP */
      case 1:
        return 4
      /** DEF */
      case 2:
        return 4
      /** MID */
      case 3:
        return 1
      /** FWD */
      case 4:
        return 0
      default:
        return 4
    }
  }
  const assistMultiplier = 3
  return (
    getGoalMultiplier() * player.expected_goals_per_90 +
    assistMultiplier * player.expected_assists_per_90 +
    getCleansheetMultiplier() * Math.exp(-player.expected_goals_conceded_per_90)
  )
}

export const getPlayersByTeam = (players: Player[], teamId: number) =>
  players.filter((player: Player) => player.team === teamId)

export const getPlayersByPosition = (players: Player[], positionId: number) =>
  players.filter((player: Player) => player.element_type === positionId)

export const teamNames = [
  "Arsenal",
  "Aston Villa",
  "Bournemouth",
  "Brentford",
  "Brighton & Hove Albion",
  "Chelsea",
  "Crystal Palace",
  "Everton",
  "Fulham",
  "Ipswich Town",
  "Leicester City",
  "Liverpool",
  "Manchester City",
  "Manchester United",
  "Newcastle United",
  "Nottingham Forest",
  "Southampton",
  "Tottenham Hotspur",
  "West Ham United",
  "Wolverhampton Wanderers",
]

export function getTeamById(id: number): string | null {
  return id >= 1 && id <= teamNames.length ? teamNames[id - 1] : null
}

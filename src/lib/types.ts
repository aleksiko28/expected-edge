export interface Player {
  id: number
  first_name: string
  second_name: string
  web_name: string
  code: string
  team: number
  team_name?: string
  element_type: number
  now_cost: number
  selected_by_percent: number
  total_points: number
  points_per_game: number
  minutes: number
  goals_scored: number
  assists: number
  clean_sheets: number
  goals_conceded: number
  own_goals: number
  penalties_saved: number
  penalties_missed: number
  yellow_cards: number
  expected_assists: number
  expected_assists_per_90: number
  expected_goal_involvements: string
  expected_goal_involvements_per_90: number
  expected_goals: string
  expected_goals_conceded: string
  expected_goals_conceded_per_90: number
  expected_goals_per_90: number
  ppm: number
  xppm: number
  vapm: number
  xvapm: number
}

export interface Team {
  id: number
  name: string
  short_name: string
  strength: number
  code: number
  strength_overall_home: number
  strength_overall_away: number
  strength_attack_home: number
  strength_attack_away: number
  strength_defence_home: number
  strength_defence_away: number
}

export interface Fixture {
  id: number
  code: number
  team_h: number
  team_h_score: number
  team_a: number
  team_a_score: number
  event: number
  finished: boolean
  minutes: number
  provisional_start_time: boolean
  kickoff_time: string
  event_name: string
  is_home: boolean
  difficulty: number
}

export interface FixtureMinimal {
  id: number
  homeTeam: string
  awayTeam: string
  homeTeamShort: string
  awayTeamShort: string
  homeTeamCode: number
  awayTeamCode: number
  gameweek: number
  time: string
}

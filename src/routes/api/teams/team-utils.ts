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

export const getAverageStrengths = (teams: Team[]) => {
  const attackHome = teams.reduce(
    (acc, team) => acc + team.strength_attack_home,
    0,
  )
  const attackAway = teams.reduce(
    (acc, team) => acc + team.strength_attack_away,
    0,
  )
  const defenceHome = teams.reduce(
    (acc, team) => acc + team.strength_defence_home,
    0,
  )
  const defenceAway = teams.reduce(
    (acc, team) => acc + team.strength_defence_away,
    0,
  )
  return {
    attackHome: attackHome / teams.length,
    attackAway: attackAway / teams.length,
    defenceHome: defenceHome / teams.length,
    defenceAway: defenceAway / teams.length,
  }
}

export const formatTeamData = (teams: Team[]) => {
  const averageStrengths = getAverageStrengths(teams)
  return teams.map((team: Team) => {
    return {
      id: team.id,
      name: team.name,
      short_name: team.short_name,
      strength: team.strength,
      code: team.code,
      strength_overall_home: team.strength_overall_home,
      strength_overall_away: team.strength_overall_away,
      strength_attack_home: team.strength_attack_home,
      strength_attack_away: team.strength_attack_away,
      strength_defence_home: team.strength_defence_home,
      strength_defence_away: team.strength_defence_away,
      relative_strength_attack_home:
        team.strength_attack_home / averageStrengths.attackHome,
      relative_strength_attack_away:
        team.strength_attack_away / averageStrengths.attackAway,
      relative_strength_defence_home:
        team.strength_defence_home / averageStrengths.defenceHome,
      relative_strength_defence_away:
        team.strength_defence_away / averageStrengths.defenceAway,
    }
  })
}

export const teamColors = [
  "#034694", // Chelsea
  "#001C58", // Manchester United
  "#5CBFEB", // Manchester City
  "#D00027", // Liverpool
  "#EF0107", // Arsenal
  "#DA020E", // Tottenham Hotspur
  "#274488", // Leicester City
  "#ED1A3B", // Southampton
  "#000000", // Newcastle United
  "#091453", // Everton
  "#60223B", // Aston Villa
  "#0053A0", // Brighton & Hove Albion
  "#E03A3E", // Sheffield United
  "#1B458F", // Crystal Palace
  "#000000", // Burnley
  "#53162F", // West Ham United
  "#FBEE23", // Watford
  "#BA1F1A", // Bournemouth
  "#BBBDBF", // Wolverhampton Wanderers
  "#EF6610", // Norwich City
]

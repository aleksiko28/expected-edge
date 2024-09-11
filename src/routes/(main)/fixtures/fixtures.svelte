<script lang="ts">
  import Badge from "@/components/badge.svelte"
  import Button from "@/components/ui/button/button.svelte"
  import { fixtureData, teamData } from "@/stores"
  import type { Fixture, FixtureMinimal, Team } from "@/types"
  import { ChevronLeft, ChevronRight } from "lucide-svelte"
  import { onMount } from "svelte"

  let parsedFixtureData: FixtureMinimal[] = []
  async function fetchData() {
    const response = await fetch("/api/fixtures")
    const data = await response.json()
    fixtureData.set(data)
    return data
  }

  let dataToParse: Team[] = []

  async function fetchTeams() {
    const response = await fetch("/api/teams")
    const data = await response.json()
    teamData.set(data)
    dataToParse = data
  }

  async function handleData() {
    const data = await fetchData()
    const parsedData = data.map((item: Fixture) => {
      const homeTeam = dataToParse[item.team_h - 1].name
      const awayTeam = dataToParse[item.team_a - 1].name
      const homeTeamCode = dataToParse[item.team_h - 1].code
      const awayTeamCode = dataToParse[item.team_a - 1].code
      /** Map fixture based on gameweek, item.event provides info */
      return {
        homeTeam: homeTeam,
        awayTeam: awayTeam,
        homeTeamCode: homeTeamCode,
        awayTeamCode: awayTeamCode,
        gameweek: item.event,
        time: item.kickoff_time,
      }
    })
    parsedFixtureData = parsedData
  }

  onMount(async () => {
    await fetchTeams()
    handleData()
  })

  let currentData: FixtureMinimal[] = []

  $: {
    currentData = parsedFixtureData.filter(
      (item) => item.gameweek === currentGameWeek,
    )
  }

  let currentGameWeek = 3
</script>

<div class="flex flex-col items-center">
  <div class="flex gap-8 items-center justify-between w-[500px]">
    <Button
      size="sm"
      disabled={currentGameWeek === 1}
      on:click={() => (currentGameWeek -= 1)}
    >
      <ChevronLeft class="mr-1" size="16" />
      Previous
    </Button>
    <span>
      <h2 class="text-3xl">Fixtures</h2>
      <h3 class="text-xl">Gameweek {currentGameWeek}</h3>
    </span>
    <Button
      size="sm"
      disabled={currentGameWeek === 38}
      on:click={() => (currentGameWeek += 1)}
    >
      Next
      <ChevronRight class="ml-1" size="16" />
    </Button>
  </div>
  <ul class="flex flex-col gap-3 mt-8">
    {#each currentData as item}
      <li class="grid grid-cols-7 justify-between">
        <span class="flex gap-6 items-center col-span-3 justify-end">
          <h4 class="text-xl">
            {item.homeTeam}
          </h4>
          <Badge size="small" code={item.homeTeamCode}></Badge>
        </span>
        <span class="text-sm place-self-center">VS</span>
        <span class="flex gap-6 items-center col-span-3 justify-start">
          <Badge size="small" code={item.awayTeamCode}></Badge>
          <h4 class="text-xl">
            {item.awayTeam}
          </h4>
        </span>
      </li>
    {/each}
  </ul>
</div>

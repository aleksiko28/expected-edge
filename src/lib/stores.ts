import { writable } from 'svelte/store';
import type { Fixture, Player, Team } from './types';

export const playerData = writable<Player[]>([]);

export const teamData = writable<Team[]>([]);

export const fixtureData = writable<Fixture[]>([]);

export function firstName(): string {
  return pick(["Ana", "Bruno", "Carla", "Diego", "Elena", "Fabio"]);
}

export function lastName(): string {
  return pick(["Silva", "Souza", "Oliveira", "Santos", "Pereira", "Costa"]);
}

export function email(name: string): string {
  return `${name.toLowerCase()}${suffix()}${randomInt(10, 99)}@mail.com`;
}

export function phone(): string {
  return String(randomInt(1_000_000_000, 9_999_999_999));
}

export function address(): string {
  return `Rua ${lastName()}, ${randomInt(10, 999)}`;
}

export function age(): number {
  return randomInt(20, 54);
}

export function salary(): number {
  return randomInt(3000, 14999);
}

export function department(): string {
  return pick(["QA", "Dev", "RH", "Financeiro", "Suporte"]);
}

const STATES = ["NCR", "Uttar Pradesh", "Haryana", "Rajasthan"];
const CITIES = [
  ["Delhi", "Gurgaon", "Noida"],
  ["Agra", "Lucknow", "Merrut"],
  ["Karnal", "Panipat"],
  ["Jaipur", "Jaiselmer"],
];

export function stateIndex(): number {
  return randomInt(0, STATES.length - 1);
}

export function state(index: number): string {
  return STATES[index];
}

export function city(index: number): string {
  const options = CITIES[index];
  return options[randomInt(0, options.length - 1)];
}

export function uniqueUserName(): string {
  return `qa.cypress.${randomToken(12)}`;
}

export function strongPassword(): string {
  return `Aa@${randomToken(8)}1`;
}

export function suffix(): string {
  return String(randomInt(1000, 9999));
}

function pick(values: string[]): string {
  return values[randomInt(0, values.length - 1)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomToken(size: number): string {
  return Math.random().toString(36).replace(/[^a-z0-9]/g, "").slice(0, size).padEnd(size, "x");
}

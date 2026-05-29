//  Milestone 1
// Crea un type alias Person per rappresentare una persona generica.
type Person = {
  // id: numero identificativo, non modificabile
  readonly id: number;
  // name: nome completo, stringa non modificabile
  readonly name: string;
  // birth_year: anno di nascita, numero
  birth_year: number;
  // death_year: anno di morte, numero opzionale
  death_year?: number;
  // biography: breve biografia, stringa
  biography: string;
  // image: URL dell'immagine, stringa
  image: string;
};
//
//
// 📌 Milestone 2
type Nationality =
  | "American"
  | "British"
  | "Australian"
  | "Israeli-American"
  | "South African"
  | "French"
  | "Indian"
  | "Israeli"
  | "Spanish"
  | "South Korean"
  | "Chinese";
// Crea un type alias Actress che oltre a tutte le proprietà di Person, aggiunge le seguenti proprietà:
type Actress = Person & {
  // most_famous_movies: una tuple di 3 stringhe
  most_famous_movies: [string, string, string];
  // awards: una stringa
  awards: string;
  // nationality: una stringa tra un insieme definito di valori.
  nationality: Nationality;
};
//
//
//  Milestone 3
function isActress(dati: unknown): dati is Actress {
  if (
    dati &&
    typeof dati === "object" &&
    "id" in dati &&
    typeof dati.id === "number" &&
    "name" in dati &&
    typeof dati.name === "string" &&
    "birth_year" in dati &&
    typeof dati.birth_year === "number" &&
    (!("death_year" in dati) || typeof dati.death_year === "number") &&
    "biography" in dati &&
    typeof dati.biography === "string" &&
    "image" in dati &&
    typeof dati.image === "string" &&
    "most_famous_movies" in dati &&
    dati.most_famous_movies instanceof Array &&
    dati.most_famous_movies.length === 3 &&
    "awards" in dati &&
    typeof dati.awards === "string" &&
    "nationality" in dati &&
    typeof dati.nationality === "string"
  ) {
    return true;
  } else {
    return false;
  }
}
// Crea una funzione getActress che, dato un id, effettua una chiamata a:
// GET /actresses/:id
// La funzione deve restituire l’oggetto Actress, se esiste, oppure null se non trovato.

// Utilizza un type guard chiamato isActress per assicurarti che la struttura del dato ricevuto sia corretta.

async function getActress(id: number): Promise<Actress | null> {
  try {
    const response = await fetch(`http://localhost:3333/actresses/${id}`);
    const result: unknown = await response.json();
    console.log(result);

    if (isActress(result)) {
      return result as Actress;
    }
    throw new Error("Tipo non valido");
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    }
    return null;
  }
}
getActress(2);

// Milestone 4
// Crea una funzione getAllActresses che chiama:

// GET /actresses
// La funzione deve restituire un array di oggetti Actress.

// Può essere anche un array vuoto.
async function getAllActresses(): Promise<Actress[]> {
  try {
    const response = await fetch(`http://localhost:3333/actresses`);
    const result: unknown = await response.json();
    if (!(result instanceof Array)) {
      throw new Error("not an array");
    }
    const dati = result.filter((e) => e);
    console.log(dati);
    return dati;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("");
    }
    return [];
  }
}
getAllActresses();

// Milestone 5
// Crea una funzione getActresses che riceve un array di numeri (gli id delle attrici).
// Per ogni id nell’array, usa la funzione getActress che hai creato nella Milestone 3 per
// recuperare l’attrice corrispondente.

// L'obiettivo è ottenere una lista di risultati in parallelo, quindi dovrai usare Promise.all.

// La funzione deve restituire un array contenente elementi di tipo Actress oppure null
// (se l’attrice non è stata trovata).
async function getActresses(
  numberArray: number[],
): Promise<(Actress | null)[]> {
  try {
    const ids = numberArray.map((el) => getActress(el));
    const promises = await Promise.all(ids);
    return promises;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    }
    return [];
  }
}
getActresses([2, 3, 4, 5]);

// 🎯 BONUS 1
// Crea le funzioni:
// Utilizza gli Utility Types:

// createActress
// Omit: per creare un'attrice senza passare id, che verrà generato casualmente.
function CreateActress(dati: Omit<Actress, "id">): Actress {
  return {
    id: Math.random() * (100 - 1) + 1,
    ...dati,
  };
}
// updateActress
// Partial: per permettere l’aggiornamento di qualsiasi proprietà tranne id e name.
function updateActress(actress: Actress, fieldsToUptade: Partial<Actress>) {
  return { ...actress, ...fieldsToUptade, name: actress.name, id: actress.id };
}

//
//
// BONUS 2
type ActorNationality =
  | "New Zealand"
  | "Hong Kong"
  | "German"
  | "Canadian"
  | "Irish"
  | "Scottish";
// Crea un tipo Actor, che estende Person con le seguenti differenze rispetto ad Actress:
// known_for: una tuple di 3 stringhe
// awards: array di una o due stringhe
// nationality: le stesse di Actress più:
// Scottish, New Zealand, Hong Kong, German, Canadian, Irish.
// Implementa anche le versioni getActor, getAllActors, getActors, createActor, updateActor.
type Actor = Person & {
  known_for: [string, string, string];
  awards: [string] | [string, string];
  nationality: Nationality & ActorNationality;
};
function isActor(dati: unknown): dati is Actor {
  if (
    dati &&
    typeof dati === "object" &&
    "id" in dati &&
    typeof dati.id === "number" &&
    "name" in dati &&
    typeof dati.name === "string" &&
    "birth_year" in dati &&
    typeof dati.birth_year === "number" &&
    (!("death_year" in dati) || typeof dati.death_year === "number") &&
    "biography" in dati &&
    typeof dati.biography === "string" &&
    "image" in dati &&
    typeof dati.image === "string" &&
    "known_for" in dati &&
    dati.known_for instanceof Array &&
    dati.known_for.length === 3 &&
    dati.known_for.every((e) => typeof e === "string") &&
    "awards" in dati &&
    dati.awards instanceof Array &&
    (dati.awards.length === 1 || dati.awards.length === 2) &&
    dati.known_for.every((e) => typeof e === "string") &&
    "nationality" in dati &&
    typeof dati.nationality === "string"
  ) {
    return true;
  } else {
    return false;
  }
}

async function getActor(id: number): Promise<Actor | null> {
  try {
    const response = await fetch(`http://localhost:3333/actors/${id}`);
    const result: unknown = await response.json();
    console.log(result);

    if (isActor(result)) {
      return result as Actor;
    }
    throw new Error("Tipo non valido");
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    }
    return null;
  }
}
getActor(2);
//
//
//

async function getAllActor(): Promise<Actor[]> {
  try {
    const response = await fetch(`http://localhost:3333/actors`);
    const result: unknown = await response.json();
    if (!(result instanceof Array)) {
      throw new Error("not an array");
    }
    const dati = result.filter((e) => e);
    console.log(dati);
    return dati;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("");
    }
    return [];
  }
}
getAllActor();
//
//
//

async function getActors(numberArray: number[]): Promise<(Actor | null)[]> {
  try {
    const ids = numberArray.map((el) => getActor(el));
    const promises = await Promise.all(ids);
    return promises;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    }
    return [];
  }
}
getActors([2, 3, 4, 5]);

// BONUS 3
// Crea la funzione createRandomCouple che usa getAllActresses e
//  getAllActors per restituire un’array che ha sempre due elementi:
//  al primo posto una Actress casuale e al secondo posto un Actor casuale.
async function createRandomCouple(): Promise<[Actress, Actor] | null> {
  try {
    const result = await getAllActor();
    const resultActress = await getAllActresses();

    return [
      resultActress[Math.floor(Math.random() * resultActress.length)],
      result[Math.floor(Math.random() * result.length)],
    ];
  } catch (error) {
    console.error(error);
  }
  return null;
}
const randomResult = await createRandomCouple();
console.log(randomResult);

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
    "death_year" in dati &&
    typeof dati.death_year === "number" &&
    "biography" in dati &&
    typeof dati.biography === "string" &&
    "image" in dati &&
    typeof dati.image === "string" &&
    "most_famous_movies" in dati &&
    typeof dati.most_famous_movies === "object" &&
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
      throw new Error("not a valid URL");
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

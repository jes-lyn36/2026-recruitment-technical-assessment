import express, { Request, Response } from "express";

// ==== Type Definitions, feel free to add or modify ==========================
interface cookbookEntry {
  name: string;
  type: string;
  requiredItems?: requiredItem[];
  cookTime?: number;
}

interface requiredItem {
  name: string;
  quantity: number;
}

interface recipe extends cookbookEntry {
  requiredItems: requiredItem[];
}

interface ingredient extends cookbookEntry {
  cookTime: number;
}

interface recipeSummary {
  name: string;
  cookTime: number;
  ingredients: requiredItem[];
}

interface summaryCookTime {
  cookTime: number;
}

// =============================================================================
// ==== HTTP Endpoint Stubs ====================================================
// =============================================================================
const app = express();
app.use(express.json());

// Store your recipes here!
const cookbook: any = null;

// Task 1 helper (don't touch)
app.post("/parse", (req:Request, res:Response) => {
  const { input } = req.body;

  const parsed_string = parse_handwriting(input)
  if (parsed_string == null) {
    res.status(400).send("this string is cooked");
    return;
  } 
  res.json({ msg: parsed_string });
  return;
  
});

// [TASK 1] ====================================================================
/**
 * Takes in a recipeName and returns it in a legible form. 
 * @param {string} recipeName - user input of the recipe name.
 * @returns {string} - the parsed recipe name.
 * @returns {null} - parsed recipe name is an emptry string.
 */
const parse_handwriting = (recipeName: string): string | null => {
  // Make all characters either letters or whitespace, loops recipeName once.
  recipeName = recipeName.replace(/([-_]|[^a-z ])/ig, character => {
    return (character === "-" || character === "_") ? " " : "";
  });

  // Make every first word uppercase and the rest lowercase.
  recipeName = recipeName
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Remove any duplicate whitespaces.
  recipeName = recipeName.trim().replace(/\s+/g, " ");

  return recipeName || null;
}

// [TASK 2] ====================================================================
// Endpoint that adds a CookbookEntry to your magical cookbook
app.post("/entry", (req:Request, res:Response) => {
  // TODO: implement me
  res.status(500).send("not yet implemented!")

});

// [TASK 3] ====================================================================
// Endpoint that returns a summary of a recipe that corresponds to a query name
app.get("/summary", (req:Request, res:Request) => {
  // TODO: implement me
  res.status(500).send("not yet implemented!")

});

// =============================================================================
// ==== DO NOT TOUCH ===========================================================
// =============================================================================
const port = 8080;
app.listen(port, () => {
  console.log(`Running on: http://127.0.0.1:8080`);
});

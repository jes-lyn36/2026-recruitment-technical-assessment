import express, { Request, Response } from "express";
import HTTPError from 'http-errors';

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
// Initialized cookbook as an array to store recipes and ingredients.
const cookbook: cookbookEntry[] = [];

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
// Endpoint that adds a CookbookEntry to your magical cookbook.
app.post("/entry", (req:Request, res:Response) => {
  new_entry(req.body);
  res.json({});
  return;

});

/**
 * Takes the cookbook entry and adds it to the cookbook if it's valid.
 * Throw an error with a corresponding message if entry is invalid.
 * @param {cookbookEntry} entry - user entry of the cookbook. 
 */
const new_entry = (entry: cookbookEntry) => {
  // Checks if the name is unique.
  if (cookbook.some(existingEntry => existingEntry.name == entry.name)) {
    throw HTTPError(400, "Invalid entry: existing entry");
  }
  
  // Checks validity for type "recipe" and "ingredient".
  if (entry.type == "recipe"){
    // Check if required items more than one element per name.
    let requiredItemNames = entry.requiredItems.map(
      requiredItem => requiredItem.name
    );
    let duplicateNames = requiredItemNames.filter(
      (item, index) => requiredItemNames.indexOf(item) !== index
    );

    if (duplicateNames.length > 0) {
      throw HTTPError(400, "Invalid entry: require duplicate items");
    }

  } else if (entry.type == "ingredient") {
    if (entry.cookTime < 0){
      throw HTTPError(400, "Invalid entry: cooktime is less than 0");
    }
  } else {
    throw HTTPError(400, "Invalid type: type is not ingredient or recipe");
  }

  cookbook.push(entry);
}

// [TASK 3] ====================================================================
// Endpoint that returns a summary of a recipe that corresponds to a query name.
app.get("/summary", (req:Request, res:Request) => {
  const recipeName = req.query.name as string;

  res.json(recipe_summary(recipeName));
  return;

});

/**
 * Finds the recipe summary and returns it.
 * Throw an error if the input recipe is invalid.
 * @param {string} name - user input of the recipe's name.
 * @returns {recipeSummary} - summary of the recipe.
 */
const recipe_summary = (name: string): recipeSummary => {
  let baseIngredients = [];
  let summaryCookTime = {
    cookTime: 0
  };

  let entry = cookbook.find(existingEntry => existingEntry.name == name);
  if (!entry || entry.type == "ingredient"){
    throw HTTPError(400, "Invalid recipe: not in cookbook");
  }

  find_ingredients(entry, baseIngredients, summaryCookTime, 1)
  
  let summary = {
    name: entry.name,
    cookTime: summaryCookTime.cookTime,
    ingredients: baseIngredients
  };

  return summary;
}

/**
 * Recursively finds all base ingredients of a recipe.
 * Returns if all ingredients are in the cookbook.
 * Throw an error if the items needed by the recipe is invalid.
 * @param {cookbookEntry} entry - items needed by the main recipe.
 * @param {requiredItem[]} baseIngredients - main recipe's base ingredients.
 * @param {summaryCookTime} summaryCookTime - recipe's total cooking time.
 * @param {number} quantity - number of current items needed. 
 * @returns 
 */
const find_ingredients = (
  entry: cookbookEntry,
  baseIngredients: requiredItem[], 
  summaryCookTime: summaryCookTime,
  quantity: number) => {

  // If it's an recipe, go through it to find its base ingredients.
  if (entry.type == "recipe") {
    for (let item of entry.requiredItems) {
      let cookbookEntry = cookbook.find(
        existingEntry => existingEntry.name == item.name
      );
      if (!cookbookEntry){
        throw HTTPError(400, "Invalid required items: not in cookbook");
      }

      find_ingredients(
        cookbookEntry, 
        baseIngredients, 
        summaryCookTime, 
        item.quantity * quantity
      );
    }

  //If it's an ingredient, save it as a base ingredient and add the cookTime.
  } else if (entry.type == "ingredient") {
    let baseIngredient = baseIngredients.find(
      existingIngredient => existingIngredient.name == entry.name
    );
    if (baseIngredient) {
      baseIngredient.quantity += quantity;
    } else {
      baseIngredients.push({
        name: entry.name,
        quantity: quantity
      });
    }

    summaryCookTime.cookTime += entry.cookTime * quantity
  }

  return;
}

// =============================================================================
// ==== DO NOT TOUCH ===========================================================
// =============================================================================
const port = 8080;
app.listen(port, () => {
  console.log(`Running on: http://127.0.0.1:8080`);
});
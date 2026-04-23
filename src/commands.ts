import type { CLICommand } from "./state.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    help: {
        name: "help",
        description: "Displays a help message",
        callback: commandHelp,
    },
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },

    map: {
      name: "map",
      description: "Shows the first 20 locations in a response, and the next 20 on eachsubsequent call",
      callback: commandMap,
    },

    mapb: {
      name: "mapb",
      description: "Shows the previous page of 20 locations or informs you that you are on the first page of results",
      callback: commandMapb,
    },

    explore: {
      name: "explore",
      description: "Shows which pokemon can be encountered in a user-provided location",
      callback: commandExplore,
    },

    catch: {
      name: "catch",
      description: "Try to catch a user-provided pokemon",
      callback: commandCatch,
    },

    // can add more commands here
  };
}
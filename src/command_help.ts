import type { CLICommand, State } from "./state.js"

export function commandHelp(state: State) {
    console.log("Welcome to the Pokedex!");
    console.log("Usage:");
    console.log("\n");
    const commands = state.commands;
    for (const command of Object.values(commands)) {
        console.log(`${command.name}: ${command.description}`);
    }
    
};
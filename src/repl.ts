import { createInterface } from "readline";
import { getCommands } from "./commands.js";
export function cleanInput(input: string): string[] {
  const trimmedInput = input.trim();
  const words = trimmedInput.split(/\s+/);
  const cleanedInput = words.map((word) => word.toLowerCase()).filter((word)=>(word !== ""));

  return cleanedInput;
  

}

export function startREPL(): void {
    const r1 = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
        });

    
    r1.prompt();

    r1.on("line", (line) => {
        
        const cleanedLine = cleanInput(line);
        if (cleanedLine.length === 0) {
            r1.prompt();
            return;
        } else {
            const commandEntered = cleanedLine[0];
            const commands = getCommands();
            const command = commands[commandEntered];
            if (!command) {
                console.log("Unknown command");
            } else {
                try {
                    command.callback(commands);
                } catch (err){
                    console.log(err);
                }
                
            }
            r1.prompt();
        }
    });
}
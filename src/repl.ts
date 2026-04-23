import { State } from "./state.js";



export function cleanInput(input: string): string[] {
  const trimmedInput = input.trim();
  const words = trimmedInput.split(/\s+/);
  const cleanedInput = words.map((word) => word.toLowerCase()).filter((word)=>(word !== ""));

  return cleanedInput;
  

}

export function startREPL(state: State): void {

    const rl = state.readline;
    const commands = state.commands;
    
    rl.prompt();

    rl.on("line", async (line) => {
        
        const cleanedLine = cleanInput(line);
        if (cleanedLine.length === 0) {
            rl.prompt();
            return;
        } else {
            const commandEntered = cleanedLine[0];
            const otherArgs = cleanedLine.slice(1);
            const command = commands[commandEntered];
            if (!command) {
                console.log("Unknown command");
            } else {
                try {
                    await command.callback(state, ...otherArgs);
                } catch (err){
                    console.log(err);
                }
                
            }
            rl.prompt();
        }
    });
}
const fs = require('fs');

// Função para ler um arquivo JSON
function readJSONFile(filename) {
  const data = fs.readFileSync(filename);
  return JSON.parse(data);
}

// Função para ler um arquivo CSV e retornar um array de objetos
function readCSVFile(filename) {
  const data = fs.readFileSync(filename, 'utf-8').toString();
  const lines = data.trim().split('\n');
  const entries = [];

  for (const line of lines) {
    const [input, expected] = line.split(';');
    const e = expected[0];
    entries.push({ input, e });
  }

  return entries;
}

// Função para executar o autômato em uma entrada
function runAutomaton(automaton, input) {
  const statesStack = [automaton.initial];

  for (const char of input) {
    const nextStates = [];
    for (const state of statesStack) {
      //Oque torna ele vazio
      const transitions = automaton.transitions.filter(t => t.from === state && (t.read === char || t.read === ''));
      nextStates.push(...transitions.map(t => t.to));
      //
    }
    statesStack.length = 0; // Clear the stack
    statesStack.push(...nextStates);
  }

  return statesStack.some(state => automaton.final.includes(Number(state)));
}

// Função principal
function main() {
  if (process.argv.length !== 5) {
    console.log('Uso: node simulador2.js arquivo_do_automato.aut arquivo_de_testes.in arquivo_de_saida.out');
    return;
  }

  const automaton = readJSONFile(process.argv[2]);
  const testEntries = readCSVFile(process.argv[3]);

  const results = [];

  for (const entry of testEntries) {
    const startTime = process.hrtime();
    const result = runAutomaton(automaton, entry.input);
    const endTime = process.hrtime(startTime);
    const elapsedTime = endTime[0] * 1000 + endTime[1] / 1000000;

    results.push({
      input: entry.input,
      expected: entry.e,
      result: result ? '1' : '0',
      time: elapsedTime.toFixed(3),
    });
  }

  // Escrever resultados no arquivo de saída
  const outputContent = results.map(r => `${r.input};${r.expected};${r.result};${r.time}`).join('\n');
  fs.writeFileSync(process.argv[4], outputContent);
}

main();

const test = require('node:test');
const assert = require('node:assert/strict');
const { playRaceEngine } = require('../src/index.js');

test('playRaceEngine deve aceitar quatro corredores e retornar a lista completa', async () => {
  const racers = [
    { nome: 'Mario', velocidade: 4, manobrabilidade: 3, poder: 3, pontos: 0 },
    { nome: 'Luigi', velocidade: 3, manobrabilidade: 4, poder: 4, pontos: 0 },
    { nome: 'Peach', velocidade: 2, manobrabilidade: 3, poder: 2, pontos: 0 },
    { nome: 'Bowser', velocidade: 4, manobrabilidade: 2, poder: 4, pontos: 0 },
  ];

  const result = await playRaceEngine(racers, 1);

  assert.equal(result.length, 4);
  assert.deepEqual(result.map((runner) => runner.nome), ['Mario', 'Luigi', 'Peach', 'Bowser']);
});

test('banana aplica penalidade de -1 ponto ao vencedor da rodada', async () => {
  const racers = [
    { nome: 'Mario', velocidade: 4, manobrabilidade: 3, poder: 3, pontos: 0 },
    { nome: 'Luigi', velocidade: 3, manobrabilidade: 4, poder: 4, pontos: 0 },
  ];

  const diceValues = [6, 1];
  let diceIndex = 0;
  const diceRoller = async () => diceValues[diceIndex++] ?? 1;

  await playRaceEngine(racers, 1, async () => 'banana', diceRoller);

  assert.equal(racers[0].pontos, 0);
});

test('confronto concede bônus de +1 ponto ao vencedor', async () => {
  const racers = [
    { nome: 'Mario', velocidade: 4, manobrabilidade: 3, poder: 3, pontos: 0 },
    { nome: 'Luigi', velocidade: 3, manobrabilidade: 4, poder: 4, pontos: 0 },
  ];

  const diceValues = [6, 1];
  let diceIndex = 0;
  const diceRoller = async () => diceValues[diceIndex++] ?? 1;

  await playRaceEngine(racers, 1, async () => 'CONFRONTO', diceRoller);

  assert.equal(racers[0].pontos, 1);
});

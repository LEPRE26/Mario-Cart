const player1 = {
    nome: "Mario",
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0,
};
const player2 = {
    nome: "Luigi",
    velocidade: 3,
    manobrabilidade: 4,
    poder: 4,
    pontos: 0,
};

async function rollDice() {
   return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
 let random = Math.random();
 let result

 switch (true) {
    case random < 0.33:
        result = "reta";
        break;
        //case "random" < 0.44:
        //result = "banana";
        //break;
    case "random" < 0.66:
        result = "curva";
        break;
    default:
        result = "CONFRONTO";
}
return result
}

async function logRollResult(characterName, block, diceResult, attribute) {

 console.log(`${characterName}🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`); 
    
}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        
        console.log(
             `🏁 Rodada ${round}🏁
-----------------------------`
            );

        // sorter bloco
        let block = await getRandomBlock(); console.log(`Bloco: ${block}`);

        // rolar os dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        // teste de habilidade (reinicia a cada rodada)
        let totalTesteSkill1 = 0;
        let totalTesteSkill2 = 0;

        if (block === "reta") {
            totalTesteSkill1 = diceResult1 + character1.velocidade;
            totalTesteSkill2 = diceResult2 + character2.velocidade;

            await logRollResult(
                character1.nome,"velocidade 🚀", diceResult1,character1.velocidade);

            await logRollResult(
                character2.nome,"velocidade 🚀", diceResult2, character2.velocidade
            );
        }

        if (block === "curva") {
            totalTesteSkill1 = diceResult1 + character1.manobrabilidade;
            totalTesteSkill2 = diceResult2 + character2.manobrabilidade;

            await logRollResult(
                character1.nome, "manobrabilidade ⏱️", diceResult1, character1.manobrabilidade
            );

            await logRollResult(
                character2.nome,"manobrabilidade ⏱️", diceResult2, character2.manobrabilidade
            );
        }

        if (block === "CONFRONTO") {
            let powerResult1 = diceResult1 + character1.poder;
            let powerResult2 = diceResult2 + character2.poder;
            console.log(`${character1.nome} poder: ${powerResult1} | ${character2.nome} poder: ${powerResult2}`);

            console.log(`${character1.nome} CONFRONTO com ${character2.nome}...!🥊`);

            await logRollResult(
                character1.nome,"poder ⚡", diceResult1, character1.poder
            );

            await logRollResult(
                character2.nome, "poder ⚡", diceResult2, character2.poder
            );
  
                        if (powerResult1 > powerResult2) {
                console.log(`${character1.nome} venceu o confronto! ${character2.nome} perde 1 ponto!🐢`);
                character2.pontos--;
            }
            
            if (powerResult2 > powerResult1) {
                console.log(`${character2.nome} venceu o confronto! ${character1.nome} perde 1 ponto!🐢`);
                character1.pontos--;
            }

        }

        // exemplo simples de pontuação por rodada
        if (totalTesteSkill1 > totalTesteSkill2) {character1.pontos += 1;
            console.log(`${character1.nome} vence a rodada 🏅`

            );
        } else if (totalTesteSkill2 > totalTesteSkill1) {character2.pontos += 1;
            console.log(`${character2.nome} vence a rodada 🏅`);
        } else {
            console.log("Empate na rodada ");
        }
        console.log("-----------------------------");
    }
}

async function declareWinner(character1, character2) {
    console.log("🏁 Corrida finalizada!: 🏁")
    console.log(`${character1.nome}:${character1.pontos} pontos(s)`);
    console.log(`${character2.nome}:${character2.pontos} pontos(s)`);

    if(character1.pontos > character2.pontos)
        console.log(`🏆 ${character1.nome} venceu a corrida! 🏆`);
    else if(character2.pontos > character1.pontos)
        console.log(`🏆 ${character2.nome} venceu a corrida! 🏆`);
    else
        console.log(`🤝 A corrida terminou empatada! 🤝`);
    
}

(async function main() {
    console.log(
        `🏁 , Corrida entre ${player1.nome} e ${player2.nome} começando... 🚦\n `
    );

 await playRaceEngine(player1, player2);
 await declareWinner(player1, player2);
})();

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
const player3 = {
    nome: "Peach",
    velocidade: 2,
    manobrabilidade: 3,
    poder: 2,
    pontos: 0,
};
const player4 = {
    nome: "Bowser",
    velocidade: 4,
    manobrabilidade: 2,
    poder: 4,
    pontos: 0,
};

const players = [player1, player2, player3, player4];

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.25:
            result = "reta";
            break;
        case random < 0.5:
            result = "curva";
            break;
        case random < 0.75:
            result = "banana";
            break;
        case random < 0.9:
            result = "bomba";
            break;
        default:
            result = "CONFRONTO";
    }

    return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName}🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function playRaceEngine(participants = players, rounds = 5, blockResolver = getRandomBlock, diceRoller = rollDice) {
    const racers = Array.isArray(participants) ? participants : [participants];

    for (let round = 1; round <= rounds; round++) {
        console.log(`🏁 Rodada ${round}🏁\n-----------------------------`);

        const block = await blockResolver();
        console.log(`Bloco: ${block}`);

        const roundResults = [];

        for (const racer of racers) {
            const diceResult = await diceRoller();
            let totalTesteSkill = 0;

            if (block === "reta") {
                totalTesteSkill = diceResult + racer.velocidade;
                await logRollResult(racer.nome, "velocidade 🚀", diceResult, racer.velocidade);
            }

            if (block === "curva") {
                totalTesteSkill = diceResult + racer.manobrabilidade;
                await logRollResult(racer.nome, "manobrabilidade ⏱️", diceResult, racer.manobrabilidade);
            }

            if (block === "banana") {
                totalTesteSkill = diceResult + racer.manobrabilidade;
                await logRollResult(racer.nome, "banana 🍌", diceResult, racer.manobrabilidade);
            }

            if (block === "bomba") {
                totalTesteSkill = diceResult + racer.poder;
                await logRollResult(racer.nome, "bomba 💣", diceResult, racer.poder);
            }

            if (block === "CONFRONTO") {
                totalTesteSkill = diceResult + racer.poder;
                await logRollResult(racer.nome, "poder ⚡", diceResult, racer.poder);
            }

            roundResults.push({ racer, totalTesteSkill });
        }

        const bestResult = roundResults.reduce((best, current) => current.totalTesteSkill > best.totalTesteSkill ? current : best);
        const winners = roundResults.filter((result) => result.totalTesteSkill === bestResult.totalTesteSkill);
        let winner = bestResult.racer;

        if (block === "CONFRONTO") {
            if (winners.length === 1) {
                winner = winners[0].racer;
                winner.pontos += 1;
                console.log(`${winner.nome} vence o confronto! 🥊`);
                console.log(`${winner.nome} ganhou +1 ponto por vencer o confronto! ⭐`);
            } else {
                console.log("Empate no confronto!");
            }
        } else {
            winner.pontos += 1;
            console.log(`${winner.nome} vence a rodada 🏅`);
        }

        if (block === "banana") {
            winner.pontos -= 1;
            console.log(`${winner.nome} passou por uma banana e perdeu 1 ponto! 🍌`);
        }

        if (block === "bomba") {
            winner.pontos -= 2;
            console.log(`${winner.nome} atingiu uma bomba e perdeu 2 pontos! 💣`);
        }

        console.log("-----------------------------");
    }

    return racers;
}

async function declareWinner(participants = players) {
    const racers = Array.isArray(participants) ? participants : [participants];

    console.log("🏁 Corrida finalizada!: 🏁");
    racers.forEach((racer) => {
        console.log(`${racer.nome}: ${racer.pontos} ponto(s)`);
    });

    const sortedRacers = [...racers].sort((a, b) => b.pontos - a.pontos);
    const topScore = sortedRacers[0].pontos;
    const winners = sortedRacers.filter((racer) => racer.pontos === topScore);

    if (winners.length > 1) {
        console.log(`🤝 A corrida terminou empatada entre ${winners.map((racer) => racer.nome).join(", ")}! 🤝`);
    } else {
        console.log(`🏆 ${winners[0].nome} venceu a corrida! 🏆`);
    }
}

if (require.main === module) {
    (async function main() {
        console.log(`🏁 Corrida entre ${players.map((player) => player.nome).join(" e ")} começando... 🚦\n `);

        await playRaceEngine(players, 5);
        await declareWinner(players);
    })();
}

module.exports = {
    playRaceEngine,
    declareWinner,
    rollDice,
    getRandomBlock,
    logRollResult,
};

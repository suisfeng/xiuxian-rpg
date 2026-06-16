// ========== 抽卡系统 ==========
const GACHA_POOL = [
    { type: 'gold', name: '金币', icon: '💰', rarity: 'normal', weight: 40, getValue: () => Math.floor(50 + Math.random() * 200) },
    { type: 'gold', name: '大量金币', icon: '💰', rarity: 'rare', weight: 15, getValue: () => Math.floor(500 + Math.random() * 500) },
    { type: 'petFragment', name: '精灵碎片', icon: '🐾', rarity: 'normal', weight: 15, getValue: () => Math.floor(30 + Math.random() * 50) },
    { type: 'atkBuff', name: '攻击强化', icon: '⚔️', rarity: 'rare', weight: 8, getValue: () => Math.floor(20 + Math.random() * 30) },
    { type: 'defBuff', name: '防御强化', icon: '🛡️', rarity: 'rare', weight: 8, getValue: () => Math.floor(50 + Math.random() * 100) },
    { type: 'hpBuff', name: '生命强化', icon: '❤️', rarity: 'rare', weight: 5, getValue: () => Math.floor(100 + Math.random() * 200) },
    { type: 'coreCard', name: '核心卡', icon: '🃏', rarity: 'epic', weight: 5, getValue: () => 1 },
    { type: 'diamond', name: '钻石', icon: '💎', rarity: 'epic', weight: 3, getValue: () => Math.floor(5 + Math.random() * 15) },
    { type: 'legendaryBuff', name: '传说强化', icon: '🌟', rarity: 'legendary', weight: 1, getValue: () => Math.floor(500 + Math.random() * 500) },
];

function openGacha() {
    $('#gacha-gold').textContent = formatNum(game.player.gold);
    $('#gacha-pity').textContent = game.gacha.pity;
    $('#gacha-results').innerHTML = '';
    $('#gacha-modal').classList.add('active');
}

function doGacha(count) {
    const cost = count === 1 ? 100 : 900;
    if (game.player.gold < cost) { toast('金币不足！', 'warning'); return; }
    game.player.gold -= cost;

    const results = [];
    for (let i = 0; i < count; i++) {
        game.gacha.pity++;
        let item;
        // Pity: 30抽必出史诗+
        if (game.gacha.pity >= 30) {
            const epicPlus = GACHA_POOL.filter(g => g.rarity === 'epic' || g.rarity === 'legendary');
            item = epicPlus[Math.floor(Math.random() * epicPlus.length)];
            game.gacha.pity = 0;
        } else {
            item = weightedRandom(GACHA_POOL);
            if (item.rarity === 'epic' || item.rarity === 'legendary') game.gacha.pity = 0;
        }
        const value = item.getValue();
        results.push({ ...item, value });
        applyGachaResult(item, value);
    }

    showGachaResults(results);
    $('#gacha-gold').textContent = formatNum(game.player.gold);
    $('#gacha-pity').textContent = game.gacha.pity;
    updatePlayerUI();
}

function weightedRandom(pool) {
    const total = pool.reduce((s, i) => s + i.weight, 0);
    let r = Math.random() * total;
    for (const item of pool) { r -= item.weight; if (r <= 0) return item; }
    return pool[0];
}

function applyGachaResult(item, value) {
    switch (item.type) {
        case 'gold': game.player.gold += value; break;
        case 'petFragment': game.petPoints += value; break;
        case 'atkBuff': game.player.attack += value; break;
        case 'defBuff': game.player.defense += value; break;
        case 'hpBuff': game.player.maxHp += value; game.player.hp = Math.min(game.player.hp + value, game.player.maxHp); break;
        case 'coreCard': awardCoreCard(); break;
        case 'diamond': game.player.diamonds += value; break;
        case 'legendaryBuff': game.player.attack += value; game.player.defense += value; break;
    }
}

function showGachaResults(results) {
    const container = $('#gacha-results');
    container.innerHTML = '';
    results.forEach((r, i) => {
        setTimeout(() => {
            const el = document.createElement('div');
            el.className = `gacha-result rarity-${r.rarity}`;
            let text = `${r.icon} ${r.name}`;
            if (r.type === 'gold' || r.type === 'petFragment' || r.type === 'diamond') text += ` +${r.value}`;
            else if (r.type.endsWith('Buff')) text += ` +${r.value}`;
            el.textContent = text;
            container.appendChild(el);
            if (r.rarity === 'legendary') toast(`🌟 传说级！${r.name}！`, 'legendary');
            else if (r.rarity === 'epic') toast(`💜 史诗级！${r.name}`, 'success');
        }, i * 150);
    });
}

// Event binding
document.addEventListener('DOMContentLoaded', () => {
    $('#btn-gacha-1').addEventListener('click', () => doGacha(1));
    $('#btn-gacha-10').addEventListener('click', () => doGacha(10));
});

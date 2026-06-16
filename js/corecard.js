// ========== 核心卡系统 ==========
const CORE_CARDS = [
    { id: 'liangjinxuan', name: '核心卡·梁锦选', icon: '🧙', rarity: 'green', desc: '每2秒回复5.5%的血量', effect: 'regen' },
    { id: 'pangjuzhenjia', name: '核心卡·庞巨真甲', icon: '🛡️', rarity: 'green', desc: '受伤害时，对敌人造成额外8点伤害', effect: 'thorns' },
    { id: 'duanjiadou', name: '核心卡·段甲斗', icon: '⚔️', rarity: 'green', desc: '命中时增加8点防御，持续4秒', effect: 'stackDef' },
    { id: 'fannizhuangjia', name: '核心卡·反逆装甲', icon: '💥', rarity: 'green', desc: '受伤害时，对敌人造成额外8点伤害', effect: 'thorns' },
    { id: 'chiyanmeihuo', name: '核心卡·赤焰魅惑', icon: '🦊', rarity: 'purple', desc: '击杀时，提升自身攻击力100%持续5秒', effect: 'killBuff' },
    { id: 'guanglingfuhua', name: '核心卡·光灵符华', icon: '✨', rarity: 'blue', desc: '每次回复时获得额外10%攻击', effect: 'healAtk' },
    { id: 'suyanchenyi', name: '核心卡·素颜沉毅', icon: '👘', rarity: 'green', desc: '每2秒回复5.5%的血量', effect: 'regen' },
    { id: 'linglongzhiqu', name: '核心卡·玲珑之躯', icon: '🧚', rarity: 'blue', desc: '命中时增加8点防御；暴击时叠层', effect: 'stackDef' },
];

function openCoreCards() {
    const grid = $('#corecard-grid');
    grid.innerHTML = '';

    CORE_CARDS.forEach(card => {
        const owned = game.coreCards[card.id] || false;
        const cell = document.createElement('div');
        cell.className = `corecard-cell rarity-${card.rarity}` + (owned ? ' owned' : '');
        cell.innerHTML = `
            <div class="cc-icon">${card.icon}</div>
            <div class="cc-name">${card.name}</div>
            <div class="cc-desc">${card.desc}</div>
            <div class="cc-stats">${owned ? '✅ 已装备' : '🔒 未获得'}</div>
        `;
        grid.appendChild(cell);
    });

    $('#corecard-modal').classList.add('active');
}

// Hook into gacha to award core cards
function awardCoreCard() {
    const unowned = CORE_CARDS.filter(c => !game.coreCards[c.id]);
    if (unowned.length === 0) {
        // All owned, give gold instead
        game.player.gold += 500;
        toast('所有核心卡已拥有，转化为500金币', 'info');
        return;
    }
    const card = unowned[Math.floor(Math.random() * unowned.length)];
    game.coreCards[card.id] = true;
    toast(`🃏 获得核心卡: ${card.name}！`, card.rarity === 'purple' ? 'legendary' : 'success');
}

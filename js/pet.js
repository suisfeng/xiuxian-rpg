// ========== 精灵系统 ==========
const PET_LIST = [
    { id: 'xiaoyane', name: '小岩鳄', icon: '🐊', cost: 200, bonus: { defense: 50 } },
    { id: 'lanboling', name: '蓝波灵', icon: '👻', cost: 200, bonus: { evasion: 0.02 } },
    { id: 'shahema', name: '沙河马', icon: '🦛', cost: 200, bonus: { maxHp: 100 } },
    { id: 'jiguanhuolong', name: '鸡冠火龙', icon: '🐉', cost: 200, bonus: { attack: 30 } },
    { id: 'yangwushi', name: '羊武师', icon: '🐑', cost: 200, bonus: { recovery: 10 } },
    { id: 'huohuaxiaoma', name: '火花小马', icon: '🐴', cost: 200, bonus: { attackSpeed: 0.05 } },
    { id: 'huangchisun', name: '黄翅隼', icon: '🦅', cost: 200, bonus: { attack: 20 } },
    { id: 'youyoudying', name: '鱿鱼小美', icon: '🦑', cost: 200, bonus: { defense: 30 } },
    { id: 'youyouying', name: '幽幽影', icon: '👤', cost: 200, bonus: { evasion: 0.03 } },
    { id: 'youyouhuohuo', name: '鱿鱼火火', icon: '🔥', cost: 1000, bonus: { attack: 100 } },
    { id: 'naibeilu', name: '奈贝露', icon: '🧝', cost: 1000, bonus: { maxHp: 500 } },
    { id: 'mangmang', name: '莽莽', icon: '🐍', cost: 1000, bonus: { defense: 200 } },
    { id: 'shuipiaogui', name: '水漂龟', icon: '🐢', cost: 200, bonus: { defense: 80 } },
    { id: 'bingmengma', name: '冰梦马', icon: '🦄', cost: 200, bonus: { recovery: 20 } },
    { id: 'huohuanhuan', name: '火幻幻', icon: '🦊', cost: 200, bonus: { attack: 40 } },
    { id: 'wuleiaote', name: '乌雷奥特', icon: '⚡', cost: 1000, bonus: { attackSpeed: 0.15 } },
    { id: 'huolieniao', name: '火烈鸟人', icon: '🦩', cost: 1000, bonus: { attack: 150 } },
    { id: 'xuechidie', name: '雪翅蝶', icon: '🦋', cost: 1000, bonus: { evasion: 0.08 } },
];

function openPet() {
    const grid = $('#pet-grid');
    grid.innerHTML = '';
    $('#pet-points').textContent = game.petPoints;

    PET_LIST.forEach(pet => {
        const owned = game.pets[pet.id] || 0;
        const canBuy = game.petPoints >= pet.cost;
        const cell = document.createElement('div');
        cell.className = 'pet-cell' + (owned > 0 ? ' owned' : '');
        const bonusKey = Object.keys(pet.bonus)[0];
        const bonusVal = pet.bonus[bonusKey];
        const bonusText = { attack: '攻击', defense: '防御', maxHp: '生命', recovery: '回复', attackSpeed: '攻速', evasion: '回避' }[bonusKey] || bonusKey;

        cell.innerHTML = `
            <div class="pet-icon">${pet.icon}</div>
            <div class="pet-name">${pet.name}</div>
            <div class="pet-lv">${owned > 0 ? owned + '级' : '未拥有'}</div>
            <div class="pet-prog"><div class="pet-prog-fill" style="width:${Math.min(100, owned * 20)}%"></div></div>
            <div class="pet-cost">${pet.cost}积分</div>
            <div style="font-size:9px;color:#4ade80">${bonusText}+${bonusVal}</div>
            <button class="pet-btn" ${!canBuy && owned === 0 ? 'disabled' : ''} data-id="${pet.id}">
                ${owned > 0 ? '升级' : '兑换'}
            </button>
        `;
        grid.appendChild(cell);
    });

    grid.querySelectorAll('.pet-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const pet = PET_LIST.find(p => p.id === btn.dataset.id);
            if (game.petPoints >= pet.cost) {
                game.petPoints -= pet.cost;
                game.pets[pet.id] = (game.pets[pet.id] || 0) + 1;
                // Apply bonus
                const key = Object.keys(pet.bonus)[0];
                game.player[key] += pet.bonus[key];
                toast(`🐾 ${pet.name} ${game.pets[pet.id] > 1 ? '升级' : '获得'}成功！`, 'success');
                openPet();
                updatePlayerUI();
            } else {
                toast('精灵积分不足', 'warning');
            }
        });
    });

    $('#pet-modal').classList.add('active');
}

function tryGetPetFragment() {
    const unowned = PET_LIST.filter(p => !game.pets[p.id] || game.pets[p.id] < 5);
    if (unowned.length === 0) return;
    const pet = unowned[Math.floor(Math.random() * unowned.length)];
    game.petPoints += Math.floor(pet.cost * 0.2);
    toast(`✨ 获得 ${pet.name} 碎片！`, 'info');
}

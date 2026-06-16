// ========== 天赋系统 ==========
const TALENT_TREE = {
    attack: [
        { id: 'atk1', name: '锋刃', icon: '⚔️', desc: '攻击力+5%', maxLv: 5, effect: (lv) => { game.player.attack *= 1 + lv * 0.05; } },
        { id: 'atk2', name: '暴击精通', icon: '💥', desc: '暴击率+3%', maxLv: 5, effect: (lv) => { /* handled in combat */ }, requires: 'atk1' },
        { id: 'atk3', name: '破甲', icon: '🗡️', desc: '无视防御+10%', maxLv: 3, effect: (lv) => {}, requires: 'atk2' },
        { id: 'atk4', name: '杀戮本能', icon: '👹', desc: '击杀后攻速+20%持续3秒', maxLv: 3, effect: (lv) => {}, requires: 'atk3' },
        { id: 'atk5', name: '毁灭之力', icon: '💀', desc: '全伤害+15%', maxLv: 1, effect: (lv) => { if (lv > 0) game.player.attack *= 1.15; }, requires: 'atk4' },
    ],
    defense: [
        { id: 'def1', name: '铁壁', icon: '🛡️', desc: '防御力+8%', maxLv: 5, effect: (lv) => { game.player.defense *= 1 + lv * 0.08; } },
        { id: 'def2', name: '生命强化', icon: '❤️', desc: '生命上限+10%', maxLv: 5, effect: (lv) => { game.player.maxHp *= 1 + lv * 0.1; }, requires: 'def1' },
        { id: 'def3', name: '格挡', icon: '🤜', desc: '10%概率减免50%伤害', maxLv: 3, effect: (lv) => {}, requires: 'def2' },
        { id: 'def4', name: '荆棘', icon: '🌵', desc: '受击时反弹5%伤害', maxLv: 3, effect: (lv) => {}, requires: 'def3' },
        { id: 'def5', name: '不灭之躯', icon: '🏰', desc: '生命低于20%时防御翻倍', maxLv: 1, effect: (lv) => {}, requires: 'def4' },
    ],
    support: [
        { id: 'sup1', name: '冥想', icon: '🧘', desc: '回复速度+10%', maxLv: 5, effect: (lv) => { game.player.recovery *= 1 + lv * 0.1; } },
        { id: 'sup2', name: '聚宝', icon: '💰', desc: '金币获取+15%', maxLv: 5, effect: (lv) => { game.combat.goldMult += lv * 0.15; }, requires: 'sup1' },
        { id: 'sup3', name: '悟道', icon: '📖', desc: '经验获取+10%', maxLv: 5, effect: (lv) => { game.combat.expMult += lv * 0.1; }, requires: 'sup2' },
        { id: 'sup4', name: '幸运星', icon: '🍀', desc: '抽卡保底-5', maxLv: 3, effect: (lv) => {}, requires: 'sup3' },
        { id: 'sup5', name: '天命', icon: '🌟', desc: '所有属性+5%', maxLv: 1, effect: (lv) => { if (lv > 0) { game.player.attack *= 1.05; game.player.defense *= 1.05; game.player.maxHp *= 1.05; } }, requires: 'sup4' },
    ],
};

function openTalent() {
    $('#talent-points').textContent = game.player.talentPoints;
    renderTalentBranch('attack');
    // Tab switching
    $$('.talent-tab').forEach(tab => {
        tab.onclick = () => {
            $$('.talent-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderTalentBranch(tab.dataset.branch);
        };
    });
    $('#talent-modal').classList.add('active');
}

function renderTalentBranch(branch) {
    const tree = $('#talent-tree');
    tree.innerHTML = '';
    const nodes = TALENT_TREE[branch];
    const playerTalents = game.talents[branch] || [];

    nodes.forEach((node, idx) => {
        const currentLv = playerTalents.find(t => t.id === node.id)?.lv || 0;
        const isMaxed = currentLv >= node.maxLv;
        const reqMet = !node.requires || (playerTalents.find(t => t.id === node.requires)?.lv || 0) > 0;
        const available = reqMet && !isMaxed && game.player.talentPoints > 0;

        const el = document.createElement('div');
        el.className = 'talent-node' + (isMaxed ? ' unlocked' : available ? ' available' : '');
        el.innerHTML = `
            <div class="tn-icon">${node.icon}</div>
            <div class="tn-info">
                <div class="tn-name">${node.name} (${currentLv}/${node.maxLv})</div>
                <div class="tn-desc">${node.desc}</div>
            </div>
            <button class="tn-btn ${isMaxed ? 'maxed' : ''}" ${!available ? 'disabled' : ''} data-id="${node.id}" data-branch="${branch}">
                ${isMaxed ? '已满' : reqMet ? '升级' : '🔒'}
            </button>
        `;
        tree.appendChild(el);
    });

    tree.querySelectorAll('.tn-btn:not(:disabled)').forEach(btn => {
        btn.addEventListener('click', () => {
            const branch = btn.dataset.branch;
            const nodeId = btn.dataset.id;
            const node = TALENT_TREE[branch].find(n => n.id === nodeId);
            if (game.player.talentPoints <= 0) { toast('天赋点不足', 'warning'); return; }

            game.player.talentPoints--;
            let entry = game.talents[branch].find(t => t.id === nodeId);
            if (!entry) { entry = { id: nodeId, lv: 0 }; game.talents[branch].push(entry); }
            entry.lv++;
            node.effect(entry.lv);
            toast(`✨ ${node.name} 升至 ${entry.lv} 级`, 'success');
            openTalent();
            updatePlayerUI();
        });
    });
}

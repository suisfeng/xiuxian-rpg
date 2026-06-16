// ========== 游戏数据 ==========
const ISLANDS = [
    { name: '萌新岛', color: '#a8d8ea', difficulty: 1, desc: '适合新手修炼', char: '🧝‍♀️', bg: 'linear-gradient(135deg, #a8d8ea, #aa96da)' },
    { name: '启程岛', color: '#fcbad3', difficulty: 2, desc: '踏上修仙之路', char: '🗡️', bg: 'linear-gradient(135deg, #fcbad3, #aa96da)' },
    { name: '探索岛', color: '#ffffd2', difficulty: 3, desc: '探索未知秘境', char: '🎵', bg: 'linear-gradient(135deg, #ffffd2, #aa96da)' },
    { name: '觉醒岛', color: '#c1e1c1', difficulty: 4, desc: '觉醒强大力量', char: '⚔️', bg: 'linear-gradient(135deg, #c1e1c1, #aa96da)' },
];

const MONSTER_TYPES = [
    { name: '小岩鳄', color: '#8B7355', emoji: '🐊', size: 48 },
    { name: '蓝波灵', color: '#4FC3F7', emoji: '👻', size: 40 },
    { name: '沙河马', color: '#DEB887', emoji: '🦛', size: 52 },
    { name: '鸡冠火龙', color: '#FF6347', emoji: '🐉', size: 56 },
    { name: '羊武师', color: '#DDA0DD', emoji: '🐑', size: 44 },
    { name: '火花小马', color: '#FF8C00', emoji: '🐴', size: 46 },
    { name: '黄翅隼', color: '#FFD700', emoji: '🦅', size: 42 },
    { name: '幽幽影', color: '#9370DB', emoji: '👤', size: 38 },
];

// 12个小地图 (4列×3行)
const SUB_MAPS = [];
const SM_COLS = 4, SM_ROWS = 3, SM_SPACING = 500, SM_RADIUS = 250;
const SM_THEMES = ['灵草地','幽竹林','古木林','清泉池','石崖谷','暗夜林','火山口','冰雪原','雷云层','魔域门','龙穴窟','天劫台'];
const SM_COLORS = ['#5a9e4f','#4a8e5f','#3a7e3f','#4a9ebd','#8a7e6d','#3a4e5f','#9e4a3f','#7abece','#6a6e8d','#5a2d4f','#8a5e2d','#ceae4f'];
for (let r = 0; r < SM_ROWS; r++) {
    for (let c = 0; c < SM_COLS; c++) {
        const idx = r * SM_COLS + c;
        SUB_MAPS.push({
            id: idx, col: c, row: r,
            cx: 350 + c * SM_SPACING,
            cy: 350 + r * SM_SPACING,
            radius: SM_RADIUS,
            monsterLevel: 1 + idx * 20,
            theme: SM_THEMES[idx],
            color: SM_COLORS[idx],
        });
    }
}
const WORLD_W = 350 + (SM_COLS - 1) * SM_SPACING + 350; // 2200
const WORLD_H = 350 + (SM_ROWS - 1) * SM_SPACING + 350; // 1700
const RENDER_SCALE = 2; // 像素/游戏单位

const CARD_POOL = [
    { name: '水系辅助卡', type: 'water', icon: '💧', desc: '回复+20%', stat: 'recovery', value: 0.2, rarity: 'normal' },
    { name: '火系辅助卡', type: 'fire', icon: '🔥', desc: '攻击+60', stat: 'attack', value: 60, rarity: 'normal' },
    { name: '防御强化卡', type: 'defense', icon: '🛡️', desc: '防御+1.1K', stat: 'defense', value: 1100, rarity: 'rare' },
    { name: '生命回复卡', type: 'heal', icon: '💚', desc: '生命上限+200', stat: 'maxHp', value: 200, rarity: 'normal' },
    { name: '疾风卡', type: 'speed', icon: '⚡', desc: '攻速+10%', stat: 'attackSpeed', value: 0.1, rarity: 'rare' },
    { name: '暴击卡', type: 'speed', icon: '💥', desc: '回避+5%', stat: 'evasion', value: 0.05, rarity: 'normal' },
    { name: '铁壁卡', type: 'defense', icon: '🏔️', desc: '防御+500', stat: 'defense', value: 500, rarity: 'normal' },
    { name: '烈焰卡', type: 'fire', icon: '☄️', desc: '攻击+120', stat: 'attack', value: 120, rarity: 'rare' },
    { name: '清泉卡', type: 'water', icon: '🌊', desc: '回复+50%', stat: 'recovery', value: 0.5, rarity: 'rare' },
    { name: '生命卡', type: 'heal', icon: '❤️', desc: '生命上限+500', stat: 'maxHp', value: 500, rarity: 'rare' },
    { name: '天雷卡', type: 'fire', icon: '⚡', desc: '攻击+300', stat: 'attack', value: 300, rarity: 'epic' },
    { name: '金刚卡', type: 'defense', icon: '💎', desc: '防御+3K', stat: 'defense', value: 3000, rarity: 'epic' },
    { name: '凤凰卡', type: 'heal', icon: '🔥', desc: '生命+2000', stat: 'maxHp', value: 2000, rarity: 'epic' },
    { name: '神龙卡', type: 'fire', icon: '🐉', desc: '攻击+1000', stat: 'attack', value: 1000, rarity: 'legendary' },
];

const SKILLS = [
    { name: '火球术', icon: '🔥', desc: '对全体怪物造成3倍攻击伤害', cd: 5, maxCd: 5, mult: 3, unlockLevel: 1, upgradeCost: 200 },
    { name: '冰冻术', icon: '❄️', desc: '冻结所有怪物3秒，造成2倍伤害', cd: 8, maxCd: 8, mult: 2, unlockLevel: 20, upgradeCost: 500 },
    { name: '治愈术', icon: '💚', desc: '恢复50%最大生命值', cd: 12, maxCd: 12, mult: 0, unlockLevel: 50, upgradeCost: 800 },
    { name: '雷电链', icon: '⚡', desc: '对单体造成5倍攻击伤害', cd: 6, maxCd: 6, mult: 5, unlockLevel: 80, upgradeCost: 1200 },
];

// ========== 装备系统 ==========
const EQUIPMENT_SLOTS = ['weapon', 'armor', 'accessory'];
const EQUIPMENT_POOL = [
    { slot: 'weapon', name: '竹剑', icon: '🎋', rarity: 'normal', stats: { attack: 5 } },
    { slot: 'weapon', name: '铁剑', icon: '⚔️', rarity: 'rare', stats: { attack: 25 } },
    { slot: 'weapon', name: '玄铁剑', icon: '🗡️', rarity: 'epic', stats: { attack: 80 } },
    { slot: 'weapon', name: '仙剑', icon: '🔮', rarity: 'legendary', stats: { attack: 250 } },
    { slot: 'armor', name: '布甲', icon: '👕', rarity: 'normal', stats: { defense: 3 } },
    { slot: 'armor', name: '铁甲', icon: '🛡️', rarity: 'rare', stats: { defense: 15 } },
    { slot: 'armor', name: '玄铁甲', icon: '🛡️', rarity: 'epic', stats: { defense: 50 } },
    { slot: 'armor', name: '仙甲', icon: '✨', rarity: 'legendary', stats: { defense: 150 } },
    { slot: 'accessory', name: '木灵符', icon: '🍃', rarity: 'normal', stats: { maxHp: 50 } },
    { slot: 'accessory', name: '玉佩', icon: '💎', rarity: 'rare', stats: { maxHp: 200 } },
    { slot: 'accessory', name: '灵珠', icon: '🔵', rarity: 'epic', stats: { maxHp: 500 } },
    { slot: 'accessory', name: '仙玉', icon: '💠', rarity: 'legendary', stats: { maxHp: 1500 } },
];
const SLOT_NAMES = { weapon: '武器', armor: '护甲', accessory: '饰品' };
const RARITY_COLORS = { normal: '#aaa', rare: '#38bdf8', epic: '#a855f7', legendary: '#fbbf24' };

function getEquippedStats() {
    const eq = game.player.equipment;
    const stats = { attack: 0, defense: 0, maxHp: 0 };
    EQUIPMENT_SLOTS.forEach(slot => {
        if (eq[slot]) {
            if (eq[slot].stats.attack) stats.attack += eq[slot].stats.attack;
            if (eq[slot].stats.defense) stats.defense += eq[slot].stats.defense;
            if (eq[slot].stats.maxHp) stats.maxHp += eq[slot].stats.maxHp;
        }
    });
    return stats;
}

function getEffectivePlayerStats() {
    const base = game.player;
    const equip = getEquippedStats();
    return {
        attack: base.attack + equip.attack,
        defense: base.defense + equip.defense,
        maxHp: base.maxHp + equip.maxHp,
    };
}

function getEquipmentScore(eq) {
    if (!eq) return 0;
    return Object.values(eq.stats).reduce((a, b) => a + b, 0);
}

// ========== 游戏状态 ==========
const game = {
    state: 'island',
    currentIsland: 0,
    player: {
        name: '修仙者',
        level: 1, exp: 0, expToNext: 10,
        maxHp: 336, hp: 336,
        attack: 10, defense: 5, recovery: 3,
        attackSpeed: 1.0, evasion: 0.05,
        gold: 0, diamonds: 50,
        evolveLevel: 10, evolveCount: 0,
        talentPoints: 0,
        equipment: { weapon: null, armor: null, accessory: null },
        potions: 3,
    },
    combat: {
        atkCounter: 0, atkInterval: 40,
        recCounter: 0, recInterval: 20,
        timeCounter: 0, timeInterval: 20,
        autoAttack: true, atkTimer: null,
        monsters: [], killCount: 0,
        cardSelectPending: false,
        skillCds: [0, 0, 0, 0],
        expMult: 1.0, goldMult: 1.0,
        defeatCd: false,
    },
    camera: { x: 0, y: 0 },
    currentSubMap: 0,
    movement: {
        px: 350, py: 350, // 世界坐标（游戏单位）
        speed: 2, // 游戏单位/帧
        keys: { up: false, down: false, left: false, right: false },
        joystickActive: false,
        joystickDx: 0, joystickDy: 0,
        moving: false,
        facingLeft: false,
        attackRange: 45, // 远攻范围（游戏单位）
        meleeRange: 25, // 近战范围（游戏单位）
        moveLoop: null,
    },
    monsterSpawn: null, // 刷新定时器
    timer: { remaining: 12000, interval: null },
    pets: {}, petPoints: 0,
    coreCards: {},
    talents: { attack: [], defense: [], support: [] },
    shop: { monthly: false, lifetime: false, dailyClaimed: false },
    gacha: { pity: 0 },
};

// ========== DOM ==========
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

// ========== 屏幕切换 ==========
function showScreen(screenId) {
    $$('.screen').forEach(s => s.classList.remove('active'));
    const target = $('#' + screenId);
    if (target) target.classList.add('active');
}

// ========== 移动控制初始化 ==========
function initMovementControls() {
    const m = game.movement;
    // 键盘控制
    document.onkeydown = (e) => {
        switch (e.key.toLowerCase()) {
            case 'w': case 'arrowup': m.keys.up = true; break;
            case 's': case 'arrowdown': m.keys.down = true; break;
            case 'a': case 'arrowleft': m.keys.left = true; break;
            case 'd': case 'arrowright': m.keys.right = true; break;
        }
    };
    document.onkeyup = (e) => {
        switch (e.key.toLowerCase()) {
            case 'w': case 'arrowup': m.keys.up = false; break;
            case 's': case 'arrowdown': m.keys.down = false; break;
            case 'a': case 'arrowleft': m.keys.left = false; break;
            case 'd': case 'arrowright': m.keys.right = false; break;
        }
    };
    // 虚拟摇杆
    const joystick = $('#joystick');
    const knob = $('#joystick-knob');
    if (joystick && knob) {
        const base = joystick.querySelector('.joystick-base');
        const baseRadius = 50;
        let touchId = null;
        const onStart = (e) => {
            e.preventDefault();
            const touch = e.touches ? e.touches[0] : e;
            touchId = e.touches ? touch.identifier : 'mouse';
            m.joystickActive = true;
            onMove(e);
        };
        const onMove = (e) => {
            if (!m.joystickActive) return;
            e.preventDefault();
            const touch = e.touches
                ? Array.from(e.touches).find(t => t.identifier === touchId)
                : e;
            if (!touch) return;
            const rect = base.getBoundingClientRect();
            const cx = rect.left + baseRadius;
            const cy = rect.top + baseRadius;
            let dx = touch.clientX - cx;
            let dy = touch.clientY - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > baseRadius) { dx = dx / dist * baseRadius; dy = dy / dist * baseRadius; }
            knob.style.transform = `translate(${-50 + dx / baseRadius * 50}%, ${-50 + dy / baseRadius * 50}%)`;
            m.joystickDx = dx / baseRadius;
            m.joystickDy = dy / baseRadius;
        };
        const onEnd = () => {
            m.joystickActive = false;
            m.joystickDx = 0;
            m.joystickDy = 0;
            knob.style.transform = 'translate(-50%, -50%)';
            touchId = null;
        };
        joystick.addEventListener('touchstart', onStart, { passive: false });
        joystick.addEventListener('touchmove', onMove, { passive: false });
        joystick.addEventListener('touchend', onEnd);
        joystick.addEventListener('mousedown', onStart);
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onEnd);
    }
}

// ========== Toast通知 ==========
function toast(msg, type = 'info') {
    const container = $('#toast-container');
    const el = document.createElement('div');
    el.className = 'toast ' + type;
    el.textContent = msg;
    container.appendChild(el);
    setTimeout(() => el.remove(), 2500);
}

// ========== 存档系统 ==========
function saveGame() {
    const data = {
        player: game.player, currentIsland: game.currentIsland,
        pets: game.pets, petPoints: game.petPoints,
        coreCards: game.coreCards, talents: game.talents,
        shop: game.shop, gacha: game.gacha,
        combat: { killCount: game.combat.killCount, expMult: game.combat.expMult, goldMult: game.combat.goldMult },
        equipment: game.player.equipment, potions: game.player.potions,
    };
    localStorage.setItem('xiuxian_save', JSON.stringify(data));
    toast('存档成功', 'success');
}

function loadGame() {
    const raw = localStorage.getItem('xiuxian_save');
    if (!raw) { toast('没有找到存档', 'warning'); return false; }
    try {
        const data = JSON.parse(raw);
        Object.assign(game.player, data.player);
        game.currentIsland = data.currentIsland || 0;
        game.pets = data.pets || {};
        game.petPoints = data.petPoints || 0;
        game.coreCards = data.coreCards || {};
        game.talents = data.talents || { attack: [], defense: [], support: [] };
        game.shop = data.shop || { monthly: false, lifetime: false, dailyClaimed: false };
        game.gacha = data.gacha || { pity: 0 };
        if (data.combat) {
            game.combat.expMult = data.combat.expMult || 1;
            game.combat.goldMult = data.combat.goldMult || 1;
        }
        if (data.equipment) game.player.equipment = data.equipment;
        if (data.potions !== undefined) game.player.potions = data.potions;
        toast('读档成功', 'success');
        return true;
    } catch (e) { toast('存档损坏', 'error'); return false; }
}

function resetGame() {
    if (!confirm('确定要重置游戏吗？所有进度将丢失！')) return;
    localStorage.removeItem('xiuxian_save');
    location.reload();
}

// 自动存档
setInterval(() => {
    if (game.state === 'battle') {
        const data = {
            player: game.player, currentIsland: game.currentIsland,
            pets: game.pets, petPoints: game.petPoints,
            coreCards: game.coreCards, talents: game.talents,
            shop: game.shop, gacha: game.gacha,
            combat: { killCount: game.combat.killCount, expMult: game.combat.expMult, goldMult: game.combat.goldMult },
        };
        localStorage.setItem('xiuxian_save', JSON.stringify(data));
    }
}, 30000);

// ========== 岛屿选择 ==========
function initIslandSelect() {
    const container = $('#island-cards');
    container.innerHTML = '';
    ISLANDS.forEach((island, i) => {
        const card = document.createElement('div');
        card.className = 'island-card';
        card.innerHTML = `
            <div class="card-art" style="background: ${island.bg}">
                <div class="card-char">${island.char}</div>
            </div>
            <div class="card-diff">★${'★'.repeat(island.difficulty - 1)}</div>
            <div class="card-label">${island.name}</div>
            <div class="card-info">i</div>
        `;
        card.addEventListener('click', () => { game.currentIsland = i; startLoading(); });
        container.appendChild(card);
    });
}

// ========== 加载 ==========
function startLoading() {
    showScreen('loading-screen');
    let progress = 0;
    const fill = $('.loading-fill');
    const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 100) { progress = 100; clearInterval(interval); setTimeout(startBattle, 300); }
        fill.style.width = progress + '%';
    }, 200);
}

// ========== 战斗 ==========
function startBattle() {
    game.state = 'battle';
    const area = $('#battle-area');
    game.camera.vw = area.offsetWidth || 800;
    game.camera.vh = area.offsetHeight || 450;
    // 清理上局残留
    $('#monster-container').innerHTML = '';
    const mapBg = $('#map-bg');
    if (mapBg) mapBg.style.transform = '';
    // 玩家在第一个小地图中心
    game.movement.px = SUB_MAPS[0].cx;
    game.movement.py = SUB_MAPS[0].cy;
    game.currentSubMap = 0;
    showScreen('battle-screen');
    // 初始化区域指示器
    const zn = $('#zone-name'); const zl = $('#zone-level');
    if (zn) zn.textContent = SUB_MAPS[0].theme;
    if (zl) zl.textContent = 'Lv.' + SUB_MAPS[0].monsterLevel;
    updateCamera();
    updatePlayerPos();
    updatePlayerUI();
    generateAllDecorations();
    // 每个小地图生成怪物
    SUB_MAPS.forEach(sm => spawnMonstersForSubMap(sm.id));
    startMovementLoop();
    startCombatLoop();
    startTimerLoop();
    startSkillCdLoop();
    initMovementControls();
    renderMinimap();
    // 15秒刷新
    if (game.monsterSpawn) clearInterval(game.monsterSpawn);
    game.monsterSpawn = setInterval(() => {
        if (game.state !== 'battle') return;
        SUB_MAPS.forEach(sm => {
            const count = game.combat.monsters.filter(m => m.subMapId === sm.id).length;
            if (count < 20) spawnMonstersForSubMap(sm.id, 20 - count);
        });
    }, 15000);
    if (game.player.evolveCount > 0) $('#char-aura').classList.add('active');
    applyEvolveColors();
}

function getCurrentSubMap() {
    const m = game.movement;
    let nearest = SUB_MAPS[0], minDist = Infinity;
    SUB_MAPS.forEach(sm => {
        const d = Math.sqrt((m.px - sm.cx) ** 2 + (m.py - sm.cy) ** 2);
        if (d < minDist) { minDist = d; nearest = sm; }
    });
    return nearest;
}

function updateCamera() {
    const cam = game.camera;
    const area = $('#battle-area');
    cam.vw = area ? area.offsetWidth : 800;
    cam.vh = area ? area.offsetHeight : 450;
    // 相机中心跟随玩家
    cam.x = game.movement.px * RENDER_SCALE - cam.vw / 2;
    cam.y = game.movement.py * RENDER_SCALE - cam.vh / 2;
    // 边界限制
    const maxW = WORLD_W * RENDER_SCALE - cam.vw;
    const maxH = WORLD_H * RENDER_SCALE - cam.vh;
    cam.x = Math.max(0, Math.min(maxW, cam.x));
    cam.y = Math.max(0, Math.min(maxH, cam.y));
    // 移动地图背景
    const mapBg = $('#map-bg');
    if (mapBg) mapBg.style.transform = `translate(${-cam.x}px, ${-cam.y}px)`;
}

function worldToScreen(wx, wy) {
    const cam = game.camera;
    return {
        x: wx * RENDER_SCALE - cam.x,
        y: wy * RENDER_SCALE - cam.y,
    };
}

function generateAllDecorations() {
    const decor = $('#map-decor');
    decor.innerHTML = '';
    // 子地图之间的连接路径
    SUB_MAPS.forEach(sm => {
        if (sm.col < SM_COLS - 1) {
            const right = SUB_MAPS[sm.id + 1];
            const path = document.createElement('div');
            path.className = 'sub-map-path';
            const x1 = sm.cx * RENDER_SCALE, y1 = sm.cy * RENDER_SCALE;
            const x2 = right.cx * RENDER_SCALE, y2 = right.cy * RENDER_SCALE;
            const len = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
            const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
            path.style.left = x1 + 'px';
            path.style.top = y1 + 'px';
            path.style.width = len + 'px';
            path.style.transform = `rotate(${angle}deg)`;
            decor.appendChild(path);
        }
        if (sm.row < SM_ROWS - 1) {
            const below = SUB_MAPS[sm.id + SM_COLS];
            const path = document.createElement('div');
            path.className = 'sub-map-path';
            const x1 = sm.cx * RENDER_SCALE, y1 = sm.cy * RENDER_SCALE;
            const x2 = below.cx * RENDER_SCALE, y2 = below.cy * RENDER_SCALE;
            const len = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
            const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
            path.style.left = x1 + 'px';
            path.style.top = y1 + 'px';
            path.style.width = len + 'px';
            path.style.transform = `rotate(${angle}deg)`;
            decor.appendChild(path);
        }
    });
    SUB_MAPS.forEach(sm => {
        // 每个小地图的装饰
        const trees = ['🌳', '🌲', '🌴', '🎋'];
        for (let i = 0; i < 6; i++) {
            const el = document.createElement('div');
            el.className = 'map-tree';
            const angle = Math.random() * Math.PI * 2;
            const r = Math.random() * sm.radius * 0.85;
            el.style.left = (sm.cx + Math.cos(angle) * r) * RENDER_SCALE + 'px';
            el.style.top = (sm.cy + Math.sin(angle) * r) * RENDER_SCALE + 'px';
            el.style.fontSize = (16 + Math.random() * 12) + 'px';
            el.textContent = trees[Math.floor(Math.random() * trees.length)];
            decor.appendChild(el);
        }
        // 花草
        const flowers = ['🌸', '🌼', '🍀', '🌺', '🍄'];
        for (let i = 0; i < 8; i++) {
            const el = document.createElement('div');
            el.className = 'map-flower';
            const angle = Math.random() * Math.PI * 2;
            const r = Math.random() * sm.radius * 0.9;
            el.style.left = (sm.cx + Math.cos(angle) * r) * RENDER_SCALE + 'px';
            el.style.top = (sm.cy + Math.sin(angle) * r) * RENDER_SCALE + 'px';
            el.textContent = flowers[Math.floor(Math.random() * flowers.length)];
            el.style.animationDelay = (Math.random() * 2) + 's';
            decor.appendChild(el);
        }
        // 小地图边界圆（淡色虚线圈）
        const circle = document.createElement('div');
        circle.className = 'sub-map-circle';
        circle.style.left = (sm.cx - sm.radius) * RENDER_SCALE + 'px';
        circle.style.top = (sm.cy - sm.radius) * RENDER_SCALE + 'px';
        circle.style.width = sm.radius * 2 * RENDER_SCALE + 'px';
        circle.style.height = sm.radius * 2 * RENDER_SCALE + 'px';
        decor.appendChild(circle);
        // 地图名标签
        const label = document.createElement('div');
        label.className = 'sub-map-label';
        label.textContent = `${sm.theme} Lv.${sm.monsterLevel}`;
        label.style.left = sm.cx * RENDER_SCALE + 'px';
        label.style.top = (sm.cy - sm.radius - 15) * RENDER_SCALE + 'px';
        decor.appendChild(label);
    });
}

function startMovementLoop() {
    if (game.movement.moveLoop) cancelAnimationFrame(game.movement.moveLoop);
    const m = game.movement;
    let monsterAttackCd = 0;
    const loop = () => {
        if (game.state !== 'battle') return;
        let dx = 0, dy = 0;
        if (m.keys.left) dx -= 1;
        if (m.keys.right) dx += 1;
        if (m.keys.up) dy -= 1;
        if (m.keys.down) dy += 1;
        if (m.joystickActive) { dx = m.joystickDx; dy = -m.joystickDy; }
        const mag = Math.sqrt(dx * dx + dy * dy);
        if (mag > 0.1) {
            dx = (dx / mag) * m.speed;
            dy = (dy / mag) * m.speed;
            m.px = Math.max(50, Math.min(WORLD_W - 50, m.px + dx));
            m.py = Math.max(50, Math.min(WORLD_H - 50, m.py + dy));
            m.moving = true;
            if (dx < -0.1) m.facingLeft = true;
            else if (dx > 0.1) m.facingLeft = false;
        } else {
            m.moving = false;
        }
        // 检测当前小地图
        const curSm = getCurrentSubMap();
        if (curSm.id !== game.currentSubMap) {
            game.currentSubMap = curSm.id;
            toast(`进入 ${curSm.theme} (Lv.${curSm.monsterLevel})`, 'info');
            // 更新区域指示器
            const zn = $('#zone-name');
            const zl = $('#zone-level');
            if (zn) zn.textContent = curSm.theme;
            if (zl) zl.textContent = 'Lv.' + curSm.monsterLevel;
            renderMinimap();
        }
        updateMonsterAI();
        monsterAttackCd--;
        if (monsterAttackCd <= 0) {
            monsterAttackCd = 25;
            game.combat.monsters.forEach(mon => {
                if (!mon.aggro) return;
                const d = distToMonster(mon);
                if (d <= mon.attackRange) monsterAttack(mon);
            });
        }
        updateCamera();
        updatePlayerPos();
        game.movement.moveLoop = requestAnimationFrame(loop);
    };
    game.movement.moveLoop = requestAnimationFrame(loop);
}

function updatePlayerPos() {
    const el = $('#player-char');
    if (!el) return;
    const m = game.movement;
    const cam = game.camera;
    const sx = (m.px * RENDER_SCALE - cam.x) / cam.vw * 100;
    const sy = (m.py * RENDER_SCALE - cam.y) / cam.vh * 100;
    el.style.left = sx + '%';
    el.style.top = sy + '%';
    if (m.moving) el.classList.add('walking'); else el.classList.remove('walking');
    if (m.facingLeft) el.classList.add('face-left'); else el.classList.remove('face-left');
    // 范围圈
    const rangeEl = $('#range-circles');
    if (rangeEl) {
        const sc = worldToScreen(m.px, m.py);
        rangeEl.style.left = (sc.x / cam.vw * 100) + '%';
        rangeEl.style.top = (sc.y / cam.vh * 100) + '%';
        const meleeDiam = m.meleeRange * 2 * RENDER_SCALE;
        const rangedDiam = m.attackRange * 2 * RENDER_SCALE;
        const mc = rangeEl.querySelector('.range-melee');
        const rc = rangeEl.querySelector('.range-ranged');
        if (mc) { mc.style.width = meleeDiam + 'px'; mc.style.height = meleeDiam + 'px'; }
        if (rc) { rc.style.width = rangedDiam + 'px'; rc.style.height = rangedDiam + 'px'; }
    }
    let hasMelee = false, hasRanged = false;
    game.combat.monsters.forEach(mon => {
        const d = distToMonster(mon);
        if (d <= m.meleeRange) hasMelee = true;
        if (d <= m.attackRange) hasRanged = true;
    });
    const mc2 = rangeEl && rangeEl.querySelector('.range-melee');
    const rc2 = rangeEl && rangeEl.querySelector('.range-ranged');
    if (mc2) mc2.classList.toggle('has-target', hasMelee);
    if (rc2) rc2.classList.toggle('has-target', hasRanged);
    // 更新小地图（每30帧一次）
    if (game.combat.atkCounter % 30 === 0) renderMinimap();
}

function updateMonsterAI() {
    const m = game.movement;
    game.combat.monsters.forEach(mon => {
        const sm = SUB_MAPS[mon.subMapId];
        const dx = m.px - mon.x;
        const dy = m.py - mon.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (!mon.aggro && dist <= mon.aggroRange) {
            mon.aggro = true;
            mon.wanderState = 'chase';
        }
        if (mon.aggro) {
            if (dist > mon.attackRange * 0.7) {
                const spd = mon.chaseSpeed;
                mon.x += (dx / dist) * spd;
                mon.y += (dy / dist) * spd;
                mon.moving = true;
            } else {
                mon.moving = false;
            }
            // 拉太远脱离
            const distFromHome = Math.sqrt((mon.x - sm.cx) ** 2 + (mon.y - sm.cy) ** 2);
            if (distFromHome > sm.radius * 1.5) {
                mon.aggro = false;
                mon.wanderState = 'idle';
                mon.wanderTimer = 30;
            }
        } else {
            // 游走AI - 限制在小地图内
            if (!mon.wanderState) mon.wanderState = 'idle';
            if (!mon.wanderTimer) mon.wanderTimer = 0;
            if (mon.wanderState === 'idle') {
                mon.moving = false;
                mon.wanderTimer--;
                if (mon.wanderTimer <= 0) {
                    const angle = Math.random() * Math.PI * 2;
                    const r = Math.random() * sm.radius * 0.7;
                    mon.targetX = sm.cx + Math.cos(angle) * r;
                    mon.targetY = sm.cy + Math.sin(angle) * r;
                    mon.wanderState = 'walk';
                }
            } else if (mon.wanderState === 'walk') {
                const wdx = mon.targetX - mon.x;
                const wdy = mon.targetY - mon.y;
                const wdist = Math.sqrt(wdx * wdx + wdy * wdy);
                if (wdist < 5) {
                    mon.wanderState = 'idle';
                    mon.wanderTimer = 40 + Math.floor(Math.random() * 80);
                    mon.moving = false;
                } else {
                    mon.x += (wdx / wdist) * mon.wanderSpeed;
                    mon.y += (wdy / wdist) * mon.wanderSpeed;
                    mon.moving = true;
                }
            }
        }
    });
    // 批量DOM更新（只更新可见的）
    const cam = game.camera;
    game.combat.monsters.forEach(mon => {
        const sx = mon.x * RENDER_SCALE - cam.x;
        const sy = mon.y * RENDER_SCALE - cam.y;
        // 只更新视口附近
        if (sx < -100 || sx > cam.vw + 100 || sy < -100 || sy > cam.vh + 100) return;
        const el = document.getElementById('monster-' + mon.id);
        if (el) {
            el.style.left = (sx / cam.vw * 100) + '%';
            el.style.top = (sy / cam.vh * 100) + '%';
            if (mon.moving) {
                if (!el.classList.contains('monster-walking')) el.classList.add('monster-walking');
            } else {
                el.classList.remove('monster-walking');
            }
            if (mon.aggro && !el.classList.contains('aggro')) el.classList.add('aggro');
            else if (!mon.aggro) el.classList.remove('aggro');
        }
    });
}

function monsterAttack(mon) {
    const eff = getEffectivePlayerStats();
    const rawDmg = Math.floor(mon.level * 1.5 + Math.random() * mon.level * 0.5);
    const dmg = Math.max(1, rawDmg - Math.floor(eff.defense * 0.3));
    // 单次伤害不超过玩家最大生命的15%
    const cappedDmg = Math.min(dmg, Math.ceil(eff.maxHp * 0.15));
    game.player.hp -= cappedDmg;
    const pc = $('#player-char');
    if (pc) {
        pc.classList.add('damaged');
        setTimeout(() => pc.classList.remove('damaged'), 200);
        showFloatText(pc, `-${formatNum(cappedDmg)}`, 'damage');
    }
    updatePlayerUI();
    if (game.player.hp <= 0) {
        game.player.hp = 0;
        if (!game.combat.defeatCd) {
            game.combat.defeatCd = true;
            toast('你被击败了！3秒后恢复', 'error');
            setTimeout(() => {
                game.combat.defeatCd = false;
                if (game.state === 'battle') {
                    game.player.hp = Math.floor(eff.maxHp * 0.3);
                    updatePlayerUI();
                }
            }, 3000);
        }
        updatePlayerUI();
    }
}

function distToMonster(monster) {
    const m = game.movement;
    const dx = m.px - monster.x;
    const dy = m.py - monster.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function findNearestMonster() {
    let nearest = null, minDist = Infinity;
    const curId = game.currentSubMap;
    // 优先攻击当前小地图的怪物
    game.combat.monsters.forEach(m => {
        if (m.hp <= 0 || m.subMapId !== curId) return;
        const d = distToMonster(m);
        if (d < minDist) { minDist = d; nearest = m; }
    });
    // 当前地图没有目标时再考虑其他地图
    if (!nearest || minDist > game.movement.attackRange) {
        nearest = null; minDist = Infinity;
        game.combat.monsters.forEach(m => {
            if (m.hp <= 0) return;
            const d = distToMonster(m);
            if (d < minDist) { minDist = d; nearest = m; }
        });
    }
    return nearest && minDist <= game.movement.attackRange ? nearest : null;
}

function spawnMonstersForSubMap(subMapId, count) {
    const container = $('#monster-container');
    const sm = SUB_MAPS[subMapId];
    if (!count) count = 20;
    const isBossZone = sm.id % SM_COLS === SM_COLS - 1; // 最后一列是Boss区
    const bossCount = isBossZone ? 3 : 0;
    for (let i = 0; i < count; i++) {
        const isBoss = isBossZone && i < bossCount && (i % 2 === 0);
        const type = MONSTER_TYPES[Math.floor(Math.random() * MONSTER_TYPES.length)];
        const angle = Math.random() * Math.PI * 2;
        const r = 30 + Math.random() * (sm.radius - 40);
        const mx = sm.cx + Math.cos(angle) * r;
        const my = sm.cy + Math.sin(angle) * r;
        const level = sm.monsterLevel + Math.floor(Math.random() * 10) - 5;
        const bossMult = isBoss ? 5 : 1;
        const monster = {
            id: Date.now() + i + Math.floor(Math.random() * 99999),
            name: isBoss ? 'Boss·' + type.name : type.name,
            emoji: type.emoji, color: type.color,
            level: Math.max(1, level),
            maxHp: Math.floor((300 + level * 15 + Math.random() * 200) * bossMult),
            hp: 0, x: mx, y: my,
            size: isBoss ? type.size * 1.5 : type.size,
            subMapId: sm.id,
            aggro: false, aggroRange: isBoss ? 180 : 80,
            chaseSpeed: isBoss ? 2.5 : 1.5,
            attackRange: 20,
            wanderSpeed: 0.3 + Math.random() * 0.3,
            wanderState: 'idle',
            wanderTimer: Math.floor(Math.random() * 80),
            targetX: mx, targetY: my,
            moving: false,
            isBoss: isBoss,
        };
        monster.hp = monster.maxHp;
        game.combat.monsters.push(monster);
        const el = document.createElement('div');
        el.className = 'monster' + (isBoss ? ' boss' : '');
        el.id = 'monster-' + monster.id;
        el.style.width = monster.size + 'px'; el.style.height = monster.size + 'px';
        const cam = game.camera;
        const sx = (mx * RENDER_SCALE - cam.x) / cam.vw * 100;
        const sy = (my * RENDER_SCALE - cam.y) / cam.vh * 100;
        el.style.left = sx + '%'; el.style.top = sy + '%';
        el.innerHTML = `
            <div class="monster-hp"><div class="monster-hp-fill" style="width:100%"></div></div>
            <div class="monster-body" style="background: radial-gradient(circle at 40% 35%, ${type.color}cc, ${type.color});
                 box-shadow: inset -2px -2px 6px rgba(0,0,0,0.2); font-size: ${isBoss ? monster.size * 0.35 : monster.size * 0.5}px;">
                <div class="mon-eye mon-eye-l"></div>
                <div class="mon-eye mon-eye-r"></div>
                <span class="mon-emoji">${type.emoji}</span>
                ${isBoss ? '<div style="position:absolute;top:-8px;left:50%;transform:translateX(-50%);font-size:10px;color:#ffd700;font-weight:bold;text-shadow:0 0 6px rgba(255,215,0,0.8);">👑BOSS</div>' : ''}
            </div>
            <div class="monster-shadow"></div>
            <div class="monster-level">${isBoss ? '👑' : ''}${monster.name} Lv.${monster.level}</div>
        `;
        container.appendChild(el);
    }
}

// ========== 小地图UI ==========
function renderMinimap() {
    const mm = $('#minimap');
    if (!mm) return;
    const canvas = mm.querySelector('canvas') || document.createElement('canvas');
    if (!canvas.parentNode) { canvas.width = 180; canvas.height = 140; mm.appendChild(canvas); }
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    // 深色背景（填充黑屏区域）
    ctx.fillStyle = '#12121f';
    ctx.fillRect(0, 0, W, H);
    // 世界实际范围（含小地图半径）
    const worldMinX = SUB_MAPS[0].cx - SM_RADIUS - 40;
    const worldMinY = SUB_MAPS[0].cy - SM_RADIUS - 40;
    const worldMaxX = SUB_MAPS[SUB_MAPS.length - 1].cx + SM_RADIUS + 40;
    const worldMaxY = SUB_MAPS[SUB_MAPS.length - 1].cy + SM_RADIUS + 40;
    const worldW = worldMaxX - worldMinX;
    const worldH = worldMaxY - worldMinY;
    const pad = 4;
    const sx = (W - pad * 2) / worldW;
    const sy = (H - pad * 2) / worldH;
    const scale = Math.min(sx, sy);
    const ox = pad + ((W - pad * 2) - worldW * scale) / 2;
    const oy = pad + ((H - pad * 2) - worldH * scale) / 2;
    const toX = (wx) => ox + (wx - worldMinX) * scale;
    const toY = (wy) => oy + (wy - worldMinY) * scale;
    // 世界边界
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 1;
    ctx.strokeRect(toX(worldMinX), toY(worldMinY), worldW * scale, worldH * scale);
    // 连接线（相邻子地图之间的路径）
    ctx.strokeStyle = 'rgba(168,85,247,0.2)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([2, 4]);
    SUB_MAPS.forEach(sm => {
        if (sm.col < SM_COLS - 1) {
            const right = SUB_MAPS[sm.id + 1];
            ctx.beginPath(); ctx.moveTo(toX(sm.cx), toY(sm.cy)); ctx.lineTo(toX(right.cx), toY(right.cy)); ctx.stroke();
        }
        if (sm.row < SM_ROWS - 1) {
            const below = SUB_MAPS[sm.id + SM_COLS];
            ctx.beginPath(); ctx.moveTo(toX(sm.cx), toY(sm.cy)); ctx.lineTo(toX(below.cx), toY(below.cy)); ctx.stroke();
        }
    });
    ctx.setLineDash([]);
    // 画子地图圆
    SUB_MAPS.forEach(sm => {
        const cx = toX(sm.cx), cy = toY(sm.cy);
        const r = sm.radius * scale;
        const isCurrent = sm.id === game.currentSubMap;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        // 主题色填充（消除黑色空洞）
        ctx.fillStyle = isCurrent ? 'rgba(168,85,247,0.4)' : (sm.color + '30');
        ctx.fill();
        ctx.strokeStyle = isCurrent ? '#a855f7' : 'rgba(255,255,255,0.18)';
        ctx.lineWidth = isCurrent ? 2 : 0.8;
        ctx.stroke();
        // 当前地图外圈发光
        if (isCurrent) {
            ctx.beginPath();
            ctx.arc(cx, cy, r + 2, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(168,85,247,0.35)';
            ctx.lineWidth = 1;
            ctx.stroke();
            // 金色三角标记
            ctx.fillStyle = '#fbbf24';
            ctx.beginPath();
            ctx.moveTo(cx, cy - r - 6);
            ctx.lineTo(cx - 3, cy - r - 2);
            ctx.lineTo(cx + 3, cy - r - 2);
            ctx.closePath();
            ctx.fill();
        }
        // 地图名
        ctx.fillStyle = isCurrent ? '#e0d4ff' : '#666';
        ctx.font = (isCurrent ? 'bold ' : '') + '7px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(sm.theme, cx, cy - 2);
        ctx.fillStyle = isCurrent ? '#c084fc' : '#555';
        ctx.font = '6px sans-serif';
        ctx.fillText('Lv.' + sm.monsterLevel, cx, cy + 6);
    });
    // 画怪物点（跳过已死亡）
    game.combat.monsters.forEach(mon => {
        if (mon.hp <= 0) return;
        const mx = toX(mon.x), my = toY(mon.y);
        if (mx < 0 || mx > W || my < 0 || my > H) return;
        ctx.fillStyle = mon.aggro ? '#ef4444' : 'rgba(255,180,80,0.5)';
        ctx.fillRect(mx - 0.7, my - 0.7, 1.4, 1.4);
    });
    // 画玩家（蓝点+朝向线）
    const px = toX(game.movement.px), py = toY(game.movement.py);
    ctx.fillStyle = '#60a5fa';
    ctx.beginPath();
    ctx.arc(px, py, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.stroke();
    // 朝向指示线
    const dir = game.movement.facingLeft ? -5 : 5;
    ctx.strokeStyle = 'rgba(96,165,250,0.7)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(px + dir, py);
    ctx.stroke();
    // 视口框
    const cam = game.camera;
    const vx1 = toX(cam.x / RENDER_SCALE);
    const vy1 = toY(cam.y / RENDER_SCALE);
    const vw = (cam.vw / RENDER_SCALE) * scale;
    const vh = (cam.vh / RENDER_SCALE) * scale;
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(vx1, vy1, vw, vh);
}

function startCombatLoop() {
    if (game.combat.atkTimer) clearInterval(game.combat.atkTimer);
    const speed = Math.max(200, 1200 / game.player.attackSpeed);
    game.combat.atkTimer = setInterval(() => {
        if (!game.combat.autoAttack || game.combat.cardSelectPending) return;
        // 找最近的怪物攻击
        const target = findNearestMonster();
        if (!target) return;
        performAttack(target);
    }, speed);
}

function performAttack(target) {
    if (!target) return;
    const playerChar = $('#player-char');
    playerChar.classList.add('attacking');
    setTimeout(() => playerChar.classList.remove('attacking'), 150);

    const m = game.movement;
    if (target.x < m.px) { m.facingLeft = true; } else { m.facingLeft = false; }

    const dist = distToMonster(target);
    const isMelee = dist <= m.meleeRange;

    if (isMelee) { spawnSlashEffect(target); }
    else { shootProjectile(target); }

    const eff = getEffectivePlayerStats();
    const isCrit = Math.random() < 0.15;
    let dmg = Math.floor(eff.attack * (0.8 + Math.random() * 0.4));
    if (isMelee) dmg = Math.floor(dmg * 1.5);
    if (isCrit) dmg = Math.floor(dmg * 2);
    const evaded = Math.random() < 0.02;
    if (evaded) dmg = 0;

    setTimeout(() => {
        target.hp -= dmg;
        game.combat.atkCounter++;
        updateAtkCounter();

        if (!target.aggro) {
            target.aggro = true;
            target.wanderState = 'chase';
        }

        if (!evaded) spawnHitBurst(target);

        const monsterEl = document.getElementById('monster-' + target.id);
        if (monsterEl) {
            monsterEl.classList.add('hit');
            setTimeout(() => monsterEl.classList.remove('hit'), 150);
            if (evaded) {
                showFloatText(monsterEl, 'MISS', 'heal');
            } else {
                showFloatText(monsterEl, `${isMelee ? '⚔' : ''}-${formatNum(dmg)}`, isCrit ? 'crit' : 'damage');
            }
            const hpFill = monsterEl.querySelector('.monster-hp-fill');
            if (hpFill) hpFill.style.width = Math.max(0, (target.hp / target.maxHp) * 100) + '%';
        }

        if (target.hp <= 0) killMonster(target);
        if (game.combat.atkCounter % 5 === 0) healPlayer();
    }, 150);
}

function shootProjectile(target) {
    const container = $('#projectile-container');
    if (!container) return;
    const from = worldToScreen(game.movement.px, game.movement.py);
    const to = worldToScreen(target.x, target.y);
    const proj = document.createElement('div');
    proj.className = 'projectile';
    proj.style.left = from.x + 'px';
    proj.style.top = from.y + 'px';
    proj.style.transition = 'left 0.15s linear, top 0.15s linear';
    container.appendChild(proj);
    requestAnimationFrame(() => {
        proj.style.left = to.x + 'px';
        proj.style.top = to.y + 'px';
    });
    setTimeout(() => proj.remove(), 200);
}

function spawnSlashEffect(target) {
    const container = $('#slash-container');
    if (!container) return;
    const sc = worldToScreen(target.x, target.y);
    const count = 2 + Math.floor(Math.random() * 2);
    for (let i = 0; i < count; i++) {
        const slash = document.createElement('div');
        slash.className = 'slash-effect';
        slash.style.left = (sc.x - 20 + Math.random() * 10) + 'px';
        slash.style.top = (sc.y - 3 + Math.random() * 10 - 5) + 'px';
        slash.style.setProperty('--slash-angle', (-40 + Math.random() * 80) + 'deg');
        slash.style.width = (25 + Math.random() * 15) + 'px';
        container.appendChild(slash);
        setTimeout(() => slash.remove(), 300);
    }
}

function spawnHitBurst(target) {
    const container = $('#particle-container');
    if (!container) return;
    const sc = worldToScreen(target.x, target.y);
    const burst = document.createElement('div');
    burst.className = 'hit-burst';
    burst.style.left = sc.x + 'px';
    burst.style.top = sc.y + 'px';
    container.appendChild(burst);
    setTimeout(() => burst.remove(), 350);
}

function getEvolveColors(evolveCount) {
    const colorSets = [
        { head: ['#60a5fa', '#3b82f6'], body: ['#3b82f6', '#2563eb'], ear: ['#93c5fd', '#3b82f6'], gem: '#a855f7' },    // 初始蓝
        { head: ['#a78bfa', '#7c3aed'], body: ['#7c3aed', '#6d28d9'], ear: ['#c4b5fd', '#7c3aed'], gem: '#e879f9' },    // 练气紫
        { head: ['#c4b5fd', '#8b5cf6'], body: ['#8b5cf6', '#7c3aed'], ear: ['#ddd6fe', '#8b5cf6'], gem: '#f0abfc' },    // 筑基淡紫
        { head: ['#fbbf24', '#d97706'], body: ['#f59e0b', '#b45309'], ear: ['#fde68a', '#f59e0b'], gem: '#ef4444' },    // 金丹金色
        { head: ['#fb923c', '#ea580c'], body: ['#ea580c', '#c2410c'], ear: ['#fdba74', '#ea580c'], gem: '#fbbf24' },    // 元婴橙
        { head: ['#f43f5e', '#e11d48'], body: ['#e11d48', '#be123c'], ear: ['#fda4af', '#e11d48'], gem: '#fbbf24' },    // 化神红
        { head: ['#fde68a', '#fbbf24'], body: ['#fbbf24', '#d97706'], ear: ['#fef3c7', '#fbbf24'], gem: '#fff' },        // 渡劫金
    ];
    return colorSets[Math.min(evolveCount, colorSets.length - 1)];
}

function applyEvolveColors() {
    const colors = getEvolveColors(game.player.evolveCount);
    const root = document.documentElement;
    // 通过直接修改关键CSS元素的样式
    const head = $('.char-head');
    if (head) head.style.background = `linear-gradient(180deg, ${colors.head[0]}, ${colors.head[1]})`;
    const torso = $('.char-torso');
    if (torso) torso.style.background = `linear-gradient(180deg, ${colors.body[0]}, ${colors.body[1]})`;
    const ears = $$('.char-ear');
    ears.forEach(e => e.style.background = `linear-gradient(180deg, ${colors.ear[0]}, ${colors.ear[1]})`);
    const arms = $$('.char-arm');
    arms.forEach(a => a.style.background = colors.body[0]);
    const legs = $$('.char-leg');
    legs.forEach(l => l.style.background = colors.body[1]);
    const tail = $('.char-tail');
    if (tail) tail.style.background = colors.body[0];
    const gem = $('.char-gem');
    if (gem) { gem.style.background = `radial-gradient(circle at 35% 35%, #fff, ${colors.gem})`; gem.style.boxShadow = `0 0 8px ${colors.gem}`; }
}

function killMonster(monster) {
    const idx = game.combat.monsters.indexOf(monster);
    if (idx > -1) game.combat.monsters.splice(idx, 1);

    const monsterEl = $('#monster-' + monster.id);
    if (monsterEl) {
        spawnParticles(monsterEl, monster.color);
        const goldGain = Math.floor((monster.level * 10 + Math.random() * 50) * game.combat.goldMult);
        const expGain = Math.floor((monster.level * 5 + 10) * game.combat.expMult);
        showFloatText(monsterEl, `+${formatNum(goldGain)}💰`, 'gold');
        showFloatText(monsterEl, `+${expGain}exp`, 'exp');
        monsterEl.style.opacity = '0';
        setTimeout(() => monsterEl.remove(), 300);
        game.player.gold += goldGain;
        game.player.exp += expGain;
    }

    game.combat.killCount++;
    game.petPoints += Math.floor(monster.level * 0.5) + 1;

    // 精灵碎片
    if (Math.random() < 0.15 && typeof tryGetPetFragment === 'function') {
        tryGetPetFragment();
    }

    // 装备掉落
    tryDropEquipment(monster);

    // 药水掉落
    if (monster.isBoss || Math.random() < 0.08) {
        game.player.potions++;
        toast('🧪 获得一瓶生命药水', 'success');
    }

    // 钻石掉落（Boss）
    if (monster.isBoss) {
        const dGain = 5 + Math.floor(Math.random() * 10);
        game.player.diamonds += dGain;
        toast(`💎 获得 ${dGain} 钻石！`, 'legendary');
    }

    checkLevelUp();

    if (game.combat.killCount % 3 === 0 && !game.combat.cardSelectPending) {
        game.combat.cardSelectPending = true;
        setTimeout(showCardSelect, 500);
    }

    // 当前小地图怪物不足时补充
    const curSm = getCurrentSubMap();
    const curCount = game.combat.monsters.filter(m => m.subMapId === curSm.id).length;
    if (curCount < 15) setTimeout(() => spawnMonstersForSubMap(curSm.id, 20 - curCount), 800);
    updatePlayerUI();
    $('#kill-count').textContent = game.combat.killCount;
}

function spawnParticles(targetEl, color) {
    const container = $('#particle-container');
    const rect = targetEl.getBoundingClientRect();
    const areaRect = $('#battle-area').getBoundingClientRect();
    const cx = rect.left - areaRect.left + rect.width / 2;
    const cy = rect.top - areaRect.top + rect.height / 2;
    for (let i = 0; i < 8; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = cx + 'px'; p.style.top = cy + 'px';
        p.style.background = color;
        const angle = (Math.PI * 2 / 8) * i;
        const dist = 30 + Math.random() * 30;
        p.style.setProperty('--px', Math.cos(angle) * dist + 'px');
        p.style.setProperty('--py', Math.sin(angle) * dist + 'px');
        container.appendChild(p);
        setTimeout(() => p.remove(), 600);
    }
}

function shakeScreen() {
    const area = $('#battle-area');
    area.classList.add('shake');
    setTimeout(() => area.classList.remove('shake'), 300);
}

function healPlayer() {
    const healAmt = Math.floor(game.player.recovery);
    game.player.hp = Math.min(game.player.maxHp, game.player.hp + healAmt);
    game.combat.recCounter++;
    updateRecCounter();
    if (healAmt > 0) showFloatText($('#player-char'), `+${formatNum(healAmt)}`, 'heal');
    updatePlayerUI();
}

// ========== 技能系统 ==========
function useSkill(skillIdx) {
    if (game.combat.skillCds[skillIdx] > 0) return;
    const skill = SKILLS[skillIdx];
    if (game.player.level < skill.unlockLevel) { toast('技能未解锁', 'warning'); return; }

    game.combat.skillCds[skillIdx] = skill.maxCd;
    $(`#btn-skill-${skillIdx + 1}`).classList.add('on-cooldown');

    if (skillIdx === 0) { // 火球
        const overlay = $('#fire-overlay');
        overlay.classList.add('active');
        setTimeout(() => overlay.classList.remove('active'), 500);
        shakeScreen();
        const dmg = Math.floor(game.player.attack * skill.mult);
        game.combat.monsters.forEach(m => {
            m.hp -= dmg;
            const el = $('#monster-' + m.id);
            if (el) showFloatText(el, `-${formatNum(dmg)}🔥`, 'crit');
        });
        setTimeout(() => { game.combat.monsters.filter(m => m.hp <= 0).forEach(killMonster); updatePlayerUI(); }, 300);
    } else if (skillIdx === 1) { // 冰冻
        const dmg = Math.floor(game.player.attack * skill.mult);
        game.combat.monsters.forEach(m => {
            m.hp -= dmg;
            const el = $('#monster-' + m.id);
            if (el) { showFloatText(el, `-${formatNum(dmg)}❄`, 'crit'); el.style.filter = 'hue-rotate(180deg)'; setTimeout(() => el.style.filter = '', 3000); }
        });
        setTimeout(() => { game.combat.monsters.filter(m => m.hp <= 0).forEach(killMonster); updatePlayerUI(); }, 300);
    } else if (skillIdx === 2) { // 治愈
        const heal = Math.floor(game.player.maxHp * 0.5);
        game.player.hp = Math.min(game.player.maxHp, game.player.hp + heal);
        showFloatText($('#player-char'), `+${formatNum(heal)}💚`, 'heal');
        updatePlayerUI();
    } else if (skillIdx === 3) { // 雷电
        if (game.combat.monsters.length > 0) {
            const target = game.combat.monsters[0];
            const dmg = Math.floor(game.player.attack * skill.mult);
            target.hp -= dmg;
            const el = $('#monster-' + target.id);
            if (el) showFloatText(el, `-${formatNum(dmg)}⚡`, 'crit');
            shakeScreen();
            if (target.hp <= 0) killMonster(target);
            updatePlayerUI();
        }
    }
    toast(`${skill.icon} ${skill.name}！`, 'info');
}

function startSkillCdLoop() {
    if (game.combat.skillCdTimer) clearInterval(game.combat.skillCdTimer);
    game.combat.skillCdTimer = setInterval(() => {
        for (let i = 0; i < 4; i++) {
            if (game.combat.skillCds[i] > 0) {
                game.combat.skillCds[i] = Math.max(0, game.combat.skillCds[i] - 0.1);
                const cdEl = $(`#skill-cd-${i}`);
                if (cdEl) cdEl.textContent = game.combat.skillCds[i].toFixed(1);
                if (game.combat.skillCds[i] <= 0) {
                    $(`#btn-skill-${i + 1}`).classList.remove('on-cooldown');
                    if (cdEl) cdEl.textContent = '0.0';
                }
            }
        }
    }, 100);
}

// ========== 计时器 ==========
function startTimerLoop() {
    if (game.timer.interval) clearInterval(game.timer.interval);
    game.timer.interval = setInterval(() => {
        game.timer.remaining--;
        game.combat.timeCounter++;
        if (game.combat.timeCounter >= game.combat.timeInterval) {
            game.combat.timeCounter = 0;
            game.player.gold += Math.floor(game.player.level * 5 * game.combat.goldMult);
        }
        updateTimeCounter();
        $('#remain-time').textContent = game.timer.remaining;
        if (game.timer.remaining <= 0) endBattle();
    }, 1000);
}

function endBattle() {
    clearInterval(game.combat.atkTimer);
    clearInterval(game.timer.interval);
    if (game.combat.skillCdTimer) clearInterval(game.combat.skillCdTimer);
    if (game.monsterSpawn) { clearInterval(game.monsterSpawn); game.monsterSpawn = null; }
    if (game.movement.moveLoop) cancelAnimationFrame(game.movement.moveLoop);
    game.state = 'island';
    document.onkeydown = null; document.onkeyup = null;
    const kills = game.combat.killCount;
    game.timer.remaining = 12000;
    game.combat.killCount = 0;
    game.combat.atkCounter = 0;
    game.combat.recCounter = 0;
    game.combat.monsters = [];
    toast(`战斗结束！击杀 ${kills}，获得 ${formatNum(game.player.gold)} 金币`, 'info');
    showScreen('island-select');
}

// ========== 升级 ==========
function checkLevelUp() {
    while (game.player.exp >= game.player.expToNext) {
        game.player.exp -= game.player.expToNext;
        game.player.level++;
        game.player.expToNext = Math.floor(game.player.expToNext * 1.15 + 5);
        game.player.maxHp += Math.floor(12 + game.player.level * 2);
        game.player.hp = game.player.maxHp;
        game.player.attack += Math.floor(3 + game.player.level * 0.5);
        game.player.defense += Math.floor(2 + game.player.level * 0.3);
        game.player.recovery += Math.floor(1 + game.player.level * 0.1);
        game.player.talentPoints++;
        toast(`🎉 升级！等级 ${game.player.level}`, 'success');
        if (game.player.level >= game.player.evolveLevel) triggerEvolution();
        // 解锁技能提示
        SKILLS.forEach((sk, i) => {
            if (game.player.level === sk.unlockLevel && sk.unlockLevel > 1) {
                toast(`🔓 解锁技能: ${sk.name}`, 'legendary');
                $(`#btn-skill-${i + 1}`).classList.remove('locked');
                $(`#skill-cd-${i}`).textContent = '0.0';
            }
        });
    }
    updatePlayerUI();
}

function triggerEvolution() {
    game.player.evolveCount++;
    game.player.evolveLevel = game.player.level + 10 + game.player.evolveCount * 5;
    game.player.maxHp = Math.floor(game.player.maxHp * 1.5);
    game.player.hp = game.player.maxHp;
    game.player.attack = Math.floor(game.player.attack * 1.3);
    game.player.defense = Math.floor(game.player.defense * 1.3);
    game.player.recovery = Math.floor(game.player.recovery * 1.2);
    game.player.diamonds += 10;
    const modal = $('#evolve-modal');
    modal.classList.add('active');
    $('#evolve-title').textContent = `进化成功！→ ${getRealmName()}`;
    $('#evolve-desc').textContent = `等级 ${game.player.level}\n生命上限×1.5  攻击力×1.3\n获得 10 钻石💎`;
    shakeScreen();
    toast(`🌟 突破至${getRealmName()}！`, 'legendary');
    // 更新进化配色和光环
    applyEvolveColors();
    $('#char-aura').classList.add('active');
}

// ========== 卡牌选择 ==========
function showCardSelect() {
    const modal = $('#card-select-modal');
    const options = $('#card-options');
    options.innerHTML = '';
    const shuffled = [...CARD_POOL].sort(() => Math.random() - 0.5);
    const picks = shuffled.slice(0, 3);

    picks.forEach(card => {
        const div = document.createElement('div');
        div.className = 'card-option' + (card.rarity !== 'normal' ? ' rarity-' + card.rarity : '');
        const rarityLabel = { normal: '', rare: '<span style="color:#38bdf8">稀有</span>', epic: '<span style="color:#a855f7">史诗</span>', legendary: '<span style="color:#fbbf24">传说</span>' };
        div.innerHTML = `
            <div class="card-icon ${card.type}">${card.icon}</div>
            <div class="card-rarity">${rarityLabel[card.rarity] || ''}</div>
            <div class="card-name">${card.name}</div>
            <div class="card-desc">${card.desc}</div>
            <button class="card-select-btn">选择</button>
        `;
        div.querySelector('.card-select-btn').addEventListener('click', (e) => { e.stopPropagation(); selectCard(card); });
        div.addEventListener('click', () => selectCard(card));
        options.appendChild(div);
    });
    modal.classList.add('active');
}

function selectCard(card) {
    switch (card.stat) {
        case 'attack': game.player.attack += card.value; break;
        case 'defense': game.player.defense += card.value; break;
        case 'recovery': game.player.recovery = Math.floor(game.player.recovery * (1 + card.value)); break;
        case 'maxHp': game.player.maxHp += card.value; game.player.hp = Math.min(game.player.hp + card.value, game.player.maxHp); break;
        case 'attackSpeed': game.player.attackSpeed += card.value; startCombatLoop(); break;
        case 'evasion': game.player.evasion += card.value; break;
    }
    toast(`✅ 获得 ${card.name}`, card.rarity === 'legendary' ? 'legendary' : 'success');
    closeCardSelect();
    updatePlayerUI();
}

function closeCardSelect() { $('#card-select-modal').classList.remove('active'); game.combat.cardSelectPending = false; }

// ========== 装备掉落 ==========
function tryDropEquipment(monster) {
    const dropRate = monster.isBoss ? 0.8 : 0.12;
    if (Math.random() >= dropRate) return;
    const pool = EQUIPMENT_POOL.filter(eq => {
        const lvl = monster.level;
        if (eq.rarity === 'legendary' && lvl < 100) return false;
        if (eq.rarity === 'epic' && lvl < 50) return false;
        if (eq.rarity === 'rare' && lvl < 20) return false;
        return true;
    });
    if (pool.length === 0) return;
    const item = { ...pool[Math.floor(Math.random() * pool.length)] };
    const currentSlot = game.player.equipment[item.slot];
    const score = getEquipmentScore;
    if (!currentSlot || score(item) > score(currentSlot)) {
        game.player.equipment[item.slot] = item;
        toast(`🎁 获得装备: ${item.icon} ${item.name} [自动装备]`, item.rarity === 'legendary' ? 'legendary' : 'success');
        updatePlayerUI();
    } else {
        toast(`🎁 获得装备: ${item.icon} ${item.name}（已有更好）`, 'info');
    }
}

// ========== 药水系统 ==========
function usePotion() {
    if (game.player.potions <= 0) { toast('没有药水了', 'warning'); return; }
    const eff = getEffectivePlayerStats();
    if (game.player.hp >= eff.maxHp) { toast('生命已满', 'info'); return; }
    game.player.potions--;
    const heal = Math.floor(eff.maxHp * 0.4);
    game.player.hp = Math.min(eff.maxHp, game.player.hp + heal);
    showFloatText($('#player-char'), `+${formatNum(heal)}❤️`, 'heal');
    updatePlayerUI();
    toast(`🧪 使用药水，恢复${formatNum(heal)}生命`, 'success');
}

function updatePotionUI() {
    const el = $('#potion-count');
    if (el) el.textContent = game.player.potions;
}

// ========== 角色详情面板 ==========
function openCharacterPanel() {
    const modal = $('#character-modal');
    const p = game.player;
    const eff = getEffectivePlayerStats();
    document.getElementById('char-detail-name').textContent = p.name;
    document.getElementById('char-detail-realm').textContent = getRealmName();
    document.getElementById('char-detail-level').textContent = `等级 ${p.level}`;
    document.getElementById('char-detail-hp').textContent = `${Math.floor(p.hp)} / ${formatNum(eff.maxHp)}`;
    document.getElementById('char-detail-atk').textContent = `${eff.attack} (基础 ${p.attack})`;
    document.getElementById('char-detail-def').textContent = `${eff.defense} (基础 ${p.defense})`;
    document.getElementById('char-detail-rec').textContent = p.recovery;
    document.getElementById('char-detail-spd').textContent = Math.floor(p.attackSpeed * 100) + '%';
    document.getElementById('char-detail-eva').textContent = Math.floor(p.evasion * 100) + '%';
    document.getElementById('char-detail-gold').textContent = formatNum(p.gold);
    document.getElementById('char-detail-diamonds').textContent = p.diamonds;
    document.getElementById('char-detail-evolve').textContent = `${getRealmName()} (${p.evolveCount}转)`;
    document.getElementById('char-detail-kills').textContent = game.combat.killCount;
    // 装备展示
    const eqContainer = document.getElementById('char-detail-equipment');
    eqContainer.innerHTML = '';
    EQUIPMENT_SLOTS.forEach(slot => {
        const item = game.player.equipment[slot];
        const div = document.createElement('div');
        div.className = 'eq-slot';
        if (item) {
            div.innerHTML = `<span class="eq-icon">${item.icon}</span>
                <span class="eq-name" style="color:${RARITY_COLORS[item.rarity] || '#fff'}">${item.name}</span>
                <span class="eq-stats">${Object.entries(item.stats).map(([k,v]) => `${k==='attack'?'攻击':k==='defense'?'防御':'生命'}+${v}`).join(' ')}</span>`;
        } else {
            div.innerHTML = `<span class="eq-icon">❌</span><span class="eq-name" style="color:#666">${SLOT_NAMES[slot]}</span><span class="eq-stats">空</span>`;
        }
        eqContainer.appendChild(div);
    });
    modal.classList.add('active');
}

// ========== UI ==========
function updatePlayerUI() {
    const p = game.player;
    const eff = getEffectivePlayerStats();
    $('#player-name').textContent = p.name;
    $('#player-realm').textContent = getRealmName();
    $('#stat-level').textContent = p.level;
    const dAtk = eff.attack - p.attack;
    $('#stat-atk').textContent = formatNum(eff.attack) + (dAtk > 0 ? `+${dAtk}` : '');
    const dDef = eff.defense - p.defense;
    $('#stat-def').textContent = formatNum(eff.defense) + (dDef > 0 ? `+${dDef}` : '');
    $('#stat-rec').textContent = formatNum(p.recovery);
    $('#stat-spd').textContent = Math.floor(p.attackSpeed * 100) + '%';
    $('#stat-eva').textContent = Math.floor(p.evasion * 100) + '%';
    $('#stat-hp').textContent = formatNum(eff.maxHp);
    const hpPct = Math.max(0, Math.min(100, (p.hp / eff.maxHp) * 100));
    $('#hp-fill').style.width = hpPct + '%';
    $('#hp-text').textContent = `${Math.floor(p.hp)}/${formatNum(eff.maxHp)}`;
    const evolvePct = (p.level / p.evolveLevel) * 100;
    $('#evolve-fill').style.width = Math.min(100, evolvePct) + '%';
    $('#evolve-text').textContent = `${p.level}/${p.evolveLevel}级可进化`;
    $('#gold-text').textContent = formatNum(p.gold);
    $('#diamond-text').textContent = p.diamonds;
    // 更新药水显示
    updatePotionUI();
}

function updateAtkCounter() { const c = game.combat; $('#atk-counter').textContent = `${c.atkCounter % c.atkInterval}/${c.atkInterval}`; }
function updateRecCounter() { const c = game.combat; $('#rec-counter').textContent = `${c.recCounter % c.recInterval}/${c.recInterval}`; }
function updateTimeCounter() { const c = game.combat; $('#time-counter').textContent = `${c.timeCounter}/${c.timeInterval}`; }

function formatNum(n) { if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M'; if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K'; return Math.floor(n).toString(); }

function showFloatText(targetEl, text, type) {
    if (!targetEl) return;
    const container = $('#float-text-container');
    const rect = targetEl.getBoundingClientRect();
    const parentRect = targetEl.closest('.battle-area').getBoundingClientRect();
    const el = document.createElement('div');
    el.className = 'float-text ' + type;
    el.textContent = text;
    el.style.left = (rect.left - parentRect.left + rect.width / 2 + (Math.random() - 0.5) * 30) + 'px';
    el.style.top = (rect.top - parentRect.top - 10) + 'px';
    container.appendChild(el);
    setTimeout(() => el.remove(), 1000);
}

function getRealmName() {
    const realms = ['练气期', '筑基期', '金丹期', '元婴期', '化神期', '大乘期', '渡劫期'];
    return realms[Math.min(game.player.evolveCount, realms.length - 1)];
}

// ========== 事件绑定 ==========
function initEvents() {
    $('#auto-attack').addEventListener('change', (e) => { game.combat.autoAttack = e.target.checked; });
    $('#btn-evolve-ok').addEventListener('click', () => $('#evolve-modal').classList.remove('active'));
    $('#btn-auto-select').addEventListener('click', () => {
        const options = $$('.card-option');
        if (options.length > 0) options[Math.floor(Math.random() * options.length)].querySelector('.card-select-btn').click();
    });

    // 技能按钮
    for (let i = 0; i < 4; i++) {
        $(`#btn-skill-${i + 1}`).addEventListener('click', () => useSkill(i));
    }

    // 底部按钮
    $('#btn-gacha').addEventListener('click', () => { if (typeof openGacha === 'function') openGacha(); });
    $('#btn-talent').addEventListener('click', () => { if (typeof openTalent === 'function') openTalent(); });
    $('#btn-skill').addEventListener('click', () => openSkillList());
    $('#btn-pet').addEventListener('click', () => { if (typeof openPet === 'function') openPet(); });
    $('#btn-break').addEventListener('click', () => { if (typeof openCoreCards === 'function') openCoreCards(); else toast(`当前境界: ${getRealmName()}`, 'info'); });
    $('#btn-shop').addEventListener('click', () => { if (typeof openShop === 'function') openShop(); });
    $('#btn-character').addEventListener('click', openCharacterPanel);
    $('#btn-char-detail').addEventListener('click', openCharacterPanel);

    // 药水按钮
    $('#btn-potion').addEventListener('click', usePotion);

    // 角色面板关闭
    $('#character-modal .modal-overlay').addEventListener('click', () => $('#character-modal').classList.remove('active'));
    $('#char-detail-close').addEventListener('click', () => $('#character-modal').classList.remove('active'));

    // 设置
    $('#btn-settings-island').addEventListener('click', () => $('#settings-modal').classList.add('active'));
    $('#btn-save').addEventListener('click', saveGame);
    $('#btn-load').addEventListener('click', () => { if (loadGame()) updatePlayerUI(); });
    $('#btn-reset').addEventListener('click', resetGame);

    // 通用关闭按钮
    $$('[data-close]').forEach(el => {
        el.addEventListener('click', () => {
            const id = el.getAttribute('data-close');
            $('#' + id).classList.remove('active');
        });
    });

    // 全屏地图切换
    const fsBtn = $('#btn-fullscreen');
    if (fsBtn) {
        fsBtn.addEventListener('click', () => {
            const screen = $('#battle-screen');
            const isFull = screen.classList.toggle('map-fullscreen');
            fsBtn.textContent = isFull ? '✕' : '⛶';
            fsBtn.title = isFull ? '退出全屏' : '全屏地图';
            // 调整相机大小
            updateCamera();
            // 浏览器全屏
            const area = $('#battle-area');
            if (isFull && area.requestFullscreen) {
                area.requestFullscreen().catch(() => {});
            } else if (document.exitFullscreen) {
                document.exitFullscreen().catch(() => {});
            }
        });
        // 监听浏览器全屏退出（按ESC时同步状态）
        document.addEventListener('fullscreenchange', () => {
            const screen = $('#battle-screen');
            if (!document.fullscreenElement && screen.classList.contains('map-fullscreen')) {
                screen.classList.remove('map-fullscreen');
                fsBtn.textContent = '⛶';
                fsBtn.title = '全屏地图';
                updateCamera();
            }
        });
    }
}

function openSkillList() {
    const list = $('#skill-list');
    list.innerHTML = '';
    SKILLS.forEach((sk, i) => {
        const locked = game.player.level < sk.unlockLevel;
        const item = document.createElement('div');
        item.className = 'skill-item' + (locked ? ' locked' : '');
        const lv = Math.max(1, Math.floor(game.player.level / sk.unlockLevel));
        item.innerHTML = `
            <div class="si-icon">${sk.icon}</div>
            <div class="si-info">
                <div class="si-name">${sk.name} ${locked ? '(Lv.' + sk.unlockLevel + '解锁)' : ''}</div>
                <div class="si-desc">${sk.desc}</div>
                <div class="si-lv">等级: ${locked ? '-' : lv} | CD: ${sk.maxCd}秒</div>
            </div>
            ${!locked ? `<button class="si-btn" data-idx="${i}">升级 ${sk.upgradeCost}💰</button>` : ''}
        `;
        list.appendChild(item);
    });
    list.querySelectorAll('.si-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.idx);
            const sk = SKILLS[idx];
            if (game.player.gold >= sk.upgradeCost) {
                game.player.gold -= sk.upgradeCost;
                sk.mult += 0.5;
                sk.upgradeCost = Math.floor(sk.upgradeCost * 1.5);
                toast(`${sk.name} 升级成功！`, 'success');
                openSkillList();
                updatePlayerUI();
            } else {
                toast('金币不足', 'warning');
            }
        });
    });
    $('#skill-modal').classList.add('active');
}

// ========== 初始化 ==========
function init() {
    initIslandSelect();
    initEvents();
    // 尝试加载存档
    const raw = localStorage.getItem('xiuxian_save');
    if (raw) {
        loadGame();
        updatePlayerUI();
    }
    // 解锁初始技能
    SKILLS.forEach((sk, i) => {
        if (game.player.level >= sk.unlockLevel) {
            $(`#btn-skill-${i + 1}`).classList.remove('locked');
            $(`#skill-cd-${i}`).textContent = '0.0';
        }
    });
}

window.addEventListener('DOMContentLoaded', init);

// ========== 商城系统 ==========
function openShop() {
    $('#shop-diamonds').textContent = game.player.diamonds;
    // Update button states
    if (game.shop.monthly) {
        $('#btn-buy-monthly').textContent = '已激活';
        $('#btn-buy-monthly').classList.add('activated');
        $('#btn-buy-monthly').disabled = true;
    }
    if (game.shop.lifetime) {
        $('#btn-buy-lifetime').textContent = '已激活';
        $('#btn-buy-lifetime').classList.add('activated');
        $('#btn-buy-lifetime').disabled = true;
    }
    if (game.shop.monthly && game.shop.lifetime) {
        $('#combo-status').textContent = '已激活 ✅';
        $('#combo-status').classList.add('active');
    }
    if (game.shop.dailyClaimed) {
        $('#btn-daily-claim').textContent = '已领取';
        $('#btn-daily-claim').disabled = true;
    }
    $('#shop-modal').classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    $('#btn-daily-claim').addEventListener('click', () => {
        if (game.shop.dailyClaimed) { toast('今日已领取', 'warning'); return; }
        game.shop.dailyClaimed = true;
        game.player.gold += 500;
        game.petPoints += 20;
        toast('🍀 领取成功！+500金币 +20精灵积分', 'success');
        $('#btn-daily-claim').textContent = '已领取';
        $('#btn-daily-claim').disabled = true;
        updatePlayerUI();
    });

    $('#btn-buy-monthly').addEventListener('click', () => {
        if (game.shop.monthly) { toast('月卡已激活', 'warning'); return; }
        if (game.player.diamonds < 300) { toast('钻石不足！', 'error'); return; }
        game.player.diamonds -= 300;
        game.shop.monthly = true;
        game.combat.expMult += 0.3;
        game.timer.remaining += 2400;
        toast('🌙 月卡激活成功！经验+30%', 'legendary');
        checkCombo();
        openShop();
        updatePlayerUI();
    });

    $('#btn-buy-lifetime').addEventListener('click', () => {
        if (game.shop.lifetime) { toast('终身卡已激活', 'warning'); return; }
        if (game.player.diamonds < 980) { toast('钻石不足！', 'error'); return; }
        game.player.diamonds -= 980;
        game.shop.lifetime = true;
        game.combat.goldMult += 0.3;
        game.timer.remaining += 2400;
        toast('☀️ 终身卡激活成功！金币+30%', 'legendary');
        checkCombo();
        openShop();
        updatePlayerUI();
    });
});

function checkCombo() {
    if (game.shop.monthly && game.shop.lifetime) {
        game.player.attack += 1000;
        game.player.name = '异界行者';
        toast('🏆 异界行者称号激活！攻击+1000', 'legendary');
        updatePlayerUI();
    }
}

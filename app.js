// ==========================================================================
// 1. 完美對齊：依據您的三張最新圖片，注入極限啟蒙 1-10 級、傲慢 1-31 級乘數
// ==========================================================================
const POEDB = {
    vitality: { 1: 28, 2: 40, 3: 51, 4: 63, 5: 74, 6: 85, 7: 96, 8: 108, 9: 118, 10: 128, 11: 138, 12: 147, 13: 157, 14: 166, 15: 175, 16: 184, 17: 193, 18: 201, 19: 210, 20: 219, 21: 227, 22: 236, 23: 244, 24: 253, 25: 261, 26: 270, 27: 278, 28: 287, 29: 295, 30: 304, 31: 312, 32: 321, 33: 329, 34: 338, 35: 346 },
    precision: { 1: 22, 2: 32, 3: 40, 4: 50, 5: 59, 6: 68, 7: 76, 8: 86, 9: 94, 10: 102, 11: 110, 12: 118, 13: 126, 14: 133, 15: 141, 16: 148, 17: 155, 18: 162, 19: 169, 20: 176, 21: 183, 22: 190, 23: 197, 24: 204, 25: 211, 26: 217, 27: 224, 28: 230, 29: 237, 30: 243, 31: 249, 32: 256, 33: 262, 34: 269, 35: 275 },
    clarity: { 1: 34, 2: 48, 3: 61, 4: 76, 5: 89, 6: 102, 7: 115, 8: 129, 9: 141, 10: 154, 11: 166, 12: 178, 13: 190, 14: 203, 15: 215, 16: 227, 17: 239, 18: 251, 19: 263, 20: 275, 21: 287, 22: 298, 23: 310, 24: 321, 25: 333, 26: 344, 27: 355, 28: 366, 29: 377, 30: 388, 31: 399, 32: 410, 33: 421, 34: 431, 35: 442 },

    // 啟蒙 1-10 級保留加成對照表 (依照您上傳的圖片：1-2等100%, 3-4等92%/88%, 5-10等每級遞減4%)
    enlighten: { 0: 1.0, 1: 1.0, 2: 1.0, 3: 0.92, 4: 0.88, 5: 0.84, 6: 0.80, 7: 0.76, 8: 0.72, 9: 0.68, 10: 0.64 },

    // 傲慢輔助 1-31 等級乘數對照表
    arrogance: {
        0: 1.0, 1: 2.20, 2: 2.19, 3: 2.18, 4: 2.17, 5: 2.16, 6: 2.15, 7: 2.14, 8: 2.13, 9: 2.12, 10: 2.11,
        11: 2.10, 12: 2.09, 13: 2.08, 14: 2.07, 15: 2.06, 16: 2.05, 17: 2.04, 18: 2.03, 19: 2.02, 20: 2.01,
        21: 2.00, 22: 1.99, 23: 1.98, 24: 1.97, 25: 1.96, 26: 1.95, 27: 1.94, 28: 1.93, 29: 1.92, 30: 1.91, 31: 1.91
    }
};

// 2. 依照您提供的「首頁.csv」與百分比分組，重新整理完整名冊
const AURA_CONFIG = [
    { group: "50%", id: "determination", name: "🛡️ 堅定", base: 50 },
    { group: "50%", id: "grace", name: "🏃 優雅", base: 50 },
    { group: "50%", id: "hatred", name: "❄️ 憎恨", base: 50 },
    { group: "50%", id: "wrath", name: "⚡ 雷霆", base: 50 },
    { group: "50%", id: "anger", name: "🔥 憤怒", base: 50 },
    { group: "50%", id: "zealotry", name: "👁️ 狂熱", base: 50 },
    { group: "50%", id: "purity-elements", name: "🌈 元素淨化", base: 50 },
    { group: "50%", id: "haste", name: "💨 迅捷", base: 50 },
    { group: "50%", id: "pride", name: "👑 驕傲", base: 50 },

    { group: "35%", id: "purity-ice", name: "🧊 冰霜淨化", base: 35 },
    { group: "35%", id: "purity-fire", name: "❤️ 火焰淨化", base: 35 },
    { group: "35%", id: "purity-lightning", name: "⚡ 閃電淨化", base: 35 },
    { group: "35%", id: "discipline", name: "🛡️ 紀律", base: 35 },
    { group: "35%", id: "petrified-blood", name: "🩸 石化之血", base: 35 },
    { group: "35%", id: "skitterbots", name: "🕷️ 召喚探測機獸", base: 35 },
    { group: "35%", id: "blasphemy", name: "🔮 詛咒光環", base: 35 },

    // 異界詛咒光環區 (完全去掉「輔助」二字)
    { group: "34%", id: "c34-1", name: "💀 異界詛咒光環 1", base: 34 }, { group: "34%", id: "c34-2", name: "💀 異界詛咒光環 2", base: 34 }, { group: "34%", id: "c34-3", name: "💀 異界詛咒光環 3", base: 34 }, { group: "34%", id: "c34-4", name: "💀 異界詛咒光環 4", base: 34 }, { group: "34%", id: "c34-5", name: "💀 異界詛咒光環 5", base: 34 },
    { group: "33%", id: "c33-1", name: "💀 異界詛咒光環 1", base: 33 }, { group: "33%", id: "c33-2", name: "💀 異界詛咒光環 2", base: 33 }, { group: "33%", id: "c33-3", name: "💀 異界詛咒光環 3", base: 33 }, { group: "33%", id: "c33-4", name: "💀 異界詛咒光環 4", base: 33 }, { group: "33%", id: "c33-5", name: "💀 異界詛咒光環 5", base: 33 },
    { group: "32%", id: "c32-1", name: "💀 異界詛咒光環 1", base: 32 }, { group: "32%", id: "c32-2", name: "💀 異界詛咒光環 2", base: 32 }, { group: "32%", id: "c32-3", name: "💀 異界詛咒光環 3", base: 32 }, { group: "32%", id: "c32-4", name: "💀 異界詛咒光環 4", base: 32 }, { group: "32%", id: "c32-5", name: "💀 異界詛咒光環 5", base: 32 },
    { group: "31%", id: "c31-1", name: "💀 異界詛咒光環 1", base: 31 }, { group: "31%", id: "c31-2", name: "💀 異界詛咒光環 2", base: 31 }, { group: "31%", id: "c31-3", name: "💀 異界詛咒光環 3", base: 31 }, { group: "31%", id: "c31-4", name: "💀 異界詛咒光環 4", base: 31 }, { group: "31%", id: "c31-5", name: "💀 異界詛咒光環 5", base: 31 },
    { group: "30%", id: "c30-1", name: "💀 異界詛咒光環 1", base: 30 }, { group: "30%", id: "c30-2", name: "💀 異界詛咒光環 2", base: 30 }, { group: "30%", id: "c30-3", name: "💀 異界詛咒光環 3", base: 30 }, { group: "30%", id: "c30-4", name: "💀 異界詛咒光環 4", base: 30 }, { group: "30%", id: "c30-5", name: "💀 異界詛咒光環 5", base: 30 },

    { group: "25%", id: "herald-ash", name: "🔥 灰燼之捷", base: 25 },
    { group: "25%", id: "herald-purity", name: "⚔️ 純淨之捷", base: 25 },
    { group: "25%", id: "herald-ice", name: "❄️ 冰霜之捷", base: 25 },
    { group: "25%", id: "herald-agony", name: "🦂 苦痛之捷", base: 25 },
    { group: "25%", id: "herald-thunder", name: "⚡ 閃電之捷", base: 25 },
    { group: "25%", id: "spider-blessing", name: "🕷️ 毒蛛祝福", base: 25 },
    { group: "25%", id: "avian-blessing", name: "🦅 飛羽祝福", base: 25 },
    { group: "25%", id: "cat-blessing", name: "🐱 傲貓祝福", base: 25 },
    { group: "25%", id: "crab-blessing", name: "🦀 蟹將祝福", base: 25 },
    { group: "25%", id: "arctic-armour", name: "❄️ 極地裝甲", base: 25 },
    { group: "25%", id: "tempest-shield", name: "⚡ 暴風之盾", base: 25 },
    { group: "25%", id: "flesh-bone", name: "🦴 血肉骸骨", base: 25 }, // 改稱血肉骸骨

    { group: "10%", id: "blood-sand", name: "⏳ 血腥沙戮", base: 10 },
    { group: "10%", id: "temporal-rift", name: "🌀 時空裂隙", base: 10 },
    { group: "10%", id: "war-banner", name: "🚩 戰爭之旗", base: 10 },
    { group: "10%", id: "defiance-banner", name: "🛡️ 反抗之旗", base: 10 },
    { group: "10%", id: "dread-banner", name: "☠️ 恐懼之旗", base: 10 } // 補齊恐懼之旗
];

// 3. 完美對齊裝備來源.csv 原始列表
const GEAR_DB = {
    "項鍊": [{ name: "無", mres: 0, lres: 0, val: 0 }, { name: "稀有項鍊(追憶上詞)", mres: 12, lres: 0, val: 12 }, { name: "稀有項鍊(救贖詞)", mres: 12, lres: 0, val: 12 }],
    "頭盔": [{ name: "無", mres: 0, lReserve: 0, val: 0 }, { name: "稀有頭(救贖詞+瓦詞)", mres: 14, lres: 0, val: 14 }, { name: "傳奇詞(極地之嗥)+瓦詞", mres: 16, lres: 0, val: 16 }],
    "胸甲": [{ name: "無", mres: 0, lres: 0, val: 0 }, { name: "稀有胸甲(精髓詞+紅王上詞)", mres: 10, lres: 0, val: 10 }],
    "手套": [{ name: "無", mres: 0, lres: 0, val: 0 }],
    "鞋子": [{ name: "無", mres: 0, lres: 0, val: 0 }, { name: "傳奇詞(空向)", mres: 12, lres: 0, val: 12 }],
    "武器": [{ name: "無", mres: 0, lres: 0, val: 0 }], "盾牌": [{ name: "無", mres: 0, lres: 0, val: 0 }],
    "戒指1": [{ name: "無", mres: 0, lres: 0, val: 0 }], "戒指2": [{ name: "無", mres: 0, lres: 0, val: 0 }],
    "腰帶": [{ name: "無", mres: 0, lres: 0, val: 0 }],
    "戰亂珠寶": [{ name: "優雅的高傲", mres: 40, lres: 0, val: 40 }],
    "星團珠寶": [{ name: "25%效果", mres: 21, lres: 0, val: 21 }, { name: "35%效果", mres: 24, lres: 0, val: 24 }],
    "基礎珠寶(魔保3%)": [{ name: "基礎珠寶數量", mres: 3, lres: 0, val: 5 }], // 數量自填乘數連動
    "全身含瓦詞珠寶": [{ name: "瓦詞珠寶數量", mres: 2, lres: 2, val: 5 }]
};

// 4. 完美對齊天賦來源.csv 拆解分支
const TREE_DB = [
    { id: "sov-1", name: "老頭左上-主權分支1", mres: 8, lres: 0 },
    { id: "sov-2", name: "老頭左上-主權分支2", mres: 8, lres: 0 },
    { id: "sov-3", name: "老頭左上-主權大點", mres: 12, lres: 0 },
    { id: "cha-1", name: "貴族右上-修飾分支1", mres: 8, lres: 0 },
    { id: "cha-2", name: "貴族右上-修飾大點", mres: 16, lres: 0 },
    { id: "eff-1", name: "刺客右上-效率小點", mres: 8, lres: 0 },
    { id: "duel-1", name: "決鬥者右下-大點分支", mres: 8, lres: 8 },
    { id: "mastery-1", name: "魔力專精-保留效用", mres: 12, lres: 0 },
    { id: "mastery-2", name: "保留專精-非詛咒光環", mres: 12, lres: 0 }
];

// 初始化並動態生成上表與下拉選項
function renderCalculatorTable() {
    const tbody = document.getElementById("pct-auras-tbody");
    if (!tbody) return;
    tbody.innerHTML = "";

    // 依據保留百分比分組，動態合併左側標籤
    const groups = ["50%", "35%", "34%", "33%", "32%", "31%", "30%", "25%", "10%"];
    groups.forEach(gName => {
        const rowsInGroup = AURA_CONFIG.filter(a => a.group === gName);
        rowsInGroup.forEach((aura, idx) => {
            let tr = document.createElement("tr");
            tr.className = "pct-row";
            tr.id = `row-${aura.id}`;
            tr.setAttribute("data-base", aura.base);
            if (aura.id.startsWith("c3") || aura.id === "blasphemy") {
                tr.setAttribute("data-is-curse", "true");
            }

            let groupTd = "";
            if (idx === 0) {
                groupTd = `<td class="left-group-label" rowspan="${rowsInGroup.length}">${gName}</td>`;
            }

            tr.innerHTML = `
                ${groupTd}
                <td class="aura-title">${aura.name}</td>
                <td class="td-yellow"><input type="checkbox" id="chk-${aura.id}"></td>
                <td class="td-yellow"><input type="number" id="eff-${aura.id}" value="0"></td>
                <td class="td-yellow"><select id="enl-${aura.id}"></select></td>
                <td class="td-yellow"><input type="number" id="mult-${aura.id}" value="100"></td>
                <td class="td-yellow"><select id="arr-${aura.id}"></select></td>
                <td class="td-yellow"><input type="number" id="sup-${aura.id}" value="1"></td>
                <td class="cost-life-td" id="cost-life-${aura.id}">-</td>
                <td class="cost-mana-td" id="cost-mana-${aura.id}">-</td>
            `;
            tbody.appendChild(tr);
        });
    });

    // 為所有下拉選單（包含固定值）灌入 1-10 級啟蒙 與 1-31 級傲慢
    document.querySelectorAll('select[id^="enl-"]').forEach(select => {
        select.innerHTML = '<option value="0" selected>無</option>';
        for (let i = 1; i <= 10; i++) select.innerHTML += `<option value="${i}">${i}</option>`;
    });
    document.querySelectorAll('select[id^="arr-"]').forEach(select => {
        select.innerHTML = '<option value="0" selected>無</option>';
        for (let i = 1; i <= 31; i++) select.innerHTML += `<option value="${i}">${i}</option>`;
    });
}

function initSubPages() {
    const gearBody = document.getElementById("gear-table-body");
    if (gearBody) {
        gearBody.innerHTML = "";
        Object.keys(GEAR_DB).forEach((slot, idx) => {
            let optionsHtml = GEAR_DB[slot].map(g => `<option value="${g.name}">${g.name}</option>`).join("");
            let tr = document.createElement("tr");
            tr.innerHTML = `
                <td><b>${slot}</b></td>
                <td class="excel-yellow-cell"><select id="gear-select-${idx}">${optionsHtml}</select></td>
                <td id="gear-note-${idx}">-</td>
                <td class="excel-yellow-cell"><input type="number" id="gear-mres-${idx}" value="0"></td>
                <td class="excel-yellow-cell"><input type="number" id="gear-lres-${idx}" value="0"></td>
                <td class="excel-yellow-cell"><input type="number" id="gear-val-${idx}" value="0"></td>
            `;
            gearBody.appendChild(tr);
            document.getElementById(`gear-select-${idx}`).addEventListener('change', () => onGearChange(idx));
            ['mres', 'lres', 'val'].forEach(f => document.getElementById(`gear-${f}-${idx}`).addEventListener('input', () => { saveState(); calculateAura(); }));
        });
    }

    const treeBody = document.getElementById("tree-table-body");
    if (treeBody) {
        treeBody.innerHTML = "";
        TREE_DB.forEach(node => {
            let tr = document.createElement("tr");
            tr.innerHTML = `
                <td style="text-align:left; padding-left:10px;"><b>${node.name.split('-')[0]}</b></td>
                <td style="text-align:left; color:#475569;">${node.name.split('-')[1] || "核心節點"}</td>
                <td class="excel-yellow-cell"><input type="checkbox" id="chk-tree-${node.id}"></td>
                <td>${node.mres}%</td><td>${node.lres}%</td>
            `;
            treeBody.appendChild(tr);
            document.getElementById(`chk-tree-${node.id}`).addEventListener('change', () => { saveState(); calculateAura(); });
        });
    }
}

function onGearChange(idx) {
    const slot = Object.keys(GEAR_DB)[idx];
    const selectedName = document.getElementById(`gear-select-${idx}`).value;
    const gData = GEAR_DB[slot].find(g => g.name === selectedName);
    if (gData) {
        document.getElementById(`gear-mres-${idx}`).value = gData.mres;
        document.getElementById(`gear-lres-${idx}`).value = gData.lres;
        document.getElementById(`gear-val-${idx}`).value = gData.val;
        document.getElementById(`gear-note-${idx}`).innerText = `預設基礎值: ${gData.mres || gData.lres || 0}%`;
    }
    saveState(); calculateAura();
}

// 核心計算：修正全選無時的防呆乘數 1.0 溢出 bug，實作 1:1 雙保留結果格印記
function calculateAura() {
    let treeMRes = 0, treeLRes = 0;
    TREE_DB.forEach(node => {
        if (document.getElementById(`chk-tree-${node.id}`)?.checked) {
            treeMRes += node.mres; treeLRes += node.lres;
        }
    });

    let gearMRes = 0, gearLRes = 0;
    Object.keys(GEAR_DB).forEach((slot, idx) => {
        let m = parseFloat(document.getElementById(`gear-mres-${idx}`)?.value) || 0;
        let l = parseFloat(document.getElementById(`gear-lres-${idx}`)?.value) || 0;
        let v = parseFloat(document.getElementById(`gear-val-${idx}`)?.value) || 0;

        // 如果是基礎珠寶或瓦詞珠寶，效用要乘以數量顆數
        if (slot.includes("珠寶") && slot.includes("數量")) {
            gearMRes += (m * v); gearLRes += (l * v);
        } else {
            gearMRes += m; gearLRes += l;
        }
    });

    let realTotalManaEff = treeMRes + gearMRes;
    let realTotalLifeEff = treeLRes + gearLRes;

    document.getElementById('summary-mana-calc').innerText = `${realTotalManaEff}%`;
    document.getElementById('summary-life-calc').innerText = `${realTotalLifeEff}%`;

    let finalManaEff = document.getElementById('override-mana-enable').checked
        ? (parseFloat(document.getElementById('override-mana-input').value) || 0) : realTotalManaEff;

    let finalLifeEff = document.getElementById('override-life-enable').checked
        ? (parseFloat(document.getElementById('override-life-input').value) || 0) : realTotalLifeEff;

    const baseLife = Math.floor(parseFloat(document.getElementById('base-life').value)) || 0;
    const baseMana = Math.floor(parseFloat(document.getElementById('base-mana').value)) || 0;

    let sumPctLife = 0, sumPctMana = 0;
    let flatLifeSum = 0, flatManaSum = 0;

    // A. 運算百分比光環列
    document.querySelectorAll('.pct-row').forEach(row => {
        const id = row.id.replace('row-', '');
        const isChecked = document.getElementById(`chk-${id}`).checked;
        const dispLife = document.getElementById(`cost-life-${id}`);
        const dispMana = document.getElementById(`cost-mana-${id}`);

        if (isChecked) {
            let basePct = parseFloat(row.getAttribute('data-base')) || 0;
            const slotEff = parseFloat(document.getElementById(`eff-${id}`).value) || 0;
            const enlLv = parseInt(document.getElementById(`enl-${id}`).value) || 0;
            const gemMult = parseFloat(document.getElementById(`mult-${id}`).value) || 100;
            const arrLv = parseInt(document.getElementById(`arr-${id}`).value) || 0;
            const extraSupportMult = parseFloat(document.getElementById(`sup-${id}`).value) || 1.0;

            // ✨ 防呆修復：如果下拉選單選「無」(0)，乘數直接回歸最標準的 1.0
            let enlMultiplier = POEDB.enlighten[enlLv] !== undefined ? POEDB.enlighten[enlLv] : 1.0;
            let arrMultiplier = arrLv > 0 ? (POEDB.arrogance[arrLv] || 1.0) : 1.0;

            if (arrLv > 0) {
                // 走生命保留欄位
                let finalPct = (basePct * arrMultiplier * enlMultiplier * (gemMult / 100) * extraSupportMult * 100) / (100 + finalLifeEff + slotEff);
                finalPct = Math.floor(finalPct * 10000) / 10000;
                sumPctLife += finalPct;

                let pts = Math.floor((baseLife * finalPct) / 100);
                dispLife.innerText = `${pts} HP (${finalPct.toFixed(2)}%)`;
                dispMana.innerText = "-";
            } else {
                // 走魔力保留欄位
                let finalPct = (basePct * enlMultiplier * (gemMult / 100) * extraSupportMult * 100) / (100 + finalManaEff + slotEff);
                finalPct = Math.floor(finalPct * 10000) / 10000;
                sumPctMana += finalPct;

                let pts = Math.floor((baseMana * finalPct) / 100);
                dispMana.innerText = `${pts} MP (${finalPct.toFixed(2)}%)`;
                dispLife.innerText = "-";
            }
        } else {
            if (dispLife) dispLife.innerText = "-";
            if (dispMana) dispMana.innerText = "-";
        }
    });

    // B. 運算固定點數光環列 (活力精準清晰)
    document.querySelectorAll('.flat-row').forEach(row => {
        const aura = row.getAttribute('data-aura-type');
        const isChecked = document.getElementById(`chk-${aura}`).checked;
        const dispLife = document.getElementById(`cost-life-${aura}`);
        const dispMana = document.getElementById(`cost-mana-${aura}`);

        if (isChecked) {
            const lv = parseInt(document.getElementById(`lv-${aura}`).value) || 20;
            const slotEff = parseFloat(document.getElementById(`eff-${aura}`).value) || 0;
            const enlLv = parseInt(document.getElementById(`enl-${aura}`).value) || 0;
            const gemMult = parseFloat(document.getElementById(`mult-${aura}`).value) || 100;
            const arrLv = parseInt(document.getElementById(`arr-${aura}`).value) || 0;
            const extraSupportMult = parseFloat(document.getElementById(`sup-${aura}`).value) || 1.0;

            const baseFlat = POEDB[aura][lv] || 0;
            let enlMultiplier = POEDB.enlighten[enlLv] !== undefined ? POEDB.enlighten[enlLv] : 1.0;
            let arrMultiplier = arrLv > 0 ? (POEDB.arrogance[arrLv] || 1.0) : 1.0;

            if (arrLv > 0) {
                let reserved = Math.floor((baseFlat * arrMultiplier * enlMultiplier * (gemMult / 100) * extraSupportMult * 100) / (100 + finalLifeEff + slotEff));
                flatLifeSum += reserved;
                dispLife.innerText = `${reserved} HP`;
                dispMana.innerText = "-";
            } else {
                let reserved = Math.floor((baseFlat * enlMultiplier * (gemMult / 100) * extraSupportMult * 100) / (100 + finalManaEff + slotEff));
                flatManaSum += reserved;
                dispMana.innerText = `${reserved} MP`;
                dispLife.innerText = "-";
            }
        } else {
            if (dispLife) dispLife.innerText = "-";
            if (dispMana) dispMana.innerText = "-";
        }
    });

    let pctLifePoints = Math.floor((baseLife * sumPctLife) / 100);
    let pctManaPoints = Math.floor((baseMana * sumPctMana) / 100);

    const finalLife = baseLife - pctLifePoints - flatLifeSum;
    const finalMana = baseMana - pctManaPoints - flatManaSum;

    document.getElementById('remaining-life').innerText = finalLife.toLocaleString();
    document.getElementById('remaining-mana').innerText = finalMana.toLocaleString();
    document.getElementById('life-reserved-percent').innerText = `${sumPctLife.toFixed(2)}%`;
    document.getElementById('mana-reserved-percent').innerText = `${sumPctMana.toFixed(2)}%`;

    updateStatus('life', finalLife);
    updateStatus('mana', finalMana);
}

function updateStatus(type, val) {
    const icon = document.getElementById(`${type}-status-icon`);
    if (val < 0) {
        icon.innerText = "✗"; icon.className = "status-badge fail";
    } else {
        icon.innerText = "✓"; icon.className = "status-badge ok";
    }
}

window.toggleOverride = function (type) {
    const isEnabled = document.getElementById(`override-${type}-enable`).checked;
    const inputEl = document.getElementById(`override-${type}-input`);
    inputEl.disabled = !isEnabled;
    if (!isEnabled) inputEl.value = 0;
    calculateAura();
};

function saveState() {
    const state = {};
    document.querySelectorAll('input, select').forEach(i => { if (i.id) state[i.id] = i.type === 'checkbox' ? i.checked : i.value; });
    historyStack.push(JSON.stringify(state)); redoStack = [];
}

function restoreSnapshot(snap) {
    Object.keys(snap).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.type === 'checkbox' ? el.checked = snap[id] : el.value = snap[id];
    });
    document.getElementById('override-mana-input').disabled = !document.getElementById('override-mana-enable').checked;
    document.getElementById('override-life-input').disabled = !document.getElementById('override-life-enable').checked;
    calculateAura();
}

window.undo = function () { if (historyStack.length > 1) { redoStack.push(historyStack.pop()); restoreSnapshot(JSON.parse(historyStack[historyStack.length - 1])); } };
window.redo = function () { if (redoStack.length > 0) { const next = redoStack.pop(); historyStack.push(next); restoreSnapshot(JSON.parse(next)); } };
window.switchTab = function (tabId) { document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active')); document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active')); document.getElementById(tabId).classList.add('active'); const btn = document.getElementById(`btn-${tabId}`); if (btn) btn.classList.add('active'); };

document.addEventListener('DOMContentLoaded', () => {
    renderCalculatorTable();
    initSubPages();

    document.querySelectorAll('.excel-pure-table input, .excel-pure-table select').forEach(i => {
        i.addEventListener(i.type === 'checkbox' ? 'change' : 'input', () => { saveState(); calculateAura(); });
    });
    saveState(); calculateAura();
});
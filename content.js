window.GUT_GAME_DATA = {
  meta: {
    title: "肠道小宇宙",
    subtitle: "一座花园，连接全身",
    eyebrow: "六关微生态证据探索",
    duration: "约 10–12 分钟",
    version: "1.0",
    disclaimer:
      "本页面是科普互动体验，不提供个人诊断、处方、益生菌配方、抗生素选择或粪菌移植操作建议。出现便血、黑便、持续发热、剧烈腹痛、不明原因体重下降等情况，请及时就医。"
  },

  metrics: [
    {
      id: "diversity",
      label: "菌群多样性",
      short: "多样性",
      color: "mint",
      description: "不同微生物类群共同存在的丰富程度，是游戏内生态模拟。"
    },
    {
      id: "fermentation",
      label: "发酵代谢潜力",
      short: "发酵潜力",
      color: "gold",
      description: "膳食纤维等底物被部分菌群利用的模拟潜力，不对应个人检测。"
    },
    {
      id: "barrier",
      label: "屏障韧性",
      short: "屏障",
      color: "blue",
      description: "黏液、上皮与局部防御共同维持边界的模拟状态。"
    },
    {
      id: "pressure",
      label: "失衡压力",
      short: "压力",
      color: "coral",
      description: "游戏用来说明扰动叠加的抽象指标，不是疾病风险评分。"
    }
  ],

  levels: [
    {
      id: 1,
      kicker: "认识生态 · 第一站",
      title: "花园剖面图",
      lead: "把五个生态部件放进剖面，看看一座肠道花园如何运转。",
      chapter: "认识生态",
      badge: { name: "生态观察员", icon: "leaf" },
      scienceNote: "菌群、代谢物、屏障和免疫并非五个孤岛，它们通过持续交换信息共同运行。",
      parts: [
        {
          id: "fiber",
          label: "膳食纤维",
          trace: "发酵原料",
          target: "lumen",
          hint: "先进入肠腔，成为部分菌群可利用的底物。"
        },
        {
          id: "scfa",
          label: "短链脂肪酸",
          trace: "代谢信使",
          target: "epithelium",
          hint: "发酵产物可参与屏障、免疫和全身代谢的信号交流。"
        },
        {
          id: "mucus",
          label: "黏液层",
          trace: "化学屏障",
          target: "mucus",
          hint: "黏液层帮助维持微生物与上皮之间的空间边界。"
        },
        {
          id: "immunity",
          label: "免疫训练",
          trace: "局部防御",
          target: "immune",
          hint: "菌群信号可能参与免疫系统的成熟与调节。"
        },
        {
          id: "nerve",
          label: "神经信号",
          trace: "脑肠通讯",
          target: "brain",
          hint: "神经、免疫和代谢都可能参与肠—脑双向交流。"
        }
      ],
      zones: [
        { id: "lumen", label: "肠腔", sub: "发酵原料站", color: "mint" },
        { id: "mucus", label: "黏液层", sub: "化学屏障站", color: "blue" },
        { id: "epithelium", label: "肠上皮", sub: "代谢与屏障站", color: "gold" },
        { id: "immune", label: "免疫区域", sub: "免疫训练站", color: "coral" },
        { id: "brain", label: "神经联络", sub: "脑肠通讯站", color: "violet" }
      ],
      recapQuestion: {
        prompt: "以下哪种理解更接近肠道微生态？",
        options: [
          { id: "a", text: "一种“好菌”越多越好", correct: false },
          { id: "b", text: "一套会随环境变化的动态系统", correct: true },
          { id: "c", text: "一份可以决定健康总分的固定答卷", correct: false }
        ],
        feedback:
          "微生态关注的是不同微生物、代谢产物、屏障和宿主之间的动态关系，而不是某一种菌或一个固定分数。"
      }
    },

    {
      id: 2,
      kicker: "认识生态 · 第二站",
      title: "肠道 24 小时",
      lead: "频率、组合和长期习惯，比一次选择更能说明生活扰动。这里的变化全部是游戏内生态模拟。",
      chapter: "认识生态",
      badge: { name: "生活实验员", icon: "sun" },
      scienceNote: "一次熬夜或一顿早餐不会单独决定健康。观察长期模式，比责备某一次选择更有意义。",
      initialMetrics: { diversity: 62, fermentation: 58, barrier: 61, pressure: 38 },
      scenes: [
        {
          id: "breakfast",
          kicker: "07:40 · 早餐",
          title: "今天的第一份底物",
          description: "你准备怎样给花园送进第一批可利用的底物？",
          context: "重点不是追求“完美早餐”，而是看看食物组合可能提供什么。",
          icon: "sun",
          options: [
            {
              id: "mixed",
              label: "全谷物 + 酸奶 + 一份水果",
              detail: "多种底物与蛋白质组合",
              delta: { diversity: 5, fermentation: 7, barrier: 2, pressure: -3 },
              feedback:
                "多样化食物可能为不同微生物提供底物。长期饮食结构比单次搭配更值得观察。",
              link: "肠—代谢轴：部分膳食纤维可被菌群发酵，产生短链脂肪酸等代谢产物。"
            },
            {
              id: "sweet",
              label: "甜面包 + 咖啡，边走边吃",
              detail: "快速、方便，纤维相对较少",
              delta: { diversity: -2, fermentation: -3, barrier: 0, pressure: 3 },
              feedback:
                "这可以是一顿真实生活里的早餐。偶尔如此不需要自责；若长期结构单一，可能减少发酵底物的多样性。",
              link: "肠—代谢轴：饮食模式可能影响可供菌群利用的底物结构。"
            },
            {
              id: "skip",
              label: "今天太忙，先不吃",
              detail: "把早餐顺延或合并到午餐",
              delta: { diversity: -1, fermentation: -2, barrier: -1, pressure: 2 },
              feedback:
                "忙碌时偶尔跳过早餐并不等于伤害了健康。更值得关注的是全天营养是否长期不足，以及能否找到可持续的节奏。",
              link: "个体生活节奏差异很大，游戏无法判断某个人是否适合固定三餐。"
            }
          ]
        },
        {
          id: "night",
          kicker: "23:20 · 夜晚",
          title: "作息与加餐的组合",
          description: "一天的收尾会影响睡眠、压力和进食时间，而它们可能参与脑肠互动。",
          context: "这里不把晚睡或夜班归因于意志力，只看可调整的环境因素。",
          icon: "moon",
          options: [
            {
              id: "regular",
              label: "按计划停止进食，尽量固定入睡时间",
              detail: "为身体留出较稳定的恢复窗口",
              delta: { diversity: 3, fermentation: 2, barrier: 4, pressure: -5 },
              feedback:
                "规律作息可能帮助降低额外扰动。重点是可重复的节奏，而不是某一天必须做到完美。",
              link: "肠—脑轴：睡眠、压力与胃肠道感受之间可能存在双向关联。"
            },
            {
              id: "snack",
              label: "加班后吃夜宵，再刷一会儿手机",
              detail: "进食较晚，入睡时间被推迟",
              delta: { diversity: -3, fermentation: -2, barrier: -2, pressure: 6 },
              feedback:
                "偶尔晚睡加餐是现实生活的一部分。若成为长期组合，可能让作息与进食节律持续波动。",
              link: "肠—脑轴：不规律作息可能影响压力感受和睡眠质量，但个体差异明显。"
            },
            {
              id: "shift",
              label: "夜班中安排固定加餐与休息",
              detail: "无法按常规时间作息，但尽量稳定节奏",
              delta: { diversity: 0, fermentation: 1, barrier: 0, pressure: 1 },
              feedback:
                "夜班不是个人失败。对轮班人群，减少班次间的剧烈切换、安排稳定用餐和休息窗口可能更现实。",
              link: "研究仍在探索轮班与菌群的关系，不能把相关性理解为个人责任。"
            }
          ]
        },
        {
          id: "antibiotic",
          kicker: "第 3 天 · 用药",
          title: "医生开了抗生素",
          description: "你确实需要治疗，但症状在第 2 天就缓解了。接下来怎么做？",
          context: "抗生素不是天然敌人。真正需要避免的是滥用、自行使用和不规范停药。",
          icon: "pill",
          options: [
            {
              id: "follow",
              label: "按医嘱完成疗程，记录不适",
              detail: "有疑问时联系医生，不自行加减药",
              delta: { diversity: -7, fermentation: -4, barrier: -2, pressure: 7 },
              feedback:
                "必要抗生素仍可能带来短期生态扰动，这不代表你做错了。按医嘱使用，并把持续腹泻等不适告诉医生。",
              link: "肠—免疫轴：抗生素可能暂时改变菌群结构，恢复速度存在个体差异。"
            },
            {
              id: "stop",
              label: "感觉好了，自行停药",
              detail: "把剩余药物留到下次使用",
              delta: { diversity: -5, fermentation: -3, barrier: -4, pressure: 10 },
              feedback:
                "症状改善不等于感染已被充分控制。是否停药应遵循具体疾病和医生指导，也不要把剩余药物留给下次。",
              link: "不规范用药可能增加治疗失败与耐药风险。"
            },
            {
              id: "double",
              label: "担心不够，自行再加一种抗生素",
              detail: "没有咨询医生",
              delta: { diversity: -9, fermentation: -6, barrier: -6, pressure: 13 },
              feedback:
                "自行加药可能增加不良反应、药物相互作用和耐药风险。抗生素选择必须结合感染部位、病原和个体情况。",
              link: "WHO 提醒：抗菌药物耐药是全球公共卫生问题，合理使用需要专业判断。"
            }
          ]
        }
      ]
    },

    {
      id: 3,
      kicker: "识别失衡 · 第三站",
      title: "菌群身份局",
      lead: "同一类微生物，换个菌株、数量、位置或宿主状态，角色就可能不同。别急着贴“好”或“坏”的标签。",
      chapter: "识别失衡",
      badge: { name: "菌群辨伪员", icon: "fingerprint" },
      scienceNote: "“细菌名称”只是起点。菌株、剂量、检测方法、症状和疾病背景共同决定一句话是否可靠。",
      categories: [
        { id: "limited", label: "有证据，但需限定" },
        { id: "absolute", label: "说得太绝对" },
        { id: "myth", label: "常见误区" },
        { id: "context", label: "要结合具体情境" }
      ],
      claims: [
        {
          id: "c1",
          claim: "双歧杆菌一定可以改善便秘。",
          category: "absolute",
          tag: "绝对化承诺",
          feedback:
            "不同双歧杆菌菌株、剂量、人群和便秘类型的研究结果并不相同。“一定改善”忽略了菌株与情境差异。",
          correction: "特定菌株的潜在作用，需要放到具体人群与结局里判断。"
        },
        {
          id: "c2",
          claim: "大肠杆菌都是坏菌。",
          category: "myth",
          tag: "二元标签",
          feedback:
            "大肠杆菌包含多种菌株。有些是肠道常驻成员，有些特定致病型则会引发感染。名称相同，不等于作用相同。",
          correction: "微生物的作用取决于菌株、位置、数量与宿主状态。"
        },
        {
          id: "c3",
          claim: "艰难梭菌检测阳性，就必须马上自己吃抗生素。",
          category: "context",
          tag: "检测与症状",
          feedback:
            "艰难梭菌检测应结合是否有腹泻等临床症状。阳性有时可能代表定植；治疗与否要看症状、严重程度和医生评估。",
          correction: "检测结果要与症状和风险背景一起解释，不能自行用药。"
        },
        {
          id: "c4",
          claim: "活菌数量越高，产品一定越好。",
          category: "absolute",
          tag: "数量迷思",
          feedback:
            "菌株、适用人群、临床结局、剂量、存活和储存条件都重要。单看“千亿活菌”无法判断产品是否适合某个人。",
          correction: "数量只是产品信息的一部分，不等于效果。"
        },
        {
          id: "c5",
          claim: "益生菌可以替代规范治疗。",
          category: "myth",
          tag: "越界替代",
          feedback:
            "益生菌不能替代针对疾病的规范治疗。某些菌株可能在特定场景有辅助证据，但不能用来延误诊断或停药。",
          correction: "先明确诊断和标准治疗，再讨论是否需要特定干预。"
        },
        {
          id: "c6",
          claim: "部分特定益生菌菌株对某些抗生素相关腹泻有预防证据，但效果因人群和场景而异。",
          category: "limited",
          tag: "限定表述",
          feedback:
            "这句话保留了菌株、结局和人群边界。证据通常不能直接外推到所有益生菌、所有腹泻或所有人。",
          correction: "可检验的表述通常包含具体菌株、人群、结局与不确定性。"
        }
      ]
    },

    {
      id: 4,
      kicker: "识别失衡 · 第四站",
      title: "消化警报站",
      lead: "阅读三个病例线索，判断最需要关注的问题，以及当前更适合哪一级就医路径。这里不给出个人诊断。",
      chapter: "识别失衡",
      badge: { name: "症状侦探", icon: "stethoscope" },
      scienceNote: "风险分流不是诊断。持续或反复的消化症状值得门诊评估；出现危险信号时应尽快就医。",
      careLevels: [
        {
          id: "observe",
          label: "继续观察",
          detail: "短期、轻微、可解释，且没有警报征象"
        },
        {
          id: "clinic",
          label: "门诊评估",
          detail: "持续、反复或影响生活，需要专业判断"
        },
        {
          id: "urgent",
          label: "尽快就医",
          detail: "存在便血、黑便、持续发热、剧烈腹痛等危险信号"
        }
      ],
      cases: [
        {
          id: "hp",
          station: "病例 A",
          avatar: "hp",
          person: "42 岁，近 3 个月上腹隐痛、餐后胀。",
          clues: [
            "呼气试验提示幽门螺杆菌感染",
            "偶有反酸，没有呕血或黑便",
            "家人建议直接买抗生素组合"
          ],
          question: "最合理的下一步是什么？",
          issues: [
            { id: "hp-gastritis", label: "幽门螺杆菌相关慢性胃炎可能" },
            { id: "ibd", label: "炎症性肠病（IBD）" },
            { id: "functional", label: "单纯功能性消化不良" }
          ],
          issueCorrect: "hp-gastritis",
          careCorrect: "clinic",
          feedback:
            "需要结合症状、检测方法和风险因素，由医生评估是否根除以及采用何种方案。不要自行组合抗生素。",
          evidence: "幽门螺杆菌诊疗共识强调规范检测与个体化根除方案。"
        },
        {
          id: "cdiff",
          station: "病例 B",
          avatar: "alert",
          person: "68 岁，使用抗生素第 6 天出现频繁水样便。",
          clues: [
            "今天体温 38.8°C，腹部剧烈疼痛",
            "出现血便，精神差、口干",
            "正在使用多种药物，有基础疾病"
          ],
          question: "这些线索最需要警惕什么？",
          issues: [
            { id: "lactose", label: "乳糖不耐受" },
            { id: "cdiff-risk", label: "艰难梭菌感染等严重肠道问题" },
            { id: "ibs", label: "肠易激综合征" }
          ],
          issueCorrect: "cdiff-risk",
          careCorrect: "urgent",
          feedback:
            "抗生素使用后出现发热、剧烈腹痛、血便和脱水表现，属于需要尽快就医的危险信号。不要自行止泻或使用他人的抗生素。",
          evidence: "艰难梭菌感染诊疗强调症状、严重程度与规范检测，不能只凭单个检测结果自诊。"
        },
        {
          id: "functional-gi",
          station: "病例 C",
          avatar: "loop",
          person: "29 岁，半年反复腹痛、腹胀，排便后常缓解。",
          clues: [
            "排便频率和性状反复变化",
            "压力大时更明显，夜间不被痛醒",
            "没有便血、发热或不明原因体重下降"
          ],
          question: "这些线索更接近哪一种理解？",
          issues: [
            { id: "functional-gi", label: "功能性胃肠病与脑肠互动可能" },
            { id: "urgent-ibd", label: "必须立刻按急症处理" },
            { id: "probiotic-cure", label: "靠益生菌即可解决" }
          ],
          issueCorrect: "functional-gi",
          careCorrect: "clinic",
          feedback:
            "功能性胃肠病真实存在，与脑肠互动、内脏敏感性和生活因素等有关，不是“想出来的病”。但长期症状仍需门诊评估，排除其他问题。",
          evidence:
            "炎症性肠病常需警惕血便、夜间症状、体重下降等信号；风险分流不能替代专业检查。"
        }
      ]
    },

    {
      id: 5,
      kicker: "做出选择 · 第五站",
      title: "干预证据局",
      lead: "先分清干预思路，再审查产品文案。你不是在寻找“最强产品”，而是在练习证据边界。",
      chapter: "做出选择",
      badge: { name: "证据审查员", icon: "flask" },
      scienceNote: "益生菌、益生元、合生制剂与粪菌移植不是同一种东西，也不能互相替代。",
      mechanisms: [
        {
          id: "probiotic",
          label: "益生菌",
          icon: "capsule",
          correct: "specific",
          options: [
            { id: "substrate", text: "为菌群提供可利用的底物" },
            { id: "specific", text: "补充特定活菌菌株" },
            { id: "donor", text: "移植经过处理的供体菌群" },
            { id: "combo", text: "把活菌与底物组合" }
          ],
          boundary: "作用具有菌株、剂量和人群特异性。"
        },
        {
          id: "prebiotic",
          label: "益生元",
          icon: "wheat",
          correct: "substrate",
          options: [
            { id: "substrate", text: "为菌群提供可利用的底物" },
            { id: "specific", text: "补充特定活菌菌株" },
            { id: "donor", text: "移植经过处理的供体菌群" },
            { id: "combo", text: "把活菌与底物组合" }
          ],
          boundary: "不等于益生菌，部分人可能出现腹胀等不适。"
        },
        {
          id: "synbiotic",
          label: "合生制剂",
          icon: "blend",
          correct: "combo",
          options: [
            { id: "substrate", text: "为菌群提供可利用的底物" },
            { id: "specific", text: "补充特定活菌菌株" },
            { id: "donor", text: "移植经过处理的供体菌群" },
            { id: "combo", text: "把活菌与底物组合" }
          ],
          boundary: "组合不等于效果自动相加。"
        },
        {
          id: "fmt",
          label: "粪菌移植",
          icon: "transfer",
          correct: "donor",
          options: [
            { id: "substrate", text: "为菌群提供可利用的底物" },
            { id: "specific", text: "补充特定活菌菌株" },
            { id: "donor", text: "移植经过处理的供体菌群" },
            { id: "combo", text: "把活菌与底物组合" }
          ],
          boundary: "有严格医疗适应证，不能用于自行美容抗衰。"
        }
      ],
      adQuestions: [
        {
          id: "a1",
          ad: "7 天重建菌群，一次回到最佳状态",
          tag: "功效承诺",
          options: [
            { id: "strain", label: "菌株与剂量" },
            { id: "evidence", label: "证据与适用人群" },
            { id: "safety", label: "安全与医疗边界" }
          ],
          correct: "evidence",
          feedback:
            "“重建”“最佳状态”缺乏可检验定义。应先追问对谁、改善什么结局、依据哪项研究，以及持续多久。",
          checklist: ["产品菌株", "适用人群", "临床结局", "剂量", "安全性", "储存条件"]
        },
        {
          id: "a2",
          ad: "坏菌清零，永不复发",
          tag: "二元叙事",
          options: [
            { id: "strain", label: "菌株与剂量" },
            { id: "evidence", label: "证据与适用人群" },
            { id: "safety", label: "安全与医疗边界" }
          ],
          correct: "evidence",
          feedback:
            "微生物不是“坏菌清零”的战争游戏。“永不复发”是绝对化承诺，也没有可验证的人群与结局。",
          checklist: ["具体菌株", "适用人群", "对照研究", "实际效果", "复发定义", "不良反应"]
        },
        {
          id: "a3",
          ad: "千亿活菌，人人适合",
          tag: "数量迷思",
          options: [
            { id: "strain", label: "菌株与剂量" },
            { id: "evidence", label: "证据与适用人群" },
            { id: "safety", label: "安全与医疗边界" }
          ],
          correct: "strain",
          feedback:
            "活菌数量只是信息的一部分。还缺菌株身份、剂量与效果关系、适用人群、安全性和储存条件。",
          checklist: ["菌株编号", "每剂活菌数", "预期结局", "特殊人群风险", "储存条件"]
        },
        {
          id: "a4",
          ad: "粪菌移植排毒抗衰，开启年轻菌群",
          tag: "越界医疗",
          options: [
            { id: "strain", label: "菌株与剂量" },
            { id: "evidence", label: "证据与适用人群" },
            { id: "safety", label: "安全与医疗边界" }
          ],
          correct: "safety",
          feedback:
            "粪菌移植是有严格医疗适应证和操作规范的技术，不是美容抗衰项目。其风险包括感染与不良事件，不能自行尝试。",
          checklist: ["医疗适应证", "供体筛查", "操作规范", "风险告知", "长期随访"]
        },
        {
          id: "a5",
          ad: "所有腹泻都可以吃益生菌",
          tag: "一网打尽",
          options: [
            { id: "strain", label: "菌株与剂量" },
            { id: "evidence", label: "证据与适用人群" },
            { id: "safety", label: "安全与医疗边界" }
          ],
          correct: "safety",
          feedback:
            "腹泻原因很多。感染、出血、脱水或重症患者需要先就医；益生菌不是所有腹泻的通用方案，也可能有风险。",
          checklist: ["病因评估", "危险信号", "适用人群", "菌株证据", "就医优先级"]
        }
      ]
    },

    {
      id: 6,
      kicker: "做出选择 · 第六站",
      title: "抗生素之后",
      lead: "一座花园如何回来？从一次必要的抗生素治疗开始，观察恢复轨迹，再把选择连接到全身。",
      chapter: "做出选择",
      badge: { name: "全身联动观察员", icon: "orbit" },
      scienceNote: "三个时间点只是叙事结构，不代表真实恢复时间。生态恢复轨迹存在个体差异。",
      initialMetrics: { diversity: 62, fermentation: 58, barrier: 61, pressure: 38 },
      phases: [
        {
          id: "treatment",
          time: "治疗阶段",
          kicker: "第 0–7 天 · 必要治疗",
          title: "医生判断需要抗生素",
          description: "症状缓解后，你会怎样处理剩余疗程？",
          options: [
            {
              id: "follow",
              label: "按医嘱完成疗程，记录腹泻等不适",
              detail: "出现异常及时联系医生",
              delta: { diversity: -6, fermentation: -4, barrier: 0, pressure: 5 },
              note: "抗生素可能带来短期扰动，遵循专业方案仍是必要起点。"
            },
            {
              id: "stop",
              label: "症状好转就停，把余药留到下次",
              detail: "没有咨询医生",
              delta: { diversity: -4, fermentation: -3, barrier: -4, pressure: 9 },
              note: "症状改善不等于感染已被充分控制，余药不应自行留用。"
            },
            {
              id: "stack",
              label: "再自行叠加一种抗生素，想快点好",
              detail: "没有咨询医生",
              delta: { diversity: -10, fermentation: -8, barrier: -7, pressure: 12 },
              note: "自行加药会增加不良反应、相互作用与耐药风险。"
            }
          ]
        },
        {
          id: "recovery",
          time: "近期恢复",
          kicker: "之后几周 · 叙事时间",
          title: "花园还在重建",
          description: "你打算如何安排饮食与补充剂？",
          options: [
            {
              id: "diet",
              label: "逐步恢复多样饮食，不一次性大补",
              detail: "谷物、豆类、蔬果和发酵食物按耐受情况安排",
              delta: { diversity: 5, fermentation: 7, barrier: 4, pressure: -4 },
              note: "多样饮食可能为生态恢复提供更多底物，但恢复速度因人而异。"
            },
            {
              id: "supplements",
              label: "买多款益生菌，但饮食结构不变",
              detail: "把补充剂当作主要方案",
              delta: { diversity: 1, fermentation: 1, barrier: 1, pressure: 1 },
              note: "补充剂不能替代整体饮食结构，也不存在对所有人都适用的配方。"
            },
            {
              id: "fiber-late",
              label: "大量增加高纤维食物，同时继续熬夜",
              detail: "只关注“吃进去”，忽略节律与压力",
              delta: { diversity: 2, fermentation: 5, barrier: 0, pressure: 3 },
              note: "增加纤维应循序渐进；腹胀等耐受问题需要观察，作息也是生态扰动的一部分。"
            }
          ]
        },
        {
          id: "longterm",
          time: "长期观察",
          kicker: "之后数月 · 叙事时间",
          title: "没有一条完美修复路线",
          description: "以下哪种长期策略更接近你的现实？",
          options: [
            {
              id: "pattern",
              label: "记录饮食、睡眠与症状的长期模式",
              detail: "不为一餐打分，以几周为单位观察",
              delta: { diversity: 4, fermentation: 5, barrier: 5, pressure: -5 },
              note: "长期模式比单次选择更可解释，也能帮助你就诊时提供有效信息。"
            },
            {
              id: "stress",
              label: "优先改善睡眠与压力管理，饮食逐步调整",
              detail: "承认脑肠互动与生活环境的共同作用",
              delta: { diversity: 2, fermentation: 2, barrier: 4, pressure: -4 },
              note: "不同恢复路径各有侧重。屏障或症状改善时，多样性也可能尚未完全回到基线。"
            },
            {
              id: "restrict",
              label: "长期只依赖补充剂，并严格限制多种食物",
              detail: "没有专业评估，也未记录身体反应",
              delta: { diversity: -2, fermentation: -2, barrier: -1, pressure: 3 },
              note: "长期限制饮食可能带来营养风险。是否需要限制应由专业评估决定。"
            }
          ]
        }
      ],
      axes: [
        {
          id: "brain",
          label: "肠—脑轴",
          icon: "brain",
          color: "violet",
          summary: "睡眠、压力和疼痛感受之间可能存在双向关联。",
          evidence: "机制与观察性研究",
          evidenceText:
            "动物与人体研究提示多条通路可能参与，但人体证据仍在积累，相关不等于因果。",
          detail: "焦虑、睡眠不足与胃肠道症状可能相互影响；管理压力不能替代对器质性疾病的检查。"
        },
        {
          id: "immune",
          label: "肠—免疫轴",
          icon: "shield",
          color: "coral",
          summary: "菌群、屏障与免疫训练共同参与局部防御。",
          evidence: "机制与临床研究",
          evidenceText:
            "屏障完整性和免疫成熟受到多种因素影响；单一菌株或补充剂不能代表整套免疫系统。",
          detail: "抗生素使用后，菌群与屏障状态可能同时波动；感染风险需要结合临床情况判断。"
        },
        {
          id: "metabolic",
          label: "肠—代谢轴",
          icon: "flame",
          color: "gold",
          summary: "膳食纤维发酵与短链脂肪酸等代谢产物可能影响代谢状态。",
          evidence: "机制与人群研究",
          evidenceText:
            "个体反应、饮食总体结构和研究设计都会影响结果，不能把某一种代谢物当作独立健康开关。",
          detail: "增加膳食纤维通常应循序渐进，并考虑耐受性和整体饮食质量。"
        }
      ]
    }
  ],

  badges: [
    { level: 1, name: "生态观察员", icon: "leaf", color: "mint" },
    { level: 2, name: "生活实验员", icon: "sun", color: "gold" },
    { level: 3, name: "菌群辨伪员", icon: "fingerprint", color: "coral" },
    { level: 4, name: "症状侦探", icon: "stethoscope", color: "coral" },
    { level: 5, name: "证据审查员", icon: "flask", color: "gold" },
    { level: 6, name: "全身联动观察员", icon: "orbit", color: "blue" }
  ],

  defaultMyths: [
    "某一种“好菌”越多越好，或可以用一个固定分数代表整个微生态。",
    "只要吃益生菌，就能替代诊断、规范治疗或整体饮食结构。",
    "抗生素是天然敌人，或者症状一缓解就可以自行停药。"
  ],

  nextActions: [
    "这周选一天，在早餐里增加一种全谷物和一种不同颜色的蔬果。只观察，不给自己打分。",
    "把接下来 7 天的睡眠、饮食与消化不适简单记在同一条时间线上，以模式代替单次评判。",
    "下次看到益生菌宣传时，先找三件事：具体菌株、适用人群、临床证据。找不到就先不下结论。"
  ],

  sources: [
    {
      org: "中国营养学会",
      title: "《中国居民膳食指南（2022）》",
      note: "食物多样、谷类为主与膳食纤维等膳食建议。"
    },
    {
      org: "ISAPP",
      title: "Probiotics and prebiotics: consensus statements",
      note: "益生菌、益生元与合生制剂的定义及证据边界。上线前应核对最新共识。" 
    },
    {
      org: "中华医学会消化病学分会",
      title: "幽门螺杆菌感染处理相关共识",
      note: "检测、风险分层与规范根除治疗的原则。"
    },
    {
      org: "中国相关专业学会",
      title: "艰难梭菌感染诊断和治疗专家共识",
      note: "症状、检测与严重程度评估；上线前按最新版复核。"
    },
    {
      org: "中国相关专业学会",
      title: "菌群移植临床应用管理专家共识",
      note: "粪菌移植的医疗适应证、供体筛查与风险控制。"
    },
    {
      org: "World Health Organization",
      title: "Antimicrobial resistance",
      note: "抗菌药物耐药与合理使用的公众科普。"
    }
  ]
};

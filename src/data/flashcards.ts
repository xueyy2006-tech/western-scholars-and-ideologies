import type { FlashCard } from '../types'

export const flashcards: FlashCard[] = [
  // ===== THINKER CARDS =====
  { id: 'fc-weber', type: 'thinker', front: '马克斯·韦伯', back: '现代社会学奠基人。核心概念：**祛魅**（世界的理性化）→ **工具理性** vs **价值理性** → **铁笼**（理性化使人陷入官僚制牢笼）。代表作《新教伦理与资本主义精神》。他揭示了现代性的困境：效率至上导致意义的丧失。', category: 'modernity-critique', difficulty: 2 },
  { id: 'fc-nietzsche', type: 'thinker', front: '弗里德里希·尼采', back: '最颠覆性的现代哲学家。核心主张：**上帝已死** → 重估一切价值 → **超人**（自我立法的人）→ **权力意志**（生命的创造力）→ **永恒轮回**（对生命的终极肯定）。反对奴隶道德和怨恨。影响海德格尔、福柯、德勒兹。', category: 'modernity-critique', difficulty: 2 },
  { id: 'fc-heidegger', type: 'thinker', front: '马丁·海德格尔', back: '20世纪最有影响力的哲学家之一。核心概念：**此在(Dasein)**（人是一种"去存在"的可能性）→ **向死而生**（直面死亡使本真生存可能）→ **在世之在**（人与世界原初统一）。代表作《存在与时间》。影响了萨特、德里达、阿伦特。', category: 'phenomenology', difficulty: 3 },
  { id: 'fc-sartre', type: 'thinker', front: '让-保罗·萨特', back: '存在主义旗手。核心主张：**存在先于本质**（人通过选择定义自己）→ **人被判定为自由** → **他人即地狱**（他人的注视将我客体化）→ **自欺**（假装没有选择的自由）。拒绝诺贝尔文学奖。代表作《存在与虚无》《存在主义是一种人道主义》。', category: 'existentialism', difficulty: 2 },
  { id: 'fc-camus', type: 'thinker', front: '阿尔贝·加缪', back: '荒谬哲学的代表。核心主张：世界是**荒谬**的（人对意义的渴望 vs 世界的沉默）→ 唯一真正的哲学问题是**自杀** → 反抗！像西西弗一样推石上山，却要"想象他是幸福的"。代表作《局外人》《西西弗神话》《鼠疫》。他不认为自己是存在主义者。', category: 'existentialism', difficulty: 1 },
  { id: 'fc-foucault', type: 'thinker', front: '米歇尔·福柯', back: '20世纪后半叶最被引用的思想家。核心概念：**权力/知识**（权力生产知识）→ **规训**（通过监视与检查训练身体）→ **全景敞视主义**（权力自动化——自己监视自己）→ **生命权力**（管理人口生命过程的治理术）。代表作《规训与惩罚》《性史》。', category: 'poststructuralism', difficulty: 3 },
  { id: 'fc-derrida', type: 'thinker', front: '雅克·德里达', back: '解构主义创始人。核心概念：**解构**（揭示文本内部的自我矛盾）→ **延异(différance)**（意义既依赖差异又总是被推延）→ **逻各斯中心主义**（西方哲学长期将"在场"置于"缺席"之上）。名言："文本之外别无他物"。代表作《论文字学》。', category: 'poststructuralism', difficulty: 3 },
  { id: 'fc-adorno', type: 'thinker', front: '西奥多·阿多诺', back: '法兰克福学派最具哲学深度的人物。核心概念：**文化工业**（文化是标准化的商品生产）→ **启蒙辩证法**（启蒙理性反转为了新的神话）→ **否定辩证法**（拒绝同一性的暴力，否定即真理）。名言："奥斯维辛之后写诗是野蛮的""在错误的生活中不存在正确的生活"。', category: 'frankfurt-school', difficulty: 3 },
  { id: 'fc-marcuse', type: 'thinker', front: '赫伯特·马尔库塞', back: '"新左派之父"。核心概念：**单向度的人**——在技术理性统治下，批判与超越的向度被消解，人只能在现有体制给定的选项中选择。**压抑性宽容**——表面宽容的社会实际上压制真正的异议。60年代学生运动的精神导师。代表作《单向度的人》《爱欲与文明》。', category: 'frankfurt-school', difficulty: 2 },
  { id: 'fc-habermas', type: 'thinker', front: '于尔根·哈贝马斯', back: '法兰克福学派第二代领军人物，在世最重要哲学家之一。核心概念：**交往理性**（理性在于自由平等的对话而非个人算计）→ **公共领域**（介于国家与市民社会之间的理性讨论空间）→ **商谈伦理**。名言："现代性是一项未竟的事业"。与福柯对立。代表作《交往行为理论》。', category: 'frankfurt-school', difficulty: 3 },
  { id: 'fc-rawls', type: 'thinker', front: '约翰·罗尔斯', back: '20世纪最重要的政治哲学家。核心概念：**无知之幕**（设计社会制度时你不知道自己将处于什么位置——这保证选择的公平）→ **差异原则**（不平等只有在有利于最不利者时才被允许）→ **正义即公平**。代表作《正义论》(1971)扭转了分析哲学传统。', category: 'liberalism', difficulty: 2 },
  { id: 'fc-arendt', type: 'thinker', front: '汉娜·阿伦特', back: '20世纪最重要的政治思想家之一。核心概念：**平庸之恶**（艾希曼不是恶魔，而是一个不会思考的官僚——这种不思就是最大的恶）→ **极权主义**（一种使人变得多余的全新统治形式）→ **公共领域**（人们通过言行显现自身的空间）。代表作《极权主义的起源》《艾希曼在耶路撒冷》。', category: 'political-philosophy', difficulty: 2 },
  { id: 'fc-beauvoir', type: 'thinker', front: '西蒙娜·德·波伏娃', back: '女权主义理论奠基人。核心主张：**"女人不是天生的，而是后天成为的"**——性别是社会建构而非生物宿命。女性被定义为相对于男性的**他者**，被剥夺了**超越性**的自由。存在主义女性主义。代表作《第二性》。', category: 'existentialism', difficulty: 2 },
  { id: 'fc-deleuze', type: 'thinker', front: '吉尔·德勒兹', back: '战后法国最具创造性的哲学家之一。核心概念：**块茎**（反对树状等级思维的横向网络）→ **欲望机器**（欲望不是匮乏，而是积极的生产力）→ **去领土化**。名言："哲学就是创造概念。"代表作《差异与重复》《千高原》（与瓜塔里合著）。', category: 'poststructuralism', difficulty: 3 },
  { id: 'fc-lacan', type: 'thinker', front: '雅克·拉康', back: '结构主义精神分析大师。核心概念：**镜像阶段**（婴儿在镜中看到统一自我——但这是一种误认）→ **无意识像语言一样被结构** → **三界**（想象界-象征界-实在界）→ **对象a**。名言："欲望是他者的欲望。"深刻影响了齐泽克、阿尔都塞。', category: 'psychoanalysis', difficulty: 3 },
  { id: 'fc-althusser', type: 'thinker', front: '路易·阿尔都塞', back: '结构马克思主义者。核心概念：**意识形态国家机器(ISA)**（学校、教会、媒体比警察更有效地再生产资本主义）→ **询唤**（意识形态通过"呼唤"个体——警察喊"喂，你！"——将个体变成主体）。**认识论断裂**（早期人道主义马克思 vs 成熟科学马克思）。代表作《保卫马克思》。', category: 'structuralism', difficulty: 3 },
  { id: 'fc-baudrillard', type: 'thinker', front: '让·鲍德里亚', back: '后现代主义最激进的声音。核心概念：**拟像**（没有原件的复制品→不再指向现实而指向其他符号）→ **超真实**（真实与虚构的界限内爆——拟像比真实更"真实"）。名言："地图先于领土""海湾战争不曾发生"。代表作《拟像与拟真》《消费社会》。', category: 'postmodernism', difficulty: 3 },
  { id: 'fc-zizek', type: 'thinker', front: '斯拉沃热·齐泽克', back: '当代最耀眼的公共知识分子。核心主张：**意识形态不是幻觉**——我们"明知故犯"（明知是假的，却按真的来行动）。核心概念：**崇高客体**（普通事物被当作崇高来对待——如金钱）。名言："更容易想象世界末日，而不是资本主义的终结。"融合拉康、黑格尔、马克思。代表作《意识形态的崇高客体》。', category: 'psychoanalysis', difficulty: 3 },
  { id: 'fc-sandel', type: 'thinker', front: '迈克尔·桑德尔', back: '社群主义代表，哈佛《正义》课全球最受欢迎。核心主张：批判罗尔斯的"无负荷的自我"——我们是**"负重的自我"**，被家庭、社区、历史所构成。**构成性共同体**不仅影响我们是谁——它构成了我们是谁。**权利不应优先于善**。代表作《自由主义与正义的局限》《金钱不能买什么》。', category: 'communitarianism', difficulty: 1 },
  { id: 'fc-nozick', type: 'thinker', front: '罗伯特·诺齐克', back: '自由至上主义哲学宣言者。核心概念：**持有正义(Entitlement Theory)**——1）正义的获取 2）正义的转让 3）对不正义的矫正。只要历史是正义的，任何分配格局都是正义的——国家无权再分配。**经验机器**思想实验：我们想要真实，而不只是快乐。代表作《无政府、国家与乌托邦》。', category: 'liberalism', difficulty: 2 },
  { id: 'fc-schmitt', type: 'thinker', front: '卡尔·施密特', back: '最具争议的政治理论家。核心概念：**政治的本质=划分敌友**（存在论上的"我们vs他们"——不是道德善恶）→ **例外状态**（主权者就是决断例外状态的人）→ **政治神学**（现代国家概念是神学概念的世俗化）。名言："主权者就是决断例外状态的人。"批判自由主义逃避政治决断。', category: 'political-philosophy', difficulty: 3 },
  { id: 'fc-taylor', type: 'thinker', front: '查尔斯·泰勒', back: '当代加拿大最重要的政治哲学家。核心概念：**本真性伦理**（"做真实的自己"是一种现代道德理想，不是自恋）→ **承认的政治**（认同部分由他人的承认或误认所塑造——拒绝承认就是压迫）→ **现代社会想象**。代表作《自我的根源》《本真性的伦理》《世俗时代》。', category: 'communitarianism', difficulty: 2 },
  { id: 'fc-menleau-ponty', type: 'thinker', front: '莫里斯·梅洛-庞蒂', back: '法国现象学代表人物。核心概念：**身体-主体**（身体不是意识操控的机器，而是我们存在于世的原初方式）→ **知觉的首要性**（知觉先于反思——在我思考世界之前，身体已经活在世界中）。代表作《知觉现象学》。影响了认知科学中的具身认知研究。', category: 'phenomenology', difficulty: 3 },
  { id: 'fc-strauss', type: 'thinker', front: '列奥·施特劳斯', back: '20世纪最具争议的政治哲学家之一。核心概念：**隐微/显白写作**（哲学家使用双重书写躲避迫害）→ **古今之争**（现代性不是进步，而是对古典智慧的遗忘）→ **自然权利**（现代人遗忘了古典自然权利——虚无主义不可避免）。影响了美国新保守主义。代表作《自然权利与历史》。', category: 'political-philosophy', difficulty: 3 },

  // ===== CONCEPT CARDS =====
  { id: 'fc-modernity', type: 'concept', front: '现代性 (Modernity)', back: '16世纪以来西方变革的总称：资本主义、工业化、世俗化、理性化、个人主义。核心特征：传统权威瓦解、理性自主确立。但伴随**异化**、无根感和意义的丧失。韦伯、哈贝马斯、阿多诺等人对其进行了系统性反思。', category: 'modernity-critique', difficulty: 1 },
  { id: 'fc-disenchantment', type: 'concept', front: '祛魅 (Disenchantment)', back: '韦伯概念。世界不再被神秘和魔法笼罩——一切都可通过理性计算来理解控制。结果是：世界清醒了，但丧失了内在的意义与魅力。自然被还原为可测量的物质，宗教被降格为私人信仰。', category: 'modernity-critique', difficulty: 1 },
  { id: 'fc-iron-cage', type: 'concept', front: '铁笼 (Iron Cage)', back: '韦伯对现代人处境的隐喻。理性化的资本主义+官僚秩序构成"铁笼"——效率追求将人锁入规则牢笼。物质商品获取以精神丧失为代价。**关键**：人对效率的追求反而变成了困住自己的牢笼。', category: 'modernity-critique', difficulty: 1 },
  { id: 'fc-instrumental-reason', type: 'concept', front: '工具理性 (Instrumental Reason)', back: '一种只关心手段的有效性，不关心目的的正当性的理性形式。法兰克福学派认为这是现代文明的核心困境：启蒙理性本应解放人类，却蜕变为纯粹的计算和支配工具。快餐、KPI、算法推荐都是工具理性的体现。**与之对立**：哈贝马斯的交往理性、韦伯的价值理性。', category: 'modernity-critique', difficulty: 2 },
  { id: 'fc-god-is-dead', type: 'concept', front: '上帝已死 (God is Dead)', back: '尼采最著名的宣言。不只是字面上的宗教衰落，而是整个西方形而上学和道德体系根基的崩溃。基督教-柏拉图主义的"真实世界"最终变成寓言。**人必须学会在没有超验参照的情况下创造自己的价值**——否则将陷入虚无主义。', category: 'existentialism', difficulty: 1 },
  { id: 'fc-ubermensch', type: 'concept', front: '超人 (Übermensch)', back: '尼采的理想人格。不是体能上的"超人"，而是在精神上超越传统道德，能**自我立法、创造自己的价值**。佐证：热爱命运（amor fati），不怨恨、不仇恨生命。是对虚无主义的克服。**人→超人**：人只是动物与超人之间的桥梁。', category: 'existentialism', difficulty: 2 },
  { id: 'fc-existence-essence', type: 'concept', front: '存在先于本质', back: '萨特存在主义第一原则。人首先赤裸裸地"存在"（被抛入世界），然后通过选择和行动来定义自己的"本质"。没有预定的人性或上帝的设计——**人就是自己的选择的总和**。与传统的"本质先于存在"（一把剪刀在被造出来之前就被定义了用途）形成对照。', category: 'existentialism', difficulty: 1 },
  { id: 'fc-hell-is-others', type: 'concept', front: '他人即地狱 (Hell is Other People)', back: '出自萨特戏剧《禁闭》。**不是**说人际关系=痛苦。意思是：在他人的注视下，我从自由的"自为存在"变成被观察的"自在存在"——我被他人定义了。社交焦虑、在意别人的眼光——这都是被"注视"的体验。', category: 'existentialism', difficulty: 2 },
  { id: 'fc-bad-faith', type: 'concept', front: '自欺 (Bad Faith)', back: '萨特概念。不是被他人骗，而是**自己骗自己**——假装没有自由，假装"别无选择"。例子：一个服务员过度扮演"服务员"角色，假装自己"只是"一个服务员。这比承担完全自由的焦虑更轻松。**"我别无选择"就是最典型的自欺**。', category: 'existentialism', difficulty: 2 },
  { id: 'fc-absurd', type: 'concept', front: '荒谬 (The Absurd)', back: '加缪核心概念。荒谬不是世界本身，也不是人本身，而是**二者之间不可调和的碰撞**——人对意义有无法抑制的渴望，世界对此沉默。加缪追问：在不自杀的前提下，如何面对荒谬？回答：**反抗**——像西西弗一样，明知推石上山是徒劳，依然坚持。', category: 'existentialism', difficulty: 1 },
  { id: 'fc-dasein', type: 'concept', front: '此在 (Dasein)', back: '海德格尔用来指"人"的专门术语。字面："在此存在"(Da-sein)。此在区别于其他存在者之处：**对自己存在有所领会，并在领会中"去存在"**。此在不是现成的"什么"，而是一种可能性的展开。与笛卡尔"我思"的对立：此在总是在世界中的，而非与世界对立。', category: 'phenomenology', difficulty: 3 },
  { id: 'fc-being-towards-death', type: 'concept', front: '向死而生 (Being-towards-Death)', back: '海德格尔概念。死亡不是终点而是一种贯穿始终的**可能性**——最本己的、无可替代的、不可超越的。本真地直面死亡使人从日常"常人"状态中挣脱出来，真正地活着。**不"等死"也不逃避死——将死纳入生的意义**。', category: 'phenomenology', difficulty: 3 },
  { id: 'fc-power-knowledge', type: 'concept', front: '权力/知识 (Power/Knowledge)', back: '福柯核心洞察。权力与知识不是对立的——权力生产知识（监狱→犯罪学），知识强化权力（精神病学→"正常"定义）。**现代的统治正是通过知识型的权力来运作的**。标准化考试不仅"测量"智力，还生产了"聪明/愚笨"的区分。', category: 'poststructuralism', difficulty: 2 },
  { id: 'fc-discipline', type: 'concept', front: '规训 (Discipline)', back: '福柯在《规训与惩罚》中的核心概念。一种**身体的政治技术**——通过层级监视、规范化评判和检查将人训练为温顺而有用的身体。学校、军营、工厂、医院都使用规训技术。**关键**：现代人不是被鞭子威胁，而是在内化规范的过程中变得"温顺"。', category: 'poststructuralism', difficulty: 2 },
  { id: 'fc-panopticism', type: 'concept', front: '全景敞视主义 (Panopticism)', back: '福柯取自边沁的隐喻。全景敞视监狱：中央塔可看到所有囚室，但囚犯看不到塔内是否有人。**可见而不可知**→权力自动化和内化：囚犯开始**自己监视自己**。现代社会=全景敞视监狱：社交媒体中我们永远不知道谁在看→自我审查。', category: 'poststructuralism', difficulty: 1 },
  { id: 'fc-deconstruction', type: 'concept', front: '解构 (Deconstruction)', back: '德里达的哲学策略。不是"拆毁"而是仔细阅读文本揭示内部不可化解的张力——**文本宣称的意义被文本自身的运作所颠覆**。表明二元对立（言语/文字、在场/缺席）总隐藏等级，且可被反转。解构不是方法——它总是已经在发生。', category: 'poststructuralism', difficulty: 3 },
  { id: 'fc-differance', type: 'concept', front: '延异 (Différance)', back: '德里达自创术语。来自法语différer——同时表示"差异"（空间不同）和"延宕"（时间推延）。洞见：**意义从来不在纯粹的"现在"中完全在场**——它总是被其他符号（差异）和时间的延宕所标记。词典中一个词引向更多词——意义永无止境。', category: 'poststructuralism', difficulty: 3 },
  { id: 'fc-culture-industry', type: 'concept', front: '文化工业 (Culture Industry)', back: '阿多诺&霍克海默核心概念。文化不是自发的民间创造，而是**标准化、商品化**地批量生产。好莱坞→虚假满足+**伪个体化**（你以为口味独一无二，其实都是算法算出来的）。文化工业使大众"自愿"接受现状，消解了批判和反抗的可能。', category: 'frankfurt-school', difficulty: 2 },
  { id: 'fc-one-dimensional-man', type: 'concept', front: '单向度的人 (One-Dimensional Man)', back: '马尔库塞核心概念。在发达工业社会中，技术理性和消费主义消灭了否定性、批判性和超越性的思维。人变成"单向度"——**只能在体制给定的选项中选择，无法想象完全不同的生活形式**。自由="在iPhone和安卓之间选择的自由"。大拒绝(The Great Refusal)是出路。', category: 'frankfurt-school', difficulty: 2 },
  { id: 'fc-communicative-reason', type: 'concept', front: '交往理性 (Communicative Reason)', back: '哈贝马斯核心概念，对第一代法兰克福学派的回应。理性不只有工具理性——在对话中我们隐含着一种以**"达成理解"为目标**的理性。交往理性是民主商讨和道德规范的基础。**学术讨论中各方不为赢，为达更好的理解**。', category: 'frankfurt-school', difficulty: 3 },
  { id: 'fc-public-sphere', type: 'concept', front: '公共领域 (Public Sphere)', back: '哈贝马斯概念。18世纪兴起的理性讨论空间——咖啡馆、沙龙、报纸。原则上对所有人开放，是民主合法性的基础。但在晚期资本主义中**被商业化和操纵所侵蚀**。今日的微博/推特是它的退化形式。', category: 'frankfurt-school', difficulty: 2 },
  { id: 'fc-veil-of-ignorance', type: 'concept', front: '无知之幕 (Veil of Ignorance)', back: '罗尔斯《正义论》核心思想实验。在"原初状态"中，选择社会制度的人被一道"无知之幕"遮蔽——**不知道自己的阶级、才能、性别、种族**。在这种公平条件下选择的即正义原则。**问自己**：你愿意进入一个你不知道自己会处于什么位置的社会吗？', category: 'liberalism', difficulty: 1 },
  { id: 'fc-difference-principle', type: 'concept', front: '差异原则 (Difference Principle)', back: '罗尔斯正义论第二原则。社会经济的不平等只有**在有利于最不利者时**才被允许。简单说：如果贫富差距使最穷的人比在完全平等条件下过得更好→这种不平等就是正义的。否则应当调整。**公平优先于效率——但允许激励改善所有人处境**。', category: 'liberalism', difficulty: 2 },
  { id: 'fc-banality-of-evil', type: 'concept', front: '平庸之恶 (Banality of Evil)', back: '阿伦特报道艾希曼审判时提出的争议概念。艾希曼（纳粹大屠杀组织者）在法庭上不是恶魔，而是一个**思维平庸、满口套话的官僚**。恶不是源于深刻的恶毒动机，而是源于"不思"——**拒绝思考自己正在做什么**。"我只是在按规定办事"就是平庸之恶的典型说辞。', category: 'political-philosophy', difficulty: 1 },
  { id: 'fc-mirror-stage', type: 'concept', front: '镜像阶段 (Mirror Stage)', back: '拉康核心概念。6-18个月婴儿在镜中首次"认出"自己——但这是**误认**：镜中统一完整的形象≠婴儿实际的碎片化身体体验。**自我从一开始就是异化的**——在与"他者"（镜像）的认同中建构。社交媒体头像=成人的镜像阶段——一个精心建构的"假我"。', category: 'psychoanalysis', difficulty: 3 },
  { id: 'fc-simulacra', type: 'concept', front: '拟像 (Simulacra)', back: '鲍德里亚核心概念。拟像是**没有原件的复制品**——不指涉任何"现实"的符号。三阶段：1）反映现实 2）遮蔽现实 3）替代现实——拟像创造"超真实"。实例：迪士尼乐园的美国主街从未真实存在过——它是对"从未存在过的原件的摹本"的摹本。', category: 'postmodernism', difficulty: 3 },
  { id: 'fc-interpellation', type: 'concept', front: '询唤 (Interpellation)', back: '阿尔都塞的经典概念，描述意识形态如何"招募"个体为主体。经典场景：**警察喊"喂，你！"→你转身回应了**。就在你转身的那一刹那，你被"询唤"成了主体。广告说"你值得拥有"——你的欲望就是这样被呼唤出来的。意识形态通过日常"呼唤"运作。', category: 'western-marxism', difficulty: 2 },
  { id: 'fc-rhizome', type: 'concept', front: '块茎 (Rhizome)', back: '德勒兹&瓜塔里核心隐喻。"树状"思维=等级化、中心-边缘。**块茎**（草根、姜）横向蔓延，任意两点可联结，无中心无边缘。块茎思维反对一切中心化知识体系，拥抱多样性、联结和逃逸线。**互联网=块茎**——没有中心层级的超链接网络。', category: 'poststructuralism', difficulty: 3 },
  { id: 'fc-biometrics', type: 'concept', front: '生命权力 (Biopower)', back: '福柯《性史》概念。与旧主权权力（"使人死"）不同——生命权力是**"使人活"的权力**：管理人口的生命过程（出生率、健康、卫生、种族）。现代国家将人的生物性纳入政治计算。新冠疫情管控就是生命权力的典型实例。', category: 'poststructuralism', difficulty: 3 },
  { id: 'fc-encumbered-self', type: 'concept', front: '负重的自我 (Encumbered Self)', back: '桑德尔对罗尔斯"无负荷的自我"的批判。我们的认同始终被**家庭、社区、民族、历史**所"负累"。这些构成性归属不是可以像换衣服一样脱掉的。你无法选择你的母语、童年、家庭故事——**它们构成了你是谁，而不仅仅是你有什么**。', category: 'communitarianism', difficulty: 2 },
  { id: 'fc-friend-enemy', type: 'concept', front: '敌友之分 (Friend-Enemy Distinction)', back: '施密特对政治本质的激进定义。政治=区分朋友和敌人——不是道德善恶或经济竞争，而是**存在论上的"我们vs他们"**。这是政治不可还原的"特异性"。自由主义假装可以通过讨论消除敌意——**施密特认为这是不诚实的逃避**。', category: 'political-philosophy', difficulty: 2 },
  { id: 'fc-politics-of-recognition', type: 'concept', front: '承认的政治 (Politics of Recognition)', back: '查尔斯·泰勒概念。我们的认同被**他人的承认或误认**所塑造。当社会对某个群体的认同施加贬低性镜像时→**这是真实的伤害**。承认的政治要求平等承认不同文化和身份的存在价值，而非仅仅"容忍"。多元文化主义的哲学基础。', category: 'communitarianism', difficulty: 2 },
  { id: 'fc-totalitarianism', type: 'concept', front: '极权主义 (Totalitarianism)', back: '阿伦特认为极权主义不是暴政的升级版，而是一种**全新的统治形式**。目标是"使人成为多余的"——消灭人的自发性和多元性，把所有人塑造成一个"一体"的。集中营是极权主义的实验室：在这里人的个性和自由被系统性地摧毁。', category: 'political-philosophy', difficulty: 2 },
  { id: 'fc-alienation', type: 'concept', front: '异化 (Alienation)', back: '马克思经典概念→西方马克思主义扩展。人创造的东西（商品、制度、技术）**反过来支配人自身**。在经济、文化、技术各层面：我们活在自己创造的世界里，却像陌生人一样被它统治。社交媒体用户被自己创造的内容生态控制=当代异化。', category: 'western-marxism', difficulty: 2 },
  { id: 'fc-discourse', type: 'concept', front: '话语 (Discourse)', back: '福柯核心概念。话语不只是"说的话"——而是一套**生产知识的规则系统**。规定在特定时代什么可以被说、什么是"真"。权力通过话语来确定"正常/疯癫"、"合法/犯罪"的边界。19世纪医学话语将同性恋定义为精神疾病→今天就不同。话语本身就是权力实践。', category: 'poststructuralism', difficulty: 3 },
  { id: 'fc-sublime-object', type: 'concept', front: '崇高客体 (Sublime Object)', back: '齐泽克借用拉康的概念。意识形态的崇高客体=一个被崇高化的普通事物——**我们明知它是普通的，却按崇高的方式对待它**。金钱最典型：人人都知道纸币只是一张纸，但行为中把它当作价值本身。意识形态正是通过这种"明知故犯"运作的。', category: 'psychoanalysis', difficulty: 3 },

  // ===== COMPARE CARDS =====
  { id: 'fc-compare-existentialism-structuralism', type: 'compare', front: '存在主义 vs 结构主义：对人的看法有什么根本不同？', back: '存在主义强调**主体的自由和选择**（萨特：人是绝对自由的），结构主义强调**结构对主体的决定**（阿尔都塞：人从来就是被意识形态"询唤"出来的）。一个说"你创造自己"，一个说"你被结构创造"。', category: 'general', difficulty: 3,
    compareItems: [
      { label: '核心主张', left: '存在先于本质——主体自由选择', right: '结构决定主体——人受制于深层结构' },
      { label: '代表', left: '萨特、加缪、波伏娃', right: '列维-斯特劳斯、阿尔都塞、拉康(早期)' },
    ],
  },
  { id: 'fc-compare-rawls-nozick', type: 'compare', front: '罗尔斯 vs 诺齐克：什么是正义的分配？', back: '罗尔斯：**差异原则**——不平等必须有利于最不利者。正义关心结果。诺齐克：**持有正义**——只要获取和转让是正义的，任何格局都是正义的。正义关心历史过程，而非最终模式。核心争点：**自由 vs 平等**——一个强调社会最底层过得怎样，一个强调财产权利神圣不可侵犯。', category: 'general', difficulty: 2,
    compareItems: [
      { label: '核心原则', left: '差异原则——必须有利于最不利者', right: '持有正义——历史的合法性无涉最终模式' },
      { label: '国家角色', left: '允许再分配→较大的政府', right: '只允许最小国家→守夜人' },
      { label: '代表', left: '罗尔斯《正义论》(1971)', right: '诺齐克《无政府、国家与乌托邦》(1974)' },
    ],
  },
  { id: 'fc-compare-foucault-habermas', type: 'compare', front: '福柯 vs 哈贝马斯：权力的分析 vs 理性的重建', back: '福柯认为**权力无处不在**——一切知识/话语中都有权力。分析任务是揭示权力如何运作。哈贝马斯认为这太悲观——理性不是只有权力，**交往理性**可以重建民主商讨的规范基础。这是"现代性能否被拯救"的辩论。福柯说"现代性就是规训"，哈贝马斯说"现代性是一项未竟的事业"。', category: 'general', difficulty: 3,
    compareItems: [
      { label: '对理性的态度', left: '怀疑——理性中总有权力', right: '希望——交往理性可以超越工具理性' },
      { label: '核心概念', left: '权力/知识、规训、生命权力', right: '交往理性、公共领域、商谈伦理' },
      { label: '出路', left: '局部反抗、生存美学', right: '民主商谈、制度重建' },
    ],
  },
  { id: 'fc-compare-adorno-benjamin', type: 'compare', front: '阿多诺 vs 哈贝马斯：法兰克福学派的两代人', back: '阿多诺（第一代）：**悲观**——"在错误的生活中不存在正确的生活"，文化工业全面收编大众，奥斯维辛之后一切都被污染。哈贝马斯（第二代）：**审慎乐观**——交往理性可以重建规范基础，现代性是"未竟的"事业而非已失败的事业。两代人的核心分歧是：**理性还有救吗？**', category: 'general', difficulty: 3,
    compareItems: [
      { label: '对现代性', left: '绝望——启蒙=新的神话', right: '希望——现代性未完成' },
      { label: '核心方法', left: '否定辩证法（否定不走向综合）', right: '交往行为理论（共识可以达成）' },
      { label: '对大众文化', left: '文化工业=纯粹的操纵', right: '公共领域虽被侵蚀，但可重建' },
    ],
  },
  { id: 'fc-compare-nietzsche-sartre', type: 'compare', front: '尼采 vs 萨特：两者都讲自由，有什么不同？', back: '尼采的自由：**创造价值**——超越传统道德，成为自我立法的"超人"。自由是少数人（超人）的成就。萨特的自由：**被判定给所有人**——每个人都是绝对自由的，不能逃避的自由。自由是负担（"人被判定为自由"），也是可能性（"存在先于本质"）。尼采的自由是征服来的，萨特的自由是甩不掉的。', category: 'general', difficulty: 2,
    compareItems: [
      { label: '自由的性质', left: '自由是征服和创造——超人之路', right: '自由是被判定的——你无法不自由' },
      { label: '面对虚无', left: '创造新价值——克服虚无主义', right: '承担自由——在无意义中自我选择' },
    ],
  },
]

export function getFlashcardsByCategory(category: string): FlashCard[] {
  return flashcards.filter(f => f.category === category)
}

export function getFlashcardById(id: string): FlashCard | undefined {
  return flashcards.find(f => f.id === id)
}

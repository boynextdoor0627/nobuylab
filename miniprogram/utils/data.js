const pauseOptions = [
  { id: 'food', icon: '🧋', iconPath: '/runtime-assets/icons/fast-food.png', label: '吃喝', defaultName: '顺手买点吃的', copy: '先喝水、走两分钟，等一下再决定。' },
  { id: 'digital', icon: '🎧', iconPath: '/runtime-assets/icons/3d-headphone.png', label: '数码', defaultName: '一个新的数码装备', copy: '先问旧的还能不能用，而不是新品有多好。' },
  { id: 'wear', icon: '👟', iconPath: '/runtime-assets/icons/3d-paper-bag.png', label: '穿搭', defaultName: '一件新的穿搭单品', copy: '先看衣柜里有没有相似功能的东西。' },
  { id: 'beauty', icon: '🧴', iconPath: '/runtime-assets/icons/face-powder.png', label: '护肤', defaultName: '一瓶新的护肤品', copy: '先查库存和开封日期，别让低价变囤货。' },
  { id: 'home', icon: '🛋️', iconPath: '/runtime-assets/icons/house.png', label: '家居', defaultName: '一个家居小物', copy: '先确认摆放位置和使用频率。' },
  { id: 'other', icon: '🛍️', iconPath: '/runtime-assets/icons/3d-present.png', label: '其他', defaultName: '一次消费冲动', copy: '先放进冷静箱，明天回来决定。' }
]

const shopCategories = [
  { id: 'all', label: '推荐' },
  { id: 'food', label: '吃喝' },
  { id: 'digital', label: '数码' },
  { id: 'wear', label: '穿搭' },
  { id: 'beauty', label: '护肤' },
  { id: 'home', label: '家居' }
]

function shopProduct(id, category, categoryLabel, name, note, price, icon, iconPath, coolingMinutes) {
  return { id, category, categoryLabel, name, note, price, icon, iconPath, coolingMinutes }
}

const shopProducts = [
  shopProduct('food-dinner', 'food', '吃喝', '今晚的外卖', '先看看家里还能做什么', 36, '🍱', '/runtime-assets/icons/fast-food.png', 30),
  shopProduct('food-tea', 'food', '吃喝', '顺手一杯奶茶', '想喝，还是只是有点累？', 22, '🧋', '/runtime-assets/icons/fast-food.png', 20),
  shopProduct('food-night', 'food', '吃喝', '加班夜宵', '饿了，还是想奖励自己？', 28, '🍜', '/runtime-assets/icons/fast-food.png', 30),
  shopProduct('food-coffee', 'food', '吃喝', '下午咖啡', '先喝水，十分钟后再决定', 19, '☕', '/runtime-assets/icons/fast-food.png', 20),
  shopProduct('food-dessert', 'food', '吃喝', '一份小甜点', '今天真的需要这份甜吗？', 26, '🍰', '/runtime-assets/icons/fast-food.png', 30),
  shopProduct('food-fried', 'food', '吃喝', '炸鸡套餐', '先确认不是被满减推着走', 42, '🍗', '/runtime-assets/icons/fast-food.png', 30),
  shopProduct('food-fruit', 'food', '吃喝', '一份水果捞', '家里的水果还剩多少？', 32, '🍓', '/runtime-assets/icons/fast-food.png', 20),
  shopProduct('food-snack', 'food', '吃喝', '便利店零食', '别让顺手买变成一大袋', 45, '🍿', '/runtime-assets/icons/fast-food.png', 30),

  shopProduct('digital-headphone', 'digital', '数码', '新的降噪耳机', '旧的还能正常使用吗？', 899, '🎧', '/runtime-assets/icons/3d-headphone.png', 4320),
  shopProduct('digital-accessory', 'digital', '数码', '手机小配件', '先放一天再看需要程度', 129, '📱', '/runtime-assets/icons/3d-folder.png', 1440),
  shopProduct('digital-tablet', 'digital', '数码', '一台新平板', '现有设备解决不了什么？', 3299, '💻', '/runtime-assets/icons/3d-folder.png', 10080),
  shopProduct('digital-power', 'digital', '数码', '新的充电宝', '旧的容量真的不够了吗？', 159, '🔋', '/runtime-assets/icons/3d-folder.png', 1440),
  shopProduct('digital-keyboard', 'digital', '数码', '机械键盘', '手感想象不等于使用频率', 399, '⌨️', '/runtime-assets/icons/3d-folder.png', 4320),
  shopProduct('digital-watch', 'digital', '数码', '智能手表', '先列出三个每天会用的功能', 1299, '⌚', '/runtime-assets/icons/3d-alarm.png', 10080),
  shopProduct('digital-camera', 'digital', '数码', '一台新相机', '先看相册里上次拍摄日期', 3999, '📷', '/runtime-assets/icons/3d-photo.png', 10080),
  shopProduct('digital-gamepad', 'digital', '数码', '游戏手柄', '最近真的有时间玩吗？', 459, '🎮', '/runtime-assets/icons/3d-headphone.png', 4320),

  shopProduct('wear-shoes', 'wear', '穿搭', '一双新鞋', '衣柜里有相似用途的吗？', 499, '👟', '/runtime-assets/icons/3d-paper-bag.png', 1440),
  shopProduct('wear-bag', 'wear', '穿搭', '新的通勤包', '先想清楚使用频率', 399, '👜', '/runtime-assets/icons/3d-paper-bag.png', 1440),
  shopProduct('wear-jacket', 'wear', '穿搭', '一件新外套', '现有外套缺少哪种场景？', 699, '🧥', '/runtime-assets/icons/3d-paper-bag.png', 4320),
  shopProduct('wear-hoodie', 'wear', '穿搭', '一件连帽卫衣', '相似颜色已经有几件？', 329, '👕', '/runtime-assets/icons/3d-paper-bag.png', 1440),
  shopProduct('wear-hat', 'wear', '穿搭', '一顶新帽子', '拍照好看会经常戴吗？', 159, '🧢', '/runtime-assets/icons/3d-paper-bag.png', 1440),
  shopProduct('wear-dress', 'wear', '穿搭', '一条新裙子', '先想三个真实穿着场合', 459, '👗', '/runtime-assets/icons/3d-paper-bag.png', 4320),
  shopProduct('wear-necklace', 'wear', '穿搭', '一条项链', '搭配需要还是临时心动？', 299, '📿', '/runtime-assets/icons/3d-present.png', 1440),
  shopProduct('wear-glasses', 'wear', '穿搭', '一副太阳镜', '今年会有多少户外时间？', 399, '🕶️', '/runtime-assets/icons/3d-paper-bag.png', 4320),

  shopProduct('beauty-set', 'beauty', '护肤', '一套护肤品', '先检查家里的库存', 299, '🧴', '/runtime-assets/icons/face-powder.png', 1440),
  shopProduct('beauty-makeup', 'beauty', '护肤', '一件彩妆新品', '新品不等于现在需要', 259, '💄', '/runtime-assets/icons/eyeshadow.png', 1440),
  shopProduct('beauty-sun', 'beauty', '护肤', '新的防晒', '已开封的还有多少？', 129, '☀️', '/runtime-assets/icons/face-powder.png', 1440),
  shopProduct('beauty-perfume', 'beauty', '护肤', '一瓶新香水', '小样是否已经认真用完？', 499, '🌸', '/runtime-assets/icons/face-powder.png', 4320),
  shopProduct('beauty-mask', 'beauty', '护肤', '一盒面膜', '囤货不会让使用速度变快', 99, '🫧', '/runtime-assets/icons/face-powder.png', 1440),
  shopProduct('beauty-lipstick', 'beauty', '护肤', '一支新口红', '相近色号是不是已经有了？', 219, '💄', '/runtime-assets/icons/eyeshadow.png', 1440),
  shopProduct('beauty-cleaner', 'beauty', '护肤', '一瓶卸妆产品', '先查开封库存和保质期', 129, '🧼', '/runtime-assets/icons/face-powder.png', 1440),
  shopProduct('beauty-body', 'beauty', '护肤', '一瓶身体乳', '别为了凑单多买一瓶', 89, '🧴', '/runtime-assets/icons/face-powder.png', 1440),

  shopProduct('home-decor', 'home', '家居', '一个家居摆件', '先确认它要放在哪里', 169, '🪴', '/runtime-assets/icons/house.png', 1440),
  shopProduct('home-storage', 'home', '家居', '新的收纳用品', '收纳前先减少不需要的东西', 89, '📦', '/runtime-assets/icons/3d-present.png', 1440),
  shopProduct('home-lamp', 'home', '家居', '一盏氛围灯', '照明需求还是照片氛围？', 299, '💡', '/runtime-assets/icons/house.png', 4320),
  shopProduct('home-bedding', 'home', '家居', '一套新床品', '现有床品真的需要替换吗？', 499, '🛏️', '/runtime-assets/icons/house.png', 4320),
  shopProduct('home-aroma', 'home', '家居', '一组香薰', '先用完家里已经打开的', 169, '🕯️', '/runtime-assets/icons/house.png', 1440),
  shopProduct('home-cup', 'home', '家居', '一个新杯子', '柜子里还有多少只杯子？', 129, '☕', '/runtime-assets/icons/3d-present.png', 1440),
  shopProduct('home-appliance', 'home', '家居', '一台小家电', '清洁成本也算使用成本', 399, '🍳', '/runtime-assets/icons/house.png', 4320),
  shopProduct('home-chair', 'home', '家居', '一把新椅子', '先量尺寸，再想使用位置', 699, '🪑', '/runtime-assets/icons/house.png', 4320)
]

const plazaTopics = ['推荐', '差点买了', '还好没买', '下班冲动', '种草灭火', '提问']

const plazaPosts = [
  {
    id: 'sq-001',
    topic: '差点买了',
    icon: '🎧',
    iconPath: '/runtime-assets/icons/3d-headphone.png',
    tone: 'dark',
    photo: '/runtime-assets/plaza/headphones.jpg',
    photoSource: 'https://www.pexels.com/photo/headphones-on-desk-5877660/',
    photographer: 'Kaboompics.com',
    author: '阿眠',
    title: '差点为了新品发布会换耳机',
    summary: '旧耳机其实还能用。我把“想拥有新东西”和“真的不能用了”分开写了一下，突然冷静。',
    body: ['旧耳机还能通话、降噪也正常，唯一的问题是我刷了太多新品测评。', '先丢进冷静箱，30 天后如果还是影响使用，再重新判断。'],
    tags: ['数码', '守住¥1899'],
    likes: 286,
    comments: [
      { name: '小满', text: '新品发布会真的很会制造焦虑。' },
      { name: '十一', text: '先不刷测评这个太关键了。' }
    ]
  },
  {
    id: 'sq-002',
    topic: '还好没买',
    icon: '📋',
    iconPath: '/runtime-assets/icons/3d-folder.png',
    tone: 'green',
    photo: '',
    photoSource: 'https://www.pexels.com/photo/woman-sitting-in-an-office-and-holding-a-smartphone-and-a-credit-card-in-her-hands-22046261/',
    photographer: 'Vitaly Gariev',
    author: '研究所编辑',
    title: '刚取消 4 个自动续费',
    summary: '不是大额省钱，但每个月少漏一点血。建议今天顺手查一下订阅。',
    body: ['视频、音乐、云盘、修图工具各查一遍。每周没打开过的，先取消自动续费。', '取消续费不等于马上失去权益，只是把下一次付款权拿回来。'],
    tags: ['订阅', '固定支出'],
    likes: 512,
    comments: [
      { name: 'Echo', text: '我昨天才发现两个重复云盘。' },
      { name: '北北', text: '这个比记账更容易立刻行动。' }
    ]
  },
  {
    id: 'sq-003',
    topic: '种草灭火',
    icon: '⚠️',
    iconPath: '/runtime-assets/icons/face-powder.png',
    tone: 'yellow',
    photo: '/runtime-assets/plaza/body-lotion.jpg',
    photoSource: 'https://www.pexels.com/photo/bottles-with-cosmetic-products-15569183/',
    photographer: 'mearlywan',
    author: '小林',
    title: '满减差 49，我差点多买一瓶身体乳',
    summary: '为了省 20 多花 49，这个数学题每次大促都重考一次。',
    body: ['我先看了不凑单的付款额，再看凑单后的付款额，发现所谓优惠只是让我多买。', '最后删掉凑单商品，购物车瞬间安静。'],
    tags: ['满减', '别凑单'],
    likes: 403,
    comments: [
      { name: 'Momo', text: '“购物车瞬间安静”好真实。' },
      { name: '晴天', text: '我需要大促前每天看一遍。' }
    ]
  },
  {
    id: 'sq-004',
    topic: '下班冲动',
    icon: '🌙',
    iconPath: '/runtime-assets/icons/3d-alarm.png',
    tone: 'purple',
    photo: '',
    photoSource: 'https://www.pexels.com/photo/woman-using-a-cellphone-while-sitting-on-bed-8036687/',
    photographer: 'SHVETS production',
    author: '不买研究所',
    title: '22:00 以后想下单，先睡一觉',
    summary: '深夜的购买欲经常不是需要，是累、烦、想奖励自己。第二天中午再看，通常会少一半。',
    body: ['今天开始试 7 天：22:00 后产生的非必要消费，只记录，不付款。', '第二天中午只问一句：我现在还想买吗？'],
    tags: ['下班后', '报复性消费'],
    likes: 637,
    comments: [
      { name: '阿予', text: '我最危险的时间就是洗完澡躺床上。' },
      { name: 'KK', text: '这个挑战可以常驻。' }
    ]
  },
  {
    id: 'sq-005',
    topic: '提问',
    icon: '🧳',
    iconPath: '/runtime-assets/icons/3d-map.png',
    tone: 'blue',
    photo: '/runtime-assets/plaza/travel-camera.jpg',
    photoSource: 'https://www.pexels.com/photo/a-camera-on-a-beach-16104592/',
    photographer: 'Saheemc',
    author: '山竹',
    title: '旅行前到底要不要买运动相机？',
    summary: '下个月去海岛，已经开始被各种设备种草。有人真的高频用吗？',
    body: ['现在的手机够拍日常，但是刷到别人 vlog 又开始心动。', '想听买过的人：是长期使用，还是旅行回来就吃灰？'],
    tags: ['旅行', '求劝退'],
    likes: 194,
    comments: [
      { name: '橙子', text: '如果不是经常潜水或骑行，租一次更适合。' },
      { name: '研究所编辑', text: '先把预算留给行程体验，设备最后再决定。' }
    ]
  },
  {
    id: 'sq-006',
    topic: '还好没买',
    icon: '🧋',
    iconPath: '/runtime-assets/icons/fast-food.png',
    tone: 'coral',
    photo: '/runtime-assets/plaza/bubble-tea.jpg',
    photoSource: 'https://www.pexels.com/photo/refreshing-bubble-tea-in-sunlit-cafe-34571353/',
    photographer: 'edorm',
    author: '今天不喝也行',
    title: '把每天奶茶改成每周两杯',
    summary: '不是戒掉快乐，是把“顺手买”改回“真的想喝才买”。',
    body: ['很多时候只是困、口渴、想离开工位五分钟。', '现在保留最想喝的两杯，其他时候先喝水或出去走一圈。'],
    tags: ['奶茶', '频率管理'],
    likes: 328,
    comments: [
      { name: '小满', text: '不是戒掉快乐，这句很舒服。' },
      { name: 'Nana', text: '我也不想把省钱做成惩罚。' }
    ]
  },
  {
    id: 'sq-007',
    topic: '种草灭火',
    icon: '🧴',
    iconPath: '/runtime-assets/icons/eyeshadow.png',
    tone: 'purple',
    photo: '',
    photoSource: 'https://www.pexels.com/photo/skincare-products-on-store-shelves-3735655/',
    photographer: 'Polina Tankilevitch',
    author: '研究所编辑',
    title: '囤货最贵的地方不是单价',
    summary: '占空间、忘记用、过期、换肤质。历史低价不等于适合现在的你。',
    body: ['买之前先看家里同类库存能用多久。超过三个月，就把“历史低价”当作普通广告。', '省钱不是把未来半年都塞进柜子里。'],
    tags: ['护肤', '囤货'],
    likes: 251,
    comments: [
      { name: 'Echo', text: '我柜子里还有去年双十一的面膜。' },
      { name: '阿眠', text: '被“适合现在的你”打醒。' }
    ]
  }
]

module.exports = {
  pauseOptions,
  shopCategories,
  shopProducts,
  plazaTopics,
  plazaPosts
}

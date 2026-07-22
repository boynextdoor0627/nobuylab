const pauseOptions = [
  { id: 'food', icon: '🧋', iconPath: '/assets/icons/no-money.png', label: '吃喝', defaultName: '顺手买点吃的', copy: '先喝水、走两分钟，等一下再决定。' },
  { id: 'digital', icon: '🎧', iconPath: '/assets/icons/smartphone.png', label: '数码', defaultName: '一个新的数码装备', copy: '先问旧的还能不能用，而不是新品有多好。' },
  { id: 'wear', icon: '👟', iconPath: '/assets/icons/wallet-passes-app.png', label: '穿搭', defaultName: '一件新的穿搭单品', copy: '先看衣柜里有没有相似功能的东西。' },
  { id: 'beauty', icon: '🧴', iconPath: '/assets/icons/refund.png', label: '护肤', defaultName: '一瓶新的护肤品', copy: '先查库存和开封日期，别让低价变囤货。' },
  { id: 'home', icon: '🛋️', iconPath: '/assets/icons/bank.png', label: '家居', defaultName: '一个家居小物', copy: '先确认摆放位置和使用频率。' },
  { id: 'other', icon: '🛍️', iconPath: '/assets/icons/money-bag.png', label: '其他', defaultName: '一次消费冲动', copy: '先丢进冷静箱，明天回来开奖。' }
]

const plazaTopics = ['推荐', '差点买了', '还好没买', '种草灭火', '提问']

const plazaPosts = [
  {
    id: 'sq-001',
    topic: '差点买了',
    icon: '🎧',
    iconPath: '/assets/icons/smartphone.png',
    tone: 'dark',
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
    iconPath: '/assets/icons/savings.png',
    tone: 'green',
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
    iconPath: '/assets/icons/no-money.png',
    tone: 'yellow',
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
    topic: '提问',
    icon: '🧳',
    iconPath: '/assets/icons/wallet.png',
    tone: 'blue',
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
  }
]

module.exports = {
  pauseOptions,
  plazaTopics,
  plazaPosts
}

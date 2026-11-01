export const EXHIBITIONS = [
  {
    id: 1,
    slug: "solos",
    title: "SOLOS",
    date: {
        start: "2026-11-22",
        end: "2026-11-30",
    },
    location: {
        name: "CollaPlay",
        address: "108台灣臺北市萬華區武昌街二段83之6號3樓",
        url: "https://collaplay.com/",
    },
    description: {
      en: "There are countless people in the world, each living their own lives in different places.\nAnd yet, somewhere, two people are sharing the same moment, in the same place.\n\nMaybe they met by chance. Maybe they chose to be there together.\n\nSOLOS is a photography exhibition exploring the quiet connections that exist within the vastness of our world.",
      ja: "世界には無数の人がいます。それぞれが異なる場所で異なる生活を送っています。\nしかし、どこかで、2人が同じ瞬間を共有しています。\n\n偶然に出会ったかもしれません。あるいは、そこに行くことを選んだかもしれません。\n\nSOLOSは、世界の広さの中に存在する静かなつながりを探る写真展です。",
      cn: "世界上有數不清的人，每個人都在不同的地方，過著各自的生活。\n\n而此時此刻，在世界的某個角落，有兩個人正一起度過同一段時光。\n\n也許他們是偶然相遇，也許是選擇了陪伴彼此。\n\nSOLOS 是一場攝影展，透過影像凝視這個廣闊世界中，那些安靜而細微的連結。"
    },
    image: "/images/assets/hero.jpg",
    imagesCount: 4,
  },
] as const;
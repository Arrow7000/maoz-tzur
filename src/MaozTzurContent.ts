export const ashkenaz = "ashkenaz";
export const sefarad = "sefarad";
export const sefaradi = "sefaradi";

export type Nusach = typeof ashkenaz | typeof sefarad | typeof sefaradi;

export const hebrew = "hebrew";
export const english = "english";

export type Language = typeof hebrew | typeof english;

export type AllAttributes = Nusach | Language;

export type Attribute = "language" | "nusach";

export interface TextSubsection {
  title?: string;
  text: string;
}

export interface ContentSection {
  title: string;
  subtitle: string;
  content: TextSubsection[];
}

export type NusachimSection = { [l in Nusach]: ContentSection[] };
export type LangSection = { [l in Language]: NusachimSection };

export interface AttributeSection<T extends string> {
  label: string;
  tag: T;
}

export interface Selection {
  language: Language;
  nusach: Nusach;
}

export type ChangeSelect = (type: Attribute, selection: AllAttributes) => void;

export const nusachim: AttributeSection<Nusach>[] = [
  {
    label: "Nusach Ashkenaz",
    tag: "ashkenaz"
  },
  {
    label: "Nusach Sefarad",
    tag: "sefarad"
  },
  {
    label: "Edut Hamizrach",
    tag: "sefaradi"
  }
];

export const languages: AttributeSection<Language>[] = [
  {
    label: "English",
    tag: "english"
  },
  {
    label: "Hebrew",
    tag: "hebrew"
  }
];

const content: LangSection = {
  hebrew: {
    ashkenaz: [
      {
        title: "Menorah Lighting Blessings",
        subtitle: "One says these blessings before lighting the Menorah",
        content: [
          {
            text:
              "בָּרוּךְ אַתָּה יְיָ אֱלֹהֵנוּ מֶלֶךְ הָעוֹלָם אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו וְצִוָּנוּ לְהַדְלִיק נֵר שֶׁל חֲנֻכָּה׃"
          },
          {
            text:
              "בָּרוּךְ אַתָּה יְיָ אֱלֹהֵנוּ מֶלֶךְ הָעוֹלָם שֶׁעָשָׂה נִסִּים לַאֲבוֹתֵינוּ בַּיָּמים הָהֵם בַּזְּמַן הַזֶּה׃"
          },
          {
            title: "This blessing is only said on the first night:",
            text:
              "בָּרוּךְ אַתָּה יְיָ אֱלֹהֵנוּ מֶלֶךְ הָעוֹלָם שֶׁהֶחֱיָנוּ וְקִיְּמָנוּ וְהִגִּיעָנוּ לַזְּמַן הַזֶּה׃"
          }
        ]
      },
      {
        title: "Hanerot Halalu",
        subtitle: "After lighting one says this",
        content: [
          {
            text:
              "הנֵּרוֹת הַלָּלוּ אֳנוּ מַדְלִיקִין עַל הַנִּסִּים וְעַל הַנִּפְלָאוֹת וְעַל הַתְּשׁוּעוֹת וְעַל הַמִּלְחָמוֹת שֶׁעָשִׂיתָ לַאֲבוֹתֵינוּ בַּיָמִים הָהֵם בִּזְמַן הַזֶּה עַל יְדֵי כֹּּהֲנֶיךָ הַקּדוֹשִׁים. וְכָל שְׁמוֹנַת יְמֵי חֲנֻכָּה הַנֵּרוֹת הַלָּלוּ קֹדֶשׁ הֵם וְאֵין לָנוּ רְשׁוּת להִשְׁתַּמֵשׁ בָּהֶן אֶלָּא לִראוֹתָן בִּלְבָד כְּדֵי לְהוֹדוֹת וּלְהַלֵּל לְשִׁמְךָ הַגָּדוֹל עַל נִסֶּיךָָ וְעַל נִפְלְאוֹתֶיךָ וְעַל יְשׁוּעָתֶיךָ׃"
          }
        ]
      },
      {
        title: "Maoz Tzur",
        subtitle: "This is sung after the lighting of the Menorah",
        content: [
          {
            text:
              "מָעוֹז צוּר יְשׁוּעָתִי, לְךָ נָאֶה לְשַׁבֵּחַ תִּכּוֹן בֵּית תְּפִלָּתִי, וְשָׁם תּוֹדָה נְזַבֵּחַ. לְעֵת תָּכִין מַטְבֵּחַ מִצָּר הַמְנַבֵּחַ. אָז אֶגְמוֹר בְּשִׁיר מִזְמוֹר חֲנֻכַּת הַמִּזְבֵּחַ"
          },
          {
            text:
              "רָעוֹת שָׂבְעָה נַפְשִׁי, בְּיָגוֹן כֹּחִי כָּלָה חַיַּי מֵרְרוּ בְקֹשִׁי, בְּשִׁעְבּוּד מַלְכוּת עֶגְלָה וּבְיָדוֹ הַגְּדוֹלָה הוֹצִיא אֶת הַסְּגֻלָּה חֵיל פַּרְעֹה וְכָל זַרְעוֹ יָרְדוּ כְּאֶבֶן בִּמְצוּלָה"
          },
          {
            text:
              "דְּבִיר קָדְשׁוֹ הֱבִיאַנִי, וְגַם שָׁם לֹא שָׁקַטְתִּי וּבָא נוֹגֵשׂ וְהִגְלַנִי, כִּי זָרִים עָבַדְתִּי וְיֵין רַעַל מָסַכְתִּי, כִּמְעַט שֶׁעָבַרְתִּי קֵץ בָּבֶל זְרֻבָּבֶל, לְקֵץ שִׁבְעִים נוֹשַׁעְתִּי"
          },
          {
            text:
              "כְּרוֹת קוֹמַת בְּרוֹשׁ בִּקֵּשׁ, אֲגָגִי בֶּן הַמְּדָתָא וְנִהְיָתָה לוֹ לְפַח וּלְמוֹקֵשׁ, וְגַאֲוָתוֹ נִשְׁבָּתָה רֹאשׁ יְמִינִי נִשֵּׂאתָ, וְאוֹיֵב שְׁמוֹ מָחִיתָ רֹב בָּנָיו וְקִנְיָנָיו עַל הָעֵץ תָּלִיתָ"
          },
          {
            text:
              "יְוָנִים נִקְבְּצוּ עָלַי, אֲזַי בִּימֵי חַשְׁמַנִּים וּפָרְצוּ חוֹמוֹת מִגְדָּלַי, וְטִמְּאוּ כָּל הַשְּׁמָנִים וּמִנּוֹתַר קַנְקַנִּים נַעֲשָׂה נֵס לַשּׁוֹשַׁנִּים בְּנֵי בִינָה יְמֵי שְׁמוֹנָה קָבְעוּ שִׁיר וּרְנָנִים"
          },
          {
            text:
              "חֲשׂוֹף זְרוֹעַ קָדְשֶׁךָ וְקָרֵב קֵץ הַיְשׁוּעָה נְקֹם נִקְמַת עֲבָדֶיךָ מֵאֻמָּה הָרְשָׁעָה כִּי אָרְכָה הַשָּׁעָה וְאֵין קֵץ לִימֵי הָרָעָה דְּחֵה אַדְמוֹן בְּצֵל צַלְמוֹן הָקֵם לָנוּ רוֹעִים שִׁבְעָה"
          }
        ]
      }
    ],
    sefarad: [],
    sefaradi: []
  },
  english: {
    ashkenaz: [
      {
        title: "Menorah Lighting Blessings",
        subtitle: "One says these blessings before lighting the Menorah",
        content: [
          {
            text:
              "Blessed are You, Lord our G‑d, King of the universe, who has sanctified us with His commandments, and commanded us to kindle the Chanukah light."
          },
          {
            text:
              "Blessed are You, Lord our G‑d, King of the universe, who performed miracles for our forefathers in those days, at this time."
          },
          {
            title: "This blessing is only said on the first night:",
            text:
              "Blessed are You, Lord our G‑d, King of the universe, who has granted us life, sustained us, and enabled us to reach this occasion."
          }
        ]
      },
      {
        title: "Hanerot Halalu",
        subtitle: "After lighting one says this",
        content: [
          {
            text:
              "We kindle these lights (to commemorate) the saving acts, miracles and wonders which You have performed for our forefathers, in those days at this time, through Your holy priests. Throughout the eight days of Chanukah, these lights are sacred, and we are not permitted to make use of them, but only to look at them, in order to offer thanks and praise to Your great Name for Your miracles, for Your wonders and for Your salvations."
          }
        ]
      },
      {
        title: "Maoz Tzur",
        subtitle: "This is sung after the lighting of the Menorah",
        content: [
          {
            text:
              "O mighty stronghold of my salvation, to praise You is a delight. Restore my House of Prayer and there we will bring a thanksgiving offering. When You will have prepared the slaughter for the blaspheming foe, Then I shall complete with a song of hymn the dedication of the Altar."
          },
          {
            text:
              "My soul had been sated with troubles, my strength has been consumed with grief. They had embittered my life with hardship, with the calf-like kingdom's bondage. But with His great power He brought forth the treasured ones, Pharaoh's army and all his offspring Went down like a stone into the deep. "
          },
          {
            text:
              "To the holy abode of His Word He brought me. But there, too, I had no rest And an oppressor came and exiled me. For I had served aliens, And had drunk benumbing wine. Scarcely had I departed At Babylon's end Zerubabel came. At the end of seventy years I was saved. "
          },
          {
            text:
              "To sever the towering cypress sought the Aggagite, son of Hammedatha, But it became [a snare and] a stumbling block to him and his arrogance was stilled. The head of the Benjaminite You lifted and the enemy, his name You obliterated His numerous progeny - his possessions on the gallows You hanged. "
          },
          {
            text:
              "Greeks gathered against me then in Hasmonean days. They breached the walls of my towers and they defiled all the oils; And from the one remnant of the flasks a miracle was wrought for the roses. Men of insight - eight days established for song and jubilation "
          },
          {
            text:
              "Bare Your holy arm and hasten the End for salvation Avenge the vengeance of Your servants' blood from the wicked nation. For the triumph is too long delayed for us, and there is no end to days of evil, Repel the Red One in the nethermost shadow and establish for us the seven shepherds. "
          }
        ]
      }
    ],
    sefarad: [],
    sefaradi: []
  }
};

export default content;

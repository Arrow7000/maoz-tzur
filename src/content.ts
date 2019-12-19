export const isAllContent = (
  texts: ContentVersions | AllContent
): texts is AllContent => !!(texts as AllContent).all;

export const content: ContentSection[] = [
  {
    title: "Menorah Lighting Blessings",
    subtitle: "One says these blessings before lighting the Menorah",
    content: [
      {
        texts: {
          all: [
            "בָּרוּךְ אַתָּה יְיָ אֱלֹהֵנוּ מֶלֶךְ הָעוֹלָם אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו וְצִוָּנוּ לְהַדְלִיק נֵר (שֶׁל) חֲנֻכָּה׃"
          ]
        }
      },
      {
        texts: {
          all: [
            "בָּרוּךְ אַתָּה יְיָ אֱלֹהֵנוּ מֶלֶךְ הָעוֹלָם שֶׁעָשָׂה נִסִּים לַאֲבוֹתֵינוּ בַּיָּמים הָהֵם בַּזְּמַן הַזֶּה׃"
          ]
        }
      },
      {
        title: "This blessing is only said on the first night:",
        texts: {
          all: [
            "בָּרוּךְ אַתָּה יְיָ אֱלֹהֵנוּ מֶלֶךְ הָעוֹלָם שֶׁהֶחֱיָנוּ וְקִיְּמָנוּ וְהִגִּיעָנוּ לַזְּמַן הַזֶּה׃"
          ]
        }
      }
    ]
  },
  {
    title: "Hanerot Halalu",
    subtitle: "After lighting one says this",
    content: [
      {
        texts: {
          ashkenaz: [
            "הַנֵּרוֹת הַלָּלוּ אָֽנוּ מַדְלִיקִין, עַל הַנִּסִּים וְעַל הַנִּפְלָאוֹת (וְעַל הַתְּשׁוּעוֹת וְעַל הַמִּלְחָמוֹת), שֶׁעָשִׂיתָ לַאֲבוֹתֵינוּ בַּיָּמִים הָהֵם בַּזְמַן הַזֶּה, עַל יְדֵי כֹּהֲנֶיךָ הַקְּדוֹשִים.",
            'וְכָל שְמוֹנַת יְמֵי חֲנֻכָּה, הַנֵּרוֹת הַלָּלוּ קֹדֶשׁ הֵן, וְאֵין לָנוּ רְשׁוּת לְהִשְׁתַּמֵּשׁ בָּהֵן, אֶלָּא לִרְאוֹתָן בִּלְבָד, כְּדֵי לְהוֹדוֹת וּלְהַלֵל לְשִׁמְךָ הַגָּדוֹל (י"ג: לִשְמֶךָ), עַל נִסֶּיךָ וְעַל נִפְלְאוֹתֶיךָ וְעַל יְשׁוּעָתֶךָ׃'
          ],
          sefardi: [
            "הַנֵּרוֹת הַלָּלוּ אָנַֽחְנוּ מַדְלִיקִים, עַל הַנִּסִּים וְעַל הָפּוּרְקָן וְעַל הָגְּבוּרוֹת וְעַל הַתְּשׁוּעוֹת וְעַל הַנִּפְלָאוֹת וְעַל הַנֶחָמוֹת, שֶׁעָשִׂיתָ לַאֲבוֹתֵינוּ בַּיָּמִים הָהֵם בַּזְמַן הַזֶּה, עַל יְדֵי כֹּהֲנֶיךָ הַקְּדוֹשִים.",
            "וְכָל שְמוֹנַת יְמֵי הָחֲנֻכָּה, הַנֵּרוֹת הַלָּלוּ קֹדֶשׁ הֵם, וְאֵין לָנוּ רְשׁוּת לְהִשְׁתַּמֵּשׁ בָּהֵם, אֶלָּא לִרְאוֹתָם בִּלְבָד, כְּדֵי לְהוֹדוֹת לִשְמֶךָ, עַל נִסֶּיךָ וְעַל נִפְלְאוֹתֶיךָ וְעַל יְשׁוּעוֹתֶיךָ׃"
          ]
        }
      }
    ]
  },
  {
    title: "Maoz Tzur",
    subtitle: "This is sung after the lighting of the Menorah",
    content: [
      {
        texts: {
          all: [
            "מָעוֹז צוּר יְשׁוּעָתִי, לְךָ נָאֶה לְשַׁבֵּחַ תִּכּוֹן בֵּית תְּפִלָּתִי, וְשָׁם תּוֹדָה נְזַבֵּחַ. לְעֵת תָּכִין מַטְבֵּחַ מִצָּר הַמְנַבֵּחַ. אָז אֶגְמוֹר בְּשִׁיר מִזְמוֹר חֲנֻכַּת הַמִּזְבֵּחַ",
            "רָעוֹת שָׂבְעָה נַפְשִׁי, בְּיָגוֹן כֹּחִי כָּלָה חַיַּי מֵרְרוּ בְקֹשִׁי, בְּשִׁעְבּוּד מַלְכוּת עֶגְלָה וּבְיָדוֹ הַגְּדוֹלָה הוֹצִיא אֶת הַסְּגֻלָּה חֵיל פַּרְעֹה וְכָל זַרְעוֹ יָרְדוּ כְּאֶבֶן בִּמְצוּלָה",
            "דְּבִיר קָדְשׁוֹ הֱבִיאַנִי, וְגַם שָׁם לֹא שָׁקַטְתִּי וּבָא נוֹגֵשׂ וְהִגְלַנִי, כִּי זָרִים עָבַדְתִּי וְיֵין רַעַל מָסַכְתִּי, כִּמְעַט שֶׁעָבַרְתִּי קֵץ בָּבֶל זְרֻבָּבֶל, לְקֵץ שִׁבְעִים נוֹשַׁעְתִּי",
            "כְּרוֹת קוֹמַת בְּרוֹשׁ בִּקֵּשׁ, אֲגָגִי בֶּן הַמְּדָתָא וְנִהְיָתָה לוֹ לְפַח וּלְמוֹקֵשׁ, וְגַאֲוָתוֹ נִשְׁבָּתָה רֹאשׁ יְמִינִי נִשֵּׂאתָ, וְאוֹיֵב שְׁמוֹ מָחִיתָ רֹב בָּנָיו וְקִנְיָנָיו עַל הָעֵץ תָּלִיתָ",
            "יְוָנִים נִקְבְּצוּ עָלַי, אֲזַי בִּימֵי חַשְׁמַנִּים וּפָרְצוּ חוֹמוֹת מִגְדָּלַי, וְטִמְּאוּ כָּל הַשְּׁמָנִים וּמִנּוֹתַר קַנְקַנִּים נַעֲשָׂה נֵס לַשּׁוֹשַׁנִּים בְּנֵי בִינָה יְמֵי שְׁמוֹנָה קָבְעוּ שִׁיר וּרְנָנִים",
            "חֲשׂוֹף זְרוֹעַ קָדְשֶׁךָ וְקָרֵב קֵץ הַיְשׁוּעָה נְקֹם נִקְמַת עֲבָדֶיךָ מֵאֻמָּה הָרְשָׁעָה כִּי אָרְכָה הַשָּׁעָה וְאֵין קֵץ לִימֵי הָרָעָה דְּחֵה אַדְמוֹן בְּצֵל צַלְמוֹן הָקֵם לָנוּ רוֹעִים שִׁבְעָה"
          ]
        }
      }
    ]
  }
];

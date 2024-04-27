import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useCallback, useState, useEffect } from "react";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { getHeightPercentage, getWidthPercentage } from "../../helpers/common";
import { theme } from "../../constants/theme";
import Categories from "../../components/Categories";
import ImagesGrid from "../../components/ImagesGrid";
import { apiCall } from "../../api";

const index = () => {
  const [searchText, setSearchText] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [images, setImages] = useState([
    {
      collections: 221,
      comments: 45,
      downloads: 65664,
      id: 8595521,
      imageHeight: 4032,
      imageSize: 970371,
      imageWidth: 3024,
      largeImageURL:
        "https://pixabay.com/get/gdc1392cecb8886c8c4c37dc1ab0da12fd488980bd79866232eb31dd4ef74edfc320d7c71f8d202d289e0eedc91c9569229f6357b574bc6220c933fb213a56b6e_1280.jpg",
      likes: 1052,
      pageURL: "https://pixabay.com/photos/forsythia-flowers-branch-8595521/",
      previewHeight: 150,
      previewURL:
        "https://cdn.pixabay.com/photo/2024/02/25/10/11/forsythia-8595521_150.jpg",
      previewWidth: 112,
      tags: "forsythia, flowers, branch",
      type: "photo",
      user: "Mylene2401",
      userImageURL:
        "https://cdn.pixabay.com/user/2020/08/02/06-54-24-533_250x250.jpeg",
      user_id: 10328767,
      views: 79935,
      webformatHeight: 640,
      webformatURL:
        "https://pixabay.com/get/gd95e2200eeb91a3cfb70ed171f9d59ad7fc13d2e2fe5653d93bb1f1c890a9db79211d8b58b549f9358a70b20ef5954cb_640.jpg",
      webformatWidth: 480,
    },
    {
      collections: 95,
      comments: 33,
      downloads: 43944,
      id: 8599119,
      imageHeight: 6391,
      imageSize: 3457731,
      imageWidth: 5072,
      largeImageURL:
        "https://pixabay.com/get/gbf29091cca16ad1c2399e255b80ba30966e4be166100266e68ce51fac2389fe2311d11b8576e9070f954052c36ee5b833ae0b12af46a6bcceaeae4ee5abc033b_1280.jpg",
      likes: 662,
      pageURL:
        "https://pixabay.com/photos/heliconia-lobster-claws-flora-8599119/",
      previewHeight: 150,
      previewURL:
        "https://cdn.pixabay.com/photo/2024/02/27/00/13/heliconia-8599119_150.jpg",
      previewWidth: 119,
      tags: "heliconia, lobster claws, flora",
      type: "photo",
      user: "ignartonosbg",
      userImageURL:
        "https://cdn.pixabay.com/user/2024/01/14/15-44-01-243_250x250.jpg",
      user_id: 21428489,
      views: 52536,
      webformatHeight: 640,
      webformatURL:
        "https://pixabay.com/get/gb4d78c34ea2853189acde05374e01981276eeffb9cf8a7678bf9a2ccc32230bd580687c5410941ddd50d844269441f85_640.jpg",
      webformatWidth: 508,
    },
    {
      collections: 222,
      comments: 49,
      downloads: 88917,
      id: 8424565,
      imageHeight: 6960,
      imageSize: 6349638,
      imageWidth: 4640,
      largeImageURL:
        "https://pixabay.com/get/g4c8f773e2f7e7b14c19ef5b3029ea0f04b30868eb380ea0853b9c70ba215b3c9ea17391c5323d430d2da51d1c69cdc28514d876ff89626c98c2bdc5f04963bef_1280.jpg",
      likes: 1521,
      pageURL:
        "https://pixabay.com/photos/sunset-lake-water-reflection-8424565/",
      previewHeight: 150,
      previewURL:
        "https://cdn.pixabay.com/photo/2023/12/01/21/50/sunset-8424565_150.jpg",
      previewWidth: 100,
      tags: "sunset, lake, water",
      type: "photo",
      user: "MaabHasan",
      userImageURL:
        "https://cdn.pixabay.com/user/2023/01/25/20-21-03-951_250x250.jpg",
      user_id: 5595412,
      views: 100966,
      webformatHeight: 640,
      webformatURL:
        "https://pixabay.com/get/g842272c8d0627bf9ee058e4c9f1de7bf894a7a5eee37107b0098e9403be627bf41c6a44c507e4dec58476ed6f5b9ccb7_640.jpg",
      webformatWidth: 427,
    },
    {
      collections: 28,
      comments: 35,
      downloads: 66164,
      id: 8478515,
      imageHeight: 4160,
      imageSize: 3307506,
      imageWidth: 6240,
      largeImageURL:
        "https://pixabay.com/get/g2f5d34e52687b679df903dc93993f76ceddb283dc86a123af02d498c08a0a709296e595befef9dc130842ab4a9be9967dbf00fdfa4be7701c6f6b5284b3bd87e_1280.jpg",
      likes: 1366,
      pageURL: "https://pixabay.com/photos/kombucha-fermented-drink-8478515/",
      previewHeight: 100,
      previewURL:
        "https://cdn.pixabay.com/photo/2023/12/30/17/39/kombucha-8478515_150.jpg",
      previewWidth: 150,
      tags: "kombucha, fermented drink, fermentation",
      type: "photo",
      user: "Nennieinszweidrei",
      userImageURL:
        "https://cdn.pixabay.com/user/2022/12/04/11-13-16-116_250x250.png",
      user_id: 10084616,
      views: 77667,
      webformatHeight: 427,
      webformatURL:
        "https://pixabay.com/get/g33185a5db850a8de7505aac37a798c09e44ab8711c4dcf71cb5312286887ca3729ff146e2fb52713bac20447e58d5f43_640.jpg",
      webformatWidth: 640,
    },
    {
      collections: 84,
      comments: 54,
      downloads: 47165,
      id: 8587940,
      imageHeight: 6000,
      imageSize: 4446581,
      imageWidth: 4000,
      largeImageURL:
        "https://pixabay.com/get/g2f2a3d2be111c70fb8bbc6d37cde796a74ea06cd0c1251b8256257498c48e8a614a7e432d71c738e542d4965b6493154241299af371f7cc4d9d0692fc974bca2_1280.jpg",
      likes: 586,
      pageURL:
        "https://pixabay.com/photos/dahlia-flower-plant-petals-bloom-8587940/",
      previewHeight: 150,
      previewURL:
        "https://cdn.pixabay.com/photo/2024/02/21/15/28/dahlia-8587940_150.jpg",
      previewWidth: 100,
      tags: "dahlia, flower, plant",
      type: "photo",
      user: "HeiKiwi",
      userImageURL:
        "https://cdn.pixabay.com/user/2024/03/01/19-51-51-74_250x250.jpeg",
      user_id: 35444888,
      views: 54608,
      webformatHeight: 640,
      webformatURL:
        "https://pixabay.com/get/g7bd931332f5343c7b5f0d3cb3c7fe801bd30318e0430790d52891a7477f4be74c6364ef7aed839df8b4f5582d9c5cc1c_640.jpg",
      webformatWidth: 427,
    },
    {
      collections: 11,
      comments: 9,
      downloads: 1898,
      id: 8704855,
      imageHeight: 5152,
      imageSize: 6795198,
      imageWidth: 7728,
      largeImageURL:
        "https://pixabay.com/get/gf3927f7ac92ed6bb87881956a9c83a1ed0e1ced55f9117b19aaa1a5bb5d150c013556c387885e5262ac4c2f022a53bc21efa23e5475ded3c6423890df60126fe_1280.jpg",
      likes: 40,
      pageURL:
        "https://pixabay.com/photos/monkey-ape-rope-animal-green-8704855/",
      previewHeight: 100,
      previewURL:
        "https://cdn.pixabay.com/photo/2024/04/18/19/14/monkey-8704855_150.jpg",
      previewWidth: 150,
      tags: "monkey, ape, rope",
      type: "photo",
      user: "the_iop",
      userImageURL:
        "https://cdn.pixabay.com/user/2021/07/13/10-56-02-140_250x250.jpg",
      user_id: 1181394,
      views: 2492,
      webformatHeight: 427,
      webformatURL:
        "https://pixabay.com/get/gd3596b3c12df89c43f6d64be46f160faa49d412786fcafedd611690eaf97ea5cfaba9c5cef09c2e5a590d34f07132ddc_640.jpg",
      webformatWidth: 640,
    },
    {
      collections: 69,
      comments: 8,
      downloads: 6134,
      id: 8674235,
      imageHeight: 2362,
      imageSize: 7634799,
      imageWidth: 3543,
      largeImageURL:
        "https://pixabay.com/get/g7722972384e83a2bee1eab0cb9e3d23ba4bfd6ba2dab1bc622fbb64cab9bc52f60687c9b39495dca834a5a57aae16be33b7581280c603ad230ec3eff3d72187f_1280.png",
      likes: 103,
      pageURL:
        "https://pixabay.com/illustrations/ai-generated-mouse-racing-car-car-8674235/",
      previewHeight: 100,
      previewURL:
        "https://cdn.pixabay.com/photo/2024/04/04/03/08/ai-generated-8674235_150.png",
      previewWidth: 150,
      tags: "ai generated, mouse, racing car",
      type: "illustration",
      user: "Hellio42",
      userImageURL:
        "https://cdn.pixabay.com/user/2023/12/10/16-53-43-517_250x250.png",
      user_id: 41181595,
      views: 8831,
      webformatHeight: 427,
      webformatURL:
        "https://pixabay.com/get/ga82f1b1791b52bdeaef1c30487df07c8c95ea8e8b337e97fafe0ef1f26355a2c0305d3b2af64bf5f4812cb368d159bff_640.png",
      webformatWidth: 640,
    },
    {
      collections: 121,
      comments: 24,
      downloads: 24216,
      id: 8615302,
      imageHeight: 4510,
      imageSize: 3155980,
      imageWidth: 3383,
      largeImageURL:
        "https://pixabay.com/get/g0b9911b831177ffacc95f8c1692abd859bed531813bf7b63410a8769ac3ec57ab6bcb9b3adc726c12326b1aa95b9e81650728c30c768123138d4ae920112960e_1280.jpg",
      likes: 304,
      pageURL:
        "https://pixabay.com/photos/church-church-tower-dusk-bell-tower-8615302/",
      previewHeight: 150,
      previewURL:
        "https://cdn.pixabay.com/photo/2024/03/05/20/48/church-8615302_150.jpg",
      previewWidth: 112,
      tags: "church, church tower, dusk",
      type: "photo",
      user: "fietzfotos",
      userImageURL:
        "https://cdn.pixabay.com/user/2017/10/24/21-58-51-377_250x250.jpg",
      user_id: 6795508,
      views: 28613,
      webformatHeight: 640,
      webformatURL:
        "https://pixabay.com/get/g19b6d6bad9a503575bf20d5a19f49096910ffbdd10c01eaf3d9a6d6a037e9c3aa48bb702a22ed1af3016b9376808fcdb_640.jpg",
      webformatWidth: 480,
    },
    {
      collections: 44,
      comments: 17,
      downloads: 53796,
      id: 8420600,
      imageHeight: 5781,
      imageSize: 2893089,
      imageWidth: 3854,
      largeImageURL:
        "https://pixabay.com/get/g55102472d0086b2a10a9d2947c795d64c8b3f617e39ca0a2b5cbeb8ed7105fba1bd6beb10f30390fc888cfa95424e18e0db6ed1c1498d3ba473d33174a89e229_1280.jpg",
      likes: 1195,
      pageURL:
        "https://pixabay.com/photos/vietnam-woman-everyday-life-8420600/",
      previewHeight: 150,
      previewURL:
        "https://cdn.pixabay.com/photo/2023/11/30/01/38/vietnam-8420600_150.jpg",
      previewWidth: 100,
      tags: "vietnam, woman, everyday life",
      type: "photo",
      user: "sdg_Rai",
      userImageURL:
        "https://cdn.pixabay.com/user/2023/05/22/12-42-13-815_250x250.png",
      user_id: 25409145,
      views: 60565,
      webformatHeight: 640,
      webformatURL:
        "https://pixabay.com/get/gaa2c947c50c55bbe72169bc3a9a75e42e88fe6fc482bdd65006816ce9f3d21fa78aaa202160814de1568f413095c32d4_640.jpg",
      webformatWidth: 427,
    },
    {
      collections: 134,
      comments: 40,
      downloads: 33864,
      id: 8614314,
      imageHeight: 3728,
      imageSize: 4208015,
      imageWidth: 5600,
      largeImageURL:
        "https://pixabay.com/get/g39b34765e1a17df2aad6635f7cee45de1de49639ef4b6b78b46206cbcd22f7f3f469a1c54f2f1943d8629bfcf89368badae67a3fddd832cc85158f2e1ce18b0e_1280.jpg",
      likes: 247,
      pageURL:
        "https://pixabay.com/photos/boat-fishing-boat-sea-beach-8614314/",
      previewHeight: 100,
      previewURL:
        "https://cdn.pixabay.com/photo/2024/03/05/10/38/boat-8614314_150.jpg",
      previewWidth: 150,
      tags: "boat, fishing boat, sea",
      type: "photo",
      user: "Peggychoucair",
      userImageURL:
        "https://cdn.pixabay.com/user/2022/02/25/20-32-40-46_250x250.jpg",
      user_id: 1130890,
      views: 38729,
      webformatHeight: 426,
      webformatURL:
        "https://pixabay.com/get/g38a7882809ed8cd271ce8f2142fd047aca0a1ad9cecc0d907d5e04862693f13c34f65784372568c17cce0fc9909768af_640.jpg",
      webformatWidth: 640,
    },
    {
      collections: 334,
      comments: 10,
      downloads: 15648,
      id: 8428738,
      imageHeight: 3956,
      imageSize: 2490404,
      imageWidth: 2701,
      largeImageURL:
        "https://pixabay.com/get/g97784c60570e0ee11b08f28a54001560fe3da9e22f96bab1bcc4cd227ae66e154d787eea34bf982183e17b66f9044b517fb4dd1cd70034a5a6a1769fe2b76a9c_1280.jpg",
      likes: 807,
      pageURL:
        "https://pixabay.com/photos/ferris-wheel-amusement-park-ride-8428738/",
      previewHeight: 150,
      previewURL:
        "https://cdn.pixabay.com/photo/2023/12/04/05/54/ferris-wheel-8428738_150.jpg",
      previewWidth: 102,
      tags: "ferris wheel, amusement park, nature",
      type: "photo",
      user: "我见青山多妩媚",
      userImageURL:
        "https://cdn.pixabay.com/user/2023/11/15/06-00-20-136_250x250.jpg",
      user_id: 30757262,
      views: 18669,
      webformatHeight: 640,
      webformatURL:
        "https://pixabay.com/get/gf5aef0c20bc388abb4eeb202a4e76a189d146dc450f3e7012a6a88fb424763f5d897cf8425587648ba1e9d5aba886470_640.jpg",
      webformatWidth: 437,
    },
    {
      collections: 101,
      comments: 26,
      downloads: 10446,
      id: 8644732,
      imageHeight: 2310,
      imageSize: 1461284,
      imageWidth: 4084,
      largeImageURL:
        "https://pixabay.com/get/gf470527ec4b899548baad1b9edaf3048856e974a0497d1040c0639f1e46821b6024d0349d8114d342ed9fefaac3f60075078255e0ed34f38f0d02d83f3d306ce_1280.jpg",
      likes: 143,
      pageURL:
        "https://pixabay.com/illustrations/ai-generated-easter-bunny-rabbit-8644732/",
      previewHeight: 85,
      previewURL:
        "https://cdn.pixabay.com/photo/2024/03/20/06/18/ai-generated-8644732_150.jpg",
      previewWidth: 150,
      tags: "ai generated, easter, bunny",
      type: "illustration",
      user: "geralt",
      userImageURL:
        "https://cdn.pixabay.com/user/2022/08/25/06-52-36-900_250x250.jpg",
      user_id: 9301,
      views: 13521,
      webformatHeight: 362,
      webformatURL:
        "https://pixabay.com/get/g03ee4c6f310b8afcbf2d01f70802274484175937d9a33c3040128f03297a245413f9d0359409cf6ee57d5287db1aef78_640.jpg",
      webformatWidth: 640,
    },
    {
      collections: 89,
      comments: 47,
      downloads: 23755,
      id: 8616125,
      imageHeight: 2923,
      imageSize: 2695727,
      imageWidth: 5197,
      largeImageURL:
        "https://pixabay.com/get/g686bd29e5d717463cf559ea2e1f971f283adbf6d9ef7886b27625c56e37c363a5c1eee6a026f6fd4a3edafa83e8a9344302995887175fa8ac77fae3f536e25d1_1280.jpg",
      likes: 214,
      pageURL:
        "https://pixabay.com/photos/liverworts-liverflower-early-bloomer-8616125/",
      previewHeight: 84,
      previewURL:
        "https://cdn.pixabay.com/photo/2024/03/06/09/32/liverworts-8616125_150.jpg",
      previewWidth: 150,
      tags: "liverworts, liverflower, early bloomer",
      type: "photo",
      user: "ChiemSeherin",
      userImageURL:
        "https://cdn.pixabay.com/user/2024/01/16/09-32-35-836_250x250.jpg",
      user_id: 1425977,
      views: 27687,
      webformatHeight: 360,
      webformatURL:
        "https://pixabay.com/get/gce6852564ad0f7ba5810864d5196daaf820b7bc603d1b322223b58a410cc26e14d61b639aa9de93f244bf70d615ea123_640.jpg",
      webformatWidth: 640,
    },
    {
      collections: 217,
      comments: 21,
      downloads: 18666,
      id: 8378189,
      imageHeight: 6000,
      imageSize: 6347123,
      imageWidth: 4000,
      largeImageURL:
        "https://pixabay.com/get/g41c2a6835089a93fa9ab2715e3c96109da9ef9b8caaa7c0ed11b2fadc0e7a9f7974dfc6c4af64234873125104031e5a86fffd17ea45b2d0903d4b1f71c058d91_1280.jpg",
      likes: 966,
      pageURL:
        "https://pixabay.com/photos/zoo-parrot-bird-animal-nature-8378189/",
      previewHeight: 150,
      previewURL:
        "https://cdn.pixabay.com/photo/2023/11/09/19/36/zoo-8378189_150.jpg",
      previewWidth: 100,
      tags: "zoo, parrot, bird",
      type: "photo",
      user: "Zsolt71",
      userImageURL:
        "https://cdn.pixabay.com/user/2016/10/06/08-16-23-11_250x250.jpg",
      user_id: 3428504,
      views: 23218,
      webformatHeight: 640,
      webformatURL:
        "https://pixabay.com/get/gc45b9dfdbb8593a2b73f5dadb475c0d6b521b33dd11e486265e8e1f3e1d64bce751bfadc3317b000fbc98f03b93c8a68_640.jpg",
      webformatWidth: 427,
    },
    {
      collections: 22,
      comments: 4,
      downloads: 1536,
      id: 8692405,
      imageHeight: 3072,
      imageSize: 3345030,
      imageWidth: 5376,
      largeImageURL:
        "https://pixabay.com/get/g903b465952f10ce33df382136aabf6e51217f34fe5b22c58b5052a744596ca098927f8b37aee7cb36c86535bcc435fe6ad921565674472678aed7203a7934c82_1280.jpg",
      likes: 42,
      pageURL:
        "https://pixabay.com/illustrations/ai-generated-leaves-nature-foliage-8692405/",
      previewHeight: 86,
      previewURL:
        "https://cdn.pixabay.com/photo/2024/04/12/18/18/ai-generated-8692405_150.jpg",
      previewWidth: 150,
      tags: "ai generated, leaves, nature",
      type: "illustration",
      user: "satheeshsankaran",
      userImageURL:
        "https://cdn.pixabay.com/user/2023/06/22/01-21-14-995_250x250.jpg",
      user_id: 11196627,
      views: 2105,
      webformatHeight: 366,
      webformatURL:
        "https://pixabay.com/get/gd4a2abaffeb9e9324b4615c0dc40987195dad1d10f1077ed68f607221c6ba9d0f8320ecf5aa5213773e6cb5b3c9337e7_640.jpg",
      webformatWidth: 640,
    },
    {
      collections: 22,
      comments: 4,
      downloads: 1875,
      id: 8692504,
      imageHeight: 3072,
      imageSize: 15791151,
      imageWidth: 5464,
      largeImageURL:
        "https://pixabay.com/get/gcbaf756b1ce77ccf9559af828b3eedbca04a275c74543ef3e51a59dc4532506f87ce6096eec154f4acab14ce07775cec32b0e6bc434b0d30d7a82c6deec1e77c_1280.png",
      likes: 40,
      pageURL:
        "https://pixabay.com/illustrations/earthday-plant-purple-green-yellow-8692504/",
      previewHeight: 84,
      previewURL:
        "https://cdn.pixabay.com/photo/2024/04/12/19/50/earthday-8692504_150.png",
      previewWidth: 150,
      tags: "earthday, plant, purple",
      type: "illustration",
      user: "Ekletia",
      userImageURL:
        "https://cdn.pixabay.com/user/2023/12/07/17-48-45-636_250x250.png",
      user_id: 41024362,
      views: 2526,
      webformatHeight: 360,
      webformatURL:
        "https://pixabay.com/get/g45addb2aa2dfb9095fc7915fdabe3e518ca09144a6a14ebfa412b1e780a3b9f32cb318647c7efe65810d33a023b4472d_640.png",
      webformatWidth: 640,
    },
    {
      collections: 138,
      comments: 15,
      downloads: 14049,
      id: 8357182,
      imageHeight: 4667,
      imageSize: 9588080,
      imageWidth: 7000,
      largeImageURL:
        "https://pixabay.com/get/g4fb85dcc24e01336b21d59f61cc5af3ef119a51d8ebc34ee287c23b7dca17600ba1cd3f097843795a15be91905b7b084a657ba54b653bae174a87b202b9ebf74_1280.jpg",
      likes: 951,
      pageURL:
        "https://pixabay.com/photos/lake-village-church-hallstatt-8357182/",
      previewHeight: 100,
      previewURL:
        "https://cdn.pixabay.com/photo/2023/11/01/11/16/lake-8357182_150.jpg",
      previewWidth: 150,
      tags: "lake, village, church",
      type: "photo",
      user: "Leonhard_Niederwimmer",
      userImageURL:
        "https://cdn.pixabay.com/user/2020/05/13/18-42-49-177_250x250.jpg",
      user_id: 1131094,
      views: 17403,
      webformatHeight: 427,
      webformatURL:
        "https://pixabay.com/get/gc4669e0d98b8e56fc5cdfdfdb4b9ff78bb9276618cc53811639e18f92753caae2943763705a028637340ae8907c9d1c4_640.jpg",
      webformatWidth: 640,
    },
    {
      collections: 264,
      comments: 28,
      downloads: 44577,
      id: 8440548,
      imageHeight: 6000,
      imageSize: 12000778,
      imageWidth: 4000,
      largeImageURL:
        "https://pixabay.com/get/g41696d39fe6f844e160508697909569f9713221588a8cb2f58d42deec432ad24128f7bae8b703c40fa4e863251ab89a3f1a6685f4f6acd7374d311ea885c3cc6_1280.jpg",
      likes: 521,
      pageURL:
        "https://pixabay.com/photos/peacock-feathers-beak-elegance-eye-8440548/",
      previewHeight: 150,
      previewURL:
        "https://cdn.pixabay.com/photo/2023/12/10/03/00/peacock-8440548_150.jpg",
      previewWidth: 100,
      tags: "peacock, feathers, beak",
      type: "photo",
      user: "chepopovich",
      userImageURL:
        "https://cdn.pixabay.com/user/2023/11/12/01-35-58-448_250x250.jpg",
      user_id: 12433915,
      views: 50579,
      webformatHeight: 640,
      webformatURL:
        "https://pixabay.com/get/gbdb457c33bc525aee9ed73c28f2ae841d95865443796e82d8d3ae097886b5ddac7ba8edaecaae52100448e21df0936a2_640.jpg",
      webformatWidth: 427,
    },
    {
      collections: 36,
      comments: 15,
      downloads: 1645,
      id: 8675021,
      imageHeight: 3072,
      imageSize: 7722822,
      imageWidth: 2048,
      largeImageURL:
        "https://pixabay.com/get/gd2ddb05b0b3c463236c50821c94dbfff19686f104a034b6ba27e26add0396d6cc38be179463922d279ff097210148304858215729d0b91eb3a53cfd7105219d1_1280.png",
      likes: 71,
      pageURL:
        "https://pixabay.com/illustrations/ai-generated-ice-cubes-mint-green-8675021/",
      previewHeight: 150,
      previewURL:
        "https://cdn.pixabay.com/photo/2024/04/04/12/26/ai-generated-8675021_150.png",
      previewWidth: 100,
      tags: "ai generated, ice cubes, mint",
      type: "illustration",
      user: "moonflower5",
      userImageURL:
        "https://cdn.pixabay.com/user/2017/05/01/02-09-50-483_250x250.jpg",
      user_id: 5246057,
      views: 2195,
      webformatHeight: 640,
      webformatURL:
        "https://pixabay.com/get/g1a484baa22d621cc050a7dbb43191bdd4400e65b17099c23d25071690c2be357db204b774789be2473169b711f4af964_640.png",
      webformatWidth: 427,
    },
    {
      collections: 5388,
      comments: 1546,
      downloads: 2649870,
      id: 324175,
      imageHeight: 4000,
      imageSize: 2613829,
      imageWidth: 6000,
      largeImageURL:
        "https://pixabay.com/get/g70d1ddea2af8aa73daaad8d7dfa22b08956fdf63e13d85c7d26e48fc0af6ee11a20428eeadf2bcde0863601e344d0913_1280.jpg",
      likes: 6457,
      pageURL:
        "https://pixabay.com/photos/pink-cherry-blossoms-flowers-branch-324175/",
      previewHeight: 99,
      previewURL:
        "https://cdn.pixabay.com/photo/2014/04/14/20/11/pink-324175_150.jpg",
      previewWidth: 150,
      tags: "pink, cherry blossoms, flower background",
      type: "photo",
      user: "Hans",
      userImageURL:
        "https://cdn.pixabay.com/user/2019/01/29/15-01-52-802_250x250.jpg",
      user_id: 2,
      views: 4929943,
      webformatHeight: 426,
      webformatURL:
        "https://pixabay.com/get/g23bce3f9f7d8787eef56f1f409b07076238817e28fe2e99cc4627a41e56bef294cefc940e3275ae16f2379a97a05397d_640.jpg",
      webformatWidth: 640,
    },
    {
      collections: 81,
      comments: 27,
      downloads: 19494,
      id: 8591539,
      imageHeight: 4000,
      imageSize: 1943929,
      imageWidth: 6002,
      largeImageURL:
        "https://pixabay.com/get/ga6d7d46163440bad37ff9f71075b77c3074d04409c061f4b0dd6ec580fadc678e5f8d2c3554e3120941659994326c17d674f662651f1d666ba790354b0ed5e5c_1280.jpg",
      likes: 195,
      pageURL: "https://pixabay.com/photos/apple-fruit-wet-food-8591539/",
      previewHeight: 100,
      previewURL:
        "https://cdn.pixabay.com/photo/2024/02/23/08/27/apple-8591539_150.jpg",
      previewWidth: 150,
      tags: "apple, fruit, wet",
      type: "photo",
      user: "guvo59",
      userImageURL:
        "https://cdn.pixabay.com/user/2023/06/15/05-00-59-993_250x250.jpg",
      user_id: 9285194,
      views: 23489,
      webformatHeight: 427,
      webformatURL:
        "https://pixabay.com/get/g76f5836498eebaadcef35daec4c8430c03a2cbf99e4d8052fa257b4bc7f02f85c6b298dd225943bd76a47964cb32083f_640.jpg",
      webformatWidth: 640,
    },
    {
      collections: 179,
      comments: 12,
      downloads: 12488,
      id: 8564951,
      imageHeight: 1920,
      imageSize: 228101,
      imageWidth: 1390,
      largeImageURL:
        "https://pixabay.com/get/gf1cb311a50cefa5db74ebd03b0547045035ebe176b7f5790187f2e731fe05dbb08db94b07ec3633be55679eb1cee2c3d889a00fb793d162ee33ca82e58ea162d_1280.png",
      likes: 171,
      pageURL:
        "https://pixabay.com/vectors/heart-graphic-ornament-abstract-8564951/",
      previewHeight: 150,
      previewURL:
        "https://cdn.pixabay.com/photo/2024/02/10/15/03/heart-8564951_150.png",
      previewWidth: 109,
      tags: "heart, graphic, ornament",
      type: "vector/svg",
      user: "yayangart",
      userImageURL:
        "https://cdn.pixabay.com/user/2024/03/15/22-55-37-841_250x250.jpg",
      user_id: 13477958,
      views: 17390,
      webformatHeight: 640,
      webformatURL:
        "https://pixabay.com/get/gfb4c81df780fe7a32cd3eb9e7bfcde86f571d7ea2e75a8ea2f95f6d81ac3fc2ec12bfd9d353ecd4a087882047650a7f9_640.png",
      webformatWidth: 463,
    },
    {
      collections: 195,
      comments: 0,
      downloads: 38334,
      id: 8433234,
      imageHeight: 3512,
      imageSize: 8881819,
      imageWidth: 6240,
      largeImageURL:
        "https://pixabay.com/get/gb675ab7e89097c1302f9a682433e052632ca05c79d701b1e7a98d282f7a517e7f951b0559b20bc1c1412b3abc1a16529838e3e8ac3be4ac2d775457907b141f7_1280.jpg",
      likes: 545,
      pageURL:
        "https://pixabay.com/photos/mountain-peak-clouds-landscape-8433234/",
      previewHeight: 84,
      previewURL:
        "https://cdn.pixabay.com/photo/2023/12/06/08/41/mountain-8433234_150.jpg",
      previewWidth: 150,
      tags: "mountain, peak, clouds",
      type: "photo",
      user: "NickyPe",
      userImageURL:
        "https://cdn.pixabay.com/user/2024/02/05/16-05-14-742_250x250.jpg",
      user_id: 10327513,
      views: 43137,
      webformatHeight: 360,
      webformatURL:
        "https://pixabay.com/get/gcff61e9c91f69258d00aa3ce2d070828fc3ef5790fe312ca55c4e9c01f319400968d413b00d6bdc86ec28474978779d4_640.jpg",
      webformatWidth: 640,
    },
    {
      collections: 55,
      comments: 38,
      downloads: 14757,
      id: 8620213,
      imageHeight: 2725,
      imageSize: 1055698,
      imageWidth: 4088,
      largeImageURL:
        "https://pixabay.com/get/g00529434237871b55051b54931da26cab06ab457cefc285ce23e634a10d02731483b7ec7bfba8946196d94fff1a09483eac746efadb854f594e1c8275f20acfc_1280.jpg",
      likes: 140,
      pageURL:
        "https://pixabay.com/photos/tit-great-tit-bird-feathers-8620213/",
      previewHeight: 100,
      previewURL:
        "https://cdn.pixabay.com/photo/2024/03/08/08/26/tit-8620213_150.jpg",
      previewWidth: 150,
      tags: "tit, great tit, bird",
      type: "photo",
      user: "ChiemSeherin",
      userImageURL:
        "https://cdn.pixabay.com/user/2024/01/16/09-32-35-836_250x250.jpg",
      user_id: 1425977,
      views: 16927,
      webformatHeight: 427,
      webformatURL:
        "https://pixabay.com/get/gca10403aa9cd4d68402a6d5ffd43bc4e8ec3f28f9759988267ff5b563014ba4914920235c1d0f9f5ae98edfa092cad61_640.jpg",
      webformatWidth: 640,
    },
    {
      collections: 5922,
      comments: 971,
      downloads: 3821245,
      id: 3605547,
      imageHeight: 3894,
      imageSize: 3590092,
      imageWidth: 6000,
      largeImageURL:
        "https://pixabay.com/get/g0f651a07b3e6f02286f43f36a388e5513aa5acc15ccfa2c2d05a9b97ae3ec5175e0709df5969ac9d9bbc1a22cbba1de7a6e8081fe1a327a3363e24c56472534f_1280.jpg",
      likes: 6133,
      pageURL:
        "https://pixabay.com/photos/ocean-milky-way-boat-sailing-3605547/",
      previewHeight: 97,
      previewURL:
        "https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547_150.jpg",
      previewWidth: 150,
      tags: "ocean, milky way, boat",
      type: "photo",
      user: "jplenio",
      userImageURL:
        "https://cdn.pixabay.com/user/2023/10/26/14-38-35-241_250x250.png",
      user_id: 7645255,
      views: 5834993,
      webformatHeight: 415,
      webformatURL:
        "https://pixabay.com/get/g9f3af3314132c50c10c5b27422bbe24aa72dc96de58b0f883678fd8c7a3b424e5d108862672e84e44b1201c70f440004_640.jpg",
      webformatWidth: 640,
    },
  ]);

  const handleChangeCategory = useCallback((category) => {
    setActiveCategory(category);
  }, []);

  const fetchImages = useCallback(async (params, append = true) => {
    const data = await apiCall();
    console.log("data", data.data[0]);
  }, []);

  /* useEffect(() => {
    fetchImages();
  }, []); */
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable>
          <Text style={styles.title}>Pixels</Text>
        </Pressable>

        <Pressable>
          <FontAwesome6 name="bars-staggered" size={22} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ gap: 15 }}>
        {/* Start of Search Bar*/}
        <View style={styles.searchBar}>
          <Pressable style={styles.searchIcon}>
            <Feather
              name="search"
              size={24}
              color={theme.colors.neutral(0.9)}
            />
          </Pressable>
          <TextInput
            placeholder="Search for photos..."
            style={styles.searchInput}
            value={searchText}
            onChangeText={(value) => setSearchText(value)}
          />
          {searchText && (
            <Pressable style={styles.closeIcon}>
              <Ionicons name="close" size={24} />
            </Pressable>
          )}
        </View>
        {/* End of Search Bar*/}

        {/* start of Category*/}
        <Categories
          activeCategory={activeCategory}
          handleChangeCategory={handleChangeCategory}
        />
        {/* end of Category*/}

        <View>{images && <ImagesGrid images={images} />}</View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: getWidthPercentage(4),
    paddingTop: 10,
  },
  title: {
    fontSize: getHeightPercentage(4),
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.neutral(0.9),
  },

  searchBar: {
    backgroundColor: theme.colors.white,
    marginHorizontal: getWidthPercentage(4),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: theme.radius.md,
  },
  searchIcon: {
    padding: 5,
  },
  searchInput: {
    flex: 1,
  },
  closeIcon: {
    backgroundColor: theme.colors.grayBG,
    padding: 5,
    borderRadius: theme.radius.xs,
  },
});

export default index;

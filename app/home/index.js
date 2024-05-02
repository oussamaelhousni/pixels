import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useCallback, useState, useEffect, useRef } from "react";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { getHeightPercentage, getWidthPercentage } from "../../helpers/common";
import { debounce } from "lodash";
import { theme } from "../../constants/theme";
import Categories from "../../components/Categories";
import ImagesGrid from "../../components/ImagesGrid";
import { apiCall } from "../../api";
import FiltersModal from "../../components/FiltersModal";

let page = 1;
const index = () => {
  const [searchText, setSearchText] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [filters, setFilters] = useState(null);
  const [images, setImages] = useState([
    {
      collections: 232,
      comments: 46,
      downloads: 73170,
      id: 8595521,
      imageHeight: 4032,
      imageSize: 970371,
      imageWidth: 3024,
      largeImageURL:
        "https://pixabay.com/get/g09da34587c63d176f1f593f64a637cd954d5d8ab252b83e7979bf6958d5ad0b2d500cb643c422d02e795c2d9e58d321fc040238bd6cfa38508ce1cad07c7856f_1280.jpg",
      likes: 1059,
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
      views: 88847,
      webformatHeight: 640,
      webformatURL:
        "https://pixabay.com/get/gd5463850ef578b2bf8baa64ffd7350cc96fd33f5784916fdb215f01b6915e4f0cd9627776faaac62c0a77506c3610249_640.jpg",
      webformatWidth: 480,
    },
    {
      collections: 103,
      comments: 34,
      downloads: 46538,
      id: 8599119,
      imageHeight: 6391,
      imageSize: 3457731,
      imageWidth: 5072,
      largeImageURL:
        "https://pixabay.com/get/g75dd344bb69399a91388706a44338c742b044e6270346858f79bc4712636c7f3e927128bd960c82e73057f366c5aefeb2e25d683fb0774b0e742dab44d0577ce_1280.jpg",
      likes: 669,
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
      views: 55663,
      webformatHeight: 640,
      webformatURL:
        "https://pixabay.com/get/g5a186b55233917508ccc5e89313bb4f4e4dcbd69a39f362d9556c7aa98805013fdfb00c201abdbeec453471f1fac7fa7_640.jpg",
      webformatWidth: 508,
    },
    {
      collections: 229,
      comments: 50,
      downloads: 91976,
      id: 8424565,
      imageHeight: 6960,
      imageSize: 6349638,
      imageWidth: 4640,
      largeImageURL:
        "https://pixabay.com/get/g8c7e9c688d8d8fb357ba0767afc77289efc1d8ba978dba1265627595e7f1d9250f29605c5651ff51cf61bc381bb72663b267790c7d499fff86104c50a399725d_1280.jpg",
      likes: 1525,
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
      views: 104649,
      webformatHeight: 640,
      webformatURL:
        "https://pixabay.com/get/g85bbb4ab8ef0308e98a4b5c7879169f681732aabbf7a4015f3fc890d17dd3cbdb3c98e84cafa0ccf3651edeae3bab678_640.jpg",
      webformatWidth: 427,
    },
    {
      collections: 28,
      comments: 35,
      downloads: 67124,
      id: 8478515,
      imageHeight: 4160,
      imageSize: 3307506,
      imageWidth: 6240,
      largeImageURL:
        "https://pixabay.com/get/g13292cd57e70c0cb5be1c34f86de0a3464de9333d5c1065c70f9a17e7b357e45b3c90070ac46605d6ba0d4ce4140661b1fa96914e02a02970474919247258b03_1280.jpg",
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
      views: 78677,
      webformatHeight: 427,
      webformatURL:
        "https://pixabay.com/get/g26bf7c1a1a79663a775f6db11edca7b3e0ba5d990fb3a1c2dd413c6d31923adbc46172fb01e8cb8823bc0bfda8d5952c_640.jpg",
      webformatWidth: 640,
    },
    {
      collections: 97,
      comments: 54,
      downloads: 50246,
      id: 8587940,
      imageHeight: 6000,
      imageSize: 4446581,
      imageWidth: 4000,
      largeImageURL:
        "https://pixabay.com/get/g248c1f524bc8464949586a08b040d234edc10da9806be1973792ba8fa0b7dedf41c2d8f6384c3a4e1a94bcf6e9cd20f23e74eb8bff0c9d98cf9f3f74166ff65d_1280.jpg",
      likes: 596,
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
      views: 58246,
      webformatHeight: 640,
      webformatURL:
        "https://pixabay.com/get/g8299227bb0376fabac5f5e2c2e2b29ecb298e68607984cced4436d759975287c1483d3b4621189758ae50e278b308d79_640.jpg",
      webformatWidth: 427,
    },
    {
      collections: 36,
      comments: 6,
      downloads: 1924,
      id: 8705017,
      imageHeight: 5044,
      imageSize: 38724493,
      imageWidth: 9000,
      largeImageURL:
        "https://pixabay.com/get/gb7ba701f42d2111c3dd0916f99dfca00b172baa915b940b90893a1a215efe9615660488c14851fa885df9d233f08bde29a87aa877296db0bc1beded31b9e15e3_1280.png",
      likes: 56,
      pageURL:
        "https://pixabay.com/illustrations/ai-generated-crystals-desert-sand-8705017/",
      previewHeight: 84,
      previewURL:
        "https://cdn.pixabay.com/photo/2024/04/18/20/41/ai-generated-8705017_150.png",
      previewWidth: 150,
      tags: "ai generated, crystals, desert",
      type: "illustration",
      user: "MeditativeKaleidoscope",
      userImageURL:
        "https://cdn.pixabay.com/user/2024/02/06/11-05-29-135_250x250.png",
      user_id: 39757915,
      views: 2725,
      webformatHeight: 359,
      webformatURL:
        "https://pixabay.com/get/g63cd3d28f12ba61c96e7a3e61d3a084eb86b4a0026f25822712d7f82d912f077b7545ae4f71bf36233b07f786bd5a1f4_640.png",
      webformatWidth: 640,
    },
    {
      collections: 81,
      comments: 8,
      downloads: 7201,
      id: 8674235,
      imageHeight: 2362,
      imageSize: 7634799,
      imageWidth: 3543,
      largeImageURL:
        "https://pixabay.com/get/gcfb74a2b6653083d559772f516fe2e57580614396c3dd71463202a0bbcd48d9973979e6805f88e636a57aaeab3c566dac0ee8e5e6ba99fcbe5ef079d27e106ba_1280.png",
      likes: 120,
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
      views: 10540,
      webformatHeight: 427,
      webformatURL:
        "https://pixabay.com/get/g40016d7721ac5b0bfbe40d6a8316c2da3276700b29dd24c92f50181c1abb537c2e54027cdf35a585223dbfe8d346d41f_640.png",
      webformatWidth: 640,
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
        "https://pixabay.com/get/gf0841a890f819447d36d89987c490501a0af0db1e6e1ad23e6b51469160ddca8af1d2a9c93333de20ced543f52b4263d34332e14f657cd67b580ff97af8154e7_1280.jpg",
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
        "https://pixabay.com/get/gbf708409f1e139ed5eb9c2c4ad5e5add75b3066b2c7e5058f720577f2cbffd8b1e0447472fe3328248cd978ec332816b_640.jpg",
      webformatWidth: 427,
    },
    {
      collections: 129,
      comments: 25,
      downloads: 26298,
      id: 8615302,
      imageHeight: 4510,
      imageSize: 3155980,
      imageWidth: 3383,
      largeImageURL:
        "https://pixabay.com/get/gc66a6910a388a1ca608828098cc44afe8c26e92c6cdd403b96c1d949bad7656b1b2b1f7f187fafa008a3339b0a26a031e6c6320293b10c920d1eea9a213ea550_1280.jpg",
      likes: 309,
      pageURL:
        "https://pixabay.com/photos/church-church-tower-dusk-bell-tower-8615302/",
      previewHeight: 150,
      previewURL:
        "https://cdn.pixabay.com/photo/2024/03/05/20/48/church-8615302_150.jpg",
      previewWidth: 112,
      tags: "church, nature, church tower",
      type: "photo",
      user: "fietzfotos",
      userImageURL:
        "https://cdn.pixabay.com/user/2017/10/24/21-58-51-377_250x250.jpg",
      user_id: 6795508,
      views: 31044,
      webformatHeight: 640,
      webformatURL:
        "https://pixabay.com/get/gc20f6c16448a6906e77cbe8b7193d6cf8b08c1dabdf4c6d28fa3ab25aa87a74bd830ef30d2814212aca0726c6bbe06ad_640.jpg",
      webformatWidth: 480,
    },
    {
      collections: 146,
      comments: 40,
      downloads: 36742,
      id: 8614314,
      imageHeight: 3728,
      imageSize: 4208015,
      imageWidth: 5600,
      largeImageURL:
        "https://pixabay.com/get/gf8b877d8948654ad0d10c0ea2bdca26129980c7676b7deb530a34a259da39df7801bc775fba1113447d8e80b9f99dd29cd1750f563c0df754bbe636dd0dd2ee2_1280.jpg",
      likes: 256,
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
      views: 42146,
      webformatHeight: 426,
      webformatURL:
        "https://pixabay.com/get/g174e88cda7a81bc28a7fb409cbca91a90434cbe317ee045de72234848f21cd6f40133ce9234289e0389261c1cdec3fc9_640.jpg",
      webformatWidth: 640,
    },
    {
      collections: 40,
      comments: 6,
      downloads: 1877,
      id: 8692180,
      imageHeight: 5016,
      imageSize: 6659410,
      imageWidth: 3344,
      largeImageURL:
        "https://pixabay.com/get/gc3325ac1a0709713a33b8eb1da389c7618648e3079f182bad2606ca42379d5a951b458939f0b9589c6ac7c582f4e0f33258690b7856c1fd9143f8422fdb6751e_1280.png",
      likes: 77,
      pageURL:
        "https://pixabay.com/illustrations/beautiful-woman-beauty-female-girl-8692180/",
      previewHeight: 150,
      previewURL:
        "https://cdn.pixabay.com/photo/2024/04/12/15/46/beautiful-8692180_150.png",
      previewWidth: 100,
      tags: "beautiful, nature, woman",
      type: "illustration",
      user: "gt39",
      userImageURL:
        "https://cdn.pixabay.com/user/2020/01/25/19-14-20-215_250x250.jpg",
      user_id: 14790873,
      views: 3423,
      webformatHeight: 640,
      webformatURL:
        "https://pixabay.com/get/gc8bba47efb4a9a6e7b841a9e76749c19741903a0bd2548930b49c76a5e9db7333f3f4138b84db54b4ae7e37a7f4d57c3_640.png",
      webformatWidth: 427,
    },
    {
      collections: 341,
      comments: 10,
      downloads: 18056,
      id: 8428738,
      imageHeight: 3956,
      imageSize: 2490404,
      imageWidth: 2701,
      largeImageURL:
        "https://pixabay.com/get/g76e6305e7f5a67134ac3ed3b4db3f1285914a3d007530ea1ba619578f4ec7c8d9d462756a28b2ab2f318b76d921af67df3b60e69d7d04e12e09f69f4d4bb4b74_1280.jpg",
      likes: 809,
      pageURL:
        "https://pixabay.com/photos/ferris-wheel-amusement-park-ride-8428738/",
      previewHeight: 150,
      previewURL:
        "https://cdn.pixabay.com/photo/2023/12/04/05/54/ferris-wheel-8428738_150.jpg",
      previewWidth: 102,
      tags: "ferris wheel, amusement park, ride",
      type: "photo",
      user: "我见青山多妩媚",
      userImageURL:
        "https://cdn.pixabay.com/user/2023/11/15/06-00-20-136_250x250.jpg",
      user_id: 30757262,
      views: 21448,
      webformatHeight: 640,
      webformatURL:
        "https://pixabay.com/get/g2c1e748df20707d800bf18bb19bc32db1f384d5af172dbecbba1d16fba49a499389c1fa3b8c58daa431658f082d2f7e4_640.jpg",
      webformatWidth: 437,
    },
    {
      collections: 108,
      comments: 28,
      downloads: 11442,
      id: 8644732,
      imageHeight: 2310,
      imageSize: 1461284,
      imageWidth: 4084,
      largeImageURL:
        "https://pixabay.com/get/g3eb04e82e847b5d3e5629960ec68bc2ea1df58c7bf2e68179ede4f0a7828ab6589c8f38996299f4e0e0b87f7dc9b7c22574f8cae457a1dd21d9b97753f71fb5f_1280.jpg",
      likes: 153,
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
      views: 15069,
      webformatHeight: 362,
      webformatURL:
        "https://pixabay.com/get/gcbc876b6b312eb8589f42925a15932cab23dc5e7d39ce0d0156c0de4fb352d4b96c9d811d1f44e7936ec51e8564ae66b_640.jpg",
      webformatWidth: 640,
    },
    {
      collections: 15,
      comments: 9,
      downloads: 3974,
      id: 8704855,
      imageHeight: 5152,
      imageSize: 6795198,
      imageWidth: 7728,
      largeImageURL:
        "https://pixabay.com/get/g49a6c07bda0928d939a38e24b1f9330bce77bcf4291cefff10f8c8b1d4005ed3a871e50f0ee254c8359504528a0df0d9a1084a25690bbf51d7eef07fff1325c8_1280.jpg",
      likes: 50,
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
      views: 5041,
      webformatHeight: 427,
      webformatURL:
        "https://pixabay.com/get/gb8126522863ba2db1b820361403719ff2db8abfa643caf26d876474cc810b56e361887f2bb1db881f4d64eeaf1dfd50e_640.jpg",
      webformatWidth: 640,
    },
    {
      collections: 8,
      comments: 2,
      downloads: 235,
      id: 8720322,
      imageHeight: 4096,
      imageSize: 3804793,
      imageWidth: 4096,
      largeImageURL:
        "https://pixabay.com/get/g3723c7f9fa12c368d301c1fbf36798f4d8004699c6e70b96f30b02b716d843439b61ba6016b2289586ebcced0caeb97ebe60efa3de229516986ffa37546586d1_1280.jpg",
      likes: 11,
      pageURL:
        "https://pixabay.com/illustrations/ai-generated-young-girl-female-8720322/",
      previewHeight: 150,
      previewURL:
        "https://cdn.pixabay.com/photo/2024/04/25/17/19/ai-generated-8720322_150.jpg",
      previewWidth: 150,
      tags: "ai generated, young, girl",
      type: "illustration",
      user: "BarBus",
      userImageURL:
        "https://cdn.pixabay.com/user/2019/03/25/15-10-01-450_250x250.jpg",
      user_id: 3692519,
      views: 513,
      webformatHeight: 640,
      webformatURL:
        "https://pixabay.com/get/g6b98b207198cb480e748e7a76ac2f50758893f4f2c3021b5e727af2a82a09446a14994c4fa620f4bb44c5b4354ee4daa_640.jpg",
      webformatWidth: 640,
    },
    {
      collections: 97,
      comments: 48,
      downloads: 26413,
      id: 8616125,
      imageHeight: 2923,
      imageSize: 2695727,
      imageWidth: 5197,
      largeImageURL:
        "https://pixabay.com/get/gce5516e869a3b4bd65cb37e6cd452b2df781e2d798edf94a66bbc0b6ab5fbe9b6a0f5781430558d8438a87b16322880ee687bd46a462ac43c89228aaf07e89dd_1280.jpg",
      likes: 225,
      pageURL:
        "https://pixabay.com/photos/liverworts-liverflower-early-bloomer-8616125/",
      previewHeight: 84,
      previewURL:
        "https://cdn.pixabay.com/photo/2024/03/06/09/32/liverworts-8616125_150.jpg",
      previewWidth: 150,
      tags: "liverworts, beautiful flowers, liverflower",
      type: "photo",
      user: "ChiemSeherin",
      userImageURL:
        "https://cdn.pixabay.com/user/2024/01/16/09-32-35-836_250x250.jpg",
      user_id: 1425977,
      views: 30832,
      webformatHeight: 360,
      webformatURL:
        "https://pixabay.com/get/g054b75f5fe4701c5bf6cee356ada839231217637d6516898e51d8def2d5fe9385845141f16488137cdd9e674c5af03ed_640.jpg",
      webformatWidth: 640,
    },
    {
      collections: 228,
      comments: 23,
      downloads: 20480,
      id: 8378189,
      imageHeight: 6000,
      imageSize: 6347123,
      imageWidth: 4000,
      largeImageURL:
        "https://pixabay.com/get/gab9b98f0df4775b2a177a81c653a7659a7a8d47af075866b17f7cf9c40bd7552d5ad0b6a76d10ef1d78f1e08558c777fddfb6e335a81483edd86a3e96650c67c_1280.jpg",
      likes: 971,
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
      views: 25445,
      webformatHeight: 640,
      webformatURL:
        "https://pixabay.com/get/gc5ba7efc21843bcd33e600f33e74e7a4b972d11407176a6d2adcc389c5dbb377c67dd6482f7b702c6916423d7346d5ec_640.jpg",
      webformatWidth: 427,
    },
    {
      collections: 60,
      comments: 16,
      downloads: 2712,
      id: 8675021,
      imageHeight: 3072,
      imageSize: 7722822,
      imageWidth: 2048,
      largeImageURL:
        "https://pixabay.com/get/g6a59739262530489a45dbb6b100f315844d544807d26c8b3933ad29c355fb129aca5dbb2acf70afd10cc88e97cf9966c27e5b59d7d3c8aa035cf4b371f2f1a57_1280.png",
      likes: 92,
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
      views: 3827,
      webformatHeight: 640,
      webformatURL:
        "https://pixabay.com/get/g606071f717e017127dfa6f5d9a15dce6b09c46c6c483ae32209814d135acf495eb22d66d3c64ca85241cb15f366db665_640.png",
      webformatWidth: 427,
    },
    {
      collections: 30,
      comments: 4,
      downloads: 3117,
      id: 8692405,
      imageHeight: 3072,
      imageSize: 3345030,
      imageWidth: 5376,
      largeImageURL:
        "https://pixabay.com/get/g65052eb99f55ab6587d832b295ccdf7c30ea955311adb07695c6a00521ae834cbe633e9e3e7560743ae224863fb5b8e8809c9759bc7e51b4c7b12643b02edc17_1280.jpg",
      likes: 58,
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
      views: 4175,
      webformatHeight: 366,
      webformatURL:
        "https://pixabay.com/get/g59c1c520955a906a25a0657d71c4fa868da15162069280b3784b8333698b021af72e4f84ae7961d6aedc85b7d82cad23_640.jpg",
      webformatWidth: 640,
    },
    {
      collections: 144,
      comments: 15,
      downloads: 15636,
      id: 8357182,
      imageHeight: 4667,
      imageSize: 9588080,
      imageWidth: 7000,
      largeImageURL:
        "https://pixabay.com/get/ge974f587efc4781165db299d6c14db09b73006be3812f7bfc710103a92dc9e5f28dcdf8529af283e994fae0f5142754150c747092e4629cbd8aaae708ef29c57_1280.jpg",
      likes: 953,
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
      views: 19229,
      webformatHeight: 427,
      webformatURL:
        "https://pixabay.com/get/g952beba2935cf9d88ef9fb427899c2745595d6b44ddec1942c53963b3c5c233d3350534b259f9be49f721aaf2aa6026c_640.jpg",
      webformatWidth: 640,
    },
    {
      collections: 270,
      comments: 28,
      downloads: 45516,
      id: 8440548,
      imageHeight: 6000,
      imageSize: 12000778,
      imageWidth: 4000,
      largeImageURL:
        "https://pixabay.com/get/gb7a28f94e6f9a8920f72467ca8920252ba6e7ae1efea4bae6157e40d92cdf52315e7d4fbc6bafd3d7dc9506144d9653150adde4d579e88a8280242ab203dd7ab_1280.jpg",
      likes: 522,
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
      views: 51712,
      webformatHeight: 640,
      webformatURL:
        "https://pixabay.com/get/ga5b551796fa30ce09489a8130dafc0bd73a0b29c985dc5e3d4cb891a630039851239a7c8e249484f616b2207be90923c_640.jpg",
      webformatWidth: 427,
    },
    {
      collections: 5394,
      comments: 1548,
      downloads: 2653527,
      id: 324175,
      imageHeight: 4000,
      imageSize: 2613829,
      imageWidth: 6000,
      largeImageURL:
        "https://pixabay.com/get/g798c8813598b07b61ac3dc529a82121b5962f82ad997a1263e151d9c9772cbe5d9d394b3552102a5e7f45a510b1b1094_1280.jpg",
      likes: 6470,
      pageURL:
        "https://pixabay.com/photos/pink-cherry-blossoms-flowers-branch-324175/",
      previewHeight: 99,
      previewURL:
        "https://cdn.pixabay.com/photo/2014/04/14/20/11/pink-324175_150.jpg",
      previewWidth: 150,
      tags: "pink, beautiful flowers, flower wallpaper",
      type: "photo",
      user: "Hans",
      userImageURL:
        "https://cdn.pixabay.com/user/2019/01/29/15-01-52-802_250x250.jpg",
      user_id: 2,
      views: 4934115,
      webformatHeight: 426,
      webformatURL:
        "https://pixabay.com/get/g610ddb0a421b7174167940c3c33d81abe9735908c6aaf4b538232e1ab5047c3b7529f895f92bb3b5a801b3d071837bdf_640.jpg",
      webformatWidth: 640,
    },
    {
      collections: 6,
      comments: 9,
      downloads: 745,
      id: 8698374,
      imageHeight: 4672,
      imageSize: 19547431,
      imageWidth: 3504,
      largeImageURL:
        "https://pixabay.com/get/g2ccaff25c4775fb0c1caaf2a6860ca20b7ed49173f133c06e8559cab0c8a837fd563174ce2a6a0c61a90727af737c84faddb80e01c3629dd8b4ff6e80f84ee74_1280.png",
      likes: 60,
      pageURL:
        "https://pixabay.com/illustrations/ai-generated-blue-footed-booby-bird-8698374/",
      previewHeight: 150,
      previewURL:
        "https://cdn.pixabay.com/photo/2024/04/15/17/51/ai-generated-8698374_150.png",
      previewWidth: 112,
      tags: "ai generated, blue-footed booby, bird",
      type: "illustration",
      user: "HeckiMG",
      userImageURL:
        "https://cdn.pixabay.com/user/2023/07/03/15-16-14-86_250x250.jpg",
      user_id: 24974271,
      views: 1088,
      webformatHeight: 640,
      webformatURL:
        "https://pixabay.com/get/g2915eb0e04b47fc61163c6b8a7c995b7e1a7cb42991a6409d8892a597ddc116af060d0f4924c69ea076979ede8314db6_640.png",
      webformatWidth: 480,
    },
    {
      collections: 200,
      comments: 0,
      downloads: 39532,
      id: 8433234,
      imageHeight: 3512,
      imageSize: 8881819,
      imageWidth: 6240,
      largeImageURL:
        "https://pixabay.com/get/g58d21512887f5341c7b2b7755263420154a93079cc0762551717d549b28bf33bfc156dc0c2cdb37a1521b5ea339638979549cc82060291872ab6aeb906f66a7a_1280.jpg",
      likes: 546,
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
      views: 44505,
      webformatHeight: 360,
      webformatURL:
        "https://pixabay.com/get/gb18eba75691d5dd037a17bce690a6a7e95adee742261dea3f8abba865cf76afa0dba29780c05cc15d0ca943b4dae20d4_640.jpg",
      webformatWidth: 640,
    },
    {
      collections: 188,
      comments: 12,
      downloads: 14048,
      id: 8564951,
      imageHeight: 1920,
      imageSize: 228101,
      imageWidth: 1390,
      largeImageURL:
        "https://pixabay.com/get/g90576d3c6ac5f6fa0609b8bf1f60be2137e85b89424281a988154327aed3671848bb06c7bfb7fdc61be4a4dcfbea93708fa9285ba2a6b9c5b1f7d28d3bc858f4_1280.png",
      likes: 180,
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
      views: 19484,
      webformatHeight: 640,
      webformatURL:
        "https://pixabay.com/get/g3b875b768822bb86259e74de1f79347c3f6897c1161edbbb9c60c9e5d8247e0738d68a55b157c11b8cb1ca83409a22dd_640.png",
      webformatWidth: 463,
    },
  ]);
  const [isEndReached, setIsEndReached] = useState(false);
  const searchBarRef = useRef(null);
  const modalRef = useRef(null);
  const scrollViewRef = useRef(null);

  const handleChangeCategory = useCallback((category) => {
    clearSearch();
    setActiveCategory(category);
    page = 1;
    const params = {
      page,
    };
    if (category) params.category = category.toLowerCase();

    fetchImages(params, false);
  }, []);

  const handleSearch = useCallback((text) => {
    setSearchText(text);
    setActiveCategory(null);
    if (text.length > 2) {
      page = 1;
      fetchImages({ page: 2, q: text });
    } else if (text === "") {
      setImages([]);
      fetchImages({ page: 1 });
    }
  }, []);

  const clearSearch = useCallback(() => {
    setSearchText("");
    searchBarRef.current?.clear();
    handleSearch("");
  }, []);

  const handleOpenModal = useCallback(() => {
    modalRef.current?.present();
  }, []);

  const handleCloseModal = useCallback(() => {
    modalRef.current?.close();
  }, []);

  const applyFilters = useCallback(() => {
    if (filters) {
      page = 1;
      let params = { ...filters };
      setImages([]);
      if (activeCategory) params.category = activeCategory;
      if (searchText) params.q = searchText;
      console.log("fetch params", params);
      fetchImages(params);
    }
    handleCloseModal();
  }, [filters, activeCategory, searchText]);

  const resetFilters = useCallback(() => {
    console.log("resetting filters");
    let params = {
      page: 1,
    };
    setImages([]);
    setFilters(null);
    if (setSearchText) params.q = searchText;
    if (activeCategory) params.category = activeCategory;
    fetchImages(params);
    handleCloseModal();
  }, [searchText, activeCategory]);
  /*   const handleSearchDebounce = useCallback(debounce(handleSearch, 500), []); */

  const fetchImages = useCallback(
    debounce(async (params, append = false) => {
      console.log("append", append);
      return;
      const data = await apiCall(params);

      if (data.success && data.data.hits?.length > 0) {
        if (append) {
          console.log("apeending", images.length || 4);
          setImages([...images, ...data.data.hits]);
        } else {
          console.log("here", data.data.hits);
          setImages([...data.data.hits]);
        }
      }
    }, 500),
    [images, setImages]
  );

  const scrollTop = useCallback(() => {
    scrollViewRef.current.scrollTo({
      top: 0,
      animate: true,
    });
  }, []);

  const onScroll = useCallback(
    (event) => {
      const { contentOffset, layoutMeasurement, contentSize } =
        event.nativeEvent;
      const bottomPosition = contentSize.height - layoutMeasurement.height;
      if (bottomPosition - 10 < contentOffset.y) {
        if (!isEndReached) {
          setIsEndReached(true);
          ++page;
          let params = {
            page,
            ...filters,
          };

          if (activeCategory) params.category = activeCategory;
          if (searchText) params.q = searchText;

          fetchImages(params, true);
        }
      } else if (isEndReached) {
        setIsEndReached(false);
      }
    },
    [isEndReached, activeCategory, searchText, filters, images]
  );

  useEffect(() => {
    fetchImages({ page: 1 });
  }, []);

  useEffect(() => {
    console.log("currentFilters", filters);
  }, [filters]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={scrollTop}>
          <Text style={styles.title}>Pixels</Text>
        </Pressable>

        <Pressable onPress={handleOpenModal}>
          <FontAwesome6 name="bars-staggered" size={22} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{ gap: 15 }}
        scrollEventThrottle={5}
        ref={scrollViewRef}
        onScroll={onScroll}
      >
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
            ref={searchBarRef}
            onChangeText={(value) => handleSearch(value)}
          />
          {searchText && (
            <Pressable style={styles.closeIcon} onPressOut={clearSearch}>
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
        <Text style={{ textAlign: "center" }}>Loading</Text>
      </ScrollView>

      {/* Filter Modal */}
      <FiltersModal
        modalRef={modalRef}
        filters={filters}
        applyFilters={applyFilters}
        resetFilters={resetFilters}
        setFilters={setFilters}
      />
      {/* End of filter Modal*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
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

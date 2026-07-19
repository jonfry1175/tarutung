export type SubangCategory = "wisata" | "kuliner" | "budaya";
export type SubangSceneId = "ciater" | "curug" | "sisingaan" | "pineapple" | "coast";

export interface MarkerKeyframe {
  time: number;
  x: number;
  y: number;
}

export interface SubangScene {
  id: SubangSceneId;
  label: string;
  shortLabel: string;
  subtitle: string;
  category: SubangCategory;
  video: string;
  poster: string;
  duration: number;
  mobileFocusX: number;
}

export interface SubangPlace {
  id: string;
  title: string;
  label?: string;
  category: SubangCategory;
  sceneId: SubangSceneId;
  markerTrack: MarkerKeyframe[];
  summary: string;
  description: string;
  image: string;
  gallery: string[];
  tags: string[];
  location: string;
  mapsUrl: string;
  sourceUrl?: string;
  featured: boolean;
}

export const categoryMeta: Record<
  SubangCategory,
  { label: string; color: string }
> = {
  wisata: { label: "Wisata", color: "#16855b" },
  kuliner: { label: "Kuliner", color: "#d55b2a" },
  budaya: { label: "Budaya", color: "#9b3f65" },
};

export const subangScenes: SubangScene[] = [
  {
    id: "ciater",
    label: "Kebun Teh Ciater",
    shortLabel: "Ciater",
    subtitle: "Kabut di dataran tinggi",
    category: "wisata",
    video: "/videos/subang/ciater-tea-plantation.mp4",
    poster: "/images/subang/video-posters/ciater-tea-plantation.webp",
    duration: 8,
    mobileFocusX: 68,
  },
  {
    id: "curug",
    label: "Curug Cileat",
    shortLabel: "Cileat",
    subtitle: "Air terjun di jantung hutan",
    category: "wisata",
    video: "/videos/subang/curug-cileat-waterfall.mp4",
    poster: "/images/subang/video-posters/curug-cileat-waterfall.webp",
    duration: 8,
    mobileFocusX: 62,
  },
  {
    id: "sisingaan",
    label: "Sisingaan",
    shortLabel: "Sisingaan",
    subtitle: "Irama tradisi Subang",
    category: "budaya",
    video: "/videos/subang/sisingaan-performance.mp4",
    poster: "/images/subang/video-posters/sisingaan-performance.webp",
    duration: 8,
    mobileFocusX: 70,
  },
  {
    id: "pineapple",
    label: "Nanas Subang",
    shortLabel: "Nanas",
    subtitle: "Manis dari tanah Subang",
    category: "kuliner",
    video: "/videos/subang/subang-pineapple.mp4",
    poster: "/images/subang/video-posters/subang-pineapple.webp",
    duration: 10,
    mobileFocusX: 50,
  },
  {
    id: "coast",
    label: "Pantai Cirewang",
    shortLabel: "Pesisir",
    subtitle: "Senja di pesisir utara",
    category: "wisata",
    video: "/videos/subang/subang-north-coast.mp4",
    poster: "/images/subang/video-posters/subang-north-coast.webp",
    duration: 8,
    mobileFocusX: 70,
  },
];

const coreSubangPlaces: SubangPlace[] = [
  {
    id: "kebun-teh-ciater",
    title: "Kebun Teh Ciater",
    label: "Ciater",
    category: "wisata",
    sceneId: "ciater",
    markerTrack: [
      { time: 0, x: 68, y: 43 },
      { time: 8, x: 68, y: 43 },
    ],
    summary: "Hamparan teh di dataran tinggi selatan Subang dengan udara sejuk dan lanskap berkabut.",
    description: "Kebun Teh Ciater membentang mengikuti kontur perbukitan di kaki Tangkuban Parahu. Barisan tanaman teh, jalan kebun, dan kabut pegunungan membentuk salah satu lanskap paling khas di koridor wisata Subang selatan.",
    image: "/images/subang/video-posters/ciater-tea-plantation.webp",
    gallery: ["/images/subang/video-posters/ciater-tea-plantation.webp"],
    tags: ["Perkebunan teh", "Pegunungan", "Panorama"],
    location: "Ciater, Kabupaten Subang",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Kebun+Teh+Ciater+Subang",
    featured: true,
  },
  {
    id: "curug-cileat",
    title: "Curug Cileat",
    label: "Curug Cileat",
    category: "wisata",
    sceneId: "curug",
    markerTrack: [
      { time: 0, x: 60, y: 26 },
      { time: 1.2, x: 62, y: 28 },
      { time: 8, x: 62, y: 28 },
    ],
    summary: "Air terjun tinggi di kawasan perbukitan Cisalak yang dicapai melalui jalur trekking pedesaan.",
    description: "Curug Cileat menghadirkan aliran air tinggi di tengah hutan tropis, tebing hijau, dan kabut halus di dasar lembah. Perjalanan menuju curug melewati kebun, sawah, dan jalur perbukitan.",
    image: "/images/subang/video-posters/curug-cileat-waterfall.webp",
    gallery: ["/images/subang/video-posters/curug-cileat-waterfall.webp"],
    tags: ["Air terjun", "Trekking", "Alam"],
    location: "Mayang, Kecamatan Cisalak, Kabupaten Subang",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Curug+Cileat+Subang",
    featured: true,
  },
  {
    id: "sisingaan",
    title: "Sisingaan",
    category: "budaya",
    sceneId: "sisingaan",
    markerTrack: [
      { time: 0, x: 70, y: 39 },
      { time: 4, x: 68, y: 40 },
      { time: 8, x: 70, y: 39 },
    ],
    summary: "Kesenian arak-arakan singa khas Subang yang memadukan musik, tari, dan kebersamaan.",
    description: "Sisingaan menampilkan tandu berbentuk singa yang diusung sambil menari mengikuti iringan kendang dan terompet. Pertunjukan ini menjadi identitas budaya Subang dan hadir dalam hajatan serta festival.",
    image: "/images/subang/video-posters/sisingaan-performance.webp",
    gallery: ["/images/subang/video-posters/sisingaan-performance.webp"],
    tags: ["Seni pertunjukan", "Arak-arakan", "Tradisi"],
    location: "Kabupaten Subang, Jawa Barat",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Museum+Wisma+Karya+Subang",
    featured: true,
  },
  {
    id: "nanas-subang",
    title: "Nanas Subang",
    label: "Nanas Subang",
    category: "kuliner",
    sceneId: "pineapple",
    markerTrack: [
      { time: 0, x: 34, y: 34 },
      { time: 4, x: 49, y: 31 },
      { time: 8, x: 56, y: 31 },
      { time: 10, x: 57, y: 31 },
    ],
    summary: "Buah khas Subang dengan rasa manis segar yang tumbuh di kawasan perkebunan dataran tinggi.",
    description: "Nanas telah lama melekat pada identitas pertanian Subang. Buahnya dinikmati langsung dan diolah menjadi dodol, selai, keripik, serta minuman oleh pelaku usaha lokal.",
    image: "/images/subang/video-posters/subang-pineapple.webp",
    gallery: ["/images/subang/video-posters/subang-pineapple.webp"],
    tags: ["Nanas", "Oleh-oleh", "Hasil kebun"],
    location: "Jalancagak, Kabupaten Subang",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Sentra+Nanas+Jalancagak+Subang",
    featured: true,
  },
  {
    id: "pantai-cirewang",
    title: "Pantai Cirewang",
    label: "Pesisir Utara",
    category: "wisata",
    sceneId: "coast",
    markerTrack: [
      { time: 0, x: 70, y: 45 },
      { time: 8, x: 70, y: 45 },
    ],
    summary: "Bentang pesisir utara Subang dengan mangrove, tambak, dan garis pantai yang tenang.",
    description: "Pantai Cirewang memperlihatkan karakter pesisir utara Subang yang berbeda dari kawasan pegunungannya. Perjalanan menuju pantai melewati tambak dan kawasan mangrove sebelum terbuka ke Laut Jawa.",
    image: "/images/subang/video-posters/subang-north-coast.webp",
    gallery: ["/images/subang/video-posters/subang-north-coast.webp"],
    tags: ["Pantai", "Mangrove", "Senja"],
    location: "Pamanukan, Kabupaten Subang",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Pantai+Cirewang+Subang",
    featured: true,
  },
];

const newSubangPlaces: SubangPlace[] = [
  {
    id: "curug-cibareubeuy",
    title: "Curug Cibareubeuy",
    label: "Cibareubeuy",
    category: "wisata",
    sceneId: "curug",
    markerTrack: [
      { time: 0, x: 34, y: 48 },
      { time: 8, x: 34, y: 48 },
    ],
    summary:
      "Air terjun setinggi sekitar 90 meter di kawasan Desa Wisata Cibeusi yang dikelilingi hutan hijau.",
    description:
      "Curug Cibareubeuy merupakan atraksi alam Desa Wisata Cibeusi di Kecamatan Ciater. Jalur menuju air terjun membawa pengunjung melewati lanskap pedesaan dan hutan, dengan fasilitas dasar seperti tempat makan, musala, kamar mandi, dan persewaan alat di kawasan wisata.",
    image: "/images/subang/expanded/curug-cibareubeuy.webp",
    gallery: ["/images/subang/expanded/curug-cibareubeuy.webp"],
    tags: ["Air terjun", "Desa wisata", "Trekking"],
    location: "Cibeusi, Kecamatan Ciater, Kabupaten Subang",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Curug+Cibareubeuy+Subang",
    sourceUrl: "https://jadesta.kemenpar.go.id/atraksi/curug_cibareubeuy",
    featured: false,
  },
  {
    id: "museum-subang",
    title: "Museum Subang",
    label: "Wisma Karya",
    category: "budaya",
    sceneId: "sisingaan",
    markerTrack: [
      { time: 0, x: 30, y: 54 },
      { time: 8, x: 30, y: 54 },
    ],
    summary:
      "Museum di Gedung Wisma Karya yang merangkum sejarah, budaya, dan perkembangan Kabupaten Subang.",
    description:
      "Museum Subang menempati Gedung Wisma Karya, salah satu bangunan bersejarah di pusat Subang. Koleksinya menjadi titik awal untuk mengenal perjalanan daerah, temuan arkeologis, tradisi masyarakat, dan warisan budaya sebelum melanjutkan eksplorasi ke kawasan lain.",
    image: "/images/subang/expanded/museum-subang.webp",
    gallery: ["/images/subang/expanded/museum-subang.webp"],
    tags: ["Museum", "Sejarah", "Wisma Karya"],
    location: "Jalan Ade Irma Suryani Nasution, Kabupaten Subang",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Museum+Wisma+Karya+Subang",
    sourceUrl:
      "https://subang.go.id/public/index.php/berita/subang-luncurkan-paket-wisata-sejarah-menghidupkan-warisan-budaya-untuk-generasi-muda",
    featured: false,
  },
  {
    id: "rumah-makan-mang-yeye",
    title: "Rumah Makan Mang Yeye",
    label: "Mang Yeye",
    category: "kuliner",
    sceneId: "pineapple",
    markerTrack: [
      { time: 0, x: 72, y: 56 },
      { time: 10, x: 72, y: 56 },
    ],
    summary:
      "Rumah makan Sunda di koridor Kalijati dengan hamparan sawah dan pilihan ayam, ikan, pepes, serta sambal dadak.",
    description:
      "Rumah Makan Mang Yeye dikenal sebagai salah satu tujuan kuliner Sunda di Subang. Menu yang ditawarkan mencakup ayam dan ikan, aneka pepes, sayur asem, karedok, sate maranggi, serta sambal dadak dalam suasana makan yang menghadap area persawahan.",
    image: "/images/subang/subang-culinary.png",
    gallery: ["/images/subang/subang-culinary.png"],
    tags: ["Kuliner Sunda", "Pepes", "Kalijati"],
    location: "Jalan Raya Kalijati, Kabupaten Subang",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Rumah+Makan+Mang+Yeye+Subang",
    sourceUrl: "https://wisata.subang.go.id/view-rumah-makan-mang-yeye.jsp",
    featured: false,
  },
];

const showNewSubangPlaces =
  process.env.NEXT_PUBLIC_SHOW_NEW_SUBANG_PLACES?.toLowerCase() === "true";

export const subangPlaces: SubangPlace[] = showNewSubangPlaces
  ? [...coreSubangPlaces, ...newSubangPlaces]
  : coreSubangPlaces;

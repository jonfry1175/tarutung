export type SubangCategory = "wisata" | "kuliner" | "budaya";

export interface SubangPlace {
  id: string;
  title: string;
  label?: string;
  category: SubangCategory;
  summary: string;
  description: string;
  image: string;
  gallery: string[];
  tags: string[];
  location: string;
  mapsUrl: string;
  position: {
    x: number;
    y: number;
  };
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

export const subangPlaces: SubangPlace[] = [
  {
    id: "tangkuban-parahu",
    title: "Gunung Tangkuban Parahu",
    category: "wisata",
    summary:
      "Bentang kawah vulkanik ikonik di perbatasan selatan Subang dengan udara pegunungan yang sejuk.",
    description:
      "Kawasan Tangkuban Parahu menawarkan panorama Kawah Ratu, jalur pandang pegunungan, dan cerita rakyat Sangkuriang. Akses dari arah Subang melewati koridor perkebunan teh dan Ciater.",
    image: "/images/subang/hero-panorama.png",
    gallery: [
      "/images/subang/hero-panorama.png",
      "/images/subang/ciater-waterfall.png",
    ],
    tags: ["Kawah", "Pegunungan", "Panorama"],
    location: "Cikole, Kecamatan Lembang, perbatasan Subang",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Gunung+Tangkuban+Parahu",
    position: { x: 18, y: 26 },
    featured: false,
  },
  {
    id: "sari-ater-ciater",
    title: "Pemandian Air Panas Ciater",
    label: "Ciater",
    category: "wisata",
    summary:
      "Pemandian air panas alami di kaki Tangkuban Parahu yang menjadi tujuan relaksasi keluarga.",
    description:
      "Mata air panas Ciater mengalir melalui kolam dan aliran berbatu di tengah lanskap hijau. Kawasan ini dikenal sebagai salah satu destinasi unggulan Subang untuk berendam dan beristirahat.",
    image: "/images/subang/ciater-waterfall.png",
    gallery: [
      "/images/subang/ciater-waterfall.png",
      "/images/subang/hero-panorama.png",
    ],
    tags: ["Air panas", "Relaksasi", "Keluarga"],
    location: "Ciater, Kecamatan Ciater, Kabupaten Subang",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Sari+Ater+Hot+Spring+Ciater+Subang",
    position: { x: 27, y: 34 },
    featured: true,
  },
  {
    id: "curug-cileat",
    title: "Curug Cileat",
    category: "wisata",
    summary:
      "Air terjun tinggi di kawasan perbukitan Cisalak yang dicapai melalui jalur trekking pedesaan.",
    description:
      "Curug Cileat menghadirkan tebing hijau, debit air yang deras, dan perjalanan melintasi kebun serta sawah. Destinasi ini cocok bagi pengunjung yang mencari pengalaman alam yang lebih aktif.",
    image: "/images/subang/ciater-waterfall.png",
    gallery: [
      "/images/subang/ciater-waterfall.png",
      "/images/subang/hero-panorama.png",
    ],
    tags: ["Air terjun", "Trekking", "Alam"],
    location: "Mayang, Kecamatan Cisalak, Kabupaten Subang",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Curug+Cileat+Subang",
    position: { x: 38, y: 50 },
    featured: false,
  },
  {
    id: "pantai-pondok-bali",
    title: "Pantai Pondok Bali",
    category: "wisata",
    summary:
      "Pantai utara Subang dengan garis pantai landai, pepohonan pesisir, dan suasana matahari terbenam.",
    description:
      "Pantai Pondok Bali memperlihatkan sisi pesisir Subang yang berbeda dari kawasan pegunungannya. Pengunjung datang untuk menikmati angin laut, bersantai bersama keluarga, dan menyaksikan senja.",
    image: "/images/subang/hero-panorama.png",
    gallery: [
      "/images/subang/hero-panorama.png",
      "/images/subang/ciater-waterfall.png",
    ],
    tags: ["Pantai", "Pesisir", "Senja"],
    location: "Mayangan, Kecamatan Legonkulon, Kabupaten Subang",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Pantai+Pondok+Bali+Subang",
    position: { x: 72, y: 31 },
    featured: false,
  },
  {
    id: "nanas-madu-subang",
    title: "Nanas Madu Subang",
    category: "kuliner",
    summary:
      "Buah khas Subang bercita rasa manis segar yang banyak dijumpai di kebun dan kios Jalancagak.",
    description:
      "Nanas telah lama melekat pada identitas pertanian Subang. Varietas madu digemari karena daging buahnya manis, berair, dan dapat dinikmati langsung maupun diolah menjadi dodol, selai, dan minuman.",
    image: "/images/subang/subang-culinary.png",
    gallery: [
      "/images/subang/subang-culinary.png",
      "/images/subang/hero-panorama.png",
    ],
    tags: ["Nanas", "Oleh-oleh", "Hasil kebun"],
    location: "Jalancagak, Kabupaten Subang",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Sentra+Nanas+Jalancagak+Subang",
    position: { x: 48, y: 43 },
    featured: false,
  },
  {
    id: "oncom-dawuan",
    title: "Oncom Dawuan",
    category: "kuliner",
    summary:
      "Olahan fermentasi bercita rasa gurih yang menjadi bagian dari keseharian kuliner masyarakat Subang.",
    description:
      "Oncom dari kawasan Dawuan biasa diolah menjadi tumisan, sambal, atau isian hidangan Sunda. Produk ini mudah ditemukan di pasar tradisional dan menjadi pilihan oleh-oleh yang dekat dengan dapur lokal.",
    image: "/images/subang/subang-culinary.png",
    gallery: [
      "/images/subang/subang-culinary.png",
      "/images/subang/sisingaan.png",
    ],
    tags: ["Oncom", "Kuliner Sunda", "Pasar tradisional"],
    location: "Dawuan, Kabupaten Subang",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Oncom+Dawuan+Subang",
    position: { x: 61, y: 49 },
    featured: false,
  },
  {
    id: "sisingaan",
    title: "Sisingaan",
    category: "budaya",
    summary:
      "Kesenian arak-arakan singa khas Subang yang memadukan musik, tari, dan semangat kebersamaan.",
    description:
      "Sisingaan menampilkan tandu berbentuk singa yang diusung sambil menari mengikuti iringan kendang dan terompet. Pertunjukan ini tumbuh sebagai ekspresi budaya masyarakat Subang dan kerap hadir dalam hajatan serta festival.",
    image: "/images/subang/sisingaan.png",
    gallery: [
      "/images/subang/sisingaan.png",
      "/images/subang/subang-culinary.png",
    ],
    tags: ["Seni pertunjukan", "Arak-arakan", "Tradisi"],
    location: "Kabupaten Subang, Jawa Barat",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Museum+Wisma+Karya+Subang",
    position: { x: 70, y: 61 },
    featured: true,
  },
  {
    id: "kampung-adat-banceuy",
    title: "Kampung Adat Banceuy",
    category: "budaya",
    summary:
      "Kampung adat di Sanca yang menjaga upacara, kesenian, dan pengetahuan agraris Sunda.",
    description:
      "Masyarakat Kampung Adat Banceuy mempertahankan tradisi seperti Ruwatan Bumi sebagai ungkapan syukur atas hasil panen. Lingkungan kampung menjadi ruang belajar tentang adat, gotong royong, dan hubungan warga dengan alam.",
    image: "/images/subang/sisingaan.png",
    gallery: [
      "/images/subang/sisingaan.png",
      "/images/subang/hero-panorama.png",
    ],
    tags: ["Kampung adat", "Ruwatan Bumi", "Sunda"],
    location: "Sanca, Kecamatan Ciater, Kabupaten Subang",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Kampung+Adat+Banceuy+Subang",
    position: { x: 16, y: 47 },
    featured: false,
  },
];

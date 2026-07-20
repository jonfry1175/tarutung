import {
  ArrowRight,
  ChevronRight,
  Clock3,
  Landmark,
  MapPin,
  Menu,
  Route,
  Search,
  Share2,
  UsersRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { LandingHeroMedia } from "@/components/home/landing-hero-media";
import { LoadingScreen } from "@/components/ui/loading-screen";
import styles from "./subang-landing-page.module.css";

const destinations = [
  {
    title: "Ciater",
    description: "Pemandian air panas alami di dataran tinggi yang menenangkan tubuh dan pikiran.",
    image: "/images/subang/landing/ciater-hot-spring.webp",
    href: "/jelajahi?scene=ciater&place=kebun-teh-ciater",
  },
  {
    title: "Curug Cileat",
    description: "Air terjun tinggi di tengah hutan, dengan kesegaran alam yang memikat.",
    image: "/images/subang/video-posters/curug-cileat-waterfall.webp",
    href: "/jelajahi?scene=curug&place=curug-cileat",
  },
  {
    title: "Pantai Cirewang",
    description: "Pesisir utara dengan mangrove, tambak, dan garis pantai yang tenang.",
    image: "/images/subang/video-posters/subang-north-coast.webp",
    href: "/jelajahi?scene=coast&place=pantai-cirewang",
  },
];

const culinaryItems = [
  {
    title: "Nanas Subang",
    description: "Manis segar, harum alami, dan menjadi kebanggaan Subang.",
    image: "/images/subang/video-posters/subang-pineapple.webp",
  },
  {
    title: "Sop Kikil Sapi",
    description: "Kuah gurih kaya rempah yang menghangatkan setiap waktu.",
    image: "/images/subang/landing/sop-kikil-subang.webp",
  },
  {
    title: "Sate Maranggi",
    description: "Empuk, berbumbu khas, dan dibakar hingga harum.",
    image: "/images/subang/landing/sate-maranggi.webp",
  },
  {
    title: "Tahu Susu",
    description: "Lembut di dalam, renyah di luar, nikmatnya tiada tara.",
    image: "/images/subang/landing/tahu-susu.webp",
  },
  {
    title: "Nasi Liwet",
    description: "Aroma gurih santan dengan lauk khas Sunda yang lengkap.",
    image: "/images/subang/landing/nasi-liwet.webp",
  },
];

const itineraries = [
  {
    title: "1 Hari",
    description: "Rangkaian singkat destinasi terbaik dalam satu hari.",
    image: "/images/subang/video-posters/ciater-tea-plantation.webp",
    icon: Clock3,
    href: "/jelajahi?scene=ciater",
  },
  {
    title: "Akhir Pekan",
    description: "Dua hari menikmati alam, kuliner, dan waktu untuk beristirahat.",
    image: "/images/subang/landing/ciater-hot-spring.webp",
    icon: Route,
    href: "/jelajahi?scene=curug",
  },
  {
    title: "Keluarga",
    description: "Perjalanan santai dan berkesan untuk dinikmati semua usia.",
    image: "/images/subang/landing/family-coast-itinerary.webp",
    icon: UsersRound,
    href: "/jelajahi?scene=coast",
  },
];

function Brand() {
  return (
    <Link className={styles.brand} href="/" aria-label="Kembali ke Beranda">
      <Landmark aria-hidden="true" />
      <span><strong>SUBANG</strong><small>360</small></span>
    </Link>
  );
}

export function SubangLandingPage() {
  return (
    <>
      <LoadingScreen />
      <main id="top" className={styles.page}>
      <section className={styles.hero} aria-labelledby="landing-title">
        <LandingHeroMedia />
        <div className={styles.heroShade} aria-hidden="true" />
        <header className={styles.header}>
          <Brand />
          <div className={styles.headerActions}>
            <div className={styles.utilityPanel}>
              <details className={styles.searchMenu}>
                <summary aria-label="Buka pencarian">
                  <Search aria-hidden="true" />
                  <span>Search</span>
                </summary>
                <form action="/jelajahi" className={styles.searchForm}>
                  <label htmlFor="landing-search">Cari di Subang</label>
                  <div>
                    <input id="landing-search" name="q" placeholder="Wisata, kuliner, budaya..." />
                    <button type="submit" aria-label="Cari"><Search aria-hidden="true" /></button>
                  </div>
                </form>
              </details>
              <details className={styles.navigationMenu}>
                <summary aria-label="Buka navigasi">
                  <Menu aria-hidden="true" />
                  <span>Menu</span>
                </summary>
                <nav aria-label="Navigasi landing page">
                  <a href="#tentang">Tentang</a>
                  <a href="#wisata">Wisata</a>
                  <a href="#kuliner">Kuliner</a>
                  <a href="#budaya">Budaya</a>
                  <a href="#rencana">Rencana</a>
                  <Link href="/jelajahi">Subang 360</Link>
                </nav>
              </details>
            </div>
          </div>
        </header>

        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Selamat datang di Subang</p>
          <h1 id="landing-title">Subang,<br />Dari Pegunungan ke Pesisir</h1>
          <p>Alam yang menyejukkan, budaya yang mengakar.</p>
          <Link className={styles.primaryButton} href="/jelajahi">
            Jelajahi Subang 360 <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <a className={styles.scrollCue} href="#tentang" aria-label="Lihat cerita Subang">
          <span />
          <small>Scroll</small>
        </a>
      </section>

      <section id="tentang" className={styles.introSection}>
        <div className={styles.introCopy}>
          <p className={styles.eyebrow}>Selamat datang di Subang</p>
          <h2>Kemewahan yang<br />Tumbuh dari Alam</h2>
          <p>Dari sejuknya pegunungan Ciater hingga ombak tenang Pantai Cirewang, Subang adalah harmoni antara alam, budaya, dan kehidupan lokal.</p>
          <p>Nikmati perjalanan autentik, kuliner istimewa, dan tradisi yang terus hidup di setiap sudutnya.</p>
          <a className={styles.textLink} href="#wisata">Tentang Subang <ChevronRight aria-hidden="true" /></a>
        </div>
        <div className={styles.introImage}>
          <Image src="/images/subang/ciater-waterfall.png" alt="Air terjun di hutan tropis Subang" fill sizes="(max-width: 800px) 100vw, 54vw" />
        </div>
      </section>

      <section id="wisata" className={styles.destinationsSection}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Destinasi unggulan</p>
          <h2>Jelajah yang Tak Terlupakan</h2>
        </div>
        <div className={styles.destinationGrid}>
          {destinations.map((destination) => (
            <article key={destination.title} className={styles.destinationCard}>
              <Link href={destination.href} className={styles.destinationImage} aria-label={`Jelajahi ${destination.title}`}>
                <Image src={destination.image} alt={destination.title} fill sizes="(max-width: 760px) 100vw, 33vw" />
              </Link>
              <h3>{destination.title}</h3>
              <p>{destination.description}</p>
              <Link className={styles.textLink} href={destination.href}>Jelajahi {destination.title} <ChevronRight aria-hidden="true" /></Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.explorerSection} aria-labelledby="explorer-title">
        <div className={styles.explorerBackdrop} aria-hidden="true" />
        <div className={styles.explorerCopy}>
          <p className={styles.eyebrow}>Pengalaman interaktif</p>
          <h2 id="explorer-title">Subang 360</h2>
          <p>Kabut di dataran tinggi, cerita di setiap sudut. Temukan destinasi, budaya, dan keindahan yang siap kamu kunjungi.</p>
          <Link className={styles.primaryButton} href="/jelajahi">Masuk ke Subang 360 <ArrowRight aria-hidden="true" /></Link>
        </div>
        <Link className={styles.explorerPreview} href="/jelajahi" aria-label="Buka pengalaman Subang 360">
          <Image src="/images/subang/landing/subang-360-preview.webp" alt="Tampilan interaktif Subang 360" fill sizes="(max-width: 900px) 92vw, 58vw" />
        </Link>
      </section>

      <section id="kuliner" className={styles.culinarySection}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Kuliner Subang</p>
          <h2>Rasa yang Menggoda</h2>
        </div>
        <div className={styles.culinaryGrid}>
          {culinaryItems.map((item) => (
            <article key={item.title} className={styles.culinaryCard}>
              <div className={styles.culinaryImage}>
                <Image src={item.image} alt={item.title} fill sizes="(max-width: 640px) 50vw, 20vw" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="budaya" className={styles.cultureSection}>
        <div className={styles.cultureCopy}>
          <p className={styles.eyebrow}>Budaya yang hidup</p>
          <h2>Tradisi yang<br />Menginspirasi</h2>
          <h3>Sisingaan</h3>
          <p>Kesenian khas Subang yang memadukan musik, tari, dan kebersamaan dalam perayaan penuh sukacita.</p>
          <Link className={styles.textLink} href="/jelajahi?scene=sisingaan&place=sisingaan">Pelajari Budaya Subang <ChevronRight aria-hidden="true" /></Link>
        </div>
        <Link className={styles.cultureImage} href="/jelajahi?scene=sisingaan&place=sisingaan" aria-label="Jelajahi Sisingaan">
          <Image src="/images/subang/sisingaan.png" alt="Pertunjukan budaya Sisingaan khas Subang" fill sizes="(max-width: 800px) 100vw, 70vw" />
        </Link>
      </section>

      <section id="rencana" className={styles.itinerarySection}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Rencana perjalanan</p>
          <h2>Pilihan Perjalanan untuk Anda</h2>
        </div>
        <div className={styles.itineraryGrid}>
          {itineraries.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className={styles.itineraryCard}>
                <Link className={styles.itineraryImage} href={item.href} aria-label={`Lihat rencana ${item.title}`}>
                  <Image src={item.image} alt={`Perjalanan ${item.title} di Subang`} fill sizes="(max-width: 760px) 100vw, 33vw" />
                </Link>
                <h3><Icon aria-hidden="true" />{item.title}</h3>
                <p>{item.description}</p>
                <Link className={styles.textLink} href={item.href}>Lihat Rencana <ChevronRight aria-hidden="true" /></Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.finalCta}>
        <div aria-hidden="true" />
        <h2>Saatnya Merencanakan Perjalanan Anda</h2>
        <p>Temukan keindahan Subang sesuai waktu, minat, dan gaya Anda.</p>
        <Link className={styles.primaryButton} href="/jelajahi">Mulai Perjalanan <ArrowRight aria-hidden="true" /></Link>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerBrand}>
          <Brand />
          <p>Platform untuk menjelajahi wisata, kuliner, budaya, dan keramahan Kabupaten Subang.</p>
          <a href="/jelajahi" aria-label="Bagikan pengalaman Subang 360"><Share2 aria-hidden="true" /></a>
        </div>
        <div>
          <h3>Jelajahi</h3>
          <a href="#wisata">Wisata</a><a href="#kuliner">Kuliner</a><a href="#budaya">Budaya</a><a href="#rencana">Rencana</a>
        </div>
        <div>
          <h3>Informasi</h3>
          <a href="#tentang">Tentang Subang</a><Link href="/jelajahi">Subang 360</Link><a href="#rencana">Pilihan perjalanan</a>
        </div>
        <div>
          <h3>Lokasi</h3>
          <p><MapPin aria-hidden="true" />Kabupaten Subang<br />Jawa Barat, Indonesia</p>
        </div>
        <small>© 2026 Subang 360. Seluruh hak dilindungi.</small>
      </footer>
    </main>
    </>
  );
}

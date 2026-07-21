import {
  ArrowRight,
  ChevronRight,
  Clock3,
  Compass,
  Landmark,
  MapPin,
  Menu,
  Mountain,
  Route,
  Search,
  Share2,
  UsersRound,
  Utensils,
  Waves,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { LandingHeroMedia } from "@/components/home/landing-hero-media";
import { SubangCulinarySection } from "@/components/home/subang-culinary-section";
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

      <section id="tentang" className={styles.introSection} aria-label="Selamat datang di Subang">
        <div className={styles.introCopy}>
          <div className={styles.introBadge}>
            <Compass className={styles.badgeIcon} aria-hidden="true" />
            <span className={styles.eyebrow}>Pesona Bentang Alam Subang</span>
          </div>
          <h2>Selamat datang di Subang,<br />Kemewahan Alam & Tradisi</h2>
          <p className={styles.introLead}>
            Dari sejuknya hamparan teh pegunungan Ciater hingga ketenangan ombak Pantai Cirewang, Subang menyajikan harmoni autentik antara alam, budaya, dan kehangatan lokal.
          </p>

          <div className={styles.pillarGrid}>
            <div className={styles.pillarCard}>
              <div className={styles.pillarHeader}>
                <Mountain className={styles.pillarIcon} aria-hidden="true" />
                <h4>Pegunungan & Hutan</h4>
              </div>
              <p>Udara sejuk Ciater, kawah purba, dan kesegaran air terjun tropis.</p>
            </div>
            <div className={styles.pillarCard}>
              <div className={styles.pillarHeader}>
                <Utensils className={styles.pillarIcon} aria-hidden="true" />
                <h4>Cita Rasa Khas</h4>
              </div>
              <p>Manis autentik Nanas Madu, Sate Maranggi, dan kelezatan kuliner lokal.</p>
            </div>
            <div className={styles.pillarCard}>
              <div className={styles.pillarHeader}>
                <Waves className={styles.pillarIcon} aria-hidden="true" />
                <h4>Muara & Pesisir</h4>
              </div>
              <p>Hutan mangrove Cirewang dan pantai tenang utara Jawa Barat.</p>
            </div>
          </div>

          <div className={styles.introActions}>
            <a className={styles.textLink} href="#wisata">
              Jelajahi Destinasi <ChevronRight aria-hidden="true" />
            </a>
            <Link className={styles.secondaryBadgeButton} href="/jelajahi">
              Subang 360 Explorer <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className={styles.dualMediaContainer}>
          <div className={styles.mainMediaWrapper}>
            <Image
              src="/images/subang/ciater-waterfall.png"
              alt="Air terjun di hutan tropis Subang"
              fill
              sizes="(max-width: 800px) 100vw, 50vw"
            />
            <div className={styles.mainMediaGradient} aria-hidden="true" />
          </div>
          
          <div className={styles.floatingPreviewCard}>
            <div className={styles.floatingImageWrapper}>
              <Image
                src="/images/subang/video-posters/subang-north-coast.webp"
                alt="Pesisir Laut Utara Subang"
                fill
                sizes="180px"
              />
            </div>
            <div className={styles.floatingContent}>
              <span className={styles.floatingTag}>Bentang Alam</span>
              <strong className={styles.floatingTitle}>Pegunungan s.d. Pesisir</strong>
              <small className={styles.floatingSubtitle}>Elevasi 0 — 1.500m mdpl</small>
            </div>
          </div>
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

      <SubangCulinarySection />

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
          <a className={styles.footerShare} href="/jelajahi" aria-label="Bagikan pengalaman Subang 360"><Share2 aria-hidden="true" /></a>
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

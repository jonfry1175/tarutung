"use client";

import { ArrowRight, ChevronRight, Flame, MapPin, Sparkles, Utensils } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import styles from "./subang-landing-page.module.css";

export interface CulinaryItem {
  id: string;
  title: string;
  category: "ikonik" | "utama" | "camilan";
  categoryLabel: string;
  description: string;
  longDescription: string;
  flavorNotes: string[];
  origin: string;
  image: string;
  href?: string;
  featured?: boolean;
}

export const culinaryItems: CulinaryItem[] = [
  {
    id: "nanas-subang",
    title: "Nanas Madu Subang",
    category: "ikonik",
    categoryLabel: "Ikonik Subang",
    description: "Manis segar, harum alami, dan menjadi buah kebanggaan khas Subang.",
    longDescription:
      "Nanas Madu Subang terkenal karena kadar gula alami yang tinggi, daging buah renyah berair, dan aroma harum dari tanah vulkanik perbukitan Subang.",
    flavorNotes: ["Manis Madu", "Segar & Juicy", "Aroma Alami"],
    origin: "Jalancagak & Subang Selatan",
    image: "/images/subang/video-posters/subang-pineapple.webp",
    href: "/jelajahi?scene=pineapple",
    featured: true,
  },
  {
    id: "sop-kikil",
    title: "Sop Kikil Sapi",
    category: "utama",
    categoryLabel: "Hidangan Utama",
    description: "Kuah gurih kaya rempah khas Sunda yang menghangatkan setiap saat.",
    longDescription:
      "Kikil sapi empuk disajikan dalam kuah kaldu rempah bening nan kaya aroma, ditaburi daun bawang seledri dan perasan jeruk purut segar.",
    flavorNotes: ["Kuah Rempah", "Gurih Kaldu", "Kikil Empuk"],
    origin: "Pusat Kota Subang",
    image: "/images/subang/landing/sop-kikil-subang.webp",
    href: "/jelajahi?scene=pineapple",
  },
  {
    id: "sate-maranggi",
    title: "Sate Maranggi Subang",
    category: "utama",
    categoryLabel: "Hidangan Utama",
    description: "Daging empuk berbumbu marinasi rempah khas, dibakar beraroma harum.",
    longDescription:
      "Daging sapi berkualitas yang dimarinasi ketumbar, ketan, dan kecap kelapa tradisional sebelum dibakar di atas arang kelapa, disajikan dengan sambal tomat pedas.",
    flavorNotes: ["Dibakar Harum", "Manis Gurih", "Sambal Tomat Pedas"],
    origin: "Jalan Raya Subang - Purwakarta",
    image: "/images/subang/landing/sate-maranggi.webp",
    href: "/jelajahi?scene=pineapple",
  },
  {
    id: "tahu-susu",
    title: "Tahu Susu Subang",
    category: "camilan",
    categoryLabel: "Camilan & Kudapan",
    description: "Tekstur dalam lembut lumer, renyah garing di luar saat disajikan hangat.",
    longDescription:
      "Olahan tahu spesial yang diproses dengan susu murni sehingga memiliki tekstur dalam luar biasa lembut dengan sensasi garing gurih di luar.",
    flavorNotes: ["Lembut Lumer", "Renyah Garing", "Gurih Alami"],
    origin: "Kawasan Wisata Ciater",
    image: "/images/subang/landing/tahu-susu.webp",
    href: "/jelajahi?scene=ciater",
  },
  {
    id: "nasi-liwet",
    title: "Nasi Liwet Sunda",
    category: "utama",
    categoryLabel: "Hidangan Utama",
    description: "Nasi gurih beraroma daun salam & serai, disajikan lengkap lauk khas.",
    longDescription:
      "Nasi gurih masak tradisional dengan rempah daun salam, serai, bawang merah, dan teri petai, disajikan hangat lengkap dengan sambal terasi dan lalapan.",
    flavorNotes: ["Wangi Rempah", "Ikan Teri Gurih", "Sambal Terasi"],
    origin: "Rumah Makan Khas Subang",
    image: "/images/subang/landing/nasi-liwet.webp",
    href: "/jelajahi?scene=pineapple",
  },
];

type CategoryFilter = "all" | "ikonik" | "utama" | "camilan";

const filterCategories: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "Semua Kuliner" },
  { id: "ikonik", label: "Buah & Ikonik" },
  { id: "utama", label: "Hidangan Utama" },
  { id: "camilan", label: "Camilan & Kudapan" },
];

export function SubangCulinarySection() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");
  const [activeDishId, setActiveDishId] = useState<string>("nanas-subang");

  const filteredDishes = culinaryItems.filter(
    (item) => activeFilter === "all" || item.category === activeFilter
  );

  const activeDish =
    culinaryItems.find((item) => item.id === activeDishId) || culinaryItems[0];

  return (
    <section id="kuliner" className={styles.culinarySection} aria-labelledby="kuliner-heading">
      <div className={styles.culinaryHeader}>
        <div className={styles.sectionHeading}>
          <div className={styles.culinaryBadge}>
            <Utensils className={styles.badgeIcon} aria-hidden="true" />
            <span className={styles.eyebrow}>Kuliner Subang</span>
          </div>
          <h2 id="kuliner-heading">Rasa yang Menggoda</h2>
          <p className={styles.culinarySubhead}>
            Jelajahi kelezatan autentik dari dataran tinggi hingga pesisir Subang. Dari nanas madu yang legendaris hingga masakan rempah kaya rasa.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className={styles.filterBar} role="tablist" aria-label="Kategori Kuliner">
          {filterCategories.map((cat) => {
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`${styles.filterTab} ${isActive ? styles.filterTabActive : ""}`}
                onClick={() => setActiveFilter(cat.id)}
              >
                {cat.id === "ikonik" && <Sparkles className={styles.tabIcon} aria-hidden="true" />}
                {cat.id === "utama" && <Flame className={styles.tabIcon} aria-hidden="true" />}
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Spotlight Showcase */}
      <div className={styles.spotlightContainer}>
        <div className={styles.spotlightImageWrapper}>
          <Image
            src={activeDish.image}
            alt={activeDish.title}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 55vw"
            className={styles.spotlightImage}
          />
          <div className={styles.spotlightImageOverlay} aria-hidden="true" />
          <span className={styles.spotlightCategoryTag}>
            {activeDish.categoryLabel}
          </span>
        </div>

        <div className={styles.spotlightContent}>
          <div className={styles.spotlightMeta}>
            <span className={styles.spotlightOrigin}>
              <MapPin className={styles.metaIcon} aria-hidden="true" />
              {activeDish.origin}
            </span>
          </div>
          <h3 className={styles.spotlightTitle}>{activeDish.title}</h3>
          <p className={styles.spotlightDescription}>{activeDish.longDescription}</p>

          <div className={styles.flavorSection}>
            <span className={styles.flavorLabel}>Profil Cita Rasa:</span>
            <div className={styles.flavorTags}>
              {activeDish.flavorNotes.map((note) => (
                <span key={note} className={styles.flavorTag}>
                  #{note}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.spotlightActions}>
            <Link
              href={activeDish.href || "/jelajahi?scene=pineapple"}
              className={styles.primaryButton}
            >
              Jelajahi di Subang 360 <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive Cards Grid */}
      <div className={styles.culinaryGridContainer}>
        <div className={styles.gridHeader}>
          <h3>Pilihan Hidangan Khas ({filteredDishes.length})</h3>
          <span className={styles.gridHint}>Klik hidangan untuk melihat detail rasa</span>
        </div>

        <div className={styles.culinaryGrid}>
          {filteredDishes.map((item) => {
            const isSelected = item.id === activeDish.id;
            return (
              <article
                key={item.id}
                className={`${styles.culinaryCard} ${isSelected ? styles.culinaryCardActive : ""}`}
                onClick={() => setActiveDishId(item.id)}
                tabIndex={0}
                role="button"
                aria-pressed={isSelected}
                aria-label={`Pilih ${item.title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveDishId(item.id);
                  }
                }}
              >
                <div className={styles.culinaryImage}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 50vw, 20vw"
                  />
                  {isSelected && (
                    <div className={styles.activeIndicator}>
                      <span>Terpilih</span>
                    </div>
                  )}
                </div>
                <div className={styles.cardInfo}>
                  <div className={styles.cardHeaderRow}>
                    <h3>{item.title}</h3>
                    <span className={styles.cardCategoryBadge}>{item.categoryLabel}</span>
                  </div>
                  <p>{item.description}</p>
                  <div className={styles.cardFooter}>
                    <span className={styles.cardOrigin}>{item.origin}</span>
                    <span className={styles.selectHint}>
                      Detail <ChevronRight className={styles.chevronIcon} aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

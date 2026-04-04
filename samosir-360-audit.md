# Audit Fitur Web `samosir-360.id`

Tanggal uji: 2026-03-27  
URL: https://www.samosir-360.id/  
Metode: browser nyata via Playwright, screenshot artefak lokal, dan inspeksi data/source publik situs.

## Ringkasan

Halaman utama menampilkan peta/pulau 3D dengan balon landmark. Dari alur yang saya uji, klik landmark membawa user ke panorama 360 dan membuka fitur lanjutan seperti chat `Opung`, kuis budaya, panel progres, auth/signup, kontrol audio, dan tombol kembali ke peta.

Fitur UI utama yang saya coba langsung:

1. Landing page 3D
2. Switch bahasa `ID`, `EN`, `BT`
3. Filter kategori `Cerita Rakyat`, `Musik & Tari`, `Kuliner`, `Sejarah`, `Alam`
4. Counter filter aktif
5. Progress badge `0/25 dijelajahi`
6. Panel progres + daftar pencapaian
7. Auth modal dari CTA `Daftar Gratis`
8. Mode magic link
9. `Lanjut sebagai Tamu`
10. Panorama landmark
11. `Open Chat`
12. Tombol `Ikuti Kuis`
13. Kontrol audio di panorama
14. Tombol `Kembali ke Peta`

Catatan penting:

- Data publik landmark yang terlihat berjumlah `24`, tetapi UI progress menampilkan `0/25`.
- Ada satu node panorama ekstra di warning console: `stone-chair`.
- Saya menguji alur panorama secara interaktif penuh pada `Sigale-gale` dan memverifikasi struktur data seluruh landmark dari source publik.
- Saya juga menjalankan batch attempt untuk membuka banyak node landmark, tetapi sinyal validasi headless tidak stabil, sehingga saya tidak mengklaim verifikasi interaktif penuh untuk semua `24` node satu per satu.

## Screenshot Halaman Utama

### 1. Landing Page 3D

Fitur:

- Hero `Samosir 360`
- overlay kategori
- progress badge
- ambience control
- pulau 3D dengan landmark balon

![Landing page 3D](output/playwright/home-main.png)

### 2. Switch Bahasa

`EN` berhasil mengubah copy UI ke bahasa Inggris.

![Bahasa EN](output/playwright/home-language-en.png)

`BT` berhasil mengubah copy UI ke Batak Toba.

![Bahasa BT](output/playwright/home-language-bt.png)

### 3. Filter Kategori

Saya menonaktifkan filter satu per satu sampai tersisa `1 of 5 active`, lalu sampai `0 of 5 active`, dan mengaktifkannya kembali ke `5 of 5 active`.

State `1 of 5 active`:

![Filter 1 aktif](output/playwright/home-filter-one-active.png)

State `0 of 5 active`:

![Filter 0 aktif](output/playwright/home-filter-zero-active.png)

### 4. Progress Panel

Klik badge `0/25 dijelajahi` membuka panel progres berisi:

- progress eksplorasi
- breakdown kategori
- daftar pencapaian
- CTA untuk simpan progress

![Panel progres](output/playwright/home-progress-panel.png)

### 5. Auth Modal

Dari panel progres, klik `Daftar Gratis` membuka auth modal. Saya juga menguji mode `Gunakan Link Ajaib` dan `Lanjut sebagai Tamu`.

Isi modal yang muncul:

- email
- password
- `Buat Akun`
- `Gunakan Link Ajaib`
- `Masuk`
- `Lanjut sebagai Tamu`

![Auth modal](output/playwright/home-auth-modal.png)

## Screenshot Panorama Landmark

Panorama diuji langsung pada landmark `Sigale-gale`.

### 6. Baseline Panorama

Elemen yang muncul:

- tombol `Kembali ke Peta`
- tombol `Open Chat`
- progress badge
- kompas/orientasi panorama

![Panorama baseline](output/playwright/panorama-agent-sigale-gale-baseline.png)

### 7. Chat `Opung`

`Open Chat` membuka panel chat yang menampilkan input percakapan dan kontrol tambahan.

![Chat Opung](output/playwright/panorama-agent-chat-open.png)

### 8. Kuis Budaya

Dari panel chat, tombol `Ikuti Kuis` membuka modal kuis.

![Modal kuis](output/playwright/panorama-agent-quiz-open.png)

### 9. Progress Panel di Panorama

Badge progress tetap bisa dibuka dari view panorama.

![Progress di panorama](output/playwright/panorama-agent-progress-panel.png)

### 10. Auth Modal dari Panorama

CTA auth juga dapat dipicu dari panel progres di panorama.

![Auth dari panorama](output/playwright/panorama-agent-auth-modal.png)

### 11. Audio Controls di Panorama

Tombol ikon tanpa label di panorama membuka kontrol audio tersembunyi.

![Audio controls panorama](output/playwright/panorama-agent-audio-controls.png)

### 12. Kembali ke Peta

`Kembali ke Peta` mengembalikan tampilan ke overlay peta/3D.

![Kembali ke peta](output/playwright/panorama-agent-back-to-map.png)

## Inventaris Landmark Publik

Total landmark publik yang saya temukan dari source/data: `24`  
Semua item memakai `display_mode: panorama`.

### Folklore

- Tomb of King Sidabutar (`king-sidabutar-tomb`)
- Legend of Toba (`toba-lake`)
- Tunggal Panaluan (`tunggal-panaluan`)
- Sigale-gale (`sigale-gale`)
- Batu Gantung (`hanging-stone`)

### Music

- Hasapi (`hasapi`)
- Tor-Tor Dance (`tortor`)
- Gondang Sabangunan (`gondang-sabangunan`)
- Sarune Bolon (`sarune-bolon`)
- Taganing (`taganing`)

### Food

- Arsik (`arsik`)
- Ombus-Ombus (`ombus-ombus`)
- Naniura (`naniura`)
- Dali Ni Horbo (`dali-ni-horbo`)
- Mie Gomak (`mie-gomak`)

### History

- Huta Siallagan (`huta-siallagan`)
- Tele Tower (`tele-watchtower`)
- Museum Huta Bolon (`hutabolon-museum`)
- Tugu Aritonang (`tugu-toga-aritonang`)

### Nature

- Binangalom Waterfall (`binangalom-waterfall`)
- Pusuk Buhit (`mount-pusuk-buhit`)
- Parbaba Beach (`parbaba-beach`)
- Efrata Waterfall (`efrata-waterfall`)
- Holbung Hill (`holbung-hill`)

### Marker Config / Item Jualan

Kategori `food` memiliki `marker_config`/indikasi item jualan:

- Arsik: `75000`
- Ombus-Ombus: `25000`
- Naniura: `65000`
- Dali Ni Horbo: `45000`
- Mie Gomak: `35000`

## Temuan Penting

### 1. Mismatch jumlah progress

- UI: `0/25 dijelajahi`
- data publik landmark: `24`
- warning panorama memunculkan node ekstra: `stone-chair`

Inferensi paling kuat: angka `25` kemungkinan menghitung node panorama tambahan `stone-chair`, sementara map 3D / dataset landmark publik yang tampil hanya `24`.

### 2. Error / warning console

- `Multiple instances of Three.js being imported`
- request `user_progress` ke Supabase merespons `406`
- autoplay audio sempat gagal sebelum user interaction: `NotAllowedError`
- banyak warning `PhotoSphereViewer: Node ... is never linked`

### 3. Catatan UX

- URL query `?node=...&landmark=...` tetap terlihat walau user sudah menekan `Kembali ke Peta`.
- Kontrol gyroscope/compass terlihat ada, tetapi tidak terekspos dengan label UI yang sangat jelas pada snapshot akhir.

## Artefak Tambahan

- Raw landmark data: `output/playwright/landmarks.json`
- Source chunk yang diinspeksi: `output/playwright/page.js`, `output/playwright/chunk669.js`
- Attempt log batch landmark: `output/playwright/landmark_route_checks.tsv`
- Attempt log representative panorama: `output/playwright/representative_panorama_checks.tsv`

## Kesimpulan

Secara fungsi, web ini sudah memiliki paket fitur yang cukup lengkap:

- eksplorasi peta 3D
- transisi ke panorama 360
- filter kategori
- multilingual UI
- progress + gamification
- auth/save progress
- chat NPC `Opung`
- kuis
- audio ambience

Temuan paling penting untuk ditindaklanjuti adalah mismatch `25` vs `24`, warning node panorama yang tidak saling linked, dan error `406` untuk progress anonymous user.

# BMC Rumah Yatim x Marketplace — Cinematic Interactive Presentation

## Cara menjalankan
1. Ekstrak ZIP, buka `index.html` di Chrome/Edge/Firefox (cukup klik dua kali, tanpa internet/server).
2. Klik **▶ MULAI PERTUNJUKAN** (wajib, agar browser mengizinkan audio).
3. Tekan **F** untuk fullscreen, lalu nikmati.

## Kontrol
| Tombol | Fungsi |
|---|---|
| → / Spasi / Enter / PageDown | Berikutnya (juga melewati adegan otomatis) |
| ← / PageUp | Slide sebelumnya |
| Home / End | Slide 1 / layar akhir |
| F | Fullscreen |
| M | Mute |
Bar bawah (muncul saat mouse bergerak): progress, volume, master mute, toggle **Musik** dan **SFX**.

## Alur
Gate → Opening (4 karakter, sinkron beat lagu) → Fake loading → Slide 1–3 → *Freeze* → Slide 4–5 → *Suspense* → Slide 6–11 → *Plot twist* (audio kejutan) → Slide 12–14 → *Dark suspense* → Video penutup → Layar akhir (tombol Putar Ulang).

## Struktur
- `index.html` — struktur & konten slide
- `css/style.css` — styling, motion, transisi
- `js/content.js` — konten slide 6–9 (data)
- `js/main.js` — navigasi, timeline opening (cue beat), interlude, audio
- `assets/img|audio|video` — foto, musik, SFX (sintesis lokal), video penutup

## Mengubah cue opening
Di `js/main.js`, array `cues` pada hook `intro` (detik: 2.2, 5.05, 7.35, 10.65, 14.19, 18.09, 21.9) = titik beat lagu.

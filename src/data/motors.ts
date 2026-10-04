/**
 * Katalog motor — data v1.
 *
 * TODO (DECISIONS.md D-002): data ini masih statis. Setelah TASK-024 (pasca-v1),
 * pindahkan ke tabel backend / CMS agar operator bisa mengubah tanpa redeploy.
 *
 * Aturan proyek yang berlaku di sini:
 * - Jangan tampilkan jumlah unit fisik ke publik (#16): field `unitCount`
 *   sengaja TIDAK ada di tipe ini. UI hanya menampilkan status teks.
 * - Semua harga adalah placeholder sampai daftar harga resmi dikonfirmasi (#19).
 */

export type MotorCategory = "matic" | "manual" | "listrik";

export type AvailabilityStatus = "available" | "limited" | "rented";

export interface Motor {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: MotorCategory;
  year: number;
  /** TODO: null untuk motor listrik (daya ditulis di description). */
  engineCc?: number;
  /** IDR per periode — placeholder sampai dikonfirmasi pemilik bisnis. */
  priceDay: number;
  priceWeek: number;
  priceMonth: number;
  features: string[];
  description: string;
  status: AvailabilityStatus;
}

export const MOTOR_CATEGORIES: Array<{
  value: MotorCategory | "semua";
  label: string;
}> = [
  { value: "semua", label: "semua" },
  { value: "matic", label: "matic" },
  { value: "manual", label: "manual" },
  { value: "listrik", label: "listrik" },
];

export const STATUS_META: Record<
  AvailabilityStatus,
  { label: string; className: string }
> = {
  available: { label: "TERSEDIA", className: "text-ok" },
  limited: { label: "TERBATAS", className: "text-warn" },
  rented: { label: "DISIWA", className: "text-idle" },
};

export const CATEGORY_LABEL: Record<MotorCategory, string> = {
  matic: "matic",
  manual: "manual",
  listrik: "listrik",
};

export const MOTORS: Motor[] = [
  {
    id: "mtr-001",
    slug: "honda-beat-110",
    name: "Honda Beat 110",
    brand: "Honda",
    category: "matic",
    year: 2024,
    engineCc: 110,
    priceDay: 75000,
    priceWeek: 475000,
    priceMonth: 1650000,
    features: ["2 helm", "jas hujan", "bagasi"],
    description:
      "Matic irit untuk harian dan keliling kota. Ringan, lincah, mudah dikendarai pemula.",
    status: "available",
  },
  {
    id: "mtr-002",
    slug: "honda-vario-160",
    name: "Honda Vario 160",
    brand: "Honda",
    category: "matic",
    year: 2024,
    engineCc: 160,
    priceDay: 90000,
    priceWeek: 550000,
    priceMonth: 1900000,
    features: ["2 helm", "jas hujan", "USB charger"],
    description:
      "Matic bertenaga dengan bagasi luas, nyaman untuk perjalanan jarak jauh berdua.",
    status: "available",
  },
  {
    id: "mtr-003",
    slug: "yamaha-aerox-155",
    name: "Yamaha Aerox 155",
    brand: "Yamaha",
    category: "matic",
    year: 2023,
    engineCc: 155,
    priceDay: 100000,
    priceWeek: 625000,
    priceMonth: 2150000,
    features: ["2 helm", "jas hujan", "keyless"],
    description:
      "Matic sporty dengan performa tinggi dan sistem keyless untuk kenyamanan harian.",
    status: "limited",
  },
  {
    id: "mtr-004",
    slug: "honda-scoopy-125",
    name: "Honda Scoopy 125",
    brand: "Honda",
    category: "matic",
    year: 2024,
    engineCc: 125,
    priceDay: 85000,
    priceWeek: 530000,
    priceMonth: 1850000,
    features: ["2 helm", "jas hujan", "bagasi"],
    description:
      "Matic stylish dengan jok empuk, pas untuk keliling kota berdua.",
    status: "limited",
  },
  {
    id: "mtr-005",
    slug: "yamaha-frego-125",
    name: "Yamaha FreeGo 125",
    brand: "Yamaha",
    category: "matic",
    year: 2023,
    engineCc: 125,
    priceDay: 80000,
    priceWeek: 500000,
    priceMonth: 1750000,
    features: ["2 helm", "jas hujan", "USB charger"],
    description:
      "Matic praktis dengan ruang kaki lega dan konsumsi bahan bakar hemat.",
    status: "available",
  },
  {
    id: "mtr-006",
    slug: "suzuki-address-110",
    name: "Suzuki Address 110",
    brand: "Suzuki",
    category: "matic",
    year: 2023,
    engineCc: 110,
    priceDay: 70000,
    priceWeek: 450000,
    priceMonth: 1550000,
    features: ["2 helm", "jas hujan"],
    description:
      "Matic paling hemat untuk mobilitas harian dengan perawatan ringan.",
    status: "available",
  },
  {
    id: "mtr-007",
    slug: "yamaha-vixion-155",
    name: "Yamaha V-Ixion 155",
    brand: "Yamaha",
    category: "manual",
    year: 2023,
    engineCc: 155,
    priceDay: 130000,
    priceWeek: 820000,
    priceMonth: 2800000,
    features: ["2 helm", "jas hujan", "ABS"],
    description:
      "Motor sport manual yang stabil untuk touring antar kota.",
    status: "rented",
  },
  {
    id: "mtr-008",
    slug: "honda-crf150l",
    name: "Honda CRF150L",
    brand: "Honda",
    category: "manual",
    year: 2024,
    engineCc: 150,
    priceDay: 150000,
    priceWeek: 950000,
    priceMonth: 3200000,
    features: ["2 helm", "jas hujan", "ban dual-purpose"],
    description:
      "Trail manual siap jalan aspal maupun jalur tanjakan menuju kawasan wisata.",
    status: "available",
  },
  {
    id: "mtr-009",
    slug: "kawasaki-klx-150",
    name: "Kawasaki KLX 150",
    brand: "Kawasaki",
    category: "manual",
    year: 2023,
    engineCc: 150,
    priceDay: 140000,
    priceWeek: 890000,
    priceMonth: 3000000,
    features: ["2 helm", "jas hujan", "ban dual-purpose"],
    description:
      "Trail ringan dan tangguh, cocok untuk rute pegunungan dan jalur rusak.",
    status: "available",
  },
  {
    id: "mtr-010",
    slug: "gesits-g1",
    name: "Gesits G1",
    brand: "Gesits",
    category: "listrik",
    year: 2024,
    priceDay: 120000,
    priceWeek: 750000,
    priceMonth: 2500000,
    features: ["2 helm", "jas hujan", "tanpa bensin"],
    description:
      "Motor listrik senyap, jarak tempuh hingga ±100 km per pengisian (klaim pabrik).",
    status: "available",
  },
  {
    id: "mtr-011",
    slug: "alva-one",
    name: "Alva One",
    brand: "Alva",
    category: "listrik",
    year: 2024,
    priceDay: 130000,
    priceWeek: 820000,
    priceMonth: 2750000,
    features: ["2 helm", "jas hujan", "connected app"],
    description:
      "Motor listrik modern dengan koneksi aplikasi untuk memantau status baterai.",
    status: "limited",
  },
];

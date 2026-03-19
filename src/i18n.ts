import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "title": "KILOUX - AI Software & Web Agency",
      "hero": {
        "tagline": "INDONESIA'S LEADING IT & DESIGN AGENCY",
        "title": "KILOUX",
        "subtitle": "STUDIO",
        "desc": "Immersive digital experiences. We build high-performance software, modern 3D assets, and interactive web solutions.",
        "interactive": "Interactive 3D",
        "drag": "Drag to rotate",
        "loading3d": "Loading 3D Experience...",
        "cta1": "See Our Work",
        "cta2": "Contact Us"
      },
      "nav": {
        "home": "Home",
        "services": "Services",
        "portfolio": "Portfolio",
        "pricing": "Pricing",
        "contact": "Contact",
        "blog": "Blog",
        "team": "Team"
      },
      "story": {
        "title1": "We don't just write code.",
        "title2": "We craft digital realities.",
        "desc": "At Kiloux, we blend interactive design, 3D modern assets, and robust engineering to create startups and enterprise solutions that stand out. Every pixel tells a story. Every interaction is an experience."
      },
      "process": {
        "title1": "How We",
        "title2": "Work",
        "desc": "A streamlined process designed for efficiency, transparency, and outstanding results.",
        "steps": {
          "1": { "title": "Discovery", "desc": "We dive deep into your brand, goals, and target audience to formulate a winning strategy." },
          "2": { "title": "Design", "desc": "Crafting intuitive user interfaces and immersive 3D experiences that captivate." },
          "3": { "title": "Development", "desc": "Writing clean, scalable code using the latest modern tech stack." },
          "4": { "title": "Launch", "desc": "Rigorous testing, deployment, and ongoing support to ensure continuous growth." }
        }
      },
      "services": {
        "title1": "Our",
        "title2": "Expertise",
        "desc": "Engineering intelligent ecosystems designed for the modern era.",
        "items": {
          "1": { "title": "Interactive Web", "desc": "GSAP animations, WebGL, and immersive storytelling." },
          "2": { "title": "3D Assets & Design", "desc": "Modern 3D modeling, mascots, and professional UI/UX." },
          "3": { "title": "Startup Engineering", "desc": "End-to-end product development from MVP to scale." },
          "4": { "title": "AI Solutions", "desc": "Custom LLM integration and automated workflows." },
          "5": { "title": "Mobile Apps", "desc": "Cross-platform mobile applications with native feel." },
          "6": { "title": "Cloud Architecture", "desc": "Scalable, secure, and cost-effective deployments." }
        }
      },
      "portfolio": {
        "title1": "Featured",
        "title2": "Works",
        "items": {
          "1": { "name": "Nexus AI", "category": "AI Platform" },
          "2": { "name": "FinTech Pro", "category": "Mobile App" },
          "3": { "name": "EcoTrack", "category": "SaaS Dashboard" }
        }
      },
      "team": {
        "title1": "Our",
        "title2": "Team",
        "desc": "The brilliant minds behind the digital realities we craft."
      },
      "blog": {
        "title1": "Latest",
        "title2": "Insights",
        "desc": "Thoughts, news, and articles from our team.",
        "readMore": "Read More",
        "notFound": "Post Not Found",
        "backHome": "Back to Home",
        "unknownDate": "Unknown Date",
        "defaultDesc": "Read this post on Kiloux Studio."
      },
      "pricing": {
        "title1": "Transparent",
        "title2": "Pricing",
        "desc": "Scale your business with our flexible development packages.",
        "choose": "Choose Plan",
        "plans": {
          "1": { "name": "MVP Builder", "price": "$5k", "f1": "Core Features", "f2": "UI/UX Design", "f3": "Web App", "f4": "1 Month Support" },
          "2": { "name": "Growth Scale", "price": "$15k", "f1": "Full Stack App", "f2": "Mobile App", "f3": "AI Integration", "f4": "3 Months Support", "f5": "3D Assets" },
          "3": { "name": "Enterprise", "price": "Custom", "f1": "Custom Architecture", "f2": "Dedicated Team", "f3": "24/7 Support", "f4": "Unlimited Revisions" }
        }
      },
      "contact": {
        "title1": "Let's Build",
        "title2": "Something Great",
        "name": "Name",
        "namePlaceholder": "John Doe",
        "email": "Email",
        "emailPlaceholder": "john@example.com",
        "message": "Message",
        "messagePlaceholder": "Tell us about your project...",
        "send": "Send Message",
        "emailUs": "Email Us",
        "followUs": "Follow Us"
      },
      "chat": {
        "title": "Live Support",
        "signInPrompt": "Sign in to chat with our team.",
        "signInBtn": "Sign in with Google",
        "placeholder": "Type a message..."
      },
      "footer": {
        "rights": "© 2026 KILOUX Agency. All rights reserved. Built in Indonesia.",
        "privacy": "Privacy Policy",
        "terms": "Terms of Service"
      }
    }
  },
  id: {
    translation: {
      "title": "KILOUX - Agensi Perangkat Lunak & Web AI",
      "hero": {
        "tagline": "AGENSI IT & DESAIN TERKEMUKA DI INDONESIA",
        "title": "KILOUX",
        "subtitle": "STUDIO",
        "desc": "Pengalaman digital yang imersif. Kami membangun perangkat lunak berkinerja tinggi, aset 3D modern, dan solusi web interaktif.",
        "interactive": "3D Interaktif",
        "drag": "Geser untuk memutar",
        "loading3d": "Memuat Pengalaman 3D...",
        "cta1": "Lihat Karya Kami",
        "cta2": "Hubungi Kami"
      },
      "nav": {
        "home": "Beranda",
        "services": "Layanan",
        "portfolio": "Portofolio",
        "pricing": "Harga",
        "contact": "Kontak",
        "blog": "Blog",
        "team": "Tim"
      },
      "story": {
        "title1": "Kami tidak sekadar menulis kode.",
        "title2": "Kami merancang realitas digital.",
        "desc": "Di Kiloux, kami memadukan desain interaktif, aset 3D modern, dan rekayasa perangkat lunak yang tangguh untuk menciptakan solusi startup dan perusahaan yang menonjol. Setiap piksel bercerita. Setiap interaksi adalah pengalaman."
      },
      "process": {
        "title1": "Cara Kami",
        "title2": "Bekerja",
        "desc": "Proses yang disederhanakan dan dirancang untuk efisiensi, transparansi, dan hasil yang luar biasa.",
        "steps": {
          "1": { "title": "Penemuan", "desc": "Kami menyelami merek, tujuan, dan audiens target Anda untuk merumuskan strategi yang unggul." },
          "2": { "title": "Desain", "desc": "Merancang antarmuka pengguna yang intuitif dan pengalaman 3D imersif yang memikat." },
          "3": { "title": "Pengembangan", "desc": "Menulis kode yang bersih dan terukur menggunakan tumpukan teknologi modern terbaru." },
          "4": { "title": "Peluncuran", "desc": "Pengujian ketat, penerapan, dan dukungan berkelanjutan untuk memastikan pertumbuhan." }
        }
      },
      "services": {
        "title1": "Keahlian",
        "title2": "Kami",
        "desc": "Membangun ekosistem cerdas yang dirancang untuk era modern.",
        "items": {
          "1": { "title": "Web Interaktif", "desc": "Animasi GSAP, WebGL, dan penceritaan yang imersif." },
          "2": { "title": "Aset & Desain 3D", "desc": "Pemodelan 3D modern, maskot, dan UI/UX profesional." },
          "3": { "title": "Rekayasa Startup", "desc": "Pengembangan produk end-to-end dari MVP hingga skala besar." },
          "4": { "title": "Solusi AI", "desc": "Integrasi LLM kustom dan alur kerja otomatis." },
          "5": { "title": "Aplikasi Mobile", "desc": "Aplikasi seluler lintas platform dengan nuansa native." },
          "6": { "title": "Arsitektur Cloud", "desc": "Penerapan yang terukur, aman, dan hemat biaya." }
        }
      },
      "portfolio": {
        "title1": "Karya",
        "title2": "Unggulan",
        "items": {
          "1": { "name": "Nexus AI", "category": "Platform AI" },
          "2": { "name": "FinTech Pro", "category": "Aplikasi Mobile" },
          "3": { "name": "EcoTrack", "category": "Dasbor SaaS" }
        }
      },
      "team": {
        "title1": "Tim",
        "title2": "Kami",
        "desc": "Pikiran-pikiran brilian di balik realitas digital yang kami ciptakan."
      },
      "blog": {
        "title1": "Wawasan",
        "title2": "Terbaru",
        "desc": "Pemikiran, berita, dan artikel dari tim kami.",
        "readMore": "Baca Selengkapnya",
        "notFound": "Postingan Tidak Ditemukan",
        "backHome": "Kembali ke Beranda",
        "unknownDate": "Tanggal Tidak Diketahui",
        "defaultDesc": "Baca postingan ini di Kiloux Studio."
      },
      "pricing": {
        "title1": "Harga",
        "title2": "Transparan",
        "desc": "Kembangkan bisnis Anda dengan paket pengembangan fleksibel kami.",
        "choose": "Pilih Paket",
        "plans": {
          "1": { "name": "Pembuat MVP", "price": "$5k", "f1": "Fitur Inti", "f2": "Desain UI/UX", "f3": "Aplikasi Web", "f4": "Dukungan 1 Bulan" },
          "2": { "name": "Skala Pertumbuhan", "price": "$15k", "f1": "Aplikasi Full Stack", "f2": "Aplikasi Mobile", "f3": "Integrasi AI", "f4": "Dukungan 3 Bulan", "f5": "Aset 3D" },
          "3": { "name": "Perusahaan", "price": "Kustom", "f1": "Arsitektur Kustom", "f2": "Tim Dedikasi", "f3": "Dukungan 24/7", "f4": "Revisi Tak Terbatas" }
        }
      },
      "contact": {
        "title1": "Mari Bangun",
        "title2": "Sesuatu yang Hebat",
        "name": "Nama",
        "namePlaceholder": "Budi Santoso",
        "email": "Email",
        "emailPlaceholder": "budi@contoh.com",
        "message": "Pesan",
        "messagePlaceholder": "Ceritakan tentang proyek Anda...",
        "send": "Kirim Pesan",
        "emailUs": "Email Kami",
        "followUs": "Ikuti Kami"
      },
      "chat": {
        "title": "Dukungan Langsung",
        "signInPrompt": "Masuk untuk mengobrol dengan tim kami.",
        "signInBtn": "Masuk dengan Google",
        "placeholder": "Ketik pesan..."
      },
      "footer": {
        "rights": "© 2026 KILOUX Agency. Hak cipta dilindungi undang-undang. Dibuat di Indonesia.",
        "privacy": "Kebijakan Privasi",
        "terms": "Syarat & Ketentuan"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

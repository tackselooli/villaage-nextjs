import { PrismaClient } from "@prisma/client";
import { localAvatar } from "../src/lib/avatar";

const db = new PrismaClient();

const AGENTS = [
  { name: "Arash Tehrani",     email: "arash@villaage.ir",   phone: "+98 21 8877 6655", agency: "خانه‌برتر تهران",     verified: true,  bio: "بیش از پانزده سال تجربه در بازار مسکن لواسان و نیاوران. تخصص در ویلاهای مدرن و آپارتمان‌های نوساز شمال تهران." },
  { name: "Shirin Karimi",    email: "shirin@villaage.ir",  phone: "+98 31 3666 5544", agency: "اصفهان ملک",        verified: true,  bio: "متخصص خانه‌های تاریخی محله جلفا و کلیسای وانک. عاشق معماری اصیل ایرانی و مرمت باغ‌های سنتی." },
  { name: "Reza Mohammadi",   email: "reza@villaage.ir",    phone: "+98 71 3222 1100", agency: "شیراز استیت",      verified: true,  bio: "متولد شیراز، بزرگ‌شده در قدمیه. بیش از ده سال در معاملات باغ‌های زعفرانی و خانه‌های حیاط‌دار مرکزی فعال است." },
  { name: "Leila Hashemi",     email: "leila@villaage.ir",   phone: "+98 41 3555 8899", agency: "تبریز خانه",       verified: false, bio: "مهندس عمران و مشاور املاک تبریز. تخصص در بازارهای شمال شهر و آپارتمان‌های نوساز ولیعصر." },
  { name: "Mohammad Jafari",  email: "mohammad@villaage.ir", phone: "+98 51 3888 2200", agency: "مشهد پلاس",       verified: true,  bio: "مشاور املاک منطقه سجاد و وکیل‌آباد. بیش از ۳۰۰ معامله موفق در آپارتمان‌های تجاری-اداری مشهد." },
  { name: "Niloofar Ahmadi",  email: "niloofar@villaage.ir", phone: "+98 35 3444 7766", agency: "یزد باغ",         verified: true,  bio: "پژوهشگر معماری خاکی و مشاور خانه‌های بادگیری یزد. مرمت‌گر خانه‌های تاریخی باخالق." },
  { name: "Hossein Rostami",  email: "hossein@villaage.ir", phone: "+98 76 4222 3300", agency: "کیش لاگون",       verified: true,  bio: "متخصص ویلاهای ساحلی کیش و هرمزگان. تخصص در املاک تجاری-تفریحی و پروژه‌های هتل‌آپارتمان." },
  { name: "Fatemeh Sadeghi",  email: "fatemeh@villaage.ir", phone: "+98 13 4333 5511", agency: "گیلان سرما",      verified: false, bio: "راهنمای املاک جنگلی شمال. ویلاهای چالدران، ماسوله و رامسر با دید به دریا یا جنگل." },
];

// Pool of locally-hosted property images (served from /public/images/properties/).
// These work without VPN since they're bundled with the project.
const IMG = {
  villaModern1: "/images/properties/villa-modern-1.jpg",
  villaModern2: "/images/properties/villa-modern-2.jpg",
  villaModern3: "/images/properties/villa-modern-3.jpg",
  villaModern4: "/images/properties/villa-modern-4.jpg",
  persianHouse1: "/images/properties/persian-house-1.jpg",
  persianHouse2: "/images/properties/persian-house-2.jpg",
  persianHouse3: "/images/properties/persian-house-3.jpg",
  persianHouse4: "/images/properties/persian-house-4.jpg",
  apartment1: "/images/properties/apartment-1.jpg",
  apartment2: "/images/properties/apartment-2.jpg",
  interiorLiving1: "/images/properties/interior-living-1.jpg",
  interiorLiving2: "/images/properties/interior-living-2.jpg",
  seasideVilla1: "/images/properties/seaside-villa-1.jpg",
  seasideVilla2: "/images/properties/seaside-villa-2.jpg",
  commercialShop: "/images/properties/commercial-shop.jpg",
  interiorKitchen1: "/images/properties/interior-kitchen-1.jpg",
  interiorKitchen2: "/images/properties/interior-kitchen-2.jpg",
};

type SeedProp = {
  title: string;
  description: string;
  advertType: "For Sale" | "For Rent" | "Auction";
  propertyType: "House" | "Apartment" | "Office" | "Warehouse" | "Commercial" | "Other";
  price: number; // in Toman
  taxPercent: number;
  country: string;
  city: string;
  postalCode: string;
  streetAddress: string;
  bedrooms: number;
  bathrooms: number;
  totalFloors: number;
  plotArea: number;
  coverPhoto: string;
  photo1?: string;
  photo2?: string;
  photo3?: string;
  photo4?: string;
  featured?: boolean;
  agentIdx: number;
};

const PROPERTIES: SeedProp[] = [
  {
    title: "ویلای مدرن لواسان با استخر سرپوشیده",
    description:
      "ویلای دوبلکس در بهترین نقطه لواسان، با نمای سنگ و شیشه، استخر سرپوشیده، سونا، جکوزی و آسانسور داخلی. پارکینگ چهار خودرو، فضای سبز خصوصی با درختان میوه و سیستم هوشمند خانه. دید پانوراما به شهر تهران.",
    advertType: "For Sale",
    propertyType: "House",
    price: 85_000_000_000, // 85 billion Toman
    taxPercent: 5,
    country: "ایران",
    city: "تهران",
    postalCode: "16579",
    streetAddress: "لواسان، خیابان مریم‌آباد",
    bedrooms: 5,
    bathrooms: 6,
    totalFloors: 3,
    plotArea: 1200,
    coverPhoto: IMG.villaModern1,
    photo1: IMG.villaModern2,
    photo2: IMG.apartment1,
    photo3: IMG.interiorLiving1,
    photo4: IMG.seasideVilla1,
    featured: true,
    agentIdx: 0,
  },
  {
    title: "آپارتمان نوساز نیاوران با دید به کوه",
    description:
      "آپارتمان ۲۲۰ متری، طبقه دوازدهم، برج دوگانه با مدیریت شبانه‌روزی. سه خواب مستر، پارکینگ سرپوشیده، انباری، لابی‌من، آسانسور پانوراما و سیستم تهویه مرکزی. کمتر از یک سال از تحویل ساختمان می‌گذرد.",
    advertType: "For Sale",
    propertyType: "Apartment",
    price: 42_000_000_000,
    taxPercent: 5,
    country: "ایران",
    city: "تهران",
    postalCode: "19539",
    streetAddress: "نیاوران، خیابان یاسر",
    bedrooms: 3,
    bathrooms: 3,
    totalFloors: 14,
    plotArea: 220,
    coverPhoto: IMG.apartment2,
    photo1: IMG.apartment1,
    photo2: IMG.villaModern2,
    photo3: IMG.interiorLiving1,
    featured: true,
    agentIdx: 0,
  },
  {
    title: "خانه تاریخی جلفا با حیاط مرکزی",
    description:
      "خانه‌ای ۱۲۰ ساله در قلب محله تاریخی جلفا، مرمت‌شده با مصالح بومی. حیاط مرکزی با حوض و باغچه، سه اتاق پنج‌دری با آینه‌کاری، زیرزمین طاق‌دار و حیاط خلوت با درختان کهنسال انگور و توت. ثبت‌شده در فهرست آثار ملی.",
    advertType: "For Sale",
    propertyType: "House",
    price: 28_000_000_000,
    taxPercent: 5,
    country: "ایران",
    city: "اصفهان",
    postalCode: "81647",
    streetAddress: "جلفا، کوچه حکیم نظامی",
    bedrooms: 4,
    bathrooms: 3,
    totalFloors: 2,
    plotArea: 450,
    coverPhoto: IMG.persianHouse1,
    photo1: IMG.villaModern1,
    photo2: IMG.persianHouse2,
    photo3: IMG.persianHouse3,
    featured: true,
    agentIdx: 1,
  },
  {
    title: "باغ زعفرانی قدیمی قدمیه شیراز",
    description:
      "باغی هشت هزار متری با خانه قدیمی سنگی در محله قدمیه. ۱۲ درخت زعفرانی کهنسال، حوض سنگی، چشمه طبیعی و خانه‌ای با تزئینات گچ‌بری قاجار. فضای مناسب برای تبدیل به بوم‌سرای دنج.",
    advertType: "For Sale",
    propertyType: "House",
    price: 35_000_000_000,
    taxPercent: 5,
    country: "ایران",
    city: "شیراز",
    postalCode: "71847",
    streetAddress: "قدمیه، خیابان باباکوچه‌باغ",
    bedrooms: 3,
    bathrooms: 2,
    totalFloors: 1,
    plotArea: 8000,
    coverPhoto: IMG.villaModern1,
    photo1: IMG.persianHouse1,
    photo2: IMG.persianHouse2,
    photo3: IMG.apartment2,
    featured: true,
    agentIdx: 2,
  },
  {
    title: "آپارتمان وکیل‌آباد مشهد نزدیک مترو",
    description:
      "آپارتمان ۱۱۰ متری در مجتمع مسکونی-تجاری وکیل‌آباد، فاصله ۵۰ متری از مترو. دو خواب، سالن پذیرایی بزرگ، آشپزخانه开放式، پارکینگ و انباری. مناسب سرمایه‌گذاری و اجاره.",
    advertType: "For Sale",
    propertyType: "Apartment",
    price: 12_500_000_000,
    taxPercent: 5,
    country: "ایران",
    city: "مشهد",
    postalCode: "91837",
    streetAddress: "وکیل‌آباد، بین وکیل‌آباد ۳۱ و ۳۳",
    bedrooms: 2,
    bathrooms: 2,
    totalFloors: 7,
    plotArea: 110,
    coverPhoto: IMG.apartment1,
    photo1: IMG.apartment2,
    photo2: IMG.villaModern2,
    photo3: IMG.interiorLiving1,
    featured: false,
    agentIdx: 4,
  },
  {
    title: "خانه بادگیری دوبلکس یزد با بادگیر",
    description:
      "خانه‌ای تاریخی در بافت فینی یزد، مرمت‌شده با گل‌وگچ بومی. چهار بادگیر بلند، حیاط مرکزی با حوض مرمری، زیرزمین خنکای طبیعی و اتاق‌های پنج‌دری با آینه‌کاری. ثبت‌شده در فهرست میراث فرهنگی.",
    advertType: "For Sale",
    propertyType: "House",
    price: 18_000_000_000,
    taxPercent: 5,
    country: "ایران",
    city: "یزد",
    postalCode: "89167",
    streetAddress: "بافت فینی، محله شهید رجایی",
    bedrooms: 4,
    bathrooms: 3,
    totalFloors: 2,
    plotArea: 380,
    coverPhoto: IMG.persianHouse3,
    photo1: IMG.persianHouse1,
    photo2: IMG.villaModern1,
    photo3: IMG.persianHouse2,
    photo4: IMG.persianHouse4,
    featured: true,
    agentIdx: 5,
  },
  {
    title: "ویلای ساحلی کیش با ساحل خصوصی",
    description:
      "ویلای دوبلکس ساحلی در منطقه مریلند کیش، با ساحل خصوصی، استخر روباز، پنت‌هاوس روی پشت‌بام با دید ۳۶۰ درجه به خلیج فارس. پارکینگ شش خودرو، فضای سبز گرمسیری و اسکله خصوصی برای قایق.",
    advertType: "For Sale",
    propertyType: "House",
    price: 95_000_000_000,
    taxPercent: 5,
    country: "ایران",
    city: "کیش",
    postalCode: "79417",
    streetAddress: "مریلند، بلوار ساحلی",
    bedrooms: 6,
    bathrooms: 7,
    totalFloors: 3,
    plotArea: 950,
    coverPhoto: IMG.seasideVilla1,
    photo1: IMG.villaModern2,
    photo2: IMG.apartment2,
    photo3: IMG.apartment1,
    photo4: IMG.interiorLiving1,
    featured: true,
    agentIdx: 6,
  },
  {
    title: "ویلای جنگلی چالدران با دید به دریای مازندران",
    description:
      "ویلای چوبی-سنگی در جنگل‌های چالدران، ۵ دقیقه تا ساحل. شومینه سنگی، پنجره‌های سقفی، تراس چوبی دوردرگیر و حیاط با درختان راش. مناسب استراحت آخر هفته یا بوم‌سرای کوچک.",
    advertType: "For Sale",
    propertyType: "House",
    price: 15_000_000_000,
    taxPercent: 5,
    country: "ایران",
    city: "رامسر",
    postalCode: "46731",
    streetAddress: "چالدران، جاده جنگلی",
    bedrooms: 3,
    bathrooms: 2,
    totalFloors: 2,
    plotArea: 600,
    coverPhoto: IMG.villaModern1,
    photo1: IMG.persianHouse2,
    photo2: IMG.persianHouse1,
    photo3: IMG.villaModern2,
    featured: false,
    agentIdx: 7,
  },
  {
    title: "مغازه تجاری چهارراه ولیعصر تبریز",
    description:
      "مغازه ۸۵ متری در بهترین نقطه تجاری ولیعصر، رو به چهارراه ولیعصر. مناسب برند پوشاک، جواهرفروشی یا کافه. دو ویترین بزرگ، انبار پشتی، سرویس بهداشتی و امکان نصب تابلو روی نما.",
    advertType: "For Sale",
    propertyType: "Commercial",
    price: 22_000_000_000,
    taxPercent: 8,
    country: "ایران",
    city: "تبریز",
    postalCode: "51648",
    streetAddress: "ولیعصر، ضلع شمالی چهارراه",
    bedrooms: 0,
    bathrooms: 1,
    totalFloors: 1,
    plotArea: 85,
    coverPhoto: IMG.apartment1,
    photo1: IMG.villaModern2,
    photo2: IMG.interiorLiving1,
    featured: false,
    agentIdx: 3,
  },
  {
    title: "آپارتمان اجاره‌ای الهیه مبله",
    description:
      "آپارتمان ۹۰ متری مبله در الهیه، مناسب دیپلمات‌ها و کارمندان شرکت‌های بین‌المللی. تمام امکانات (نظافت روزانه، اینترنت فیبر، صبحانه) در اجاره گنجانده شده. تحویل فوری.",
    advertType: "For Rent",
    propertyType: "Apartment",
    price: 350_000_000, // per month in Toman
    taxPercent: 9,
    country: "ایران",
    city: "تهران",
    postalCode: "19139",
    streetAddress: "الهیه، خیابان باهنر",
    bedrooms: 2,
    bathrooms: 2,
    totalFloors: 6,
    plotArea: 90,
    coverPhoto: IMG.apartment2,
    photo1: IMG.apartment1,
    photo2: IMG.villaModern2,
    featured: false,
    agentIdx: 0,
  },
  {
    title: "دفتر کار والأمرکه سعادت‌آباد",
    description:
      "دفتر کار ۲۵۰ متری در برج اداری سعادت‌آباد، با پلان باز، پارتیشن‌بندی شیشه‌ای، اتاق جلسات، سروراخانه و آشپزخانه استاندارد. پارکینگ دو خودرو و سالن انتظار مجهز.",
    advertType: "For Rent",
    propertyType: "Office",
    price: 800_000_000, // per month
    taxPercent: 9,
    country: "ایران",
    city: "تهران",
    postalCode: "19799",
    streetAddress: "سعادت‌آباد، بلوار دریا",
    bedrooms: 0,
    bathrooms: 4,
    totalFloors: 12,
    plotArea: 250,
    coverPhoto: IMG.apartment1,
    photo1: IMG.villaModern2,
    photo2: IMG.interiorLiving1,
    photo3: IMG.seasideVilla1,
    featured: false,
    agentIdx: 0,
  },
  {
    title: "انبار صنعتی شهرک صنعتی شمشک",
    description:
      "انبار ۱۲۰۰ متری در شهرک صنعتی شمشک، با سقف ۹ متری، جرثقیل ۵ تنی، سه درب بارانداز و دفتر مدیریت ۸۰ متری. دسترسی آسان به اتوبان تهران-شمشک و مناسب لوجستیک.",
    advertType: "For Rent",
    propertyType: "Warehouse",
    price: 1_200_000_000, // per month
    taxPercent: 9,
    country: "ایران",
    city: "تهران",
    postalCode: "19569",
    streetAddress: "شهرک صنعتی شمشک، خیابان ۱۲",
    bedrooms: 0,
    bathrooms: 3,
    totalFloors: 1,
    plotArea: 1200,
    coverPhoto: IMG.villaModern2,
    photo1: IMG.apartment1,
    photo2: IMG.interiorLiving1,
    featured: false,
    agentIdx: 0,
  },
  {
    title: "ویلای تاریخی ماسوله با نمای سنگی",
    description:
      "خانه‌ای سنتی در روستای ماسوله، با معماری پلکانی و نمای سنگی مشخص. سه طبقه متصل، حیاط‌های کوچک در هر طبقه و دید به دره جنگلی ماسوله. مناسب تبدیل به بوم‌سرا یا اقامتگاه بوم‌گردی.",
    advertType: "For Sale",
    propertyType: "House",
    price: 9_500_000_000,
    taxPercent: 5,
    country: "ایران",
    city: "ماسوله",
    postalCode: "42411",
    streetAddress: "ماسوله، محله خوانسر",
    bedrooms: 4,
    bathrooms: 3,
    totalFloors: 3,
    plotArea: 180,
    coverPhoto: IMG.persianHouse3,
    photo1: IMG.villaModern1,
    photo2: IMG.persianHouse1,
    photo3: IMG.persianHouse4,
    featured: true,
    agentIdx: 7,
  },
  {
    title: "آپارتمان مرمری شریعتی با هایپر بزرگ",
    description:
      "آپارتمان ۱۸۰ متری، دوام طبقه هفتم، برج مرمری شریعتی با هایپر بزرگ و فاز دو آینده. سه خواب مستر، پارکینگ دو خودرو، انباری و لابی‌من. نزدیک به مترو و پارک ملت.",
    advertType: "For Sale",
    propertyType: "Apartment",
    price: 31_000_000_000,
    taxPercent: 5,
    country: "ایران",
    city: "تهران",
    postalCode: "16349",
    streetAddress: "شریعتی، بالاتر از میرداماد",
    bedrooms: 3,
    bathrooms: 3,
    totalFloors: 12,
    plotArea: 180,
    coverPhoto: IMG.apartment1,
    photo1: IMG.apartment2,
    photo2: IMG.villaModern2,
    photo3: IMG.interiorLiving1,
    featured: false,
    agentIdx: 0,
  },
  {
    title: "باغ ویلای کرمان با حوض سنگی",
    description:
      "باغ ویلا ۲۵۰۰ متری در حومه کرمان با خانه ۳۰۰ متری. حوض سنگی مرکزی، باغچه با درختان پسته و بادام، آلاچیق و خانه‌ای با شومینه آجری. مناسب استراحت آخر هفته.",
    advertType: "For Sale",
    propertyType: "House",
    price: 14_000_000_000,
    taxPercent: 5,
    country: "ایران",
    city: "کرمان",
    postalCode: "76139",
    streetAddress: "کرمان، جاده شهید بهشتی",
    bedrooms: 3,
    bathrooms: 2,
    totalFloors: 1,
    plotArea: 2500,
    coverPhoto: IMG.villaModern1,
    photo1: IMG.persianHouse2,
    photo2: IMG.persianHouse1,
    featured: false,
    agentIdx: 5,
  },
  {
    title: "پنت‌هاوس برج مروارید کیش",
    description:
      "پنت‌هاوس دوبلکس در طبقه ۲۸ برج مروارید کیش، با تراس خصوصی ۲۰۰ متری و استخر روباز. دید کامل به خلیج فارس و اسکله کیش. طراحی داخلی توسط استودیو معروف ایتالیایی، مبله کامل و آماده تحویل.",
    advertType: "For Sale",
    propertyType: "Apartment",
    price: 68_000_000_000,
    taxPercent: 5,
    country: "ایران",
    city: "کیش",
    postalCode: "79439",
    streetAddress: "برج مروارید، بلوار ساحلی",
    bedrooms: 4,
    bathrooms: 5,
    totalFloors: 2,
    plotArea: 380,
    coverPhoto: IMG.seasideVilla1,
    photo1: IMG.villaModern2,
    photo2: IMG.apartment1,
    photo3: IMG.interiorLiving1,
    photo4: IMG.apartment2,
    featured: true,
    agentIdx: 6,
  },
  {
    title: "ویلای سنتی کاشان با حیاط مرکزی",
    description:
      "خانه‌ای تاریخی ۱۵۰ ساله در محله بروجردی‌های کاشان، مرمت‌شده با گل‌وگچ. حیاط مرکزی با حوض سنگی و باغچه، سه اتاق پنج‌دری با آینه‌کاری، شاه‌نشین و زیرزمین خنکای طبیعی. مناسب بوم‌سرا یا اقامتگاه بوم‌گردی.",
    advertType: "For Sale",
    propertyType: "House",
    price: 16_500_000_000,
    taxPercent: 5,
    country: "ایران",
    city: "کاشان",
    postalCode: "87139",
    streetAddress: "بروجردی‌ها، کوچه علی‌مردان",
    bedrooms: 4,
    bathrooms: 3,
    totalFloors: 2,
    plotArea: 320,
    coverPhoto: IMG.persianHouse3,
    photo1: IMG.villaModern1,
    photo2: IMG.persianHouse1,
    photo3: IMG.persianHouse2,
    photo4: IMG.persianHouse4,
    featured: true,
    agentIdx: 5,
  },
  {
    title: "مغازه مزایده‌ای بازار بزرگ تبریز",
    description:
      "مغازه ۶۰ متری در بازار تاریخی تبریز (ثبت‌شده در فهرست میراث جهانی یونسکو). یکی از قدیمی‌بازارهای خاورمیانه، جایی که تجارت فرش، ادویه و طلای ایرانی قرن‌هاست جریان دارد. موقعیت کمیاب برای سرمایه‌گذاری بلندمدت.",
    advertType: "Auction",
    propertyType: "Commercial",
    price: 18_000_000_000,
    taxPercent: 8,
    country: "ایران",
    city: "تبریز",
    postalCode: "51348",
    streetAddress: "بازار بزرگ، تیمچه عباسی",
    bedrooms: 0,
    bathrooms: 1,
    totalFloors: 1,
    plotArea: 60,
    coverPhoto: IMG.apartment1,
    photo1: IMG.villaModern2,
    photo2: IMG.interiorLiving1,
    featured: false,
    agentIdx: 3,
  },
];

const RATING_COMMENTS = [
  { name: "Mehdi A.", score: 5, comment: "آرش در طی دو هفته خانه رویایی‌مان را در لواسان پیدا کرد. حرفه‌ای، دقیق و صادق. از تور اول تا تحویل سند همه‌چیز بی‌نقص بود." },
  { name: "Sahar K.", score: 5, comment: "شیرین جانشین به خانه تاریخی جلفا که می‌خواستیم معرفی کرد و در فرآیند مرمت نیز همراهی کرد. عاشق اصالت و دلسوزی او شدیم." },
  { name: "Ali M.", score: 4, comment: "رضا آقا واقعاً باغ قدمیه را خوب می‌شناسد. کمی زمان‌بر بود اما نتیجه عالی شد. پیشنهاد می‌کنم." },
  { name: "Zahra H.", score: 5, comment: "لیلا در تبریز بهترین آپارتمان ولیعصر را برایمان پیدا کرد. فرایند وام بانکی را هم برایمان تسهیل کرد. ممنونیم." },
  { name: "Mohammad T.", score: 5, comment: "محمد جعفری بازار وکیل‌آباد را مثل کف دست می‌شناسد. در سه روز معامله را بستیم. عالی." },
  { name: "Narges S.", score: 5, comment: "نیلوفر خانم خانه بادگیری یزد را پیدا کرد و در ثبت میراث فرهنگی هم کمک کرد. بدون او هرگز این گنج را پیدا نمی‌کردیم." },
  { name: "Hamid R.", score: 5, comment: "حسین آقا در کیش بی‌نظیر است. ویلای ساحلی مریلند را با قیمتی منصفانه خریدیم. همه چیز شفاف و سریع." },
  { name: "Roya F.", score: 4, comment: "فاطمه خانم ویلاهای جنگلی شمال را خوب می‌شناسد. کمی در قیمت‌گذاری محافظه‌کار است اما در نهایت راضی شدیم." },
  { name: "Pouya N.", score: 5, comment: "آپارتمان نیاوران دقیقاً مطابق توضیحات بود. آرش در همه مراحل همراه ما بود. توصیه می‌کنم." },
  { name: "Sara B.", score: 5, comment: "پنت‌هاوس برج مروارید را از حسین خریدیم. دید به خلیج فارس واقعاً نفس‌گیر است. ممنون از حرفه‌ای‌گری." },
  { name: "Reza D.", score: 4, comment: "خانه ماسوله عالی بود، اما فرآیند انتقال سند کمی طول کشید. در کل راضی‌ایم." },
  { name: "Mahsa T.", score: 5, comment: "خانه بادگیری یزد واقعاً یک گنج است. نیلوفر در درک ارزش فرهنگی ملک کمک زیادی کرد." },
];

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80) + "-" + Math.random().toString(36).slice(2, 7);
}

async function main() {
  console.log("Resetting DB…");
  await db.propertyView.deleteMany();
  await db.enquiry.deleteMany();
  await db.rating.deleteMany();
  await db.property.deleteMany();
  await db.agent.deleteMany();

  console.log(`Seeding ${AGENTS.length} agents…`);
  const agentIds: string[] = [];
  for (const a of AGENTS) {
    const created = await db.agent.create({
      data: {
        name: a.name,
        email: a.email,
        phone: a.phone,
        agency: a.agency,
        verified: a.verified,
        avatarUrl: localAvatar(a.name),
        bio: a.bio,
        rating: 4 + Math.random(),
        salesCount: Math.floor(20 + Math.random() * 200),
      },
    });
    agentIds.push(created.id);
  }

  console.log(`Seeding ${PROPERTIES.length} properties…`);
  for (const p of PROPERTIES) {
    const agentId = agentIds[p.agentIdx];
    await db.property.create({
      data: {
        slug: slugify(p.title),
        title: p.title,
        description: p.description,
        advertType: p.advertType,
        propertyType: p.propertyType,
        price: p.price,
        taxPercent: p.taxPercent,
        country: p.country,
        city: p.city,
        postalCode: p.postalCode,
        streetAddress: p.streetAddress,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        totalFloors: p.totalFloors,
        plotArea: p.plotArea,
        coverPhoto: p.coverPhoto,
        photo1: p.photo1 ?? null,
        photo2: p.photo2 ?? null,
        photo3: p.photo3 ?? null,
        photo4: p.photo4 ?? null,
        featured: p.featured ?? false,
        published: true,
        views: Math.floor(Math.random() * 1800),
        savedCount: Math.floor(Math.random() * 320),
        agentId,
      },
    });
  }

  console.log("Seeding ratings…");
  const allProps = await db.property.findMany({ select: { id: true, agentId: true } });
  for (let r = 0; r < 60; r++) {
    const prop = allProps[r % allProps.length];
    const c = RATING_COMMENTS[r % RATING_COMMENTS.length];
    await db.rating.create({
      data: {
        propertyId: prop.id,
        agentId: prop.agentId,
        reviewerName: c.name,
        reviewerEmail: c.name.toLowerCase().replace(/[^a-z]+/g, ".") + "@example.com",
        score: c.score,
        comment: c.comment,
      },
    });
  }

  // Recompute agent average rating from ratings
  for (const id of agentIds) {
    const agg = await db.rating.aggregate({ where: { agentId: id }, _avg: { score: true }, _count: { score: true } });
    await db.agent.update({
      where: { id },
      data: {
        rating: agg._avg.score ? Math.round(agg._avg.score * 10) / 10 : 0,
        salesCount: Math.floor(20 + Math.random() * 200),
      },
    });
  }

  const counts = {
    agents: await db.agent.count(),
    properties: await db.property.count(),
    ratings: await db.rating.count(),
  };
  console.log("Done:", counts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });

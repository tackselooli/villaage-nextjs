export type Locale = "en" | "fa";

export const LOCALES: Locale[] = ["en", "fa"];
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "villaage-locale";

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  fa: "فارسی",
};

export const LOCALE_SHORT: Record<Locale, string> = {
  en: "EN",
  fa: "فا",
};

type Dict = Record<string, string>;

export const dict: Record<Locale, Dict> = {
  en: {
    // nav
    "nav.explore": "Explore",
    "nav.agents": "Agents",
    "nav.saved": "Open saved board",
    "nav.theme.toggle": "Toggle theme",
    "nav.language": "Language",
    "nav.search.placeholder": "Search by city, address, keyword…",
    "nav.search.clear": "Clear search",

    // hero
    "hero.badge": "Hand-picked listings · updated daily",
    "hero.title.before": "Find your next home in",
    "hero.title.highlight": "Iran's most beautiful neighborhoods",
    "hero.subtitle":
      "From a villa in Lavasan to a heritage house in Yazd — we list properties the big portals miss. Built by people who actually live here, not a faceless algorithm.",
    "hero.search.placeholder": "Try “Lavasan”, “Jolfa”, “wind-catcher”…",
    "hero.search.button": "Search",
    "hero.browse": "Browse the feed",

    // stats
    "stats.listings": "active listings",
    "stats.cities": "cities covered",
    "stats.agents": "verified agents",
    "stats.owners": "families settled",

    // feed
    "feed.title.default": "Fresh on the feed",
    "feed.title.search": "Results for “{q}”",
    "feed.loading": "Loading curated listings…",
    "feed.count": "{n} {n, plural, one {property} other {properties}} · {type} · {category}",
    "feed.allTypes": "all types",
    "feed.allCategories": "all categories",
    "feed.footer": "Showing {n} curated listings · save your favourites and enquire directly with the agent.",

    // filters
    "filter.forSale": "For Sale",
    "filter.forRent": "For Rent",
    "filter.auction": "Auction",
    "filter.reset": "Reset",
    "filter.button": "Filters",
    "filter.title": "Refine results",
    "filter.listingType": "Listing type",
    "filter.propertyType": "Property type",
    "filter.priceRange": "Price range",
    "filter.bedrooms": "Bedrooms (min)",
    "filter.bathrooms": "Bathrooms (min)",
    "filter.city": "City",
    "filter.city.placeholder": "e.g. London, New York, Kyoto…",
    "filter.min": "Min",
    "filter.max": "Max",
    "filter.apply": "Show matching listings",
    "filter.noResults": "No properties match your filters.",
    "filter.noResultsHint": "Try widening the price range or clearing the search.",
    "filter.count": "{n}",

    // sort
    "sort.featured": "Featured",
    "sort.newest": "Newest",
    "sort.priceAsc": "Price ↑",
    "sort.priceDesc": "Price ↓",
    "sort.popular": "Most viewed",
    "sort.label": "Sort:",

    // property card
    "property.featured": "★ Featured",
    "property.tax": "+{n}% tax · incl. fees",
    "property.views": "views",
    "property.saves": "saves",

    // property type labels
    "ptype.House": "House",
    "ptype.Apartment": "Apartment",
    "ptype.Office": "Office",
    "ptype.Warehouse": "Warehouse",
    "ptype.Commercial": "Commercial",
    "ptype.Other": "Other",

    // detail dialog
    "detail.share": "Share",
    "detail.save": "Save",
    "detail.prevPhoto": "Previous photo",
    "detail.nextPhoto": "Next photo",
    "detail.photo": "Photo {n}",
    "detail.tabs.overview": "Overview",
    "detail.tabs.reviews": "Reviews",
    "detail.tabs.contact": "Enquire",
    "detail.spec.bedrooms": "Bedrooms",
    "detail.spec.bathrooms": "Bathrooms",
    "detail.spec.floors": "Floors",
    "detail.spec.plot": "Plot m²",
    "detail.tax": "+{n}% tax · final {price}",
    "detail.views": "{n} views",
    "detail.saves": "{n} saves",
    "detail.listed": "Listed {time}",
    "detail.reference": "Reference",
    "detail.country": "Country",
    "detail.city": "City",
    "detail.postal": "Postal code",
    "detail.street": "Street",
    "detail.listedAgo": "Listed",

    // reviews tab
    "reviews.count": "{n} reviews",
    "reviews.leaveTitle": "Leave a review",
    "reviews.name": "Your name",
    "reviews.email": "Email (optional)",
    "reviews.rating": "Your rating",
    "reviews.comment.placeholder": "Share your experience with this property or agent…",
    "reviews.submit": "Post review",
    "reviews.submitting": "Posting…",
    "reviews.empty": "No reviews yet — be the first to share your experience.",
    "reviews.rate": "Rate {n} of 5",

    // enquiry form
    "enquiry.name": "Full name",
    "enquiry.email": "Email",
    "enquiry.phone": "Phone",
    "enquiry.moveDate": "Move date",
    "enquiry.message": "Message",
    "enquiry.message.default": "Hi {name}, I'm interested in \"{title}\". Could you share more details?",
    "enquiry.send": "Send enquiry",
    "enquiry.sending": "Sending…",
    "enquiry.emailAgent": "Email agent",
    "enquiry.call": "Call",
    "enquiry.required": "{field} is required",

    // toasts
    "toast.enquirySent": "Enquiry sent. The agent will be in touch shortly.",
    "toast.enquiryFail": "Could not send enquiry. Please try again.",
    "toast.enquiryValidate": "Name, email and message are required.",
    "toast.reviewSent": "Thanks — your review is now live.",
    "toast.reviewFail": "Could not submit review. Try again.",
    "toast.reviewValidate": "Please add your name and a comment.",
    "toast.linkCopied": "Link copied to clipboard.",
    "toast.clearSaved": "All saved properties removed.",

    // saved board
    "saved.title": "Your saved board",
    "saved.clear": "Clear",
    "saved.empty.title": "Your board is empty.",
    "saved.empty.body": "Browse the feed and tap the heart to save properties here.",
    "saved.helper.empty": "Tap the heart on any pin to build your shortlist.",
    "saved.count": "{n} saved {n, plural, one {property} other {properties}} · stored locally on this device.",
    "saved.clearConfirm": "Remove all saved properties?",
    "saved.removeFromSaved": "Remove from saved",
    "saved.open": "Open {title}",

    // agents
    "agents.title": "Featured agents",
    "agents.subtitle": "Curated brokers across 25 cities. Tap an agent to see their portfolio.",
    "agents.listings": "{n} listings",

    // agent profile
    "agent.profile": "Agent profile",
    "agent.portfolio": "Portfolio",
    "agent.listings": "Listings",
    "agent.sales": "Sales",
    "agent.enquiries": "Enquiries",
    "agent.email": "Email",
    "agent.call": "Call",
    "agent.noListings": "No published listings yet.",

    // about section
    "about.title1": "Not another listing portal",
    "about.body1":
      "We started Villaage because the big real-estate sites felt like a phone book — endless identical cards, no soul. Every property here is published by a named agent who knows the neighborhood block by block. No spam listings, no fake photos.",
    "about.title2": "Save like you're on Pinterest",
    "about.body2":
      "Tap the heart on any pin to build a private board. Compare shortlisted properties side by side, share with your partner or your solicitor, and come back to them later — your board lives on this device, no account needed.",
    "about.title3": "Talk to a human, not a chatbot",
    "about.body3":
      "Every listing opens a direct line to the agent who listed it. No middlemen skimming a cut, no lead auctions — your message lands in the inbox of someone who can actually answer your questions and book a viewing.",

    // founder note
    "founder.tag": "A note from the founder",
    "founder.body":
      "I grew up watching my father tour families through houses in Tehran for sixteen years. He carried a leather notebook and remembered every family's story. Villaage is my attempt to put that kind of care online — not another faceless portal, but a place where each listing has a name behind it, and each enquiry reaches a person, not a queue. Thank you for being here.",
    "founder.name": "— The Villaage team, Tehran",

    // footer
    "footer.about":
      "A Pinterest-inspired marketplace for Iranian real estate — from heritage homes in Yazd to seaside villas on Kish. Built by people who live here.",
    "footer.exploreTitle": "Explore",
    "footer.allListings": "All listings",
    "footer.featured": "Featured",
    "footer.topAgents": "Top agents",
    "footer.aboutLink": "About",
    "footer.categoriesTitle": "Categories",
    "footer.vacationRentals": "Vacation rentals",
    "footer.commercial": "Commercial",
    "footer.newsletterTitle": "New listings every Friday",
    "footer.newsletterBody": "Properties in your saved cities, once a week. No spam, unsubscribe anytime.",
    "footer.email.placeholder": "you@email.com",
    "footer.join": "Join",
    "footer.copyright":
      "© {year} Villaage. Made with care in Tehran. Open source on GitHub.",

    // testimonials
    "testimonials.title": "What families say",
    "testimonials.subtitle": "Real words from real buyers and renters across Iran.",

    // common
    "common.remove": "Remove",
    "common.close": "Close",
    "common.imageError": "image unavailable",

    // per-month suffix
    "common.perMonth": "/mo",
  },

  fa: {
    // nav
    "nav.explore": "کاوش",
    "nav.agents": "مشاوران",
    "nav.saved": "باز کردن تخته ذخیره‌شده",
    "nav.theme.toggle": "تغییر تم",
    "nav.language": "زبان",
    "nav.search.placeholder": "جستجو بر اساس شهر، آدرس، کلمه کلیدی…",
    "nav.search.clear": "پاک کردن جستجو",

    // hero
    "hero.badge": "ملک‌های دست‌چین‌شده · به‌روزرسانی روزانه",
    "hero.title.before": "خانه بعدی‌تان را در",
    "hero.title.highlight": "زیباترین محله‌های ایران پیدا کنید",
    "hero.subtitle":
      "از ویلای لواسان تا خانه تاریخی یزد — ملک‌هایی را فهرست می‌کنیم که پورتال‌های بزرگ از قلم می‌اندازند. ساخته‌شده توسط آدم‌هایی که اینجا زندگی می‌کنند، نه یک الگوریتم بی‌چهره.",
    "hero.search.placeholder": "امتحان کنید «لواسان»، «جلفا»، «بادگیر»…",
    "hero.search.button": "جستجو",
    "hero.browse": "مرور فید",

    // stats
    "stats.listings": "ملک فعال",
    "stats.cities": "شهر تحت پوشش",
    "stats.agents": "مشاور تأیید‌شده",
    "stats.owners": "خانوار مستقر شده",

    // feed
    "feed.title.default": "تازه در فید",
    "feed.title.search": "نتایج برای «{q}»",
    "feed.loading": "در حال بارگذاری ملک‌های منتخب…",
    "feed.count": "{n} ملک · {type} · {category}",
    "feed.allTypes": "همه انواع",
    "feed.allCategories": "همه دسته‌ها",
    "feed.footer": "نمایش {n} ملک منتخب · موارد دلخواه را ذخیره کنید و مستقیماً با مشاور در ارتباط باشید.",

    // filters
    "filter.forSale": "برای فروش",
    "filter.forRent": "برای اجاره",
    "filter.auction": "مزایده",
    "filter.reset": "بازنشانی",
    "filter.button": "فیلترها",
    "filter.title": "پالایش نتایج",
    "filter.listingType": "نوع آگهی",
    "filter.propertyType": "نوع ملک",
    "filter.priceRange": "محدوده قیمت",
    "filter.bedrooms": "حداقل اتاق خواب",
    "filter.bathrooms": "حداقل حمام",
    "filter.city": "شهر",
    "filter.city.placeholder": "مثلاً لندن، نیویورک، کیوتو…",
    "filter.min": "کمینه",
    "filter.max": "بیشینه",
    "filter.apply": "نمایش ملک‌های مطابق",
    "filter.noResults": "هیچ ملکی با فیلترهای شما مطابقت ندارد.",
    "filter.noResultsHint": "محدوده قیمت را گسترده‌تر کنید یا جستجو را پاک کنید.",
    "filter.count": "{n}",

    // sort
    "sort.featured": "ویژه",
    "sort.newest": "جدیدترین",
    "sort.priceAsc": "قیمت ↑",
    "sort.priceDesc": "قیمت ↓",
    "sort.popular": "پربازدیدترین",
    "sort.label": "مرتب‌سازی:",

    // property card
    "property.featured": "★ ویژه",
    "property.tax": "+{n}% مالیات · شامل هزینه‌ها",
    "property.views": "بازدید",
    "property.saves": "ذخیره",

    // property type labels
    "ptype.House": "خانه",
    "ptype.Apartment": "آپارتمان",
    "ptype.Office": "دفتر",
    "ptype.Warehouse": "انبار",
    "ptype.Commercial": "تجاری",
    "ptype.Other": "سایر",

    // detail dialog
    "detail.share": "اشتراک‌گذاری",
    "detail.save": "ذخیره",
    "detail.prevPhoto": "عکس قبلی",
    "detail.nextPhoto": "عکس بعدی",
    "detail.photo": "عکس {n}",
    "detail.tabs.overview": "نمای کلی",
    "detail.tabs.reviews": "نظرات",
    "detail.tabs.contact": "استعلام",
    "detail.spec.bedrooms": "اتاق خواب",
    "detail.spec.bathrooms": "حمام",
    "detail.spec.floors": "طبقه",
    "detail.spec.plot": "مترمربع",
    "detail.tax": "+{n}% مالیات · نهایی {price}",
    "detail.views": "{n} بازدید",
    "detail.saves": "{n} ذخیره",
    "detail.listed": "ثبت‌شده {time}",
    "detail.reference": "کد مرجع",
    "detail.country": "کشور",
    "detail.city": "شهر",
    "detail.postal": "کد پستی",
    "detail.street": "خیابان",
    "detail.listedAgo": "ثبت‌شده",

    // reviews tab
    "reviews.count": "{n} نظر",
    "reviews.leaveTitle": "ثبت نظر",
    "reviews.name": "نام شما",
    "reviews.email": "ایمیل (اختیاری)",
    "reviews.rating": "امتیاز شما",
    "reviews.comment.placeholder": "تجربه خود را با این ملک یا مشاور به اشتراک بگذارید…",
    "reviews.submit": "ثبت نظر",
    "reviews.submitting": "در حال ثبت…",
    "reviews.empty": "هنوز نظری ثبت نشده — اولین نفر باشید.",
    "reviews.rate": "امتیاز {n} از ۵",

    // enquiry form
    "enquiry.name": "نام و نام خانوادگی",
    "enquiry.email": "ایمیل",
    "enquiry.phone": "تلفن",
    "enquiry.moveDate": "تاریخ نقل و انتقال",
    "enquiry.message": "پیام",
    "enquiry.message.default": "سلام {name}، من به «{title}» علاقه‌مندم. لطفاً جزئیات بیشتری به اشتراک بگذارید.",
    "enquiry.send": "ارسال استعلام",
    "enquiry.sending": "در حال ارسال…",
    "enquiry.emailAgent": "ایمیل به مشاور",
    "enquiry.call": "تماس",
    "enquiry.required": "{field} الزامی است",

    // toasts
    "toast.enquirySent": "استعلام ارسال شد. مشاور به‌زودی تماس خواهد گرفت.",
    "toast.enquiryFail": "ارسال استعلام ناموفق بود. دوباره تلاش کنید.",
    "toast.enquiryValidate": "نام، ایمیل و پیام الزامی است.",
    "toast.reviewSent": "ممنون — نظر شما ثبت شد.",
    "toast.reviewFail": "ثبت نظر ناموفق بود. دوباره تلاش کنید.",
    "toast.reviewValidate": "لطفاً نام و نظر خود را وارد کنید.",
    "toast.linkCopied": "لینک کپی شد.",
    "toast.clearSaved": "همه ملک‌های ذخیره‌شده حذف شد.",

    // saved board
    "saved.title": "تخته ذخیره‌شده شما",
    "saved.clear": "پاک کردن",
    "saved.empty.title": "تخته شما خالی است.",
    "saved.empty.body": "فید را مرور کنید و روی قلب ضربه بزنید تا ملک‌ها ذخیره شوند.",
    "saved.helper.empty": "برای ساخت فهرست کوتاه خود، روی قلب هر پین ضربه بزنید.",
    "saved.count": "{n} ملک ذخیره‌شده · روی این دستگاه ذخیره شده است.",
    "saved.clearConfirm": "همه ملک‌های ذخیره‌شده حذف شوند؟",
    "saved.removeFromSaved": "حذف از ذخیره‌شده‌ها",
    "saved.open": "باز کردن {title}",

    // agents
    "agents.title": "مشاوران برتر",
    "agents.subtitle": "مشاوران منتخب در ۲۵ شهر. برای دیدن نمونه‌کار، روی مشاور ضربه بزنید.",
    "agents.listings": "{n} ملک",

    // agent profile
    "agent.profile": "پروفایل مشاور",
    "agent.portfolio": "نمونه‌کار",
    "agent.listings": "ملک‌ها",
    "agent.sales": "فروش",
    "agent.enquiries": "استعلام‌ها",
    "agent.email": "ایمیل",
    "agent.call": "تماس",
    "agent.noListings": "هنوز ملکی منتشر نشده است.",

    // about section
    "about.title1": "یک پورتال آگهی دیگر نیست",
    "about.body1":
      "ویلج را شروع کردیم چون سایت‌های بزرگ املاک مثل دفترچه تلفن بودند — کارت‌های تکراری بی‌شمار، بدون روح. هر ملک اینجا توسط مشاور نام‌داری منتشر می‌شود که محله را کوچه‌به‌کوچه می‌شناسد. بدون آگهی اسپم، بدون عکس فیک.",
    "about.title2": "مثل پینترست ذخیره کنید",
    "about.body2":
      "روی قلب هر پین ضربه بزنید تا تخته خصوصی بسازید. ملک‌های منتخب را کنار هم مقایسه کنید، با شریک یا وکیل خود به اشتراک بگذارید و بعداً به آن‌ها برگردید — تخته شما روی همین دستگاه ذخیره می‌شود، بدون نیاز به حساب کاربری.",
    "about.title3": "با آدم حقیقی حرف بزنید، نه چت‌بات",
    "about.body3":
      "هر آگهی مستقیم به مشاور خودش متصل می‌شود. بدون واسطه، بدون مزایده سرنخ — پیام شما به صندوق ورودی کسی می‌رسد که واقعاً می‌تواند سؤال‌هایتان را جواب دهد و بازدید رزرو کند.",

    // founder note
    "founder.tag": "یادداشت بنیان‌گذار",
    "founder.body":
      "من بزرگ شدم و پدرم را دیدم که شانزده سال خانواده‌ها را در خانه‌های تهران می‌گرداند. او یک دفترچه چرمی همراه داشت و داستان هر خانواده را به خاطر می‌سپرد. ویلج تلاش من است تا آن مراقبت را آنلاین بیاورم — نه یک پورتال بی‌چهره دیگر، بلکه جایی که هر آگهی نامی پشت خود دارد و هر استعلام به یک آدم می‌رسد، نه به یک صف. ممنون که اینجا هستید.",
    "founder.name": "— تیم ویلج، تهران",

    // footer
    "footer.about":
      "بازارگاهی الهام‌گرفته از پینترست برای املاک ایران — از خانه‌های تاریخی یزد تا ویلاهای ساحلی کیش. ساخته‌شده توسط آدم‌هایی که اینجا زندگی می‌کنند.",
    "footer.exploreTitle": "کاوش",
    "footer.allListings": "همه ملک‌ها",
    "footer.featured": "ویژه",
    "footer.topAgents": "مشاوران برتر",
    "footer.aboutLink": "درباره",
    "footer.categoriesTitle": "دسته‌بندی‌ها",
    "footer.vacationRentals": "اجاره تعطیلات",
    "footer.commercial": "تجاری",
    "footer.newsletterTitle": "ملک‌های جدید هر جمعه",
    "footer.newsletterBody": "ملک‌های شهرهای ذخیره‌شده شما، هفته‌ای یک‌بار. بدون اسپم، لغو عضویت در هر زمان.",
    "footer.email.placeholder": "ایمیل شما",
    "footer.join": "عضویت",
    "footer.copyright":
      "© {year} ویلج. با مراقبت در تهران ساخته شده. متن‌باز در گیت‌هاب.",

    // testimonials
    "testimonials.title": "خانواده‌ها چه می‌گویند",
    "testimonials.subtitle": "نظرات واقعی خریداران و مستاجران از سراسر ایران.",

    // common
    "common.remove": "حذف",
    "common.close": "بستن",
    "common.imageError": "تصویر در دسترس نیست",

    // per-month suffix
    "common.perMonth": "/ماه",
  },
};

/** Tiny ICU-like translator. Supports {var} and {n, plural, one {..} other {..}}. */
export function translate(
  locale: Locale,
  key: string,
  params?: Record<string, string | number>
): string {
  let s = dict[locale]?.[key] ?? dict.en[key] ?? key;
  if (!params) return s;

  // Handle {n, plural, one {..} other {..}}
  s = s.replace(
    /\{(\w+),\s*plural,\s*one\s*\{([^}]*)\}\s*other\s*\{([^}]*)\}\}/g,
    (_m, name, one, other) => {
      const v = Number(params[name]);
      return v === 1 ? one : other;
    }
  );

  // Handle simple {var}
  s = s.replace(/\{(\w+)\}/g, (_m, name) => {
    const v = params[name];
    return v === undefined ? "" : String(v);
  });

  return s;
}

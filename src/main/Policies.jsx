import { useMemo, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import {
  AlertTriangle,
  BookMarked,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Gavel,
  Landmark,
  Mail,
  RotateCcw,
  Scale,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Users,
  WalletCards,
} from "lucide-react";
import { policySections } from "../data/policies";

const iconMap = {
  book: BookOpen,
  shield: ShieldCheck,
  users: Users,
  landmark: Landmark,
  wallet: WalletCards,
  return: RotateCcw,
  store: Store,
  buyer: ShoppingBag,
  scale: Scale,
};

function PolicyList({ items, tone = "default" }) {
  const isDanger = tone === "danger";

  return (
    <ul className="grid gap-3.5 sm:gap-4" aria-label="پالیسی نکات">
      {items.map((item) => (
        <li
          key={item}
          className={`flex items-start gap-3 rounded-2xl border px-4 py-3.5 sm:px-5 ${
            isDanger
              ? "border-red-100 bg-red-50/65"
              : "border-primary/10 bg-primary/[0.035]"
          }`}
        >
          <span
            className={`mt-2.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
              isDanger ? "bg-red-100 text-red-700" : "bg-primary/10 text-primary"
            }`}
          >
            {isDanger ? <AlertTriangle className="h-3 w-3" /> : <Check className="h-3 w-3" />}
          </span>
          <span className="urdu-regular text-[1.08rem] leading-[2.15] text-text-body sm:text-[1.16rem]">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ComparisonBlock({ rows }) {
  return (
    <div className="space-y-4">
      <div className="hidden overflow-hidden rounded-2xl border border-primary/15 lg:block">
        <div className="grid grid-cols-2 bg-primary text-white">
          <div className="urdu-kasheeda border-l border-white/15 px-6 py-4 text-center text-xl">
            روایتی ماڈل میں شرعی خامی
          </div>
          <div className="urdu-kasheeda px-6 py-4 text-center text-xl">
            شوقِ دیانت کا شرعی متبادل
          </div>
        </div>
        {rows.map((row, index) => (
          <div
            key={row.issue}
            className={`grid grid-cols-2 ${index % 2 === 0 ? "bg-white" : "bg-gold-light/35"}`}
          >
            <div className="urdu-regular border-l border-t border-primary/10 px-6 py-5 text-[1.02rem] leading-[2.05] text-text-body">
              {row.issue}
            </div>
            <div className="urdu-regular border-t border-primary/10 px-6 py-5 text-[1.02rem] leading-[2.05] text-text-body">
              {row.solution}
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:hidden">
        {rows.map((row, index) => (
          <article key={row.issue} className="overflow-hidden rounded-2xl border border-primary/15 bg-white">
            <div className="flex items-center gap-3 border-b border-primary/10 bg-primary-dark px-4 py-3 text-white">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold text-xs font-bold text-primary-dark">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="urdu-kasheeda text-lg">تقابلی جائزہ</span>
            </div>
            <div className="space-y-4 p-4">
              <div>
                <p className="urdu-kasheeda mb-1 text-lg text-red-800">روایتی خامی</p>
                <p className="urdu-regular text-[1.04rem] leading-[2.05] text-text-body">{row.issue}</p>
              </div>
              <div className="rounded-xl bg-primary-light/70 p-4">
                <p className="urdu-kasheeda mb-1 text-lg text-primary-dark">شرعی متبادل</p>
                <p className="urdu-regular text-[1.04rem] leading-[2.05] text-text-body">{row.solution}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function GuideBlock({ rows }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {rows.map((row, index) => (
        <article
          key={row.label}
          className="group rounded-2xl border border-primary/12 bg-white p-5 shadow-[0_14px_35px_rgba(8,76,58,0.06)] transition hover:-translate-y-0.5 hover:border-gold/50"
        >
          <div className="mb-3 flex items-center justify-between gap-4">
            <h4 className="urdu-kasheeda text-xl text-primary-dark">{row.label}</h4>
            <span className="text-xs font-bold tracking-[0.18em] text-gold">0{index + 1}</span>
          </div>
          <p className="urdu-regular text-[1.08rem] leading-[2.1] text-text-body">{row.text}</p>
        </article>
      ))}
    </div>
  );
}

function PolicyBlock({ block }) {
  if (block.type === "heading") {
    return (
      <div className="pt-2">
        <div className="mb-2 h-px w-full bg-gradient-to-l from-primary/30 via-gold/40 to-transparent" />
        <h3 className="urdu-kasheeda text-[1.55rem] leading-[1.8] text-primary-dark sm:text-[1.8rem]">
          {block.text}
        </h3>
      </div>
    );
  }

  if (block.type === "subheading") {
    return (
      <h4 className="urdu-kasheeda border-r-4 border-gold pr-4 text-[1.3rem] leading-[1.8] text-text-dark sm:text-[1.5rem]">
        {block.text}
      </h4>
    );
  }

  if (block.type === "paragraph") {
    return (
      <p className="urdu-regular text-[1.1rem] leading-[2.2] text-text-body sm:text-[1.2rem]">
        {block.text}
      </p>
    );
  }

  if (block.type === "bullets") {
    return <PolicyList items={block.items} tone={block.tone} />;
  }

  if (block.type === "notice") {
    return (
      <aside className="relative overflow-hidden rounded-2xl border border-gold/30 bg-gold-light/70 px-5 py-5 sm:px-6">
        <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-gold/10" />
        <div className="relative flex items-start gap-4">
          <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold text-primary-dark shadow-sm">
            <BookMarked className="h-5 w-5" />
          </div>
          <div>
            <h4 className="urdu-kasheeda text-xl text-primary-dark sm:text-2xl">{block.title}</h4>
            <p className="urdu-regular mt-1 text-[1.05rem] leading-[2.15] text-text-body sm:text-[1.15rem]">
              {block.text}
            </p>
          </div>
        </div>
      </aside>
    );
  }

  if (block.type === "comparison") {
    return <ComparisonBlock rows={block.rows} />;
  }

  if (block.type === "guide") {
    return <GuideBlock rows={block.rows} />;
  }

  if (block.type === "steps") {
    return (
      <ol className="space-y-4">
        {block.items.map((item, index) => (
          <li key={item} className="flex items-start gap-4 rounded-2xl border border-primary/10 bg-white p-4 sm:p-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-gold shadow-sm">
              {index + 1}
            </span>
            <span className="urdu-regular text-[1.08rem] leading-[2.1] text-text-body sm:text-[1.16rem]">
              {item}
            </span>
          </li>
        ))}
      </ol>
    );
  }

  if (block.type === "contacts") {
    return (
      <div className="grid gap-3 sm:grid-cols-3" dir="ltr">
        {block.items.map((item) => (
          <a
            key={item.email}
            href={`mailto:${item.email}`}
            className="group rounded-2xl border border-primary/10 bg-primary/[0.035] p-4 text-center transition hover:border-gold/50 hover:bg-gold-light/50"
          >
            <Mail className="mx-auto mb-2 h-5 w-5 text-primary" />
            <span className="urdu-regular block text-base leading-[1.8] text-text-body" dir="rtl">
              {item.label}
            </span>
            <span className="mt-1 block break-all text-xs font-semibold text-primary-dark">{item.email}</span>
          </a>
        ))}
      </div>
    );
  }

  return null;
}

function Policies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const bookRef = useRef(null);
  const requestedSection = searchParams.get("section");
  const activeIndex = useMemo(() => {
    const index = policySections.findIndex((section) => section.id === requestedSection);
    return index >= 0 ? index : 0;
  }, [requestedSection]);
  const activeSection = policySections[activeIndex];
  const ActiveIcon = iconMap[activeSection.icon];

  const openSection = (sectionId, shouldScroll = true) => {
    setSearchParams({ section: sectionId });
    if (shouldScroll) {
      window.setTimeout(() => {
        bookRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
    }
  };

  const goToSection = (direction) => {
    const nextIndex = Math.min(Math.max(activeIndex + direction, 0), policySections.length - 1);
    openSection(policySections[nextIndex].id);
  };

  return (
    <div className="min-h-screen bg-bg-custom pb-20">
      <section className="relative overflow-hidden bg-primary-dark text-white">
        <div className="absolute inset-0 islamic-pattern opacity-[0.08]" />
        <div className="absolute -left-24 top-8 h-72 w-72 rounded-full border border-gold/15" />
        <div className="absolute -left-8 top-24 h-44 w-44 rounded-full border border-gold/20" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-18 lg:grid-cols-[1fr_0.72fr] lg:px-8 lg:py-20">
          <div className="order-2 text-right lg:order-1" dir="rtl" lang="ur">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-white/5 px-4 py-2 text-gold">
              <Sparkles className="h-4 w-4" />
              <span className="urdu-regular text-base leading-none">اسلامی اصولوں کے مطابق تجارت</span>
            </div>
            <h1 className="urdu-kasheeda text-4xl leading-[1.55] text-white sm:text-5xl lg:text-6xl">
              شوقِ دیانت پالیسی بک
            </h1>
            <p className="urdu-regular mt-3 max-w-3xl text-xl leading-[2] text-white/80 sm:text-2xl">
              مکمل شرعی طرزِ عمل پر مبنی آن لائن مارکیٹ پلیس کے لیے واضح، منظم اور قابلِ فہم رہنما اصول
            </p>
            <div className="mt-7 flex flex-wrap justify-end gap-3">
              <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold tracking-wide text-white/80">
                Terms & Conditions
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold tracking-wide text-white/80">
                Buyer & Seller Policy
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold tracking-wide text-white/80">
                Returns & Refunds
              </span>
            </div>
          </div>

          <div className="order-1 mx-auto w-full max-w-sm lg:order-2">
            <div className="relative aspect-[4/3]">
              <div className="absolute inset-x-6 bottom-0 top-8 rotate-3 rounded-[2rem] border border-gold/25 bg-white/5" />
              <div className="absolute inset-x-3 bottom-4 top-4 -rotate-2 rounded-[2rem] border border-white/10 bg-white/5" />
              <div className="absolute inset-0 flex flex-col items-center justify-center rounded-[2rem] border border-gold/35 bg-gradient-to-br from-primary via-primary-dark to-[#05352a] px-8 text-center shadow-2xl shadow-black/20">
                <BookOpen className="mb-5 h-14 w-14 text-gold" strokeWidth={1.4} />
                <p className="urdu-kasheeda text-3xl text-white">دستورِ تجارت</p>
                <span className="my-4 h-px w-16 bg-gold/70" />
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-gold">Shoq-e-Deyanat</p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-white/50">Policy Edition • 2026</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mb-8 flex flex-col items-end justify-between gap-4 text-right sm:flex-row-reverse sm:items-center" dir="rtl">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">Table of Contents</p>
            <h2 className="urdu-kasheeda mt-1 text-3xl text-primary-dark sm:text-4xl">فہرستِ ابواب</h2>
            <p className="urdu-regular mt-1 text-lg text-muted-gray">کسی باب کو منتخب کریں — کتاب ایک وقت میں وہی حصہ کھولے گی۔</p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-primary/10 bg-white px-4 py-2 text-xs font-semibold text-muted-gray shadow-sm" dir="ltr">
            <BookMarked className="h-4 w-4 text-primary" />
            <span>9 curated chapters</span>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {policySections.map((section, index) => {
            const Icon = iconMap[section.icon];
            const isActive = index === activeIndex;

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => openSection(section.id)}
                aria-current={isActive ? "page" : undefined}
                className={`group relative overflow-hidden rounded-2xl border p-4 text-right transition-all duration-300 sm:p-5 ${
                  isActive
                    ? "border-primary bg-primary text-white shadow-lg shadow-primary/15"
                    : "border-border-custom bg-white hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-md"
                }`}
                dir="rtl"
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                      isActive ? "bg-white/10 text-gold" : "bg-primary-light text-primary"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block text-[10px] font-bold tracking-[0.2em] ${isActive ? "text-gold" : "text-muted-light"}`}>
                      باب {section.number}
                    </span>
                    <span className={`urdu-kasheeda mt-0.5 block text-xl ${isActive ? "text-white" : "text-text-dark"}`}>
                      {section.shortTitle}
                    </span>
                    <span className={`mt-0.5 block text-[10px] font-semibold tracking-wide ${isActive ? "text-white/55" : "text-muted-gray"}`} dir="ltr">
                      {section.englishTitle}
                    </span>
                  </span>
                </div>
                {isActive && <span className="absolute bottom-0 right-0 h-1 w-full bg-gold" />}
              </button>
            );
          })}
        </div>
      </section>

      <section ref={bookRef} className="scroll-mt-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex items-center justify-between gap-4 text-xs font-semibold text-muted-gray" dir="rtl">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-gold" />
              باب {activeSection.number} از ۰۹
            </span>
            <span className="hidden uppercase tracking-[0.18em] sm:block" dir="ltr">
              Shoq-e-Deyanat Policy Book
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.article
              key={activeSection.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="policy-book-page relative overflow-hidden rounded-[1.6rem] border border-[#e3dbc4] px-5 py-8 shadow-[0_25px_75px_rgba(55,45,25,0.13)] sm:px-10 sm:py-11 lg:px-16 lg:py-14"
              dir="rtl"
              lang="ur"
            >
              <div className="relative z-10">
                <header className="mb-8 border-b border-primary/10 pb-7 sm:mb-10 sm:pb-9">
                  <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary text-gold shadow-lg shadow-primary/15 sm:h-18 sm:w-18">
                      <ActiveIcon className="h-8 w-8" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold" dir="ltr">
                        Chapter {String(activeIndex + 1).padStart(2, "0")}
                      </p>
                      <h2 className="urdu-kasheeda mt-1 text-3xl leading-[1.6] text-primary-dark sm:text-4xl lg:text-[2.7rem]">
                        {activeSection.title}
                      </h2>
                      <p className="urdu-regular mt-1 max-w-3xl text-lg leading-[2] text-muted-gray sm:text-xl">
                        {activeSection.summary}
                      </p>
                    </div>
                  </div>
                </header>

                <div className="space-y-6 sm:space-y-7">
                  {activeSection.blocks.map((block, index) => (
                    <PolicyBlock key={`${activeSection.id}-${block.type}-${index}`} block={block} />
                  ))}
                </div>

                <footer className="mt-10 flex items-center justify-center border-t border-primary/10 pt-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-light" dir="ltr">
                  <span>Shoq-e-Deyanat • Shariah-first commerce</span>
                </footer>
              </div>
            </motion.article>
          </AnimatePresence>

          <nav className="mt-6 grid grid-cols-2 gap-3 sm:flex sm:items-center sm:justify-between" aria-label="Policy chapter navigation">
            <button
              type="button"
              onClick={() => goToSection(-1)}
              disabled={activeIndex === 0}
              className="flex min-h-14 items-center justify-center gap-2 rounded-xl border border-border-custom bg-white px-4 text-sm font-semibold text-text-dark transition hover:border-primary/30 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 sm:min-w-36"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <div className="col-span-2 order-first flex items-center justify-center gap-1.5 sm:order-none sm:col-span-1">
              {policySections.map((section, index) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => openSection(section.id)}
                  aria-label={`Open ${section.englishTitle}`}
                  className={`h-2.5 rounded-full transition-all ${index === activeIndex ? "w-8 bg-primary" : "w-2.5 bg-primary/20 hover:bg-gold"}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => goToSection(1)}
              disabled={activeIndex === policySections.length - 1}
              className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-40 sm:min-w-36"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>

          <aside className="mt-10 rounded-2xl border border-primary/10 bg-primary-light/45 px-5 py-5 text-center sm:px-8" dir="rtl">
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Gavel className="h-5 w-5 shrink-0 text-primary" />
              <p className="urdu-regular text-base leading-[1.9] text-text-body sm:text-lg">
                یہ demo policy framework ہے؛ حتمی نفاذ مستند شرعی نگران بورڈ اور قانونی مشیر کی منظوری سے مشروط ہے۔
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

export default Policies;

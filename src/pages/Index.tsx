import { useState } from "react";
import func2url from "../../backend/func2url.json";

const PIES = [
  { name: "Пирог с мясом", price: 980 },
  { name: "Пирог с мясом и капустой", price: 840 },
  { name: "Пирог с капустой", price: 740 },
  { name: "Пирог с картофелем и сыром", price: 830 },
  { name: "Пирог с сыром, творогом и зеленью", price: 950 },
  { name: "Пирог с картофелем и мясом", price: 820 },
  { name: "Пирог с курицей, грибами и сыром", price: 1000 },
  { name: "Пирог с курицей", price: 920 },
  { name: "Пирог с индейкой", price: 980 },
  { name: "Курник Царский (более 2 кг)", price: 2100 },
];

function OrderModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    pie: PIES[0].name,
    address: "",
    time: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(func2url["send-order"], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const selectedPie = PIES.find((p) => p.name === form.pie);

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.6)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          background: "var(--bg)",
          border: "var(--border)",
          boxShadow: "var(--shadow)",
          width: "100%",
          maxWidth: "520px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div style={{ padding: "24px 28px", borderBottom: "var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontFamily: "Unbounded, sans-serif", fontSize: "20px", fontWeight: 800, textTransform: "uppercase" }}>
            Оформить заказ
          </h2>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", fontWeight: 800, lineHeight: 1 }}
          >
            ✕
          </button>
        </div>

        {status === "success" ? (
          <div style={{ padding: "48px 28px", textAlign: "center" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🥧</div>
            <h3 style={{ fontFamily: "Unbounded, sans-serif", fontSize: "18px", fontWeight: 800, marginBottom: "12px" }}>
              Заказ принят!
            </h3>
            <p style={{ color: "#666", lineHeight: 1.6, marginBottom: "24px" }}>
              Мы получили вашу заявку и свяжемся с вами в ближайшее время.
            </p>
            <button className="btn-cta" onClick={onClose} style={{ background: "var(--primary)", color: "white" }}>
              Закрыть
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: "18px" }}>
            <div>
              <label style={{ display: "block", fontWeight: 800, fontSize: "13px", textTransform: "uppercase", marginBottom: "8px" }}>
                Ваше имя *
              </label>
              <input
                type="text"
                required
                placeholder="Как к вам обращаться?"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={{
                  width: "100%", padding: "12px 14px",
                  border: "var(--border)", background: "white",
                  fontSize: "15px", outline: "none",
                  fontFamily: "Montserrat, sans-serif",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontWeight: 800, fontSize: "13px", textTransform: "uppercase", marginBottom: "8px" }}>
                Телефон *
              </label>
              <input
                type="tel"
                required
                placeholder="+7 900 000-00-00"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                style={{
                  width: "100%", padding: "12px 14px",
                  border: "var(--border)", background: "white",
                  fontSize: "15px", outline: "none",
                  fontFamily: "Montserrat, sans-serif",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontWeight: 800, fontSize: "13px", textTransform: "uppercase", marginBottom: "8px" }}>
                Выберите пирог *
              </label>
              <select
                required
                value={form.pie}
                onChange={(e) => setForm({ ...form, pie: e.target.value })}
                style={{
                  width: "100%", padding: "12px 14px",
                  border: "var(--border)", background: "white",
                  fontSize: "15px", outline: "none",
                  fontFamily: "Montserrat, sans-serif",
                  cursor: "pointer",
                }}
              >
                {PIES.map((p) => (
                  <option key={p.name} value={p.name}>
                    {p.name} — {p.price} ₽/кг
                  </option>
                ))}
              </select>
              {selectedPie && (
                <p style={{ marginTop: "6px", fontSize: "13px", color: "var(--primary)", fontWeight: 700 }}>
                  Цена: {selectedPie.price} ₽ за 1 кг
                </p>
              )}
            </div>

            <div>
              <label style={{ display: "block", fontWeight: 800, fontSize: "13px", textTransform: "uppercase", marginBottom: "8px" }}>
                Адрес доставки *
              </label>
              <input
                type="text"
                required
                placeholder="Улица, дом, квартира"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                style={{
                  width: "100%", padding: "12px 14px",
                  border: "var(--border)", background: "white",
                  fontSize: "15px", outline: "none",
                  fontFamily: "Montserrat, sans-serif",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontWeight: 800, fontSize: "13px", textTransform: "uppercase", marginBottom: "8px" }}>
                Удобное время доставки *
              </label>
              <input
                type="text"
                required
                placeholder="Например: сегодня в 18:00"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                style={{
                  width: "100%", padding: "12px 14px",
                  border: "var(--border)", background: "white",
                  fontSize: "15px", outline: "none",
                  fontFamily: "Montserrat, sans-serif",
                }}
              />
            </div>

            {status === "error" && (
              <p style={{ color: "red", fontSize: "14px", fontWeight: 700 }}>
                Ошибка отправки. Позвоните нам: +7 919 876-03-23
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-cta"
              style={{ background: "var(--primary)", color: "white", width: "100%", padding: "16px", fontSize: "15px" }}
            >
              {status === "sending" ? "Отправляем..." : "Оформить заказ"}
            </button>

            <p style={{ fontSize: "12px", color: "#999", textAlign: "center" }}>
              Принимаем заказы с 9:00 до 21:00 · Доставка бесплатно
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default function Index() {
  const [showOrder, setShowOrder] = useState(false);

  return (
    <>
      <div className="grain-overlay" />
      {showOrder && <OrderModal onClose={() => setShowOrder(false)} />}

      <header className="header">
        <div className="logo">ПИРОГИ*ДОМА</div>
        <nav>
          <a href="#">Меню</a>
          <a href="#">О нас</a>
          <a href="#">Доставка</a>
          <a href="#">Контакты</a>
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <a href="tel:+79198760323" style={{ fontWeight: 800, fontSize: "14px", color: "var(--dark)", textDecoration: "none", display: "none" }} className="md:block">
            +7 919 876-03-23
          </a>
          <button className="btn-cta" onClick={() => setShowOrder(true)}>Заказать</button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">
              С ЛЮБОВЬЮ,
              <br />
              КАК <span>ДОМА</span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl mb-8 md:mb-10 leading-relaxed text-[#555]">
              Настоящие русские пироги по традиционным рецептам. Только проверенные продукты, только домашнее тесто — и доставка прямо к вашему столу в Белой Калитве.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
              <button className="btn-cta" style={{ background: "var(--primary)", color: "white" }} onClick={() => setShowOrder(true)}>
                Заказать пирог
              </button>
              <button className="btn-cta" style={{ background: "white" }}>
                Смотреть меню
              </button>
            </div>
          </div>
          <div className="hero-img" style={{ backgroundImage: `url("https://cdn.poehali.dev/projects/7cb98062-237f-42b8-b192-d2313c915aa0/files/5af83356-eb70-4bd6-9a4f-9d8f6374e0ff.jpg")` }}>
            <div className="sticker">
              СВЕЖАЯ
              <br />
              ВЫПЕЧКА
            </div>
            <div className="floating-tag hidden md:block" style={{ top: "20%", left: "10%" }}>
              #ДОМАШНЕЕ
            </div>
            <div className="floating-tag hidden md:block" style={{ bottom: "30%", right: "20%" }}>
              С ДУШОЙ
            </div>
          </div>
        </section>

        <div className="marquee">
          <div className="marquee-content">
            &nbsp; * ПИРОГИ ПО БАБУШКИНЫМ РЕЦЕПТАМ * БЕСПЛАТНАЯ ДОСТАВКА * ТОЛЬКО СВЕЖИЕ ПРОДУКТЫ * ЗАКАЗЫ С 9:00 ДО 21:00 * БЕЛАЯ КАЛИТВА *
            ПИРОГИ ПО БАБУШКИНЫМ РЕЦЕПТАМ * БЕСПЛАТНАЯ ДОСТАВКА * ТОЛЬКО СВЕЖИЕ ПРОДУКТЫ * ЗАКАЗЫ С 9:00 ДО 21:00 * БЕЛАЯ КАЛИТВА
          </div>
        </div>

        <section className="section-padding">
          <div className="section-header">
            <h2 className="section-title">НАШИ ПИРОГИ</h2>
            <p className="text-sm md:text-base" style={{ color: "var(--dark)", fontWeight: 700 }}>цена за 1 кг</p>
          </div>

          <div className="menu-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
            <div className="menu-card">
              <span className="menu-tag">Хит продаж</span>
              <img src="https://cdn.poehali.dev/projects/7cb98062-237f-42b8-b192-d2313c915aa0/files/922b6f0e-c2db-441f-9eeb-133cbd587df4.jpg" alt="Пирог с мясом" />
              <div className="menu-card-body">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <h3>С мясом</h3>
                  <span className="price">980 ₽</span>
                </div>
                <p style={{ fontSize: "14px", color: "#666" }}>Сочный фарш из говядины и свинины с луком в воздушном тесте.</p>
                <button className="btn-cta" style={{ marginTop: "12px", width: "100%", background: "var(--primary)", color: "white" }}
                  onClick={() => setShowOrder(true)}>Заказать</button>
              </div>
            </div>

            <div className="menu-card">
              <span className="menu-tag" style={{ background: "var(--secondary)" }}>Популярный</span>
              <img src="https://cdn.poehali.dev/projects/7cb98062-237f-42b8-b192-d2313c915aa0/files/047548f0-39e0-41c4-b4af-cd51e34d9fd6.jpg" alt="Пирог с мясом и капустой" />
              <div className="menu-card-body">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <h3>С мясом и капустой</h3>
                  <span className="price">840 ₽</span>
                </div>
                <p style={{ fontSize: "14px", color: "#666" }}>Нежная капуста с мясным фаршем — сытно и по-домашнему.</p>
                <button className="btn-cta" style={{ marginTop: "12px", width: "100%", background: "var(--primary)", color: "white" }}
                  onClick={() => setShowOrder(true)}>Заказать</button>
              </div>
            </div>

            <div className="menu-card">
              <span className="menu-tag" style={{ background: "var(--accent)", color: "var(--dark)" }}>Классика</span>
              <img src="https://cdn.poehali.dev/projects/7cb98062-237f-42b8-b192-d2313c915aa0/files/047548f0-39e0-41c4-b4af-cd51e34d9fd6.jpg" alt="Пирог с капустой" />
              <div className="menu-card-body">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <h3>С капустой</h3>
                  <span className="price">740 ₽</span>
                </div>
                <p style={{ fontSize: "14px", color: "#666" }}>Традиционный пирог с тушёной капустой по бабушкиному рецепту.</p>
                <button className="btn-cta" style={{ marginTop: "12px", width: "100%", background: "var(--primary)", color: "white" }}
                  onClick={() => setShowOrder(true)}>Заказать</button>
              </div>
            </div>

            <div className="menu-card">
              <img src="https://cdn.poehali.dev/projects/7cb98062-237f-42b8-b192-d2313c915aa0/files/5af83356-eb70-4bd6-9a4f-9d8f6374e0ff.jpg" alt="Пирог с картофелем и сыром" />
              <div className="menu-card-body">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <h3>С картофелем и сыром</h3>
                  <span className="price">830 ₽</span>
                </div>
                <p style={{ fontSize: "14px", color: "#666" }}>Нежное картофельное пюре с тянущимся сыром внутри.</p>
                <button className="btn-cta" style={{ marginTop: "12px", width: "100%", background: "var(--primary)", color: "white" }}
                  onClick={() => setShowOrder(true)}>Заказать</button>
              </div>
            </div>

            <div className="menu-card">
              <img src="https://cdn.poehali.dev/projects/7cb98062-237f-42b8-b192-d2313c915aa0/files/5af83356-eb70-4bd6-9a4f-9d8f6374e0ff.jpg" alt="Пирог с сыром, творогом и зеленью" />
              <div className="menu-card-body">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <h3>С сыром, творогом и зеленью</h3>
                  <span className="price">950 ₽</span>
                </div>
                <p style={{ fontSize: "14px", color: "#666" }}>Нежная начинка из творога и сыра с ароматной зеленью.</p>
                <button className="btn-cta" style={{ marginTop: "12px", width: "100%", background: "var(--primary)", color: "white" }}
                  onClick={() => setShowOrder(true)}>Заказать</button>
              </div>
            </div>

            <div className="menu-card">
              <img src="https://cdn.poehali.dev/projects/7cb98062-237f-42b8-b192-d2313c915aa0/files/922b6f0e-c2db-441f-9eeb-133cbd587df4.jpg" alt="Пирог с картофелем и мясом" />
              <div className="menu-card-body">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <h3>С картофелем и мясом</h3>
                  <span className="price">820 ₽</span>
                </div>
                <p style={{ fontSize: "14px", color: "#666" }}>Сытная начинка из картофеля и мяса — идеальный обед.</p>
                <button className="btn-cta" style={{ marginTop: "12px", width: "100%", background: "var(--primary)", color: "white" }}
                  onClick={() => setShowOrder(true)}>Заказать</button>
              </div>
            </div>

            <div className="menu-card">
              <span className="menu-tag" style={{ background: "var(--secondary)" }}>Любимый</span>
              <img src="https://cdn.poehali.dev/projects/7cb98062-237f-42b8-b192-d2313c915aa0/files/ea817a8c-bb95-4055-8f7e-045cc3070e98.jpg" alt="Пирог с курицей, грибами и сыром" />
              <div className="menu-card-body">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <h3>С курицей, грибами и сыром</h3>
                  <span className="price">1 000 ₽</span>
                </div>
                <p style={{ fontSize: "14px", color: "#666" }}>Сочное куриное филе с грибами и расплавленным сыром.</p>
                <button className="btn-cta" style={{ marginTop: "12px", width: "100%", background: "var(--primary)", color: "white" }}
                  onClick={() => setShowOrder(true)}>Заказать</button>
              </div>
            </div>

            <div className="menu-card">
              <img src="https://cdn.poehali.dev/projects/7cb98062-237f-42b8-b192-d2313c915aa0/files/ea817a8c-bb95-4055-8f7e-045cc3070e98.jpg" alt="Пирог с курицей" />
              <div className="menu-card-body">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <h3>С курицей</h3>
                  <span className="price">920 ₽</span>
                </div>
                <p style={{ fontSize: "14px", color: "#666" }}>Нежное куриное филе с луком в домашнем тесте.</p>
                <button className="btn-cta" style={{ marginTop: "12px", width: "100%", background: "var(--primary)", color: "white" }}
                  onClick={() => setShowOrder(true)}>Заказать</button>
              </div>
            </div>

            <div className="menu-card">
              <img src="https://cdn.poehali.dev/projects/7cb98062-237f-42b8-b192-d2313c915aa0/files/922b6f0e-c2db-441f-9eeb-133cbd587df4.jpg" alt="Пирог с индейкой" />
              <div className="menu-card-body">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <h3>С индейкой</h3>
                  <span className="price">980 ₽</span>
                </div>
                <p style={{ fontSize: "14px", color: "#666" }}>Диетическое филе индейки с ароматными специями.</p>
                <button className="btn-cta" style={{ marginTop: "12px", width: "100%", background: "var(--primary)", color: "white" }}
                  onClick={() => setShowOrder(true)}>Заказать</button>
              </div>
            </div>

            <div className="menu-card" style={{ borderColor: "var(--primary)" }}>
              <span className="menu-tag" style={{ background: "var(--primary)" }}>Особый</span>
              <img src="https://cdn.poehali.dev/projects/7cb98062-237f-42b8-b192-d2313c915aa0/files/5af83356-eb70-4bd6-9a4f-9d8f6374e0ff.jpg" alt="Курник Царский" />
              <div className="menu-card-body">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <h3>Курник Царский</h3>
                  <span className="price">2 100 ₽</span>
                </div>
                <p style={{ fontSize: "14px", color: "#666" }}>С рисом, курицей и грибами. Вес более 2 кг — настоящий праздничный пирог!</p>
                <button className="btn-cta" style={{ marginTop: "12px", width: "100%", background: "var(--primary)", color: "white" }}
                  onClick={() => setShowOrder(true)}>Заказать</button>
              </div>
            </div>
          </div>
        </section>

        <section className="retro-vibe">
          <div>
            <h2 className="vibe-title">ГОТОВИМ С ДУШОЙ.</h2>
            <p className="vibe-text">
              Каждый пирог — это произведение кулинарного искусства. Мы используем только качественные продукты от проверенных поставщиков и сохраняем секреты домашней выпечки, передающиеся из поколения в поколение. Привезём в удобное для вас время.
            </p>
            <button className="btn-cta" style={{ background: "var(--dark)", color: "white", borderColor: "white" }} onClick={() => setShowOrder(true)}>
              Заказать пирог
            </button>
          </div>
          <div className="vibe-img" style={{ backgroundImage: `url("https://cdn.poehali.dev/projects/7cb98062-237f-42b8-b192-d2313c915aa0/files/ea817a8c-bb95-4055-8f7e-045cc3070e98.jpg")` }}></div>
        </section>

        <section className="section-padding">
          <h2 className="section-title" style={{ marginBottom: "40px", textAlign: "center" }}>
            НАШИ ПИРОГИ В ДЕТАЛЯХ
          </h2>
          <div className="social-grid">
            <div className="social-item">
              <img src="https://cdn.poehali.dev/projects/7cb98062-237f-42b8-b192-d2313c915aa0/files/047548f0-39e0-41c4-b4af-cd51e34d9fd6.jpg" alt="Пирог с капустой" />
            </div>
            <div className="social-item">
              <img src="https://cdn.poehali.dev/projects/7cb98062-237f-42b8-b192-d2313c915aa0/files/5af83356-eb70-4bd6-9a4f-9d8f6374e0ff.jpg" alt="Пироги домашние" />
            </div>
            <div className="social-item">
              <img src="https://cdn.poehali.dev/projects/7cb98062-237f-42b8-b192-d2313c915aa0/files/922b6f0e-c2db-441f-9eeb-133cbd587df4.jpg" alt="Пирог с мясом" />
            </div>
            <div className="social-item">
              <img src="https://cdn.poehali.dev/projects/7cb98062-237f-42b8-b192-d2313c915aa0/files/3e4d1405-8c29-42c9-8ccf-3808223cd2f3.jpg" alt="Яблочный пирог" />
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div>
          <div className="footer-logo">ПИРОГИ*ДОМА</div>
          <p style={{ color: "#666", lineHeight: 1.6 }}>
            Настоящие русские пироги с доставкой по Белой Калитве. Готовим с любовью и заботой о каждом клиенте.
          </p>
        </div>
        <div className="footer-links">
          <h4>Навигация</h4>
          <ul>
            <li><a href="#" style={{ color: "inherit", textDecoration: "none" }}>Меню</a></li>
            <li><a href="#" style={{ color: "inherit", textDecoration: "none" }}>О нас</a></li>
            <li><a href="#" style={{ color: "inherit", textDecoration: "none" }}>Доставка</a></li>
            <li><a href="#" style={{ color: "inherit", textDecoration: "none" }}>Контакты</a></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Доставка</h4>
          <ul>
            <li>Бесплатная по г. Белая Калитва</li>
            <li>Привезём в удобное время</li>
            <li>Заказы принимаем с 9:00 до 21:00</li>
          </ul>
        </div>
        <div>
          <h4 style={{ marginBottom: "15px", fontWeight: 800, textTransform: "uppercase", fontSize: "14px" }}>
            Контакты
          </h4>
          <p style={{ color: "#666", fontSize: "14px", lineHeight: 2 }}>
            г. Белая Калитва
            <br />
            <a href="tel:+79198760323" style={{ color: "var(--primary)", fontWeight: 800, textDecoration: "none" }}>
              +7 919 876-03-23
            </a>
            <br />
            Заказы: с 9:00 до 21:00
            <br />
            Доставка: бесплатно
          </p>
        </div>
      </footer>
    </>
  );
}
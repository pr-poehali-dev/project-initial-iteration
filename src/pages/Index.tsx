export default function Index() {
  return (
    <>
      <div className="grain-overlay" />

      <header className="header">
        <div className="logo">ПИРОГИ*ДОМА</div>
        <nav>
          <a href="#">Меню</a>
          <a href="#">О нас</a>
          <a href="#">Доставка</a>
          <a href="#">Контакты</a>
        </nav>
        <button className="btn-cta">Заказать</button>
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
              <button className="btn-cta" style={{ background: "var(--primary)", color: "white" }}>
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
            <a
              href="#"
              className="text-sm md:text-base"
              style={{ color: "var(--dark)", fontWeight: 800, textTransform: "uppercase" }}
            >
              Всё меню
            </a>
          </div>

          <div className="menu-grid">
            {/* Item 1 */}
            <div className="menu-card">
              <span className="menu-tag">Хит продаж</span>
              <img
                src="https://cdn.poehali.dev/projects/7cb98062-237f-42b8-b192-d2313c915aa0/files/047548f0-39e0-41c4-b4af-cd51e34d9fd6.jpg"
                alt="Пирог с капустой и яйцом"
              />
              <div className="menu-card-body">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <h3>С капустой и яйцом</h3>
                  <span className="price">350 ₽</span>
                </div>
                <p style={{ fontSize: "14px", color: "#666" }}>
                  Нежное дрожжевое тесто, сочная капуста с варёными яйцами по бабушкиному рецепту.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="menu-card">
              <span className="menu-tag" style={{ background: "var(--secondary)" }}>
                Сытный
              </span>
              <img
                src="https://cdn.poehali.dev/projects/7cb98062-237f-42b8-b192-d2313c915aa0/files/922b6f0e-c2db-441f-9eeb-133cbd587df4.jpg"
                alt="Пирог с мясом"
              />
              <div className="menu-card-body">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <h3>С мясом</h3>
                  <span className="price">450 ₽</span>
                </div>
                <p style={{ fontSize: "14px", color: "#666" }}>Сочный фарш из говядины и свинины с луком, запечённый в воздушном тесте.</p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="menu-card">
              <span className="menu-tag" style={{ background: "var(--accent)", color: "var(--dark)" }}>
                Сладкий
              </span>
              <img
                src="https://cdn.poehali.dev/projects/7cb98062-237f-42b8-b192-d2313c915aa0/files/3e4d1405-8c29-42c9-8ccf-3808223cd2f3.jpg"
                alt="Пирог с яблоками"
              />
              <div className="menu-card-body">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <h3>С яблоками</h3>
                  <span className="price">320 ₽</span>
                </div>
                <p style={{ fontSize: "14px", color: "#666" }}>
                  Ароматные яблоки с корицей и сахаром в нежном тесте — к чаю и не только.
                </p>
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
            <button className="btn-cta" style={{ background: "var(--dark)", color: "white", borderColor: "white" }}>
              Наша история
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
              <img
                src="https://cdn.poehali.dev/projects/7cb98062-237f-42b8-b192-d2313c915aa0/files/047548f0-39e0-41c4-b4af-cd51e34d9fd6.jpg"
                alt="Пирог с капустой"
              />
            </div>
            <div className="social-item">
              <img
                src="https://cdn.poehali.dev/projects/7cb98062-237f-42b8-b192-d2313c915aa0/files/5af83356-eb70-4bd6-9a4f-9d8f6374e0ff.jpg"
                alt="Пироги домашние"
              />
            </div>
            <div className="social-item">
              <img
                src="https://cdn.poehali.dev/projects/7cb98062-237f-42b8-b192-d2313c915aa0/files/922b6f0e-c2db-441f-9eeb-133cbd587df4.jpg"
                alt="Пирог с мясом"
              />
            </div>
            <div className="social-item">
              <img
                src="https://cdn.poehali.dev/projects/7cb98062-237f-42b8-b192-d2313c915aa0/files/3e4d1405-8c29-42c9-8ccf-3808223cd2f3.jpg"
                alt="Яблочный пирог"
              />
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
            <li>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
                Меню
              </a>
            </li>
            <li>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
                О нас
              </a>
            </li>
            <li>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
                Доставка
              </a>
            </li>
            <li>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
                Контакты
              </a>
            </li>
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
            Заказы: с 9:00 до 21:00
            <br />
            Доставка: бесплатно
          </p>
        </div>
      </footer>
    </>
  );
}

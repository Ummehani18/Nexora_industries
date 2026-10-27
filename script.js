(() => {
  const config = window.NEXORA_CONFIG || {};
  const number = String(config.whatsappNumber || "971541636972").replace(/\D/g, "");
  const phone = config.phoneLink || "+971541636972";
  const phoneDisplay = config.phoneDisplay || "+971 54 163 6972";
  const email = config.email || "nexorainspect@gmail.com";
  const baseMessage = config.whatsappDefaultMessage || "Hello NEXORA, I would like to enquire about your services.";
  const waMessages = {
    quote: "Hello NEXORA, I would like to request a quotation for your services.",
    services: "Hello NEXORA, I would like to discuss my inspection, calibration or certification requirements.",
    accreditation: "Hello NEXORA, I would like to enquire about your accreditation, compliance scope and supporting documentation.",
    training: "Hello NEXORA, I would like to enquire about training courses, course dates, duration and completion certificates.",
    industries: "Hello NEXORA, I would like to discuss technical service requirements for my industry.",
    general: baseMessage
  };
  const waUrl = (kind) => `https://wa.me/${number}?text=${encodeURIComponent(waMessages[kind] || baseMessage)}`;

  document.querySelectorAll("[data-wa]").forEach(el => {
    el.href = waUrl(el.dataset.wa);
    el.target = "_blank";
    el.rel = "noopener noreferrer";
    if (el.tagName === "A") el.setAttribute("aria-label", (el.textContent.trim() || "Contact NEXORA") + " on WhatsApp");
  });
  document.querySelectorAll("[data-whatsapp-link]").forEach(el => {
    el.href = waUrl("general");
    el.target = "_blank";
    el.rel = "noopener noreferrer";
  });
  document.querySelectorAll("[data-phone-link]").forEach(el => el.href = `tel:${phone}`);
  document.querySelectorAll("[data-phone-display]").forEach(el => el.textContent = phoneDisplay);
  document.querySelectorAll("[data-email-link]").forEach(el => el.href = `mailto:${email}`);
  document.querySelectorAll("[data-email-display]").forEach(el => el.textContent = email);
  document.getElementById("year").textContent = new Date().getFullYear();

  // Splash screen: short branded intro, then reveal the site.
  document.body.classList.add("loading");
  const splash = document.getElementById("splash");
  const hideSplash = () => {
    splash.classList.add("hidden");
    document.body.classList.remove("loading");
    setTimeout(() => splash.remove(), 700);
  };
  window.addEventListener("load", () => setTimeout(hideSplash, 950), { once: true });
  setTimeout(hideSplash, 2500);

  // Mobile navigation.
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });
  mainNav.querySelectorAll("a[href^='#']").forEach(link => link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }));

  // Active navigation state follows the visible section.
  const navLinks = [...document.querySelectorAll(".nav-link[href^='#']")];
  const sections = navLinks.map(link => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach(link => {
        const active = link.getAttribute("href") === `#${visible.target.id}`;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-25% 0px -58% 0px", threshold: [0, .15, .35, .6] });
    sections.forEach(section => observer.observe(section));
  }
  const header = document.getElementById("siteHeader");
  const setHeader = () => header.classList.toggle("scrolled", window.scrollY > 12);
  setHeader();
  window.addEventListener("scroll", setHeader, { passive: true });

  // Lightweight English/Arabic translation for the static page.
  const translations = {
    ar: {
      topNote:"خدمات فنية مستقلة · الإمارات",claimOne:"خدمة تركّز على الجودة",claimTwo:"توثيق قابل للتتبع",
      navHome:"الرئيسية",navAbout:"من نحن",navServices:"الخدمات",navAccreditation:"الاعتماد",navTraining:"التدريب",navIndustries:"القطاعات",navContact:"اتصل بنا",navQuote:"اطلب عرض سعر ↗",
      heroEyebrow:"خدمات فنية مستقلة · الإمارات",heroTitle:"الثقة في كل <em>قياس.</em>",heroText:"خدمات التفتيش ومعايرة الأجهزة والتحقق من الجودة وفقاً للمعايير التي تعتمد عليها عملياتكم.",heroCta:"ناقش متطلباتك ↗",heroSecondary:"استكشف خدماتنا ↓",heroProofTitle:"الجودة أولاً. التفاصيل مهمة.",heroProofText:"دعم فني للعمليات الحيوية",heroImageTag:"هندسة يمكنك الوثوق بها",stampText:"الدقة<br>في التطبيق",heroBottom:"مصمم لتعزيز الثقة الصناعية",
      aboutLabel:"من نحن",aboutTitle:"الدقة ليست تفصيلاً.<br><em>بل هي الأساس.</em>",aboutTextOne:"تدعم خدمات نيكسورا للتفتيش والشهادات الشركات التي تحتاج إلى قياسات موثوقة ووثائق فنية واضحة والثقة في المعدات التي تستخدمها.",aboutTextTwo:"يجمع نهجنا بين العناية الفنية والخدمة العملية: فهم المتطلبات وتحديد النطاق وتنفيذ العمل بعناية وتوضيح النتائج.",aboutLink:"نهجنا في الجودة ↗",
      servicesLabel:"ماذا نقدم",servicesTitle:"خدمات فنية.<br><em>نتائج واضحة.</em>",servicesIntro:"دعم عملي للمعدات والأفراد والعمليات حيث تكون الدقة مهمة.",
      service1Title:"معايرة الأجهزة",service1Text:"معايرة العدادات وأجهزة القياس والمستشعرات ومعدات الاختبار وفق مراجع مناسبة.",service2Title:"التفتيش من طرف ثالث",service2Text:"تحقق مستقل من المعدات والمواد والعمليات لتلبية متطلبات الجودة والامتثال.",service3Title:"التحقق من الجودة",service3Text:"فحوصات للتحقق من بقاء الأجهزة ضمن حدود السماحية المحددة.",service4Title:"المعايرة في الموقع",service4Text:"خيارات معايرة في موقع العمل لتقليل التوقف والحاجة إلى نقل المعدات.",service5Title:"تدريب الأجهزة والشهادات",service5Text:"مسارات تعلم فنية في المعايرة وممارسات التفتيش وإدارة الأجهزة.",service6Title:"الحرارة والضغط",service6Text:"دعم لأجهزة قياس الحرارة والمزدوجات الحرارية ومقاييس الضغط وأجهزة الإرسال.",service7Title:"الشهادات وإمكانية التتبع",service7Text:"سجلات واضحة ووثائق تتبع لدعم التدقيق والعملاء وأنظمة الجودة.",service8Title:"الشهادات من طرف ثالث",service8Text:"تقييم مستقل للمطابقة والتحقق وفق النطاق المتفق عليه والمعايير المعمول بها.",servicesCtaTitle:"لست متأكداً من الخدمة المناسبة؟",servicesCtaText:"أخبرنا عن الجهاز أو الموقع أو متطلبات الامتثال.",servicesCtaButton:"ناقش جميع الخدمات عبر واتساب ↗",
      qualityLabel:"الاعتماد والامتثال",qualityTitle:"الأدلة مهمة.<br><em>والثقة تُكتسب.</em>",qualityText:"يجب دعم ادعاءات الجودة بوثائق سارية ونطاق مناسب وسجلات شفافة. يرجى التحقق من تفاصيل اعتماد نيكسورا وشهاداتها وفق الوثائق الرسمية قبل النشر.",qualityCta:"استفسر عن الاعتماد ↗",comp1Title:"اعتماد EIAC",comp1Text:"اعرض تفاصيل الاعتماد ونطاقه الحاليين بعد التحقق من الشهادة الرسمية فقط.",comp2Title:"اعتماد ENAS",comp2Text:"انشر الاعتراف والنطاق المعمول بهما فقط عند وجود وثائق سارية.",comp3Title:"ISO/IEC 17025",comp3Text:"يُشار إلى هذا المعيار فقط إذا كان لدى المؤسسة اعتماد مناسب للنطاق المذكور.",comp4Title:"التتبع والسجلات",comp4Text:"اشرح عملية الشهادات والقياس وحفظ السجلات بدقة وشفافية.",
      trainingLabel:"التدريب والشهادات",trainingTitle:"طوّروا القدرات.<br><em>وأثبتوا الكفاءة.</em>",trainingText:"تعلم فني منظم للفرق العاملة في معدات القياس وإجراءات التفتيش ووثائق الجودة. يجب تأكيد مدة البرامج وتوافر الشهادات مع نيكسورا قبل الحجز.",trainingCta:"استفسر عن التدريب ↗",trainingSecondary:"استكشف المسارات ↓",pillar1Title:"تدريب معايرة الأجهزة",pillar1Text:"طرق المعايرة والمراجع والتعامل مع المعدات والتوثيق للفرق الفنية.",pillar2Title:"التفتيش والتحقق",pillar2Text:"إجراءات التفتيش ومعايير القبول وإعداد التقارير.",pillar3Title:"التحضير للشهادات",pillar3Text:"الاستعداد لتقييم مطابقة الأجهزة والتقييم من طرف ثالث ومتطلبات التدقيق.",pillar4Title:"إدارة الأجهزة",pillar4Text:"جداول المعايرة وسجلات التتبع وأنظمة التذكير لضمان الجاهزية للتدقيق.",
      pathwayLabel:"المسارات التدريبية",pathwayTitle:"مسار واضح من التعلم<br>إلى <em>التطبيق العملي.</em>",pathwayText:"مدد إرشادية من مخطط البرنامج المقترح. يرجى تأكيد توفر الدورات وطريقة تقديمها وشروط الشهادات مع العميل.",providedLabel:"ما الذي يتضمنه البرنامج",course1Title:"فني معايرة الأجهزة",course1Text:"طرق المعايرة والمراجع والتعامل مع الأجهزة وتوثيق الشهادات.",course1Provided:"تمارين عملية · نظرة على الطرق · سجل إتمام",course2Title:"أخصائي التفتيش والتحقق",course2Text:"معايير القبول وإجراءات التفتيش والتقارير للتحقق من المعدات.",course2Provided:"سير التفتيش · ممارسة التقارير · سجل إتمام",course3Title:"مدقق شهادات الطرف الثالث",course3Text:"مبادئ تقييم المطابقة وفحص الأجهزة وإعداد تقارير التدقيق.",course3Provided:"مفاهيم التقييم · هيكل التقرير · سجل إتمام",course4Title:"عدم اليقين في القياس والتتبع",course4Text:"فهم عدم اليقين في القياس وربط النتائج بالمراجع القابلة للتتبع.",course4Provided:"المفاهيم الأساسية · أمثلة للسجلات · سجل إتمام",course5Title:"إدارة الأجهزة وأنظمة التذكير",course5Text:"إنشاء جداول المعايرة وسجلات التتبع وإجراءات التذكير.",course5Provided:"تخطيط الجداول · آلية التذكير · سجل إتمام",course6Title:"أفضل ممارسات المعايرة الميدانية",course6Text:"إجراءات العمل الميداني والمراجع المحمولة والسلامة والتقارير.",course6Provided:"سير العمل الميداني · اعتبارات السلامة · سجل إتمام",trainingCtaTitle:"درّب فريقك مع نيكسورا",trainingCtaText:"استفسر عن مواعيد الدورات وتقديمها في موقعك والمحتوى المخصص ووثائق الإتمام.",trainingCtaButton:"استفسر عن الدورات ↗",
      industriesLabel:"القطاعات التي ندعمها",industriesTitle:"ثقة فنية<br>حيث <em>تكون مهمة.</em>",industriesText:"يمكن لخدماتنا دعم البيئات الصناعية التي تتطلب جودة القياس وسجلات التفتيش ومعدات موثوقة. يرجى تأكيد القطاعات ونطاق الخدمات المناسب لنيكسورا قبل النشر.",industriesCta:"ناقش احتياجات قطاعك ↗",industry1:"النفط والغاز والطاقة",industry2:"الإنشاءات والبنية التحتية",industry3:"التصنيع والهندسة",industry4:"المرافق والخدمات",industry5:"الخدمات البحرية والصناعية",
      contactLabel:"تواصل مع نيكسورا",contactTitle:"تحدث إلى فريق التفتيش<br>والمعايرة.",contactIntro:"أخبرنا بما تحتاج إلى فحصه أو معايرته أو توثيقه. اختر وسيلة التواصل المناسبة لك.",phoneLabel:"الهاتف",phoneHint:"اضغط للاتصال بنيكسورا",whatsappHint:"أرسل استفسارك مباشرة عبر المحادثة",emailLabel:"البريد الإلكتروني",emailHint:"أرسل متطلباتك بالبريد الإلكتروني",officeLabel:"المكتب",officeAddress:"شارع صلاح الدين، المطينة، ديرة، دبي، الإمارات",officeHint:"يرجى تأكيد العنوان الدقيق قبل النشر",hoursLabel:"ساعات العمل",hoursValue:"الاثنين – السبت · 8:00 صباحاً – 6:00 مساءً",hoursSunday:"الأحد: مغلق (يرجى التأكيد مع العميل)",mapLabel:"اعثر علينا في دبي",mapTitle:"نيكسورا · الإمارات",mapOpen:"افتح الخرائط ↗",mapFoot:"شارع صلاح الدين · دبي، الإمارات",directions:"احصل على الاتجاهات ↗",contactBandTitle:"الدقة من أجل غد أكثر أماناً.",contactBandText:"التفتيش · المعايرة · الشهادات · التدريب الفني",contactBandCta:"ابدأ استفسار واتساب ↗",footerTagline:"الدقة من أجل غد أكثر أماناً.",footerExplore:"استكشف",footerContact:"التواصل",footerNeed:"هل تحتاج إلى دعم فني؟",footerSupportText:"أخبرنا عن متطلبات المعايرة أو التفتيش أو الشهادات.",footerCta:"اطلب عرض سعر ↗",footerDisclaimer:"يرجى التحقق من بيانات الشركة وادعاءات الاعتماد قبل النشر.",backTop:"العودة للأعلى ↑",footerMap:"الموقع / الاتجاهات ↗"
    }
  };
  const languageToggle = document.getElementById("languageToggle");
  let currentLanguage = "en";
  const originalText = new Map();
  document.querySelectorAll("[data-i18n]").forEach(el => originalText.set(el, el.innerHTML));
  languageToggle.addEventListener("click", () => {
    currentLanguage = currentLanguage === "en" ? "ar" : "en";
    const isArabic = currentLanguage === "ar";
    document.documentElement.lang = isArabic ? "ar" : "en";
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.body.classList.toggle("arabic", isArabic);
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      if (isArabic && translations.ar[key]) el.innerHTML = translations.ar[key];
      else el.innerHTML = originalText.get(el) || el.innerHTML;
    });
    languageToggle.textContent = isArabic ? "English" : "عربي";
    languageToggle.setAttribute("aria-label", isArabic ? "Switch to English" : "Switch to Arabic");
  });
})();
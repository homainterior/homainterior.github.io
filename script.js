/* ==========================================================================
   HOMA INTERIOR — Interactive Behaviors
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header Scroll State
  const header = document.getElementById('siteHeader');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });

  // 2. Mobile Drawer Navigation
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const toggleMenu = (forceClose = false) => {
    const isOpen = forceClose ? false : !mobileDrawer.classList.contains('open');
    mobileDrawer.classList.toggle('open', isOpen);
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    mobileDrawer.setAttribute('aria-hidden', String(!isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  menuToggle.addEventListener('click', () => toggleMenu());
  mobileLinks.forEach((link) => link.addEventListener('click', () => toggleMenu(true)));

  // 3. Scroll Reveal Observer
  const revealItems = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
  );
  revealItems.forEach((el) => revealObserver.observe(el));

  // 4. Project Category Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      filterBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      projectCards.forEach((card) => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !match);
      });
    });
  });

  // 5. Project Detail Modal
  const projectsData = [
    {
      title: 'The Horizon Penthouse',
      category: 'Căn hộ Penthouse • Contemporary Minimalist',
      image: 'assets/hero-living.jpg',
      desc: 'Không gian phòng khách mở ngập tràn ánh sáng tự nhiên với hệ rèm linen mỏng, sofa vải bouclé dáng cong mềm mại, bàn trà đá travertine nguyên khối và mảng tường gỗ óc chó ấm áp.',
      specs: [
        { label: 'Diện tích', value: '165 m²' },
        { label: 'Phong cách', value: 'Warm Minimalist' },
        { label: 'Hạng mục', value: 'Thiết kế & Thi công trọn gói' },
        { label: 'Thời gian', value: '45 ngày' }
      ]
    },
    {
      title: 'Solstice Garden Villa',
      category: 'Biệt thự • Modern Luxury',
      image: 'assets/project-kitchen.jpg',
      desc: 'Khu vực bếp và phòng ăn trung tâm của biệt thự vườn, nổi bật với đảo bếp đá cẩm thạch mài mờ, hệ tủ gỗ sồi soi rãnh tinh xảo và đèn thả đồng ánh vàng ấm cúng.',
      specs: [
        { label: 'Diện tích', value: '280 m²' },
        { label: 'Phong cách', value: 'Modern Luxury' },
        { label: 'Hạng mục', value: 'Thiết kế & Thi công trọn gói' },
        { label: 'Thời gian', value: '75 ngày' }
      ]
    },
    {
      title: 'Serenity Japandi Suite',
      category: 'Căn hộ Cao cấp • Japandi',
      image: 'assets/project-bedroom.jpg',
      desc: 'Phòng ngủ Master mang tinh thần thiền định nhẹ nhàng với giường gỗ sồi thấp, tường sơn hiệu ứng limewash thủ công và ánh sáng sớm lọc qua hệ lam gỗ tự nhiên.',
      specs: [
        { label: 'Diện tích', value: '110 m²' },
        { label: 'Phong cách', value: 'Japandi Contemporary' },
        { label: 'Hạng mục', value: 'Thiết kế & Sản xuất đồ gỗ' },
        { label: 'Thời gian', value: '35 ngày' }
      ]
    },
    {
      title: 'Lumière Townhouse',
      category: 'Nhà phố • Indochine Minimalist',
      image: 'assets/project-villa.jpg',
      desc: 'Giải pháp thông tầng giàu tính điêu khắc giúp đưa ánh sáng tự nhiên vào sâu trong nhà phố, kết hợp cầu thang uốn lượn mềm mại và mảng xanh nội thất đầy sức sống.',
      specs: [
        { label: 'Diện tích', value: '220 m²' },
        { label: 'Phong cách', value: 'Đương đại tối giản' },
        { label: 'Hạng mục', value: 'Cải tạo & Thi công nội thất' },
        { label: 'Thời gian', value: '60 ngày' }
      ]
    }
  ];

  const modal = document.getElementById('projectModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalClose = document.getElementById('modalClose');
  const modalImage = document.getElementById('modalImage');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalSpecs = document.getElementById('modalSpecs');
  const modalConsultBtn = document.getElementById('modalConsultBtn');
  const clientNote = document.getElementById('clientNote');

  const openModal = (index) => {
    const item = projectsData[index];
    if (!item) return;

    modalImage.src = item.image;
    modalImage.alt = item.title;
    modalCategory.textContent = item.category;
    modalTitle.textContent = item.title;
    modalDesc.textContent = item.desc;
    modalSpecs.innerHTML = item.specs
      .map((s) => `<div><span>${s.label}</span><strong>${s.value}</strong></div>`)
      .join('');

    modalConsultBtn.onclick = () => {
      closeModal();
      if (clientNote) {
        clientNote.value = `Tôi quan tâm đến mẫu thiết kế tương tự dự án "${item.title}".`;
      }
    };

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  projectCards.forEach((card) => {
    card.addEventListener('click', () => openModal(Number(card.dataset.projectId)));
  });

  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  // 6. Interactive Cost Estimator
  const estType = document.getElementById('estType');
  const estArea = document.getElementById('estArea');
  const estAreaLabel = document.getElementById('estAreaLabel');
  const pkgBtns = document.querySelectorAll('.pkg-btn');
  const designCostEl = document.getElementById('designCost');
  const buildCostEl = document.getElementById('buildCost');

  let selectedPkg = 'premium';

  const rates = {
    design: {
      apartment: [0.22, 0.28],
      townhouse: [0.25, 0.32],
      villa: [0.3, 0.4],
      commercial: [0.25, 0.35]
    },
    build: {
      standard: [2.8, 3.5],
      premium: [4.0, 5.2],
      luxury: [6.0, 8.5]
    }
  };

  const formatVndMillions = (minM, maxM) => {
    const fmt = (val) => {
      if (val >= 1000) {
        return `${(val / 1000).toFixed(2).replace('.', ',')} tỷ`;
      }
      return `${Math.round(val).toLocaleString('vi-VN')} triệu`;
    };
    return `${fmt(minM)} – ${fmt(maxM)} VNĐ`;
  };

  const updateEstimate = () => {
    const area = Number(estArea.value);
    const type = estType.value;
    estAreaLabel.textContent = `${area} m²`;

    const [dMin, dMax] = rates.design[type];
    const [bMin, bMax] = rates.build[selectedPkg];

    designCostEl.textContent = formatVndMillions(area * dMin, area * dMax);
    buildCostEl.textContent = formatVndMillions(area * bMin, area * bMax);
  };

  estType.addEventListener('change', updateEstimate);
  estArea.addEventListener('input', updateEstimate);
  pkgBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      pkgBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      selectedPkg = btn.dataset.pkg;
      updateEstimate();
    });
  });
  updateEstimate();

  // 7. Consultation Form Submission (Prototype Feedback)
  const consultForm = document.getElementById('consultForm');
  const formStatus = document.getElementById('formStatus');

  consultForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('clientName').value.trim();
    const phone = document.getElementById('clientPhone').value.trim();

    if (!name || !phone) {
      formStatus.className = 'form-status error';
      formStatus.textContent = 'Vui lòng nhập đầy đủ Họ tên và Số điện thoại để HOMA Interior liên hệ lại nhé.';
      return;
    }

    formStatus.className = 'form-status success';
    formStatus.textContent = `Cảm ơn ${name}! Yêu cầu tư vấn đã được ghi nhận (bản mẫu). Bạn cũng có thể nhắn trực tiếp qua Fanpage HOMA Interior để được phản hồi ngay.`;
    consultForm.reset();
  });
});

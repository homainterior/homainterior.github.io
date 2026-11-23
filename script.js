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

  // 5. Project Detail Modal (Real HOMA Interior Projects with Multi-Photo Gallery)
  const projectsData = [
    {
      title: 'Biệt thự Ngọc Trai – Vinhomes Ocean Park',
      category: 'Biệt thự • Indochine Luxury',
      images: [
        'assets/project-ngoctrai.jpg',
        'assets/project-ngoctrai-2.jpg',
        'assets/project-ngoctrai-3.jpg',
        'assets/project-ngoctrai-4.jpg'
      ],
      desc: 'Công trình biệt thự khu Ngọc Trai (Vinhomes Ocean Park) mang đậm tinh thần Đông Dương đương đại. HOMA Interior kết hợp khéo léo tranh hoa sen vẽ tay thủ công, nền gạch bông nghệ thuật, hệ tủ bếp gỗ tối màu phối mây mắt cáo và gạch vảy cá xanh ngọc tạo nên không gian sang trọng đầy hoài niệm.',
      specs: [
        { label: 'Địa điểm', value: 'Vinhomes Ocean Park, Hà Nội' },
        { label: 'Phong cách', value: 'Indochine Luxury' },
        { label: 'Hạng mục', value: 'Thiết kế & Thi công trọn gói' },
        { label: 'Vật liệu chính', value: 'Gỗ tự nhiên, mây đan, đá Marble' }
      ]
    },
    {
      title: 'Biệt thự Phố Mr. Tùng – Bắc Giang',
      category: 'Nhà phố • Modern Luxury',
      images: [
        'assets/project-bacgiang.jpg',
        'assets/project-bacgiang-2.jpg',
        'assets/project-bacgiang-3.jpg',
        'assets/project-bacgiang-4.jpg'
      ],
      desc: 'Không gian phòng khách – bếp bề thế khẳng định vị thế gia chủ. Điểm nhấn nằm ở trần kính đen phản chiếu mở rộng chiều cao, đèn chùm vòng đồng nghệ thuật, vách đá tự nhiên kết hợp lò sưởi trang trí và hệ tủ trưng bày hắt sáng LED ấm cúng.',
      specs: [
        { label: 'Địa điểm', value: 'TP. Bắc Giang' },
        { label: 'Phong cách', value: 'Modern Luxury' },
        { label: 'Hạng mục', value: 'Thiết kế & Thi công trọn gói' },
        { label: 'Vật liệu chính', value: 'Đá tự nhiên, gỗ sồi tối, inox mạ PVD' }
      ]
    },
    {
      title: 'Biệt thự VSIP – Bắc Ninh',
      category: 'Biệt thự • Contemporary Luxury',
      images: [
        'assets/project-vsip.jpg',
        'assets/project-vsip-2.jpg',
        'assets/project-vsip-3.jpg',
        'assets/project-vsip-4.jpg'
      ],
      desc: 'Phòng ngủ Master chuẩn phong cách nghỉ dưỡng 5 sao với vách đầu giường bọc da tông champagne tinh tế, hệ tủ áo cánh kính khung nhôm đồng tích hợp đèn cảm biến, bàn trang điểm đường cong mềm mại và cửa kính lớn đón trọn ánh sáng ban mai.',
      specs: [
        { label: 'Địa điểm', value: 'VSIP Từ Sơn, Bắc Ninh' },
        { label: 'Phong cách', value: 'Contemporary Luxury' },
        { label: 'Hạng mục', value: 'Thiết kế & Sản xuất nội thất' },
        { label: 'Vật liệu chính', value: 'Da Microfiber, kính trà, gỗ An Cường' }
      ]
    },
    {
      title: 'Căn hộ Vinhomes Smart City',
      category: 'Chung cư • Modern Minimalist',
      images: [
        'assets/project-smartcity.jpg',
        'assets/project-smartcity-2.jpg',
        'assets/project-smartcity-3.jpg',
        'assets/project-smartcity-4.jpg'
      ],
      desc: 'Giải pháp tối ưu diện tích thông minh cho căn hộ chung cư hiện đại: không gian khách – ăn – bếp liên thông liền mạch, tông màu trung tính nhẹ nhàng kết hợp sàn gỗ vân ấm và hệ tủ giày – tủ bếp kịch trần gọn gàng tuyệt đối.',
      specs: [
        { label: 'Địa điểm', value: 'Vinhomes Smart City, Hà Nội' },
        { label: 'Phong cách', value: 'Modern Minimalist' },
        { label: 'Hạng mục', value: 'Thiết kế & Thi công chìa khóa trao tay' },
        { label: 'Vật liệu chính', value: 'MDF chống ẩm An Cường, đá thạch anh' }
      ]
    },
    {
      title: 'Căn hộ CT2 – Nguyễn Chánh',
      category: 'Chung cư • Warm Contemporary',
      images: [
        'assets/project-ct2.jpg',
        'assets/project-ct2-2.jpg',
        'assets/project-ct2-3.jpg',
        'assets/project-ct2-4.jpg'
      ],
      desc: 'Không gian sống ấm cúng dành cho gia đình đa thế hệ tại khu vực Cầu Giấy. HOMA Interior sử dụng gam gỗ nâu óc chó sang trọng làm chủ đạo, cân bằng bằng mảng tường sáng và điểm nhấn gương tròn phát sáng trung tâm khu vực bàn ăn.',
      specs: [
        { label: 'Địa điểm', value: 'CT2 Nguyễn Chánh, Cầu Giấy, Hà Nội' },
        { label: 'Phong cách', value: 'Warm Contemporary' },
        { label: 'Hạng mục', value: 'Thiết kế & Thi công nội thất' },
        { label: 'Vật liệu chính', value: 'Gỗ óc chó, phào chỉ tinh giản' }
      ]
    },
    {
      title: 'Văn phòng Asilla – Duy Tân',
      category: 'Văn phòng • Modern Tech Office',
      images: [
        'assets/project-asilla.jpg',
        'assets/project-asilla-2.jpg',
        'assets/project-asilla-3.jpg',
        'assets/project-asilla-4.jpg'
      ],
      desc: 'Thiết kế không gian làm việc sáng tạo cho doanh nghiệp công nghệ Nhật Bản tại phố Duy Tân. Bố cục mở linh hoạt giúp tăng khả năng kết nối đội ngũ, kết hợp hệ đèn tuyến tính chống chói, bồn cây xanh nội thất và các phòng họp kính cách âm chuyên nghiệp.',
      specs: [
        { label: 'Địa điểm', value: 'Phố Duy Tân, Cầu Giấy, Hà Nội' },
        { label: 'Phong cách', value: 'Modern Tech Office' },
        { label: 'Hạng mục', value: 'Thiết kế & Thi công văn phòng trọn gói' },
        { label: 'Vật liệu chính', value: 'Gỗ công nghiệp, vách kính cường lực, thảm tấm' }
      ]
    }
  ];

  const modal = document.getElementById('projectModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalClose = document.getElementById('modalClose');
  const modalImage = document.getElementById('modalImage');
  const modalThumbs = document.getElementById('modalThumbs');
  const galleryPrev = document.getElementById('galleryPrev');
  const galleryNext = document.getElementById('galleryNext');
  const galleryCounter = document.getElementById('galleryCounter');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalSpecs = document.getElementById('modalSpecs');
  const modalConsultBtn = document.getElementById('modalConsultBtn');
  const clientNote = document.getElementById('clientNote');

  let currentImages = [];
  let currentImageIdx = 0;

  const renderGallerySlide = (idx) => {
    if (!currentImages.length) return;
    currentImageIdx = (idx + currentImages.length) % currentImages.length;
    modalImage.src = currentImages[currentImageIdx];
    galleryCounter.textContent = `${currentImageIdx + 1} / ${currentImages.length}`;

    modalThumbs.querySelectorAll('.modal-thumb-btn').forEach((btn, i) => {
      btn.classList.toggle('active', i === currentImageIdx);
      btn.setAttribute('aria-selected', String(i === currentImageIdx));
    });
  };

  const openModal = (index) => {
    const item = projectsData[index];
    if (!item) return;

    currentImages = item.images || [];
    currentImageIdx = 0;

    modalImage.alt = item.title;
    modalCategory.textContent = item.category;
    modalTitle.textContent = item.title;
    modalDesc.textContent = item.desc;
    modalSpecs.innerHTML = item.specs
      .map((s) => `<div><span>${s.label}</span><strong>${s.value}</strong></div>`)
      .join('');

    modalThumbs.innerHTML = currentImages
      .map(
        (src, i) => `
          <button type="button" class="modal-thumb-btn${i === 0 ? ' active' : ''}" data-slide="${i}" aria-label="Xem ảnh ${i + 1}" aria-selected="${i === 0}">
            <img src="${src}" alt="${item.title} - ảnh ${i + 1}" loading="lazy" />
          </button>
        `
      )
      .join('');

    modalThumbs.querySelectorAll('.modal-thumb-btn').forEach((btn) => {
      btn.addEventListener('click', () => renderGallerySlide(Number(btn.dataset.slide)));
    });

    renderGallerySlide(0);

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

  if (galleryPrev) galleryPrev.addEventListener('click', () => renderGallerySlide(currentImageIdx - 1));
  if (galleryNext) galleryNext.addEventListener('click', () => renderGallerySlide(currentImageIdx + 1));

  projectCards.forEach((card) => {
    card.addEventListener('click', () => openModal(Number(card.dataset.projectId)));
  });

  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    if (modal.classList.contains('open')) {
      if (e.key === 'ArrowLeft') renderGallerySlide(currentImageIdx - 1);
      if (e.key === 'ArrowRight') renderGallerySlide(currentImageIdx + 1);
    }
    if (e.key === 'Escape' && articleModal && articleModal.classList.contains('open')) closeArticleModal();
  });

  // 5b. Editorial Journal / Articles Reader Modal
  const articlesData = [
    {
      meta: 'XU HƯỚNG 2026 • PHONG CÁCH SỐNG • 5 PHÚT ĐỌC',
      title: 'Quiet Luxury & Warm Minimalism: Khi sự sang trọng đến từ tĩnh lặng',
      image: 'assets/hero-living.jpg',
      body: `
        <p>Trong năm 2026, khái niệm "nội thất cao cấp" đang có sự chuyển dịch mạnh mẽ. Thay vì những chi tiết mạ vàng phô trương hay phào chỉ rườm rà, các gia chủ hiện đại ngày càng yêu thích tinh thần <strong>Quiet Luxury (Sang trọng thầm lặng)</strong> kết hợp cùng <strong>Warm Minimalism (Tối giản ấm áp)</strong>.</p>
        <h4>1. Bảng màu đất ấm áp và chất liệu có chiều sâu</h4>
        <p>Tông trắng lạnh dần nhường chỗ cho các sắc độ tự nhiên như kem đá (alabaster), be ấm, nâu gỗ óc chó và xám cát. Vẻ đẹp của không gian không nằm ở số lượng đồ đạc, mà ở cảm giác chạm tay vào từng bề mặt: vải bouclé mềm mịn, đá travertine mài mờ, gỗ tự nhiên giữ nguyên vân thớ.</p>
        <h4>2. Ánh sáng đa lớp — "linh hồn" của sự thư thái</h4>
        <p>Thay vì chỉ dùng đèn tuýp hay đèn trần trắng gắt, các kiến trúc sư tại HOMA Interior ưu tiên thiết kế 3 lớp ánh sáng: ánh sáng tự nhiên qua rèm voan mỏng, ánh sáng hắt khe trần/tủ dịu nhẹ (3000K) và đèn điểm nhấn (accent light) tạo chiều sâu nghệ thuật vào buổi tối.</p>
        <h4>3. Đầu tư ít nhưng chất lượng vượt thời gian</h4>
        <ul>
          <li>Ưu tiên đồ nội thất may đo chuẩn tỷ lệ không gian thay vì mua rời chắp vá.</li>
          <li>Giảm tối đa chi tiết thừa để việc dọn dẹp nhẹ nhàng và ngôi nhà luôn giữ được vẻ thanh lịch sau 5–10 năm.</li>
          <li>Tạo khoảng thở thị giác để mỗi khi trở về nhà, bạn thực sự cảm thấy bình yên.</li>
        </ul>
      `
    },
    {
      meta: 'BIỆT THỰ • DI SẢN & ĐƯƠNG ĐẠI • 6 PHÚT ĐỌC',
      title: 'Indochine Đương Đại: Bản giao hưởng Á Đông giữa lòng biệt thự hiện đại',
      image: 'assets/project-ngoctrai.jpg',
      body: `
        <p>Phong cách <strong>Indochine (Đông Dương)</strong> chưa bao giờ lỗi mốt tại Việt Nam, đặc biệt với các công trình biệt thự như dự án khu Ngọc Trai – Vinhomes Ocean Park mà HOMA Interior thực hiện. Tuy nhiên, phiên bản Indochine 2026 đã được "trẻ hóa" tinh tế hơn rất nhiều.</p>
        <h4>1. Tiết chế họa tiết để không gian thoáng nhẹ</h4>
        <p>Nếu Indochine truyền thống đôi khi tạo cảm giác nặng nề vì quá nhiều gỗ tối màu, thì Indochine Đương Đại biết cách tiết chế: giữ lại những "chữ ký" đắt giá như khung vòm cong, cánh tủ mây mắt cáo, gạch bông điểm nhấn hay tranh sen vẽ tay — đặt trên nền tường sáng rộng rãi.</p>
        <h4>2. Kết hợp hài hòa tiện nghi hiện đại</h4>
        <p>Hệ thiết bị bếp âm tủ, điều hòa âm trần nối ống gió và hệ thống đèn chiếu sáng thông minh được giấu khéo léo trong các đường chỉ trần và hệ tủ gỗ, giúp gia chủ vừa tận hưởng vẻ đẹp hoài cổ, vừa có trải nghiệm sống tiện nghi chuẩn 5 sao.</p>
        <h4>3. Lời khuyên từ KTS HOMA Interior</h4>
        <ul>
          <li>Chọn 1–2 màu nhấn đặc trưng như xanh cổ vịt, vàng mù tạt hoặc xanh ngọc lục bảo thay vì dùng quá nhiều màu nóng.</li>
          <li>Tận dụng tối đa ánh sáng tự nhiên và mảng xanh nhiệt đới (cây chuối rẻ quạt, cọ cảnh) để làm mềm chất liệu gỗ.</li>
        </ul>
      `
    },
    {
      meta: 'CHUNG CƯ • GIẢI PHÁP KHÔNG GIAN • 4 PHÚT ĐỌC',
      title: '5 bí quyết thiết kế căn hộ chung cư giúp “nới rộng” không gian gấp rưỡi',
      image: 'assets/project-smartcity.jpg',
      body: `
        <p>Với đặc thù diện tích phổ biến từ 55m² đến 110m² tại các đại đô thị như Vinhomes Smart City hay khu vực Mỹ Đình – Cầu Giấy, bài toán lớn nhất của thiết kế nội thất chung cư là làm sao vừa <strong>đủ công năng cho cả gia đình</strong>, vừa <strong>thoáng rộng và có gu</strong>.</p>
        <h4>5 nguyên tắc vàng HOMA Interior luôn áp dụng:</h4>
        <ul>
          <li><strong>Liên thông Khách – Ăn – Bếp:</strong> Loại bỏ các vách ngăn cứng không cần thiết, sử dụng bàn ăn hoặc đảo bếp làm ranh giới mềm giúp ánh sáng từ logia đi xuyên suốt căn hộ.</li>
          <li><strong>Hệ tủ kịch trần, không tay nắm:</strong> Tận dụng tối đa chiều cao lưu trữ, đồng màu với mảng tường để "tàng hình" khối tủ lớn và tránh bám bụi trên nóc tủ.</li>
          <li><strong>Nội thất chân thoáng & đường cong mềm:</strong> Sofa, bàn trà có khoảng hở gầm vừa giúp robot hút bụi hoạt động dễ dàng, vừa tạo cảm giác sàn nhà rộng hơn.</li>
          <li><strong>Bảng màu thống nhất tối đa 3 tông:</strong> 60% màu nền sáng trung tính, 30% màu gỗ ấm, 10% màu nhấn tạo chiều sâu.</li>
          <li><strong>Gương và kính mở rộng thị giác:</strong> Đặt mảng gương trà hoặc kính sọc ở vị trí hợp lý gần bàn ăn giúp nhân đôi chiều sâu không gian.</li>
        </ul>
      `
    },
    {
      meta: 'VẬT LIỆU • KINH NGHIỆM THI CÔNG • 6 PHÚT ĐỌC',
      title: 'Cẩm nang chọn vật liệu nội thất bền đẹp 15+ năm theo khí hậu miền Bắc',
      image: 'assets/project-ct2.jpg',
      body: `
        <p>Khí hậu miền Bắc có độ ẩm cao vào mùa nồm và nắng nóng gắt vào mùa hè — đây là "bài kiểm tra" khắc nghiệt nhất đối với tuổi thọ đồ nội thất. Chọn đúng vật liệu ngay từ đầu sẽ giúp bạn tiết kiệm hàng trăm triệu đồng chi phí sửa chữa về sau.</p>
        <h4>1. Gỗ tự nhiên (Óc chó, Sồi Mỹ, Gõ đỏ)</h4>
        <p>Phù hợp cho không gian biệt thự, căn hộ cao cấp yêu cầu vẻ đẹp sang trọng và độ bền vượt trội. Điều quan trọng nhất là quy trình <strong>tẩm sấy đạt chuẩn độ ẩm 8–12%</strong> để hạn chế tối đa cong vênh, co ngót theo mùa.</p>
        <h4>2. Gỗ công nghiệp lõi xanh chống ẩm (MDF An Cường)</h4>
        <p>Lựa chọn tối ưu nhất về thẩm mỹ lẫn ngân sách cho chung cư và văn phòng hiện đại. Bề mặt phủ Melamine, Laminate hoặc Acrylic bóng gương có hàng trăm mã vân gỗ, vân đá thời thượng, không cong vênh và thi công cực kỳ sắc nét.</p>
        <h4>3. Khu vực ẩm ướt (Tủ bếp dưới, Lavabo)</h4>
        <ul>
          <li>Khoang chậu rửa nên ưu tiên dùng <strong>nhựa đặc Picomat / thùng Inox 304</strong> chống nước tuyệt đối 100%.</li>
          <li>Mặt bàn bếp nên dùng đá thạch anh nhân tạo (Vicostone) hoặc đá nung kết chống ố vàng, chống trầy xước khi nấu nướng hằng ngày.</li>
          <li>Phụ kiện bản lề, ray trượt nên đầu tư thương hiệu uy tín (Hafele, Blum, Cariny...) để đóng mở êm ái suốt nhiều năm.</li>
        </ul>
      `
    }
  ];

  const articleModal = document.getElementById('articleModal');
  const articleModalBackdrop = document.getElementById('articleModalBackdrop');
  const articleModalClose = document.getElementById('articleModalClose');
  const articleModalImage = document.getElementById('articleModalImage');
  const articleModalMeta = document.getElementById('articleModalMeta');
  const articleModalTitle = document.getElementById('articleModalTitle');
  const articleModalBody = document.getElementById('articleModalBody');
  const articleConsultBtn = document.getElementById('articleConsultBtn');
  const articleCards = document.querySelectorAll('.article-card');

  const openArticleModal = (index) => {
    const article = articlesData[index];
    if (!article || !articleModal) return;

    articleModalImage.src = article.image;
    articleModalImage.alt = article.title;
    articleModalMeta.textContent = article.meta;
    articleModalTitle.textContent = article.title;
    articleModalBody.innerHTML = article.body;

    articleConsultBtn.onclick = () => {
      closeArticleModal();
      if (clientNote) {
        clientNote.value = `Tôi vừa đọc bài viết "${article.title}" và muốn được KTS HOMA tư vấn.`;
      }
    };

    articleModal.classList.add('open');
    articleModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeArticleModal = () => {
    if (!articleModal) return;
    articleModal.classList.remove('open');
    articleModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  articleCards.forEach((card) => {
    card.addEventListener('click', () => openArticleModal(Number(card.dataset.articleId)));
  });

  if (articleModalClose) articleModalClose.addEventListener('click', closeArticleModal);
  if (articleModalBackdrop) articleModalBackdrop.addEventListener('click', closeArticleModal);

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

const url = 'https://ieiuqg.ph.files.1drv.com/y4mc_jSl3YE2ZnZ7nXW_tdN0hk1Edc5ZcKS9KgvTsFgCdXcbfp_nV-qYwfSu_DEulAZ1PGl7ktJXQG0qK9TBSbQ2zmfPexxlLASIh78xI5Q4kMHYTVvEpAEW81VY34qWoeV4QSrkEtCw-Nzq1qQdxdg5vqZU4ku8-6ddU35cTxhUbBHDGqovmD0L2WE1O3f3S4-/2300524_%EB%85%B8%EB%9F%89%EC%A7%84%EC%97%AD%EC%82%AC%20%EC%82%AC%EC%97%85%EA%B3%84%ED%9A%8D%EC%84%9C_350%25(%EC%A0%84%EC%B2%B4).pdf?download&psid=1';
             
    async function getPdfDoc(url) {
      const loadingTask = pdfjsLib.getDocument(url);
      return await loadingTask.promise;
    }

    async function getImageElement(page) {
    const scale = window.innerWidth / page.getViewport({ scale: 1 }).width;
    const viewport = page.getViewport({ scale: scale });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };

    await page.render(renderContext).promise;
    return canvas;
    }

    async function setupSwiper() {
      const pdfDoc = await getPdfDoc(url);
      const numPages = pdfDoc.numPages;
      const swiperWrapper = document.getElementById('swiperWrapper');

      for (let i = 1; i <= numPages; i++) {
        const page = await pdfDoc.getPage(i);
        const imgElement = await getImageElement(page);
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.appendChild(imgElement);
        swiperWrapper.appendChild(slide);
      }
  
      const pagination  = document.querySelector('.swiper-pagination');
      var swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        centeredSlides: true,    //센터모드
        loop : false,   // 슬라이드 반복 여부
        loopAdditionalSlides : 1,
        freeMode : false, // 슬라이드 넘길 때 위치 고정 여부

        // 슬라이드 반복 시 마지막 슬라이드에서 다음 슬라이드가 보여지지 않는 현상 수정
        
        pagination: {
          el: pagination,
          type: 'fraction',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        
      });
    }

    setupSwiper ();

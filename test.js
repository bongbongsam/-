const url = '';
             
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

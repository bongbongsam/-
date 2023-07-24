const url = 'https://t7orhw.by.files.1drv.com//y4m-yHShmgPWLV1ozSE7nlgyTZBzOIY3bqD_aRpWL8pTM035obsav73t-SC3PtwBVVzDVDYCUsd2nNkOmI90nM_xqZ5K6TVLUE_TesBVVvhkmsaexywkPAK2lFnsZRtezso3qLNkdxZQVmrhvC9ajfTg16S5OQNAyb6t4EGCcZvYCygifywKHsX4-pzgFTVo286/%5BBP%5D%20%EA%B5%90%EC%9C%A1%EC%9E%90%EB%A3%8C_%EC%8B%A0%EC%9C%A0%EB%B2%A0%EB%9D%BC%ED%8A%B8_REV_2_0%20(2).pdf?download&psid=1';
             
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

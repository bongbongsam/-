const url = 'https://hm2hnw.ph.files.1drv.com/y4mpfgbGcZ3EpCxFmq3skLj0GIy7fR7tsk0to6ZnkjBcMPYq_P4ZsnvRmWlpf7HgTqh3dNXkqQ1BF3GNr3HpX-cau8T7Ufm-Ko1dIg882fGUI7ALL34acR-URKLToq8d5m-9l5-hJUD-dr58INgY19FHmGdCAU_XyS1JGBpWQCHER59sNB_ocftCNIDKgOnNrNZ/2300524_%EB%85%B8%EB%9F%89%EC%A7%84%EC%97%AD%EC%82%AC%20%EC%82%AC%EC%97%85%EA%B3%84%ED%9A%8D%EC%84%9C_350%25(%EC%A0%84%EC%B2%B4).pdf?download&psid=1';

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

    new Swiper('.swiper-container', {
    pagination: {
      el: pagination,
      type: 'fraction',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });
  
}

setupSwiper ();

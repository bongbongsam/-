const url = 'https://hm29ia.ph.files.1drv.com/y4mbOfBvPBTQ2WDvLE5PhNxCY7EcrXy2zsmmjS1HZ3di8xdk1-GsH6IVIO57PxX15mvP4otwTvnyqyxv5Fl8jApcSv-I4y-UYsIE6hg9-Z3j87MpTthGTRIPUfPfWSocUej5-7sOS8oyuFlbKydO7j0f1ljuRDCvwXNLGkPppJmq2EBHR22cRmn_Wg0oNdjjHOu/2300524_%EC%82%AC%EC%97%85%EA%B3%84%ED%9A%8D%EC%84%9C%EC%83%98%ED%94%8C%201.pdf?download&psid=1';

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

const startPage = 1;
    const imageWrapper = document.querySelector(".swiper-wrapper");

    function loadPDFImage(pageNumber) {
      const imageUrl = `https://word-view.officeapps.live.com/wv/ResReader.ashx?n=p${pageNumber}.img&v=00000000-0000-0000-0000-000000000802&usid=2b0c68dc-e465-4e37-be95-211425bfc76b&build=16.0.16721.41004&WOPIsrc=https%3A%2F%2Fwopi%2Eonedrive%2Ecom%2Fwopi%2Ffiles%2FB57DF9D3D88A4E61%211664&access_token=4wVnFKIuwqyprU-kq8Y1Inf6HaVRefBpQwHJB-8VplJY54ppRMjCtX5nJy4GSrtcQ4SI2pkSAsYkztrrrn0cKTfq24yUo-7vpDyCNaUeAdgKCLy9sIzvbbw0mc7a29coYPBn112gw9TstaR6rCU0IqCg&access_token_ttl=1692066047128&z=aQjU3REY5RDNEODhBNEU2MSExNjY0LjE1&waccluster=PJP1&PdfMode=1`;

      const image = new Image();
      image.src = imageUrl;
      image.alt = `Page ${pageNumber}`;
      image.onload = function () {
        const slideDiv = document.createElement("div");
        slideDiv.classList.add("swiper-slide");
        slideDiv.appendChild(image);
        if (imageWrapper) {
          imageWrapper.appendChild(slideDiv);


         // Load the next page
          loadPDFImage(pageNumber + 1);
        }
      };


      image.onerror = function () {
        // Last page reached, initialize Swiper
        initializeSwiper();
      };
    }

    function initializeSwiper() {
      var mySwiper = new Swiper(".swiper-container", {
        slidesPerView: 1,
        centeredSlides: true,    //센터모드
        loop : false,   // 슬라이드 반복 여부
        loopAdditionalSlides : 1,
        freeMode : false, // 슬라이드 넘길 때 위치 고정 여부
        // Optional settings
        
        pagination: {
          el: ".swiper-pagination",
          type: 'fraction',
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    }

    document.addEventListener("DOMContentLoaded", function () {
      // Start loading the first page
      loadPDFImage(startPage);
    });

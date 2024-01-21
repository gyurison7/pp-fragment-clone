$(document).ready(function () {
  setTimeout(function () {
    $(".loader").hide();
    $(".total-container").show();
    setTimeout(function () {
      $(".sc-main .scatter-letters .scatter-item").addClass("move");
    }, 3000);
  }, 3000);
});

// sc-style
const gatherMotion = gsap.timeline({
  scrollTrigger: {
    trigger: ".sc-style",
    start: "0% 0%",
    end: "100% 0%",
    toggleActions: "play none none reverse",
    // markers: true,
  },
});
gatherMotion
  .from(
    ".sc-style .gather-item.a1",
    {
      transform: "translate(50%, -25%)",
      rotate: "20deg",
    },
    "a"
  )
  .from(
    ".sc-style .gather-item.a2",
    {
      transform: "translate(-25%, -100%)",
      rotate: "-30deg",
    },
    "a"
  )
  .from(
    ".sc-style .gather-item.a3",
    {
      transform: "translate(-50%, 15%)",
      rotate: "-45deg",
    },
    "a"
  );

// sc-possible
function changeAnimation(selector, moveArray, fontWeightArray, duration = 3000, delay = 3500) {
  const element = document.querySelector(selector);
  const width = element.querySelector(".possible-text").offsetWidth;
  const fontElement = element.querySelector(".font");
  const originalText = fontElement.textContent; // 원래 텍스트 저장
  const halfWidth = width / 2;
  let num = 0;

  function animate() {
    const move = moveArray[num];
    const weight = fontWeightArray[num];
    let transformValue;
    if (move === 0) {
      transformValue = `translateX(${move}%)`;
    } else if (move === 100) {
      const minus = weight >= 800 ? "5rem" : weight >= 700 ? "4rem" : "0rem";
      transformValue = `translateX(calc(${move}% - ${width}px - ${minus}))`;
    } else {
      transformValue = `translateX(calc(${move}% - ${halfWidth}px))`;
    }
    element.style.transform = transformValue;
    element.style.fontVariationSettings = `"wght" ${weight}`;

    let weightName = "";
    if (weight === 100) {
      weightName = "Thin";
    } else if (weight === 200) {
      weightName = "Extra Light";
    } else if (weight === 300) {
      weightName = "Light";
    } else if (weight === 400) {
      weightName = "Regular";
    } else if (weight === 500) {
      weightName = "Medium";
    } else if (weight === 600) {
      weightName = "Semi Bold";
    } else if (weight === 700) {
      weightName = "Bold";
    } else if (weight === 800) {
      weightName = "Extra Bold";
    } else {
      weightName = "Black";
    }
    fontElement.textContent = originalText + " " + weightName;

    num++;
    if (num === moveArray.length) num = 0;

    setTimeout(animate, num === 0 ? delay : duration); // 첫 단계로 돌아가기전에 추가 지연
  }

  setTimeout(animate, duration); // 최초 애니메이션 시작
}

document.addEventListener("DOMContentLoaded", function () {
  changeAnimation(".p1", [0, 100, 50, 70], [400, 900, 100, 200]);
  changeAnimation(".p2", [0, 100, 40, 0], [700, 800, 200, 100]);
  changeAnimation(".p3", [50, 0, 100, 50], [700, 300, 300, 700]);
  changeAnimation(".p4", [50, 0, 50, 50], [900, 600, 400, 400]);
  changeAnimation(".p5", [100, 50, 100, 100], [900, 600, 500, 500]);
  changeAnimation(".p6", [100, 70, 0, 0], [700, 500, 600, 600]);
  changeAnimation(".p7", [40, 45, 50, 0], [700, 400, 600, 600]);
  changeAnimation(".p8", [30, 0, 60, 30], [400, 300, 700, 700]);
});

//sc-glyph
// 메뉴 열기
$(".sc-glyph .dropdown-btn").click(function () {
  $(".sc-glyph .dropdown-btn, .sc-glyph .dropdown-list").toggleClass("open");
});

// 다른 부분 클릭 시 메뉴 닫기
$(document).click(function (event) {
  if (!$(event.target).closest(".dropdown-btn, .dropdown-list").length)
    $(".dropdown-btn, .dropdown-list").removeClass("open");
});

// preview
$(".sc-glyph .glyph-item").hover(function () {
  const hoverText = $(this).find("span").text();
  $(".sc-glyph .glyph-perview span").text(hoverText);
});

// slide
$(".sc-glyph .dropdown-list button").click(function () {
  const text = $(this).text();
  const font = $(this).data("font");
  const weight = $(this).data("weight");
  $(this).addClass("active").siblings().removeClass("active");
  $(".sc-glyph .dropdown-btn").text(text);
  $(".sc-glyph .dropdown-btn, .sc-glyph .dropdown-list").removeClass("open");
  $(".sc-glyph .glyph-list, .sc-glyph .glyph-perview").css({
    "font-family": `var(--font-family-${font})`,
    "font-variation-settings": `"wght" ${weight}`,
  });
});

// sc-font
// font-style
$(".sc-font .font-list li").click(function () {
  const fontStyle = $(this).text();
  $(this).addClass("active").siblings().removeClass("active");
  $(".sc-font textarea").css("font-family", `var(--font-family-${fontStyle})`);
});

// font-setting
$(".sc-font .input-range").on("input", function () {
  const value = $(this).val();
  const parentClass = $(this).closest("div").attr("class");
  const fontSize = parentClass === "font-size" ? value : 240;

  switch (parentClass) {
    case "font-size":
      $(".font-size .value").text(`${value}pt`);
      $(".sc-font textarea").css("font-size", `${value}px`);
      break;
    case "font-weight":
      $(".font-weight .value").text(`${value}`);
      $(".sc-font textarea").css("font-variation-settings", `"wght" ${value}`);
      break;
    case "letter-spacing":
      $(".letter-spacing .value").text(`${value}%`);
      $(".sc-font textarea").css("letter-spacing", `${value}px`);
      break;
    case "line-height":
      $(".line-height .value").text(`${value}pt`);
      $(".sc-font textarea").css("line-height", `${value / fontSize}`);
      break;
  }
});

// sc-poster
const bgSwiper = new Swiper(".bg-swiper-container", {
  direction: "vertical",
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  navigation: {
    nextEl: ".random-btn",
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false, // 사용자 상호작용 후에도 자동 슬라이드 유지
  },
});
const posterSwiper = new Swiper(".poster-swiper-container", {
  direction: "vertical",
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  navigation: {
    nextEl: ".random-btn",
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

// sc-language
// const gatherLettersMotion = gsap.timeline({
//   scrollTrigger: {
//     trigger: ".sc-language",
//     start: "0% 80%",
//     end: "80% 0%",
//     scrub: true,
//     // markers: true,
//   },
// });
// gatherLettersMotion
//   .from(".gather-letters .l1", { xPercent: -20, yPercent: 20, opacity: 0 }, "a")
//   .from(".gather-letters .l2", { xPercent: 20, yPercent: 0, opacity: 0 }, "a")
//   .from(".gather-letters .l3", { xPercent: 0, yPercent: 15, scale: 1.2, opacity: 0 }, "a+=0.1")
//   .from(".gather-letters .l4", { xPercent: -20, yPercent: 15, opacity: 0 }, "a+=0.1")
//   .from(".gather-letters .l5", { xPercent: 0, yPercent: 50, opacity: 0 }, "a+=0.1")
//   .from(".gather-letters .l6", { xPercent: 20, yPercent: 0, opacity: 0 }, "a+=0.1");

gsap.set(".gather-letters .l1", { xPercent: -20, yPercent: 20, opacity: 0 });
gsap.set(".gather-letters .l2", { xPercent: 20, yPercent: 0, opacity: 0 });
gsap.set(".gather-letters .l3", { xPercent: 0, yPercent: 15, scale: 1.2, opacity: 0 });
gsap.set(".gather-letters .l4", { xPercent: -20, yPercent: 15, opacity: 0 });
gsap.set(".gather-letters .l5", { xPercent: 0, yPercent: 50, opacity: 0 });
gsap.set(".gather-letters .l6", { xPercent: 20, yPercent: 0, opacity: 0 });
const gatherLettersMotion = gsap.timeline({
  scrollTrigger: {
    trigger: ".sc-language",
    start: "0% 80%",
    end: "80% 0%",
    scrub: true,
    // markers: true,
  },
});
gatherLettersMotion
  .to(".gather-letters .l1", { xPercent: 0, yPercent: 0, opacity: 1 }, "a")
  .to(".gather-letters .l2", { xPercent: 0, yPercent: 0, opacity: 1 }, "a")
  .to(".gather-letters .l3", { xPercent: 0, yPercent: 0, scale: 1, opacity: 1 }, "a+=0.1")
  .to(".gather-letters .l4", { xPercent: 0, yPercent: 0, opacity: 1 }, "a+=0.1")
  .to(".gather-letters .l5", { xPercent: 0, yPercent: 0, opacity: 1 }, "a+=0.1")
  .to(".gather-letters .l6", { xPercent: 0, yPercent: 0, opacity: 1 }, "a+=0.1");

gsap.to(".sc-language .language-row li", {
  scrollTrigger: {
    trigger: ".sc-language .language-list",
    start: "0% 90%",
    end: "100% 30%",
    scrub: true,
    // markers: true,
  },
  opacity: 1,
  stagger: {
    each: 0.1, // li 사이의 지연 시간
    grid: "auto", // 그리드 스태거를 사용하여 각 행에 동시에 적용
    from: "start", // 첫 번째 요소부터 시작
  },
});

gsap.to(".sc-language .content p", {
  scrollTrigger: {
    trigger: ".sc-language .content",
    start: "30% 100%",
    end: "100% 0%",
    scrub: true,
    // markers: true,
  },
  fontVariationSettings: `"wght" 900`,
});

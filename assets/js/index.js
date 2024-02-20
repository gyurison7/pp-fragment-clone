history.scrollRestoration = "manual";

// sc-main
const introMotion = gsap.timeline();
introMotion
  .add(() => {
    $("body").addClass("hidden");
  })
  .from(".sc-main .scatter-letters .scatter-item", {
    opacity: 0,
    stagger: {
      from: "random",
      each: 0.05,
    },
    delay: 1,
    duration: 3,
    ease: "power2.out",
  })
  .add(() => {
    $(".sc-main .scatter-letters .scatter-item").addClass("on");
  }, "-=3")
  .from($(".sc-main .top-area"), { opacity: 0 }, "a")
  .to(
    ".sc-main .rolling-letters",
    1,
    {
      yPercent: 100,
      bottom: "100%",
      stagger: {
        from: "random",
        each: 0.1,
      },
    },
    "a"
  )
  .from($("header"), { yPercent: -100, opacity: 0 }, "b")
  .from($(".side-bar"), { xPercent: -100, opacity: 0 }, "b")
  .from($(".bottom-area"), { yPercent: 100, opacity: 0 }, "b")
  .add(() => {
    $("body").removeClass("hidden");
  }, "b");

function sideMenuOpen() {
  gsap.to(".side-bar", { x: "35.5vw", duration: 0.5, ease: "linear" });
  gsap.from(".side-menu .title, .side-menu .top-area a", {
    yPercent: 100,
    stagger: 0.1,
  });
}
function sideMenuClose() {
  gsap.to(".side-bar", { x: 0, duration: 0.5, ease: "linear" });
}

$(".toggle-btn").click(function () {
  $(this).toggleClass("open");
  $(".side-menu").toggleClass("open");

  if ($(this).hasClass("open") && $(".side-menu").hasClass("open")) {
    sideMenuOpen();
  } else {
    sideMenuClose();
  }
});

$(".side-menu a").click(function () {
  $(".side-menu, .toggle-btn").removeClass("open");
  sideMenuClose();
});

$(document).click(function (e) {
  if (
    $(".side-menu, .toggle-btn").hasClass("open") &&
    !$(e.target).closest(".side-menu, .toggle-btn").length
  ) {
    $(".side-menu, .toggle-btn").removeClass("open");
    sideMenuClose();
  }
});

// 동적 줄바꿈 처리
function dynamicWrapLines() {
  const elementArray = document.querySelectorAll(".dynamic-paragraph");

  elementArray.forEach((element) => {
    const content = element.innerText; // 문단의 내용
    const wordArray = content.split(" "); // 공백을 기준으로 단어를 잘라서 배열 생성
    let line = "";
    element.innerHTML = "";

    wordArray.forEach((word) => {
      const trimWord = word.replace(/\n/g, " "); // 줄바꿈 문자 공백으로 대체
      const testLine = line + trimWord + " "; // 가로너비 비교를 위한 테스트 라인 생성
      const tempSpan = document.createElement("span"); // 임시 span 생성
      tempSpan.style.position = "absolute";
      tempSpan.style.left = "-9999px";
      tempSpan.style.visibility = "hidden";
      tempSpan.innerText = testLine;
      document.body.appendChild(tempSpan); // body에 tempSpan 추가

      // tempSpan의 가로너비와 해당 요소의 가로너비 비교
      if (tempSpan.offsetWidth > element.offsetWidth) {
        const newLine = document.createElement("span"); // tempSpan의 너비가 크다면 새로운 라인 생성
        const animationWrapper = document.createElement("span"); // 애니메이션 적용을 위한 부모 wrapper 생성
        animationWrapper.className = "animation-wrapper";
        newLine.className = "line";
        newLine.innerText = line; // line에는 현재 단어 이전까지의 텍스트가 담겨 있음
        element.appendChild(animationWrapper); // 해당 요소에 부모 wrapper를 먼저 추가
        animationWrapper.appendChild(newLine); // 최종적으로 부모 wrapper에 라인을 자식으로 추가
        line = trimWord + " "; // 라인에 현재 단어를 넣어서 초기화
      } else {
        line = testLine;
      }

      document.body.removeChild(tempSpan); // body에서 tempSpan 제거
    });

    const lastLine = document.createElement("span");
    const lastWrapper = document.createElement("span"); // 애니메이션 적용을 위한 부모 wrapper 생성
    lastWrapper.className = "animation-wrapper";
    lastLine.className = "line";
    lastLine.innerText = line;
    element.appendChild(lastWrapper); // 해당 요소에 부모 wrapper를 먼저 추가
    lastWrapper.appendChild(lastLine);
  });
}

window.addEventListener("load", function () {
  dynamicWrapLines();

  dynamicAnimation1();
  dynamicAnimation2();
});

function debounce(func, wait) {
  let timeout; // 타이머를 저장할 변수
  return function () {
    clearTimeout(timeout); // 이전 타이머가 있으면 취소
    timeout = setTimeout(func, wait); // 새로운 타이머 설정
  };
}

const debouncedDynamicWrapLines = debounce(() => {
  dynamicWrapLines();
}, 300);

window.addEventListener("resize", debouncedDynamicWrapLines);

// sc-intro
const paragraphMotion1 = gsap.timeline({
  scrollTrigger: {
    trigger: ".sc-intro .top-section",
    start: "0% 100%",
    end: "100% 50%",
    // markers: true,
  },
});
paragraphMotion1
  .from(".sc-intro .top-section .description1 .line", { yPercent: 100, stagger: 0.1 }, "a")
  .from(".sc-intro .top-section .description2 .line", { yPercent: 100, stagger: 0.1 }, "a+=1")
  .from(".sc-intro .intro-img", { yPercent: 25 }, "a+=2");

function dynamicAnimation1() {
  const paragraphMotion2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".sc-intro .right-area",
      start: "0% 50%",
      end: "100% 50%",
      // markers: true,
    },
  });
  paragraphMotion2
    .from(".sc-intro .right-area .description1 .line", { yPercent: 100, stagger: 0.1 }, "a")
    .from(".sc-intro .right-area .description2 .line", { yPercent: 100, stagger: 0.1 }, "a");
}

gsap.to(".sc-intro .table tr", {
  scrollTrigger: {
    trigger: ".sc-intro .table",
    start: "0% 100%",
    end: "100% 100%",
    // markers: true,
  },
  "--border-width": "100%",
  stagger: 0.1,
});

// sc-style
const gatherMotion = gsap.timeline({
  scrollTrigger: {
    trigger: ".sc-style",
    start: "0% 10%",
    end: "60% 100%",
    scrub: true,
    // markers: true,
  },
});
gatherMotion
  .from(".gather-item.a1", { xPercent: 50, yPercent: -25, rotate: "20deg", opacity: 0 }, "a")
  .from(".gather-item.a2", { xPercent: -25, yPercent: -100, rotate: "-30deg", opacity: 0 }, "a")
  .from(".gather-item.a3", { xPercent: -50, yPercent: 15, rotate: "-45deg", opacity: 0 }, "a");

const rollingMotion = gsap.timeline({
  scrollTrigger: {
    trigger: ".sc-style",
    start: "30% 100%",
    end: "100% 0%",
    // markers: true,
  },
});
rollingMotion.from(".sc-style .style-title", { yPercent: -100, opacity: 0, duration: 1 }, "a").to(
  ".sc-style .rolling-letters",
  {
    yPercent: 100,
    bottom: "100%",
    stagger: {
      from: "random",
      each: 0.1,
    },
    duration: 1,
  },
  "a"
);

const scatterMotion = gsap.timeline({
  scrollTrigger: {
    trigger: ".sc-possible",
    start: "0% 100%",
    end: "100% 50%",
    scrub: true,
    // markers: true,
  },
});
scatterMotion
  .to(".sc-style .gather-item.a1", { xPercent: 15, yPercent: -100, opacity: 0.5 }, "b")
  .to(".sc-style .gather-item.a2", { xPercent: -15, yPercent: 60, opacity: 0.5 }, "b")
  .to(".sc-style .gather-item.a3", { xPercent: -15, yPercent: 60, opacity: 0.5 }, "b");

// sc-possible
function changeAnimation(selector, moveArray, fontWeightArray, duration = 3000, delay = 3500) {
  const element = document.querySelector(selector);
  const width = element.querySelector(".possible-text").offsetWidth;
  const fontElement = element.querySelector(".font");
  const originalText = fontElement.textContent; // 원래 텍스트 저장
  const halfWidth = width / 2;
  let num = 0;
  let timeoutId;

  function animate(manual = false) {
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

    if (!manual) {
      // 자동일 경우에 애니메이션 실행
      timeoutId = setTimeout(animate, num === 0 ? delay : duration);
    }
  }

  timeoutId = setTimeout(animate, duration); // 최초 애니메이션 시작

  $(".sc-possible .random-btn").click(function () {
    clearTimeout(timeoutId);
    animate(true); // 수동으로 애니메이션 실행

    timeoutId = setTimeout(animate, 5000); // 5초동안 클릭하지 않을 경우 자동으로 애니메이션 실행
  });
}

window.addEventListener("load", function () {
  changeAnimation(".p1", [0, 100, 50, 70], [400, 900, 100, 200]);
  changeAnimation(".p2", [0, 100, 40, 0], [700, 800, 200, 100]);
  changeAnimation(".p3", [50, 0, 100, 50], [700, 300, 300, 700]);
  changeAnimation(".p4", [50, 0, 50, 50], [900, 600, 400, 400]);
  changeAnimation(".p5", [100, 50, 100, 100], [900, 600, 500, 500]);
  changeAnimation(".p6", [100, 70, 0, 0], [700, 500, 600, 600]);
  changeAnimation(".p7", [40, 45, 50, 0], [700, 400, 600, 600]);
  changeAnimation(".p8", [30, 0, 60, 30], [400, 300, 700, 700]);
});

//sc-glyph, sc-font
// 메뉴 열기
$(".dropdown-btn").click(function () {
  $(this).toggleClass("open");
  $(this).siblings(".dropdown-list").toggleClass("open");
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

gsap.from(".sc-glyph .line", {
  scrollTrigger: {
    trigger: ".sc-glyph",
    start: "0% 80%",
    end: "30% 100%",
    // markers: true,
  },
  yPercent: 100,
  stagger: 0.1,
});

// sc-font
// font-style
$(".sc-font .font-list li").click(function () {
  const fontStyle = $(this).text();
  $(this).addClass("active").siblings().removeClass("active");
  $(".sc-font textarea").css("font-family", `var(--font-family-${fontStyle})`);

  // mobile
  $(this).closest("div").find(".dropdown-btn").text(fontStyle).removeClass("open");
  $(this).closest(".dropdown-list").removeClass("open");
});

// font-setting
$(".sc-font .input-range").on("input", function () {
  const value = $(this).val();
  const parentClass = $(this).closest("div").attr("class");
  const fontSize = parentClass === "font-size" ? value : window.innerWidth > 699 ? 240 : 100;

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
      $(".sc-font textarea").css("--line-height", `${value / fontSize}`);
      break;
  }
});

// sc-poster
const bgSwiper = new Swiper(".bg-swiper", {
  direction: "vertical",
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  speed: 500,
  navigation: {
    nextEl: ".random-btn",
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false, // 사용자 상호작용 후에도 자동 슬라이드 유지
  },
});
const posterSwiper = new Swiper(".poster-swiper", {
  direction: "vertical",
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  speed: 500,
  effect: "creative",
  creativeEffect: {
    prev: {
      shadow: true,
      translate: [0, 0, -400],
    },
    next: {
      translate: [0, "100%", 0],
    },
  },
  navigation: {
    nextEl: ".random-btn",
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

// sc-language
gsap.set(".gather-letters .l1", { xPercent: -20, yPercent: 20, opacity: 0 });
gsap.set(".gather-letters .l2", { xPercent: 20, yPercent: 0, opacity: 0 });
gsap.set(".gather-letters .l3", { xPercent: 0, yPercent: 15, scale: 1.2, opacity: 0 });
gsap.set(".gather-letters .l4", { xPercent: -20, yPercent: 15, opacity: 0 });
gsap.set(".gather-letters .l5", { xPercent: 0, yPercent: 50, opacity: 0 });
gsap.set(".gather-letters .l6", { xPercent: 20, yPercent: 0, opacity: 0 });
const gatherLettersMotion = gsap.timeline({
  scrollTrigger: {
    trigger: ".sc-language",
    start: "0% 100%",
    end: "50% 0%",
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

const languageMotion = gsap.timeline({
  scrollTrigger: {
    trigger: ".sc-language .language-list",
    start: "0% 90%",
    end: "100% 30%",
    // markers: true,
  },
});
languageMotion
  .to(".sc-language .language-col1 li", { opacity: 1, stagger: 0.1 }, "a")
  .to(".sc-language .language-col2 li", { opacity: 1, stagger: 0.1 }, "a")
  .to(".sc-language .language-col3 li", { opacity: 1, stagger: 0.1 }, "a")
  .to(".sc-language .language-col4 li", { opacity: 1, stagger: 0.1 }, "a");

gsap.to(".sc-language .content-section p", {
  scrollTrigger: {
    trigger: ".sc-language .content-section",
    start: "30% 100%",
    end: "100% 0%",
    scrub: true,
    // markers: true,
  },
  fontVariationSettings: `"wght" 900`,
});

// sc-purchase
const gatherCapitlAMotion = gsap.timeline({
  scrollTrigger: {
    trigger: ".sc-purchase .gather-capital-a",
    start: "0% 0%",
    end: "150% 0%",
    scrub: true,
    // markers: true,
  },
});
gatherCapitlAMotion
  .from(".gather-capital-a .capital1", { xPercent: 0, yPercent: -25, opacity: 0 }, "a")
  .from(".gather-capital-a .capital2", { xPercent: -25, yPercent: -100, opacity: 0 }, "a")
  .from(".gather-capital-a .capital3", { xPercent: 50, yPercent: -50, opacity: 0 }, "a")
  .from(".gather-capital-a .capital4", { xPercent: -20, yPercent: 25, opacity: 0 }, "a")
  .from(".gather-capital-a .capital5", { xPercent: 30, yPercent: -40, opacity: 0 }, "a")
  .from(".gather-capital-a .capital6", { xPercent: -30, yPercent: -5, opacity: 0 }, "a");

const upAndScatterMotion = gsap.timeline({
  scrollTrigger: {
    trigger: ".sc-purchase",
    start: "10% 0%",
    end: "100% 0%",
    scrub: true,
    // markers: true,
  },
});
upAndScatterMotion
  .from(".sc-purchase .item1", { x: 0, y: 695 }, "a")
  .from(".sc-purchase .item2", { x: 0, y: 695 }, "a+=0.1")
  .from(".sc-purchase .item3", { x: 0, y: 695 }, "a+=0.2")
  .to(".sc-purchase .item1", { x: 0, y: -695 }, "b")
  .to(".sc-purchase .item2", { x: 0, y: -695 }, "b+=0.05")
  .to(".sc-purchase .item3", { x: 0, y: -695 }, "b+=0.1")
  .to(".capital1", { xPercent: 0, yPercent: -25, opacity: 0 }, "c")
  .to(".capital2", { xPercent: -25, yPercent: -100, rotate: "45deg", opacity: 0 }, "c")
  .to(".capital3", { xPercent: 50, yPercent: 20, rotate: "25deg", opacity: 0 }, "c")
  .to(".capital4", { xPercent: -20, yPercent: 25, rotate: "30deg", opacity: 0 }, "c")
  .to(".capital5", { xPercent: 30, yPercent: -40, rotate: "25deg", opacity: 0 }, "c")
  .to(".capital6", { xPercent: -30, yPercent: -5, rotate: "20deg", opacity: 0 }, "c");

// sc-credits
function dynamicAnimation2() {
  const paragraphMotion3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".sc-credits",
      start: "0% 70%",
      end: "100% 100%",
      // scrub: true,
      // markers: true,
    },
  });
  paragraphMotion3
    .to(".sc-credits h3", { "--border-width": "100%" }, "a")
    .from(".sc-credits .p-col1 .line", { yPercent: 100, stagger: 0.1 }, "a+=0.1")
    .from(".sc-credits .p-col2 .line", { yPercent: 100, stagger: 0.1 }, "a+=0.1")
    .from(".sc-credits .p-col3 .line", { yPercent: 100, stagger: 0.1 }, "a+=0.1")
    .from(".sc-credits .p-col4 .line", { yPercent: 100, stagger: 0.1 }, "a+=0.1")
    .from(".sc-credits .visuals-section .artist", { yPercent: 100 }, "a+=0.2");
}

// footer
gsap.from("footer .omega", {
  scrollTrigger: {
    trigger: "footer",
    start: "0% 100%",
    end: "100% 100%",
    scrub: true,
    // markers: true,
  },
  yPercent: 15,
  scale: 0,
  fontVariationSettings: `"wght" 700`,
});

document.addEventListener("mousemove", function (e) {
  const cursor = document.querySelector(".cursor");
  const x = e.clientX;
  const y = e.clientY;
  cursor.style.left = x + "px";
  cursor.style.top = y + "px";
});

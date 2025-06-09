document.addEventListener("DOMContentLoaded", function () {
  const blurTexts = document.querySelectorAll(".blur-text");

  blurTexts.forEach((element) => {
    const text = element.innerText.trim();
    const delay = parseInt(element.dataset.delay || "200");
    const animateBy = element.dataset.animateBy || "words"; // 'words' or 'letters'
    const direction = element.dataset.direction || "top";
    const threshold = parseFloat(element.dataset.threshold || "0.1");
    const rootMargin = element.dataset.rootMargin || "0px";
    const stepDuration = parseFloat(element.dataset.stepDuration || "0.35");

    const segments =
      animateBy === "words" ? text.split(" ") : text.split("");

    // Clear original text
    element.innerHTML = "";
    element.style.display = "flex";
    element.style.flexWrap = "wrap";

    segments.forEach((segment, index) => {
      const span = document.createElement("span");
      span.textContent = segment;
      span.style.opacity = "0";
      span.style.filter = "blur(10px)";
      span.style.transform = `translateY(${direction === "top" ? "-50px" : "50px"})`;
      span.style.transition = `all ${stepDuration}s ease ${index * delay}ms`;
      span.style.display = "inline-block";

      element.appendChild(span);

      // Thêm khoảng trắng sau mỗi từ nếu animateBy là "words"
      if (animateBy === "words" && index < segments.length - 1) {
        const space = document.createElement("span");
        space.innerHTML = "&nbsp;";
        space.style.display = "inline-block";
        element.appendChild(space);
      }
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const spans = element.querySelectorAll("span");
          spans.forEach((span) => {
            span.style.opacity = "1";
            span.style.filter = "blur(0px)";
            span.style.transform = "translateY(0)";
          });
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
  });
});

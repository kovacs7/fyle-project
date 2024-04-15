document.addEventListener("DOMContentLoaded", function () {
  const triggers = document.querySelectorAll(".popover-trigger");

  triggers.forEach(function (trigger) {
    const content = trigger.nextElementSibling;
    let timeout;

    trigger.addEventListener("mouseenter", function () {
      timeout = setTimeout(function () {
        content.style.display = "block";
      }, 500);
    });

    trigger.addEventListener("mouseleave", function () {
      clearTimeout(timeout);
      content.style.display = "none";
    });
  });
});

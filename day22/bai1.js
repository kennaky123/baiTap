const upButtons = document.querySelectorAll(".up");

upButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const currentItem = button.parentElement;
    const previousItem = currentItem.previousElementSibling;
    if (previousItem) {
      currentItem.parentElement.insertBefore(currentItem, previousItem);
    }
  });
});

window.addEventListener("DOMContentLoaded", () => {
    console.log("Drag and drop container loaded");

    // Select the image boxes, text boxes, white boxes, and reset button
    const imgboxes = document.querySelectorAll(".imgbox");
    const textboxes = document.querySelectorAll(".textbox");
    const whiteboxes = document.querySelectorAll(".whitebox");
    const resetButton = document.querySelector(".reset-button");
    let initialParent = null;
    let initialPosition = { x: 0, y: 0 };

    // Function to handle drag start event
    const handleDragStart = (e) => {
      console.log("Drag start");
      e.target.classList.add("hold");
      setTimeout(() => {
        e.target.classList.add("hide");
      }, 0);

      initialParent = e.target.parentElement;
      initialPosition.x = e.clientX;
      initialPosition.y = e.clientY;
    };

    // Function to handle drag end event
    const handleDragEnd = (e) => {
      console.log("Drag end");
      e.target.className = e.target.classList.contains("imgbox")
        ? "imgbox"
        : "textbox";
    };

    // Add drag event listeners to image boxes
    imgboxes.forEach((imgbox) => {
      imgbox.addEventListener("dragstart", handleDragStart);
      imgbox.addEventListener("dragend", handleDragEnd);
    });

    // Add drag event listeners to text boxes
    textboxes.forEach((textbox) => {
      textbox.addEventListener("dragstart", handleDragStart);
      textbox.addEventListener("dragend", handleDragEnd);
    });

    // Add drop event listeners to white boxes
    whiteboxes.forEach((whitebox) => {
      whitebox.addEventListener("dragover", (e) => {
        console.log("Drag over");
        e.preventDefault();
      });

      whitebox.addEventListener("dragenter", (e) => {
        console.log("Drag enter");
        e.target.classList.add("dashed");
      });

      whitebox.addEventListener("dragleave", (e) => {
        console.log("Drag leave");
        e.target.classList.remove("dashed");
      });

      whitebox.addEventListener("drop", (e) => {
        console.log("Drop");
        const element = document.querySelector(".hold");
        e.target.append(element);
        e.target.classList.remove("dashed");

        // Check if the dropped item is in the second container
        const secondContainer = document.querySelector(
          ".whitebox:nth-child(2)"
        );
        if (e.target === secondContainer) {
          // Update the UI or display a success message
          alert("Item successfully dropped into the second container!");
        }
      });
    });

    // Reset button click event listener
    resetButton.addEventListener("click", () => {
      console.log("Resetting to initial position");
      const elements = document.querySelectorAll(
        ".whitebox > .imgbox, .whitebox > .textbox"
      );
      elements.forEach((element) => {
        initialParent.appendChild(element);
        element.style.left = "0";
        element.style.top = "0";
      });
    });
  });
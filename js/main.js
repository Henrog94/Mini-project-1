/* =========================================
   GUIDE ACCORDION
========================================= */

const guideButtons =
    document.querySelectorAll(
        ".guide-question"
    );


guideButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            const answer =
                button.nextElementSibling;


            if (
                answer.style.display === "block"
            ) {

                answer.style.display = "none";

            } else {

                answer.style.display = "block";

            }

        }
    );

});
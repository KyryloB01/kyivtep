(function () {
    "use strict";

    function wireForm(formId, subjectText) {
        var form = document.getElementById(formId);
        if (!form) {
            return;
        }

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            var submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.dataset.originalText = submitBtn.textContent;
                submitBtn.textContent = "Надсилаємо...";
            }

            var formData = new FormData(form);
            formData.set("_subject", subjectText);
            formData.set("_captcha", "false");

            fetch("https://formsubmit.co/ajax/kyivtep@gmail.com", {
                method: "POST",
                headers: {
                    Accept: "application/json"
                },
                body: formData
            })
                .then(function (response) {
                    if (!response.ok) {
                        throw new Error("FormSubmit error");
                    }
                    return response.json();
                })
                .then(function () {
                    window.location.href = "thankyou.html";
                })
                .catch(function () {
                    alert("Не вдалося надіслати форму. Спробуйте ще раз.");
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = submitBtn.dataset.originalText || "Надіслати";
                    }
                });
        });
    }

    wireForm("contactForm", "Нове повідомлення з форми контактів");
    wireForm("surveyForm", "Нова заявка з опитувального листа");
})();

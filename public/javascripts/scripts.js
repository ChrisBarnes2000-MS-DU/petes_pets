if (document.querySelector("#new-pet")) {
  document.querySelector("#new-pet").addEventListener("submit", (e) => {
    e.preventDefault();

    var form = document.getElementById("new-pet");
    var pet = new FormData(form);

    // Assign the multipart/form-data headers to axios does a proper post
    axios
      .post("/pets", pet, {
        headers: {
          "Content-Type": "multipart/form-data;",
        },
      })
      .then(function (response) {
        window.location.replace(`/pets/${response.data.pet._id}`);
      })
      .catch(function (error) {
        const alert = document.getElementById("alert");
        alert.classList.add("alert-warning");
        (alert.textContent =
          "Oops, something went wrong saving your pet. Please check your information and try again.\n"),
          error.message;
        alert.style.display = "block";
        setTimeout(() => {
          alert.style.display = "none";
          alert.classList.remove("alert-warning");
        }, 3000);
      });
  });
}

$("#time").click(function () {
  var time = new Date();
  $("#purchasedAt").val(time.toDateString());
});

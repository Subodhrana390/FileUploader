document.addEventListener("DOMContentLoaded", function () {
  const uploadButton = document.getElementById("upload-button");
  const fileInput = document.getElementById("file-input");
  const messageStatus = document.getElementById("message-status");

  uploadButton.addEventListener("click", function () {
    fileInput.click();
  });

  fileInput.addEventListener("change", function () {
    const file = fileInput.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      // Replace 'YOUR_DISCORD_WEBHOOK_URL' with your actual Discord webhook URL.
      const webhookURL =
        "https://discord.com/api/webhooks/1165187679869218816/CUUL1-mDahA-qLXZu6UWNimmJVZC7ayP3OvSKB46kitihTTL9J4gozSQZlIYIoGXUj-R";

      fetch(webhookURL, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            createNotification(
              "File uploaded and sent to Discord successfully."
            );
          } else {
            createNotification("Failed to send the file to Discord");
          }
        })
        .catch((error) => {
          console.error(error);
          messageStatus.innerText =
            "An error occurred while sending the file to Discord.";
        });
    }
  });
});

function createNotification(message) {
  const notification = document.createElement("div");
  notification.classList.add("notification");
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(function () {
    document.body.removeChild(notification);
  }, 2000); // 2000 milliseconds (2 seconds)
}

document
  .getElementById("show-notification")
  .addEventListener("click", function () {
    createNotification("This notification will close in 2 seconds.");
  });

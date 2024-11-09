// notifications.js
import {
  getDatabase,
  ref,
  push,
  set,
  get,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Firebase Initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyDdZDK-BrKpSA-BIzPory1HG9Kljr3m7PI",
  authDomain: "saveplate-c246d.firebaseapp.com",
  projectId: "saveplate-c246d",
  storageBucket: "saveplate-c246d.firebasestorage.app",
  messagingSenderId: "120081276324",
  appId: "1:120081276324:web:16985cfc7662a80502b531",
  measurementId: "G-75P3TNTKK7",
  databaseURL: "https://saveplate-c246d-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export async function postNotification(
  userId,
  message,
  senderId = null,
  itemName = null
) {
  try {
    const notificationsRef = ref(database, `notifications/${userId}`);
    const newNotificationRef = push(notificationsRef);

    // Construct the notification data, including only the values that are provided
    const notificationData = {
      message: message,
      timestamp: new Date().toISOString(),
      status: "unread",
    };

    if (senderId) {
      notificationData.senderId = senderId;
    }

    if (itemName) {
      notificationData.itemName = itemName;
    }

    console.log("Notification successfully posted for receiver:", userId);

    await set(newNotificationRef, notificationData);
  } catch (error) {
    console.error("Error posting notification: ", error);
  }
}

window.postNotification = postNotification;

// Function to fetch and display notifications

export async function fetchNotifications(userId, containerElement) {
  try {
    const notificationsRef = ref(database, `notifications/${userId}`);
    const snapshot = await get(notificationsRef);

    if (snapshot.exists()) {
      containerElement.innerHTML = ""; // Clear previous notifications
      snapshot.forEach((childSnapshot) => {
        const notification = childSnapshot.val();
        const notificationElement = document.createElement("div");
        notificationElement.classList.add("notification-item");

        notificationElement.innerHTML = `
            <div class="notification-title">New Notification</div>
            <div class="notification-message">${notification.message}</div>
            <div class="notification-timestamp">${new Date(
              notification.timestamp
            ).toLocaleString()}</div>
          `;
        containerElement.appendChild(notificationElement);
      });
    } else {
      containerElement.innerHTML = "<p>No notifications available.</p>";
    }
  } catch (error) {
    console.error("Error fetching notifications:", error);
  }
}

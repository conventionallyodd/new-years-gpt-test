<template>
    <div class="app">
        <header class="app-header">
            Countdown to New Year!
        </header>
        <div class="countdown">
            <div v-for="time in times" :key="time.label" class="time-section">
                <span class="time-value">{{ time.value }}</span>
                <span class="time-label">{{ time.label }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";

export default {
    name: "App",
    setup() {
        const times = ref([
            { label: "Days", value: 0 },
            { label: "Hours", value: 0 },
            { label: "Minutes", value: 0 },
            { label: "Seconds", value: 0 },
        ]);

        function updateCountdown() {
            const now = new Date();
            const newYear = new Date(`January 1, ${now.getFullYear() + 1} 00:00:00`);
            const diff = newYear - now;

            // Calculate time components
            times.value[0].value = Math.floor(diff / (1000 * 60 * 60 * 24)); // days
            times.value[1].value = Math.floor((diff / (1000 * 60 * 60)) % 24); // hours
            times.value[2].value = Math.floor((diff / 1000 / 60) % 60); // minutes
            times.value[3].value = Math.floor((diff / 1000) % 60); // seconds
        }

        // Update countdown every second
        let intervalId;
        onMounted(() => {
            updateCountdown();
            intervalId = setInterval(updateCountdown, 1000);
        });

        // Clear interval when component unmounts to prevent memory leaks
        onUnmounted(() => {
            clearInterval(intervalId);
        });

        return { times };
    },
};
</script>

  <style>
  /* Add your CSS styling here */
  .app {
  font-family: 'Arial', sans-serif;
  text-align: center;
  color: white;
  background-color: #333; /* Dark background for contrast */
}

.app-header {
  background-color: #444;
  padding: 10px;
  font-size: 24px;
  color: #ddd;
}

.countdown {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.time-section {
  margin: 0 10px;
}

.time-value {
  font-size: 56px;
  line-height: 1;
}

.time-label {
  display: block;
  font-size: 18px;
}

  /* Continue styling... */
  </style>

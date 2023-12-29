<template>
    <div class="app">
        <header class="app-header">
            Upcoming New Year's Countdowns (Top Group with Details)
        </header>
        <div v-for="(group, index) in groupedTimezones" :key="group.timeUntilNewYear" class="grouped-timezone-countdown">
            <!-- Display the first group with expansion panels for each timezone -->
            <div v-if="index === 0">
                <div class="top-group">
                    {{ group.countdown.days }} days, {{ group.countdown.hours }} hours, {{ group.countdown.minutes }} minutes, {{ group.countdown.seconds }} seconds
                </div>
                <v-expansion-panels>
                    <v-expansion-panel v-for="name in group.names" :key="name">
                        <v-expansion-panel-title>{{ name }}</v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <!-- Content for expandable menu; to be defined later -->
                            More options and additional information for {{ name }}...
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </div>

            <!-- Display remaining groups without expansion panels -->
            <div v-else>
                <div class="timezone-names">{{ group.names.join(', ') }}</div>
                <div class="countdown-timer">
                    {{ group.countdown.days }} days,
                    {{ group.countdown.hours }} hours,
                    {{ group.countdown.minutes }} minutes,
                    {{ group.countdown.seconds }} seconds
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment-timezone";
import { ref, reactive, computed, onMounted, onUnmounted } from "vue";

export default {
    name: "App",
    setup() {
        const timezones = ref(moment.tz.names()); // all timezones
        const countdowns = reactive({}); // reactive object to hold countdowns

        // Calculate countdown for a specific timezone
        function calculateCountdown(timezone) {
            const newYear = moment.tz("2024-01-01 00:00", timezone);
            const now = moment.tz(timezone);
            const duration = moment.duration(newYear.diff(now));

            return {
                days: duration.days(),
                hours: duration.hours(),
                minutes: duration.minutes(),
                seconds: duration.seconds(),
                timeUntilNewYear: newYear.diff(now), // total milliseconds until New Year
            };
        }

        // Initialize countdowns for all timezones
        for (const zone of timezones.value) {
            countdowns[zone] = calculateCountdown(zone);
        }

        // Group timezones by the countdown time
        const groupedTimezones = computed(() => {
            const groups = {};
            for (const zone of timezones.value) {
                const countdown = countdowns[zone];
                // Create a unique key for the group
                const timeKey = `${countdown.days}:${countdown.hours}:${countdown.minutes}:${countdown.seconds}`;
                // Skip past New Year's events
                // eslint-disable-next-line no-continue
                if (countdown.timeUntilNewYear < 0) continue;
                if (!groups[timeKey]) {
                    groups[timeKey] = { names: [], countdown, timeUntilNewYear: countdown.timeUntilNewYear };
                }
                groups[timeKey].names.push(zone);
            }
            // Convert the groups object into an array, sort by time until New Year, and take the first 3
            return Object.values(groups)
                .sort((a, b) => a.timeUntilNewYear - b.timeUntilNewYear)
                .slice(0, 3);
        });

        // Update countdown every second
        let intervalId;
        onMounted(() => {
            intervalId = setInterval(() => {
                for (const zone of timezones.value) {
                    countdowns[zone] = calculateCountdown(zone); // update each countdown
                }
            }, 1000);
        });

        // Clear interval when component unmounts
        onUnmounted(() => {
            clearInterval(intervalId);
        });

        return { groupedTimezones };
    },
};
</script>

  <style>
/* General Styles */
.app {
  font-family: Arial, sans-serif;
  color: #333;
  max-width: 800px;
  margin: 0 auto;
}

.app-header {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 20px;
}

/* Grouped Timezone Countdown Styles */
.grouped-timezone-countdown {
  border-bottom: 1px solid #ccc;
  padding: 20px;
  transition: background-color 0.3s;
}

.grouped-timezone-countdown:hover {
  background-color: #f9f9f9;
}

/* First Group Emphasis */
.grouped-timezone-countdown:first-child {
  font-size: 1.5rem; /* Larger Font */
  background-color: #e8e8e8; /* Different background */
}

/* Countdown Timer Styles */
.countdown-timer {
  font-size: 3rem;
  font-weight: bold;
  margin: 10px 0;
}

/* Timezone Names List */
.timezone-names {
  font-size: 1.2rem;
  margin-bottom: 10px;
  display: block; /* Makes it easier to style individual names later */
}

/* Expandable Menu Placeholder */
.expandable-menu {
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;
  user-select: none;
}

.expandable-menu:not(:last-child) {
  border-bottom: none;
}

/* Hidden initially */
.expandable-content {
  display: none;
  padding: 10px;
  border-top: 1px solid #ddd;
}

/* Show content when .expandable-menu is clicked */
.expandable-menu.active + .expandable-content {
  display: block;
}

/* Interactive Items */
.interactive-item {
  cursor: pointer;
  user-select: none;
}

.top-group {
  font-size: 1.5rem; /* Larger font size for the top group */
  margin-bottom: 20px;
}
  </style>

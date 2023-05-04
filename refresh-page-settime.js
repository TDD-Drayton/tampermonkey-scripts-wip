// ==UserScript==
// @name         Auto Refresh with Time Option
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Automatically refreshes the page at a set interval or time of day.
// @match        https://example.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    // Set the refresh interval (in milliseconds)
    const refreshInterval = 15000; // 15 seconds
    
    // Set the time to refresh the page (24-hour format)
    const refreshTime = '14:30'; // 2:30 PM
    
    // Get the current time
    const currentTime = new Date();
    
    // Set the time to refresh the page as a Date object
    const refreshDate = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), refreshTime.split(':')[0], refreshTime.split(':')[1]);
    
    // Calculate the time until the next refresh
    let timeUntilRefresh = refreshDate.getTime() - currentTime.getTime();
    if (timeUntilRefresh < 0) {
        // The refresh time has already passed today, so set it for tomorrow
        timeUntilRefresh += 86400000; // 24 hours in milliseconds
    }
    
    // If both refresh interval and specific time are set, use the refresh interval and ignore the specific time
    if (refreshInterval && !isNaN(refreshInterval)) {
        setInterval(function() {
            window.location.reload();
        }, refreshInterval);
    } else if (refreshTime) {
        // Otherwise, use the specific time to refresh the page
        setTimeout(function() {
            window.location.reload();
        }, timeUntilRefresh);
    }
})();
const reporter = require('multiple-cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const reportDir = `reports/cucumber-report-${timestamp}`;

reporter.generate({
    // Directory with Cucumber JSON files
    jsonDir: 'cucumber-json',
    reportPath: reportDir,
    metadata: {
        browser: {
            name: 'chrome',
            version: 'XX',
        },
        device: 'Local test machine',
        platform: {
            name: 'windows',
            version: '11'
        }
    },
});

console.log(`Report generated at: ${reportDir}`);
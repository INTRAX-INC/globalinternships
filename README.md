# globalinternships
Intrax Global Internships

To test tagged versions, set versions to prerelease option.

Look for these on webflow at the page J1-Visa Pricing & Eligibility within the embedded script

https://cdn.jsdelivr.net/gh/intrax-inc/globalinternships@{put your version in}

ex: https://cdn.jsdelivr.net/gh/intrax-inc/globalinternships@1.1.21/js/j1_calculator/j1_calculator.min.js and try it on the browser

if it looks good on development, change everything back to https://cdn.jsdelivr.net/gh/intrax-inc/globalinternships@latest/js/j1_calculator/j1_calculator.min.js. This would be updated when the cdn's cache is refreshed which means you have to wait. 

If you need a hotfix, just use a specific version like @1.1.21 everywhere in the code and the webflow script instead of using @latest. Currently the code is using a specific version instead of latest due to a hot fix. 


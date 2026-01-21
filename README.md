# globalinternships
Intrax Global Internships

To test tagged versions, set versions to prerelease option.

Look for these on webflow at the page J1-Visa Pricing & Eligibility within the embedded script

https://cdn.jsdelivr.net/gh/intrax-inc/globalinternships@{put your version in}

ex: https://cdn.jsdelivr.net/gh/intrax-inc/globalinternships@1.1.21/js/j1_calculator/j1_calculator.min.js and try it on the browser

if it looks good on development, change everything back to https://cdn.jsdelivr.net/gh/intrax-inc/globalinternships@latest/js/j1_calculator/j1_calculator.min.js. This would be updated when the cdn's cache is refreshed which means you have to wait. 

If you need a hotfix, just use a specific version like @1.1.21 everywhere in the code and the webflow script instead of using @latest. Currently the code is using a specific version instead of latest due to a hot fix. - Added December 5th, 2024. 

Still on github since it is not easy to use a cdn with bitbucket. 

#program_calculator (program_calculator.min.js)
Purpose: Program pricing calculator for origin-to-destination programs
Data source: CSV file (premium_prices.csv) with origin country → destination country combinations
UI: Two selectors — "Country of Residence" (origin) and "Destination"
Mentions "Internship Placement" in the "What's Included" lists
Container: #program-calculator
Shows fixed prices for origin/destination combinations

#j1_calculator (j1_calculator.min.js)
Purpose: J1 visa pricing calculator based on duration
Data source: JavaScript pricebook (j1_calculator_pricebook.js) with regional pricing
UI: One selector for "Country of Residence" + duration selector (months)
Mentions "(only available to trainees)" for durations > 12 months
Container: #j1-calculator
Calculates prices dynamically based on base price + monthly fees

For the future if the intern and trainee prices need to be updated and displayed on the site, then the j1_calculator.js file needs to be updated and the intrax/j1visa-pricing-eligibility page needs more html elements with ids to add in the extra trainee price and exclude the intern prices when the duration selected is greater than 12 since it won't apply to interns who at most work from 1 - 12 months. Right now only 1 price is displayed on globalinterships.com for J-1 Visa pricing calculator. 

The current version is 1.1.27. The working version before 01/21/2026 was 1.1.23.
For the file js/j1_calculator/j1_calculator.js, you need to change globalinternships@------- so that the pricebook will point to the latest version 
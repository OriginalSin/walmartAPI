# Walmart API Search tool #
*A tool for searching Walmart products using the Walmart API*
# Install #
Upon downloading the repository, open up terminal and run ``` npm install ```.
### Then ###
Run ``` npm run webpack ```.
### Then ###
Run ``` open index.html ```.
## *Query* ##
The only required text input. This field defines your query.
## Brand Name ##
Filling in this field will only return results associated with a certain brand.
## *Results* ##
Filling in this field will define a certain number of results. The API's maximum number is 25, but if a number higher than 25 is specified, the script will run and concatenate as many results as needed to reach the desired target length. The default value is 25.  
## *Start* ##
The starting index of the request to the API.
## *Sorted By* ##
This field defines the sorting method that results are returned.
## *Search* ##
Filling in this input will dynamically search through the rendered results showing only results with matching names.
## *Tabs* ##
The table header will sort results by tab if the user clicks the tab. If the tab is clicked again it will reverse the order by which the results are sorted.
## *Brand* ##
Upon clicked the empty brand cell, a suggested brand name will populate the input. The brand name will only save to the product only when the save button is clicked. Additionally, upon clicking the save button, the product will be saved to localStorage and persist through browsing sessions.
## *X* ##
The x button will clear the result from the DOM. Additionally, if the brand input has been filled, the item will be cleared from localStorage.

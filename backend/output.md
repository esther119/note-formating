# How to effectively reuse old backend endpoints?

## Problem
It's really a big pain to see through all the variables and see how to reuse their sub functions in their main functions.

### Rules of thumbs

1. **List out input and output:**
	* List out all the variables for their endpoints and inner subfunctions
2. **Map and compare data structures:**
	* Compare how the variables change in my scenario
3. **Decision making:**
	* Modify my data structure to adapt to the code: where else can I get the data?
	* Modify the existing code
	* Create a new endpoint
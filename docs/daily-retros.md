# Daily Retros


## Thursday 09/22/22
- Today I created:

### Thoughts:
- How exactly do I want to design the class-to-class interaction?
     - I feel like the traveler  (from the traveler class) can call a method from any class
     - I feel like the Trips class can call in information from the Destinations class, 
         - Like: trips needs to have the destination's  `estimatedFlightCostPerPerson` values in order to calculate how much a traveler has paid per number of travelers
    - When I instantiate Destinations class I will instantiate with the paramter of just the data and not a specific id
         - The thinking behind this being that the destinations class will simply serve as a library, and at the library, we either check in or check out for reference
         

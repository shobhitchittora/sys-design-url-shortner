## DESING for URL shortener

### Use cases to cover
```
 1. URL -> Short URL
 2. Redirect Short URLs
 3. Custom URLs
 4. Availablity

  ---- Extras 

 1. Analytics
 2. Automatic URL expiration / removal
 3. Manual URL removal
 4. UI and / or API
```

 ### Estimations

 Our goal is to have some estimates for the following two bottlenecks for the system - 
```
 1. Amount of traffic on the service.
 2. Amount of data to store and work on.
```

### Traffic calculation

 - Assuming the main usage of URL shortners is done on Twitter ( due to the char limits on a tweet ), we can safely take the total number of tweets on Twitter as a starting point for our estimations.

      `Tweets per month on Twitter =  15 Billion ( per month )`

 - Also assuming every 10th tweet are read through a shortened URL while the rest are read via usual links, we have - 

      `URLs handled by URL shortening services = 1.5 Billion ( per month )`

 - Using the 80-20 rule, we can assume that 80% of the traffic goes to the top 3 URL shortening websites while 20% is left for other services ( including ours ).
      ` URLs handled by site not in top 3 = 300 Million`

 - Further being optimitic and considering future growth, we can assume that a 3rd of the traffic left will actually be handled by our site.
      `URLs left for our site =  100 Million ( per month )`

 - Let's assume that a URLs typical life on our service is aroung 10 days. Also assume that on an average a URL is used at leat once a day for that period of time. This give us - 

      `Requests to handle = 100 Million * 10 * 1 = 1 Billion requests ( per month )`

      Out of this 1 Billion, `100 Million` requests will be for shortening and rest `900 Million` will be redirects. ( Using our assumption before ) 

 - Thus the per second request rate is - 

    `1 Billion / 30 / 24 / 3600 = 400 req ( per second )`
    
    Out of this `40 reqests` are for new URLs while `360 requests` are redirects.
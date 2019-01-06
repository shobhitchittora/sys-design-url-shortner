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


### Data storage calculation

 - Assuming we want to plan head for the next 5 years of running our service, we can see the total URL we would end up storing will be around - 

     ` URLs to store in 5 years = 5 * 12 * 100 Million(new URLs each month) = 6 Billion URLs`
 
 - Let's assume an average URL to be of 500 characters long. Therefore - 

     ` URL size = 500 Bytes`

 - The hash which for now will contain characters - [a-z A-Z 0-9], will have possible 62 characters to represent. And since we'll be handling `6 Billion` URLs for 5 years, we'd need to account for identifying them all uniquely. Thus 

   `x ^ 62 > 6 * 10^9` <br/>
   `x = 6`

   Thus we'd need 6 character long hashes to uniquely identify 6 Billion URLs, using the char set [a-z A-Z 0-9].

 - Finally the total storage size comes around - 

   ` (500+6) * 6 * 10^9 = 3 TB + 36 GB` 

   Thus `3TB` of storage is required for the URLs themselves and `36GB` for the hashes.

 - Converting the same to per second storage requirements - 

   `Write per second = (500 + 6 ) * 40 = 20 KB` <br/>
   `Reads per second = (500 + 6 ) * 360 = 180 KB` 

## Bottlenecks 


**Traffic** -> `400 req / sec` ( Okay to handle ) <br/>
**Storage** -> `3TB data for 5 years` ( Handling large data over time to will slow the system down )

# HTTP and HEADERS

REQUEST BEGINS WITH HTTP VERB, LIKE `GET` OR `HEAD`

HEADERS ARE LIKE KEY VALUE PAIRS

**SENDING GET REQUEST TO `google.com` WITH NETCAT** (MAKE SURE TO PRESS ENTER TWICE AFTER HEADER)

WE ARE SENDING REQUEST ON PORT 80, ON PATH /

WE DEFINED Host HEADER AND PRESSED ENTER TWO TIMES

```
nc google.com 80
GET / HTTP/1.O
Host: google.com
```
WHY WE USE Host HEADER ANYWAYS?

MAYBE THERE ARE MULTIPLE HOSTS AND MEYBE THERE ARE LOAD BALANCER ON PORT 80 WHO WOULD THEN FORWARD OUR REQUEST TO THE RIGHT HOST

THIS REQUEST WE MADE WILL RESULT IN 301 RESPONSE, SO THAT'S A REDIRECT

YOU WILL GET BUNCH OF HEADERS

## LETS TRY GETTING FAVICON INSTEAD OF /

```
nc google.com 80
GET /favicon.ico HTTP/1.O
Host: google.com
``` 
I WASN'T SUCCESSFUL

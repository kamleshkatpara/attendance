# attendance

Endpoints:

1) addUser : 
        
       http://localhost:3000/user/create

       parameters: { "userid": 7, "name": "John" }


2) getUser : 

       http://localhost:3000/user/7


3) setAttendance : 

       http://localhost:3000/attendance/set

       paramaters : { "userid": 7 }
  

4) getAttendance: 

       http://localhost:3000/attendance/get

       parameters: { "userid": 7, "timestamp": "2019-09-20" }

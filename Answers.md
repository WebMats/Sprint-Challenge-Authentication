Q1. What is the purpose of using sessions?
    ANS: We use sessions to keep track of authetication and authorization in our backend.
    We put cookies in a users req, which is then sent upon every request.

Q2. What does bcrypt do to help us store passwords in a secure manner.
    ANS: bcrypt is a library that helps us hash and salt the passwords that our users provide.
    It also reiterates the algorithm so brute force attaks (off/on line) will be harder.

Q3. What does bcrypt do to slow down attackers?
    ANS: bcrypt uses a 2^n reiterative hash, to elongate the time it takes to hash a password.

Q4. What are the three parts of the JSON Web Token?
    ANS: 
        1 - The header: tells us about the algorithm used and the type of token.
        2 - The payload: the information that we put into the encryption algorithm.
        3 - The signature: the part that tries to ensures that our web token is not 
        changed. signature = < secret > + < payload + header>
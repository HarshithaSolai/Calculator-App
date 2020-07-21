# MailerQ - Javascript Developer Assignment - Calculator 

## Technology Used : HTML, CSS, Vanilla Javascript

Functionality : 

1. Basic arithmetic operations like addition, substraction, multiplication and division.

2. Memory operations like storing into memory cell, removing from memory and clearing memory.

3. Basic trignometry operations like finding sin, cos and tan of the given degree



calc.js file has the following updates :

1. Calculator Class contains all the calculator properties and calculator methods.

2. Multiple storage memory cells. Stack (Array) is used to storage multiple values. 

*  MR reads the last element in the stack 
*  M- removes the last element in the stack 
*  M+ pushes new element at the last 
*  MC clears the memory 
*  If memory is empty, MR returns 'Memory Empty'

3. Expressions with ( and ) can be used 

4. Polynomials are supported

Eg : If you want to compute 6x^2 + 2y + 1 where x = 2 and y = 3

Steps : 

1. Click 6 * x^ 
2. Click << 3 times to remove b,p and Click 2,2 (Since x = 2, power = 2)
3. Click ) + 2 * 3 + 1
4. Click =


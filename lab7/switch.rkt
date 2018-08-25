#lang racket

(define-syntax switch
  (syntax-rules ()
    [(switch x (val exp)) exp]
    [(switch x [val exp] rest ...)
     (if (eqv? x val)
         exp
         (switch x rest ...))]))

(define x 6)
(switch x
[3 (displayln "x is 3")]
[4 (displayln "x is 4")]
[5 (displayln "x is 5")]
[default (displayln "none of the above")])
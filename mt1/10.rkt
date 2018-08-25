#lang racket

(define (mult-all lst)
  (helper 1 lst))

(define (helper mult lst)
  (cond [(empty? lst) mult]
        [else (helper (* mult (car lst)) (cdr lst))]))

(mult-all '(2 3 5)) ;; evaluates to 30

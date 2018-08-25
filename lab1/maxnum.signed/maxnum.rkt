#lang racket
(provide max-num)
(define (max-num lst)
  (define (helper lst max)
    (if (null? max) ; first run
        (helper (cdr lst) (car lst)) ; first call
        (if (null? lst) ; else
            max ; then end
            (if (> (car lst) max) ; else compare
                (helper (cdr lst) (car lst)) ; then update max
                (helper (cdr lst) max))))) ; else keep max
  (if (null? lst)
      #f ; then Error
      (helper lst '())) ; else run helper
  )
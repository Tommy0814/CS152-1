#lang racket

; Nicholas Gadjali Midterm 1 Q11

(define (numbers? lst)
  (cond [(empty? lst) #t]
        [(number? (car lst)) (numbers? (cdr lst))]
        [else #f]))

(define (sorted-d? lst)
  (if (empty? lst)
      #t
      (des (car lst) (cdr lst))))

(define (des cur lst)
  (cond [(empty? lst) #t]
        [(< cur (car lst)) #f]
        [else (des (car lst) (cdr lst))]))

(define/contract (sort-descending lst)
  (-> (and/c list? numbers?) sorted-d?)
  (sort lst (λ (x y) (> x y))))

(sort-descending '(1 99 3 2 45 6 -1 5 0 2))
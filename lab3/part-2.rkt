#lang racket

(define (full-name first last)
  (map (λ (f l) (string-append f " " l)) first last))

(full-name '("Thomas" "Jack" "Bob" "Nicholas") '("Austin" "Mccliney" "Ross" "Gadjali"))
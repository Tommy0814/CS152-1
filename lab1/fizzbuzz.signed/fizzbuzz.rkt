#lang racket
(provide fizzbuzz)

;; The function counts from 1 to the specified number, printing a string with the result.
;; The rules are:
;;    If a number is divisible by 3 and by 5, instead say "fizzbuzz"
;;    Else if a number is divisible by 3, instead say "fizz"
;;    Else if a number is divisible by 5, instead say "buzz"
;;    Otherwise say the number
;;
(define (fizzbuzz n)
  (define (helper s c n) ; string/current/number
    (cond [(= 0 (modulo c 3)) (if (= 0 (modulo c 5))
                                  (set! s (string-append s "fizzbuzz ")) ; fizzbuzz
                                  (set! s (string-append s "fizz ")))] ; fizz
          [(= 0 (modulo c 5)) (set! s (string-append s "buzz "))] ; buzz
          [else (set! s (string-append s (number->string c) " "))]) ; number
    (cond [(= c n) s] ; return
          [else (helper s (+ c 1) n)])) ; recurse
  
  (if (> n 0)
      (helper "" 1 n)
      #f))

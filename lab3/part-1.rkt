#lang racket

(define (string-to-nums list)
  (map string->number list))

(string-to-nums '("1" "2"))
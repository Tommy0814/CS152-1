#lang racket

(define-syntax-rule (if-mac c thn els)
(if c thn els))

(define (if-fun c thn els)
(if c thn els))

(if-mac #t (displayln 1) (displayln 0))
(if-fun #t (displayln 1) (displayln 0))
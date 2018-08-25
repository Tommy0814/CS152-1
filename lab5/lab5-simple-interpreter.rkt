#lang racket

;; Expressions in the language
(struct b-val (val))
(struct b-if (c thn els))
(struct succ (n))
(struct pred (n))

;; Main evaluate method
(define (evaluate prog)
  (match prog
    [(struct b-val (v)) v]
    [(struct b-if (c thn els))
     (if (evaluate c)
         (evaluate thn)
         (evaluate els))]
    [(struct succ (n)) (+ (evaluate n) 1)]
    [(struct pred (n)) (- (evaluate n) 1)];
    [_ (error "Unrecognized expression")]))

(evaluate (b-val #t))
(evaluate (b-val #f))
(evaluate (b-if (b-val #t)
                (b-if (b-val #f) (b-val #t) (b-val #f))
                (b-val #f)))

(evaluate (succ (b-val 1)))
(evaluate (succ (succ (b-val 7))))
(evaluate (pred (b-val 5)))
(evaluate (succ (b-if (b-val #t)
                      (b-val 42)
                      (b-val 0))))

;; Consider the following sample programs for extending the interpreter
; succ 1  =>  returns 2
; succ (succ 7) => returns 9
; pred 5 => returns 4
; succ (if true then 42 else 0) => 43

#lang racket

(require racket/contract)

(struct account (balance))

(provide (contract-out
          [new-account account?]
          [balance (-> account? number?)]
          [withdraw (->i ([the-account account?]
                          [the-amount (the-account) (can-withdraw? the-account)])
                          [result-account account?])]
          [deposit (-> account? (and/c number? positive?) account?)])
          account)

;; A new, empty account
(define new-account (account 0))

;; Get the current balance
(define (balance acc)
  (account-balance acc))

;; Withdraw funds from an account
(define (withdraw acc amt)
  (account (- (account-balance acc) amt)))

;; Add funds to an account
(define (deposit acc amt)
  (account (+ (account-balance acc) amt)))

; contracts
(define (can-withdraw? acc)
  (λ (amt)
    (if (not (number? amt))
        #f
        (if (not (positive? amt))
            #f
            (if (> amt (account-balance acc))
                #f
                #t)))))
          
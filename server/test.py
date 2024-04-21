import stripe

stripe.api_key = "sk_test_51P7kAeP7grGP2YR2VFLsLsJuCdpatdRL8rkOCESo1xEODWEoQ0i7N1lqYUyCrzn2ibIMmjERriAa2ss7knFIcaX000cFAQENhx"

print(stripe.PaymentIntent.create(
    amount=1099,
    currency="usd",
    payment_method_types=["card"],
    metadata={"order_id": "6735"},
))
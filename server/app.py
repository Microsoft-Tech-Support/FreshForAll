import flask
import flask_cors
import stripe

stripe.api_key = "sk_test_51P7kAeP7grGP2YR2VFLsLsJuCdpatdRL8rkOCESo1xEODWEoQ0i7N1lqYUyCrzn2ibIMmjERriAa2ss7knFIcaX000cFAQENhx"

app = flask.Flask(__name__)
flask_cors.CORS(app)

@app.route('/getClientKey', methods=["GET"])
def getClientKey():
    key = stripe.PaymentIntent.create(
        amount=1099,
        currency="usd",
        payment_method_types=["card"],
        metadata={"order_id": "6735"}
    ).client_secret

    return flask.jsonify({ "key": key })

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001, debug=True)
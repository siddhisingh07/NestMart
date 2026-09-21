import axios from 'axios'



const loadRazorScript = () => {
    return new Promise((resolve, reject) => {
        if (window.Razorpay) {
            resolve(true)
            return
        }
        const script = document.createElement("script")
        script.src = "https://checkout.razorpay.com/v1/checkout.js"
        script.async = true

        script.onload = () => resolve(true)
        script.onerror = () => reject(new Error("Failed to open razor pay"))


        document.body.appendChild(script)

    })
}


export const handleRazorPay = async (orderId) => {
    console.log("clicked", orderId)
    const razorPay = await loadRazorScript()

    const option = {
        "key": "rzp_test_Teek6GtowOalbD", // Enter the Key ID generated from the Dashboard
        "amount": "50000", // Amount is in currency subunits.
        "currency": "INR",
        "name": "Acme Corp", //your business name
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": async function (response) {
            console.log(response, "response")
            try {
                const res = await axios.post(`http://localhost:3000/api/order/razor-order`, {
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                    orderId
                }, {
                    withCredentials: true,
                });

                if (res.success) {
                    console.log(res.message, "api data", "orderId")
                }
            } catch (error) {
                console.log(error, "error")
            }



            // alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature)
        },
        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
            "name": "<name>", //your customer's name
            "email": "<email>",
            "contact": "<phone>"  //Provide the customer's phone number for better conversion rates 
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#333"
        }
    }


    const razorPaySetup = new window.Razorpay(option)


    razorPaySetup.open()






    return razorPay

}
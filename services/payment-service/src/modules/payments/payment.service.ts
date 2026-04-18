// import { Payment } from "./payment.model";
// import { publishEvent, RMQ_NAMES } from "@repo/rabbitmq";
// import crypto from "crypto";
// import logger from "@repo/logger";
// import { IPayment } from "./payment.model";

// export const processPaymentLogic = async (paymentData: Partial<IPayment>) => {
//   // 1. Record the intent
//   const payment = await Payment.create({
//     ...paymentData,
//     status: "PENDING",
//   });

//   try {
//     // 2. Simulate Gateway logic (e.g., Stripe API call)
//     // In a real app, you'd pass a paymentMethodId from the frontend here
//     const isSuccess = true; 

//     if (isSuccess) {
//       payment.status = "COMPLETED";
//       payment.transactionId = `txn_${crypto.randomBytes(8).toString("hex")}`;
//       await payment.save();

//       // 3. Publish Success - This triggers Order status update and Stock deduction
//       await publishEvent(
//         RMQ_NAMES.getExchange("payment", "payment", "topic"),
//         "payment.success",
//         {
//           event: "payment.success.v1",
//           data: {
//             orderId: payment.orderId,
//             paymentId: payment._id,
//             amount: payment.amount,
//             customerId: payment.customerId
//           },
//           meta: {
//             messageId: crypto.randomUUID(),
//             timestamp: new Date().toISOString(),
//             source: "payment-service",
//             version: 1
//           }
//         }
//       );
//     } else {
//       throw new Error("Gateway declined transaction");
//     }

//     return payment;
//   } catch (error: any) {
//     payment.status = "FAILED";
//     await payment.save();

//     // 4. Publish Failure - This triggers Order cancellation and Stock release
//     await publishEvent(
//       RMQ_NAMES.getExchange("payment", "payment", "topic"),
//       "payment.failed",
//       {
//         event: "payment.failed.v1",
//         data: { orderId: payment.orderId },
//         meta: { source: "payment-service", timestamp: new Date().toISOString() }
//       }
//     );
//     throw error;
//   }
// };


import { stripe, razorpay } from "../../config/gateway";
import { Payment } from "./payment.model";
import { publishEvent, RMQ_NAMES } from "@repo/rabbitmq";
import crypto from "crypto";
import logger from "@repo/logger";

export const createStripeIntent = async (amount: number, currency: string) => {
  try {
    return await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // cents
      currency,
      metadata: { integration_check: "accept_a_payment" },
    });
  } catch (error: any) {
    logger.warn("Stripe API failed or keys missing, using mock response");
    return { id: `pi_mock_${Date.now()}`, status: "requires_payment_method", amount: Math.round(amount * 100), currency };
  }
};

export const createRazorpayOrder = async (amount: number, currency: string) => {
  try {
    return await razorpay.orders.create({
      amount: Math.round(amount * 100), // paise
      currency: "USD",
      receipt: `receipt_${Date.now()}`,
    });
  } catch (error: any) {
    logger.warn("Razorpay API failed or keys missing, using mock response");
    return { id: `order_mock_${Date.now()}`, status: "created", amount: Math.round(amount * 100), currency: "USD" };
  }
};

export const finalizePayment = async (transactionId: string) => {
  const payment = await Payment.findOne({ transactionId });

  if (!payment || payment.status === "COMPLETED") return;

  payment.status = "COMPLETED";
  await payment.save();

  // Notify Order & Stock Services
  await publishEvent(
    RMQ_NAMES.getExchange("payment", "payment", "topic"),
    "payment.success",
    {
      event: "payment.success.v1",
      data: {
        orderId: payment.orderId,
        paymentId: payment._id,
        amount: payment.amount,
      },
      meta: {
        messageId: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        source: "payment-service",
        version: 1,
      },
    }
  );
  
  logger.info({ orderId: payment.orderId }, "💳 Payment Finalized & Event Published");
};
import { Payment } from "./payment.model";
import { publishEvent, RMQ_NAMES } from "@repo/rabbitmq";
import crypto from "crypto";
import logger from "@repo/logger";
import { IPayment } from "./payment.model";

export const processPaymentLogic = async (paymentData: Partial<IPayment>) => {
  // 1. Record the intent
  const payment = await Payment.create({
    ...paymentData,
    status: "PENDING",
  });

  try {
    // 2. Simulate Gateway logic (e.g., Stripe API call)
    // In a real app, you'd pass a paymentMethodId from the frontend here
    const isSuccess = true; 

    if (isSuccess) {
      payment.status = "COMPLETED";
      payment.transactionId = `txn_${crypto.randomBytes(8).toString("hex")}`;
      await payment.save();

      // 3. Publish Success - This triggers Order status update and Stock deduction
      await publishEvent(
        RMQ_NAMES.getExchange("payment", "payment", "topic"),
        "payment.success",
        {
          event: "payment.success.v1",
          data: {
            orderId: payment.orderId,
            paymentId: payment._id,
            amount: payment.amount,
            customerId: payment.customerId
          },
          meta: {
            messageId: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
            source: "payment-service",
            version: 1
          }
        }
      );
    } else {
      throw new Error("Gateway declined transaction");
    }

    return payment;
  } catch (error: any) {
    payment.status = "FAILED";
    await payment.save();

    // 4. Publish Failure - This triggers Order cancellation and Stock release
    await publishEvent(
      RMQ_NAMES.getExchange("payment", "payment", "topic"),
      "payment.failed",
      {
        event: "payment.failed.v1",
        data: { orderId: payment.orderId },
        meta: { source: "payment-service", timestamp: new Date().toISOString() }
      }
    );
    throw error;
  }
};
// app/api/webhook/route.ts

import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

const fulfillOrder = async (session: Stripe.Checkout.Session) => {
  try {
    // Expand all line items with product data
    const expandedSession = await stripe.checkout.sessions.retrieve(
      session.id,
      {
        expand: ["line_items.data.price.product"],
      }
    );
    // Initialize arrays for colors and sizes
    // Initialize arrays for colors, sizes, quantities, titles, and items
    const colors: string[] = [];
    const sizes: string[] = [];
    const quantities: number[] = [];
    const titles: string[] = [];
    const items: Array<{
      _key: string;
      color: string;
      size: string;
      title: string;
      quantity: number;
    }> = [];

    // Iterate through all line items
    if (expandedSession.line_items?.data) {
      for (const item of expandedSession.line_items.data) {
        const product = item.price?.product as Stripe.Product;

        // Collect data for individual items
        if (
          product.metadata.color &&
          product.metadata.size &&
          product.name &&
          item.quantity
        ) {
          const itemData = {
            _key: item.id, // Use item ID as the unique key
            color: product.metadata.color,
            size: product.metadata.size,
            title: product.name,
            quantity: item.quantity,
          };

          // Add to individual arrays
          colors.push(itemData.color);
          sizes.push(itemData.size);
          titles.push(itemData.title);
          quantities.push(itemData.quantity);

          // Add to items array
          items.push(itemData);
        }
      }
    }
    // Create Sanity order document with arrays
    await client.create({
      _type: "order",
      customerName: session.customer_details?.name || "Unknown",
      id: session.id,
      items: items, // Array of items with full details
      address: session.metadata?.address || "Unknown",
      postalCode: session.metadata?.postalCode || "Unknown",
      city: session.metadata?.city || "Unknown",
      amount: session.amount_total ? session.amount_total / 100 : 0,
      method: session.payment_method_types[0],
      currency: session.currency?.toUpperCase() || "USD",
      email: session.customer_details?.email || "Unknown",
      status: session.payment_status,
      message: "Payment Successful",
    });

    console.log("Order saved with color/size arrays");
  } catch (error: any) {
    console.error("Order fulfillment failed:", error);
    throw new Error(`Order processing failed: ${error.message}`);
  }
};

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      webhookSecret
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      await fulfillOrder(session);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }
}

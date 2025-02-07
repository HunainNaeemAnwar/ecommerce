import { urlFor } from "@/sanity/lib/image";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  try {
    const reqBody = await req.json();
    const { items, email, address, postalCode, city } = reqBody;

    // Transforming items to include custom metadata (color and size)
    const transformedItems = items.map((item: any) => {
      const imageUrl =
        item.images && item.images.length > 0
          ? urlFor(item.images[0]).url()
          : "";

      return {
        quantity: item.quantity,
        price_data: {
          currency: "usd",
          unit_amount: item.price * 100, // Convert to cents
          product_data: {
            name: item.title,
            description: `${item.description} - Color: ${item.selectedColor} - Size: ${item.selectedSize}`, // You can include color/size in the description
            images: imageUrl ? [imageUrl] : [],
            metadata: {
              color: item.selectedColor, // Custom metadata for color
              size: item.selectedSize,
              address: address,
              postalCode: postalCode,
              city: city,
              name: item.name, // Custom metadata for size
            },
          },
        },
      };
    });

    // Creating Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: transformedItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      metadata: {
        email,
        address: address,
        postalCode: postalCode,
        city: city,
        name: items.name,
      },
    });

    return NextResponse.json({
      message: "Connection is alive",
      success: true,
      id: session.id,
    });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}

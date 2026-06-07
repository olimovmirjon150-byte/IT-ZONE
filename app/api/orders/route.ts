import axios from "axios";
import { NextResponse } from "next/server";

const API =
  "https://serve.faux-api.com/f92ae21abaa048e1a243f392/orders";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await axios.post(API, body);

    return NextResponse.json(res.data);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Ошибка при создании заказа" },
      { status: 500 }
    );
  }
}
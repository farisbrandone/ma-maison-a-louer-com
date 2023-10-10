import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const name = String(formData.get("name"));
  const address = String(formData.get("address"));
  const radioOption = String(formData.get("radioOption"));
  const MontantApayer = String(formData.get("MontantApayer"));
  const localisationBien = String(formData.get("localisationBien"));
  const devise = String(formData.get("devise"));

  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const email = user?.email;
  console.log(email, name,address,radioOption,MontantApayer,localisationBien, devise)
  const { data, error } = await supabase
    .from("dataLocataire")
    .insert([
      {
        name: name,
        address: address,
        radioOption: radioOption,
        MontantApayer: MontantApayer,
        localisationBien: localisationBien,
        devise: devise,
        email: email,
      },
    ]);

  if (error) {
    console.log(requestUrl.origin);
    return NextResponse.redirect(
      `${requestUrl.origin}/insertDataPage/pageForDataLocat?error=Problème rencontrer, réessayez svp`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    );
  }

  return NextResponse.redirect(
    `${requestUrl.origin}/gotohomepage?message=Vos données ont été envoyé avec success, vous seriez notifier par mail si une offre correspond a vos besoins`,
    {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301,
    }
  );
}

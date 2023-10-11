import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const devise = String(formData.get("devise"));
  const nbreDeChambre = String(formData.get("nbreDeChambre"));
  const nbreDeCuisine = String(formData.get("nbreDeCuisine"));
  const nbreDeSalon = String(formData.get("nbreDeSalon"));
  const nbreDeDouche = String(formData.get("nbreDeDouche"));
  const parking = String(formData.get("parking"));
  const balcon = String(formData.get("balcon"));
  const niveauAppart = String(formData.get("niveauAppart"));
  const longueurTerrain = String(formData.get("longueurTerrain"));
  const largeurTerrain = String(formData.get("largeurTerrain"));
  const typeDoffre = String(formData.get("typeDoffre"));
  const typeOffert = String(formData.get("typeOffert"));
  const localisationPays = String(formData.get("localisationPays"));
  const localisationVille = String(formData.get("localisationVille"));
  const localisationQuartier = String(formData.get("localisationQuartier"));
  const description = String(formData.get("description"));
  const imageFiles = Array(formData.get("imageFile"));
  const montantMensuel = String(formData.get("montantMensuel"));
  const firstPayment = String(formData.get("firstPayment"));
  const caution = String(formData.get("caution"));
  const priceSale = String(formData.get("priceSale"));
  const telephoneNumber = String(formData.get("telephoneNumber"));

  const supabase = createRouteHandlerClient({ cookies });
  const imageFile=imageFiles[0]?.toString().split(",")
 
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const email = user?.email;
  if (email) {
   /*  console.log({
      nbreDeChambre,
      nbreDeCuisine,
      nbreDeSalon,
      nbreDeDouche,
      parking,
      balcon,
      niveauAppart,
      longueurTerrain,
      largeurTerrain,
      typeDoffre,
      typeOffert,
      localisationPays,
      localisationVille,
      localisationQuartier,
      description,
      imageFile,
      montantMensuel,
      firstPayment,
      caution,
      priceSale,
      telephoneNumber,
      email,
      devise,
    }); */
  }
  const { data, error } = await supabase.from('tableDesOffres').insert([
    {
      nbreDeChambre: nbreDeChambre,
       nbreDeCuisine: nbreDeCuisine,
      nbreDeSalon: nbreDeSalon,
      nbreDeDouche: nbreDeDouche,
       parking: parking,
      balcon: balcon,
      niveauAppart: niveauAppart,
      longueurTerrain: longueurTerrain,
      largeurTerrain: largeurTerrain,
      typeDoffre: typeDoffre,
      typeOffert: typeOffert,
      localisationPays: localisationPays,
      localisationVille: localisationVille,
      localisationQuartier: localisationQuartier,
      description: description,
      imageFile: imageFile,
      montantMensuel: montantMensuel,
      firstPayment: firstPayment,
      caution: caution,
      priceSale: priceSale,
      telephoneNumber: telephoneNumber,
      email: email,
      devise: devise,  
    },
  ]).select();

  if (error) {
    console.log("error :", error);
    return NextResponse.redirect(
      `${requestUrl.origin}/insertDataPage/pageForDataProprietaire?error=Problème rencontrer, réessayez svp`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    );
  }

  return NextResponse.redirect(
    `${requestUrl.origin}/gotohomepage?message=Vos données ont été envoyé avec success, vous pouvez faire un filtrage des données pour vous rassurer de la présence de votre offre.`,
    {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301,
    }
  );
}

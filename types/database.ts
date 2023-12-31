export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Chambre: {
        Row: {
          created_at: string | null
          id: string
          nbreDeChambre: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          nbreDeChambre?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          nbreDeChambre?: string | null
        }
        Relationships: []
      }
      dataLocataire: {
        Row: {
          address: string | null
          created_at: string | null
          devise: string | null
          email: string | null
          id: string
          localisationBien: string
          MontantApayer: number
          name: string
          radioOption: string
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          devise?: string | null
          email?: string | null
          id?: string
          localisationBien: string
          MontantApayer: number
          name: string
          radioOption: string
        }
        Update: {
          address?: string | null
          created_at?: string | null
          devise?: string | null
          email?: string | null
          id?: string
          localisationBien?: string
          MontantApayer?: number
          name?: string
          radioOption?: string
        }
        Relationships: []
      }
      tableDesOffres: {
        Row: {
          balcon: string | null
          caution: string | null
          created_at: string | null
          description: string | null
          devise: string | null
          email: string | null
          firstPayment: string | null
          id: string
          imageFile: string[] | null
          largeurTerrain: string | null
          localisationPays: string | null
          localisationQuartier: string | null
          localisationVille: string | null
          longueurTerrain: string | null
          montantMensuel: string | null
          nbreDeChambre: string | null
          nbreDeCuisine: string | null
          nbreDeDouche: string | null
          nbreDeSalon: string | null
          niveauAppart: string | null
          parking: string | null
          priceSale: string | null
          telephoneNumber: string | null
          typeDoffre: string | null
          typeOffert: string | null
        }
        Insert: {
          balcon?: string | null
          caution?: string | null
          created_at?: string | null
          description?: string | null
          devise?: string | null
          email?: string | null
          firstPayment?: string | null
          id?: string
          imageFile?: string[] | null
          largeurTerrain?: string | null
          localisationPays?: string | null
          localisationQuartier?: string | null
          localisationVille?: string | null
          longueurTerrain?: string | null
          montantMensuel?: string | null
          nbreDeChambre?: string | null
          nbreDeCuisine?: string | null
          nbreDeDouche?: string | null
          nbreDeSalon?: string | null
          niveauAppart?: string | null
          parking?: string | null
          priceSale?: string | null
          telephoneNumber?: string | null
          typeDoffre?: string | null
          typeOffert?: string | null
        }
        Update: {
          balcon?: string | null
          caution?: string | null
          created_at?: string | null
          description?: string | null
          devise?: string | null
          email?: string | null
          firstPayment?: string | null
          id?: string
          imageFile?: string[] | null
          largeurTerrain?: string | null
          localisationPays?: string | null
          localisationQuartier?: string | null
          localisationVille?: string | null
          longueurTerrain?: string | null
          montantMensuel?: string | null
          nbreDeChambre?: string | null
          nbreDeCuisine?: string | null
          nbreDeDouche?: string | null
          nbreDeSalon?: string | null
          niveauAppart?: string | null
          parking?: string | null
          priceSale?: string | null
          telephoneNumber?: string | null
          typeDoffre?: string | null
          typeOffert?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

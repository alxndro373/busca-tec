"use client"

import { objectStore } from "@/store/objectStore"
import { useEffect, useState } from "react"
import ObjectsList from "@/components/objects"
import { useSession } from "next-auth/react"
import { getUserWithEmail } from "@/actions/userAction"
import Loader from "@/components/loader"

export default function MyObjects() {
  const [loading, setLoading] = useState<boolean>(true)
  const { recuperateObjectsByUser, objectsByUser } = objectStore()
  const { data: session } = useSession()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        if (session?.user?.email) {
          const user = await getUserWithEmail(session.user.email)
          if (user[0]?.id_user) {
            await recuperateObjectsByUser(user[0]?.id_user)
          }
        }
      } catch (error) {
        console.error("Error al recuperar los objetos:", error)
      } finally {
        setLoading(false)
      }
    }

    // Verificar si ya se hizo la recarga antes
    if (!localStorage.getItem("pageReloaded")) {
      localStorage.setItem("pageReloaded", "true")  // Marcar que ya se hizo la recarga
      window.location.reload()  // Recargar la página solo una vez
    } else {
      // Si ya se recargó, solo cargar los datos
      if (session?.user?.email) {
        fetchData()
      }
    }
  }, [session?.user?.email, recuperateObjectsByUser])

  return (
    <main>
      <h1 className="bg-blue-950 text-white text-4xl font-bold py-14 text-center mb-5">
        Mis objetos
      </h1>

      {loading ? (
        <Loader />
      ) : objectsByUser.length > 0 ? (
        <ObjectsList
          objects={objectsByUser}
          buttonText="Reclamado"
          option="usuario"
        />
      ) : (
        <p className="text-center">No tienes objetos publicados</p>
      )}
    </main>
  )
}

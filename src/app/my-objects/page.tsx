"use client"

import { objectStore } from "@/store/objectStore"
import { useEffect, useState } from "react"
import ObjectsList from "@/components/objects"
import { useSession } from "next-auth/react"
import { getUserWithEmail } from "@/actions/userAction"
import Loader from "@/components/loader"


export default function MyObjects() {
  const [loading, setLoading] = useState<boolean>(true)
  const { recuperateObjectsByUser } = objectStore()
  const { data: session, status } = useSession()
  
  useEffect(() => {
    const getUserWithObjects = async () => {
      if (!session?.user?.email) return

      try {
        const user = await getUserWithEmail(session?.user?.email)
        if (user?.length > 0) {
          await recuperateObjectsByUser(user[0]?.id_user)
        }
      } catch (error) {
        console.error("Error cargando los objetos del usuario:", error)
      } finally {
        setLoading(false)
      }
    }

    if (status === "authenticated") {
      setLoading(true)
      getUserWithObjects()
    }
  }, [session?.user?.email, status, recuperateObjectsByUser])

  const { objectsByUser } = objectStore()

  return (
    <main>
      <h1 className="bg-blue-950 text-white text-4xl font-bold py-14 text-center mb-5">Mis objetos</h1>

      {loading ? (
        <Loader />
      ) : objectsByUser.length > 0 ? (
        <ObjectsList objects={objectsByUser} buttonText="Encontre mi objeto" option={"usuario"} />
      ) : (
        <p className="text-center">No tienes objetos publicados</p>
      )}
    </main>
  )
}